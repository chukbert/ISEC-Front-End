import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Description from '../../Components/Description/Description';
import TeacherList from '../../Components/TeacherList/TeacherList';
import CourseLink from '../../Components/CourseLink/CourseLink';
import AddCourse from '../../Components/AddCourse/AddCourse';
import EditPrerequisite from '../../Components/EditPrerequisite/EditPrerequisite';

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
            listOfPrerequisite: [],
            listOfPrerequisiteName: [],
            listOfCourseName: [],
            listStatus:[],
            isAddCourse: false,
            isEditPrerequisite: false,
        }

        this.clearArray = this.clearArray.bind(this);
        this.showAddCourse = this.showAddCourse.bind(this);
        this.hideAddCourse = this.hideAddCourse.bind(this);
        this.showEditPrerequisite = this.showEditPrerequisite.bind(this);
        this.hideEditPrerequisite = this.hideEditPrerequisite.bind(this);
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

    showEditPrerequisite() {
        this.setState({
            isEditPrerequisite: true
        })
    }

    hideEditPrerequisite() {
        this.setState({
            isEditPrerequisite: false
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

    getAllCourses = async () => {
        const api = process.env.REACT_APP_API_HOST + '/courses';
        await axios.get(api, {
            headers: {
                "Authorization": `${Cookies.get('token')}`
            }
        }).then(res => {
            for (var i = 0; i < res.data.data.length; i++) {
                var courseId = res.data.data[i]._id;
                let name = res.data.data[i].name;

                this.state.listOfCourseName.push({"id": courseId, "name": name});
                this.setState({
                    listOfCourseName: this.state.listOfCourseName
                })
            }
        })
        return;
    }

    parsePrerequisite(prereq) {
        for (var i = 0; i < prereq.length; i++) {
            if (prereq[i].length === 0) {
                this.state.listOfPrerequisiteName.push('')
            } else {
                for (var j = 0; j < prereq[i].length; j++) {
                    var listName = []
                    for (var k = 0; k < this.state.listOfCourseName.length; k++) {
                        if (prereq[i][j] === this.state.listOfCourseName[k].id) {
                            listName.push(this.state.listOfCourseName[k].name)
                        }
                    }
                }
                this.state.listOfPrerequisiteName.push(listName);
            }
        }
    }

    parseCourses(id, status) {
        for (var i = 0; i < id.length; i++) {
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
                this.state.listOfCourse.push({"id": id, "name": name, "code": code, "description": description});
                this.setState({
                    listOfCourse: this.state.listOfCourse,
                })
            })
        }
    }

    componentDidMount() {
        this.checkToken();
        this.clearArray();
        this.getAllCourses();
        const program_id = this.props.match.params.program_id;

        const api = process.env.REACT_APP_API_HOST + '/enrollprograms/' + program_id;
        axios.get(api, {
            headers: {
                "Authorization": `${Cookies.get('token')}`
            }
        }).then(res => {
            console.log(res)
            console.log(res.data.data.courses)
            console.log(res.data.data.program_id.list_course)
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
                this.state.listOfPrerequisite.push(prerequisite);
                if (this.state.permission === 0) {
                    for (var j = 0; j < res.data.data.courses.length; j++) {
                        if (res.data.data.courses[j].course_id._id === res.data.data.program_id.list_course[i].course_id) {
                            this.state.listStatus.push(res.data.data.courses[j].status_course);
                        }
                    }
                }
            }
            this.setState({
                listOfPrerequisite: this.state.listOfPrerequisite
            })
            this.setState({
                listStatus: this.state.listStatus
            })
            this.parsePrerequisite(this.state.listOfPrerequisite);
            this.parseCourses(listOfCourseId);
        })
    }

    render() {
        return (
            <div className="program-page">
                <div className="program-title">
                    <h1>{this.state.name}</h1>
                </div>

                {
                    this.state.permission !== 0 &&
                    <div className="edit-prerequisite">
                        <Button variant="primary" onClick={this.showEditPrerequisite}>Edit Prerequisite</Button>
                        {
                            this.state.isEditPrerequisite &&
                            <EditPrerequisite show={this.state.isEditPrerequisite} onHide={this.hideEditPrerequisite} id={this.state.id}/>
                        }
                    </div>
                }

                <div className="program-page-desc-teacher-list">
                    <div className="course-list">
                        {
                            Array.from(this.state.listOfCourse).map((item, i) => (
                                <CourseLink name={item.name} 
                                            courseId={item.id} 
                                            prerequisite={this.state.listOfPrerequisiteName[i]}
                                            status={this.state.listStatus[i]}
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

                {this.state.permission !== 0 &&
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