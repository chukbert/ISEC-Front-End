import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
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
            permission: 0,
            id: '',
            name: '',
            description: '',
            listOfCourse: [],
            listOfTeacher: [],

            isAddCourse: false,
        }

        this.clearArray = this.clearArray.bind(this);
        this.showAddCourse = this.showAddCourse.bind(this);
        this.hideAddCourse = this.hideAddCourse.bind(this);
        this.checkToken = this.checkToken.bind(this);
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

    checkToken = async () => {
        const api = process.env.REACT_APP_API_HOST + '/users/auth'
        try {
            const response = await axios.post(api, {}, {
                headers: {
                    "Authorization": `${Cookies.get('token')}`
                }
            })

            if (response.data.success) {
                this.setState({
                    permission: response.data.role,
                })
            } else {
                Cookies.remove('token');
                window.location.href="/";
            }
        } catch (err) {
            Cookies.remove('token');
            window.location.href="/";
        }
    }

    parseCourses(id, prereq, status) {
        for (var i = 0; i < id.length; i++){
            const api = process.env.REACT_APP_API_HOST + '/courses/' + id[i];
            axios.get(api, {
                headers: {
                    "Authorization": `${Cookies.get('token')}`
                }
            }).then(res => {
                var id = res.data.data._id;
                var name = res.data.data.name;
                var code = res.data.data.code;
                var description = res.data.data.description;
                this.state.listOfCourse.push({"id": id, "name": name, "code": code, "description": description, "prerequisite": prereq, "status": status});
                this.setState({
                    listOfCourse: this.state.listOfCourse,
                })
            })
        }
    }

    componentDidMount() {
        this.checkToken();
        this.clearArray();
        const program_id = this.props.match.params.program_id;

        const api = process.env.REACT_APP_API_HOST + '/enrollprograms/' + program_id;
        axios.get(api, {
            headers: {
                "Authorization": `${Cookies.get('token')}`
            }
        }).then(res => {
            console.log(res);
            this.setState({
                id: program_id,
                name: res.data.data.program_id.name,
                description: res.data.data.program_id.description,
                listOfTeacher: res.data.data.program_id.list_teacher,
            })
            var listOfCourseId = [];
            for (var i = 0; i < res.data.data.program_id.list_course.length; i++) {
                var courseId = res.data.data.program_id.list_course[i].course_id;
                listOfCourseId.push(courseId);
                var prerequisite = res.data.data.program_id.list_course[i].prerequisite;
                var listOfPrerequisite = [];
                for (var j = 0; j < prerequisite.length; j++) {
                    listOfPrerequisite.push(prerequisite[j]);
                }
                var status = null;
                if (this.state.permission === 0) {
                    status = res.data.data.courses[i].status_course;
                }
                for (var j = 0; j < prerequisite.length; j++) {
                    listOfPrerequisite.push(prerequisite[j]);
                }
            }
            this.parseCourses(listOfCourseId, listOfPrerequisite, status)
        })
    }

    render() {
        return (
            <div className="program-page">
                <div className="program-title">
                    <h1>{this.state.name}</h1>
                </div>

                <div className="program-page-desc-teacher-list">
                    <div className="course-list">
                        {
                            Array.from(this.state.listOfCourse).map(item => (
                                <CourseLink name={item.name} 
                                            courseId={item.id} 
                                            prerequisite={item.prerequisite}
                                            status={item.status}
                                            permission={this.state.permission}
                                            programId={this.state.id}
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
                        <AddCourse show={this.state.isAddCourse} onHide={this.hideAddCourse} id={this.state.id}/>
                    }
                </div>
                }
            </div>
        )
    }
}

export default ProgramPage;