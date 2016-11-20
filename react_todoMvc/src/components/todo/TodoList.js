/**
 * Created by wangyan on 16/9/10.
 */
'use strict';
import style from './container/style.less';
import Todo from './Todo';
export default class TodoList extends React.Component {
    static propTypes =
    {
        onTodoClick: React.PropTypes.func.isRequired,
        onTodoRemove:React.PropTypes.func.isRequired,
        todos: React.PropTypes.arrayOf(React.PropTypes.shape(
            {
                text: React.PropTypes.string.isRequired,
                completed: React.PropTypes.bool.isRequired
            })).isRequired
    };


    render() {
        return (
            <div className={style.items}>
                <ul className={style.ul}>
                    {this.props.todos.map((todo, index) =>
                        <Todo {...todo}
                            key={index}
                            dataKey={index}
                            onTodoClick={(fromTodoKey) =>
                             this.props.onTodoClick(fromTodoKey)
                         }
                            onRemoveClick={(fromTodoKey) =>
                             this.props.onTodoRemove(fromTodoKey)
                         }
                            onUpdateTodo={(key,text)=>this.props.onUpdateTodo(key,text)}

                        />
                    )}
                </ul>
            </div>
        );
    }
}