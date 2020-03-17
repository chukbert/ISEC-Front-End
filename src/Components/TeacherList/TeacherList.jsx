import React, { useState } from 'react';
import './TeacherList.css';
import TeacherInCoursePage from './TeacherInCoursePage';

function TeacherList() {
    // eslint-disable-next-line no-unused-vars
    const [teacherList, setTeacherList] = useState(['Louis Cahyadi', 'Kevin Nathaniel Wijaya'])

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
        </div>
    );
}

export default TeacherList;