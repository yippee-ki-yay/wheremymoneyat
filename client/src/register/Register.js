import React, { Component } from 'react';

class Register extends Component {
  constructor (props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  render() {
    return (
      <div>
        <h1>Register</h1>

        <div className="form-group">
          <input value={ this.state.username }
                 onChange={ this.onInputChange }
                 name="username"
                 type="text"
                 placeholder="Username" />
          <input value={ this.state.email }
                 onChange={ this.onInputChange }
                 name="email"
                 type="text"
                 placeholder="Email" />
          <input value={ this.state.password }
                 onChange={ this.onInputChange }
                 name="password"
                 type="password"
                 placeholder="Password" />
          <input value={ this.state.confirmPassword }
                 onChange={ this.onInputChange }
                 name="confirmPassword"
                 type="password"
                 placeholder="Confirm Password" />
          <button onClick={ this.register } className="btn btn-default">Register</button>
        </div>

      </div>
    );
  }

  register = () => {
    console.log(this.state);
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

}

export default Register;
