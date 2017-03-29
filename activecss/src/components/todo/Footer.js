/**
 * Created by wangyan on 16/9/10.
 */
'use strict';
import style from './container/style.less';
export default class Footer extends React.Component {
    static propTypes = {
        onClearAll:React.PropTypes.func.isRequired,
        onFilterChange: React.PropTypes.func.isRequired,
        leftCount:React.PropTypes.number.isRequired,
        filter: React.PropTypes.oneOf([
            'SHOW_ALL',
            'SHOW_COMPLETED',
            'SHOW_ACTIVE'
        ]).isRequired
    };

    renderFilter(filter, name) {
        if (filter === this.props.filter) {
            return name;
        }

        return (
            <a href='#' onClick={e => {
        e.preventDefault();
        this.props.onFilterChange(filter);
      }}>
                {name}
            </a>
        );
    }

    render() {
        return (
            <div className={style.footer}>
                <span className={style.spCount}>
                    {this.props.leftCount}
                    <span className={style.spLabel}> item left</span>
                </span>
                <ul>
                    <li> {this.renderFilter('SHOW_ALL', 'All')}</li>
                    <li>{this.renderFilter('SHOW_ACTIVE', 'Active')}</li>
                    <li>{this.renderFilter('SHOW_COMPLETED', 'Completed')}</li>
                </ul>
                <button className={style.clearCompleted} onClick={()=>this.props.onClearAll()}>Clear completed
                    (<span>{this.props.completedCount}</span>)
                </button>
            </div>
        );
    }
}