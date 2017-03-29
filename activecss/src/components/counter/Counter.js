/**
 * Created by wangyan on 16/9/12.
 */
'use strict';
import React, { Component } from 'react';

export default class Counter extends React.Component {
    static propTypes={
           destNum:React.PropTypes.number.isRequired,
           onInc:React.PropTypes.func.isRequired,
           onDec:React.PropTypes.func.isRequired
    };
    handleInc() {
        let curNum = this.refs.input.value.trim();
        this.props.onInc(curNum);

    }
    handleDec() {
        let curNum = this.refs.input.value.trim();
        this.props.onDec(curNum);
    }
    render() {
        return (
            <div>
                <input type="text" ref="input" value={this.props.destNum} placeholder="输入一个数字"/>
                <button onClick={()=>this.handleInc()}>增加</button>
                <button onClick={()=>this.handleDec()}>减少</button>
                <p>{this.props.destNum}</p>
            </div>
        );
    }
}
