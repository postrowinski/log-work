import React, { useEffect, useState } from 'react';
import { useFormik, FormikProps } from 'formik';
import { Button, Form, Input, Row, Col, DatePicker, InputNumber } from 'antd';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import * as paths from '../../components/Navigation/pahts';
import * as Yup from 'yup';
import * as _ from 'lodash';
import { useIntl } from 'react-intl';
import { JobDTO } from 'rest';
import { jobs } from './jobs.data';
import moment from 'moment';
import Checkbox from 'antd/lib/checkbox/Checkbox';

const { useForm } = Form;
const { TextArea } = Input;

const gutter: number = 16;

export const JobForm: React.FC<{}> = (): JSX.Element => {
    useForm();
    const { formatMessage } = useIntl();
    const history: History = useHistory();
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

    useEffect((): void => {
        setInitialValues(jobs[0]);
    }, []);

    function onSubmit(values: JobDTO): void {
        // tslint:disable-next-line
        console.log(values);
        history.push(paths.jobsList)
    }

    function onRegistrationDateChange(value: any): void {
        formik.setFieldValue('registrationDate', value);
    }
    // businessResponse?: boolean;
    // description?: string;

    return (
        <Form onFinish={formik.handleSubmit}>
            <Row gutter={gutter}>
                <Col span={8}>
                    <Form.Item
                        label={formatMessage({id: 'job.label.business'})}
                        required
                        validateStatus={formik.errors.business ? 'error' : undefined}
                        help={formik.errors.business}
                    >
                        <Input
                            name={'business' as keyof JobDTO}
                            onChange={formik.handleChange}
                            value={formik.values.business}
                            placeholder={formatMessage({id: 'job.label.business'})}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        label={formatMessage({id: 'job.label.address'})}
                        required
                        validateStatus={formik.errors.address ? 'error' : undefined}
                        help={formik.errors.address}
                    >
                        <Input
                            name={'address' as keyof JobDTO}
                            onChange={formik.handleChange}
                            value={formik.values.address}
                            placeholder={formatMessage({id: 'job.label.address'})}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={formatMessage({id: 'job.label.registrationDate'})}>
                        <DatePicker
                            defaultValue={moment(formik.initialValues.registrationDate) as any}
                            onChange={onRegistrationDateChange}
                            placeholder={formatMessage({id: 'job.label.registrationDate'})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Form.Item label={formatMessage({id: 'job.label.forkMin'})}>
                        <InputNumber
                            key={initialValues.forkMin}
                            min={0}
                            name={'forkMin' as keyof JobDTO}
                            defaultValue={initialValues.forkMin}
                            onChange={(value: number): void => { formik.setFieldValue('forkMin', value)}}
                            placeholder={formatMessage({id: 'job.label.forkMin'})}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={formatMessage({id: 'job.label.forkMax'})}>
                        <InputNumber
                            key={initialValues.formMax}
                            min={0}
                            name={'formMax' as keyof JobDTO}
                            defaultValue={initialValues.formMax}
                            onChange={(value: number): void => { formik.setFieldValue('forkMax', value)}}
                            placeholder={formatMessage({id: 'job.label.forkMax'})}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label={formatMessage({id: 'job.label.yourRate'})}>
                        <InputNumber
                            key={initialValues.yourRate}
                            min={0}
                            name={'yourRate' as keyof JobDTO}
                            defaultValue={initialValues.yourRate}
                            onChange={(value: number): void => { formik.setFieldValue('yourRate', value)}}
                            placeholder={formatMessage({id: 'job.label.yourRate'})}
                        />
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
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Form.Item
                    label={formatMessage({id: 'job.label.description'})}
                    style={{width: '100%'}}
                >
                    <TextArea
                        rows={5}
                        name={'description' as keyof JobDTO}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                </Form.Item>
            </Row>
            <Row gutter={gutter} justify='space-between'>
                <Col>
                    <Button
                        size='large'
                        onClick={(): void => history.push(paths.jobsList)}
                    >
                        {formatMessage({id: 'common.cancel'})}
                    </Button>
                </Col>
                <Col>
                    <Button
                        type='primary'
                        htmlType='submit'
                        size='large'
                    >
                        {formatMessage({id: 'common.submit'})}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}