import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import {Button} from 'react-bootstrap';

import './ProgramLink.css'

const ProgramLink = (props) => {
    const programId = props.id;
    const name = props.name;
    const description = props.description;
    const status = props.status;

    const [isShowDescription, setIsShowDescription] = useState(false);
    
    const showDescription = () => {
        setIsShowDescription(!isShowDescription);
    }

    const handleButton = (status) => {
        if (status === 0) {
            return <Button onClick={enrollProgram}>Enroll</Button>
        } else { // status === 1 (have enrolled the program)
            return <Button onClick={continueProgram}>Continue</Button>
        }
    } 

    const enrollProgram = () => {
        const api = process.env.REACT_APP_API_HOST + '/enrollprograms/new/' + programId;
        Axios.post(api, {}, {
            headers: {
                "Authorization": `${Cookies.get('token')}`
            }
        }).then(() => {
            window.location.href="/enrollprogram/" + programId;
        })
    }

    const continueProgram = () => {
        window.location.href="/enrollprogram/" + programId;
    }

    return(
        <div className="program-link" onClick={showDescription}>
            <span>&#9654;</span>{name}
            {
                isShowDescription &&
                <div>
                    <p> Description : {description}</p>
                    {handleButton(status)}
                </div>
            }
        </div>
    )
}

export default ProgramLink;