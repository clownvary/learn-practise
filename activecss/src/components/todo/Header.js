/**
 * Created by wangyan on 16/9/12.
 */
'use strict';
import style from './container/style.less';
export default class Header extends React.Component {
    static contextTypes={
        color:React.PropTypes.string
    }
    clickHandle()

    {
        let title='yyyyyy';
        this.props.onChangeTitle(title);
    }
    render() {
        // can get gloabal constant in webpack.config
        let env = __STATIC__;
        let env1 = TF;
        return (
            <div className={style.header}>

                <h1>todo{this.context.color}</h1>
                <h1>{this.props.title}</h1>
                <button onClick={() => this.clickHandle()} > 开始异步</button>
            </div>
        );
    }
}
