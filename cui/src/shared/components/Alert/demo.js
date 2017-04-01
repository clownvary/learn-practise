"use strict";

import Alert from "shared/components/Alert";
import Button from "react-aaui/lib/Button";

export default React.createClass({
  displayName: "Less",

  render() {
    return (
      <div style={{fontFamily: "sans-serif"}}>
        <Button type="primary" onClick={this.open}>Show Modal</Button>
        <Alert onClose={this.close} 
          ref="alert"
          title="Change Status" 
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          onOpen={this.onOpen}
          cancelText="Cancel"
          confirmText="Change">
          Permit status will be changed to Complete, and it can't be undo.
        </Alert>
      </div>
    );
  },

  open() {
    this.refs.alert.open();
  },

  onOpen() {
    console.log('onOpen event')
  },

  onClose() {
    console.log('onClose event')
  },

  onCancel() {
    console.log('onCancel event')
  },

  onConfirm(callback) {
    console.log('onConfirm event')
    callback()
  }
});
