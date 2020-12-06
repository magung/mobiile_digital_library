// const extract = (str, pattern) => (str.match(pattern) || []).pop() || '';

export function removeWhiteSpace(str, setValue) {
  // return extract(str, '/^\S*$/;');
  let string = str.split(" ").join("");
  return setValue(string)
}

export function toUpperCaseName(str){
  return str.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
}
var curr = new Date(); // get current date
var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
var last = first + 6; // last day is the first day + 6

var firstday = new Date(curr.setDate(first)).toUTCString();
var lastday = new Date(curr.setDate(last)).toUTCString();

export function getFirstDayOnWeek() {
  return firstday;
}

export function getLastDayOnWeek() {
  return lastday;
}
