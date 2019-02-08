import React, { Component } from 'react'

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ' ',
            email: ' '
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();
        const form = {
            name: this.state.name,
            email: this.state.email
        };

        console.log(form);


        {/* -----------you would send data to API to get results, I used database for ease, this also clears the form on submit----------------*/}
        // database.push(form);
        this.setState({
            name: '',
            email: ''
        })
    };

    render() {

        //     <form onSubmit={this.handleSubmit} style={{marginLeft : "1%",marginRight : "1%"}}>
        //         <div className="form-group">
        //             <label htmlFor="formGroupExampleInput">Country Code</label>
        //             <input type="text" name="countryCode" className="form-control" value={this.state.countryCode} onChange={this.handleChange} id="formGroupExampleInput" placeholder="Country Code" />
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="formGroupExampleInput2">Age</label>
        //             <input type="text" name="age" className="form-control" value={this.state.age} onChange={this.handleChange} id="formGroupExampleInput2" placeholder="Age" />
        //         </div>
        //         <button type="submit" value="submit" className="btn btn-primary">Submit</button>
        //     </form>


        return (
            <div>
                <form style={{marginLeft : "1%",marginRight : "1%"}}>
                    <div className="form-group">
                    <label>
                        Country Code:
                        <input className="form-control"
                            name='name'
                            value={this.state.name}
                            onChange={e => this.handleChange(e)}/>
                    </label>
                    </div>
                    <div className="form-group">
                    <label>
                        Age:
                        <input
                            className="form-control"
                            name='email'
                            value={this.state.email}
                            onChange={e => this.handleChange(e)}/>
                    </label>
                    </div>
                    <button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Send</button>
                </form>
            </div>
        );
    }
}

export default Form;