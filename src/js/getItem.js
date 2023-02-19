class getItem {
  static fetchApi() {
    fetch("https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items", {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((res) => res.json())
    .then(data=>{
        return data
    })
  }
}
export default getItem;
