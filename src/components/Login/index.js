import React, { Component } from "react";
import LoadingAnimation from "../LoadingAnimation";

const API_URL = "http://localhost:5000";

class Authed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: Boolean(localStorage.getItem("Token")),
      email: "",
      password: "",
      secret: "",
      isLoading: false
    };
  }

  onChange = event => {
    const { value, name } = event.target;
    this.setState(state => ({
      [name]: value
    }));
  };

  loadFunc = loadFunction => {
    this.setState({ isLoading: true });
    try {
      loadFunction();
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => this.setState({ isLoading: false }), 1000);
    }
  };

  login = () => {
    fetch(`${API_URL}/login`, {
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
    const response = await fetch(`${API_URL}/private?token=${token}`);
    const data = await response.json();
    this.setState(() => ({
      secret: data.message
    }));
  };

  render() {
    return (
      <div>
        {this.state.isLoggedIn ? (
          <h2>Welcome Home</h2>
        ) : (
          <h2>You are not allowed to be here</h2>
        )}
        {this.state.isLoading ? (
          <LoadingAnimation />
        ) : this.state.isLoggedIn ? (
          <div>
            {this.state.secret || (
              <button onClick={() => this.loadFunc(this.showSecret)}>
                Show Secret
              </button>
            )}
            <button onClick={this.logout}>Logout</button>
          </div>
        ) : (
          <div>
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
              type="password"
              name="password"
              placeholder="password"
            />
            <button onClick={() => this.loadFunc(this.login)}>login</button>
          </div>
        )}
      </div>
    );
  }
}

export default Authed;
