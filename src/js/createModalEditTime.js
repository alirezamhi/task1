import "../styles/form.css"
import createModal from "./createModal";
class createModalEditTime{
    constructor(itemInTimeLine){ 
        this.itemInTimeLine = itemInTimeLine
        this.currentNode 
    }

    findNodeForSetTimeInInput(id){
        this.currentNode = this.itemInTimeLine.find(item=>item.id==id)
        let startDataForm = new Date(this.currentNode.start)
        this.startHour=startDataForm.getHours()
        this.startMinutes = startDataForm.getMinutes()
        this.startSeccond = startDataForm.getSeconds()
        this.startMiliSeccond = startDataForm.getMilliseconds()
        let endDataForm = new Date(this.currentNode.end)
        this.endHour=endDataForm.getHours()
        this.endMinutes = endDataForm.getMinutes()
        this.endSeccond = endDataForm.getSeconds()
        this.endMiliSeccond = endDataForm.getMilliseconds()

    }
    createModal(){
        let divArea = document.createElement("div")
        divArea.innerHTML=createModal.myModal(4,"ویرایش","edit")
        document.querySelector("#app").appendChild(divArea)
    }    
    addBody(itemInTimeLine){
        this.itemInTimeLine = itemInTimeLine
        let bodyModal = document.querySelector("#id4")
        bodyModal.innerHTML=this.editTemplate()
        this.setValidInput()
    }
    editTemplate(){ 
        return(
            `<div>
                <div class="validation" style="display:none">
                    <p>لطفا عدد را درست وارد کنید</p>
                </div>
                <div calss="duration">
                    <p>لطفا طول مدت را تغیر ندهید<p>
                </div>
                <form class="row g-3 needs-validation" novalidate>
                    <div class="row">
                        <div class="col-md-3">
                            <label for="miliSecondForm" class="form-label ">میلی ثانیه</label>
                            <input type="tell" class="form-control milisecondInput" id="miliSecondFormStart" max="2" min="2" maxlength="3" minlength="2" value="${this.startMiliSeccond}">
                        </div>
                        <div class="col-md-3">
                            <label for="secondForm" class="form-label ">ثانیه</label>
                            <input type="tell" class="form-control seccondInput" id="secondFormStart" aria-describedby="inputGroupPrepend" max="2" min="2" maxlength="2" minlength="2" value="${this.startSeccond}">
                        </div>
                        <div class="col-md-3">
                            <label for="minutsForm" class="form-label">دقیقه</label>
                            <input type="tell" class="form-control minutsInput" id="minutsFormStart" maxlength="2" minlength=2 max="2" min="2" value="${this.startMinutes}">
                        </div>
                        <div class="col-md-3">
                            <label for="hourForm" class="form-label">ساعت</label>
                            <input type="tell" class="form-control hourInput" id="hourFormStart" maxlength="2" minlength="2" max="2" min="2" value="${this.startHour}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <label for="miliSecondForm" class="form-label ">میلی ثانیه</label>
                            <input type="tell" class="form-control milisecondInput" id="miliSecondFormEnd" maxlength="3" minlength="2" max="2" min="2" value="${this.endMiliSeccond}">
                        </div>
                        <div class="col-md-3">
                            <label for="secondForm" class="form-label ">ثانیه</label>
                            <input type="tell" class="form-control seccondInput" id="secondFormEnd" aria-describedby="inputGroupPrepend" maxlength="2" minlength="2" max="2" min="2" value="${this.endSeccond}">
                        </div>
                        <div class="col-md-3">
                            <label for="minutsForm" class="form-label">دقیقه</label>
                            <input type="tell" class="form-control minutsInput" id="minutsFormEnd" maxlength="2" minlength="2" max="2" min="2" value="${this.endMinutes}">
                        </div>
                        <div class="col-md-3">
                            <label for="hourForm" class="form-label">ساعت</label>
                            <input type="tell" class="form-control hourInput" id="hourFormEnd" maxlength="2" minlength="2" max="2" min="2" value="${this.endHour}">
                        </div>
                    </div>
                </form>
            </div>`
        )
    }
    validateHandler(e){
        if(e.target.value.length>2){
            validat.style.display="block"
        }else{
            validat.style.display="none"
        }
    }
    
