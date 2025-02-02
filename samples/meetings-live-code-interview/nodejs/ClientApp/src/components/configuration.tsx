import React from 'react';
import * as microsoftTeams from "@microsoft/teams-js";

const Configuration = () => {
    const [tabId, setTabId] = React.useState('');

    React.useEffect(() => {
        microsoftTeams.app.initialize().then(() => {
            microsoftTeams.app.getContext().then(async (context: microsoftTeams.app.Context) => {
                setTabId(context.page.subPageId!)
            });
    
            microsoftTeams.pages.config.registerOnSaveHandler(async (saveEvent: microsoftTeams.pages.config.SaveEvent) => {
                microsoftTeams.pages.config.setConfig({
                    entityId: tabId,
                    contentUrl: `${window.location.origin}/tab`,
                    suggestedDisplayName: 'Live coding',
                });
                saveEvent.notifySuccess();
            });
            microsoftTeams.pages.config.setValidityState(true);
        });
    }, []);

    return (
        <div className="config-container">
            Please click on save to configure this tab
        </div>
    )
}

export default (Configuration);