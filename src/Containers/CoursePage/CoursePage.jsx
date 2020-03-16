import React from 'react';
import Description from '../../Components/Description/Description';
import TeacherList from '../../Components/TeacherList/TeacherList';
import TopicLink from '../../Components/TopicLink/TopicLink';

import './CoursePage.css';

class CoursePage extends React.Component {
    constructor(props) {
        super()
        this.state = {
            permission: props.permission,
            id: props.courseId,
            name: 'Object Oriented Programming',
            code: 'IF2110',
            description: 'Deskripsi',
            listOfTopicId: ['1', '2', '3']   
        }
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
                        <TopicLink link="#" topicName="Basic OOP Concept" />
                        <TopicLink link="#" topicName="Inheritance" />
                    </div>
                    <div className="desc-teacher">
                        <Description data={this.state.description} />
                        <TeacherList />
                    </div>
                </div>
            </div>
        )
    }
}

export default CoursePage;
