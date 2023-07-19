import "./style.css";
import {createButton} from "../utility/domUtility";
import {setitem, getItem} from "../utility/localStorage";
import {updateTimeInTimeLine} from "../utility/clock";
import modal from "./modal";
import timeLine from "../componet/timeLine";
import table from "../componet/table";
import timespan from "./timespan";

const programItemConfig = {
  eleId: "programItemConfig",
};
const itemInTimeLineTable = {
  eleId: "itemInTimeLineTable",
};
class index {
  constructor() {
    this.app = document.querySelector("#app");
    this.modal = new modal();
    this.itemInTimeLine = getItem() ? getItem() : [];
    this.timeLine;
    this.timespan = new timespan(this.itemInTimeLine);
    this.myTimeLine;
    this.table = new table(
      this.itemInTimeLine,
      this.allDataInDataBase,
      this.timeLine
    );
    this.allDataInDataBase;
  }

  //start when start project it get data from backend and use method to create modalItem
  getData() {
    fetch("https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items", {
      method: "GET",
      headers: {"content-type": "application/json"},
    })
      .then((res) => res.json())
      .then((data) => {
        this.allDataInDataBase = data;
        programItemConfig.col = data;
        this.addTableInModal();
        this.table.createButtonPagination(data);
        this.setAddButtonInTimeLineAndTable(data);
      });
  }
  //end when start project it get data from backend and use method to create modalItem

  //start create button for editable timeLine
  buttonForEditAble() {
    let editButton = createButton("ویرایش", "btn btn-success", "editAble");
    let cancleEditButton = createButton(
      "لغو ویرایش",
      "btn btn-danger",
      "editAbleCancle"
    );
    let areaEditButton = document.createElement("div");
    areaEditButton.classList.add("areaEditButton");
    areaEditButton.innerHTML += editButton;
    areaEditButton.innerHTML += cancleEditButton;
    let buttonArea = document.createElement("div");
    buttonArea.classList.add("buttonArea");
    buttonArea.appendChild(areaEditButton);
    this.app.appendChild(buttonArea);
  }
  //end create button for editable timeLine

  //start create modal button in main page
  showModalItemButton() {
    let buttonArea = document.querySelector(".buttonArea");
    let showItemButtonInModal = createButton(
      "افزودن به برنامه",
      "btn btn-primary",
      "showItemButtonInModal",
      1
    );
    buttonArea.innerHTML += showItemButtonInModal;
  }
  //end create modal button in main page

  //start create all modals
  createModal() {
    this.modal.createTypeOfModalAndAddToDom(1, "افزودن به برنامه", "pagin");
    this.modal.createTypeOfModalAndAddToDom(2, "نمایش فیلم", "film");
    this.modal.createTypeOfModalAndAddToDom(3, "حذف ایتم", "deleteItem");
    this.modal.createTypeOfModalAndAddToDom(4, "ویرایش", "edit");
  }
  //end create all modals

  createTimeLine() {
    let timeLineArea = document.createElement("div");
    let myTimeLine = new timeLine(this.itemInTimeLine, timeLineArea);
    this.timeLine = myTimeLine.generateTimeLine();
    this.app.appendChild(timeLineArea);
  }

  //start to create table in modal for show item to add
  addTableInModal() {
    let tableTemplate = this.table.createTableTemplate(programItemConfig);
    let modalBody = document.querySelector("#modalBody1");
    modalBody.innerHTML = tableTemplate;
    let rows = this.table.createRow(programItemConfig, this.itemInTimeLine);
    let tbody = document.querySelector("#programItemConfig");
    for (let i = 0; i < rows.length; i++) {
      tbody.innerHTML += rows[i];
    }
  }
  //end to create table in modal for show item to add

