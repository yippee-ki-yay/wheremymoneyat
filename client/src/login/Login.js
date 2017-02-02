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
          <input value={ this.state.username }
                 onChange={ this.onInputChange }
                 name="username"
                 type="text"
                 placeholder="Username" />
          <input value={ this.state.password }
                 onChange={ this.onInputChange }
                 name="password"
                 type="password"
                 placeholder="Password" />
          <button onClick={ this.login } className="btn btn-default">Login</button>
        </div>

      </div>
    );
  }

  login = () => {
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    axios.post("http://localhost:6969/api/login", user)
      .then(response => {
        console.log(response);
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
