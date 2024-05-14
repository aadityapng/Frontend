import axios from "axios";

export const getCategory = (callback) => {
  axios
    .get("http://localhost:3100/categories")
    .then((res) => {
      callback(res.data);
      console.log("category berhasil diterima:", res.data);
    })
    .catch((err) => {
      console.log("Error saat mengambil data:", err);
    });
};
