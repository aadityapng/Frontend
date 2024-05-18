import React from "react";
import Button from "../Elements/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";

const CardProduct = (props) => {
  const { children } = props;
  return (
    <div className="flex flex-col justify-between w-full max-w-sm bg-white border border-gray-300 shadow-xl mx-2 my-2">
      {children}
    </div>
  );
};

const Header = (props) => {
  const { gambar, id } = props;
  return (
    <Link to={`/product/${id}`}>
      <img
        src={gambar}
        alt="product"
        className="rounded-t-lg h-40 w-full object-cover"
      />
    </Link>
  );
};

const Body = (props) => {
  const { name } = props;
  return (
    <div className="px-5 pb-5 h-full">
      <Link>
        <h5 className="text-xl font-semibold tracking-tight text-gray-900">
          {name}
        </h5>
      </Link>
    </div>
  );
};

const Footer = (props) => {
  const { price, id } = props;
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-gray-400">
      <span className="text-sm font-bold text-white">
        Rp{" "}
        {price.toLocaleString("id-ID", {
          styles: "currency",
          currency: "IDR",
        })}
      </span>
      <Button
        variant="bg-yellow-400 hover:bg-yellow-500 text-green-800 text-sm font-semibold rounded-full px-2 py-1"
        onClick={() => dispatch(addToCart({ id, qty: 1 }))}
      >
        Add to cart
      </Button>
    </div>
  );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
