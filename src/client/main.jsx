import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import styles from "./styles/RightContainer.css"

const MyComponent = () => {
  const [uri, setUri] = useState('http://localhost:4000/graphql');

  const client = new ApolloClient({
    uri: uri,
    cache: new InMemoryCache(),
  });

  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App uri={uri} setUri={setUri} client={client}/>
      </ApolloProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<MyComponent />);