    setValidInput(){
        let inputsHour = document.querySelectorAll(".hourInput")
        for (let i = 0; i < inputsHour.length; i++) {
            inputsHour[i].addEventListener("input",this.inputHandlerHour.bind(this))            
        }
        let inputMinuts = document.querySelectorAll(".minutsInput")
        for (let j = 0; j < inputMinuts.length; j++) {
            inputMinuts[j].addEventListener("input",this.inputHnadlerMinutes)
        }
        let inputSeccond = document.querySelectorAll(".seccondInput")
        for (let y = 0; y < inputSeccond.length; y++) {
            inputSeccond[y].addEventListener("input",this.inputHnadlerMinutes)
        }
        let inputMiliSeccond = document.querySelectorAll("input",this.inputHandlerMiliSecond)
    }

    inputHnadlerMinutes(e){
        let validat = document.querySelector(".validation")
        if (+e.target.value>=60) {
            validat.style.display="block"
        }else{
            validat.style.display="none"
        }
        
    }
    
    checkingDuretion(){
        let hourInputStart = document.querySelector("#hourFormStart").value
        let minetsInputStart = document.querySelector("#minutsFormStart").value
        let seccondInputStart = document.querySelector("#secondFormStart").value
        let miliseccondInputStart = document.querySelector("#miliSecondFormStart").value
        let hourInputEnd = document.querySelector("#hourFormEnd").value
        let minetsInputEnd = document.querySelector("#minutsFormEnd").value
        let seccondInputEnd = document.querySelector("#secondFormEnd").value
        let miliseccondInputEnd = document.querySelector("#miliSecondFormEnd").value
        let startTime = new Date(0,0,0,hourInputStart,minetsInputStart,seccondInputStart,miliseccondInputStart)
        let endTime = new Date(0,0,0,hourInputEnd,minetsInputEnd,seccondInputEnd,miliseccondInputEnd)
        let duration = endTime - startTime
        let durationInTimeLine = this.currentNode.end-this.currentNode.start
        return duration==durationInTimeLine
    }


    displayNotifForDuration(){
        if(!this.checkingDuretion()){
            document.querySelector(".duration").styel.display="block"
        }else{
            document.querySelector(".duration").styel.display="none"
        }
    }


    inputHandlerHour(e){
        let validat = document.querySelector(".validation")
        if (+e.target.value>=24) {
            validat.style.display="block"
        }else{
            validat.style.display="none"
        }
        
        this.checkingDuretion()

    }

    inputHandlerMiliSecond(){

    }



    startTimeEdit(){
        let hourInput = document.querySelector("#hourFormStart").value
        let minetsInput = document.querySelector("#minutsFormStart").value
        let seccondInput = document.querySelector("#secondFormStart").value
        let miliseccondInput = document.querySelector("#miliSecondFormStart").value
        let timeStart = (hourInput*3600000)+(minetsInput*60000)+(seccondInput*1000)+(+miliseccondInput)
        return timeStart
    }
    endTimeEdit(){
        let hourInput = document.querySelector("#hourFormEnd").value
        let minetsInput = document.querySelector("#minutsFormEnd").value
        let seccondInput = document.querySelector("#secondFormEnd").value
        let miliseccondInput = document.querySelector("#miliSecondFormEnd").value
        let timeEnd = (hourInput*3600000)+(minetsInput*60000)+(seccondInput*1000)+(+miliseccondInput)
        return timeEnd
    }

    validation(){
        // let validat = document.querySelector(".validation")
        // hourInput.addEventListener("input",this.validateHandler)
    }


}
export default createModalEditTime