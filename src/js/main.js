import '../scss/styles.scss';
import "../styles/main.css"
import * as bootstrap from 'bootstrap';
import createTimeLine from './createTimeLIne';
import header from "./header"
import myDataItem from './items';
import "../styles/modal.css"


export let itemInTimeLine = []
const options = {
    editable: {
        add: true,
        updateTime: true, 
        updateGroup: true,
        overrideItems: false,
        updateTime:true,
    }
}
export let myDataBaseButtonNumberForSearch = myDataItem.partOneItem
let item = []
let timeLineArea = document.createElement("div")
timeLineArea.classList.add("timeLineArea")
let timeLine = new createTimeLine(item,timeLineArea)
let app = document.querySelector("#app")
app.appendChild(header)


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
          
          </tbody>
          </table>
          </div>
          <div class="modal-footer bg-light">
          <nav aria-label="Page navigation example">
          <ul class="pagination">
          
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
app.appendChild(modalArea)
app.appendChild(timeLineArea)
const currentTimeLine = timeLine.generateTimeLine(options)
const tbody = document.querySelector("tbody")
fetch('https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items', {
method: 'GET',
headers: {'content-type':'application/json'},})
.then(res => res.json())
.then(tasks => {

    let listButton = document.querySelector(".pagination")
    // let li = document.createElement("li")
    // li.innerHTML=`<a class="page-link" href="#">&laquo;</a>`
    // li.classList.add("page-item")
    // listButton.appendChild(li)
    let v
    for (let i = 0; i < Math.ceil(tasks.length/5); i++) {
        v = i+1
        let li = document.createElement("li")
        let button = document.createElement("button")
        button.innerText=v
        button.classList.add("page-link")
        button.addEventListener("click",buttonHandler)
        button.id=`z${v}`
        li.appendChild(button)
        listButton.appendChild(li)
    }

    function buttonHandler(e){
        let targettext = (e.target.id)
        let targerId = targettext.slice(-1)
        tbody.innerHTML="" 
        const url = new URL('https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items')
        url.searchParams.append('completed', false)
        url.searchParams.append('page', targerId); 
        url.searchParams.append('limit', 5);
        fetch(url, {
        method: 'GET',
        headers: {'content-type':'application/json'},})
        .then(res => res.json())
        .then(data => { 
            data.map(node=>{
                const {name,id,time}=node
                const tr = document.createElement("tr")
                const tdId = document.createElement("td")
                tdId.innerHTML=id
                tr.appendChild(tdId)
                const tdName = document.createElement("td")
                tdName.innerHTML=name
                tr.appendChild(tdName)
                const tdTime = document.createElement("td")
                tdTime.innerHTML=`${time.start}:${time.end?time.end:"0000-00-00"}`
                tr.appendChild(tdTime)
                let addButton = document.createElement("button")
                addButton.classList.add("btn")
                addButton.classList.add("btn-success")
                addButton.classList.add("addButton")
                addButton.id=`z${node.id}`
                addButton.innerHTML="+"
                addButton.addEventListener("click",buttonAddTimelineHandler)
                const tdButton = document.createElement("td")
                tdButton.appendChild(addButton)
                tr.appendChild(tdButton)
                tbody.appendChild(tr)
            })
            function buttonAddTimelineHandler(e) {
                let buttonTarget = e.target.id
                let buttonid = buttonTarget.slice(1)
                let currnetNodeClickButton = data.find(node=>node.id==buttonid)
                const {id,time,name}=currnetNodeClickButton
                let obj = {
                    id:id,
                    content:name,
                    start:time.start,
                    end:time?.end
                }
                itemInTimeLine.push(obj)
                currentTimeLine.setItems(itemInTimeLine)
                let btnStyle = e.target
                btnStyle.style.display="none"
            }
        }).catch(error => {
            console.log(error);
        })
    }
    let $tasks=tasks.slice(0,5)

    // $tasks.map(node=>{
    //     const {name,id,time}=node
    //             const tr = document.createElement("tr")
    //             const tdId = document.createElement("td")
    //             tdId.innerHTML=id
    //             tr.appendChild(tdId)
    //             const tdName = document.createElement("td")
    //             tdName.innerHTML=name
    //             tr.appendChild(tdName)
    //             const tdTime = document.createElement("td")
    //             tdTime.innerHTML=`${time.start}:${time.end?time.end:"0000-00-00"}`
    //             tr.appendChild(tdTime)
    //             let addButton = document.createElement("button")
    //             addButton.classList.add("btn")
    //             addButton.classList.add("btn-success")
    //             addButton.classList.add("addButton")
    //             addButton.addEventListener("click",buttonAddTimelineHandler)
    //             addButton.innerHTML="+"
    //             addButton.id=`z${node.id}`
    //             const tdButton = document.createElement("td")
    //             tdButton.appendChild(addButton)
    //             tr.appendChild(tdButton)
    //             tbody.appendChild(tr)
    // })
    // function buttonAddTimelineHandler(e) {
    //     let buttonTarget = e.target.id
    //     let buttonid = buttonTarget.slice(-1)
    //     let currnetNodeClickButton = $tasks.filter(node=>node.id==buttonid)
    //     let a = currnetNodeClickButton.shift()
    //     const {id,time,name}=a
    //     let obj = {
    //         id:id,
    //         content:name,
    //         start:time.start,
    //         end:time?.end
    //     }
    //     itemInTimeLine.push(obj)
    //     currentTimeLine.setItems(itemInTimeLine)
    //     let btnStyle = e.target
    //     btnStyle.style.display="none"
    // }
    // let $li = document.createElement("li")
    // $li.innerHTML=`<a class="page-link" href="#">&raquo;</a>`
    // $li.classList.add("page-item")
    // listButton.appendChild($li)
}).catch(error => {
    return error
})



