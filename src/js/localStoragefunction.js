class localStoragefunction{
    static setitem(item){
        let itemJson = JSON.stringify(item)
        localStorage.setItem("itemInTimeLine",itemJson)
    }
    static getItem(){
        let item = localStorage.getItem("itemInTimeLine")
        return JSON.parse(item)
    }
}
export default localStoragefunction