import React, { Component } from 'react'
import Athlete from './Athlete'
import { MdAdd } from 'react-icons/md'

class ChangeAthleteCountry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            athletes: [],
            countryCode: '',
            id: '',
            responseText: '',
            submit: false,
            styleResponse:{
                color : "green",
                marginLeft: "3%"
            }
        };


        this.handleChange = this.handleChange.bind(this);
        this.eachAthlete = this.eachAthlete.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.nextID = this.nextID.bind(this)

    }

    componentDidMount() {
        const url = 'https://athletes-manage.herokuapp.com/athletes';
        fetch(url, {mode: 'cors'})
            .then(res => res.json())
            .then(data => data.map(item =>
                this.add({id: item.id, firstName: item.firstName, lastName: item.lestName, age: item.age, countryCode: item.countryCode, sportTypes : item.sportTypes})))

            .catch(err => console.error(err));
    }

    componentWillMount(){
        // this.map(item => this.add({id: item.id, firstName: item.firstName, lestName: item.lestName, age: item.age, countryCode: item.countryCode}))
    }

    update(newAthlet, i){
        this.setState(prevState => ({
            athletes: prevState.athletes.map(data => data.id !== i ? data : { ...data, idea: newAthlet })
        }))
    }

    delete(id) {
        console.log(`deleted: ${id}`);
        this.setState(prevState => ({
            athletes: prevState.athletes.filter(idea => idea.id !== id)
        }))
    }

    // destructor + default values
    add({id = null,lastName = "test",firstName = "test",age,countryCode,sportTypes}) {
        // console.log(id,lastName,firstName);
        let i = 0;
        let array = [];
        for (i = 0;i < sportTypes.length;i++)
        {
            array.push("Type of sport: " + sportTypes[i].type);
            array.push(" Year started: "+ sportTypes[i].startYear);
            array.push(" Times won: " + sportTypes[i].victoryNum);
            if(i !== sportTypes.length-1)
                array.push(" | ");

        }
        // console.log(array);



        this.setState(prevState => ({
            athletes: [
                ...prevState.athletes, {
                    id: id !== null ? id : this.nextID(prevState.athletes),
                    lastName: lastName,
                    firstName: firstName,
                    age:age,
                    countryCode: countryCode,
                    sportTypes: array
                }]
        }))
    }

    // default values + Array.reduce
    nextID(ideas = []) {
        let max = ideas.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id , 0);
        return ++max
    }

    jsUcfirst(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    eachAthlete(item, i) {
        return (
            <div
                key={ `container${item.id}` }
                className="card"
                style={ { width: '33%', marginBottom: '7px', marginLeft: '3%',marginTop: '7px'} }
            >
                <div className="card-body">
                    <Athlete
                        // NOTE: No need this key here! read more: https://reactjs.org/docs/lists-and-keys.html#keys
                        // key={ `idea${item.id}` }
                        index={ item.id }
                        onChange={ this.update }
                        onDelete={ this.delete }
                    >
                        {/*{ console.log(item) }*/}
                        <h5 className="card-title">{ "Full name: " + this.jsUcfirst(item.firstName) +" " + this.jsUcfirst(item.lastName)}</h5>
                        <p className="card-text">{ "id: " + item.id }</p>
                        <p className="card-text">{ "age: " + item.age }</p>
                        <p className="card-text">{ "country: " + item.countryCode }</p>
                        <p className="card-text">{ "sportTypes: " + item.sportTypes }</p>
                    </Athlete>
                </div>
            </div>
        );
    }

    fetchAthlete(){
        // https://athletes-manage.herokuapp.com/athletecountry
        // {
        //     "id": 215221,
        //     "countryCode": "hk"
        // }

        // const url = 'https://athletes-manage.herokuapp.com/athletes/'+ this.state.age + '/' + this.state.countryCode;
        // let a = url.trim();
        // console.log(a);


        fetch('https://athletes-manage.herokuapp.com/athletecountry', {
            method: 'POST',
            mode: 'cors',            //added
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id,
                countryCode: this.state.countryCode,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                if(responseJson.error){
                    this.setState({
                        text: responseJson.error,
                        styleResponse : {
                            color : "red",
                            marginLeft: "3%"
                        }
                    });
                }
                else{
                    this.setState({
                        text: responseJson,
                        styleResponse : {
                            color : "green",
                            marginLeft: "3%"
                        }
                    });
                }

                //force reload all athletes to show changes
                this.setState({
                    athletes: [],
                    countryCode: '',
                    id: ''
                });
                const url = 'https://athletes-manage.herokuapp.com/athletes';
                fetch(url, {mode: 'cors'})
                    .then(res => res.json())
                    .then(data => data.map(item =>
                        this.add({id: item.id, firstName: item.firstName, lastName: item.lestName, age: item.age, countryCode: item.countryCode, sportTypes : item.sportTypes})))

                    .catch(err => console.error(err));
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    text: "error in update"
                });
            });
    }



    handleChange = (e) => {
    };

    handleChangeId = (e) => {
        this.setState({
            id: e.target.value
        })
    };


    handleChangeCountryCode = (e) => {
        this.setState({
            countryCode: e.target.value
        })
    };


    onSubmit = (e) => {
        e.preventDefault();
        const form = {
            countryCode: this.state.countryCode,
            id: this.state.id,
        };

        let a = this.state.countryCode;
        let b = this.state.id;
        console.log(a);
        console.log(b);

        if((!isNaN(b) || !isNaN(a)) && a.length === 2)
            this.fetchAthlete();        //find the athlete with input parameters
        else{
            this.setState({
                text: "Please input parameters",
                styleResponse : {
                    color : "red",
                    marginLeft: "3%"
                }
            });
        }
        this.setState({
            countryCode: a,
            id: b,
            submit: true

        })
    };




    render() {
        return (
            <div className="AthletesList">
                <h1 className="title-centered" >Change Athlete's Country</h1>
                <form style={{marginLeft: "3%", marginRight: "3%"}}>
                    <div className="form-group">
                        <label>
                            Athlete ID:
                            <input className="form-control"
                                   name='name'
                                   value={this.state.id}
                                   onChange={e => this.handleChangeId(e)}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            New Country Code:
                            <input
                                className="form-control"
                                name='email'
                                value={this.state.countryCode}
                                onChange={e => this.handleChangeCountryCode(e)}/>
                        </label>
                    </div>
                    <button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Send</button>
                </form>
                <h4 style={this.state.styleResponse}>{this.state.text}</h4>
                <h1 style={{marginLeft: '3%'}}>All Athletes</h1>
                { this.state.athletes.map(this.eachAthlete) }
            </div>
        );
    }
}

export default ChangeAthleteCountry;