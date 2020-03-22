import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Axios from 'axios';

const CourseLink = (props) => {
    const courseId = props.id;
    const [isShowDescription, setIsShowDescription] = useState(false)
    const [description, setDescription] = useState('decription')
    const [prerequisite, setPrerequisite] = useState('prerequisite')

    const showDescription = () => {
        setIsShowDescription(!isShowDescription)
        // const api = process.env.REACT_APP_API_HOST;
        // Axios.get(api).then(res => {
        //     setDescription(res.data.description)
        //     setPrerequisite(res.data.prerequisite)
        // })
    }

    return (
        <div className="course-link" onClick={showDescription}>
            <span>&#9654;{props.name}</span>
            {
                isShowDescription &&
                <div>
                    <span>{description}</span>
                    <span>{prerequisite}</span>
                    <Button>Enroll</Button>
                </div>
            }
        </div>
    )
}

export default CourseLink;