import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api";

const getAllPublicPosts = () => {
  return axios.get(API_URL + "/public");
};

const getAllPrivatePosts = () => {
  return axios.get(API_URL + "/private", { headers: authHeader() });
};

const api = axios.create({
  baseURL: API_URL,
  headers: authHeader(),
});

const updateCustomer = async (user) => {
  const response = await api.post("/update-customer", user);
  return response.data;
};

const deleteCustomer = async (user) => {
  console.log("Deleting, ", user);
  await api.post("/delete-customer", user);

  return true;
};

const fetchCustomers = async () => {
  const response = await api
    .get("/customers", { headers: authHeader() })
    .catch((err) => console.log(err));
  console.log(response);
  return response;
};

const postService = {
  getAllPublicPosts,
  getAllPrivatePosts,
  updateCustomer,
  fetchCustomers,
};

export default postService;
