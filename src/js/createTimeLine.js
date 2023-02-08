import { Timeline, DataSet ,} from "vis-timeline/standalone";
class createTimeLine{
    dataTime;
    element;
    options;
    constructor(dataTime,element){
        this.dataTime=dataTime,
        this.element=element
    }
    generateTimeLine(options={}){   
        var items = new DataSet(this.dataTime)
        return new Timeline(this.element,items,options) 
    }
}

export default createTimeLine;