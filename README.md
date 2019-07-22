# GraphQL Tutorial – Hacker News Clone

Run `npm install` and `npm start`, and then navigate to `localhost:4000` to be able to run queries.

# Sample queries and mutations

This query illustrates the 3 root fields available on the API: info, feed, link. (Update IDs to make the last one work.)

```
query {
  info
  feed {
    id
    url
    description
  }
  link(id:"cjyejocf3bqbd0b36il5ix7e2") {
    id
    url
    description
  }
}
```



These illustrate the 3 mutations available on the API: post, updateLink, deleteLink. (Update IDs to make each query work.)

```
mutation {
  post(
    url: "www.prisma.io"
    description: "Prisma replaces traditional ORMs"
  ) { id, url }
}

mutation {
  updateLink(
    id:"cjyejocf3bqbd0b36il5ix7e2"
    url: "https://www.google.com"
    description: "A search engine"
  ) {
    id
    url
    description
  }
}

mutation {
  deleteLink (id: "cjyejocf3bqbd0b36il5ix7e2") {
    id
    url
    description
  }
}
```


# Prisma Notes

Your Prisma endpoint is live:

  HTTP:  https://eu1.prisma.sh/abby-chao-84702d/graphql-prisma/dev
  
  WS:    wss://eu1.prisma.sh/abby-chao-84702d/graphql-prisma/dev

You can view & edit your data here:

  Prisma Admin: https://eu1.prisma.sh/abby-chao-84702d/graphql-prisma/dev/_admin
