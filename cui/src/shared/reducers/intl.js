import { fromJS } from "immutable";
import en from "source/en.js";

import {
  SETCURRENTLOCALE,
} from "../actions/intl";

const initialState = fromJS({
  currentLocale: "en",
  defaultLocale: "en",
  locales: ["en"],
  messages: {
    "en": en
  }
});

const handlers = {

  [SETCURRENTLOCALE](state, { payload: { body } }) {
    return state.set("currentLocale", body);
  }

}

export default function form(state = initialState, action) {
  const type = action.type;
  if (!handlers[type]) return state;
  return handlers[type](state, action);
}
