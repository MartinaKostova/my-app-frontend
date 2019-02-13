export const API_URL = "http://localhost:8080";

export default function callApi(endpoint, method = 'get', body) {
  return fetch(`${API_URL}/${endpoint}`, {
    headers: {'Access-Control-Allow-Origin':'*','content-type': 'application/json'},
    method,
    body: JSON.stringify(body),
  }).then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      if (!response.ok){
        return Promise.reject(new Error(json));
      }
      return json;
    })
    .then(
      response => response,
      error => error
    );
} 