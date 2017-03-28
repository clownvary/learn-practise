import React, { Component } from 'react';
import { browserHistory } from 'react-router';
class RoutesStyle extends Component {
    componentDidMount() {
     //todo if u wangt test push method,cancel annotations
        //  const { history } = this.props;
        //  browserHistory.push({ pathname: '/home', state: { score: 70 } });
        //  console.log(this.props.location.state.score);
    }
    render() {
        return (
            <div>
                <h3>params</h3>
                <p>i am params {this.props.params.username}</p>
                <h3>queryString</h3>
                <p>i am queryString {this.props.location.query.age}</p>
                <h3>fragment</h3>
                <p>i am fragment {this.props.location.hash}</p>
                <h3>state</h3>
                <p>i am state {this.props.location.state.sex}</p>

            </div>
        );
    }
}

export default RoutesStyle;