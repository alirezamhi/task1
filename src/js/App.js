import "../scss/styles.scss";
import "../styles/main.css";
import * as bootstrap from "bootstrap";
import "../styles/modal.css";
import "../styles/buttonArea.css";
import index from "./componet";

class App {
  runApp(){
    let myIndex = new index()
    myIndex.buttonForEditAble()
    myIndex.showModalItemButton()
    myIndex.createModal()
    myIndex.createTimeLine()
    myIndex.createTableForShowItem()
    myIndex.getData()
    myIndex.setEditableEvent()
    myIndex.setDeleteEvent()
    myIndex.setEditButton()
  }
}

export default App;


