import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {ApolloProvider, ApolloClient, createHttpLink, InMemoryCache, split} from '@apollo/client'
import {getMainDefinition} from '@apollo/client/utilities'
import {WebSocketLink} from '@apollo/client/link/ws'
import {setContext} from '@apollo/client/link/context'
import './styles/index.css'
import App from './components/App'
import reportWebVitals from './reportWebVitals'
import {AUTH_TOKEN} from './constants'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

/* 
  WARNING
  Storing JWTs in localStorage is not a safe approach to implement authentication on the frontend. 
  Because this tutorial is focused on GraphQL, we want to keep things simple and therefore are using it here.
*/
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
    },
  },
})

const link = split(
  ({query}) => {
    const {kind, operation} = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({link, cache: new InMemoryCache()})

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
