import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "payment",
  initialState: {
    error: "",
    paymentRes: null,
    card: {
      totalAmount:"100",
      currency :'USD'
    },
    config: {
      showPayButton: true,
    },
    billingAddress: {
      firstName: "Joe",
      lastName: "Bob",
      buildingNumber: "274",
      address1:"test",
      district: "California",
      locality: "San Francisco",
      postalCode: "94107",
      country: "US",
      phoneNumber:"4158880000",
      email:"test@cybs.com",
      address2:"Address 2",
      administrativeArea: "CA",
      enableBilling: false
    },
  },
  reducers: {
    setBilling: (state, action) => {
      state.billingAddress = {
        ...state.billingAddress,
        ...action.payload,
      };
    },
    cyberConfig: (state, action) => {
      state.config = {
        ...state.config,
        ...action.payload,
      };
    },
    payments: (state, action) => {
      const [res, status] = action.payload;
      if (status >= 300) {
        state.error = res;
      } else {
        state.paymentRes = res;
      }
    },
  },
});

export const { cyberConfig, payments,setBilling } = slice.actions;


export const getCyberConfig = () => async (dispatch) => {
  const response = await fetch("/cyberSource/config");
  dispatch(cyberConfig(await response.json()));
};

export const getCyberReceipt = (data) => async (dispatch) => {
  const response = await fetch("/cyberSource/receipt", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  dispatch(payments([await response.json(), response.status]));
};

export default slice.reducer;
