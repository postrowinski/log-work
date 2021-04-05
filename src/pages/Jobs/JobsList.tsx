import React, { useContext } from "react";
import { AjaxTable } from '../../components/AjaxTable/AjaxTable';
import { getJobColumns } from './jobsList.columns';
import { JobDTO } from 'rest';
import * as paths from '../../components/Navigation/pahts';
import { Context } from '../../components/AppContext/AppContext';
import _ from 'lodash';

export const JobsList: React.FC<{}> = (): JSX.Element => {
    const { jobs, setJobs } = useContext(Context);

    function removeRecord(id: number): void {
        const newJobs: JobDTO[] = _.remove(jobs, (j: JobDTO): boolean => {
            return j.id !== id;
        });
        setJobs(newJobs);
    }

    return (
        <>
            <AjaxTable<JobDTO>
                isAdd
                isEdit
                isPreview
                actionColumnWidth={160}
                handleDelete={removeRecord}
                url={paths.jobUrl}
                dataSource={jobs}
                columns={getJobColumns()}
                pagination={{
                    pageSize: 10,
                    total: jobs.length,
                    position: ['bottomCenter']
                }}
            />
        </>
    )
}
