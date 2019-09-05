import React, { Component } from 'react';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 
class DateSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      updateDate: this.props.updateDate,
      name: this.props.name,
    };
    this.handleChange = this.props.handleChange.bind(this);
  }
 
  /**
  handleChange(date) {
    this.setState({
      selectedDate: date
    });
    this.updateDate(date, this.props.name);
  }
  **/
 
  render() {
    return (
      <div>
        <span>{this.state.name}: </span>
        <DatePicker
          selected={this.state.selectedDate}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default DateSelect;
