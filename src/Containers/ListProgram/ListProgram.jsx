import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import ProgramLink from '../../Components/ProgramLink/ProgramLink';

// import './ProgramPage.css';

class ListProgram extends React.Component {
    constructor(props) {
        super()
        this.state = {
            permission: 0,
            listOfEnrolledPrograms: [],
            listOfPrograms: [],
        }

        this.checkToken = this.checkToken.bind(this);
        this.getAllEnrolledPrograms = this.getAllEnrolledPrograms.bind(this);
        this.parseResult = this.parseResult.bind(this);
        this.getPrograms = this.getPrograms.bind(this);
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
        return;
    }

    getAllEnrolledPrograms = async () => {
        const api = process.env.REACT_APP_API_HOST + '/enrollprograms';
        await axios.get(api, {
            headers: {
                "Authorization": `${Cookies.get('token')}`
            }
        }).then(res => {
            for (var i = 0; i < res.data.data.length; i++) {
                var programId = res.data.data[i].program_id;
                let status = res.data.data[i].status_program;

                this.state.listOfEnrolledPrograms.push({"id": programId, "status": status});
                this.setState({
                    listOfEnrolledPrograms: this.state.listOfEnrolledPrograms,
                })
            }
        })
        return;
    }

    checkProgramStatus(programId) {
        var status = 0;
        this.state.listOfEnrolledPrograms.forEach(item => {
            if (item.id === programId) {
                status = item.status;
            }
        });
        return status;
    }

    parseResult(res) {
        for (var i = 0; i < res.length; i++){
            var programId = res[i]._id;
            var name = res[i].name;
            var description = res[i].description;
            var status = this.checkProgramStatus(programId);
            this.state.listOfPrograms.push({"id": programId, "name": name, "description":description, "status": status});
            this.setState({
                listOfPrograms: this.state.listOfPrograms,
            })
        }
    }

    async getPrograms(){
        await this.checkToken();
        await this.getAllEnrolledPrograms();

        const api = process.env.REACT_APP_API_HOST + '/programs';
        axios.get(api, {
            headers: {
                "Authorization": `${Cookies.get('token')}`
            }
        }).then(res => {
            this.parseResult(res.data.data);            
        })
    }

    componentDidMount() {
        this.getPrograms();
    }

    render() {
        return (
            <div className="program-page">
                <div className="program-title">
                    <h1>Programs</h1>
                </div>


                <div className="course-list">
                    {
                        Array.from(this.state.listOfPrograms).map(item => (
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

export default ListProgram;