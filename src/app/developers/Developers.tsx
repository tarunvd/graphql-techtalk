import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { DeveloperList } from "./DeveloperList";
import { CreateDeveloper } from "./CreateDeveloper";
import { UpdateDeveloper } from "./UpdateDeveloper";

const Developers: React.FunctionComponent = () => (
    <Router>
        <Route path="/add" component={CreateDeveloper} />
        <Route exact path="/" component={DeveloperList} />
        <Route path="/update" component={UpdateDeveloper} />
    </Router>
);

export { Developers };
