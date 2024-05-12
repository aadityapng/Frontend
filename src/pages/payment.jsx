import React, { useState } from 'react';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lakukan proses pembayaran sesuai dengan metode yang dipilih
    console.log(`Metode pembayaran yang dipilih: ${paymentMethod}`);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Pembayaran</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="paymentMethod" className="block font-semibold mb-2">
              Pilih Metode Pembayaran:
            </label>
            <div>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={handlePaymentMethodChange}
                  className="form-radio"
                />
                <span className="ml-2">Tunai</span>
              </label>
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="debit"
                  checked={paymentMethod === 'debit'}
                  onChange={handlePaymentMethodChange}
                  className="form-radio"
                />
                <span className="ml-2">Debit</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={paymentMethod === 'credit'}
                  onChange={handlePaymentMethodChange}
                  className="form-radio"
                />
                <span className="ml-2">Kredit</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Bayar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;