import "../scss/styles.scss";
import "../styles/main.css";
import * as bootstrap from "bootstrap";
import createTimeLine from "./createTimeLIne";
import header from "./header";
import myDataItem from "./items";
import "../styles/modal.css";
import createModal from "./createModal";
import table from "./table";

let app = document.querySelector("#app");

// let modalPartTwo =
// `<div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="static">
//     <div class="modal-dialog">
//       <div class="modal-content">
//         <div class="modal-header">
//           <h1 class="modal-title fs-5" id="exampleModalLabel">پخش فیلم</h1>
//           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//         </div>
//         <div class="modal-body" style="margin:auto;display: flex;align-items: center;flex-direction: column;">
//         <div class="btn-group" style="direction: ltr;margin-bottom:20px">
//             <button class="btn btn-info html5Button">html 5</button>
//             <button class="btn btn-danger jwpalyerButton">jwplayer</button>
//         </div>
//         <div class="showhtml5Area">
//           <video controls width="463px">
//             <source src="https://mediamarketstreamer.iriborg.ir/timeshift/588/2023-02-14/123148271.mp4" />
//           </video>
//         </div>
//         <div class = "parentjwplayerArea">
//             <div id="jwplayerArea" class="notDisplay"></div>
//         </div>
//         <div>

//         </div>
//         </div>
//       </div>
//      </div>
//    </div>
//     `

// let jwpalyerButton = document.querySelector(".jwpalyerButton")
// let html5Button = document.querySelector(".html5Button")
// let showhtml5Area = document.querySelector(".showhtml5Area")
// let jwplayerArea = document.querySelector("#jwplayerArea")
// let parentjwplayerArea = document.querySelector(".parentjwplayerArea")
// jwpalyerButton.addEventListener("click",()=>{
//     jwplayerArea.classList.remove("notDisplay")
//     parentjwplayerArea.classList.remove("notDisplay")
//     showhtml5Area.classList.add("notDisplay")
// jwplayer("jwplayerArea").setup({
//     "playlist": [{
//         "file": "https://mediamarketstreamer.iriborg.ir/timeshift/588/2023-02-14/123148271.mp4"
//     }],
//     width: 463,
//     height: 320,
//     aspectratio: "12:12",
//     responsive: true
// });
// })
// html5Button.addEventListener("click",()=>{
//     showhtml5Area.classList.remove("notDisplay")
//     parentjwplayerArea.classList.add("notDisplay")
// })

let buttonForModal = `
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">
      Launch demo modal
    </button>
`;
let modalAreaButton = document.createElement("div");
modalAreaButton.classList.add("modalArea");
modalAreaButton.innerHTML = buttonForModal;
app.appendChild(modalAreaButton);


let itemInTimeLine = [];


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
let divShowItemArea = document.createElement("div");
divShowItemArea.innerHTML = createModal.myModal(1, "انتخاب ایتم", true);
app.appendChild(divShowItemArea);

let divTableArea = document.querySelector("div");
divTableArea.innerHTML = table.myTable();
document.querySelector(".id1").appendChild(divTableArea);
let item = [];
let timeLineArea = document.createElement("div");
timeLineArea.classList.add("timeLineArea");

let timeLine = new createTimeLine(item, timeLineArea, options);
app.appendChild(header);
app.appendChild(timeLineArea);

let currentTimeLine = timeLine.generateTimeLine(options);

const listPagination = document.querySelector("pagination");

function paginationButton(items) {
  for (let i = 0; i < Math.ceil(items.length / 5); i++) {
    let v = i + 1;
    let li = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = v;
    button.classList.add("page-link");
    button.addEventListener("click", paginationButtonHandler);
    button.id = `z${v}`;
    li.appendChild(button);
    listPagination.appendChild(li);
  }
}

function createItemInModal(node) {
  node.map((item) => {
    const { name, id, time } = item;
    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    tdId.innerHTML = id;
    tr.appendChild(tdId);
    const tdName = document.createElement("td");
    tdName.innerHTML = name;
    tr.appendChild(tdName);
    const tdTime = document.createElement("td");
    tdTime.innerHTML = `${time.start}:${time.end ? time.end : "0000-00-00"}`;
    tr.appendChild(tdTime);
    let addButton = document.createElement("button");
    addButton.classList.add("btn");
    addButton.classList.add("btn-success");
    addButton.classList.add("addButton");
    addButton.id = `z${node.id}`;
    addButton.innerHTML = "+";
    let findButtonInTimeLine = itemInTimeLine.find((w) => w.id == node.id);
    findButtonInTimeLine ? (addButton.style.display = "none") : "";
    addButton.addEventListener("click", buttonAddTimelineHandler);
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
    tbody.appendChild(trArea);
  });
}

