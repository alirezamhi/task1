class modal {
  constructor(items,itemInTimeLine){
    this.items = items
    this.itemInTimeLine = itemInTimeLine
    this.currentNode 
  }
  modalTemplate(modalId, header, footer) {
    return `<div>
      <div class="modal fade" id="exampleModal${modalId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${header}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="modalBody${modalId}"></div>
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
              </div>`
            :footer=="deleteItem"?
              `<div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >انصراف</button>
                <button type="button" class="btn btn-danger" id="deleteButtonInModal" data-bs-dismiss="modal">حذف</button>
              </div>`
            :footer=="edit"?
              `<div class="modal-footer">
                <button class="btn btn-success" id="addEditButton" data-bs-dismiss="modal">تایید</button>
              </div>`:""
          }
        </div>
      </div>
    </div>
  </div>`;
 }

  createModalMovieBody(){
    let movieHtml = `
    <video width="320" height="240" controls>
        <source src="https://mediamarketstreamer.iriborg.ir/timeshift/588/2023-02-14/123148271.mp4" type="video/mp4">
        <source src="https://mediamarketstreamer.iriborg.ir/timeshift/588/2023-02-14/123148271.mp4" type="video/ogg">
    </video>`
    return movieHtml
  }
  createTypeOfModalAndAddToDom(modalId, header, footer){
    let modal = this.modalTemplate(modalId, header, footer)
    let app = document.querySelector("#app")
    app.innerHTML+=modal
  }

}
export default modal;
