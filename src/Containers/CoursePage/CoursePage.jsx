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
                <h1>{this.state.name}</h1>
                <h3>{this.state.code}</h3>
                <Description data={this.state.description} />
                <TeacherList />
                <TopicLink link="#" topicName="Basic OOP Concept" />
                <TopicLink link="#" topicName="Inheritance" />
            </div>
        )
    }
}

export default CoursePage;
