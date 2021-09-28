import React, { Component } from "react";
import ReactCountdownClock from "react-countdown-clock";
import worker from "./worker.js";
import WebWorker from "./workerSetup";
import "./App.css";
import walmartLogo from "./Walmart-logo.png";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }

  fetchUsers = () => {
    const users = [];

    const userDetails = {
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      id: 1,
    };

    for (let i = 0; i < 50000000; i++) {
      userDetails.id = i++;
      userDetails.dateJoined = Date.now();

      users.push(userDetails);
    }

    this.setState({
      count: users.length,
    });
  };

  fetchWebWorker = () => {
    this.worker.postMessage("Fetch Users");
    console.log("fetch");
    this.worker.addEventListener("message", (event) => {
      console.log("count", this.state.count);
      this.setState({
        count: event.data.length,
      });
    });
  };

  componentDidMount = () => {
    this.worker = new WebWorker(worker);
  };

  render() {
    return (
      <div className="App-bottom">
        <div>
          <img src={walmartLogo} className="walmartLogo" />
        </div>
        <section className="App-left">
          <ReactCountdownClock
            seconds={100}
            color="#000"
            alpha={0.9}
            size={300}
          />
          <p className="text-center">Computed data: {this.state.count}</p>
          <button className="btn-direct" onClick={this.fetchUsers}>
            Compute data Directly
          </button>
        </section>

        <section className="App-right">
          <ReactCountdownClock
            seconds={100}
            color="#e56"
            alpha={0.9}
            size={300}
          />
          <p className="text-center">Computed data: {this.state.count}</p>
          <button className="btn-worker" onClick={this.fetchWebWorker}>
            Compute data with Web Worker
          </button>
        </section>
      </div>
    );
  }
}

export default Home;
