---
title: API Frequently Asked Questions
summary: >
    A collection of common questions and answers regarding the OpenSanctions API and the yente self-hosted appliance.
---

## Should I use the `/match` or the `/search` API?

Sane default: use the `/match` API.

Users who want to use `yente` to build any sort of screening/cross-referencing mechanism will want to use the [matching API](/docs/api/matching/). It supports several [scoring modes](/docs/api/scoring/) that can be used to customise the ratio of false and true matches for a given use case. The `/match` API works particularly well if you can include multiple descriptors for an entity: a name, date of birth, nationality or even a tax registration number.

## When do I use the `/search` API?

Think of the `/search/<scope>` API as a user-facing search function, i.e. the kind of search mechanism you would use to build a Google-style, interactive search feature for a web site. You can [find detailed guidance for the search API and query syntax here](/docs/api/search/).

While ElasticSearch internally generates result scores for `/search` results, these are not exposed via the API. This is because the search scores would change with each re-index (i.e. [every few hours](#updates)) and revealing them in the API would create a false sense that this API can be used to conduct screening activities.

## When do I use the `/entities/` API?

Calling the `/entities/XXXX` endpoint (for an entity with the ID `XXXX`) will retrieve the full details about that entity from the database. The full record will include adjacent entities, such as company owners and subsidiaries, family members and associates for PEPs, and detailed records for addresses and identification documents linked to entities. This endpoint can be used to perform incremental traversal of the OpenSanctions entity graph.

Read about the [entity data model](/docs/entities/) and consult the [data dictionary](/reference/) to see all entity types, how they can reference each other and their other properties.

## <a id="metering"></a> What uses of the API are metered and cost money?

When using the [OpenSanctions API](/api/), all API endpoints which access data (e.g. `/search`, `/match`, `/entities`, and the OpenRefine API) incur a cost per query (see the [product page](/api/)). The `/match` API counts the **number of logical queries you've conducted**: if you submit a batch of 10 query entities to be screened, that HTTP request will be counted as 10 queries. Any request which returns an error (indicated by a non-200 HTTP response code) is not counted.

You can review your API usage costs on the [account overview](/account/) page.

The [self-hosted API](/docs/self-hosted/) does not use metering, you only need a [bulk data license](/licensing/) to have the right to use the data.

## <a id="scaling"></a> Can the API absorb a high request volume?

Our service is built to be scalable and handle high request volumes. If your use is likely to exceed 2 million queries per month or if you're planning to bring high loads in a very short time window (> 200,000 requests/hr), please [reach out to us](/contact/) to make sure we know your traffic is legitimate.
