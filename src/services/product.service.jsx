import axios from "axios";

export const getProducts = (callback) => {
  axios.get("http://localhost:3100/products").then((res) => {
    callback(res.data);
    console.log("Data berhasil diterima:", res.data);
  })
  .catch((err) => {
    console.log("Error saat mengambil data:", err);
  })
};

export const getDetailProducts = (id, callback) => {
  axios.get(`http://localhost:3100/products/${id}`).then((res) => {
    callback(res.data);
  })
  .catch((err) => {
    console.log(err);
  })
};


