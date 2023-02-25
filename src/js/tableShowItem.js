import localStoragefunction from "./localStoragefunction"
class tableShowItem{
    static createTableTemplate(){
        return(
            `<table class="table table-striped" >
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">نام</th>
                        <th scope="col">شروع</th>
                        <th scope="col">پایان</th>
                    </tr>
                </thead>
                <tbody class="tbodyForShowItem">
                </tbody>
            </table>
            `
        )
    }
    static tamplateRowTableForItem(){
        let itemInTimeLine = localStoragefunction.getItem()
        return itemInTimeLine.map(node=>{
            const {id} = node
            return(`
                <tr id="tableForItem${id}">
                    <td>${id}</td>
                    <td>${id}</td>
                    <td>${id}</td>
                    <td>${id}</td>
                </tr>
            `)
        })
    }
    static createRowTable(){
        let TableForShowMovie= document.querySelector(".tbodyForShowItem")
        let row = this.tamplateRowTableForItem()
        for (let i = 0; i < row.length; i++) {
            TableForShowMovie.innerHTML+=row[i]
        }
    }
}
export default tableShowItem