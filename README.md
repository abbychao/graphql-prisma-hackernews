# GraphQL Tutorial – Hacker News Clone

Run `npm install` and `npm start`, and then navigate to `localhost:4000` to run queries.

If you make any changes to the `prisma/datamodel.prisma` or `prisma/prisma.yml`, run `prisma deploy` and `prisma generate`.

Before running any queries, create a user (see the Authentication section below) or, at least, add the following HTTP header to your POST request:

```
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanllcjNlbjdlcnMxMGIzNnYzeXdscTEwIiwiaWF0IjoxNTYzODIxNzQ1fQ.dMwJM6jjmzBu5Aq9QmfXrAkMR20tQVxGHJ9fXC8DKYE"
```

## Authentication

Run the following mutation query to create a user and get an authentication token. Copy the token from your response and include it as a header in any requests in order to post, update, or delete links.

```
mutation {
  signup(
    name: "Abby"
    email: "abby@chao.com"
    password: "graphql"
  ) {
    token
    user {
      id
    }
  }
}
```

# Sample queries, mutations, and subscriptions

See below for sample queries, mutations, and subscriptions. For more root fields, check the schema. 

## Queries on links

These queries illustrate 3 root fields available on the API: info, feed, link. It also includes a filter for the feed root field. (Choose an actual ID from the database to make link work.)

```
query {
  info
}
```

```
query {
  feed {
    count
    links {
      id
      description
      url
    }
  }
}
```

```
query {
  link(id:"12345") {
    id
    url
    description
  }
}
```

Here is another query using "first" and "skip" to implement pagination. See more here: https://www.howtographql.com/graphql-js/8-filtering-pagination-and-sorting/

```
query {
  feed(
    first: 1
    skip: 1
  ) {
    id
    description
    url
  }
}
```


## Mutations on links

These illustrate the 3 mutations available on the API: postLink, updateLink, deleteLink. (Update IDs to make each query work.)

Each mutation also has a "secure" version (e.g., postLinkSecure) that requires an authorization token. Updating and deleting are only allowed by the original author.

```
mutation {
  postLink(
    url: "www.prisma.io"
    description: "Prisma replaces traditional ORMs"
  ) { id, url }
}

mutation {
  updateLink(
    id:"12345"
    url: "https://www.google.com"
    description: "A search engine"
  ) {
    id
    url
    description
  }
}

mutation {
  deleteLink (id: "12345") {
    id
    url
    description
  }
}
```

## Subscription to any new link

```
subscription {
  newLink {
    id
    url
    description
    postedBy {
      id
      name
      email
    }
  }
}

```

# Accessing Prisma

Your Prisma endpoint is live:

  HTTP:  https://eu1.prisma.sh/abby-chao-84702d/graphql-prisma/dev
  
  WS:    wss://eu1.prisma.sh/abby-chao-84702d/graphql-prisma/dev

You can view & edit your data here:

  Prisma Admin: https://eu1.prisma.sh/abby-chao-84702d/graphql-prisma/dev/_admin
