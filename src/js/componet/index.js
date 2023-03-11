import "./style.css";
import { createButton } from "../utility/domUtility";
import modal from "./modal";
import timeLine from "../componet/timeLine";
import table from "../componet/table";
class index {
  constructor() {
    this.app = document.querySelector("#app");
    this.modal = new modal();
    this.table = new table();
    this.itemInTimeLine = [];
    this.timeLine;
  }

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

  showModalItemTableButton() {
    let buttonArea = document.querySelector(".buttonArea");
    let showItemButtonInModal = createButton(
      "افزودن به برنامه",
      "btn btn-primary",
      "showItemButtonInModal",
      1
    );
    buttonArea.innerHTML += showItemButtonInModal;
  }

  createModal() {
    this.modal.createTypeOfModalAndAddToDom(1, "افزودن به برنامه", "pagin");
    this.modal.createTypeOfModalAndAddToDom(2, "نمایش فیلم", "film");
    this.modal.createTypeOfModalAndAddToDom(
      3,
      "ایا مطمین هستید؟",
      "deleteItem"
    );
  }

  createTimeLine() {
    let timeLineArea = document.createElement("div");
    let myTimeLine = new timeLine(this.itemInTimeLine, timeLineArea);
    this.timeLine = myTimeLine.generateTimeLine();
    this.app.appendChild(timeLineArea);
  }

  addTableInModal() {
    let tableTemplate = this.table.createTableTemplate([1, 2, 3, 4]);
    let modalBody = document.querySelector("#modalBody1");
    modalBody.innerHTML = tableTemplate;
  }
}

export default index;
