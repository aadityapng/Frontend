import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Elements/Button";
import { Link } from "react-router-dom";
import Counter from "../Elements/Counter/Counter";
import { removeFromCart, updateCartItem } from "../../redux/slices/cartSlice";

const TableCart = (props) => {
  const { products } = props;
  const cart = useSelector((state) => state.cart.data);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCart, setTotalCart] = useState(0);
  const dispatch = useDispatch();

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
        return product && product.harga ? acc + product.harga * item.qty : acc;
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

  const handleCounterChange = (itemId, newQty) => {
    if (newQty === 0) {
      dispatch(removeFromCart(itemId));
    } else {
      dispatch(updateCartItem({ id: itemId, qty: newQty }));
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  console.log(cart);

  return (
    <table className="mt-4 text-left text-sm table-auto border-separate border-spacing-y-2 border">
      <thead>
        <tr>
          <th>Name</th>
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
                <td>{product && product.nama ? product.nama : "-"}</td>
                <td>
                  <Counter
                    initialValue={item.qty}
                    onValueChange={(newQty) =>
                      handleCounterChange(item.id, newQty)
                    }
                  />
                </td>
                <td>
                  Rp{" "}
                  {product && product.harga
                    ? (product.harga * item.qty).toLocaleString("id-ID", {
                        styles: "currency",
                        currency: "IDR",
                      })
                    : "-"}
                </td>
              </tr>
            );
          })}
        <tr>
          <td colSpan={3} className="border-t border-gray-200 pt-4">
            <hr />
          </td>
        </tr>
        <tr ref={totalCartRef}>
          <td colSpan={2}>
            <b>Total Qty :</b>
          </td>
          <td>
            <b>{totalCart}</b>
          </td>
          <td></td>
        </tr>
        <tr ref={totalPriceRef}>
          <td colSpan={2}>
            <b>Total Price :</b>
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
          <td colSpan={3} className="border-t border-gray-200 pt-4">
            <hr />
          </td>
        </tr>
        <tr ref={paymentButtonRef}>
          <td colSpan={3} className="text-center">
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
