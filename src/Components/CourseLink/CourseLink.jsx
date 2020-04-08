import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

import './CourseLink.css'

const CourseLink = (props) => {
    const programId = props.programId;
    const courseId = props.courseId;
    const [isShowDescription, setIsShowDescription] = useState(false);
    const [description, setDescription] = useState('description');
    const [code, setCode] = useState('code');

    const showDescription = () => {
        setIsShowDescription(!isShowDescription)
        const api = process.env.REACT_APP_API_HOST + '/courses/' + courseId;
        axios.get(api).then(res => {
            setDescription(res.data.data.description);
            setCode(res.data.data.code);
        })
    }

    const enrollCourse = () => {
        const api = process.env.REACT_APP_API_HOST + '/enrollprograms/enroll/' + programId;
        axios.patch(api, {
            "course_id": courseId
        }, {
            headers: {
                "Authorization": `${Cookies.get('token')}`
            }
        }).then(() => {
            window.location.href="/courses/" + programId + "/" + courseId;
        })        
    }

    const continueCourse = () => {
        window.location.href="/courses/" + programId + "/" + courseId;
    }

    return (
        <div className="course-link" onClick={showDescription}>
            { !isShowDescription &&
                <span>&#9654;</span>
            }
            { isShowDescription &&
                <span>&#9660;</span>
            }
            {props.name}
            {
                isShowDescription &&
                <div>
                    <p><b>Description :</b> {description}</p>
                    <p><b>Code :</b> {code}</p>
                    {
                        props.prerequisite.length > 0 &&
                    <p>Prerequisite :</p>
                    }
                    { props.prerequisite.length > 0 &&
                    props.prerequisite.map((prereq) => {
                            return (<tr>
                                <td>{prereq}</td>
                            </tr>
                    )})
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
                        <Button onClick={enrollCourse}>Enroll</Button>
                    }
                    {
                        (props.status === 1 || props.permission === 2 || props.permission === 1) &&
                        <Button onClick={continueCourse}>Continue</Button>
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