import axios from "axios";

export const getCategory = (callback) => {
  axios
    .get("http://localhost:8000/master-menu-categories")
    .then((res) => {
      callback(res.data);
      console.log("category berhasil diterima:", res.data);
    })
    .catch((err) => {
      console.log("Error saat mengambil data:", err);
    });
};
