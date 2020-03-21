import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './TopicLink.css';
import EditTopic from '../EditTopic/EditTopic';

const TopicLink = (props) => {
    const [isShowEditModal, setIsShowEditModal] = useState(false)

    const showEditModal = () => {
        setIsShowEditModal(true)
    }

    const hideEditModal = () => {
        setIsShowEditModal(false)
    }

    return (
        <div className="topic-link">
            <span>&#9654;</span><a href={props.link}>{props.topicName}</a>
            <Button onClick={showEditModal}>Edit Topic</Button>
            {
                isShowEditModal &&
                <EditTopic show={showEditModal} onHide={hideEditModal} id={props.topicId}/>
            }
        </div>
    )
}

export default TopicLink;