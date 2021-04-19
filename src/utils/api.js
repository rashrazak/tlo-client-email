import axios from "axios";
const API_URL = process.env.REACT_APP_FORM_API;

export default {
  post: function(urlParam, payload) {
    return new Promise((resolve, reject) => {
      return axios
        .post(`${API_URL}${urlParam}`, payload, {
          timeout: 60 * 2 * 1000,
        })
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },
  get: function(urlParam) {
    return new Promise((resolve, reject) => {
      return axios
        .get(`${API_URL}${urlParam}`,{
          withCredentials: true,
        }) 
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },
};
