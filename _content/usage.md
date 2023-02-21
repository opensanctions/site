---
title: Using the bulk data
summary: |
    The datasets published by the project are made available in multiple
    formats, suitable for different purposes.
---

Please also refer to the [entity structure definition](/docs/entities/) and the [data dictionary](/reference/). Advanced users may want to learn about the [statement-based data model](/docs/statements/).

## Data formats

Bulk data is made available in the following formats for each [data source](/datasets/#sources) and [collection](/docs/faq/#collections) we maintain:

* [JSON/FollowTheMoney-based objects](/docs/entities/): the native format for OpenSanctions data is a graph of JSON objects.
* [Simplified CSV (comma-separated values) tables](/docs/formats/csv/): useful for using the data in spreadsheet programs.
* [Names-only text files](/docs/formats/plain/): useful for very simple cross-referencing.

You can also download the internal data format of OpenSanctions, which [identifies the source and freshness of each claim about each entity](/docs/statements/#download).

> If you would like to discuss a custom export format for OpenSanctions that is more suitable to
> your needs, please [get in touch](/contact/).


### <a id="entities.ftm.json"></a><a id="targets.nested.json"></a> JSON/FollowTheMoney-based formats

We offer two JSON-based export formats that are both based on [the FollowTheMoney](https://followthemoney.tech) (FtM) data model. They are a close representation of the [internal data structure](/reference/) of OpenSanctions.

You can get [a basic overview of the entity data structure](/docs/entities/), and browse the [data dictionary](/reference/) to see details regarding the properties used by OpenSanctions.

Both formats use [line-delimited JSON](https://en.wikipedia.org/wiki/JSON_streaming#Line-delimited_JSON): each line of the exported files is a separate entity. While the *FollowTheMoney entities* (``entities.ftm.json``) export contains one entity per line, the *nested JSON* (``targets.nested.json``) format contains one line per [target](/reference/#targets), with adjacent entities (e.g. addresses, sanctions) nested inside the properties section of the data structure.

The nested format and some of the provided metadata (``datasets``, ``first_seen``, ``last_seen``) are not part of FtM, but extensions developed for OpenSanctions.
