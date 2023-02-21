import "../scss/styles.scss";
import "../styles/main.css";
import * as bootstrap from "bootstrap";
import createTimeLine from "./createTimeLIne";
import createModal from "./createModal";
import table from "./table";
import "../styles/modal.css";
class main {
  constructor() {
    this.app = document.querySelector("#app");
    this.itemInTimeLine = [];
    this.addEventHandler = this.buttonAddTimelineHandler.bind(this);
    // this.b=this.addEventListenerForMyAddButton.bind(this)
    this.buttonCondition = false
  }
  wacher() {
    // console.log(typeof this.$buttonAddTimelineHandler);
  }

  creatModalProgram() {
    let divShowItemArea = document.createElement("div");
    divShowItemArea.innerHTML = createModal.myModal(
      1,
      "افزودن به برنامه",
      true
    );
    this.app.appendChild(divShowItemArea);
  }

  addEventListenerInItems(items,listener){
    for (let i = 0; i < items.length; i++) {
      items[i].removeEventListener("click",listener)
      items[i].addEventListener("click",listener)
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
    let buttonForShowModal = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">Launch demo modal</button>`;
    let modalAreaButton = document.createElement("div");
    modalAreaButton.innerHTML = buttonForShowModal;
    this.app.appendChild(modalAreaButton);
  }

  addTableInModal() {
    let divTableArea = document.createElement("div");
    divTableArea.innerHTML = table.myTable();
    document.querySelector("#id1").appendChild(divTableArea);
  }

  createTimeLineInApp() {
    let item = [];
    const options = {
      editable: {
        add: true,
        updateTime: true,
        updateGroup: true,
        overrideItems: false,
        updateTime: true,
        remove: true,
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
      // max: "2013-04-20",
      // min: "2013-04-19",
      // start: "2013-04-19",
      // end: "2013-04-20",
    };

    let timeLineArea = document.createElement("div");
    let timeLine = new createTimeLine(item, timeLineArea, options);
    this.currentTimeLine = timeLine.generateTimeLine(options);
    this.app.appendChild(timeLineArea);
  }


  setClockTemplate(item){
    let clock = new Date(item)
    let h = clock.getHours()
    let m = clock.getMinutes()
    let s = clock.getSeconds()
    return `${h}:${m}:${s}`
  }

  buttonAddTimelineHandler(e) {
    let buttonTarget = e.target.id;
    let buttonId = buttonTarget.substr(-1);
    let currnetNodeClickButton = this.data.find((node) => node.id == buttonId);
    const { id, end ,start , name } = currnetNodeClickButton;
    console.log(this.setClockTemplate(start));
    let obj = {
      id: id,
      content: name,
      start:this.setClockTemplate(start),
      end:this.setClockTemplate(end),
    };
    this.itemInTimeLine.push(obj)
    this.currentTimeLine.setItems(this.itemInTimeLine);
    let btnStyle = e.target;
    btnStyle.style.display = "none";
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
        table.createRow(data,this.itemInTimeLine);
        const addButtons = document.querySelectorAll(".addButton");
        for (let i = 0; i < addButtons.length; i++) {
          addButtons[i].addEventListener("click", this.buttonAddTimelineHandler.bind(self));
        }
      });
  }


  styleConditionMethod(item){
    return this.itemInTimeLine.find(node=>node.id==item.id)
  }


  getDataFromApi() {
    fetch("https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then(($data) => {
        this.data=$data
        createModal.buttonPagination($data);
        let paginationButton = document.querySelectorAll(".page-link");
        for (let i = 0; i < paginationButton.length; i++) {
          paginationButton[i].addEventListener(
            "click",
            this.paginationButtonHandler.bind(this)
          );
        }
        let firstAddButton = document.querySelectorAll(".addButton")
        for (let i = 0; i < firstAddButton.length; i++) {
          firstAddButton[i].removeEventListener("click", this.buttonAddTimelineHandler.bind(this));
          firstAddButton[i].addEventListener("click", this.buttonAddTimelineHandler.bind(this));
        }
      });
  }
}

export default main;