function paginationButtonHandler(e) {
  let targettext = e.target.id;
  let targerId = targettext.slice(-1);
  tbody.innerHTML = "";
  const url = new URL(
    "https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items"
  );
  url.searchParams.append("completed", false);
  url.searchParams.append("page", targerId);
  url.searchParams.append("limit", 5);
  fetch(url, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      createItemInModal(data);
    });
}

const tbody = document.querySelector("tbody");
const trArea = document.querySelector("tr");

fetch("https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items", {
  method: "GET",
  headers: { "content-type": "application/json" },
})
  .then((res) => res.json())
  .then((tasks) => {
    paginationButton(tasks);
  })
  .catch((error) => {
    console.log(error);
  });

// data.map((node) => {
//   const { name, id, time } = node;
//   const tr = document.createElement("tr");
//   const tdId = document.createElement("td");
//   tdId.innerHTML = id;
//   tr.appendChild(tdId);
//   const tdName = document.createElement("td");
//   tdName.innerHTML = name;
//   tr.appendChild(tdName);
//   const tdTime = document.createElement("td");
//   tdTime.innerHTML = `${time.start}:${
//     time.end ? time.end : "0000-00-00"
//   }`;
//   tr.appendChild(tdTime);
//   let addButton = document.createElement("button");
//   addButton.classList.add("btn");
//   addButton.classList.add("btn-success");
//   addButton.classList.add("addButton");
//   addButton.id = `z${node.id}`;
//   addButton.innerHTML = "+";
//   let findButtonInTimeLine = itemInTimeLine.find(
//     (w) => w.id == node.id
//   );
//   findButtonInTimeLine ? (addButton.style.display = "none") : "";
//   addButton.addEventListener("click", buttonAddTimelineHandler);
//   const playButton = document.createElement("button");
//   playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
//     <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
//         </svg>`;
//   playButton.classList.add("btn");
//   playButton.classList.add("btn-warning");
//   playButton.classList.add("buttonPlayer");
//   playButton.setAttribute("data-bs-toggle", "modal");
//   playButton.setAttribute("data-bs-target", "#exampleModal2");
//   const tdButton = document.createElement("td");
//   const divButton = document.createElement("div");
//   divButton.classList.add("btn-group");
//   divButton.style.direction = "ltr";
//   divButton.appendChild(playButton);
//   divButton.appendChild(addButton);
//   tdButton.appendChild(divButton);
//   tr.appendChild(tdButton);
//   tbody.appendChild(tr);
// });
function buttonAddTimelineHandler(e) {
  let buttonTarget = e.target.id;
  let buttonid = buttonTarget.slice(1);
  let currnetNodeClickButton = data.find((node) => node.id == buttonid);
  const { id, time, name } = currnetNodeClickButton;
  let obj = {
    id: id,
    content: name,
    start: time.start,
    end: time?.end,
  };
  itemInTimeLine.push(obj);
  currentTimeLine.setItems(itemInTimeLine);
  let btnStyle = e.target;
  btnStyle.style.display = "none";
}
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }
//       let $tasks = tasks.slice(0, 5);

