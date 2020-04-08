import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import ProgramLink from '../../Components/ProgramLink/ProgramLink';
import './ListEnrolledProgram.css'

// import './ProgramPage.css';

class ListEnrolledProgram extends React.Component {
    constructor(props) {
        super()
        this.state = {
            permission: 0,
            listProgramId: [],
            listOfEnrolledPrograms: [],
        }

        this.clearArray = this.clearArray.bind(this);
        this.checkToken = this.checkToken.bind(this);
        this.parsePrograms = this.parsePrograms.bind(this);
    }

    clearArray() {
        this.setState({ 
            listProgramId: [],
            listOfEnrolledPrograms: [],
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

    parsePrograms(id) {
        for (var i = 0; i < id.length; i++){
            const api = process.env.REACT_APP_API_HOST + '/enrollprograms/' + id[i];
            axios.get(api, {
                headers: {
                    "Authorization": `${Cookies.get('token')}`
                }
            }).then(res => {
                var programId = res.data.data.program_id._id;
                var name = res.data.data.program_id.name;
                var description = res.data.data.program_id.description;
                this.state.listOfEnrolledPrograms.push({"id": programId, "name": name, "description":description});
                this.setState({
                    listOfEnrolledPrograms: this.state.listOfEnrolledPrograms,
                })
            })
        }
    }

    componentDidMount() {
        this.checkToken();
        this.clearArray();

        const api = process.env.REACT_APP_API_HOST + '/enrollprograms';
        axios.get(api, {
            headers: {
                "Authorization": `${Cookies.get('token')}`
            }
        }).then(res => {
            for (var i = 0; i < res.data.data.length; i++) {
                this.state.listProgramId.push(res.data.data[i].program_id);
            }
            this.parsePrograms(this.state.listProgramId);
        })
    }

    render() {
        return (
            <div className="program-page">
                <div className="program-title">
                    <h1>My Programs</h1>
                </div>


                <div className="course-list">
                    {
                        Array.from(this.state.listOfEnrolledPrograms).map(item => (
                            <ProgramLink id = {item.id}
                                         name = {item.name}
                                         description = {item.description}
                                         status = {item.status}
                            />
                        ))
                    }
                </div>

                {/* {(this.state.permission === 2) &&
                <div className="add-program-button">
                    <Button variant="primary" onClick={this.showAddCourse}>Add Program</Button>
                    {
                        this.state.isAddCourse &&
                        <AddCourse show={this.state.isAddCourse} onHide={this.hideAddCourse}/>
                    }
                </div>
                } */}
            </div>
        )
    }
}

export default ListEnrolledProgram;