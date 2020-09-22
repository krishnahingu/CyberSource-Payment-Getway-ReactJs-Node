const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { uuid } = require("uuidv4");
const app = express();

// setup request logging
app.use(morgan("dev"));
// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Serve client from build folder
app.use(express.static(path.join(__dirname, "build")));


// enables environment variables by
// parsing the .env file and assigning it to process.env
dotenv.config({
  path: "./.env",
});




/* ################# Krishna API ENDPOINTS ###################### */
var cybersourceRestApi = require('cybersource-rest-client');

// common parameters
const AuthenticationType = 'http_signature';
const RunEnvironment = 'cybersource.environment.SANDBOX';
const MerchantId = 'testrest';

// http_signature parameters
const MerchantKeyId = '08c94330-f618-42a3-b09d-e1e43be5efda';
const MerchantSecretKey = 'yBJxy6LjM2TmcPGu+GaJrHtkke25fPpUX+UY6/L/1tE=';

// jwt parameters
const KeysDirectory = 'Resource';
const KeyFileName = 'testrest';
const KeyAlias = 'testrest';
const KeyPass = 'testrest';

// logging parameters
const EnableLog = true;
const LogFileName = 'cybs';
const LogDirectory = '../log';
const LogfileMaxSize = '5242880'; //10 MB In Bytes


var configObj = {
	'authenticationType': AuthenticationType,	
	'runEnvironment': RunEnvironment,

	'merchantID': MerchantId,
	'merchantKeyId': MerchantKeyId,
	'merchantsecretKey': MerchantSecretKey,
    
	'keyAlias': KeyAlias,
	'keyPass': KeyPass,
	'keyFileName': KeyFileName,
	'keysDirectory': KeysDirectory,
    
	'enableLog': EnableLog,
	'logFilename': LogFileName,
	'logDirectory': LogDirectory,
	'logFileMaxSize': LogfileMaxSize
};

// THIS IS THE SERVER-SIDE REQUEST TO GENERATE THE DYNAMIC KEY 
// REQUIRED FOR THE MICROFORM TO TOKENIZE
app.get('/cyberSource/config', function (req, res) {

  try {
          var instance = new cybersourceRestApi.KeyGenerationApi(configObj);

          var request = new cybersourceRestApi.GeneratePublicKeyRequest();
          request.encryptionType = 'RsaOaep256';
          request.targetOrigin = 'http://localhost:8080';

          var opts = [];
          opts['format'] = 'JWT';

          console.log('\n*************** Generate Key ********************* ');
          
          instance.generatePublicKey(request, opts, function (error, data, response) {
              if (error) {
                  console.log('Error : ' + error);
                  console.log('Error status code : ' + error.statusCode);
                  res.status(error.status).json(error);
              }
              else if (data) {
                  console.log('Data : ' + JSON.stringify(data));
                  console.log('CaptureContext: '+data.keyId);
                 // res.render('index', { keyInfo: JSON.stringify(data.keyId)});
                  res.json( { keyInfo: data.keyId} );

              }
            //  console.log('Response : ' + JSON.stringify(response));
            ///  console.log('Response Code Of GenerateKey : ' + response['status']);
             // callback(error, data);

          });
          
      } catch (error) {
          console.log(error);
          res.status(error.statusCode).json(error);
      }
    
});

// THIS ROUTE SIMPLY POWERS THE TOKEN PAGE TO DISPLAY THE TOKEN
// NOTE THIS IS AN INTERIM STEP FOR THE SAMPLE AND WOULD OBVIOUSLY
// NOT BE PART OR A REAL CHECKOUT FLOW
app.post('/cyberSource/token', function (req, res) {

  try {

    console.log('Response : ' + req.body.flexresponse);
    var tokenResponse = JSON.parse(req.body.flexresponse)
    res.json( { flexresponse: req.body.flexresponse } );
   // res.render('token', { flexresponse: req.body.flexresponse });

  } catch (error) {
    console.log("/cyberSource/token -> Error: ",error);
    res.status(error.status).json(error.response.text);
  }


});

// THIS REPRESENTS THE SERVER-SIDE REQUEST TO MAKE A PAYMENT WITH THE TRANSIENT
// TOKEN
app.post('/cyberSource/receipt', function (req, res) {

  console.log("Respons body -->",req.body)
 // var tokenResponse = JSON.parse(req.body.flexresponse)
  var tokenResponse = req.body.flexresponse
  var card = req.body.card;
  var billingAddress =req.body.billingAddress;
  //console.log('Transient token for payment is: ' + JSON.stringify(req.body));

   try {
    
          var instance = new cybersourceRestApi.PaymentsApi(configObj);

          var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
          clientReferenceInformation.code = 'test_flex_payment';

          var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
          processingInformation.commerceIndicator = 'internet';

          var amountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
          amountDetails.totalAmount = card.totalAmount;
          amountDetails.currency = card.currency;

          var billTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
          billTo.country = billingAddress.country;
          billTo.firstName = billingAddress.firstName;
          billTo.lastName =  billingAddress.lastName;
          billTo.phoneNumber =  billingAddress.phoneNumber;
          billTo.address1 = billingAddress.address1;
          billTo.postalCode =  billingAddress.postalCode;
          billTo.locality =  billingAddress.locality;
          billTo.administrativeArea =  billingAddress.administrativeArea;
          billTo.email =  billingAddress.email;
          billTo.address2 =  billingAddress.address2;
          billTo.district =  billingAddress.district;
          billTo.buildingNumber =  billingAddress.buildingNumber;

          var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
          orderInformation.amountDetails = amountDetails;
          orderInformation.billTo = billTo;

          // EVERYTHING ABOVE IS JUST NORMAL PAYMENT INFORMATION
          // THIS IS WHERE YOU PLUG IN THE MICROFORM TRANSIENT TOKEN
          var tokenInformation = new cybersourceRestApi.Ptsv2paymentsTokenInformation();
          tokenInformation.transientTokenJwt = tokenResponse;

          var request = new cybersourceRestApi.CreatePaymentRequest();
          request.clientReferenceInformation = clientReferenceInformation;
          request.processingInformation = processingInformation;
          request.orderInformation = orderInformation;
          request.tokenInformation = tokenInformation;

          console.log('\n*************** Process Payment ********************* ');

          instance.createPayment(request, function (error, data, response) {
              if (error) {
                  console.log('\nError in process a payment : ' + JSON.stringify(error));
                  res.status(error.status).json(error.response.text);
              }
              else if (data) {
                  console.log('\nData of process a payment : ' + JSON.stringify(data));
                  res.json(  { paymentResponse:  JSON.stringify(data)}  );
                  // res.render('receipt', { paymentResponse:  JSON.stringify(data)} );
          
              }
            //  console.log('\nResponse of process a payment : ' + JSON.stringify(response));
             // console.log('\nResponse Code of process a payment : ' + JSON.stringify(response['status']));
              //callback(error, data);
          });
          
      } catch (error) {
          console.log(error);
      }

});
/* ################# Krishna API Start ###################### */

/* ################# API ENDPOINTS ###################### */

// Health check
app.get("/api/health", (req, res) => {
  return res.send("ok");
});

/* ################# API ENDPOINTS ###################### */

/* ################# CLIENT ENDPOINTS ###################### */

// Handles any requests that doesn't match the above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

/* ################# end CLIENT ENDPOINTS ###################### */

/* ################# UTILS ###################### */

/* ################# end UTILS ###################### */

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