//       $tasks.map((node) => {
//         const { name, id, time } = node;
//         const tr = document.createElement("tr");
//         const tdId = document.createElement("td");
//         tdId.innerHTML = id;
//         tr.appendChild(tdId);
//         const tdName = document.createElement("td");
//         tdName.innerHTML = name;
//         tr.appendChild(tdName);
//         const tdTime = document.createElement("td");
//         tdTime.innerHTML = `${time.start}:${
//           time.end ? time.end : "0000-00-00"
//         }`;
//         tr.appendChild(tdTime);
//         let addButton = document.createElement("button");
//         addButton.classList.add("btn");
//         addButton.classList.add("btn-success");
//         addButton.classList.add("addButton");
//         addButton.addEventListener("click", buttonAddTimelineHandler);
//         addButton.innerHTML = "+";
//         addButton.id = `z${node.id}`;
//         let findButtonInTimeLine = itemInTimeLine.find((w) => w.id == node.id);
//         findButtonInTimeLine ? (addButton.style.display = "none") : "";
//         const playButton = document.createElement("button");
//         playButton.setAttribute("data-bs-toggle", "modal");
//         playButton.setAttribute("data-bs-target", "#exampleModal2");
//         playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
//                 <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
//                     </svg>`;
//         playButton.classList.add("btn");
//         playButton.classList.add("btn-warning");
//         playButton.classList.add("buttonPlayer");
//         const tdButton = document.createElement("td");
//         const divButton = document.createElement("div");
//         divButton.classList.add("btn-group");
//         divButton.style.direction = "ltr";
//         divButton.appendChild(playButton);
//         divButton.appendChild(addButton);
//         tdButton.appendChild(divButton);
//         tr.appendChild(tdButton);
//         tbody.appendChild(tr);
//       });
//       function buttonAddTimelineHandler(e) {
//         let buttonTarget = e.target.id;
//         let buttonid = buttonTarget.slice(-1);
//         let currnetNodeClickButton = $tasks.filter(
//           (node) => node.id == buttonid
//         );
//         let a = currnetNodeClickButton.shift();
//         const { id, time, name } = a;
//         let obj = {
//           id: id,
//           content: name,
//           start: time.start,
//           end: time?.end,
//         };
//         itemInTimeLine.push(obj);
//         currentTimeLine.setItems(itemInTimeLine);
//         let btnStyle = e.target;
//         btnStyle.style.display = "none";
//       }
//       // let $li = document.createElement("li")
//       // $li.innerHTML=`<a class="page-link" href="#">&raquo;</a>`
//       // $li.classList.add("page-item")
//       // listButton.appendChild($li)
//     })
//     .catch((error) => {
//       return error;
//     });

// // const trTag = tbody.querySelectorAll("tr")
// const inputSearch = document.querySelector("#inputSearch");
// inputSearch.addEventListener("keypress", (e) => {
//   if (inputSearch.value !== "") {
//     if (e.keyCode == 13) {
//       let listButton = document.querySelector(".pagination");
//       listButton.innerHTML = "";
//       document.querySelector("tbody").innerHTML = "";
//       e.preventDefault();
//       let inputValue = inputSearch.value;
//       async function searchFromData() {
//         const url = new URL(
//           "https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items"
//         );
//         // url.searchParams.append('completed', false);
//         // url.searchParams.append('page', 1);
//         // url.searchParams.append('limit', 10);
//         url.searchParams.append("name", inputValue);
//         let a = await fetch(url, {
//           method: "GET",
//           headers: { "content-type": "application/json" },
//         });
//         let myData = await a.json();
//         let coutnButton = Math.ceil(myData.length / 5);
//         for (let i = 0; i < coutnButton; i++) {
//           let v = i + 1;
//           let li = document.createElement("li");
//           let button = document.createElement("button");
//           button.innerText = v;
//           button.id = `v${v}`;
//           button.addEventListener("click", buttonHandler);
//           button.classList.add("page-link");
//           li.appendChild(button);
//           listButton.appendChild(li);
//         }
//         function buttonHandler(e) {
//           let targettext = e.target.id;
//           let targerId = targettext.slice(-1);
//           tbody.innerHTML = "";
//           const url = new URL(
//             "https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items"
//           );
//           url.searchParams.append("completed", false);
//           url.searchParams.append("page", targerId);
//           url.searchParams.append("limit", 5);
//           url.searchParams.append("name", inputValue);
//           fetch(url, {
//             method: "GET",
//             headers: { "content-type": "application/json" },
//           })
//             .then((res) => res.json())
//             .then((data) => {
//               data.map((node) => {
//                 const { name, id, time } = node;
//                 const tr = document.createElement("tr");
//                 const tdId = document.createElement("td");
//                 tdId.innerHTML = id;
//                 tr.appendChild(tdId);
//                 const tdName = document.createElement("td");
//                 tdName.innerHTML = name;
//                 tr.appendChild(tdName);
//                 const tdTime = document.createElement("td");
//                 tdTime.innerHTML = `${time.start}:${
//                   time.end ? time.end : "0000-00-00"
//                 }`;
//                 tr.appendChild(tdTime);
//                 let addButton = document.createElement("button");
//                 addButton.classList.add("btn");
//                 addButton.classList.add("btn-success");
//                 addButton.classList.add("addButton");
//                 addButton.id = `z${node.id}`;
//                 addButton.innerHTML = "+";
//                 const playButton = document.createElement("button");
//                 playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
//                             <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
//                                 </svg>`;
//                 playButton.classList.add("btn");
//                 playButton.classList.add("btn-warning");
//                 playButton.classList.add("buttonPlayer");
//                 playButton.setAttribute("data-bs-toggle", "modal");
//                 playButton.setAttribute("data-bs-target", "#exampleModal2");
//                 const divButton = document.createElement("div");
//                 divButton.classList.add("btn-group");
//                 divButton.style.direction = "ltr";
//                 let findButtonInTimeLine = itemInTimeLine.find(
//                   (w) => w.id == node.id
//                 );
//                 findButtonInTimeLine ? (addButton.style.display = "none") : "";
//                 addButton.addEventListener("click", buttonAddTimelineHandler);
//                 const tdButton = document.createElement("td");
//                 divButton.appendChild(playButton);
//                 divButton.appendChild(addButton);
//                 tdButton.appendChild(divButton);
//                 tr.appendChild(tdButton);
//                 tbody.appendChild(tr);
//               });
//               function buttonAddTimelineHandler(e) {
//                 let buttonTarget = e.target.id;
//                 let buttonid = buttonTarget.slice(1);
//                 let currnetNodeClickButton = data.find(
//                   (node) => node.id == buttonid
//                 );
//                 const { id, time, name } = currnetNodeClickButton;
//                 let obj = {
//                   id: id,
//                   content: name,
//                   start: time.start,
//                   end: time?.end,
//                 };
//                 itemInTimeLine.push(obj);
//                 currentTimeLine.setItems(itemInTimeLine);
//                 let btnStyle = e.target;
//                 btnStyle.style.display = "none";
//               }
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         }
//         let $myData = myData.slice(0, 5);
//         $myData.map((node) => {
//           const { name, id, time } = node;
//           const tr = document.createElement("tr");
//           const tdId = document.createElement("td");
//           tdId.innerHTML = id;
//           tr.appendChild(tdId);
//           const tdName = document.createElement("td");
//           tdName.innerHTML = name;
//           tr.appendChild(tdName);
//           const tdTime = document.createElement("td");
//           tdTime.innerHTML = `${time.start}:${
//             time.end ? time.end : "0000-00-00"
//           }`;
//           tr.appendChild(tdTime);
//           let addButton = document.createElement("button");
//           addButton.classList.add("btn");
//           addButton.classList.add("btn-success");
//           addButton.classList.add("addButton");
//           addButton.id = `z${node.id}`;
//           addButton.innerHTML = "+";
//           const playButton = document.createElement("button");
//           playButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
//                     <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
//                         </svg>`;
//           playButton.classList.add("btn");
//           playButton.classList.add("btn-warning");
//           playButton.classList.add("buttonPlayer");
//           playButton.setAttribute("data-bs-toggle", "modal");
//           playButton.setAttribute("data-bs-target", "#exampleModal2");
//           const tdButton = document.createElement("td");
//           const divButton = document.createElement("div");
//           divButton.classList.add("btn-group");
//           divButton.style.direction = "ltr";

