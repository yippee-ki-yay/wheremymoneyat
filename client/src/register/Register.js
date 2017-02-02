import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: "",
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
          <input value={ this.state.name }
                 onChange={ this.onInputChange }
                 name="name"
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
    if (this.state.password === this.state.confirmPassword) {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      };
      axios.post('http://localhost:6969/api/register', user)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('noobs');
    }
  }

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

}

export default Register;
