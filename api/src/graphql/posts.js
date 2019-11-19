import { gql } from '@hammerframework/api'
import Posts from 'src/services/posts'

export const schema = gql`
  type Post {
    id: ID!
    title: String!
    slug: String!
    body: String!
    author: String!
    image: String
    postedAt: DateTime
    tags: [Tag]
  }

  type Query {
    postsAll: [Post]
    postsFindBySlug(slug: String): Post
    postsFindByTag(tag: String): [Post]
    postsSearch(term: String): [Post]
  }

  input PostInput {
    title: String!
    slug: String!
    author: String!
    body: String!
    image: String
    postedAt: DateTime
  }

  type Mutation {
    postsCreate(input: PostInput!): Post
    postsUpdate(input: PostInput!): Post
    postsDelete(id: ID!): Post
  }
`

export const resolvers = {
  Query: {
    postsAll: () => {
      return Posts.all()
    },

    postsFindBySlug: (_root, args) => {
      return Posts.findBySlug(args)
    },

    postsFindByTag: (_root, args) => {
      return Posts.findByTag(args)
    },

    postsSearch: (_root, args) => {
      return Posts.search(args)
    },
  },

  Mutation: {
    postsCreate: (_root, args) => {
      return Posts.create(args)
    },

    postsUpdate: (_root, args) => {
      return Posts.update(args)
    },

    postsDelete: (_root, args) => {
      return Posts.delete(args.id)
    },
  },
}
