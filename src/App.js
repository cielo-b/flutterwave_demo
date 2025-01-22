import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [fullname, setFullname] = useState('');
  const [card_number, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry_month, setExpiryMonth] = useState('');
  const [expiry_year, setExpiryYear] = useState('');
  const [amount, setAmount] = useState('');
  const [tx_ref, setTxRef] = useState('');

  const handleMobileMoneySubmit = async () => {
    try {
      const response = await axios.post('https://flutterwave-api.onrender.com/mobile-money', {
        email,
        phone_number,
        fullname
      });
      
      if (response.data.redirectUrl) {
        // Redirect the user to the Flutterwave checkout page
        window.location.href = response.data.redirectUrl;
      } else {
        console.log('Mobile Money Response:', response.data);
      }
    } catch (error) {
      console.error('Mobile Money Error:', error);
    }
  };

  const handleCardChargeSubmit = async () => {
    try {
      const response = await axios.post('https://flutterwave-api.onrender.com/charge-card', {
        card_number,
        cvv,
        expiry_month,
        expiry_year,
        amount,
        tx_ref,
        email,
        phone_number,
        fullname,
        redirect_url: "https://www.google.com" // Or wherever you want to redirect after payment
      });
      console.log('Card Charge Response:', response.data);

      // If 3DS or PIN authorization is required
      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (error) {
      console.error('Card Charge Error:', error);
    }
  };

  return (
    <div>
      <h1>Payment Demo</h1>

      {/* Mobile Money Form */}
      <h2>Mobile Money Payment</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phone_number}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Full Name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
      <button onClick={handleMobileMoneySubmit}>Submit Mobile Money</button>

      {/* Card Payment Form */}
      <h2>Card Payment</h2>
      <input
        type="text"
        placeholder="Card Number"
        value={card_number}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      <input
        type="text"
        placeholder="Expiry Month"
        value={expiry_month}
        onChange={(e) => setExpiryMonth(e.target.value)}
      />
      <input
        type="text"
        placeholder="Expiry Year"
        value={expiry_year}
        onChange={(e) => setExpiryYear(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Transaction Reference"
        value={tx_ref}
        onChange={(e) => setTxRef(e.target.value)}
      />
      <button onClick={handleCardChargeSubmit}>Submit Card Payment</button>
    </div>
  );
};

export default App;
