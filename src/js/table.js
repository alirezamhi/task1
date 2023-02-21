class table {
  alirezamhi;
  static myTable() {
    return `<table class="table">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">نام</th>
            <th scope="col">مدت زمان</th>
            <th scope="col">عملیات</th>
        </tr>
        </thead>
        <tbody>

        </tbody>
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

  static duringTime(start,end){
    let timeStart = new Date(start)
    let timeEnd = new Date(end)
    if(timeEnd<timeStart){
      timeEnd.setDate(timeEnd.getDate() + 1);
    }
    let different = timeEnd-timeStart
    let hh = Math.floor(different/1000/60/60)
    different-=(hh*1000*60*60)
    let mm = Math.floor(different/1000/60)
    different-=(mm*1000*60)
    let ss = Math.floor(different/1000)
    different-=(ss*1000)
    return `${hh}:${mm}:${ss}`
  }

  static rowTemplate(list, itemInTimeLine) {
    return list.map((item) => {
      const { name, id, start , end } = item;
      let duringTime = this.duringTime(start,end)
      let isItemInTimeLine = itemInTimeLine?.find(node=>node.id==id)
      return `<tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${duringTime}</td>
                <td>
                ${
                  isItemInTimeLine
                    ? `<button class="btn btn-warning buttonPlayer" data-bs-toggle="modal" data-bs-target="#exampleModal2">+</button>`
                    : `<div>
                        <button class="btn btn-success addButton" id="addButton${id}">+</button>
                        <button class="btn btn-warning buttonPlayer" data-bs-toggle="modal" data-bs-target="#exampleModal2">+</button>
                      </div>`
                }
                </td>
              </tr>`;
    });
  }
  static createRow(list, itemInTimeLine) {
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
export default table;
