import * as React from "react";
import { AjaxTable } from '../../components/AjaxTable/AjaxTable';
import { getJobColumns } from './jobsList.columns';
import { JobDTO } from 'rest';
import { jobs } from './jobs.data';
import * as paths from '../../components/Navigation/pahts';

export const JobsList: React.FC<{}> = (): JSX.Element => {
    return (
        <>
            <AjaxTable<JobDTO>
                isAdd
                url={paths.job}
                dataSource={jobs}
                columns={getJobColumns()}
                pagination={{}}
            />
        </>
    )
}
