import React from 'react';
import * as paths from '../../components/Navigation/pahts';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

export const Home: React.FC<{}> = (): JSX.Element => {
    const { formatMessage } = useIntl();
    return (
        <>
            <Link to={paths.jobsList}>
                {formatMessage({id: 'nav.jobsList'})}
            </Link>
        </>
    );
}