import axios from "axios";

export const getCategory = (callback) => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/master-menu-categories`)
    .then((res) => {
      callback(res.data.data);
      console.log("category berhasil diterima:", res.data.data);
    })
    .catch((err) => {
      console.log("Error saat mengambil data:", err);
    });
};
