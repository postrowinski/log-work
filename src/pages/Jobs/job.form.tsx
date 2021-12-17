import React, { useState, useContext, useEffect } from 'react';
import { useFormik, FormikProps } from 'formik';
import { Button, Form, Input, Row, Col, DatePicker, InputNumber } from 'antd';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import * as paths from '../../components/Navigation/pahts';
import * as Yup from 'yup';
import * as _ from 'lodash';
import { useIntl } from 'react-intl';
import { JobDTO } from 'rest';
import moment from 'moment';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { Context } from '../../components/AppContext/AppContext';
import { useParams } from 'react-router-dom';
import { RouteMode } from '../../components/AjaxTable/AjaxTable';

const { useForm } = Form;
const { TextArea } = Input;

const gutter: number = 16;

export const JobForm: React.FC<{}> = (): JSX.Element => {
    useForm();
    const { formatMessage } = useIntl();
    const history: History = useHistory();
    const { id, mode } = useParams();
    const { jobs, setJobs } = useContext(Context);
    const [initialValues, setInitialValues] = useState<JobDTO>({} as JobDTO);
    const formik: FormikProps<JobDTO> = useFormik<JobDTO>({
        enableReinitialize: true,
        validateOnBlur: false,
        validateOnChange: false,
        initialValues,
        validationSchema: Yup.object().shape({
            business: Yup.string().nullable().required(formatMessage({id: 'form.validation.required'})),
            address: Yup.string().nullable().required(formatMessage({id: 'form.validation.required'}))
        }),
        onSubmit: (values: JobDTO): void => onSubmit(values)
    });

    const isEditMode: boolean = mode === RouteMode.E;
    const isNew: boolean = id === '-1';

    useEffect((): void => {
        if (!isNew) {
            const job: JobDTO | undefined = findJob();
            if (!_.isNil(job)) {
                setInitialValues(job);
            }
        } else {
            setInitialValues({
                registrationDate: moment()
            } as JobDTO)
        }
    }, []);

    function findJob(): JobDTO | undefined {
        return _.find(jobs, (_job: JobDTO): boolean => _job.id.toString() === id);
    }

    function setNextId(): number {
        if (jobs.length === 0) {
            return 1;
        }
        const ids: number[] = jobs.map((_job: JobDTO): number => {
            return _job.id;
        });
        const nextIncreametId: number | undefined = _.max(ids);
        return !_.isNil(nextIncreametId) ? nextIncreametId + 1 : 1;
    }

    function onSubmit(values: JobDTO): void {
        if (isNew) {
            setJobs(
                [
                    {
                        ...values,
                        id: setNextId()
                    },
                    ...jobs
                ]
            );
        } else {
            const job: JobDTO | undefined = findJob();
            if (!_.isNil(job)) {
                const newJobs: JobDTO[] = _.remove(jobs, (j: JobDTO): boolean => {
                    return j.id.toString() !== id;
                });
                setJobs([values].concat([...newJobs]));
            }
        }
        history.push(paths.jobsList);
    }

    function onRegistrationDateChange(value: any): void {
        formik.setFieldValue('registrationDate', _.isNil(value) ? undefined : value);
    }

    function renderTextViewValue(value?: string | number): JSX.Element {
        return (
            <span>
                {value}
            </span>
        )
    }

    function renderDateViewValue(value: moment.Moment): JSX.Element {
        return (
            <span>
                {moment(value).format('YYYY-MM-DD')}
            </span>
        )
    }

    function renderDataPickerValue(value: moment.Moment): any {
        if (_.isNil(value)) {
            return undefined;
        }
        return moment(value);
    }

    return (
        <Form onFinish={formik.handleSubmit}>
            <Row gutter={gutter}>
                <Col span={8}>
                    <Form.Item
                        label={formatMessage({id: 'job.label.business'})}
                        required={isEditMode}
                        validateStatus={formik.errors.business ? 'error' : undefined}
                        help={formik.errors.business}
                    >
                        {isEditMode ?
                            <Input
                                name={'business' as keyof JobDTO}
                                onChange={formik.handleChange}
                                value={formik.values.business}
                                placeholder={formatMessage({id: 'job.label.business'})}
                            /> :
                            renderTextViewValue(formik.values.business)
                        }
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label={formatMessage({id: 'job.label.address'})}
                        required={isEditMode}
                        validateStatus={formik.errors.address ? 'error' : undefined}
                        help={formik.errors.address}
                    >
                        {isEditMode ?
                            <Input
                                name={'address' as keyof JobDTO}
                                onChange={formik.handleChange}
                                value={formik.values.address}
                                placeholder={formatMessage({id: 'job.label.address'})}
                            /> :
                            renderTextViewValue(formik.values.address)
                        }
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={formatMessage({id: 'job.label.registrationDate'})}>
                        {isEditMode ?
                            <DatePicker
                                value={renderDataPickerValue(formik.values.registrationDate)}
                                onChange={onRegistrationDateChange}
                                placeholder={formatMessage({id: 'job.label.registrationDate'})}
                                style={{width: 200}}
                            /> :
                            renderDateViewValue(formik.values.registrationDate)
                        }
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Form.Item label={formatMessage({id: 'job.label.forkMin'})}>
                        {isEditMode ?
                            <InputNumber
                                key={initialValues.forkMin}
                                min={0}
                                name={'forkMin' as keyof JobDTO}
                                defaultValue={initialValues.forkMin}
                                onChange={(value: number): void => { formik.setFieldValue('forkMin', value)}}
                                placeholder={formatMessage({id: 'job.label.forkMin'})}
                                style={{width: 240}}
                            /> :
                            renderTextViewValue(formik.values.forkMin)
                        }
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={formatMessage({id: 'job.label.forkMax'})}>
                        {isEditMode ?
                            <InputNumber
                                key={initialValues.forkMax}
                                min={0}
                                name={'forkMax' as keyof JobDTO}
                                defaultValue={initialValues.forkMax}
                                onChange={(value: number): void => { formik.setFieldValue('forkMax', value)}}
                                placeholder={formatMessage({id: 'job.label.forkMax'})}
                                style={{width: 240}}
                            /> :
                            renderTextViewValue(formik.values.forkMax)
                        }
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={formatMessage({id: 'job.label.yourRate'})}>
                        {isEditMode ?
                            <InputNumber
                                key={initialValues.yourRate}
                                min={0}
                                name={'yourRate' as keyof JobDTO}
                                defaultValue={initialValues.yourRate}
                                onChange={(value: number): void => { formik.setFieldValue('yourRate', value)}}
                                placeholder={formatMessage({id: 'job.label.yourRate'})}
                                style={{width: 240}}
                            /> :
                            renderTextViewValue(formik.values.yourRate)
                        }
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={gutter}>
                <Col span={8}>
                    <Form.Item label={formatMessage({id: 'job.label.businessResponse'})}>
                        <Checkbox
                            name={'businessResponse' as keyof JobDTO}
                            onChange={formik.handleChange}
                            checked={formik.values.businessResponse}
                            disabled={!isEditMode}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                label={formatMessage({id: 'job.label.summary'})}
                style={{display: 'block'}}
            >
                {isEditMode ?
                    <TextArea
                        rows={2}
                        name={'summary' as keyof JobDTO}
                        value={formik.values.summary}
                        onChange={formik.handleChange}
                        placeholder={formatMessage({id: 'job.label.summary'})}
                    /> :
                    renderTextViewValue(formik.values.summary)
                }
            </Form.Item>
            <Form.Item
                label={formatMessage({id: 'job.label.description'})}
                style={{display: 'block'}}
            >
                {isEditMode ?
                    <TextArea
                        rows={5}
                        name={'description' as keyof JobDTO}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        placeholder={formatMessage({id: 'job.label.description'})}
                    /> :
                    renderTextViewValue(formik.values.description)
                }
            </Form.Item>
            <Row gutter={gutter} justify='space-between'>
                <Col>
                    <Button
                        size='large'
                        onClick={(): void => history.push(paths.jobsList)}
                    >
                        {formatMessage({id: 'common.cancel'})}
                    </Button>
                </Col>
                {isEditMode && <Col>
                    <Button
                        type='primary'
                        htmlType='submit'
                        size='large'
                    >
                        {formatMessage({id: 'common.submit'})}
                    </Button>
                </Col>}
            </Row>
        </Form>
    );
}