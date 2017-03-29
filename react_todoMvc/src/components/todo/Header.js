/**
 * Created by wangyan on 16/9/12.
 */
'use strict';
import style from './container/style.less';
export default class Header extends  React.Component
{
    static contextTypes={
        color:React.PropTypes.string
    }
    render()
    {
        // can get gloabal constant in webpack.config
         let env=__STATIC__;
         let env1=TF;
        return(
            <div className={style.header}>
                <h1>todo{this.context.color}</h1>
            </div>
        );
    }
}
