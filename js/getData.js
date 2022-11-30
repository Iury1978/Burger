// export const getData = url => {
//  const response = fetch(url).then(response => console.log(response));
// }


// или так . await будет ждать , пока промис из fetch не распакуется
export const getData = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json()
  }
};