import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <div>
        <h1>Login</h1>

        <div className="form-group">
          <input type="text" value="" placeholder="Username" />
          <input type="password" value="" placeholder="Password" />
          <button className="btn btn-default">Login</button>
        </div>

      </div>
    );
  }

  login = () => {
    console.log(this.state.username);
    console.log(this.state.password);
  }
}

export default Login;
