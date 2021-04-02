// import {Button, Icon, Modal, Popconfirm} from 'antd';
// import Table, {ColumnProps, PaginationConfig, TableProps} from 'antd/lib/table';
// import * as _ from 'lodash';
// import React, {ReactNode, useState} from "react";
// import {useHistory} from 'react-router';
// import {RouteMode} from '../Navigation/paths';
// import {TableEmptyData} from '../TableEmptyData/TableEmptyData';
// import {IdentifiableDTO} from "../../../types/rest";
// import {FormattedMessage, IntlShape, useIntl} from 'react-intl';
// import {History} from 'history';
// import {FaMinus, FaPlus} from 'react-icons/fa';
// import {MdDeleteSweep, MdPlaylistAdd} from 'react-icons/md';
// import { useModal, UseModal } from '../../hooks/useModal';
// import { BlockForm } from '../BlockForm/BlockForm';
// import moment from 'moment';

// export interface AjaxColumnProps<T> extends ColumnProps<T> {
//     key: string;
//     title: ReactNode;
//     dataIndex: keyof T & string | string;
// }

// interface BlockModal<T> {
//     extendsHeaderByKey: keyof T & string;
//     dateFromKey: keyof T & string;
//     dateToKey: keyof T & string;
//     handleSubmit: (values: T) => void;
//     handleUnblock: (values: T) => void;
// }

// export interface Select<T> {
//     type: 'add' | 'remove';
//     onIconClick: (record: T) => void;
//     onAllClick: () => void;
//     disabledGrupSwap?: boolean;
// }

// interface Props<T> extends TableProps<T> {
//     columns: AjaxColumnProps<T>[];
//     url?: string;
//     isAdd?: boolean;
//     pagination: PaginationConfig;
//     addScreenReadMessage?: string;
//     isPreview?: boolean;
//     isEdit?: boolean;
//     blockModal?: BlockModal<T>;
//     handleDelete?: (id: number | string) => void;
//     otherButtons?: (record: T) => any;
//     select?: Select<T>;
//     actionColumnWidth?: number;
// }

// const selectColumnWidth: number = 60;

// export function AjaxTable<T extends IdentifiableDTO>(props: Props<T>): JSX.Element {
//     const history: History = useHistory();
//     const intl: IntlShape = useIntl();
//     const {formatMessage} = intl;
//     const modal: UseModal = useModal();

//     const {total, size, pageSize} = props.pagination;
//     const {isAdd, dataSource, onChange, pagination, loading, url, blockModal} = props;
//     const {actionColumnWidth = 100} = props;
//     const columns: AjaxColumnProps<T>[] = (setColumns());
//     const [selectedBlockDTO, setSelectedBlockDTO] = useState<T>({} as T);
//     const [isFormChange, setIsFormChange] = useState<boolean>(false);

//     function isAnyActionExist(): boolean {
//         const {isPreview, isEdit, handleDelete, otherButtons} = props;
//         return !_.isNil(isPreview) || !_.isNil(isEdit) || !_.isNil(handleDelete) || !_.isNil(otherButtons) || !_.isNil(blockModal);
//     }

//     function isPaginationCanRender(): boolean {
//         return !_.isNil(total) && total > Number(size) || !_.isNil(total) && !_.isNil(pageSize) && total > pageSize;
//     }

//     function openBlockModal(values: T): void {
//         const dataFrom: string = `${blockModal!.dateFromKey}`;
//         const result: any = {...values};
//         if (result.hasOwnProperty(dataFrom) && _.isNil(result[dataFrom])) {
//             result[`${dataFrom}`] = moment();
//         }
//         setSelectedBlockDTO(result);
//         modal.show();
//     }

//     function closeBlockModal(): void {
//         setSelectedBlockDTO({} as T);
//         modal.hide();
//     }

//     function handleSubmitBlockModal(values: T): void {
//         if (!_.isNil(blockModal)) {
//             blockModal.handleSubmit(values);
//         }
//         closeBlockModal();
//     }

//     function handleDeblockBlockModal(values: T): void {
//         if (!_.isNil(blockModal)) {
//             blockModal.handleUnblock(values);
//         }
//         closeBlockModal();
//     }

//     function getSelectColumn(): AjaxColumnProps<T> {
//         const addType: boolean | undefined = props.select && props.select.type === 'add';
//         return {
//             dataIndex: '_select',
//             key: '_select',
//             render: (_text: any, record: T): ReactNode => {
//                 return (
//                     <>
//                         {props.select && (record.isSelected !== true || props.select.type === 'remove') &&
//                         <Button
//                             size='small'
//                             shape='circle'
//                             title={formatMessage({id: addType ? 'common.add.to.list' : 'common.remove.from.list'})}
//                             onClick={(): void => props.select!.onIconClick(record)}
//                         >
//                             <Icon component={(): JSX.Element => addType ? <FaPlus/> : <FaMinus/>}/>
//                         </Button>
//                         }
//                     </>
//                 );
//             },
//             title:
//                 <>
//                     {props.select && _.isNil(props.select.disabledGrupSwap) ?
//                         <Button
//                             type='default'
//                             shape='circle'
//                             size='small'
//                             title={formatMessage({id: addType ? 'common.add.current.page.to.list' : 'common.remove.all.from.list'})}
//                             onClick={(): void => props.select!.onAllClick()}
//                         >
//                             <Icon
//                                 component={(): JSX.Element => addType ? <MdPlaylistAdd/> : <MdDeleteSweep/>}
//                                 style={{fontSize: 22, padding: '0 2px'}}
//                             />
//                         </Button> :
//                         <></>
//                     }
//                 </>,
//             align: 'center',
//             width: selectColumnWidth,
//         }
//     }

