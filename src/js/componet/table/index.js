import localStoragefunction from "../../localStoragefunction";
import { changeMiliSecondTohhmmss , creatDataForm } from "../../utility/clock";

const dictionary = {
  name: "نام",
  duration: "مدت زمان",
  start: "شروع",
  end: "پایان",
  content:"نام"
};
class Table {
  constructor(itemInTimeLine, allDataInDataBase, timeLine) {
    this.itemInTimeLine = itemInTimeLine;
    this.allDataInDataBase = allDataInDataBase;
    this.timeLine = timeLine;
  }
  createTableTemplate(option) {
    if(option.col.length){
      return `<table class="table ${option.eleId}">
      <thead>
      <tr>
      <td>#</td>
      ${Object.keys(option.col[0])
        ?.map((node) => {
          if (node !== "id") {
            return `<td>${dictionary[node]}</td>`;
          }
        })
        .join(" ")}
              <td>عملیات</td>
            </tr>
          </thead>
          <tbody id=${option.eleId}></tbody>
      </table>`;
    }
    return ""
  }

  createButtonPagination(items) {
    let listPagination = document.querySelector(".pagination");
    for (let i = 0; i < Math.ceil(items.length / 5); i++) {
      let id = i + 1;
      let itemPagination = `<li>
        <button class="page-link">${id}</button>
      </li>`;
      listPagination.innerHTML += itemPagination;
    }
  }

  createRow(list,itemInTimeLine) {
    return list.col.map((item) => {
      const { name, id, duration ,start, end , content } = item;
      let durationTime = list.eleId === "programItemConfig" ? changeMiliSecondTohhmmss(duration):"";
      let startTime = creatDataForm(start)
      let endTime = creatDataForm(end)
      let isItemInTimeLine = itemInTimeLine?.find((node) => node.id == id);
      let style = isItemInTimeLine
        ? "visibility :hidden;"
        : "visibility :visible;";
      return `<tr>
                <td>${id}</td>
                ${list.eleId =="programItemConfig"?`
                    <td>${name}</td>
                    <td>${durationTime}</td>
                    <td>
                      <div>
                          <button class="btn btn-primary addButtonInTimeLine" id="addButtonInTimeLine${id}" style="${style}">+</button>
                          <button class="btn btn-success buttonPlayer" data-bs-toggle="modal" data-bs-target="#exampleModal2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                          </svg></button>
                      </div>
                    </td>
                    `:`
                    <td>${content}</td>
                    <td>${startTime}</td>
                    <td>${endTime}</td>
                    <td>
                      <div>
                        <button class="btn btn-warning editButtonInTable" data-bs-toggle="modal" data-bs-target="#exampleModal4" data-id="${id}">ویرایش</button>
                        <button class="btn btn-danger deleteButtonInTable" id="deleteButtonInTable${id}" data-id="${id}" data-bs-toggle="modal" data-bs-target="#exampleModal3">حذف</button>
                      </div>
                    </td>
                    `}
            </tr>`;
    });
  }
 addRowInTable(list) {
    let itemInTimeLine = localStoragefunction.getItem();
    let tbody = document.querySelector("tbody");
    let tableTamplate = this.rowTemplate(list, itemInTimeLine);
    for (let i = 0; i < tableTamplate.length; i++) {
      tbody.innerHTML += tableTamplate[i];
    }
    const addButtons = document.querySelectorAll(".addButton");
    for (let i = 0; i < addButtons.length; i++) {
      addButtons[i].removeEventListener("click", this.buttonAddTimelineHandler);
      addButtons[i].addEventListener("click", this.buttonAddTimelineHandler);
    }
  }

  // addButtonInTimeLineAndTable(data) {
  //   // this.allDataInDataBase = data;
  //   let buttons = document.querySelectorAll(".addButtonInTimeLine");
  //   for (let i = 0; i < buttons.length; i++) {
  //     buttons[i].addEventListener("click",()=>console.log("alireza"))
  //   }
  // }
}
export default Table;
