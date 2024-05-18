import axios from "axios";

export const getProducts = (callback) => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/menus`).then((res) => {
    callback(res.data.menus);
    console.log("Data berhasil diterima:", res.data.menus);
  })
  .catch((err) => {
    console.log("Error saat mengambil data:", err);
  })
};

export const getDetailProducts = (id, callback) => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/menus/${id}`).then((res) => {
    callback(res.data);
  })
  .catch((err) => {
    console.log(err);
  })
};


