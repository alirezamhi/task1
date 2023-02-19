import "../scss/styles.scss";
import "../styles/main.css";
import * as bootstrap from "bootstrap";
import createTimeLine from "./createTimeLIne";
import header from "./header";
import createModal from "./createModal";
import table from "./table";
import "../styles/modal.css";


export let itemInTimeLine = [];


let app = document.querySelector("#app");
app.appendChild(header);


let divShowItemArea = document.createElement("div");
divShowItemArea.innerHTML = createModal.myModal(1, "انتخاب ایتم", true);
app.appendChild(divShowItemArea);


let divShowMovieArea = document.createElement("div");
divShowMovieArea.innerHTML = createModal.myModal(2, "نمایش فیلم");
app.appendChild(divShowMovieArea);
jwplayer("id2").setup({
  playlist: [
    {
      file: "https://mediamarketstreamer.iriborg.ir/timeshift/588/2023-02-14/123148271.mp4",
    },
  ],
  width: 463,
  height: 320,
  aspectratio: "12:12",
  responsive: true,
});


let buttonForShowModal = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">Launch demo modal</button>`
let modalAreaButton = document.createElement("div");
modalAreaButton.innerHTML = buttonForShowModal;
app.appendChild(modalAreaButton);


let divTableArea = document.createElement("div");
divTableArea.innerHTML = table.myTable();
document.querySelector("#id1").appendChild(divTableArea);


let item = [];
const options = {
    editable: {
      add: true,
      updateTime: true,
      updateGroup: true,
      overrideItems: false,
      updateTime: true,
    },
    // zoomable:false,
    // showCurrentTime:false,
    // moveable:false,
    // stack:false
    // stackSubgroups:false
};


let timeLineArea = document.createElement("div");
let timeLine = new createTimeLine(item, timeLineArea, options);
let currentTimeLine = timeLine.generateTimeLine(options);
app.appendChild(timeLineArea);

fetch("https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items", {
  method: "GET",
  headers: { "content-type": "application/json" },
})
  .then((res) => res.json())
  .then((data) => {
    createModal.buttonPagination(data)
});