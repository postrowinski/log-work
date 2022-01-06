import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useIntl } from 'react-intl';
import * as paths from '../Navigation/pahts';
import { Menu as AntdMenu } from 'antd';

interface MenuItem {
    path: string;
    messageId: string;
}

const menuItems: MenuItem[] = [
    { path: paths.jobsList, messageId: 'nav.jobsList' },
    { path: paths.cacheManagement, messageId: 'nav.cache.management' }
];

export const Menu: React.FC<{}> = (): JSX.Element => {
    const [current, setCurrent] = useState<string>(paths.jobsList);
    const { formatMessage } = useIntl();

    function handleClick (e: any): void {
        setCurrent(e.key);
    };

    return (
        <AntdMenu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            style={{marginBottom: 12}}
        >
            {menuItems.map((item: MenuItem): JSX.Element => {
                return (
                    <AntdMenu.Item key={item.path}>
                        <Link to={item.path}>
                            {formatMessage({id: item.messageId})}
                        </Link>
                    </AntdMenu.Item>
                );
            })}
        </AntdMenu>
    )
}
