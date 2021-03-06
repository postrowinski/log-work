import * as React from "react";
import { Route } from 'react-router';
import { JobsList } from "../../pages/Jobs/JobsList";
import * as paths from '../Navigation/pahts';
import { Home } from '../../pages/Home/Home';
import { JobForm } from '../../pages/Jobs/job.form';
import { CacheManagement } from '../../pages/CacheManagement/CacheManagement';

export const Routing: React.FC<{}> = (): JSX.Element => (
    <>
        <Route exact path={paths.home} component={Home} />
        <Route path={paths.jobsList} component={JobsList} />
        <Route path={paths.jobParams} component={JobForm} />
        <Route path={paths.cacheManagement} component={CacheManagement} />
    </>
);