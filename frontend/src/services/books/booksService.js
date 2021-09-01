import http from "../httpService";
// import auth from "../authService";
import { apiUrl } from "../../config/config.js";
import { toast } from "react-toastify";

const apiEndpoint = apiUrl ;
function getUrl(route) {
  return `${apiEndpoint}/${route}`;
}
// client Crud
export function getBooks(filter) {
  return http.get(apiEndpoint);
}

export function getBooksById(id) {
  return http.get(getUrl(id));
}
export function saveBooks(book) {
  try {
    if (book?.id) {
      return http.put(getUrl(book.id), book);
    }

    return http.post(apiUrl, book);
  } catch (error) {
    console.error("error al enviar", book);
  }
}

export function deleteBooks(id) {
  return http.delete(getUrl(id));
}
