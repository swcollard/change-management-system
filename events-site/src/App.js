import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import EventList from './EventList'
import logo from './logo.svg';
import './App.css';
 
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentEvents: [
        {
          owner: "samco",
          eventLink: "https://www.heb.com",
          timestamp: 1564163745,
          description: "Passing an event into the react component on init"
        },
      ],
      startDate: new Date(),
      endDate: new Date(),
    };

    // This binding is necessary to make `this` work in the callback
    this.fetchEvents = this.fetchEvents.bind(this);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>IS Change Awareness</h2>
        </div>
        <p className="App-intro">
          To get started, select a date and click search to see events for that time period.
        </p>
        <div className="row">
          <div className="column">
            <span>Start Date: </span>
            <DatePicker
                selected={this.state.startDate}
                onChange={(date) => this.setState({startDate: date})}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
            />
          </div>
          <div className="column">
            <span>End Date: </span>
            <DatePicker
                selected={this.state.endDate}
                onChange={(date) => this.setState({endDate: date})}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                timeCaption="time"
            />
          </div>
        </div>
        <div>
          <button onClick={this.fetchEvents}>Get Events</button>
        </div>
        <div>
          <EventList events={this.state.currentEvents} />
        </div>
      </div>
    );
  }

  fetchEvents() {
    // Testing to just set the stae since fetching isn't working
    const eventList = [
        {
          owner: "sam",
          eventLink: "https://www.heb.com",
          timestamp: 1564163745,
          description: "Passing an event into the react component"
        },
    ];
    console.log(eventList);
    this.setState({
      currentEvents: eventList,
    });
    // End Test Code

    axios.post('https://kjoep64n0h.execute-api.us-east-1.amazonaws.com/default/fetch/',
      {
        startTime: new Date(this.state.startTime).getTime(),
        endTime: new Date(this.state.endTime).getTime(),
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

export default App;
