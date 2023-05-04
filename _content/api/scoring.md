---
title: How scoring works
menu_path: /docs/api/scoring/
summary: >
    Both the hosted OpenSanctions API and the yente open source application provide a selection of different mechanisms that can be used to score result matches.
---

## Introduction

When you send a [match query](/docs/api/matching/) to the API, it will be processed in two stages: first, a search index is used to locate possible candidate results. This process is meant to optimise for recall, i.e. find a broad selection of result candidates. In a second stage, these candidates are scored against the query that has been provided by the API consumer. The following parameters are used to configure that process:

* `algorithm` query parameter is used to select a scoring algorithm. The different algorithms are described below, but you can also retrieve metadata about them programmatically using the `/algorithms` endpoint.
* `threshold` is defined as the numeric score limit above which a result should be considered a `match`. This parameter may need to be adapted in conjunction with the `algorithm` to avoid producing too many false positive matches.
* `cutoff` describes the lower bound of the result score that should still be returned by the API. Lower this parameter to see more candidates that have been down-ranked by the scoring system.
* `limit` gives the maximum number of matches returned. The OpenSanctions dataset is de-duplicated, so there can usually only be one matching record for each query. Returning a large number of results therefore does not make sense like it would in a [full-text search](/docs/api/pick/).

## Supported scoring mechanisms

The API supports several scoring mechanisms ("algorithms") that can be used to compute and rank the results of a [match query](/docs/api/matching/). Below is a narrative overview of the supported algorithms, please also refer to the [technical documentation](/matcher/).



### Further reading

* [OFAC Sanctions Search](https://sanctionssearch.ofac.treas.gov/)
* [OFAC FAQ on their scoring mechanism](https://ofac.treasury.gov/faqs/topic/1636)
