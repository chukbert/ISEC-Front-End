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
            {
                (props.permission === 1 || props.permission === 2) &&
                <div>
                    <Button onClick={showEditModal}>Edit Topic</Button>
                    {
                        isShowEditModal &&
                        <EditTopic show={showEditModal} onHide={hideEditModal} id={props.topicId}/>
                    }
                </div>
            }
        </div>
    )
}

export default TopicLink;