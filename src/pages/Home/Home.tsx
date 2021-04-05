import React, { useEffect } from 'react';
import * as paths from '../../components/Navigation/pahts';
import { useIntl } from 'react-intl';
import { History } from 'history';
import { useHistory } from 'react-router';
import { Button } from 'antd';

export const Home: React.FC<{}> = (): JSX.Element => {
    const { formatMessage } = useIntl();
    const history: History = useHistory();

    useEffect((): void => {
        history.replace(paths.jobsList);
    }, []);

    return (
        <div>
            <Button
                onClick={(): void => history.push(paths.jobsList)}
                type='primary'
                size='large'
                style={{
                    margin: '60px auto'
                }}
            >
                {formatMessage({id: 'nav.jobsList'})}
            </Button>
        </div>
    );
}