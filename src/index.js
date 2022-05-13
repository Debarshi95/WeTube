import React from 'react';
import ReactDOM from 'react-dom';
import App from 'pages/App';
import { ApolloProvider, AuthProvider, SideDrawerProvider } from 'providers';
import { ErrorBoundary } from 'components';
import reportWebVitals from './reportWebVitals';
import 'styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ApolloProvider>
        <AuthProvider>
          <SideDrawerProvider>
            <App />
          </SideDrawerProvider>
        </AuthProvider>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
