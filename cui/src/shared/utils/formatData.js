import {decodeHtmlStr} from "./func";

export default function formatData(data = []) {
  let selected = [];
  data = data.map((item) => {

    if (item.selected) {
      selected.push(item.id);
    }

    return Object.assign(item, {
      text: decodeHtmlStr(item.name),
      value: item.id
    })
  })

  return {
    data,
    selected
  }
}

export function formatDataWithDecode(data = [], {valueField, textField} = {}) {
  let selected = [];
  data = data.map((item) => {

    if (item.selected) {
      selected.push(item.id);
    }

    return Object.assign(item, {
      text: decodeHtmlStr(textField ? item[textField] : item.name),
      value: valueField ? item[valueField] : item.id
    })
  })

  return {
    data,
    selected
  }
}
