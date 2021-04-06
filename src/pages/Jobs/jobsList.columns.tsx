import React, { ReactNode } from 'react';
import { ColumnProps } from 'rc-table/lib/sugar/Column';
import { JobDTO } from 'rest';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { Icon } from '@ant-design/compatible';
import _ from 'lodash';

export interface JobsColumn extends ColumnProps<JobDTO> {
    key: keyof JobDTO;
    title: ReactNode;
    dataIndex: keyof JobDTO;
    width: number;
}

export function getJobColumns(): JobsColumn[] {
    const { formatMessage } = useIntl();
    return [
        {
            dataIndex: 'business',
            key: 'business',
            title: formatMessage({id: 'job.label.business'}),
            width: 200
        },
        {
            dataIndex: 'registrationDate',
            key: 'registrationDate',
            render: (value: moment.Moment): JSX.Element => {
                return (
                    <>
                        {moment(value).format('YYYY-MM-DD')}
                    </>
                );
            },
            title: formatMessage({id: 'job.label.registrationDate'}),
            width: 200
        },
        {
            dataIndex: 'fork',
            key: 'fork',
            // @ts-ignore
            render: (value: any, record: JobDTO): JSX.Element => {
                const {forkMax, forkMin} = record;
                if (_.isNil(forkMin) && _.isNil(forkMax)) {
                    return <></>;
                }
                return (
                    <>
                        {forkMin} - {forkMax}
                    </>
                )
            },
            title: formatMessage({id: 'job.label.fork'}),
            width: 200
        } as any,
        {
            dataIndex: 'yourRate',
            key: 'yourRate',
            title: formatMessage({id: 'job.label.yourRate'}),
            width: 200
        },
        {
            dataIndex: 'description',
            key: 'description',
            title: formatMessage({id: 'job.label.description'}),
            width: 200
        },
        {
            dataIndex: 'businessResponse',
            key: 'businessResponse',
            render: (value: boolean): JSX.Element => {
                return (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        {value ? <Icon type="check" style={{color: 'green'}} /> : <Icon type="close" style={{color: 'red'}} />}
                    </div>
                );
            },
            title: formatMessage({id: 'job.label.businessResponse'}),
            width: 200
        },
    ];
}