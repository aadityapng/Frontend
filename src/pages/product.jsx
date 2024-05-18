import React, { Fragment, useContext, useEffect, useState } from "react";
import CardProduct from "../components/Fragments/CardProduct";
import { getProducts } from "../services/product.service";
import MenuCategories from "../components/Fragments/MenuCategories";
import { useLogin } from "../hooks/useLogin";
import TableCart from "../components/Fragments/TableCart";
import Navbar from "../components/Layouts/Navbar";
import { DarkMode } from "../context/DarkMode";
import { getCategory } from "../services/category.service";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Makanan");
  const { isDarkMode } = useContext(DarkMode);
  useLogin();

  useEffect(() => {
    getCategory((data) => {
      setCategories(data);
    });

    getProducts((data) => {
      setProducts(data);
    });
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  console.log(getProducts);

  return (
    <Fragment>
      <Navbar />
      <div
        className={`flex justify-center gap-4 ${
          isDarkMode ? "bg-slate-500" : "bg-white"
        }`}
      >
        <div className="w-2/12">
          <div className="w-full flex flex-col">
            <h1 className="border-b-4 border-gray-400 text-lg font-bold">
              Categorie
            </h1>
          </div>
          <MenuCategories
            categories={categories}
            onCategoryClick={handleCategoryClick}
          />
        </div>
        <div className="w-7/12 flex flex-wrap">
          <div className="w-full flex flex-col">
            <h1 className="border-b-4 border-gray-400 text-lg font-bold">
              Menu
            </h1>
          </div>
          <div className="w-full grid grid-cols-3 gap-4 mt-3 mr-4 items-start">
            {products.length > 0 &&
              products
                .filter((product) => product.category.name === selectedCategory)
                .map((product) => (
                  <CardProduct key={product.id}>
                    <CardProduct.Header
                      gambar={`/assets/images/${product.category.name.toLowerCase()}/${
                        product.menu_photo
                      }`}
                      id={product.id}
                    />
                    <CardProduct.Body name={product.name} />
                    <CardProduct.Footer price={product.price} id={product.id} />
                  </CardProduct>
                ))}
          </div>
        </div>
        <div className="w-3/12">
          <div className="w-full flex flex-col">
            <h1 className="border-b-4 border-gray-400 text-lg font-bold">
              Cart
            </h1>
            <TableCart products={products} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsPage;
