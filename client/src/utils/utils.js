import decode from "jwt-decode";

export function userInfo() {
  let userToken = localStorage.getItem('wheremymoneyat-jwt');
  if (userToken) {
    return decode(userToken);
  }
  return null;
}

export function authHeader() {
  let userToken = localStorage.getItem('wheremymoneyat-jwt');

  if(userToken) {
    return {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    };
  }
}
