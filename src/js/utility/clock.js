export function setClockTemplate(item) {
  let clock = new Date(item);
  clock.getUTCSeconds(item);
  return clock.toISOString().slice(11, 19);
}
export function changeMiliSecondTohhmmss(duration) {
  let clock = new Date(duration);
  return clock.toISOString().slice(11, 19);
}

export function creatDataForm(time) {
  let timeDataForm = new Date(time).toUTCString();
  let hhmmssFormat = timeDataForm.slice(17, 26);
  let TimeFormat = hhmmssFormat.split(":");
  let hh = TimeFormat[0];
  let mm = TimeFormat[1];
  let ss = TimeFormat[2];
  return `${hh}:${mm}:${ss}`;
}
export function updateTimeInTimeLine(item,type) {
  let timeToFormatUTC = new Date(item[type]).toUTCString().slice(17, 26);
  let arrayTohhmmss = timeToFormatUTC.split(":");
  let hh = arrayTohhmmss[0] * 3600000;
  let mm = arrayTohhmmss[1] * 60000;
  let ss = arrayTohhmmss[2] * 1000;
  let result = +(hh + mm + ss);
  return result
}
