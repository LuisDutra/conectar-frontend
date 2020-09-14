import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp'
import ProfileFeatures from './pages/ProfileFeatures'
import ExperienceAreas from './pages/ExperienceAreas';
import MasteryTools from './pages/MasteryTools';
import CreateProject from './pages/CreateProject';


function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/profilefeatures" component={ProfileFeatures} />
      <Route path="/experienceareas" component={ ExperienceAreas} />
      <Route path="/masterytools" component={ MasteryTools} />
      <Route path="/createproject" component={ CreateProject} />
    </BrowserRouter>
  )

}
export default Routes;