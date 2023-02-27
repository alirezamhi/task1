import "../styles/form.css"
import createModal from "./createModal";
class createModalEditTime{
    static createModal(){
        let divArea = document.createElement("div")
        divArea.innerHTML=createModal.myModal(4,"ویرایش","edit")
        document.querySelector("#app").appendChild(divArea)
    }
    static editTemplate(){
        return(
            `<div>
                <div class="validation">
                    <p>لطفا عدد را درست وارد کنید</p>
                </div>
                <form class="row g-3 needs-validation" novalidate>
                    <div class="row">
                        <div class="col-md-3">
                            <label for="miliSecondForm" class="form-label">میلی ثانیه</label>
                            <input type="number" class="form-control" id="miliSecondForm" required>
                        </div>
                        <div class="col-md-3">
                            <label for="secondForm" class="form-label">ثانیه</label>
                            <input type="number" class="form-control" id="secondForm" aria-describedby="inputGroupPrepend">
                        </div>
                        <div class="col-md-3">
                            <label for="minutsForm" class="form-label">دقیقه</label>
                            <input type="number" class="form-control" id="minutsForm">
                        </div>
                        <div class="col-md-3">
                            <label for="hourForm" class="form-label">ساعت</label>
                            <input type="number" class="form-control" id="hourForm">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label for="miliSecondForm" class="form-label">میلی ثانیه</label>
                            <input type="number" class="form-control" id="miliSecondForm" required>
                        </div>
                        <div class="col-md-3">
                            <label for="secondForm" class="form-label">ثانیه</label>
                            <input type="number" class="form-control" id="secondForm" aria-describedby="inputGroupPrepend">
                        </div>
                        <div class="col-md-3">
                            <label for="minutsForm" class="form-label">دقیقه</label>
                            <input type="number" class="form-control" id="minutsForm">
                        </div>
                        <div class="col-md-3">
                            <label for="hourForm" class="form-label">ساعت</label>
                            <input type="number" class="form-control" id="hourForm">
                        </div>
                    </div>
                </form>
            </div>`
        )
    }
    static validation(){
        let hourInput = document.querySelector("#hourForm")
        let minetsInput = document.querySelector("#minutsForm")
        let seccondInput = document.querySelector("#secondForm")
        let miliseccondInput = document.querySelector("#miliSecondForm")
        let validat = document.querySelector(".validation")
        hourInput.addEventListener("input",(e)=>{
            if(e.target.value.length>2){
                validat.style.display="block"
                
            }else{
                validat.style.display="none"
            }

        })
    }
    static addBody(){
        let bodyModal = document.querySelector("#id4")
        bodyModal.innerHTML=this.editTemplate()
        this.validation()
    }
}
export default createModalEditTime