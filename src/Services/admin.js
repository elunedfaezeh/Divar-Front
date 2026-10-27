import api from "src/configs/api";

// const addCategory = api.post("category",data)
const addCategory = async (data) => {
  const response = await api.post("category", data);
  return response.data;
};
const getCategory = async () => {
  const response = await api.get("category");
  return response.data;   // این خط رو اضافه کن
};

const deleteCategory = (id) => {
  return api.delete(`/category/${id}`);
};

export { addCategory,getCategory,deleteCategory };
