import "../styles/modal.css"
// import search from "./search"
import myDataItem from "./items"
import mydataBaseButtonNumber from "./main"
// console.log(myItems.allItems);
// import button from "./addButton"

let modal = `
<!-- Button trigger modal -->
<div class="text-center m-4">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    افزودن به برنامه
    </button>
</div>


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-light">
        <h1 class="modal-title fs-5" id="exampleModalLabel">افزودن برنامه به تایم لاین</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="input-group mb-3">
       <input id="inputSearch" class="form-control" placeholder="جستجو..."/>
      </div>
      <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">نام</th>
          <th scope="col">مدت زمان</th>
          <th scope="col">عملیات</th>
        </tr>
      </thead>
      <tbody>
        ${myDataItem.partOneItem.map(node=>{
          return(
            `<tr class="tableone">
              <td>${node.id}</td>
              <td>${node.content}</td>
              <td>${node.start}:${node.end?node.end:"0000-00-00"}</td>
              <td><button class="btn btn-success addButton" id="${node.id}">+</button></td>
            </tr>`
          )
        })}
        ${
          myDataItem.mydataBaseButtonNumber?.map(node=>{
            return(`<tr class="display tabletwo">
              <td>${node.id}</td>
              <td>${node.content}</td>
              <td><button class="btn btn-success addButton" id="${node.id}">+</button></td>
            </tr>`)
        })
        }
        ${
          myDataItem.partThreeItem.map(node=>{
            return(`<tr class="display tablethree">
              <td>${node.id}</td>
              <td>${node.content}</td>
              <td>${node.start}:${node.end?node.end:"0000-00-00"}</td>
              <td><button class="btn btn-success addButton" id="${node.id}">+</button></td>
            </tr>`)
        })
        }
      </tbody>
    </table>
      </div>
      <div class="modal-footer bg-light">
          <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><button class="page-link active" id="buttonPage1">1</button></li>
            <li class="page-item"><button class="page-link" id="buttonPage2">2</button></li>
            <li class="page-item"><button class="page-link" id="buttonPage3">3</button></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</div>
`
let modalArea = document.createElement('div')
modalArea.classList.add("modalArea")
modalArea.innerHTML=modal
export default modalArea
        // ${myDataItem.partOneItem.map(node=>{
        //   return`
        //   <tr>
        //     <td>${node.id}</td>
        //     <td>${node.content}</td>
        //     <td>${node.start}:${node.end?node.end:"0000-00-00"}</td>
        //     <td><button class="btn btn-success addButton" id=${node.id}>+</button></td>
        //   </tr>
        //   `
        // })}