//     function getActionColumns(): AjaxColumnProps<T> {
//         return {
//             align: 'center',
//             dataIndex: '_operation',
//             key: '_operation',
//             render: (_text: any, record: T): ReactNode => {
//                 return (
//                     <span>
//                         {props.isPreview &&
//                         <Button
//                             size='small'
//                             shape='circle'
//                             icon='search'
//                             title={formatMessage({id: 'common.preview'})}
//                             onClick={(): void => redirect(record.id, RouteMode.V)}
//                             style={{marginRight: 6}}
//                         />
//                         }
//                         {props.isEdit &&
//                         <Button
//                             size='small'
//                             shape='circle'
//                             icon='edit'
//                             title={formatMessage({id: 'ajax.table.edit.button.name'})}
//                             onClick={(): void => redirect(record.id, RouteMode.E)}
//                             style={{marginRight: 6}}
//                         />
//                         }
//                         {props.handleDelete &&
//                         <Popconfirm
//                             okText={formatMessage({id: 'ajax.table.delete.button.name'})}
//                             cancelText={formatMessage({id: 'ajax.table.cancel.button.name'})}
//                             okButtonProps={{type: 'danger'}}
//                             title={formatMessage({id: 'ajax.table.popconfirm.delete.name'})}
//                             onConfirm={(): void => props.handleDelete!(record.id)}
//                         >
//                             <Button
//                                 size='small'
//                                 shape='circle'
//                                 icon='delete'
//                                 title={formatMessage({id: 'ajax.table.delete.button.name'})}
//                                 className='button__icon--delete'
//                                 style={{marginRight: 6}}
//                             />
//                         </Popconfirm>
//                         }
//                         {!_.isNil(blockModal) &&
//                         <>
//                             <Button
//                                 size='small'
//                                 shape='circle'
//                                 icon='stop'
//                                 title={formatMessage({id: 'ajax.table.block.button.name'})}
//                                 onClick={(): void => openBlockModal(record)}
//                             />
//                         </>
//                         }
//                         {props.otherButtons !== undefined && props.otherButtons!(record)}
//                     </span>
//                 );
//             },
//             title: <span> <FormattedMessage id={`ajax.table.column.button.name`}/></span>,
//             width: actionColumnWidth,
//         };
//     }

//     function getColumnsWidth(): number | undefined {
//         const getWidth: any[] = columns.map((x: AjaxColumnProps<T>): number | string | undefined => x.width);
//         const widthExist: boolean = _.some(getWidth, (column: AjaxColumnProps<T>): boolean => !_.isNil(column));
//         if (widthExist) {
//             let setActionsColumnWidth: number = isAnyActionExist() ? actionColumnWidth : 0;
//             setActionsColumnWidth += !_.isNil(props.select) ? selectColumnWidth : 0;
//             return getWidth.reduce((prev: any, next: any[]): number => prev + next, setActionsColumnWidth);
//         }
//         return;
//     }

//     function redirect(id: number | string, mode: RouteMode): void {
//         history.push(`${url}${id}/${mode}`);
//     }

//     function setColumns(): AjaxColumnProps<T>[] {
//         const _columns: AjaxColumnProps<T>[] = [];
//         if (!_.isNil(props.select)) {
//             _columns.push(getSelectColumn())
//         }
//         if (isAnyActionExist()) {
//             _columns.push(getActionColumns());
//         }
//         return [..._columns, ...props.columns];
//     }
//     function renderBlockModal(): JSX.Element {
//         let extendsTitle: string = '';
//         if (!_.isNil(blockModal)) {
//             extendsTitle += `${selectedBlockDTO[blockModal.extendsHeaderByKey]}`;
//         }
//         return (
//             <Modal
//                 title={`${formatMessage({id: 'ajax.table.block.modal.title'})} ${extendsTitle}`.trim()}
//                 visible={modal.visible}
//                 onCancel={!isFormChange ? closeBlockModal : undefined}
//                 closable={!isFormChange}
//                 destroyOnClose
//                 footer={null}
//             >
//                 <BlockForm<T>
//                     formik={{
//                         initialValues: {...selectedBlockDTO},
//                     }}
//                     dateFromKey={blockModal!.dateFromKey}
//                     dateToKey={blockModal!.dateToKey}
//                     onSubmit={(values: T): void => handleSubmitBlockModal(values)}
//                     onDeblock={(values: T): void => handleDeblockBlockModal(values)}
//                     onCancel={closeBlockModal}
//                     formChange={{
//                         change: isFormChange,
//                         handleChange: setIsFormChange
//                     }}
//                 />
//             </Modal>
//         )
//     }

//     return (
//         <div>
//             {isAdd &&
//             <Button
//                 type='primary'
//                 onClick={(): void => redirect(-1, RouteMode.E)}
//                 style={{marginBottom: 12}}
//             >
//                 <Icon aria-label={null} aria-hidden={true} type='plus' style={{marginRight: 6}}/>
//                 <FormattedMessage id={`ajax.table.add.button.name`}/>
//             </Button>
//             }
//             <Table<T>
//                 rowKey={(record: T, index: number): string => !_.isNil(record.id) ? record.id.toString() : index.toString()}
//                 columns={columns}
//                 dataSource={dataSource}
//                 loading={loading}
//                 onChange={onChange}
//                 bordered={true}
//                 pagination={isPaginationCanRender() ? pagination : false}
//                 scroll={!_.isNil(props.scroll) ? props.scroll : {x: getColumnsWidth()}}
//                 locale={{
//                     emptyText: <TableEmptyData/>
//                 }}
//             />
//             {!_.isNil(props.blockModal) && renderBlockModal()}
//         </div>
//     );
// }
