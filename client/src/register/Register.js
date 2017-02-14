import React, { Component } from 'react';
import axios from 'axios';

import { browserHistory } from 'react-router';

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
      <div className="wrapper">
        <div className="form-signin">
          <h2 className="form-signin-heading">Please Register</h2>
          <input value={ this.state.name }
                 className="form-control"
                 onChange={ this.onInputChange }
                 name="name"
                 type="text"
                 placeholder="Username" />
          <input value={ this.state.email }
                 className="form-control"
                 onChange={ this.onInputChange }
                 name="email"
                 type="text"
                 placeholder="Email" />
          <input value={ this.state.password }
                 className="form-control"
                 onChange={ this.onInputChange }
                 name="password"
                 type="password"
                 placeholder="Password" />
          <input value={ this.state.confirmPassword }
                 className="form-control"
                 onChange={ this.onInputChange }
                 name="confirmPassword"
                 type="password"
                 placeholder="Confirm Password" />
          <button onClick={ this.register } className="btn btn-lg btn-primary btn-block login-btn">Register</button>
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

      console.log(user);

      axios.post('http://localhost:6969/api/register', user)
        .then(response => {
          console.log(response);

          browserHistory.push('/login');
        })
        .catch(error => {
          const errorObject = Object.assign({}, error);

          if(errorObject.response.data.indexOf('email_1 dup key') !== -1) {
            console.log('Same email');
          }
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
