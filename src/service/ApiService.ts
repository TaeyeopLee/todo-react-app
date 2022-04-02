import { API_BASE_URL } from "../app-config";
import { IPropsTodoItem } from "../Todo";
interface IOptions {
  headers: Headers;
  url: string;
  method: string;
  body?: string;
}
export function call(api: string, method: string, request: IPropsTodoItem | null) {
  let options: IOptions = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    // GET method
    options.body = JSON.stringify(request);
  }
  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        // response.ok가 true이면 정상적인 응답을 받은 것이고 아니면 에러 응답을 받은 것임
        return Promise.reject(json);
      }
      return json;
    })
  )
}
