import React, { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: "https://api-uswest.graphcms.com/v1/cjnpcwymt0kpq01g5zt7ne98n/master"
});

const POSTS_QUERY = gql `
{
  posts {
    id
    title
    body
  }
}
`
client
  .query({
    query: POSTS_QUERY
  })
  .then((res) => { 
    console.log(res)
  });


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <h1>GraphQL Practice</h1>
        <Query query={POSTS_QUERY}>
        {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

        const {posts} = data

      return posts.map( post => (
        <div key={post.id}>
          <p>{post.title}</p>
          <p>{post.body}</p>
        </div>
      ));
    }}
  </Query>
      </ApolloProvider>
    );
  }
}

export default App;
