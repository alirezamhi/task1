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
                    </tr>
                </thead>
                <tbody class="tbodyForShowItem">
                </tbody>
            </table>
            `
        )
    }
    static tamplateRowTableForItem(itemInTimeLine){
        console.log(itemInTimeLine);
        let num = 0
        return itemInTimeLine.map(node=>{
            num++
            const {id,content,start,end} = node
            return(`
                <tr id="tableForItem${id}">
                    <td>${num}</td>
                    <td>${content}</td>
                    <td>${id}</td>
                    <td>${start} ms</td>
                    <td>${end} ms</td>
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