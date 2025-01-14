import React from 'react';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

export default function App() {
  const config = {
    public_key: 'FLWPUBK_TEST-9ac34838c5e874331fb1501b017b867a-X',
    tx_ref: Date.now(),
    amount: 100,
    currency: 'RWF', // Change this to RWF
    payment_options: 'card,mobilemoney',
    customer: {
      email: 'user@gmail.com',
      phone_number: '+250781234567',
      name: 'john doe',
    },
    customizations: {
      title: 'My store',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const fwConfig = {
    ...config,
    text: 'Pay with Flutterwave!',
    callback: (response) => {
       console.log(response);
      closePaymentModal() // this will close the modal programmatically
    },
    onClose: () => {},
  };

  return (
    <div className="App">
     <h1>Hello Test user</h1>
      <FlutterWaveButton {...fwConfig} />
    </div>
  );
}