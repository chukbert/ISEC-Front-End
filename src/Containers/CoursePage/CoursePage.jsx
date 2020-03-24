import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Description from '../../Components/Description/Description';
import TeacherList from '../../Components/TeacherList/TeacherList';
import TopicLink from '../../Components/TopicLink/TopicLink';

import './CoursePage.css';
import AddTopic from '../../Components/AddTopic/AddTopic';


class CoursePage extends React.Component {
    constructor(props) {
        super()
        this.state = {
            permission: props.permission,
            id: props.courseId,
            name: 'Object Oriented Programming',
            code: 'IF2110',
            description: 'Deskripsi',
            // listOfTopicId: [],
            // listOfTopicName: [],
            listOfTopic: [],
            isAddModal: false
        }
        this.clearArray = this.clearArray.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.hideAddModal = this.hideAddModal.bind(this);
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

    clearArray() {
        this.setState({ 
            listOfTopicId: [],
            listOfTopicName: []
        });
    }

    componentDidMount() {
        this.clearArray();

        const api = process.env.REACT_APP_API_HOST + '/topics'
        axios.get(api).then(res => {
            for (var i = 0; i < res.data.data.length; i++) {
                // this.state.listOfTopicId.push(res.data.data[i]._id)
                // this.state.listOfTopicName.push(res.data.data[i].name)

                var topicId = res.data.data[i]._id;
                var topicName = res.data.data[i].name;

                this.state.listOfTopic.push({"id": topicId, "name": topicName});

                this.state.listOfTopic.push()
                this.setState({
                    listOfTopic: this.state.listOfTopic,
                    // listOfTopicId: this.state.listOfTopicId,
                    // listOfTopicName: this.state.listOfTopicName
                })
            }
        })
    }

    render() {
        return (
            <div className="course-page">
                <NavbarApp/>
                <div className="course-title">
                    <h1>{this.state.name}</h1>
                    <h3>{this.state.code}</h3>
                </div>
                
                <div className="course-page-desc-teacher-list">
                    <div className="topic-list">
                        {/* {
                            Array.from(this.state.listOfTopicName).map(item => (
                                <TopicLink link="#" topicName={item} permission={1}/>
                            ))
                        } */}
                        {
                            Array.from(this.state.listOfTopic).map(item => (
                                <TopicLink link="#" topicName={item.name} topicId={item.id} permission={1}/>
                            ))
                        }
                    </div>
                    <div className="desc-teacher">
                        <Description data={this.state.description} />
                        <TeacherList />
                    </div>
                </div>

                <div className="add-topic-button">
                    <Button variant="primary" onClick={this.showAddModal}>Add Topic</Button>
                    {
                        this.state.isAddModal &&
                        <AddTopic show={this.state.isAddModal} onHide={this.hideAddModal}/>
                    }
                </div>
            </div>
        )
    }
}

export default CoursePage;
