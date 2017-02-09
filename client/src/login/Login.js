import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

import { browserHistory } from 'react-router';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form-signin">
          <h2 className="form-signin-heading">Please login</h2>
          <input type="text" name="email" className="form-control"  value={ this.state.email } onChange={ this.onInputChange } placeholder="Email" />
          <input type="password" name="password" className="form-control"  value={ this.state.password } onChange={ this.onInputChange } placeholder="Password" required=""/>
          <button className="btn btn-lg btn-primary btn-block login-btn" onClick={ this.login }>Login</button>
        </div>
      </div>
    );
  }

  login = () => {
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post("http://localhost:6969/api/login", user)
      .then(response => {
        console.log(response);

        localStorage.setItem('wheremymoneyat-jwt', response.data.token);

        browserHistory.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

}

export default Login;
