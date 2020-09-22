import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { CustomerForm } from "../customer/CustomerForm";
import { CardDetails } from "../customer/CardDetails";
import { getCyberConfig,getCyberReceipt } from "../../app/paymentSlice";

export function Payment() {
  const { type } = useParams();
  return (
    <div id="payment-page">
      <div className="container">
        <CustomerForm />
        <CardDetails/>
        <ConnectedCheckoutContainer type={type} /> 
      </div>
    </div>
  );
}

class CheckoutContainer extends React.Component {
  constructor(props) {
    super(props);
    this.processPaymentResponse = this.processPaymentResponse.bind(this);
  }

  componentDidMount() {
    this.props.getCyberConfig();

    

  }

  componentDidUpdate(prevProps) {
    const { paymentRes , error , config } = this.props.payment;
    if (error && error !== prevProps.payment.error) {
      window.location.href = `/status/error?reason=${error}`;
      return;
    }


    if (config && config !== prevProps.payment.config) {
        // JWK is set up on the server side route for /
        var form = document.querySelector('#my-sample-form');
        var payButton = document.querySelector('#pay-button');
        var flexResponse = document.querySelector('#flexresponse');
        var expMonth = document.querySelector('#expMonth');
        var expYear = document.querySelector('#expYear');
        var errorsOutput = document.querySelector('#errors-output');

        // the capture context that was requested server-side for this transaction
        var captureContext = config.keyInfo ;

        console.log(config.keyInfo);
        // custom styles that will be applied to each field we create using Microform
        var myStyles = {  
          'input': {    
            'font-size': '14px',    
            'font-family': 'helvetica, tahoma, calibri, sans-serif',    
            'color': '#555'  
          },  
          ':focus': { 'color': 'blue' },  
          ':disabled': { 'cursor': 'not-allowed' },  
          'valid': { 'color': '#3c763d' },  
          'invalid': { 'color': '#a94442' }
        };

        // setup
        // @ts-ignore
        // eslint-disable-next-line no-undef
        var flex = new Flex(captureContext);
        var microform = flex.microform({ styles: myStyles });
        var number = microform.createField('number', { placeholder: 'Enter card number' });
        var securityCode = microform.createField('securityCode', { placeholder: '•••' });

        number.load('#number-container');
        securityCode.load('#securityCode-container');
        const self = this;
        payButton.addEventListener('click', function() {  
              
          var options = {    
            expirationMonth: document.querySelector('#expMonth').value,  
            expirationYear: document.querySelector('#expYear').value 
          };              
          
          microform.createToken(options, function (err, token) {
            if (err) {
              // handle error
              console.error(err);
              errorsOutput.textContent = err.message;
            } else {
              // At this point you may pass the token back to your server as you wish.
              // In this example we append a hidden input to the form and submit it.      
              console.log(JSON.stringify(token));
              flexResponse.value = JSON.stringify(token);
              self.props.getCyberReceipt( {'flexresponse':token ,card:self.props.payment.card ,billingAddress:self.props.payment.billingAddress});

            }
          });
        });
    }
    if (paymentRes && paymentRes !== prevProps.payment.paymentRes) {
      console.log(paymentRes);
      this.processPaymentResponse(JSON.parse(paymentRes.paymentResponse));
    }
  }

  processPaymentResponse(paymentRes) {

    console.log(paymentRes);
    switch (paymentRes.status) {
      case "AUTHORIZED":
        window.location.href = "/status/success";
        break;
      case "PENDING":
        window.location.href = "/status/pending";
        break;
      case "REFUSED":
        window.location.href = "/status/failed";
        break;
      default:
        window.location.href = "/status/error";
        break;
    }
    
  }

  render() {
    return (
      <div></div>
    );
  }
}

const mapStateToProps = state => ({
  payment: state.payment
});

const mapDispatchToProps = { getCyberConfig,getCyberReceipt };

export const ConnectedCheckoutContainer = connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
