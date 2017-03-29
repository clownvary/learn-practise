/**
 * Created by wangyan on 16/9/10.
 */
'use strict';
import style from './container/style.less';
import  className from 'classnames/bind';
export default class Todo extends React.Component {
    constructor(props)
    {
        super(props);
        /**
         * 是否是编辑状态
         * @type {boolean}
         */
        this.state={isEdit:false};
    }
    static propTypes = {
        onTodoClick: React.PropTypes.func.isRequired,
        onRemoveClick: React.PropTypes.func.isRequired,
        onUpdateTodo:React.PropTypes.func.isRequired,
        text: React.PropTypes.string.isRequired,
        completed: React.PropTypes.bool.isRequired,
        dataKey: React.PropTypes.number.isRequired
    };  // 注意这里有分号


    handleKeyUp(e)
    {
        e.preventDefault();
        var keycode = window.event ? e.keyCode : e.which;
        //回车事件
        if (keycode === 13) {
            let todoRef=`todo${this.props.dataKey}`;
            let newText=this.refs[todoRef].value.trim();
            if(!newText)
            {
                this.props.onRemoveClick(this.props.dataKey);
            }else
            {
                this.props.onUpdateTodo(this.props.dataKey,newText);
            }
            this.setState({'isEdit':false});
        }

    }
    handleDblClick()
    {
        this.setState({'isEdit':true});
    }
    /**
     * 更新value值 ,也可以使用双向绑定,但不推荐,会影响整体的单一数据流逻辑
     * @param nextProps
     * @param nextState
     */
    componentWillUpdate(nextProps, nextState)
    {

        let newValue=nextProps.text;
        let todoRef=`todo${nextProps.dataKey}`;
        this.refs[todoRef].value=newValue;
    }
    render() {
        let cx = className.bind(style);
        let labelItemCx = cx({
            'labelItem': !this.props.completed,
            'labelItemCompleted': this.props.completed
        },{Hide:this.state.isEdit});
        let editTodoCx=cx('editTodo',{Hide:!this.state.isEdit});
        return (
            <li className={style.li}>
                <div className={style.todoitem}>
                    <div className={style.checkTodo}>
                        <input type="checkbox" id={this.props.dataKey} defaultChecked={this.props.completed} checked={this.props.completed}/>
                        <label onClick={({key=this.props.dataKey})=>this.props.onTodoClick(key)}
                               htmlFor={this.props.dataKey} className={style.forItem}></label>
                    </div>
                    <label onDoubleClick={()=>this.handleDblClick()} className={labelItemCx}>{this.props.text}</label>
                    <input  ref={`todo${this.props.dataKey}`} onKeyUp={(event)=>this.handleKeyUp(event)} className={editTodoCx} defaultValue={this.props.text} type="text"/>
                    <button className={style.destroy} onClick={({key=this.props.dataKey})=>this.props.onRemoveClick(key)}></button>
                </div>
            </li>
        );
    }
}
