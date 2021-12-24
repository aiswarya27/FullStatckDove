import { ApolloServer, Config, gql } from 'apollo-server'
import {
  getAllNotes,
  getNoteById,
  getAllLabels,
  updateNoteContent,
  updateNoteTitle,
  updateNoteLabel,
  createLabel,
} from './api/NoteService'

const typeDefs = gql`
  type Note {
    id: ID!
    title: String!
    content: String!
    labels: String
  }
  type Label {
    id: ID!
    value: String!
  }

  type Mutation {
    updateNoteTitle(id: ID!, title: String): Note
    updateNoteContent(id: ID!, content: String): Note
    updateNoteLabel(id: ID!, labels: [String!]): Note
    createLabel(label: String!): Label
  }

  type Query {
    notes: [Note!]!
    note(id: ID!): Note
    labels: [Label!]!
  }
`

const resolvers: Config['resolvers'] = {
  Query: {
    notes: () => getAllNotes(),
    note: (_, args) => getNoteById(args.id),
    labels: () => getAllLabels(),
  },
  Mutation: {
    updateNoteTitle: (_, args) => {
      return updateNoteTitle(args.id, args.title)
    },
    updateNoteContent: (_, args) => {
      return updateNoteContent(args.id, args.content)
    },
    updateNoteLabel: (_, args) => {
      return updateNoteLabel(args.id, args.labels)
    },
    createLabel: (_, args) => {
      return createLabel(args.label)
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
