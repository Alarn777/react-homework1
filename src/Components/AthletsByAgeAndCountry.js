import React, { Component } from 'react'
import Athlete from './Athlete'

class AthletesByAgeAndCountry extends Component {
    constructor(props) {
        super(props);
        // this.state = { athletes: [] };
        this.state = {
            athletes: [],
            countryCode: '',
            age: '',
            submit: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.eachAthlete = this.eachAthlete.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.nextID = this.nextID.bind(this)

    }


    fetchAthlete(){
        const url = 'https://athletes-manage.herokuapp.com/athletes/'+ this.state.age + '/' + this.state.countryCode;

        fetch(url, {mode: 'cors'})
            .then(res => res.json())
            .then(data => data.map(item =>
                this.add({id: item.id, firstName: item.firstName, lastName: item.lestName, age: item.age, countryCode: item.countryCode, sportTypes : item.sportTypes})))

            .catch(err => console.error(err));

        this.setState({
            submit: false
        })
    }

    componentDidMount() {

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


    add({id = null,lastName = "test",firstName = "test",age,countryCode,sportTypes}) {

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
        console.log(array);



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

                        index={ item.id }
                        onChange={ this.update }
                        onDelete={ this.delete }
                    >

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


    eraseAll = (e) =>{
        this.setState({
            athletes: [],
            countryCode: '',
            age: '',
            submit: false
        })
    };


    handleChange = (e) => {
    };

    handleChangeCountryCode = (e) => {
        this.setState({
            countryCode: e.target.value
        })
    };

    handleChangeAge = (e) => {
        this.setState({
            age: e.target.value
        })
    };


    onSubmit = (e) => {
        e.preventDefault();
       
        let a = this.state.countryCode;
        let b = this.state.age;
        console.log(a);
        console.log(b);

        if(!isNaN(b) && a.length === 2)
            this.fetchAthlete();        //find the athlete with input parameters

        this.setState({
            countryCode: a,
            age: b,
            submit: true

        })
    };

    render() {
        if (this.state.submit === true) {
            return (
                <div className="AthletesList">
                    <h1 className="title-centered" >Get Athletes By Age And Country</h1>
                    {
                        this.state.athletes.map(this.eachAthlete)
                    }
                    <button className="btn btn-primary" onClick={(e) => this.eraseAll(e)} style={{ marginLeft: '3%',marginTop: '1%'}}>Search Again</button>

                </div>
            );
        } else {
            return (
                <div>
                    <h1 style={{marginLeft: "1%", marginRight: "1%"}} >Get Athletes By Age And Country</h1>
                    <form style={{marginLeft: "1%", marginRight: "1%"}}>
                        <div className="form-group">
                            <label>
                                Country Code:
                                <input className="form-control"
                                       name='name'
                                       value={this.state.countryCode}
                                       onChange={e => this.handleChangeCountryCode(e)}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                Age:
                                <input
                                    className="form-control"
                                    name='email'
                                    value={this.state.age}
                                    onChange={e => this.handleChangeAge(e)}/>
                            </label>
                        </div>
                        <button className="btn btn-primary" onClick={(e) => this.onSubmit(e)}>Send</button>
                    </form>
                </div>
            );
        }




    }
}

export default AthletesByAgeAndCountry;