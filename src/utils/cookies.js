const setCookies = (tokens) => {
  document.cookie = `accessToken=${tokens.accessToken}; max-age=${
    1 * 24 * 60 * 60
  }`;
  document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${
    30 * 24 * 60 * 60
  }`;
};

const getCookie = (cookieName) => {
  return document.cookie
    .split(";")
    .find((token) => token.trim().split("=")[0] === cookieName)
    ?.split("=")[1];
};
export { setCookies, getCookie };

// const setCookies = ({ accessToken, refreshToken }) => {
//   if (!accessToken || !refreshToken) {
//     console.error("Tokens missing:", { accessToken, refreshToken });
//     return;
//   }
//   document.cookie = `accessToken=${accessToken}; max-age=${24 * 60 * 60}; path=/; SameSite=Lax`;
//   document.cookie = `refreshToken=${refreshToken}; max-age=${30 * 24 * 60 * 60}; path=/; SameSite=Lax`;
// };

// const getCookie = (cookieName) => {
//   const cookie = document.cookie
//     .split(";")
//     .map((c) => c.trim())
//     .find((c) => c.startsWith(`${cookieName}=`));
//   return cookie
//     ? decodeURIComponent(cookie.slice(cookieName.length + 1))
//     : undefined;
// };

// export { setCookies, getCookie };