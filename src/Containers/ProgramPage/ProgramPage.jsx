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
            this.setState({
                id: program_id,
                name: res.data.data.program_id.name,
                description: res.data.data.program_id.description,
                listOfTeacher: res.data.data.program_id.list_teacher,
            })
            for (var i = 0; i < res.data.data.courses.length; i++) {
                var courseId = res.data.data.courses[i].course_id._id;
                var courseName = res.data.data.courses[i].course_id.name;
                var prerequisite = res.data.data.courses[i].prerequisite;
                var listOfPrerequisite = []
                for (var j = 0; j < prerequisite.length; j++) {
                    listOfPrerequisite.push(prerequisite[j].name)
                }
                var status = res.data.data.courses[i].status_course;

                this.state.listOfCourse.push({"id": courseId, "name": courseName, "prerequisite": listOfPrerequisite, "status": status});

                this.state.listOfCourse.push()
                this.setState({
                    listOfCourse: this.state.listOfCourse,
                })
            }
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