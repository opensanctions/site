---
title: Bulk Data Frequently Asked Questions
summary: >
    A collection of common questions and answers regarding the bulk data exports released by OpenSanctions, and the file formats that are offered.
---

### <a id="updates"></a> How frequently is OpenSanctions updated?

Most data sources are updated daily and refreshed data extracts are published several times a day (currently ca. every five hours). You can see a list of any [errors or warnings each dataset](/issues/) has generated. 

For data sources that require screen scraping rather than publishing structured data, a HTTP response cache with a maximum age of ten days is used to avoid running into rate limiting errors.

### <a id="replication"></a> If I run the published source code, will it rebuild the full database?

We publish the [source code](https://github.com/opensanctions) for the data processing stack used to build the [OpenSanctions data](/datasets/default/). This means that anyone can build their own versions of the data. However, a lot of the value added to OpenSanctions comes from how we use these tools, rather than the tools themselves. For example:

* You will need to build your own resolver data for [entity deduplication](/docs/identifiers) between source datasets. We manually approve deduplication decisions to build out the dataset published here. This data constitutes a proprietary asset not included with the source code. When you conduct your own deduplication, different identifiers will be generated and you will not be able to generate links to `opensanctions.org` using the data.
* We use [an enrichment process](/docs/enrichment/) based around loading company registries into the [yente](/docs/yente/) service to build out the graph-adjacent context of sanctioned entities. Replicating that process on your own infrastructure is a fairly complex exercise.
* Certain data sources (e.g. `wd_peps`, `ru_rupep`, `sy_obsalytics`) use non-open data to be built, and you will need to contact their publishers before including the data in your distribution, or exclude these sources.

When you're building your own version of the data instead of contributing to the project via a [data license](/licensing/), please act as an open source contributor instead of a customer. Don't request real-time support via [Slack](/slack/). Contribute your own GitHub issues and patches if you notice any issues with the code base, and contribute documentation if you notice holes in it.
