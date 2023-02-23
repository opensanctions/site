---
title: Using the bulk data
summary: |
    The datasets published by the project are made available in multiple
    formats, suitable for different purposes.
---

Please also refer to the [entity structure definition](/docs/entities/) and the [data dictionary](/reference/). Advanced users may want to learn about the [statement-based data model](/docs/statements/).

## Data formats

Bulk data is made available in the following formats for each [data source](/datasets/#sources) and [collection](/docs/faq/#collections) we maintain:

* [FollowTheMoney-based JSON](/docs/bulk/json/) (**recommended**): the native format for OpenSanctions data is a graph of JSON objects.
* [Simplified CSV (comma-separated values) tables](/docs/bulk/csv/): useful for using the data in spreadsheet programs like Excel.
* [Names-only text files](/docs/bulk/plain/): useful for very simple cross-referencing and text search.
* [Statement-based CSV exports](/docs/statements/#download): identifies the source, language and freshness for each claim (property value) about each entity.

> If you would like to discuss a custom export format for OpenSanctions that is more suitable to
> your needs, please [get in touch](/contact/).

## Updates and metadata

Bulk data exports are generated in periodic intervals (every 6-8 hours) by OpenSanctions. The timestamp of the last export (and detailed metadata about the contained datasets) can be found in the metadata index (field `run_time`):

[`https://data.opensanctions.org/datasets/latest/index.json`](https://data.opensanctions.org/datasets/latest/index.json)

Polling this file in regular intervals (e.g. every 30 minutes) is the best practice method for finding out if updated data has been released.