  //start event addButton to timeLine and Table
  setAddButtonInTimeLineAndTable() {
    let buttons = document.querySelectorAll(".addButtonInTimeLine");
    for (let j = 0; j < buttons.length; j++) {
      buttons[j].removeEventListener(
        "click",
        this.addButtonInTimeLineAndTableHandler.bind(this)
      );
    }
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener(
        "click",
        this.addButtonInTimeLineAndTableHandler.bind(this)
      );
    }
    // console.log("alire");
  }
  addButtonInTimeLineAndTableHandler(e) {
    let buttonTarget = e.target.id;
    let buttonId = buttonTarget.substr(-1);
    let currnetNodeClickButton = this.allDataInDataBase.find(
      (node) => node.id == buttonId
    );
    const {id, duration, name} = currnetNodeClickButton;
    let lastItemInTimeLine = this.itemInTimeLine.length
      ? this.itemInTimeLine[this.itemInTimeLine.length - 1].end
      : 0;
    let obj = {
      id: id,
      content: name,
      start: lastItemInTimeLine,
      end: lastItemInTimeLine + duration,
    };
    this.itemInTimeLine.push(obj);
    this.timeLine.setItems(this.itemInTimeLine);
    let btnStyle = e.target;
    btnStyle.style.visibility = "hidden";
    // document.querySelector(".tbodyForShowItem").innerHTML = "";

    // tableShowItem.createRowTable(this.itemInTimeLine);
    // this.deleteButtonInTable();
    // this.editButtonInTable()

    let a = document.querySelector(".itemInTimeLineTable")
      ? document.querySelector(".itemInTimeLineTable").remove()
      : "a";
    this.createTableForShowItem();
    this.setDeleteEvent();
    this.setEditButton();
    setitem(this.itemInTimeLine);
  }
  //end event addButton to timeLine and Table

  //start event editable button
  setEditableEvent() {
    let editableButton = document.querySelector("#editAble");
    editableButton.removeEventListener(
      "click",
      this.editableHandler.bind(this)
    );
    editableButton.addEventListener("click", this.editableHandler.bind(this));
    let editabbleCancle = document.querySelector("#editAbleCancle");
    editabbleCancle.removeEventListener(
      "click",
      this.editableCancleHandler.bind(this)
    );
    editabbleCancle.addEventListener(
      "click",
      this.editableCancleHandler.bind(this)
    );
  }
  editableCancleHandler() {
    document.querySelector("#editAble").style.display = "block";
    document.querySelector("#editAbleCancle").style.display = "none";
    this.timeLine.cancleEditAbleEvent();
  }
  editableHandler(e) {
    document.querySelector("#editAble").style.display = "none";
    document.querySelector("#editAbleCancle").style.display = "block";
    let self = this;
    this.timeLine.setOptions({
      editable: {
        updateTime: true,
        updateGroup: true,
        overrideItems: true,
        remove: true,
      },
      onRemove: function (item, callback) {
        let nodeId = `#addButtonInTimeLine${item.id}`;
        let addButton = document.querySelector(nodeId);
        addButton.style.visibility = "visible";
        self.itemInTimeLine = self.itemInTimeLine.filter(
          (node) => node.id !== item.id
        );
        // document.querySelector(".itemInTimeLineTable").remove()
        // self.createTableForShowItem()
        // document.querySelector(".tbodyForShowItem").innerHTML = "";
        // tableShowItem.createRowTable(self.itemInTimeLine);
        // self.deleteButtonInTable();
        // self.editButtonInTable()
        document.querySelector(".itemInTimeLineTable").remove();
        self.createTableForShowItem();
        setitem(self.itemInTimeLine);
        self.setDeleteEvent();
        self.setEditButton();
        callback(item);
      },
      onMoving: (item, callback) => {
        let currentItem = self.allDataInDataBase.find(
          (node) => node.id == item.id
        );
        let currentItemInTimeLine = this.itemInTimeLine.find(
          (node) => node.id == item.id
        );
        let indexNode = this.itemInTimeLine.indexOf(currentItemInTimeLine);
        let resultStart = updateTimeInTimeLine(item, "start");
        currentItemInTimeLine.start = resultStart;
        let resultEnd = updateTimeInTimeLine(item, "end");
        currentItemInTimeLine.end = resultEnd;
        this.start = new Date(item.start);
        this.end = new Date(item.end);
        let duration = this.end - this.start;
        if (duration == currentItem.duration) {
          if (
            new Date(item.start).getTime() >= 0 &&
            new Date(item.end).getTime() <= 86454321
          ) {
            // document.querySelector(".tbodyForShowItem").innerHTML = "";
            callback(item);
            this.itemInTimeLine.sort((a, b) => {
              if (a.start > b.start) {
                return -1;
              } else {
                return 1;
              }
            });
            this.itemInTimeLine.reverse();
            setitem(this.itemInTimeLine);
            document.querySelector(".itemInTimeLineTable").remove();
            self.createTableForShowItem();
            self.setDeleteEvent();
            self.setEditButton();
            // tableShowItem.createRowTable(this.itemInTimeLine);
            // this.deleteButtonInTable();
            // this.editButtonInTable();
          }
        }
      },
    });
  }
  //end event editable button

  //start create table for show item in timeLine
  createTableForShowItem() {
    itemInTimeLineTable.col = this.itemInTimeLine;
    let tableArea = document.createElement("div");
    tableArea.style.direction = "rtl";
    let tableTemplate = this.table.createTableTemplate(itemInTimeLineTable);
    tableArea.innerHTML = tableTemplate;
    let rows = this.table.createRow(itemInTimeLineTable, this.itemInTimeLine);
    this.app.appendChild(tableArea);
    let tbody = document.querySelector("#itemInTimeLineTable");
    for (let i = 0; i < rows.length; i++) {
      tbody.innerHTML += rows[i];
    }
  }
  //end create table for show item in timeLine

  //start delete button
  setDeleteEvent() {
    let deleteButton = document.querySelectorAll(".deleteButtonInTable");
    for (let i = 0; i < deleteButton.length; i++) {
      deleteButton[i].addEventListener(
        "click",
        this.deleteHandlerButton.bind(this)
      );
    }
  }
  deleteHandlerButton(e) {
    let id = e.target.dataset.id;
    this.id = id;
    let modal = document.querySelector("#modalBody3");
    modal.innerHTML = `ایا مایل یه حذف ایتم ${id} هستید`;
    let deleteButtonInModal = document.querySelector("#deleteButtonInModal");
    deleteButtonInModal.removeEventListener(
      "click",
      this.deleteItemHandler.bind(this)
    );
    deleteButtonInModal.addEventListener(
      "click",
      this.deleteItemHandler.bind(this)
    );
  }
  deleteItemHandler() {
    this.itemInTimeLine = this.itemInTimeLine.filter(
      (node) => node.id !== this.id
    );
    setitem(this.itemInTimeLine);
    document.querySelector(".itemInTimeLineTable").remove();
    this.createTableForShowItem();
    this.timeLine.setItems(this.itemInTimeLine);
    document.querySelector(`#addButtonInTimeLine${this.id}`).style.visibility =
      "visible";
  }
  //end delete button

  //start add timespan in modal
  setEditButton() {
    let editButton = document.querySelectorAll(".editButtonInTable");
    for (let i = 0; i < editButton.length; i++) {
      editButton[i].addEventListener("click", this.editButtonTable.bind(this));
    }
  }
  editButtonTable(e) {
    this.timespan.findNodeForSetTimeInInput(e.target);
    let template = this.timespan.createTemplate();
    let modal = document.querySelector("#modalBody4");
    modal.innerHTML = template;
    this.timespan.setValidInput();
    let enterEditButton = document.querySelector("#addEditButton");
    enterEditButton.addEventListener("click", () => {
      let newTimeByEdit = this.timespan.enterEditation();
      let findForEnterEdit = this.itemInTimeLine.find(
        (node) => node.id == e.target.dataset.id
      );
      findForEnterEdit.start = newTimeByEdit.start;
      findForEnterEdit.end = newTimeByEdit.end;
      document.querySelector(".itemInTimeLineTable").remove();
      this.createTableForShowItem();
      this.timeLine.setItems(this.itemInTimeLine);
      setitem(this.itemInTimeLine);
    });
  }
  //end add timespan in modal
}

export default index;
