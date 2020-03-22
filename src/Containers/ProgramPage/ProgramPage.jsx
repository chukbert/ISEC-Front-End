import React from 'react';
import Axios from 'axios';
import Description from '../../Components/Description/Description';
import TeacherList from '../../Components/TeacherList/TeacherList';
import CourseLink from '../../Components/CourseLink/CourseLink';
import './ProgramPage.css';

class ProgramPage extends React.Component {
    constructor(props) {
        super()
        this.state = {
            permission: 0,
            id: props.programId,
            name: props.name,
            listOfCourse: [],
            listOfIsShowCourse: [],
        }
    }

    render() {
        return (
            <div className="program-page">
                <div className="program-title">
                    <h1>{this.state.name}</h1>
                </div>

                <div className="program-page-desc-teacher-list">
                    <div className="course-list">
                        <CourseLink name="Dasar Pemrograman" id = {1} />
                    </div>
                    <div className="desc-teacher">
                        <Description data={this.state.programDesciption}/>
                        <TeacherList />
                    </div>
                </div>

            </div>
        )
    }
}

export default ProgramPage;