import React, { Component } from 'react';
import axios from '../../axios';

const { apiBaseUrl } = require('../../env');

export default class extends Component {
  state = {
    userLoggedIn: false
  };

  intervalId = null;

  componentDidMount = async() => {
    this.intervalId = setInterval(() => {
      if(window.user && !this.state.userLoggedIn) {
        this.setState({ userLoggedIn: true });
      } else if(!window.user && this.state.userLoggedIn) {
        this.setState({ userLoggedIn: false });
      }
    }, 100);

    const code = window.getQueryParameter('code');
    const state = window.getQueryParameter('state');

    if(code && state) {
      const qs = (jsonData = {}) =>
        Object.entries(jsonData)
          .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
          .join('&');
      const response = await axios.post(apiBaseUrl+'/uphold/login', qs({code, state}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      alert(response.data);
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  };

  render() {
    return (
      <div className="header-area wow fadeInDown header-absolate" id="nav" data-0="position:fixed;" data-top-top="position:fixed;top:0;" data-edge-strategy="set">
        <div className="container">
          <div className="row">
            <div className="col-4 d-block d-lg-none">
              <div className="mobile-menu"></div>
            </div>
            <div className="col-4 col-lg-2">
              <div className="logo-area">
                <a onClick={() => this.props.history.push('/')}><img src="/img/compute-ex32.png" /></a>
              </div>
            </div>
            <div className="col-4 col-lg-8 d-none d-lg-block">
              <div className="main-menu text-center">
                <nav>
                  <ul id="slick-nav">
                    <li className="navlink-custom"><a onClick={() => this.props.history.push('/uphold')}>Uphold</a></li>
                    <li className="navlink-custom"><a className="scroll" href="#about">About</a></li>
                    <li className="navlink-custom"><a className="scroll" href="#faq">FAQ</a></li>
                    <li className="navlink-custom"><a className="scroll" href="#contact">Contact</a></li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-4 col-lg-2 text-right">
              {!this.state.userLoggedIn
                ? <a onClick={() => this.props.history.push('/uphold')} className="logibtn gradient-btn">Login</a>
                : <span onClick={() => this.props.history.push('/uphold/account')} className="cursor-pointer">Welcome {window.user.firstName}</span>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
