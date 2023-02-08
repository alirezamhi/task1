import '../scss/styles.scss';
import "../styles/main.css"
import * as bootstrap from 'bootstrap';
import createTimeLine from './createTimeLIne';
import header from "./header"
import modal from './modal';
import myDataItem from './items';
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
export let mydataBaseButtonNumber = []
let item = []
let timeLineArea = document.createElement("div")
timeLineArea.classList.add("timeLineArea")
let timeLine = new createTimeLine(item,timeLineArea)
let app = document.querySelector("#app")
app.appendChild(header)
app.appendChild(modal)
app.appendChild(timeLineArea)
const currentTimeLine = timeLine.generateTimeLine(options)

const inputSearch = document.querySelector("#inputSearch");
inputSearch.addEventListener("keyup",()=>{
    // const inputValueSearch = inputSearch.value.toUpperCase()
    // // // const findNode = allItem.allItems.filter((node)=>node.content===inputSearch.value)
    // // // console.log(allItem.changeItems(findNode));
    // for (let i = 0; i < mydataBaseButtonNumber.length; i++) {
    // let text = mydataBaseButtonNumber[i].content  
    // if(text.toUpperCase().indexOf(inputValueSearch) == -1){
    //     trTag[i].style.display=""
    // }else{
    //     trTag[i].style.display="none"
    // }
    // }
    // mydataBaseButtonNumber=[{id:1,content:"alireza"}]
})

let buttonPage1 = document.querySelector("#buttonPage1")
let buttonPage2 = document.querySelector("#buttonPage2")
let buttonPage3 = document.querySelector("#buttonPage3")
let tableOne = document.querySelector(".tableone")
let tabletwo = document.querySelector(".tabletwo")
let tableThree = document.querySelector(".tablethree")


buttonPage1.addEventListener("click",()=>{
    buttonPage1.classList.add("active")
    // tableOne.classList.remove("display")
    buttonPage2.classList.remove("active")
    // tabletwo.classList.add("display")
    buttonPage3.classList.remove("active")
    // tableThree.classList.add("display")
    mydataBaseButtonNumber=myDataItem.partOneItem
})
buttonPage2.addEventListener("click",()=>{
    buttonPage1.classList.remove("active")
    // tableOne.classList.add("display")
    buttonPage2.classList.add("active")
    // tabletwo.classList.remove("display")
    buttonPage3.classList.remove("active")
    // tableThree.classList.add("display")
    mydataBaseButtonNumber=myDataItem.partTwoItem
    console.log(mydataBaseButtonNumber);
})

buttonPage3.addEventListener("click",()=>{
    buttonPage1.classList.remove("active")
    // tableOne.classList.add("display")
    buttonPage2.classList.remove("active")
    // tabletwo.classList.add("display")
    buttonPage3.classList.add("active")
    // tableThree.classList.remove("display")
    mydataBaseButtonNumber=myDataItem.partThreeItem
})



const addButton = document.querySelectorAll(".addButton");
// function findMyNodeInMyDataItem(myNodeData) {
//     return myDataItem.myNodeData.find((node)=>node.id==addButton[i].id)
// }
for (let i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener("click",()=>{
        // let node = findMyNodeInMyDataItem(myDataItem.partOneItem)?findMyNodeInMyDataItem(myDataItem.partOneItem):findMyNodeInMyDataItem(myDataItem.partTwoItem)?findMyNodeInMyDataItem(myDataItem.partTwoItem):findMyNodeInMyDataItem(myDataItem.partThreeItem)&&findMyNodeInMyDataItem(myDataItem.partThreeItem)
        let node
        if(myDataItem.partOneItem.find((node)=>node.id==addButton[i].id)){
            node = myDataItem.partOneItem.find((node)=>node.id==addButton[i].id)
        }else if(myDataItem.partTwoItem.find((node)=>node.id==addButton[i].id)){
            node =myDataItem.partTwoItem.find((node)=>node.id==addButton[i].id)
        }else if(myDataItem.partThreeItem.find((node)=>node.id==addButton[i].id)){
            node = myDataItem.partThreeItem.find((node)=>node.id==addButton[i].id)
        }
        console.log("node",node);
        // itemInTimeLine.push(node)
        // currentTimeLine.setItems([...itemInTimeLine])
        // console.log(itemInTimeLine);
        // addButton[i].style.display="none"

    })
}