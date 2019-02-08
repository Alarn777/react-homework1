import React from 'react'
import {Route} from 'react-router-dom'
import ChangeAthleteCountry from '../Components/ChangeAthleteCountry';
import MyIdeas from '../Components/MyIdeas'
import Header from '../Components/Header'
import AthletesList from '../Components/AthletesList'
import AthletesByAgeAndCountry from '../Components/AthletsByAgeAndCountry'
const ReactRouter = () => {
    return(
        <React.Fragment>
            <Header/>
            <Route exact path="/" component={AthletesList}/>
            <Route path="/ChangeAthleteCountry" component={ChangeAthleteCountry}/>
            <Route path="/AthletesByAgeAndCountry" component={AthletesByAgeAndCountry}/>

        </React.Fragment>




    )
};
export default ReactRouter;