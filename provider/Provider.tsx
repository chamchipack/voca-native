import {ApolloProvider} from '@apollo/client';
import React from 'react';
import {RecoilRoot} from 'recoil';
import client from './ApolloProvider';

export default function Provider({children}: {children: React.ReactNode}) {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </RecoilRoot>
  );
}
