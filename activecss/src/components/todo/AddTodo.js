/**
 * Created by wangyan on 16/9/10.
 */
'use strict';
import style from './container/style.less';
import  className from 'classnames/bind';
import React, { Component } from 'react';

export  default class AddTodo extends React.Component {
    handleClick(e) {
        e.preventDefault();
        var keycode = window.event ? e.keyCode : e.which;
        //回车事件
        if (keycode === 13) {
            const text = this.refs.input.value.trim();
            if(!text)
            {
                return;
            }
            this.props.onAddClick(text);
            this.refs.input.value = '';
        }
    }
    handleToggle()
    {
        let isCompleted=!this.refs.checkAll.checked;
        this.props.onToggleAll(isCompleted);
    }

    render() {
        let cx = className.bind(style);
        var toggle= cx('forAll',{forAllHide:!this.props.todosCount>0});
        return (
            <div className={style.mainipt}>
                <form action="#">
                    <div className={style.checkTodo}>
                        <input type="checkbox" id="checkall" ref="checkAll" defaultChecked="" />
                        <label htmlFor="checkall" onClick={()=>this.handleToggle()} className={toggle} ></label>
                    </div>
                    <input type="text" onKeyUp={(event)=>this.handleClick(event)} ref='input' className={style.newtodo}
                           placeholder="What need to be done?"/>
                </form>

            </div>
    );
    }
    }
