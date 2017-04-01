'use strict';

import React from "react";
export {PropTypes} from "react";
import {connect} from "react-redux";
import {shallowEqualImmutable} from 'react-immutable-render-mixin';


export default class UIComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  bind(...methods) {
    methods.map(method=> this[method] = this[method].bind(this));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqualImmutable(this.props, nextProps) || !shallowEqualImmutable(this.state, nextState);
  }

}

