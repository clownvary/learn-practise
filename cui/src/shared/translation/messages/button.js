import {defineMessages} from "react-intl";

export const PREFIX = "app.buttons";

/**
 * Common part for button text.
 */
export default defineMessages({
  add: {
    id: `${PREFIX}.add`,
    defaultMessage: "Add"
  },
  delete: {
    id: `${PREFIX}.delete`,
    defaultMessage: "Delete"
  },
  checkout: {
    id: `${PREFIX}.checkout`,
    defaultMessage: "Check Out"
  },
  finish: {
    id: `${PREFIX}.finish`,
    defaultMessage: "Finish"
  },
  donate: {
    id: `${PREFIX}.donate`,
    defaultMessage: "Donate"
  }
});
