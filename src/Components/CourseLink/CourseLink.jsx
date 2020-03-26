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
                    <p>{description}</p>
                    {
                        props.prerequisite.length > 0 &&
                        <p>{props.prerequisite}</p>
                    }
                    {
                        props.prerequisite.length === 0 &&
                        <p>No Prerequisite</p>
                    }
                    <Button>Enroll</Button>
                </div>
            }
        </div>
    )
}

export default CourseLink;