// const trTag = tbody.querySelectorAll("tr")
const inputSearch = document.querySelector("#inputSearch");
inputSearch.addEventListener("keypress",(e)=>{
    if(e.keyCode==13){
        e.preventDefault()
        let inputValueb = inputSearch.value
        const url = new URL('https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items');
        url.searchParams.append('name', inputValueb);
        fetch(url, {
            method: 'GET',
            headers: {'content-type':'application/json'},
          }).then(res => {
            if (res.ok) {
                return res.json();
            }
          }).then(tasks => {
            console.log(tasks);
          }).catch(error => {
            // handle error
          })
    }

    // const inputValueSearch = inputSearch.value.toUpperCase()
    // let node = myDataBaseButtonNumberForSearch.find(node=>node.content.toUpperCase()===inputValueSearch)
    // for (let i = 0; i < trTag.length; i++) {
    //     if (node) {
    //         trTag[i].style.display="none"
    //         document.querySelector(`#z${node.id}`).style.display=""
    //     }else{
    //         trTag[i].style.display=""
    //     }
    // }
    // myDataItem.partOneItem="alireza"

})
// let buttonPage1 = document.querySelector("#buttonPage1")
// let buttonPage2 = document.querySelector("#buttonPage2")
// let buttonPage3 = document.querySelector("#buttonPage3")
// let tableOne = document.querySelectorAll(".tableone")
// let tabletwo = document.querySelectorAll(".tabletwo")
// let tableThree = document.querySelectorAll(".tablethree")

// const url = new URL('https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items')
// url.searchParams.append('completed', false)
// url.searchParams.append('page', 1); 
// url.searchParams.append('limit', 5);
// fetch(url, {
// method: 'GET',
// headers: {'content-type':'application/json'},})
// .then(res => res.json())
// .then(data => {
// data.map(node=>{
//     const {name,id,time}=node
//     const trOne = document.createElement("tr")
//     const tdId = document.createElement("td")
//     tdId.innerHTML=id
//     trOne.appendChild(tdId)
//     const tdName = document.createElement("td")
//     tdName.innerHTML=name
//     trOne.appendChild(tdName)
//     const tdTime = document.createElement("td")
//     tdTime.innerHTML=`${time.start}:${time.end?time.end:"0000-00-00"}`
//     trOne.appendChild(tdTime)
//     let addButton = document.createElement("button")
//     addButton.classList.add("btn")
//     addButton.classList.add("btn-success")
//     addButton.classList.add("addButton")
//     addButton.innerHTML="+"
//     const tdButton = document.createElement("td")
//     tdButton.appendChild(addButton)
//     trOne.appendChild(tdButton)
//     tbody.appendChild(trOne)
// })
// }).catch(error => {
//     console.log(error);
// })

// buttonPage1.addEventListener("click",()=>{
//     tbody.innerHTML="" 
//     buttonPage1.classList.add("active")
//     // tableOne.forEach((node)=>{node.classList.remove("display")})
//     buttonPage2.classList.remove("active")
//     // tabletwo.forEach((node)=>{node.classList.add("display")})
//     buttonPage3.classList.remove("active")
//     // tableThree.forEach((node)=>{node.classList.add("display")})
//     myDataBaseButtonNumberForSearch=myDataItem.partOneItem
//     const url = new URL('https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items')
//     url.searchParams.append('completed', false)
//     url.searchParams.append('page', 1); 
//     url.searchParams.append('limit', 5);
//     fetch(url, {
//     method: 'GET',
//     headers: {'content-type':'application/json'},})
//     .then(res => res.json())
//     .then(data => {
//     data.map(node=>{
//         const {name,id,time}=node
//         const trOne = document.createElement("tr")
//         const tdId = document.createElement("td")
//         tdId.innerHTML=id
//         trOne.appendChild(tdId)
//         const tdName = document.createElement("td")
//         tdName.innerHTML=name
//         trOne.appendChild(tdName)
//         const tdTime = document.createElement("td")
//         tdTime.innerHTML=`${time.start}:${time.end?time.end:"0000-00-00"}`
//         trOne.appendChild(tdTime)
//         tbody.appendChild(trOne)
//     })
//     }).catch(error => {
//         console.log(error);
//     })
//     }
// )


