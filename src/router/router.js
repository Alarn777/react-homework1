import React from 'react'
import {Route} from 'react-router-dom'
import IdeaList from '../Components/IdeaList';
import MyIdeas from '../Components/MyIdeas'
import Header from '../Components/Header'
import AthletesList from '../Components/AthletesList'

const ReactRouter = () => {
    return(
        <React.Fragment>
            <Header/>
            <Route exact path="/" component={IdeaList}/>
            <Route path="/MyIdeas" component={MyIdeas}/>
            <Route path="/Athletes" component={AthletesList}/>
        </React.Fragment>




    )
};
export default ReactRouter;