import '../scss/styles.scss';
import "../styles/main.css"
import * as bootstrap from 'bootstrap';
import createTimeLine from './createTimeLIne';
import header from "./header"
import modal from './modal';
import myDataItem from './items';

fetch('https://63e8d426b120461c6be64cdd.mockapi.io/timeline/items', {
  method: 'GET',
  headers: {'content-type':'application/json'},})
  .then(res => res.json())
.then(tasks => {
    console.log("ali8esdafa",tasks);
  // Do something with the list of tasks
}).catch(error => {
  // handle error
  console.log("eroe",error);
})


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
app.appendChild(modal)
app.appendChild(timeLineArea)
const currentTimeLine = timeLine.generateTimeLine(options)
const tbody = document.querySelector("tbody")
const trTag = tbody.querySelectorAll("tr")
const inputSearch = document.querySelector("#inputSearch");
inputSearch.addEventListener("keyup",()=>{
    const inputValueSearch = inputSearch.value.toUpperCase()
    let node = myDataBaseButtonNumberForSearch.find(node=>node.content.toUpperCase()===inputValueSearch)
    for (let i = 0; i < trTag.length; i++) {
        if (node) {
            trTag[i].style.display="none"
            document.querySelector(`#z${node.id}`).style.display=""
        }else{
            trTag[i].style.display=""
        }
    }
    myDataItem.partOneItem="alireza"
 })

let buttonPage1 = document.querySelector("#buttonPage1")
let buttonPage2 = document.querySelector("#buttonPage2")
let buttonPage3 = document.querySelector("#buttonPage3")
let tableOne = document.querySelectorAll(".tableone")
let tabletwo = document.querySelectorAll(".tabletwo")
let tableThree = document.querySelectorAll(".tablethree")


buttonPage1.addEventListener("click",()=>{
    buttonPage1.classList.add("active")
    tableOne.forEach((node)=>{node.classList.remove("display")})
    buttonPage2.classList.remove("active")
    tabletwo.forEach((node)=>{node.classList.add("display")})
    buttonPage3.classList.remove("active")
    tableThree.forEach((node)=>{node.classList.add("display")})
    myDataBaseButtonNumberForSearch=myDataItem.partOneItem
})


buttonPage2.addEventListener("click",()=>{
    buttonPage1.classList.remove("active")
    tableOne.forEach((node)=>{node.classList.add("display")})
    buttonPage2.classList.add("active")
    tabletwo.forEach((node)=>{node.classList.remove("display")})
    buttonPage3.classList.remove("active")
    tableThree.forEach((node)=>{node.classList.add("display")})
    myDataBaseButtonNumberForSearch=myDataItem.partTwoItem
})

buttonPage3.addEventListener("click",()=>{
    buttonPage1.classList.remove("active")
    tableOne.forEach((node)=>{node.classList.add("display")})
    buttonPage2.classList.remove("active")
    tabletwo.forEach((node)=>{node.classList.add("display")})
    buttonPage3.classList.add("active")
    tableThree.forEach((node)=>{node.classList.remove("display")})
    myDataBaseButtonNumberForSearch=myDataItem.partThreeItem
})



const addButton = document.querySelectorAll(".addButton");
for (let i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener("click",()=>{
        let node = myDataItem.allItem.find(node=>node.id==addButton[i].id)
        itemInTimeLine.push(node)
        currentTimeLine.setItems([...itemInTimeLine])
        addButton[i].style.display="none"
    })
}