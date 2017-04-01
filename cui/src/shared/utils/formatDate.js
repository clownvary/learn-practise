import moment from "moment";

export const dateFormatMap = {
  'DD/MM/YYYY': 'DD MMM YYYY',
  'MM/DD/YYYY': 'MMM DD, YYYY',
  'YYYY/MM/DD': 'YYYY MMM DD'
}

export const timeFormatMap = {
  'h:mm a': 'h:mm A',
  'H:mm': 'H:mm' 
}

export default function formatDate(date, format) {
  if (!date) {
    return ''
  }
  if (!format) {
    format = 'DD/MM/YYYY';
  }
  return moment(date).format(dateFormatMap[format]);
}
