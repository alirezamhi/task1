import localStoragefunction from "../../localStoragefunction";
class Table {    
  createTableTemplate(temp) {
    return `<table class="table">
        <thead>
          <tr>
            ${temp.map(node=>`<th>${node}</th>`).join(" ")}
          </tr>
        </thead>
        <tbody></tbody>
    </table>
    `;
  }

  static buttonAddTimelineHandler(e) {
    let buttonTarget = e.target.id;
    let buttonid = buttonTarget.slice(-1);
    // let currnetNodeClickButton = this.allItem.filter(
    //   (node) => node.id == buttonid
    // );
    // let a = currnetNodeClickButton.shift();
    // const { id, time, name } = a;
    // let obj = {
    //   id: id,
    //   content: name,
    //   start: time.start,
    //   end: time?.end,
    // };
    // itemInTimeLine.push(obj);
    // currentTimeLine.setItems(itemInTimeLine);
    // let btnStyle = e.target;
    // btnStyle.style.display = "none";
  }

  static duringTime(duration) {
    let clock = new Date(duration);
    // clock.setMilliseconds(duration)
    // clock.getUTCSeconds();
    return clock.toISOString().slice(11, 19);
    //let durationSecond = duration/1000
    // let hh = clock.getHours();
    // let mm = clock.getMinutes();
    // let ss = clock.getSeconds();
    // return `${hh}:${mm}:${ss}`;
  }

  static rowTemplate(list) {
    let itemInTimeLine = localStoragefunction.getItem();
    return list.map((item) => {
      const { name, id, duration } = item;
      let durationTime = this.duringTime(duration);
      let isItemInTimeLine = itemInTimeLine?.find((node) => node.id == id);
      let style = isItemInTimeLine
        ? "visibility :hidden;"
        : "visibility :visible;";
      return `<tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${durationTime}</td>
                <td>
                    <div>
                        <button class="btn btn-success addButton" id="addButton${id}" style="${style}">+</button>
                        <button class="btn btn-warning buttonPlayer" data-bs-toggle="modal" data-bs-target="#exampleModal2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                      </svg></button>
                    </div>
                
                </td>
              </tr>`;
    });
  }
  static createRow(list) {
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
}
export default Table;
