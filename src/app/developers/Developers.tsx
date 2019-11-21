import * as React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import { DeveloperList } from "./DeveloperList";
import { CreateDeveloper } from "./CreateDeveloper";

interface DevelopersProps {}

const Developers: React.FunctionComponent<DevelopersProps> = ({}) => (

    <Router>
        <Route path="/add" component={CreateDeveloper} />
        <Route exact path="/" component={DeveloperList} />
    </Router>
);

export { Developers };
