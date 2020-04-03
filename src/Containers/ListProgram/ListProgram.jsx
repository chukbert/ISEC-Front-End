import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import ProgramLink from '../../Components/ProgramLink/ProgramLink';

// import './ProgramPage.css';
import { Button } from 'react-bootstrap';

class ListProgram extends React.Component {
    constructor(props) {
        super()
        this.state = {
            permission: 0,
            listOfPrograms: [],
        }

        this.clearArray = this.clearArray.bind(this);
        this.checkToken = this.checkToken.bind(this);
        this.parseResult = this.parseResult.bind(this);
    }

    clearArray() {
        this.setState({ 
            listOfPrograms: [],
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

    parseResult(res) {
        for (var i = 0; i < res.length; i++){
            var programId = res[i]._id;
            var name = res[i].name;
            var description = res[i].description;
            var status = res[i].__v;
            this.state.listOfPrograms.push({"id": programId, "name": name, "description":description, "status": status});
            this.setState({
                listOfPrograms: this.state.listOfPrograms,
            })
        }
    }

    componentDidMount() {
        this.checkToken();
        this.clearArray();

        const api = process.env.REACT_APP_API_HOST + '/programs';
        axios.get(api, {
            headers: {
                "Authorization": `${Cookies.get('token')}`
            }
        }).then(res => {
            this.parseResult(res.data.data);            
        })
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