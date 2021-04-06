import * as React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Routing } from "./Routing";

const Navigation: React.FC<{}> = (): JSX.Element => (
    <Router>
        <div style={{maxWidth: 1600, margin: '0 auto', padding: '40px 30px'}}>
            <Routing />
        </div>
    </Router>
);

export default Navigation;
