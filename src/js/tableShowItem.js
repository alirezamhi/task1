import localStoragefunction from "./localStoragefunction"
class tableShowItem{
    static createTableTemplate(){
        return(
            `<table class="table table-striped" >
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">نام</th>
                        <th scope="col">id</th>
                        <th scope="col">شروع</th>
                        <th scope="col">پایان</th>
                        <th scope="col">عملیات</th>
                    </tr>
                </thead>
                <tbody class="tbodyForShowItem">
                </tbody>
            </table>
            `
        )
    }

    static creatDataForm(time){
        let timeDataForm = new Date(time)
        let hh = timeDataForm.getHours()
        let mm = timeDataForm.getMinutes()
        let ss = timeDataForm.getSeconds()
        return `${hh}:${mm}:${ss}`
    }

    static tamplateRowTableForItem(itemInTimeLine){
        let num = 0
        return itemInTimeLine.map(node=>{
            num++
            const {id,content,start,end} = node
            let startDataForm =  this.creatDataForm(start)
            let endDataForm = this.creatDataForm(end)
            return(`
                <tr id="tableForItem${id}">
                    <td>${num}</td>
                    <td>${content}</td>
                    <td>${id}</td>
                    <td>${startDataForm}</td>
                    <td>${endDataForm}</td>
                    <td>
                    <div>
                        <button type="button" class="btn btn-danger deleteItem" data-bs-toggle="modal" data-bs-target="#exampleModal3" id="deleteItem${id}">حذف</button>
                        <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal4">ویرایش</button>
                    <div>
                    </td>
                </tr>
            `)
        })
    }
    static createRowTable(itemInTimeLine){
        let TableForShowMovie= document.querySelector(".tbodyForShowItem")
        let row = this.tamplateRowTableForItem(itemInTimeLine)
        for (let i = 0; i < row.length; i++) {
            TableForShowMovie.innerHTML+=row[i]
        }
    }
}
export default tableShowItem