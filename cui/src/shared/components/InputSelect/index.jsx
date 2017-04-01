import React from "react";
import ReactSelect from "react-select";
import "./index.less";


const NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;

/**
 * An wrapper component of react-select,
 * if possible, we want to implement it in react-aaui.
 * Will limit using other features of react-select to reduce futrue's replace work.
 */
export default class InputSelect extends React.Component {

  static defaultProps = {
    autosize: false,
    noResultsText: null,
    filterOptions: false,
    openAfterFocus: true,
    onBlurResetsInput: false,
    className: "inputSelect inputSelect-noArrow inputSelect-noClear"
  }

  constructor() {
    super();
    this.lastValidViewValue = "";
  }

  /**
   * For meet our UX interaction design,
   * need to add extra mousedown event on input to handle special open menu case.
   */
  componentDidMount() {
    const reactSelectNode = this.refs.reactSelect;
    const inputNode = reactSelectNode.refs.input;
    inputNode.addEventListener("mousedown", () => {
      if (reactSelectNode.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
  			return;
  		}
  		reactSelectNode._openAfterFocus = true;
  		reactSelectNode.focus();
    });
    inputNode.addEventListener("input", this.onInput.bind(this));
    inputNode.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  onInput(e) {
    let value = e.srcElement.value;
    const {limitEntryType={}} = this.props;
    const {type, digits=2, minVal=0} = limitEntryType;

    if(!value) {
      return true;
    }

    if(type === "money") {
      if (value.indexOf('.') === 0) {
        e.srcElement.value = "";
        return;
      }

      if (value.indexOf('-') === 0) {
        if (minVal >= 0) {
          e.srcElement.value = "";
          return true;
        } else if (value === '-' || value === '-.') {
          return true;
        }
      }

      if (NUMBER_REGEXP.test(value)) {
        // Save as valid view value if it's a number
        const splitArray = value.split(".");
        const lastCutOffStr = splitArray[splitArray.length - 1];
        if(splitArray.length > 1 && lastCutOffStr.length > digits) {
          e.srcElement.value = this.lastValidViewValue;
        }
      } else {
        // Render the last valid input in the field
        e.srcElement.value = this.lastValidViewValue;
      }

    }
  }

  onKeyDown(e) {
    const value = e.target.value;
    const {allowInput} = this.props;
    if(!allowInput &&
      (e.key.length === 1 || (e.code && e.code.split("Digit").length === 2))
    ) {
      e.preventDefault();
      return false;
    }else {
      if(NUMBER_REGEXP.test(value)) {
        this.lastValidViewValue = value;
      }
      if(!value) {
        this.lastValidViewValue = "";
      }
      return true;
    }
  }

  clear() {
    const reactSelectNode = this.refs.reactSelect;
    // reactSelectNode.setValue(reactSelectNode.props.resetValue);
    reactSelectNode.closeMenu();
  }

  render() {
    return <ReactSelect ref="reactSelect" {...this.props}/>
  }

}
