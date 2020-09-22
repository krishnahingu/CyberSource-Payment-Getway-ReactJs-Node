import React from "react";
import { setBilling } from "../../app/paymentSlice";
import { useDispatch, useSelector } from "react-redux";

export function CardDetails() {
  const dispatch = useDispatch();
  const billingAddress = useSelector(state => state.payment.billingAddress);

  const handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = name === "enableBilling" ? target.checked : target.value;

    dispatch(
      setBilling({
        [name]: value
      })
    );
  };
  return (
    <div className="customer-form ">
      <div className=" card-body address">
          <h1>Checkout</h1>
          <div id="errors-output" role="alert"></div>
          <form action="/status/success" id="my-sample-form" method="post">
            <div className="form-group">
              <label htmlFor="cardholderName">Name</label>
              <input id="cardholderName" className="form-control" name="cardholderName" placeholder="Name on the card"/>
              <label id="cardNumber-label">Card Number</label>
              <div id="number-container" className="form-control"></div>
              <label htmlFor="securityCode-container">Security Code</label>
              <div id="securityCode-container" className="form-control"></div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="expMonth">Expiry month</label>
                <select id="expMonth" className="form-control">
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                  <option>05</option>
                  <option>06</option>
                  <option>07</option>
                  <option>08</option>
                  <option>09</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="expYear">Expiry year</label>
                <select id="expYear" className="form-control">
                  <option>2021</option>
                  <option>2022</option>
                  <option>2023</option>
                </select>
              </div>
            </div>
            <button type="button" id="pay-button" className="btn btn-primary">Pay</button>
            <input type="hidden" id="flexresponse" name="flexresponse"/>
          </form>
      </div>
    </div>
  );
}
