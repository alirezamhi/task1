import { Timeline, DataSet } from "vis-timeline/standalone";
class createTimeLine {
  dataTime;
  element;
  options;
  constructor(dataTime, element, options) {
    this.dataTime = dataTime,
    this.element = element,
    this.options = options;
  }

  generateTimeLine() {
    var items = new DataSet(this.dataTime);
    return new Timeline(this.element, items, this.options);
  }
}

export default createTimeLine;
