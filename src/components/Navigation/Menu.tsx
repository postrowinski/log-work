import * as React from "react";
import { Link } from "react-router-dom";
import { useIntl } from 'react-intl';
import * as paths from '../Navigation/pahts';

const Menu: React.FC<{}> = (): JSX.Element => {
    const { formatMessage } = useIntl();
    return (
        <ul>
            <li>
                <Link to={paths.home}>
                    {formatMessage({id: 'nav.home'})}
                </Link>
            </li>
            <li>
                <Link to={paths.jobsList}>
                    {formatMessage({id: 'nav.jobsList'})}
                </Link>
            </li>
        </ul>
    )
}

export default Menu;
