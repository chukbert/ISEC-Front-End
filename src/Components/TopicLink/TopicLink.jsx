import React from 'react';
import './TopicLink.css';
// import EditTopic from '../EditTopic/EditTopic';

const TopicLink = (props) => {
    return (
        <div className="topic-link">
            <span>&#9654;</span><a href={props.link}>{props.topicName}</a>
            {/* {
                (props.permission === 1) &&
                <EditTopic />
            } */}
        </div>
    )
}

export default TopicLink;