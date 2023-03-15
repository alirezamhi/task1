import { Timeline, DataSet ,moment} from "vis-timeline/standalone";
class timeLine {
  constructor(dataTime, element) {
    this.dataTime = dataTime,
    this.element = element,
    this.options = {
        editable: {
          add: false,
          updateTime: false,
          updateGroup: false,
          overrideItems: false,
          updateTime: false,
          remove: false,
        },
        max: 86400000,
        min: 0,
        start: 0,
        end: 86400000,
        moment: function(date) {
          return moment(date).utcOffset('+00:00');
        }
      };
  }

  generateTimeLine() {
    var items = new DataSet(this.dataTime);
    this.timeline = new Timeline(this.element, items, this.options);
    return this.timeline;
  }
}

export default timeLine;
