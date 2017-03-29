/**
 * Created by wangyan on 16/9/5.
 */
'use strict';
export default class Hello extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return React.createElement('div', null, 'Hello', this.props.name);
    }
}