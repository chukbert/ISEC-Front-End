import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Axios from 'axios';
import './CourseLink.css'

const CourseLink = (props) => {
    const courseId = props.id;
    const [isShowDescription, setIsShowDescription] = useState(false)
    const [description, setDescription] = useState('description')

    const showDescription = () => {
        setIsShowDescription(!isShowDescription)
        const api = process.env.REACT_APP_API_HOST + '/courses/' + courseId;
        Axios.get(api).then(res => {
            setDescription(res.data.data.description);
            // setPrerequisite(res.data.data.prerequisite)
        })
    }

    return (
        <div className="course-link" onClick={showDescription}>
            <span>&#9654;</span>{props.name}
            {
                isShowDescription &&
                <div>
                    <p> Description : {description}</p>
                    {
                        props.prerequisite.length > 0 &&
                        <p>Prerequisite : {props.prerequisite}</p>
                    }
                    {
                        props.prerequisite.length === 0 &&
                        <p>No Prerequisite</p>
                    }
                    {
                        props.status === -1 &&
                        <p>You cannot enroll to this course. Finish the prerequisite first</p>
                    }
                    {
                        props.status === 0 &&
                        <Button>Enroll</Button>
                    }
                    {
                        props.status === 1 &&
                        <Button>Continue</Button>
                    }
                    {
                        props.status === 2 &&
                        <p>You have finished this course</p>
                    }
                </div>
            }
        </div>
    )
}

export default CourseLink;