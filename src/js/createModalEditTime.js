import "../styles/form.css"
import createModal from "./createModal";
class createModalEditTime{
    constructor(itemInTimeLine){ 
        this.itemInTimeLine = itemInTimeLine
        this.currentNode 
    }

    findNodeForSetTimeInInput(id){
        this.currentNode = this.itemInTimeLine.find(item=>item.id==id)
        this.id = id
        this.duration = this.currentNode.end - this.currentNode.start
        let timeFormat = new Date(this.duration).toUTCString().slice(17,26).split(":")
        let hh = timeFormat[0]
        let mm = timeFormat[1]
        let ss = timeFormat[2]
        this.hhmmss = `${hh}:${mm}:${ss}`
        let startDataForm = new Date(this.currentNode.start).toUTCString()
        let timeFormathhmmssStart = startDataForm.slice(17,26).split(":")
        this.startHour=timeFormathhmmssStart[0]
        this.startMinutes = timeFormathhmmssStart[1]
        this.startSeccond = timeFormathhmmssStart[2]
        this.startMiliSeccond = "00"
        let endDataForm = new Date(this.currentNode.end).toUTCString()
        let timeFormathhmmssEnd = endDataForm.slice(17,26).split(":")
        this.endHour=timeFormathhmmssEnd[0]
        this.endMinutes = timeFormathhmmssEnd[1]
        this.endSeccond = timeFormathhmmssEnd[2]
        this.endMiliSeccond = "00"
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
                <div class="duration">
                    <p>لطفا مدت  ${this.hhmmss} را تغیر ندهید<p>
                </div>
                <form class="row g-3 needs-validation" novalidate>
                    <div class="row bodyModalForEdit">
                        <p>زمان شروع</p>
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
                    <div class="row  bodyModalForEdit mt-3">
                        <p>زمان پایان</p>
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
            inputMinuts[j].addEventListener("input",this.inputHnadlerMinutes.bind(this))
        }
        let inputSeccond = document.querySelectorAll(".seccondInput")
        for (let y = 0; y < inputSeccond.length; y++) {
            inputSeccond[y].addEventListener("input",this.inputHnadlerMinutes.bind(this))
        }
        let inputMiliSeccond = document.querySelectorAll(".milisecondInput")
        for (let i = 0; i < inputMiliSeccond.length; i++) {
            inputMiliSeccond[i].addEventListener("input",this.inputHandlerMiliSecond.bind(this))
        }
    }

    inputHnadlerMinutes(e){
        let validat = document.querySelector(".validation")
        if (+e.target.value>=60) {
            validat.style.display="block"
        }else{
            validat.style.display="none"
        }
        this.displayNotifForDuration()  
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
        let notifDuration = document.querySelector(".duration")
        if(!this.checkingDuretion()){
            notifDuration.style.display="block"
        }else{
            notifDuration.style.display="none"
        }
    }


    inputHandlerHour(e){
        let validat = document.querySelector(".validation")
        if (+e.target.value>=24) {
            validat.style.display="block"
        }else{
            validat.style.display="none"
        }
        this.displayNotifForDuration()
    }

    inputHandlerMiliSecond(){
        this.displayNotifForDuration()
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

    enterEditation(){
        let hourInputStart = document.querySelector("#hourFormStart").value*3600000
        let minetsInputStart = document.querySelector("#minutsFormStart").value*600
        let seccondInputStart = document.querySelector("#secondFormStart").value*10
        let miliseccondInputStart = document.querySelector("#miliSecondFormStart").value
        let hourInputEnd = document.querySelector("#hourFormEnd").value*3600000
        let minetsInputEnd = document.querySelector("#minutsFormEnd").value*600
        let seccondInputEnd = document.querySelector("#secondFormEnd").value*10
        let miliseccondInputEnd = document.querySelector("#miliSecondFormEnd").value
        // let start = `${hourInputStart}:${minetsInputStart}:${seccondInputStart}:${miliseccondInputStart}`
        let start = +(hourInputStart+minetsInputStart+seccondInputStart+(+miliseccondInputStart))
        let end = +(hourInputEnd+minetsInputEnd+seccondInputEnd+(+miliseccondInputEnd))
        if(!this.checkingDuretion()){
            let duration = this.currentNode.end - this.currentNode.start
            let endCurrentNode = start+duration
            return {start:start,end:endCurrentNode,id:this.id}
        }else{
            return {start:start,end:end,id:this.id}
        }
    }


}
export default createModalEditTime