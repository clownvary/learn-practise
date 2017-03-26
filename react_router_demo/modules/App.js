import React, { Component } from 'react';
import { Link } from 'react-router';
import NavLink from './NavLink';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import About from './About';

class App extends Component {
  render () {
    return (
            <div>
                {/*<Header /> */}
                {this.props.header}
                <div>
                    <h1>router</h1>
                    <ul>
                        <li>
                            <NavLink to='/' onlyActiveOnIndex={true} >Root</NavLink>
                        </li>
                        <li>
                            <NavLink to='/about'>Aboutx</NavLink>
                        </li>
                        <li>
                            <NavLink to='/repos'>Repos</NavLink>
                        </li>
                          <li>
                            <NavLink to='/routes_style/gary' query={{age: 23}} hash='#hhh' state={{sex: 'male'}} >routes_style</NavLink>
                        </li>

                    </ul>
                </div>
                <div style={{border: 'solid 1px green'}}>

                    {this.props.children || <Home />}
                </div>
                {/*方式一 */}
                {/*<Footer/> */}
                 {/*方式二 */}
                 {this.props.footer}
                 <About name='ccccc'/>
            </div>

        );
    }
}
export default App;
