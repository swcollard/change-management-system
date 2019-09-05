import React, { Component } from 'react';
import {Timeline, TimelineEvent} from 'react-event-timeline'

class EventList extends Component {

  render() {
  	const timelineEvents = this.props.events.map((event) =>
      <TimelineEvent title={event.owner}
          createdAt={event.timestamp}
      >
        {event.description}
        <br />
        <a href={event.eventLink}>{event.eventLink}</a>
      </TimelineEvent>
    );

    return (
      <Timeline>
        {timelineEvents}
      </Timeline>
    );
  }

}

export default EventList;
