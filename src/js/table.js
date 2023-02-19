import { itemInTimeLine } from "./main";
class table {
  constructor(nodes){

  }
  static myTable() {
    return `<table class="table">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">نام</th>
            <th scope="col">ساعت</th>
            <th scope="col">عملیات</th>
        </tr>
        </thead>
        <tbody>

        </tbody>
  </table>
    `;
  }
  static createRow(node,eventListenerFunction) {
    node.map((item) => {
      let tbody = document.querySelector("tbody")
      const trArea = document.createElement("tr");
      tbody.innerHTML=""
      const { name, id, time } = item;
      const tdId = document.createElement("td");
      tdId.innerHTML = id;
      trArea.appendChild(tdId);
      const tdName = document.createElement("td");
      tdName.innerHTML = name;
      trArea.appendChild(tdName);
      const tdTime = document.createElement("td");
      tdTime.innerHTML = `${time.start}:${time.end ? time.end : "0000-00-00"}`;
      trArea.appendChild(tdTime);
      let addButton = document.createElement("button");
      addButton.classList.add("btn");
      addButton.classList.add("btn-success");
      addButton.classList.add("addButton");
      addButton.id = `z${node.id}`;
      addButton.innerHTML = "+";
      let findButtonInTimeLine = itemInTimeLine.find((w) => w.id == node.id);
      findButtonInTimeLine ? (addButton.style.display = "none") : "";
      addButton.removeEventListener("click",eventListenerFunction)
      addButton.addEventListener("click", eventListenerFunction);
      const playButton = document.createElement("button");
      playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
      </svg>`;
      playButton.classList.add("btn");
      playButton.classList.add("btn-warning");
      playButton.classList.add("buttonPlayer");
      playButton.setAttribute("data-bs-toggle", "modal");
      playButton.setAttribute("data-bs-target", "#exampleModal2");
      const tdButton = document.createElement("td");
      const divButton = document.createElement("div");
      divButton.classList.add("btn-group");
      divButton.style.direction = "ltr";
      divButton.appendChild(playButton);
      divButton.appendChild(addButton);
      tdButton.appendChild(divButton);
      trArea.appendChild(tdButton);
      console.log(trArea,"alirejdshfiu");
      tbody.appendChild(trArea);
      })}
}
export default table;
