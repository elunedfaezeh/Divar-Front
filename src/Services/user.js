import api from "src/configs/api";

const getProfile = async () => {
  const response = await api.get("user/whoami");
  return response.data;
};

const getPost = async () => {
  const response = await api.get("post/my");
  return response.data;
};
const deletePost = async (id) => {
  const response = await api.delete(`post/delete/${id}`);
  return response.data;
};

export { getProfile,getPost,deletePost};
