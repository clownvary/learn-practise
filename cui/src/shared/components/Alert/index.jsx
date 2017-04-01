import Button from 'react-aaui/lib/Button';
import Modal from 'react-aaui/lib/Modal';
import "./index.less";

export default React.createClass({
  displayName: 'Alert',
  mixins: [PureRenderMixin],
  getDefaultProps : function () {
    return {
      type:'confirm',
      title : 'Confirmation',
      cancelText:'No',
      confirmText:'Yes',
      className:''
    };
  },
  render() {
    let {title, onClose, children, onCancel, cancelText, onConfirm, confirmText, className, disable, type} = this.props;
    confirmText = confirmText || "OK";
    return (
      <Modal
        className={`${className}`}
        title={title}
        shown={this.state.shown}
        onClose={this.onClose}>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          {type === 'confirm' ?
            <Button className={`${disable ? 'aaui-hidden' : ''}`} type="secondary" onClick={this.onCancel}>{cancelText}</Button> : ""
          }
          <Button className={`${disable ? 'aaui-hidden' : ''}`} type="strong" onClick={this.onConfirm}>{confirmText}</Button>
        </div>
      </Modal>
    );
  },

  getInitialState() {
    return {
      shown: false
    }
  },

  onCancel() {
    let newState = {
      shown: false
    };
    let onCancel = isFunc(this.props.onCancel) || noop;

    changeState(this, newState, onCancel);
  },

  onClose() {
    let newState = {
      shown: false
    };
    let onClose = isFunc(this.props.onClose) || noop;

    changeState(this, newState, onClose);
  },

  onConfirm() {
    let self = this;
    let newState = {
      shown: false
    };
    let onConfirm = isFunc(this.props.onConfirm);

    if (onConfirm) {
      onConfirm(function() {
        changeState(self, newState, noop)
      })
    } else {
      changeState(self, newState, noop)
    }
  },

  open() {
    let newState = {
      shown: true
    };
    let onOpen = isFunc(this.props.onOpen) || noop;

    changeState(this, newState, onOpen);
  }
});

function isFunc(func) {
  return typeof func === 'function' && func;
}

function noop() {}

function changeState(self, newState, callback) {
  self.setState(newState, callback)
}
