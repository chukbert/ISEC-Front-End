import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
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
            permission: props.permission,
            id: props.id,
            name: '',
            description: '',
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
            listOfCourse: [],
        });
    }

    componentDidMount() {
        this.clearArray();

        const api = process.env.REACT_APP_API_HOST + '/programs/' + this.state.id;
        axios.get(api, {
            headers: {
                "Authorization": `${Cookies.get('token')}`
            }
        }).then(res => {
            this.setState({
                name: res.data.data.name,
                description: res.data.data.description,
            })
            for (var i = 0; i < res.data.data.list_course.length; i++) {
                var courseId = res.data.data.list_course[i].course_id._id;
                var courseName = res.data.data.list_course[i].course_id.name;
                var prerequisite = res.data.data.list_course[i].prerequisite;
                var listOfPrerequisite = []
                for (var j = 0; j < prerequisite.length; j++) {
                    listOfPrerequisite.push(prerequisite[j].name)
                }

                this.state.listOfCourse.push({"id": courseId, "name": courseName, "prerequisite": listOfPrerequisite});

                this.state.listOfCourse.push()
                this.setState({
                    listOfCourse: this.state.listOfCourse,
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
                        {
                            Array.from(this.state.listOfCourse).map(item => (
                                <CourseLink name={item.name} 
                                            id={item.id} 
                                            prerequisite={item.prerequisite}
                                            permission={this.state.permission}
                                />
                            ))
                        }
                    </div>
                    <div className="desc-teacher">
                        <Description data={this.state.programDesciption}/>
                        <TeacherList permission={this.state.permission} teachers={this.state.listOfTeacher} id={this.state.id}/>
                    </div>
                </div>

                {(this.state.permission === 1 || this.state.permission === 2) &&
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