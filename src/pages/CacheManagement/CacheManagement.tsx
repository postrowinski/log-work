import React, { useContext } from 'react';
import { Context } from '../../components/AppContext/AppContext';
import { Button, message } from 'antd';
import { useIntl } from 'react-intl';

export const CacheManagement: React.FC<{}> = (): JSX.Element => {
    const { jobs } = useContext(Context);
    const { formatMessage } = useIntl();

    function copyJsonToClipboard(): void {
        navigator.clipboard.writeText(JSON.stringify(jobs)).then((): void => {
            message.success(formatMessage({id:"cache.management.copy.data.success"}));
        }, (): void => {
            message.success(formatMessage({id:"cache.management.copy.data.error"}));
        });
    }

    return (
        <div>
            <Button
                type='primary'
                onClick={copyJsonToClipboard}
                block
                style={{minHeight: 60}}
            >
                {formatMessage({id: "cache.management.copy.data.button"})}
            </Button>
        </div>
    )
}