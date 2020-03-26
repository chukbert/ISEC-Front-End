import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import TeacherInCoursePage from './TeacherInCoursePage';
import AddTeacher from '../AddTeacher/AddTeacher';

import './TeacherList.css';

function TeacherList(props) {
    // eslint-disable-next-line no-unused-vars
    const [teacherList, setTeacherList] = useState(['Louis Cahyadi', 'Kevin Nathaniel Wijaya'])
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
                                <td><TeacherInCoursePage name={teacher} /></td>
                            </tr>
                    )})}
                </tbody>
            </table>

            { props.permission == 2 &&
                <div className="add-teacher">
                    <Button onClick={showAddTeacher}>Add Teacher</Button>
                    {
                        isAddTeacher &&
                        <AddTeacher show={isAddTeacher} onHide={hideAddTeacher} />
                    }
                </div>
            }
        </div>
    );
}

export default TeacherList;