import React from "react";
import PropTypes from "prop-types";

class RegisterInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onNameChange(event) {
    this.setState(() => {
      return {
        name: event.target.value,
      };
    });
  }

  onEmailChange(event) {
    this.setState(() => {
      return {
        email: event.target.value,
      };
    });
  }

  onPasswordChange(event) {
    this.setState(() => {
      return {
        password: event.target.value,
      };
    });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props.register({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    });
  }

  render() {
    return (
      <div className="input-register">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={this.state.name} onChange={this.onNameChange}/>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={this.email} onChange={this.onEmailChange}/>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" autoComplete="current-password" value={this.password} onChange={this.onPasswordChange}/>
        <button type="button" onClick={this.onSubmitHandler}>Register</button>
      </div>
    );
  }
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
