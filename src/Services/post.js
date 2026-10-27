import api from "src/configs/api";

const getAllPosts = async () => {
  const response = await api.get("");
  return response.data;
};

const getPostById = async (id) => {
  const response = await api.get(`/post/${id}`);
  return response.data;
};
export { getAllPosts,getPostById };