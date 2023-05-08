---
title: API Frequently Asked Questions
summary: >
    A collection of common questions and answers regarding the OpenSanctions API and the yente self-hosted appliance.
---

## Should I use the `/match` or the `/search` API?

Sane default: use the `/match` API.

Users who want to use `yente` to build any sort of screening/cross-referencing mechanism will want to use the [matching API](/docs/api/matching/). It supports several [scoring modes](/docs/api/scoring/) that can be used to customise the ratio of false and true matches for a given use case. The `/match` API works particularly well if you can include multiple descriptors for an entity: a name, date of birth, nationality or even a tax registration number.

## When do I use the `/search` API?

Think of the `/search/<scope>` API as a user-facing search function, i.e. the kind of search mechanism you would use to build a Google-style, interactive search feature for a web site. It supports the simplified [query string syntax](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#query-string-syntax) from ElasticSearch, including operators like `vladimir puddin~2`, `(vladimir OR wladimir) putin`, and literal searches using quotes (`"vladimir vladimirovitch putin"`). You can also query specific fields, e.g. `dates:1980`, or `names:putin`.

While ElasticSearch internally generates result scores for `/search` results, these are not exposed via the API. This is because the search scores would change with each re-index (i.e. every few hours) and revealing them in the API would create a false sense that this API can be used to conduct screening activities.

## When do I use the `/entities/` API?

Calling the `/entities/XXXX` endpoint (for an entity with the ID `XXXX`) will retrieve the full details about that entity from the database. The full record will include adjacent entities, such as company owners and subsidiaries, family members and associates for PEPs, and detailed records for addresses and identification documents linked to entities. This endpoint can be used to perform incremental traversal of the OpenSanctions entity graph.

Read about the [entity data model](/docs/entities/) and consult the [data dictionary](/reference/) to see all entity types, how they can reference each other and their other properties.
