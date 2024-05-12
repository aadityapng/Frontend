import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../Elements/Button";
import { Link } from "react-router-dom";

const TableCart = (props) => {
  const { products } = props;
  const cart = useSelector((state) => state.cart.data);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    const sum = cart.reduce((acc, item) => {
      return acc + item.qty;
    }, 0);
    setTotalCart(sum);
  }, [cart]);

  useEffect(() => {
    if (products.length > 0 && cart.length > 0) {
      const sum = cart.reduce((acc, item) => {
        const product = products.find((product) => product.id === item.id);
        return acc + product.price * item.qty;
      }, 0);
      setTotalPrice(sum);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, products]);

  const totalPriceRef = useRef(null);
  const totalCartRef = useRef(null);
  const paymentButtonRef = useRef(null);

  useEffect(() => {
    if (cart.length > 0) {
      totalPriceRef.current.style.display = "table-row";
      totalCartRef.current.style.display = "table-row";
      paymentButtonRef.current.style.display = "table-row";
    } else {
      totalPriceRef.current.style.display = "none";
      totalCartRef.current.style.display = "none";
      paymentButtonRef.current.style.display = "none";
    }
  }, [cart]);

  return (
    <table className="mt-4 text-left text-sm table-auto border-separate border-spacing-x-1 border">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 &&
          cart.map((item) => {
            const product = products.find((product) => product.id === item.id);
            return (
              <tr key={item.id}>
                <td>{product.title.substring(0, 10)}..</td>
                <td>
                  {product.price.toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td>{item.qty}</td>
                <td>
                  Rp{" "}
                  {(product.price * item.qty).toLocaleString("id-ID", {
                    styles: "currency",
                    currency: "IDR",
                  })}
                </td>
              </tr>
            );
          })}
        <tr>
          <td colSpan={4} className="border-t border-gray-200 pt-4">
            <hr />
          </td>
        </tr>
        <tr ref={totalCartRef}>
          <td colSpan={3}>
            <b>Total Qty</b>
          </td>
          <td>
            <b>{totalCart}</b>
          </td>
          <td></td>
        </tr>
        <tr ref={totalPriceRef}>
          <td colSpan={3}>
            <b>Total Price</b>
          </td>
          <td>
            <b>
              Rp{" "}
              {totalPrice.toLocaleString("id-ID", {
                styles: "currency",
                currency: "IDR",
              })}
            </b>
          </td>
        </tr>
        <tr>
          <td colSpan={4} className="border-t border-gray-200 pt-4">
            <hr />
          </td>
        </tr>
        <tr ref={paymentButtonRef}>
          <td colSpan={5} className="text-center">
            <Link to="/payment">
              <Button variant="bg-blue-500 text-white hover:bg-blue-700 w-full font-bold text-md">
                Payment
              </Button>
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableCart;
