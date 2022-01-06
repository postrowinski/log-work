import React, { useContext } from "react";
import { AjaxTable } from '../../components/AjaxTable/AjaxTable';
import { getJobColumns } from './jobsList.columns';
import { JobDTO } from 'rest';
import * as paths from '../../components/Navigation/pahts';
import { Context } from '../../components/AppContext/AppContext';
import _ from 'lodash';
import { useIntl } from 'react-intl';

export const JobsList: React.FC<{}> = (): JSX.Element => {
    const { jobs, setJobs } = useContext(Context);
    const { formatMessage } = useIntl();

    function removeRecord(id: number): void {
        const newJobs: JobDTO[] = _.remove(jobs, (j: JobDTO): boolean => {
            return j.id !== id;
        });
        setJobs(newJobs);
    }

    function sumJobsWithAnswer(): number {
        const jobsWithAnswer: JobDTO[] =  jobs.filter((job: JobDTO): boolean | undefined => {
            return job.businessResponse
        });
        return jobsWithAnswer.length;
    }

    function renderJobsInfo(): JSX.Element {
        return (
            <div>
                <div>{formatMessage({id: 'job.label.total'}, {total: jobs.length})}</div>
                <div>{formatMessage({id: 'job.label.total.answer'}, {total: sumJobsWithAnswer()})}</div>
            </div>
        )
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
                dataSource={_.orderBy(jobs, ['id'], ['desc'])}
                columns={getJobColumns()}
                pagination={{
                    pageSize: 10,
                    total: jobs.length,
                    position: ['bottomCenter']
                }}
                elementOnTopTable={renderJobsInfo}
            />
        </>
    )
}
