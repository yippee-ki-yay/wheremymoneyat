import decode from "jwt-decode";

export function userInfo() {
  let userItem = localStorage.getItem('wheremymoneyat-jwt');
  if (userItem) {
    return decode(userItem);
  }
  return undefined;
}
