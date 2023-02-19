import table from "./table";
class createModal {
  static myModal(modalId, header, footer = false) {
    return `<div class="modal fade" id="exampleModal${modalId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">${header}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="id${modalId}">

        </div>
        ${
          footer
            ? `<div class="modal-footer">
                <nav aria-label="Page navigation example">
                    <ul class="pagination"></ul>
                </nav>
            </div>`
            : ""
        }
        
      </div>
    </div>
  </div>`;
  }

  static paginationButtonHandler(e) {
    let targettext = e.target.id;
    let targerId = targettext.slice(-1);
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
        table.createRow(data)
      });
  }
  static buttonPagination(items,eventListener){
    let listPagination = document.querySelector(".pagination")
    for (let i = 0; i < Math.ceil(items.length / 5); i++) {
      let v = i + 1;
      let li = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = v;
      button.classList.add("page-link");
      button.removeEventListener("click",this.paginationButtonHandler);
      button.addEventListener("click", this.paginationButtonHandler);
      button.id = `z${v}`;
      li.appendChild(button);
      listPagination.appendChild(li);
    }
  }

  
  
}
export default createModal;
