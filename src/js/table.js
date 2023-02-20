class table {
  alirezamhi
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



  static rowTemplate(list) {
    return list.map((item) => {
      const { name, id, time } = item;
      return `<tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${time.start}</td>
                <td>
                   <div>
                        <button class="btn btn-success addButton" id="addButton${id}">+</button>
                        <button class="btn btn-warning buttonPlayer" data-bs-toggle="modal" data-bs-target="#exampleModal2">+</button>
                    </div>
                </td>
              </tr>`;
    });
  }
  static createRow(list) {
    let tbody = document.querySelector("tbody");
    let tableTamplate = this.rowTemplate(list);
    for (let i = 0; i < tableTamplate.length; i++) {
      tbody.innerHTML+=tableTamplate[i]
    };
    const addButtons = document.querySelectorAll(".addButton");  
    for (let i = 0; i < addButtons.length; i++) {
      addButtons[i].removeEventListener("click", this.buttonAddTimelineHandler);
      addButtons[i].addEventListener("click", this.buttonAddTimelineHandler);
    }
     
  }
  
  
}
export default table;
