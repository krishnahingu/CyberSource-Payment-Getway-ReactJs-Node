import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Payment } from "./features/payment/Payment";
import { Preview } from "./features/preview/Preview";
import { Status } from "./features/status/Status";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/preview/:type">
          <Preview />
        </Route>
        <Route path="/checkout/:type">
          <Payment />
        </Route>
        <Route path="/status/:type">
          <Status />
        </Route>
        <Route path="/">
          <div className="main-container">
            <div className="info">
              <h1 className="flexTitle">CyberSource Flex</h1>
              <p>
                Storing your customer’s card data can dramatically increase your repeat-customer conversion rate, but can also add additional risk and <b>PCI DSS</b> overhead. You can mitigate these costs by <b>tokenizing card</b> data. CyberSource will store your customer’s card data within secure <b>Visa data centers</b>, replacing it with a <b>token </b>that only you can use.
              </p>
              <p> Secure Acceptance Flexible Token is a secure method for Tokenizing card data,
                 that leaves you in total control of the customer experience. Your customer’s card number is encrypted on their own device - for example inside a browser or native app - and sent directly to CyberSource. 
                 This means card data bypasses your systems altogether. This can help you qualify for  <a href="https://www.pcisecuritystandards.org/documents/Understanding_SAQs_PCI_DSS_v3.pdf"> SAQ A</a> based PCI DSS assessments for web-based integrations, and SAQ A-EP for native app integrations.
              </p>
              <p>
              On-device encryption helps to protect your customers from attacks on network middleware such as app accelerators, DLPs, CDNs, and malicious hotspots.
              </p>
              <p>
              This sample demonstrates how you can replace the sensitive data fields (credit card number) on your checkout form with a field (Flex Microform) hosted entirely on CyberSource servers. This field will accept and tokenize the customer's credit card information directly from their browser on a resource hosted by CyberSource, replacing that data with a secure PCI-compliant token. This can then be sent to your server along with the other non-PCI order data. This can help achieve PCI-DSS SAQ A level compliance for your application as even your client-side code does not contain a mechanism to handle the credit card information.
              </p>
            </div>
            <ul className="integration-list">
              <li className="integration-list-item">
                <Link to="/preview/card" className="integration-list-item-link">
                  <div className="title-container">
                    <p className="integration-list-item-title">Let's Start Demo</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
