---
title: Selecting a query endpoint
summary: >
    The OpenSanctions API offers two different methods of retrieving entities based on a query: 'match' mode and 'search' mode.
---

The difference between these two query modes is a common source of confusion for users who want to integrate the OpenSanctions API/`yente` into their applications.


### When to use the `/search` API

Think of the `/search/<scope>` API as a user-facing search function, i.e. the kind of search mechanism you would use to build a Google-style, interactive search feature for a web site. It supports the simplified [query string syntax](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#query-string-syntax) from ElasticSearch, including operators like `vladimir puddin~2`, `(vladimir OR wladimir) putin`, and literal searches using quotes (`"vladimir vladimirovitch putin"`). You can also query specific fields, e.g. `dates:1980`, or `names:putin`.

While ElasticSearch internally generates result scores for `/search` results, these are not exposed via the API. This is because the search scores would change with each re-index (i.e. every few hours) and revealing them in the API would create a false sense that this API can be used to conduct screening activities.

