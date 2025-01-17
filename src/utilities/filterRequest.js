export const filterRequest = (filter) => {
  let result = "";
  for (let prop in filter) {
    result += `&${prop}=${filter[prop]}`;
  }
  return result;
}