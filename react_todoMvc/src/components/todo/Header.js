/**
 * Created by wangyan on 16/9/12.
 */
'use strict';
import style from './container/style.less';
export default class Header extends  React.Component
{
    render()
    {
        return(
            <div className={style.header}>
                <h1>todos</h1>
            </div>
        );
    }
}
