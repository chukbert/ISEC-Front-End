import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Axios from 'axios';
import './CourseLink.css'

const CourseLink = (props) => {
    const courseId = props.id;
    const [isShowDescription, setIsShowDescription] = useState(false)
    const [description, setDescription] = useState('description')
    const [prerequisite, setPrerequisite] = useState('prerequisite')

    const showDescription = () => {
        setIsShowDescription(!isShowDescription)
        const api = process.env.REACT_APP_API_HOST + '/courses/' + courseId;
        Axios.get(api).then(res => {
            setDescription(res.data.description)
            // setPrerequisite(res.data.prerequisite)
        })
    }

    return (
        <div className="course-link" onClick={showDescription}>
            <span>&#9654;</span>{props.name}
            {
                isShowDescription &&
                <div>
                    <p>{description}</p>
                    <p>{prerequisite}</p>
                    <Button>Enroll</Button>
                </div>
            }
        </div>
    )
}

export default CourseLink;