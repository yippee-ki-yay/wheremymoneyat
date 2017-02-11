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

export function requireAuth(nextState, replaceState) {
  let userToken = localStorage.getItem('wheremymoneyat-jwt');

  if(!userToken) {
    replaceState({ pathname: '/login', nextPathname: nextState.location.pathname });
  }
}