// buttonPage2.addEventListener("click",()=>{
//     tbody.innerHTML="" 
//     buttonPage1.classList.remove("active")
//     tableOne.forEach((node)=>{node.classList.add("display")})
//     buttonPage2.classList.add("active")
//     tabletwo.forEach((node)=>{node.classList.remove("display")})
//     buttonPage3.classList.remove("active")
//     tableThree.forEach((node)=>{node.classList.add("display")})
//     myDataBaseButtonNumberForSearch=myDataItem.partTwoItem
//     const url = new URL('https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items')
//     url.searchParams.append('completed', false)
//     url.searchParams.append('page', 2); 
//     url.searchParams.append('limit', 5);
//     fetch(url, {
//     method: 'GET',
//     headers: {'content-type':'application/json'},})
//     .then(res => res.json())
//     .then(data => {
//     data.map(node=>{
//         const {name,id,time}=node
//         const trTwo = document.createElement("tr")
//         const tdId = document.createElement("td")
//         tdId.innerHTML=id
//         trTwo.appendChild(tdId)
//         const tdName = document.createElement("td")
//         tdName.innerHTML=name
//         trTwo.appendChild(tdName)
//         const tdTime = document.createElement("td")
//         tdTime.innerHTML=`${time.start}:${time.end?time.end:"0000-00-00"}`
//         trTwo.appendChild(tdTime)
//         tbody.appendChild(trTwo)
//     })
//     }).catch(error => {
//         console.log(error);
//     })
// })

// buttonPage3.addEventListener("click",()=>{
//     tbody.innerHTML="" 
//     buttonPage1.classList.remove("active")
//     tableOne.forEach((node)=>{node.classList.add("display")})
//     buttonPage2.classList.remove("active")
//     tabletwo.forEach((node)=>{node.classList.add("display")})
//     buttonPage3.classList.add("active")
//     tableThree.forEach((node)=>{node.classList.remove("display")})
//     myDataBaseButtonNumberForSearch=myDataItem.partThreeItem
//     const url = new URL('https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items')
//     url.searchParams.append('completed', false)
//     url.searchParams.append('page', 3); 
//     url.searchParams.append('limit', 5);
//     fetch(url, {
//     method: 'GET',
//     headers: {'content-type':'application/json'},})
//     .then(res => res.json())
//     .then(data => {
//     data.map(node=>{
//         const {name,id,time}=node
//         const trThree = document.createElement("tr")
//         const tdId = document.createElement("td")
//         tdId.innerHTML=id
//         trThree.appendChild(tdId)
//         const tdName = document.createElement("td")
//         tdName.innerHTML=name
//         trThree.appendChild(tdName)
//         const tdTime = document.createElement("td")
//         tdTime.innerHTML=`${time.start}:${time.end?time.end:"0000-00-00"}`
//         trThree.appendChild(tdTime)
//         tbody.appendChild(trThree)
//     })
//     }).catch(error => {
//         console.log(error);
//     })
// })


const addButton = document.querySelectorAll(".addButton");
for (let i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener("click",()=>{
        let node = myDataItem.allItem.find(node=>node.id==addButton[i].id)
        itemInTimeLine.push(node)
        currentTimeLine.setItems([...itemInTimeLine])
        addButton[i].style.display="none"
    })
}
// ${myDataItem.partOneItem.map(node=>{
//   return(
//     `<tr class="tableone" id="z${node.id}">
//       <td>${node.id}</td>
//       <td>${node.content}</td>
//       <td>${node.start}:${node.end?node.end:"0000-00-00"}</td>
//       <td><button class="btn btn-success addButton" id="${node.id}">+</button></td>
//     </tr>`
//   )
// })}
// ${
//   myDataItem.partTwoItem?.map(node=>{
//     return(`<tr class="display tabletwo" id="z${node.id}">
//       <td>${node.id}</td>
//       <td>${node.content}</td>
//       <td>${node.start}:${node.end?node.end:"0000-00-00"}</td>
//       <td><button class="btn btn-success addButton" id="${node.id}">+</button></td>
//     </tr>`)
// })
// }
// ${
//   myDataItem.partThreeItem.map(node=>{
//     return(`<tr class="display tablethree" id="z${node.id}">
//       <td>${node.id}</td>
//       <td>${node.content}</td>
//       <td>${node.start}:${node.end?node.end:"0000-00-00"}</td>
//       <td><button class="btn btn-success addButton" id="${node.id}">+</button></td>
//     </tr>`)
// })
// }