import React, { useEffect, useState } from "react";
import { getProducts } from "../services/product.service";
import PaymentModal from "../components/Fragments/PaymentModal";

const PaymentPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getProducts((data) => {
      setProducts(data);
    });

    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
  }, []);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      const product = products.find((product) => product.id === item.id);
      return product ? acc + product.harga * item.qty : acc;
    }, 0);
    setTotalPrice(sum);
  }, [cart, products]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentAmountChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setPaymentAmount(value);
  };

  const handlePayment = () => {
    // Simulasi proses pembayaran
    console.log("Pembayaran berhasil!");
    console.log("Metode Pembayaran:", paymentMethod);
    console.log("Jumlah Pembayaran:", paymentAmount);
    setShowModal(true);
  };

  const handlePrintReceipt = () => {
    // Logika untuk mencetak struk pembayaran
    console.log("Mencetak struk pembayaran...");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h1 className="text-2xl text-center font-bold mb-4">Payment Page</h1>
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th className="py-2 text-xs px-2">Name</th>
              <th className="py-2 text-xs px-2">Qty</th>
              <th className="py-2 text-xs px-2">Price</th>
              <th className="py-2 text-xs px-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              const product = products.find(
                (product) => product.id === item.id
              );
              return (
                <tr key={item.id}>
                  <td className="py-2 text-xs px-2">
                    {product && product.nama ? product.nama : "-"}
                  </td>
                  <td className="py-2 text-xs px-2">{item.qty}</td>
                  <td className="py-2 text-xs px-2">
                    {product && product.harga
                      ? `Rp ${product.harga.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}`
                      : "-"}
                  </td>
                  <td className="py-2 text-xs px-2">
                    {product && product.harga
                      ? `Rp ${(product.harga * item.qty).toLocaleString(
                          "id-ID",
                          { style: "currency", currency: "IDR" }
                        )}`
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="font-bold text-xs px-2">
                Total Price:
              </td>
              <td className="font-bold text-xs px-2">
                Rp{" "}
                {totalPrice.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="mb-4">
          <label className="block font-bold mb-2">Payment Method:</label>
          <div className="flex">
            <div className="flex items-center mr-4">
              <input
                type="radio"
                id="cash"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="cash" className="text-gray-700">
                Cash to Cashier
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="bank"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="bank" className="text-gray-700">
                Bank Transfer
              </label>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="paymentAmount" className="block font-bold mb-2">
            Payment Amount:
          </label>
          <input
            type="number"
            id="paymentAmount"
            value={isNaN(paymentAmount) ? "" : paymentAmount}
            onChange={handlePaymentAmountChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 mb-4"
        >
          Pay
        </button>
        <PaymentModal isOpen={showModal} onPrintReceipt={handlePrintReceipt} />
      </div>
    </div>
  );
};

export default PaymentPage;
