import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import CheckBox2 from "../CheckBox2";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { value: "Buy Groceries", checked: false },
        { value: "Buy Milk", checked: false },
        { value: "Walk Ferrets", checked: false },
        { value: "Clean House", checked: false },
        { value: "Wash Car", checked: false },
        { value: "Code Stuff", checked: false }
      ]
    };
  }

  handleClick = Index => {
    this.setState(state => {
      // let Index = state.data.findIndex(obj => obj.value === value);
      return {
        data: [
          ...state.data.slice(0, Index),
          {
            ...state.data[Index],
            checked: !state.data[Index].checked
          },
          ...state.data.slice(Index + 1)
        ]
      };
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.state.data.map((item, idx) => (
            <CheckBox2
              key={idx}
              value={item.value}
              {...item.checked}
              handleClick={() => this.handleClick(idx)}
            />
          ))}
        </header>
      </div>
    );
  }
}

export default App;