//           let findButtonInTimeLine = itemInTimeLine.find(
//             (w) => w.id == node.id
//           );
//           findButtonInTimeLine ? (addButton.style.display = "none") : "";
//           addButton.addEventListener("click", buttonAddTimelineHandler);

//           divButton.appendChild(playButton);
//           divButton.appendChild(addButton);
//           tdButton.appendChild(divButton);
//           tr.appendChild(tdButton);
//           tbody.appendChild(tr);
//         });
//         function buttonAddTimelineHandler(e) {
//           let buttonTarget = e.target.id;
//           let buttonid = buttonTarget.slice(1);
//           let currnetNodeClickButton = myData.find(
//             (node) => node.id == buttonid
//           );
//           const { id, time, name } = currnetNodeClickButton;
//           let obj = {
//             id: id,
//             content: name,
//             start: time.start,
//             end: time?.end,
//           };
//           itemInTimeLine.push(obj);
//           currentTimeLine.setItems(itemInTimeLine);
//           let btnStyle = e.target;
//           btnStyle.style.display = "none";
//         }
//       }
//       searchFromData();
//     }
//   } else {
//     tbody.innerHTML = "";
//     let listButton = document.querySelector(".pagination");
//     listButton.innerHTML = "";
//     getDataForFirstTime();
//   }
// });

// const addButton = document.querySelectorAll(".addButton");
// for (let i = 0; i < addButton.length; i++) {
//   addButton[i].addEventListener("click", () => {
//     let node = myDataItem.allItem.find((node) => node.id == addButton[i].id);
//     itemInTimeLine.push(node);
//     currentTimeLine.setItems([...itemInTimeLine]);
//     addButton[i].style.display = "none";
//   });
// }
