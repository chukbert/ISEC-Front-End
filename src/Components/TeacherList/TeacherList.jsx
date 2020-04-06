import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import TeacherInProgramPage from './TeacherInProgramPage';
import AddTeacher from '../AddTeacher/AddTeacher';

import './TeacherList.css';

function TeacherList(props) {
    // eslint-disable-next-line no-unused-vars
    // const [teacherList, setTeacherList] = useState(props.teachers)
    const [teacherList, setTeacherList] = useState(props.teachers)
    const [isAddTeacher, setIsAddTeacher] = useState(false)

    const showAddTeacher = () => {
        setIsAddTeacher(true)
    }

    const hideAddTeacher = () => {
        setIsAddTeacher(false)
    }

    return (
        <div className="teacher-list">
            <table>
                <thead>
                    <tr>
                        <th>Teachers</th>
                    </tr>
                </thead>
                <tbody>
                    { teacherList.map((teacher) => {
                            return (<tr>
                                <td><TeacherInProgramPage name={teacher} /></td>
                            </tr>
                    )})}
                    {
                        teacherList.length === 0 &&
                        <tr>
                            <td><span>No teachers added yet</span></td>
                        </tr>

                    }
                </tbody>
            </table>

            { props.permission === 2 &&
                <div className="add-teacher">
                    <Button onClick={showAddTeacher}>Add Teacher</Button>
                    {
                        isAddTeacher &&
                        <AddTeacher show={isAddTeacher} onHide={hideAddTeacher} id={props.id}/>
                    }
                </div>
            }
        </div>
    );
}

export default TeacherList;