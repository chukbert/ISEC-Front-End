import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';

import Description from '../../Components/Description/Description';
import TopicLink from '../../Components/TopicLink/TopicLink';
import AddTopic from '../../Components/AddTopic/AddTopic';
import EditCourse from '../../Components/EditCourse/EditCourse';

import './CoursePage.css';


class CoursePage extends React.Component {
    constructor(props) {
        super()
        this.state = {
            permission: 0,
            id: '',
            name: '',
            description: '',
            listOfTopic: [],
            isAddModal: false,
            isEditCourse: false,
        }
        this.clearArray = this.clearArray.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.hideAddModal = this.hideAddModal.bind(this);

        this.showEditCourse = this.showEditCourse.bind(this);
        this.hideEditCourse = this.hideEditCourse.bind(this);
        this.checkToken = this.checkToken.bind(this);
    }

    showAddModal() {
        this.setState({
            isAddModal: true
        })
    }

    hideAddModal() {
        this.setState({
            isAddModal: false
        })
    }

    showEditCourse() {
        this.setState({
            isEditCourse: true
        })
    }

    hideEditCourse() {
        this.setState({
            isEditCourse: false
        })
    }

    clearArray() {
        this.setState({ 
            listOfTopicId: [],
            listOfTopicName: []
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
        // this.clearArray();

        // const api = process.env.REACT_APP_API_HOST + '/topics'
        // axios.get(api).then(res => {
        //     for (var i = 0; i < res.data.data.length; i++) {
        //         var topicId = res.data.data[i]._id;
        //         var topicName = res.data.data[i].name;

        //         this.state.listOfTopic.push({"id": topicId, "name": topicName});

        //         this.state.listOfTopic.push()
        //         this.setState({
        //             listOfTopic: this.state.listOfTopic,
        //         })
        //     }
        // })
        this.checkToken();
        const programId = this.props.match.params.program_id;
        const courseId = this.props.match.params.course_id;
        const api = process.env.REACT_APP_API_HOST + '/enrollprograms/' + programId 
                        + '/courses/' + courseId;
                        
        axios.get(api, {
            headers: {
                "Authorization": `${Cookies.get('token')}`
            }
        }).then(res => {
            // console.log(res)
            var topicList = []
            for (var i = 0; i < res.data.data.topics.length; i++) {
                var topicId = res.data.data.topics[i].topic_id._id;
                var topicName = res.data.data.topics[i].topic_id.name;
                var topicStatus = res.data.data.topics[i].status_topic;
                topicList.push({"id": topicId, "name": topicName, "status": topicStatus})
            }
            this.setState({
                id: courseId,
                name: res.data.data.course_id.name,
                description: res.data.data.course_id.description,
                listOfTopic: topicList
            });
        })
    }

    render() {
        return (
            <div className="course-page">
                <div className="course-title">
                    <h1>{this.state.name}</h1>
                </div>

                {
                    this.state.permission !== 0 &&
                    <div className="edit-course">
                        <Button variant="primary" onClick={this.showEditCourse}>Edit Course</Button>
                        {
                            this.state.isEditCourse &&
                            <EditCourse show={this.state.isEditCourse} onHide={this.hideEditCourse}/>
                        }
                    </div>
                }
                
                <div className="course-page-desc-teacher-list">
                    <div className="topic-list">
                        {
                            Array.from(this.state.listOfTopic).map(item => (
                                <TopicLink link="#" topicName={item.name} topicId={item.id} status={item.status} permission={this.state.permission}/>
                            ))
                        }
                    </div>
                    <div className="desc-teacher">
                        <Description data={this.state.description} />
                    </div>
                </div>

                {
                    this.state.permission !== 0 &&
                    <div className="add-topic-button">
                        <Button variant="primary" onClick={this.showAddModal}>Add Topic</Button>
                        {
                            this.state.isAddModal &&
                            <AddTopic show={this.state.isAddModal} onHide={this.hideAddModal}/>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default CoursePage;
