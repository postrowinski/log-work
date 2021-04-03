import React, { useContext } from "react";
import { AjaxTable } from '../../components/AjaxTable/AjaxTable';
import { getJobColumns } from './jobsList.columns';
import { JobDTO } from 'rest';
import * as paths from '../../components/Navigation/pahts';
import { Context } from '../../components/AppContext/AppContext';

export const JobsList: React.FC<{}> = (): JSX.Element => {
    const { jobs } = useContext(Context);
    return (
        <>
            <AjaxTable<JobDTO>
                isAdd
                isEdit
                isPreview
                actionColumnWidth={160}
                handleDelete={(id: number): void => {console.log(id)}}
                url={paths.jobUrl}
                dataSource={jobs}
                columns={getJobColumns()}
                pagination={{}}
            />
        </>
    )
}
