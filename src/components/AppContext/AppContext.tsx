import * as _ from 'lodash';
import React, { useState, useEffect } from "react";
import { JobDTO } from 'rest';

export interface AppContext {
    jobs: JobDTO[];
    setJobs: (jobs: JobDTO[]) => void;
}

const localeStorageJobsKey: 'LS_JOBS' = 'LS_JOBS'
const getJobsStringify: string | null = localStorage.getItem(localeStorageJobsKey) as string | null;
const defaultJobs: JobDTO[] = _.isNil(getJobsStringify) ? [] : JSON.parse(getJobsStringify);

export const Context: React.Context<AppContext> = React.createContext({} as AppContext);

interface Props {
    children: React.ReactNode;
}



export const AppContextWrapper: React.FC<Props> = ({ children }: Props): JSX.Element => {
    const [jobs, setJobs] = useState<JobDTO[]>(defaultJobs);
    const contextValues: AppContext = {
        jobs,
        setJobs
    };

    useEffect((): void => {
        localStorage.setItem(localeStorageJobsKey, JSON.stringify(jobs));
    }, [jobs]);

    return (
        <Context.Provider value={contextValues}>
            {children}
        </Context.Provider>
    );
};
