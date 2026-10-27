import api from "src/configs/api";
import { getCookie } from "src/utils/cookies";

const getNewTokens = async () => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) return;
  try {
    const response = await api.post("auth/check-refresh-token", {
      refreshToken,
    });
    return {response}
  } catch (error) {
    return{error}
  }
};


export {getNewTokens}

// import axios from "axios";
// import { getCookie } from "src/utils/cookies";

// // instance جدا، بدون interceptor
// const refreshApi = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   headers: { "Content-Type": "application/json" },
// });

// const getNewTokens = async () => {
//   const refreshToken = getCookie("refreshToken");
//   if (!refreshToken) return { error: new Error("No refresh token") };

//   try {
//     const response = await refreshApi.post("auth/check-refresh-token", {
//       refreshToken,
//     });
//     return { response };
//   } catch (error) {
//     return { error };
//   }
// };

// export { getNewTokens };