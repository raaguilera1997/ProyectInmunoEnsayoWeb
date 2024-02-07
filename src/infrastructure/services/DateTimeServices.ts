import moment from "moment";

function getDateTimeNow(): moment.Moment {
  return moment();
}

function getCurrentYear(): number {
  return moment().year();
}

function getCurrentDateTimeSimple(): string {
  return moment().format("YYYYMMDD");
}

function getTimeFromNow(date: Date) {
  return moment(date).fromNow();
}

function getCurrentDateTime(date: string): string {
  return moment(date).format();
}

function getCurrentTime(date: string): string {
  return moment(date).format("HH:mm");
}

function getDisplayDateTime(date: string): string {
  return moment(date).format("YYYY-MM-D  HH:mm");
}
function getDisplayDateTimeOtherFormat(date: string): string {
  return moment(date).format("MM-DD-YYYY HH:mm:ss");
}
function getRangeDateTime(date: string): string {
  return moment(date).format("YYYY/MM/DD");
}
function getRangeDateTimeMonth(date: string): string {
  return moment(date).format("MM/DD/YYYY");
}
function getTableDateTime(date: string): string {
  return moment(date).format("MM-DD-YYYY HH:mm");
}
function getTableLocalDateTime(date: string): string {
  return moment.parseZone(date).format("MM-DD-YYYY HH:mm");
}
function getTableDateTimeAnimal(date: string): string {
  return moment(date).format("MM/DD/YYYY HH:mm");
}
function getTodayDateTime(): string {
  return moment().format("MM/DD/YYYY");
}
function toLocalDateTime(date: string): string {
  const stillUtc = moment.utc(date).format();
  return moment(stillUtc)
    .local()
    .format("YYYY-MM-DD HH:mm");
}

function toUtcDateTime(date: string): string {
  if(date == "")
    return "";
  const stillLocal = moment(date).format(); //moment.utc(date).toDate();
  return moment(stillLocal)
    .utc()
    .format();
}
function getBeginWeekDateTime(): string {
  return moment().startOf('week').format("MM/DD/YYYY");
}
function getEndWeekDateTime(): string {
  return moment().endOf('week').format("MM/DD/YYYY");
}
export {
  getDisplayDateTimeOtherFormat,
  getDateTimeNow,
  getCurrentYear,
  getCurrentDateTimeSimple,
  getTimeFromNow,
  getCurrentTime,
  getCurrentDateTime,
  getDisplayDateTime,
  getRangeDateTime,
  getRangeDateTimeMonth,
  getTableDateTime,
  toLocalDateTime,
  toUtcDateTime,
  getTodayDateTime,
  getBeginWeekDateTime,
  getEndWeekDateTime,
  getTableDateTimeAnimal,
  getTableLocalDateTime
};
