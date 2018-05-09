/**
 * Created by Administrator on 2017/12/11.
 */




let TokenKey='token';
export function getToken(){
  return localStorage.getItem(TokenKey);
}
export function setToken(token){
  localStorage.setItem(TokenKey,token);
}
export function removeToken(){
  localStorage.removeItem(TokenKey);
}





let limited='x-auth-limited';
export function getLimited(){
  return localStorage.getItem(limited);
}
export function setLimited(data){
  localStorage.setItem(limited,data);
}


let limitedUrl='x-auth-limitedUrl';
export function getLimitedUrl(){
  return localStorage.getItem(limitedUrl);
}
export function setLimitedUrl(data){
  localStorage.setItem(limitedUrl,data);
}



