import React, { Component } from "react";

class Authed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: Boolean(localStorage.getItem("Token")),
      email: "",
      password: "",
      secret: ""
    };
  }

  onChange = event => {
    const { value, name } = event.target;
    this.setState(state => ({
      [name]: value
    }));
  };

  login = event => {
    event.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState(() => ({ isLoggedIn: true, secret: "" }));
          localStorage.setItem("Token", data.token);
        }
      });
  };

  logout = () => {
    localStorage.removeItem("Token");
    this.setState(() => ({
      isLoggedIn: false,
      secret: ""
    }));
  };

  showSecret = async () => {
    const token = localStorage.getItem("Token");
    const response = await fetch(`/private?token=${token}`);
    const data = await response.json();
    this.setState(() => ({
      secret: data.message
    }));
  };

  render() {
    return (
      <div>
        {this.state.isLoggedIn
          ? "Welcome Home"
          : "You are not allowed to be here"}
        {this.state.isLoggedIn ? (
          <div>
            {this.state.secret || (
              <button onClick={this.showSecret}>Show Secret</button>
            )}
            <button onClick={this.logout}>Logout</button>
          </div>
        ) : (
          <form onSubmit={this.login}>
            <input
              onChange={this.onChange}
              value={this.state.email}
              name="email"
              type="email"
              placeholder="email"
            />
            <input
              onChange={this.onChange}
              value={this.state.password}
              name="password"
              // type="password"
              placeholder="password"
            />
            <button type="submit">login</button>
          </form>
        )}
      </div>
    );
  }
}

export default Authed;
