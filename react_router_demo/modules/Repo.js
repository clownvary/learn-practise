import React, { Component } from 'react';

class Repo extends Component {
    componentWillReceiveProps (nextState) {

     console.log('from recieve' + nextState);
    }
    componentDidMount() {
        console.log(this.props.location.query);
    }
    
    render () {
        return (
            <div>
                <p>{`i am params ${this.props.location.query}`}</p>
                 <h2>{this.props.params.repoName}</h2>
            </div>
        );
    }
}

export default Repo;