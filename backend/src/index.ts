import { ApolloServer, Config, gql } from "apollo-server";
import {
  getAllNotes,
  getNoteById,
  updateNoteContent,
  updateNoteTitle
} from "./api/NoteService";

const typeDefs = gql`
  type Note {
    id: ID!
    title: String!
    content: String!
  }

  type Mutation {
    updateNoteTitle(id: ID!, title: String): Note
    updateNoteContent(id: ID!, content: String): Note
  }

  type Query {
    notes: [Note!]!
    note(id: ID!): Note
  }
`;

const resolvers: Config["resolvers"] = {
  Query: {
    notes: () => getAllNotes(),
    note: (_, args) => getNoteById(args.id)
  },
  Mutation: {
    updateNoteTitle: (_, args) => {
      return updateNoteTitle(args.id, args.title);
    },
    updateNoteContent: (_, args) => {
      return updateNoteContent(args.id, args.content);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
