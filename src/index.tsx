import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Auth0Provider} from "@auth0/auth0-react";

const domain: string | undefined = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId: string | undefined = process.env.REACT_APP_AUTH0_CLIENT_ID;

const domainStr: string = ((domain === undefined) ? "" : domain);
const clientIdStr: string = ((clientId === undefined) ? "" : clientId);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Auth0Provider
        domain={domainStr}
        clientId={clientIdStr}
        redirectUri={window.location.origin}
    >
        <App/>
    </Auth0Provider>
);
