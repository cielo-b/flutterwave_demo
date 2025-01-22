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
        fullname,
      });

      if (response.data.redirectUrl) {
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
        redirect_url: 'https://www.google.com',
      });
      console.log('Card Charge Response:', response.data);

      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (error) {
      console.error('Card Charge Error:', error);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    height: '100vh',
    justifyContent: 'center',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '50px',
    margin: '20px',
    width: '300px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '5px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#333',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Payment Demo</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={cardStyle}>
          <h2 style={{ marginBottom: '10px', color: '#007bff' }}>Mobile Money Payment</h2>
          <input
            style={inputStyle}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Phone Number"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <button style={buttonStyle} onClick={handleMobileMoneySubmit}>
            Submit Mobile Money
          </button>
        </div>

        <div style={cardStyle}>
          <h2 style={{ marginBottom: '10px', color: '#007bff' }}>Card Payment</h2>
          <input
            style={inputStyle}
            type="text"
            placeholder="Card Number"
            value={card_number}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Expiry Month"
            value={expiry_month}
            onChange={(e) => setExpiryMonth(e.target.value)}
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Expiry Year"
            value={expiry_year}
            onChange={(e) => setExpiryYear(e.target.value)}
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Transaction Reference"
            value={tx_ref}
            onChange={(e) => setTxRef(e.target.value)}
          />
          <button style={buttonStyle} onClick={handleCardChargeSubmit}>
            Submit Card Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
