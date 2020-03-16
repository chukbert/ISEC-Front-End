import React from 'react';
import './TopicLink.css';

const TopicLink = (props) => {
    return (
        <div className="topic-link">
            <span>&#9654;</span><a href={props.link}>{props.topicName}</a>
        </div>
    )
}

export default TopicLink;