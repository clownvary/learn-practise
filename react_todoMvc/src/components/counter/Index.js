/**
 * Created by wangyan on 16/9/12.
 */
'use strict';
import Counter from './Counter';
import {ActionCreator} from './actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
class Index extends React.Component {
    static propTypes = {
        count: React.PropTypes.number.isRequired,
        actions: React.PropTypes.shape({
            increase: React.PropTypes.func.isRequired,
            decrease: React.PropTypes.func.isRequired,

        })
    };
    //react原生实现
    // constructor(props) {
    //     super(props);
    //     this.state = {destNum: 0};
    // }
    //
    // onInc(num) {
    //     num = Number.parseInt(num);
    //     let cur = num + 1;
    //     this.setState({destNum: cur});
    // }
    //
    // onDec(num) {
    //     num = Number.parseInt(num);
    //     let cur = num - 1;
    //     this.setState({destNum: cur});
    // }

    render() {
        const {count, actions}=this.props;
        return (
            <div>
                <Counter destNum={count} onInc={(num)=>actions.increase(num)}
                         onDec={(num)=>actions.decrease(num)}></Counter>
            </div>
        );
    }
}
function mapState(state) {
    return {count: state.countX};
}
function mapDispatch(dispatch) {
    return {actions: bindActionCreators(ActionCreator, dispatch)};
}
export default connect(mapState, mapDispatch)(Index);