import React, { Component } from 'react'
import Athlete from './Athlete'
import { MdAdd } from 'react-icons/md'
// import data from '../data/data.json'

class AthletesList extends Component {
    constructor(props) {
        super(props);
        this.state = { athletes: [] };
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
                this.add({
                    id: item.id, 
                    firstName: item.firstName, 
                    lastName: item.lastName, 
                    age: item.age, 
                    countryCode: item.countryCode, 
                    sportTypes : item.sportTypes
                })))
            .catch(err => console.error(err));
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

    // default values + Array.reduce
    nextID(ideas = []) {
        let max = ideas.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id , 0);
        return ++max
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
                        { console.log(item) }
                        <h5 className="card-title">{ "Full name: " + item.firstName +" " + item.lastName}</h5>
                        <p className="card-text">{ "id: " + item.id }</p>
                        <p className="card-text">{ "age: " + item.age }</p>
                        <p className="card-text">{ "country: " + item.countryCode }</p>
                        <p className="card-text">{ "sportTypes: " + item.sportTypes }</p>
                    </Athlete>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="AthletesList">
                { this.state.athletes.map(this.eachAthlete) }
                <button
                    id="add"
                    onClick={ this.add }
                    className="btn btn-primary"
                    style={ { marginRight: '7px' } }
                >
                    <MdAdd />
                </button>
            </div>
        );
    }
}

export default AthletesList;