import React from 'react';
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
            listOfTopicId: [],
            listOfTopicName: [],
            isAddModal: false
        }
        this.clearArray = this.clearArray.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
    }

    showAddModal() {
        this.setState({
            isAddModal: true
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
                this.state.listOfTopicId.push(res.data.data[i]._id)
                this.state.listOfTopicName.push(res.data.data[i].name)
                this.setState({
                    listOfTopicId: this.state.listOfTopicId,
                    listOfTopicName: this.state.listOfTopicName
                })
            }
        })
    }

    render() {
        return (
            <div className="course-page">
                <div className="course-title">
                    <h1>{this.state.name}</h1>
                    <h3>{this.state.code}</h3>
                </div>
                <div className="course-page-desc-teacher-list">
                    <div className="topic-list">
                        {
                            Array.from(this.state.listOfTopicName).map(item => (
                                <TopicLink link="#" topicName={item} permission={1}/>
                            ))
                        }
                    </div>
                    <div className="desc-teacher">
                        <Description data={this.state.description} />
                        <TeacherList />
                    </div>
                </div>
                <button onClick={this.showAddModal}>Add Topic</button>
                    {
                        this.state.isAddModal && 
                        <AddTopic show={this.state.isAddModal}/>
                    }
            </div>
        )
    }
}

export default CoursePage;
