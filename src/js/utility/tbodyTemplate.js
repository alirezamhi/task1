// import { getItem } from "./localStorage";
// import { duringTime } from "./clock";
// export function rowTemplateInModal(list) {
//     let itemInTimeLine = getItem()
//     return list.map((item) => {
//       const { name, id, duration } = item;
//       let durationTime = duringTime(duration);
//       let isItemInTimeLine = itemInTimeLine?.find((node) => node.id == id);
//       let style = isItemInTimeLine ? "visibility :hidden;":"visibility :visible;";
//       return `<tr>
//                 <td>${id}</td>
//                 <td>${name}</td>
//                 <td>${durationTime}</td>
//                 <td>
//                     <div>
//                         <button class="btn btn-success addButtonInTimeLine" id="addButton${id}" style="${style}">+</button>
//                         <button class="btn btn-warning buttonPlayer" data-bs-toggle="modal" data-bs-target="#exampleModal2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
//                         <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
//                       </svg></button>
//                     </div>
                
//                 </td>
//               </tr>`;
//     });
// }

// export function tamplateRowTableForItem(itemInTimeLine){
//     let num = 0
//     return itemInTimeLine.map(node=>{
//         num++
//         const {id,content,start,end} = node
//         let startDataForm =  this.creatDataForm(start)
//         let endDataForm = this.creatDataForm(end)
//         return(`
//             <tr id="tableForItem${id}">
//                 <td>${num}</td>
//                 <td>${content}</td>
//                 <td>${id}</td>
//                 <td>${startDataForm}</td>
//                 <td>${endDataForm}</td>
//                 <td>
//                 <div>
//                     <button type="button" class="btn btn-danger deleteItem" data-bs-toggle="modal" data-bs-target="#exampleModal3" id="deleteItem${id}">حذف</button>
//                     <button type="button" class="btn btn-info editButtonInTable" id="editTable${id}" data-bs-toggle="modal" data-bs-target="#exampleModal4">ویرایش</button>
//                 <div>
//                 </td>
//             </tr>
//         `
// )})}