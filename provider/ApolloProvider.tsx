// src/apollo/client.js
import {ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://192.168.0.70:4000/graphql', // GraphQL 서버 URL
  cache: new InMemoryCache(), // 캐시 설정
});

export default client;
