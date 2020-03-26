import React from 'react';
import axios from 'axios';
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
            listOfTeacher: [],

            isAddCourse: false,
        }

        this.clearArray = this.clearArray.bind(this);
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

    clearArray() {
        this.setState({ 
            listOfCourseId: [],
            listOfCourseName: []
        });
    }

    componentDidMount() {
        this.clearArray();

        const api = process.env.REACT_APP_API_HOST + '/courses'
        axios.get(api).then(res => {
            for (var i = 0; i < res.data.data.length; i++) {
                // this.state.listOfCourseId.push(res.data.data[i]._id)
                // this.state.listOfCourseName.push(res.data.data[i].name)

                var courseId = res.data.data[i]._id;
                var courseName = res.data.data[i].name;
                var courseCode = res.data.data[i].code;
                var courseDescription = res.data.data[i].description;

                this.state.listOfCourse.push({"id": courseId, "name": courseName, "code": courseCode, "description": courseDescription});

                this.state.listOfCourse.push()
                this.setState({
                    listOfCourse: this.state.listOfCourse,
                    // listOfCourseId: this.state.listOfCourseId,
                    // listOfCourseName: this.state.listOfCourseName
                })
            }
        })

        const apiProgram = process.env.REACT_APP_API_HOST + '/programs/'
        axios.get(apiProgram).then(res => {
            for (var i = 0; i < res.data.data[0].list_teacher.length; i++) {
                this.state.listOfTeacher.push(res.data.data.list_teacher[i])
            }
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
                        {
                            Array.from(this.state.listOfCourse).map(item => (
                                <CourseLink name={item.name} id={item.id} permission={1}/>
                            ))
                        }
                    </div>
                    <div className="desc-teacher">
                        <Description data={this.state.programDesciption}/>
                        <TeacherList permission={this.state.permission} teachers={this.state.listOfTeacher}/>
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