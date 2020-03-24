import React from 'react';
import Axios from 'axios';
import NavbarApp from '../../Components/NavbarApp/NavbarApp';
import Description from '../../Components/Description/Description';
import TeacherList from '../../Components/TeacherList/TeacherList';
import CourseLink from '../../Components/CourseLink/CourseLink';
import AddCourse from '../../Components/AddCourse/AddCourse';

import './ProgramPage.css';
import { Button } from 'react-bootstrap';

class ProgramPage extends React.Component {
    constructor(props) {
        super()
        this.state = {
            permission: 2,
            id: props.programId,
            name: props.name,
            listOfCourse: [],
            listOfIsShowCourse: [],

            isAddCourse: false,
        }

        this.showAddCourse = this.showAddCourse.bind(this);
        this.hideAddCourse = this.hideAddCourse.bind(this);
    }

    showAddCourse() {
        this.setState({
            isAddCourse: true
        })
    }

    hideAddCourse() {
        this.setState({
            isAddCourse: false
        })
    }

    render() {
        return (
            <div className="program-page">
                <NavbarApp/>
                <div className="program-title">
                    <h1>{this.state.name}</h1>
                </div>

                <div className="program-page-desc-teacher-list">
                    <div className="course-list">
                        <CourseLink name="Dasar Pemrograman" id = {1} />
                    </div>
                    <div className="desc-teacher">
                        <Description data={this.state.programDesciption}/>
                        <TeacherList permission={this.state.permission}/>
                    </div>
                </div>

                {(this.state.permission == 1 || this.state.permission == 2) &&
                <div className="add-course-button">
                    <Button variant="primary" onClick={this.showAddCourse}>Add Course</Button>
                    {
                        this.state.isAddCourse &&
                        <AddCourse show={this.state.isAddCourse} onHide={this.hideAddCourse}/>
                    }
                </div>
                }
            </div>
        )
    }
}

export default ProgramPage;