import { API_BASE_URL } from "../app-config";
import { IPropsTodoItem } from "../Todo";

const ACCESS_TOKEN = "ACCESS_TOKEN";
interface IOptions {
  headers: Headers;
  url: string;
  method: string;
  body?: string;
}
export function call(api: string, method: string, request: IPropsTodoItem | null) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // 로컬스토리지에서 ACESS_TOKEN 가져오기
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options: IOptions = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    // GET method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          // response.ok가 true이면 정상적인 리스폰스를 받은것, 아니면 에러 리스폰스를 받은것.
          return Promise.reject(json);
        }
        return json;
      })
    )
    .catch((error) => {
      // 추가된 부분
      console.log(error.status);
      if (error.status === 403) {
        window.location.href = "/login"; // redirect
      }
      return Promise.reject(error);
    });
}

export function signin(userDTO: any) {
  return call('/auth/signin', 'POST', userDTO)
    .then((response) => {
      if (response.token) {
        // 로컬 스토리지에 토큰 저장
        localStorage.setItem('ACCESS_TOKEN', response.token);
        // token이 존재하는 경우 Todo 화면으로 리디렉트
        window.location.href = "/";
      }
    });
}

export function signout() {
  localStorage.removeItem(ACCESS_TOKEN);
  window.location.href = "/login";
}

export function signup(userDTO: any) {
  return call('/auth/signup', 'POST', userDTO);
}