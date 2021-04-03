import {Button, Popconfirm } from 'antd';
import Table, {ColumnProps, TableProps, TablePaginationConfig} from 'antd/lib/table';
import * as _ from 'lodash';
import React, {ReactNode} from "react";
import {useHistory} from 'react-router';;
import {FormattedMessage, IntlShape, useIntl} from 'react-intl';
import {History} from 'history';
import { IdentifiableDTO } from 'rest';
import { Icon } from '@ant-design/compatible';

export enum RouteMode { V = 'v', E = 'e', D = 'd' }

export interface AjaxColumnProps<T> extends ColumnProps<T> {
    key: string;
    title: ReactNode;
    dataIndex: keyof T & string | string;
}

interface Props<T> extends TableProps<T> {
    columns: AjaxColumnProps<T>[];
    url?: string;
    isAdd?: boolean;
    pagination: TablePaginationConfig;
    addScreenReadMessage?: string;
    isPreview?: boolean;
    isEdit?: boolean;
    handleDelete?: (id: number) => void;
    otherButtons?: (record: T) => any;
    actionColumnWidth?: number;
}

export function AjaxTable<T extends IdentifiableDTO>(props: Props<T>): JSX.Element {
    const history: History = useHistory();
    const intl: IntlShape = useIntl();
    const {formatMessage} = intl;

    const {total, size, pageSize} = props.pagination;
    const {isAdd, dataSource, onChange, pagination, loading, url} = props;
    const {actionColumnWidth = 100} = props;
    const columns: AjaxColumnProps<T>[] = (setColumns());

    function isAnyActionExist(): boolean {
        const {isPreview, isEdit, handleDelete, otherButtons} = props;
        return !_.isNil(isPreview) || !_.isNil(isEdit) || !_.isNil(handleDelete) || !_.isNil(otherButtons);
    }

    function isPaginationCanRender(): boolean {
        return !_.isNil(total) && total > Number(size) || !_.isNil(total) && !_.isNil(pageSize) && total > pageSize;
    }

    function getActionColumns(): AjaxColumnProps<T> {
        return {
            align: 'center',
            dataIndex: '_operation',
            key: '_operation',
            render: (_text: any, record: T): ReactNode => {
                return (
                    <span>
                        {props.isPreview &&
                        <Button
                            size='small'
                            shape='circle'
                            icon={<Icon type='search' />}
                            title={formatMessage({id: 'common.preview'})}
                            onClick={(): void => redirect(record.id, RouteMode.V)}
                            style={{marginRight: 6}}
                        />
                        }
                        {props.isEdit &&
                        <Button
                            size='small'
                            shape='circle'
                            icon={<Icon type='edit'/>}
                            title={formatMessage({id: 'common.edit'})}
                            onClick={(): void => redirect(record.id, RouteMode.E)}
                            style={{marginRight: 6}}
                        />
                        }
                        {props.handleDelete &&
                            <Popconfirm
                                okText={formatMessage({id: 'ajax.table.delete.button.name'})}
                                cancelText={formatMessage({id: 'ajax.table.cancel.button.name'})}
                                title={formatMessage({id: 'ajax.table.popconfirm.delete.name'})}
                                onConfirm={(): void => props.handleDelete!(record.id)}
                            >
                                <Button
                                    size='small'
                                    shape='circle'
                                    icon={<Icon type='delete' />}
                                    title={formatMessage({id: 'ajax.table.delete.button.name'})}
                                    className='button__icon--delete'
                                    style={{marginRight: 6}}
                                />
                            </Popconfirm>
                        }
                        {props.otherButtons !== undefined && props.otherButtons!(record)}
                    </span>
                );
            },
            title: <span> <FormattedMessage id={`ajax.table.column.action`}/></span>,
            width: actionColumnWidth,
        };
    }

    function getColumnsWidth(): number | undefined {
        const getWidth: any[] = columns.map((x: AjaxColumnProps<T>): number | string | undefined => x.width);
        const widthExist: boolean = _.some(getWidth, (column: AjaxColumnProps<T>): boolean => !_.isNil(column));
        if (widthExist) {
            const setActionsColumnWidth: number = isAnyActionExist() ? actionColumnWidth : 0;
            return getWidth.reduce((prev: any, next: any[]): number => prev + next, setActionsColumnWidth);
        }
        return;
    }

    function redirect(id: number | string, mode: RouteMode): void {
        history.push(`${url}${id}/${mode}`);
    }

    function setColumns(): AjaxColumnProps<T>[] {
        const _columns: AjaxColumnProps<T>[] = [];
        if (isAnyActionExist()) {
            _columns.push(getActionColumns());
        }
        return [..._columns, ...props.columns];
    }

    return (
        <div>
            {isAdd &&
                <Button
                    type='primary'
                    onClick={(): void => redirect(-1, RouteMode.E)}
                    style={{marginBottom: 12}}
                >
                    <Icon type='plus' />
                    <FormattedMessage id={`ajax.table.add.button`}/>
                </Button>
            }
            <Table<T>
                rowKey={(record: T): number => record.id}
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                onChange={onChange}
                bordered={true}
                pagination={isPaginationCanRender() ? pagination : false}
                scroll={!_.isNil(props.scroll) ? props.scroll : {x: getColumnsWidth()}}
            />
        </div>
    );
}
