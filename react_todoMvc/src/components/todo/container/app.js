/**
 * Created by wangyan on 16/9/10.
 */
'use strict';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {
//     addTodo,
//     completeTodo,
//     toggleAll,
//     clearAll,
//     updateTodo,
//     setVisibilityFilter,
//     removeTodo,
//     VisibilityFilters
// } from '../actions';
import * as actionCreator from '../actions';//一次全部倒入
import Header from '../Header';
import AddTodo from '../AddTodo';
import TodoList from '../TodoList';
import Footer from '../Footer';
class App extends React.Component {
    static propTypes = {
        visibleTodos: React.PropTypes.arrayOf(React.PropTypes.shape({
            text: React.PropTypes.string.isRequired,
            completed: React.PropTypes.bool.isRequired
        }).isRequired).isRequired,
        visibilityFilter: React.PropTypes.oneOf([
            'SHOW_ALL',
            'SHOW_COMPLETED',
            'SHOW_ACTIVE'
        ]).isRequired
    };
    static childContextTypes={
        color: React.PropTypes.string
    }
    getChildContext()
    {
        return {
            color:'green'
        }
    }
    render() {
        //直接用actions就不用dispatch了}
        const {visibleTodos, leftCount, todosCount, completedCount, visibilityFilter, actions} = this.props; //是合并到组件的props
        return (
            <div>
                <Header/>
                <AddTodo
                    onAddClick={text =>actions.addTodo(text)}
                    onToggleAll={(isCompleted)=>actions.toggleAll(isCompleted)}
                    todosCount={todosCount}
                />
                <TodoList
                    todos={visibleTodos}
                    onTodoClick={(index) =>
                    actions.completeTodo(index)
          }
                    onTodoRemove={(index) =>
                    actions.removeTodo(index)}
                    onUpdateTodo={(key,text)=>actions.updateTodo(key,text)}
                />
                <Footer
                    filter={visibilityFilter}
                    onFilterChange={filter =>actions.setVisibilityFilter(filter)}
                    onClearAll={()=>actions.clearAll()}
                    leftCount={leftCount}
                    completedCount={completedCount}
                />
            </div>
        );
    }
}
function selectTodos(todos, filter) {
    var VisibilityFilters=actionCreator.VisibilityFilters;
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo=>todo.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed);
    }
}
/**
 * 返回的对象会被合并到组件的props
 * @param state
 * @returns {{visibleTodos, visibilityFilter: (*|visibilityFilter)}}
 */
function select(state) {

    return {
        visibleTodos: selectTodos(state.todos, state.visibilityFilter),
        leftCount: state.todos.filter((todo)=>todo.completed === false).length,
        completedCount: state.todos.filter((todo)=>todo.completed === true).length,
        todosCount: state.todos.length,
        visibilityFilter: state.visibilityFilter
    };
}
function mapDispatchToProps(dispatch) {
    //导出为一个对象,然后在对象里引用
    // return {
    //     actions: bindActionCreators({
    //         addTodo,
    //         completeTodo,
    //         toggleAll,
    //         clearAll,
    //         updateTodo,
    //         removeTodo,
    //         setVisibilityFilter
    //     }, dispatch)
    // };
    return {
        actions:bindActionCreators(actionCreator,dispatch)
    }
}
//connect 只传了第一个参数,第二个dispatch配置没有,默认是加载dispatch
export default connect(select, mapDispatchToProps)(App);

