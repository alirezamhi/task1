export function setitem(item){
    let itemJson = JSON.stringify(item)
    localStorage.setItem("itemInTimeLine",itemJson)
}
export function getItem(){
    let item = localStorage.getItem("itemInTimeLine")
    return JSON.parse(item)
}