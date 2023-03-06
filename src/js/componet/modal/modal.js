import table from "../table/table"
class createModal {
  static myModal(modalId, header, footer) {
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
          footer=="pagin"
            ? `<div class="modal-footer">
                <nav aria-label="Page navigation example">
                    <ul class="pagination"></ul>
                </nav>
            </div>`
            :footer=="film" ?
            `<div class="modal-footer">
              <button class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal1">برگشت</button>
            </div>
            `:
            footer=="deleteItem"?
              `<div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">انصراف</button>
                <button type="button" class="btn btn-danger" id="deleteButtonInModal" data-bs-dismiss="modal">حذف</button>
              </div>`
            :footer=="edit"?
              `<div class="modal-footer">
                <button class="btn btn-success" id="addEditButton" data-bs-dismiss="modal">تایید</button>
              </div>`:""
        }
      </div>
    </div>
  </div>`;
  }

  static createModalItemFirstTime(item){
    let itemFiveFirst = item.slice(0,5)
    let myFirstTable =  table.rowTemplate(itemFiveFirst)
    for (let i = 0; i < myFirstTable.length; i++) {
      document.querySelector('tbody').innerHTML+=myFirstTable[i]
    }
  }

  static buttonPagination(items){
    let listPagination = document.querySelector(".pagination")
    for (let i = 0; i < Math.ceil(items.length / 5); i++) {
      let id = i + 1;
      let itemPagination = `<li>
        <button class="page-link">${id}</button>
      </li>`
      listPagination.innerHTML+=itemPagination
    }
    this.createModalItemFirstTime(items)
  }
}
export default createModal;
