import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routing } from "./Routing";

const Navigation: React.FC<{}> = (): JSX.Element => (
    <Router>
        <>
            <Routing />
        </>
    </Router>
);

export default Navigation;
