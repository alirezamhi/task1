import "../scss/styles.scss";
import "../styles/main.css";
import * as bootstrap from "bootstrap";
import createTimeLine from "./createTimeLIne";
import createModal from "./createModal";
import table from "./table";
import "../styles/modal.css";
import localStoragefunction from "./localStoragefunction";
import "../styles/buttonArea.css";
import tableShowItem from "./tableShowItem";

class main {
  constructor() {
    this.app = document.querySelector("#app");
    this.itemInTimeLine = localStoragefunction.getItem()
      ? localStoragefunction.getItem()
      : [];
    this.addEventHandler = this.buttonAddTimelineHandler.bind(this);
    // this.b=this.addEventListenerForMyAddButton.bind(this)
    this.buttonCondition = false;
    this.start;
    this.end;
  }
  setLocalstorage() {
    localStoragefunction.setitem(this.itemInTimeLine);
  }
  wacher() {}

  creatModalProgram() {
    let divShowItemArea = document.createElement("div");
    divShowItemArea.innerHTML = createModal.myModal(
      1,
      "افزودن به برنامه",
      true
    );
    this.app.appendChild(divShowItemArea);
  }

  addEventListenerInItems(items, listener) {
    for (let i = 0; i < items.length; i++) {
      items[i].removeEventListener("click", listener);
      items[i].addEventListener("click", listener);
    }
  }

  creatModalMovie() {
    let divShowMovieArea = document.createElement("div");
    divShowMovieArea.innerHTML = createModal.myModal(2, "نمایش فیلم");
    this.app.appendChild(divShowMovieArea);
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
  }

  createButtonShowModal() {
    let buttonForShowModal = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">افزودن برنامه</button>`;
    let buttonForEditable = `<button class="btn btn-danger" id="editAble">ویرایش</button>`;
    let modalAreaButton = document.createElement("div");
    modalAreaButton.classList.add("areaButton");
    modalAreaButton.innerHTML += buttonForShowModal;
    modalAreaButton.innerHTML += buttonForEditable;
    this.app.appendChild(modalAreaButton);
  }

  addTableInModal() {
    let divTableArea = document.createElement("div");
    divTableArea.innerHTML = table.myTable();
    document.querySelector("#id1").appendChild(divTableArea);
  }

  getLastItemInTimeLine() {
    if (this.itemInTimeLine.length) {
      let node = this.itemInTimeLine[this.itemInTimeLine.length - 1];
      return node.end + 1000;
    }
    return 0;
  }

  createTimeLineInApp() {
    let item = this.itemInTimeLine;
    let self = this;
    const options = {
      editable: {
        add: false,
        updateTime: false,
        updateGroup: false,
        overrideItems: false,
        updateTime: false,
        remove: false,
      },
      // zoomable: false,
      // zoomMax: 86400000,
      // zoomMin: 86400000,
      // showCurrentTime: false,
      // moveable: false,
      // stack:false,
      // stackSubgroups:false,
      // zoomKey:'day',
      // timeAxis: {scale: 'hour', step: 5},
      max: 86400000,
      min: 0,
      start: 0,
      end: 86400000,
      onRemove: function (item, callback) {
        let node = self.itemInTimeLine.find((node) => node.id == item.id);
        let id = item.id;
        let nodeId = `#addButton${item.id}`;
        let addButton = document.querySelector(nodeId);
        addButton.style.visibility = "visible";
        self.itemInTimeLine = self.itemInTimeLine.filter(
          (node) => node.id !== item.id
        );
        console.log(self.itemInTimeLine,"delete");
        document.querySelector(".tbodyForShowItem").innerHTML=""
        tableShowItem.createRowTable(self.itemInTimeLine)
        localStoragefunction.setitem(self.itemInTimeLine);
        callback(item);
      },
    };

    let timeLineArea = document.createElement("div");
    let timeLine = new createTimeLine(item, timeLineArea, options);
    this.currentTimeLine = timeLine.generateTimeLine(options);
    this.app.appendChild(timeLineArea);
    
  }

  setClockTemplate(item) {
    let clock = new Date(item);
    // return clock
    clock.getUTCSeconds(item);
    return clock.toISOString().slice(11, 19);
    // return clock
    // let h = clock.getHours();
    // let m = clock.getMinutes();
    // let s = clock.getSeconds();
    // return `${h}:${m}:${s}`;
  }

  buttonAddTimelineHandler(e) {
    let buttonTarget = e.target.id;
    let buttonId = buttonTarget.substr(-1);
    let currnetNodeClickButton = this.data.find((node) => node.id == buttonId);
    const { id, duration, name } = currnetNodeClickButton;
    let obj = {
      id: id,
      content: name,
      start: this.getLastItemInTimeLine(),
      end: this.getLastItemInTimeLine() + duration,
    };
    this.itemInTimeLine.push(obj);
    this.currentTimeLine.setItems(this.itemInTimeLine);
    let btnStyle = e.target;
    btnStyle.style.visibility = "hidden";
    document.querySelector(".tbodyForShowItem").innerHTML=""
    tableShowItem.createRowTable(this.itemInTimeLine)
    localStoragefunction.setitem(this.itemInTimeLine);
  }

  paginationButtonHandler(e) {
    let self = this;
    let tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    let targerId = e.target.innerHTML;
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
        table.createRow(data);
        const addButtons = document.querySelectorAll(".addButton");
        for (let i = 0; i < addButtons.length; i++) {
          addButtons[i].addEventListener(
            "click",
            this.buttonAddTimelineHandler.bind(self)
          );
        }
      });
  }

  styleConditionMethod(item) {
    return this.itemInTimeLine.find((node) => node.id == item.id);
  }

  getDataFromApi() {
    fetch("https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then(($data) => {
        this.data = $data;
        createModal.buttonPagination($data);
        let paginationButton = document.querySelectorAll(".page-link");
        for (let i = 0; i < paginationButton.length; i++) {
          paginationButton[i].addEventListener(
            "click",
            this.paginationButtonHandler.bind(this)
          );
        }
        let firstAddButton = document.querySelectorAll(".addButton");
        for (let i = 0; i < firstAddButton.length; i++) {
          firstAddButton[i].removeEventListener(
            "click",
            this.buttonAddTimelineHandler.bind(this)
          );
          firstAddButton[i].addEventListener(
            "click",
            this.buttonAddTimelineHandler.bind(this)
          );
        }
      });
  }

  Editable() {
    let editAbleButton = document.querySelector("#editAble");
    editAbleButton.addEventListener(
      "click",
      this.editableButtonHandler.bind(this)
    );
  }

  editableButtonHandler() {
    this.currentTimeLine.setOptions({
      editable: {
        updateTime: true,
        updateGroup: true,
        overrideItems: true,
        remove: true,
      },
      onMoving:(item,callback)=>{
        
        let currentItem = this.data.find(node=>node.id==item.id)
        this.start = new Date(item.start)
        this.end = new Date(item.end)
        let duration = this.end-this.start
        if(duration==currentItem.duration){
          callback(item)
        }
      }
    });
  }
  createTableForShowItem(){
    let table = tableShowItem.createTableTemplate()
    console.log(this.start,"startadsfgasdf");
    let divTableArea = document.createElement("div")
    divTableArea.innerHTML=table
    this.app.appendChild(divTableArea)
    tableShowItem.createRowTable(this.itemInTimeLine,)
  }

}

export default main;
