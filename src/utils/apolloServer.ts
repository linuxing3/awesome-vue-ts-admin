const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const { find, filter } = require('lodash');

const typeDefs = `
  type User {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Events by this user
    """
    events: [Event]
  }

  type Event {
    id: Int!
    title: String
    user: User
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    event(id: Int!): Event
    events: [Event]
    user(id: Int!): User
  }

  # this schema allows the following mutation:
  type Mutation {
    upvoteEvent (
      eventId: Int!
    ): Event
  }
`;
// example data
const users = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

const events = [
  {
    id: 1, userId: 1, title: 'Introduction to GraphQL', votes: 2,
  },
  {
    id: 2, userId: 2, title: 'Welcome to Meteor', votes: 3,
  },
  {
    id: 3, userId: 2, title: 'Advanced GraphQL', votes: 1,
  },
  {
    id: 4, userId: 3, title: 'Launchpad is Cool', votes: 7,
  },
];

const resolvers = {
  Query: {
    events: () => events,
    event: (_, { id }) => find(events, { id }),
    user: (_, { id }) => find(users, { id }),
  },

  Mutation: {
    /**
    |  mutation ($eventId: Int! ) {
    |    upvoteEvent(eventId: $eventId) {
    |      id
    |      title
    |      votes
    |    }
    |  }
    |  {
    |    "eventId": 1
    |  }
    | */
    upvoteEvent: (_, { eventId }) => {
      const event: any = find(events, { id: eventId });
      if (!event) {
        throw new Error(`Couldn't find event with id ${eventId}`);
      }
      event.votes += 1;
      return event;
    },
  },

  User: {
    events: user => filter(events, { userId: user.id }),
  },

  Event: {
    user: event => find(users, { id: event.userId }),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const apolloServer = express();
server.applyMiddleware({ ApolloServer });

export default apolloServer;

apolloServer.listen({ port: 4000 }, () => console.log(`Apollo Server ready at http://localhost:4000${server.graphqlPath}`));
