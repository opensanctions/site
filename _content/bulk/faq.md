---
title: Bulk Data Frequently Asked Questions
summary: >
    A collection of common questions and answers regarding the bulk data exports released by OpenSanctions, and the file formats that are offered.
---

### <a id="updates"></a> How frequently is OpenSanctions updated?

Most data sources are updated daily and refreshed data extracts are published several times a day (currently ca. every five hours). You can see a list of any [errors or warnings each dataset](/issues/) has generated.

For data sources that require screen scraping rather than publishing structured data, a HTTP response cache with a maximum age of ten days is used to avoid running into rate limiting errors.


### <a id="securities"></a> Does the data contain securities identifiers (ISINs) and ticker symbols for companies?

International Securities Identification Numbers (ISINs) are not the native language of the sanctions world: the vast majority of sanctioned companies are private, and do not issue tradeable securities. Instead, companies are more commonly identified by their name, jurisdiction and registration number on sanctions lists. The [US Treasury](/datasets/us_ofac_sdn/) does identify a very small set of ISINs/ticker symbols directly (see: [search result](https://www.opensanctions.org/search/?scope=sanctions&schema=Security), 238 at time of writing).

OpenSanctions expands the government-published sanctions lists with [data from other sources](/docs/enrichment). This way, we include securities definitions (and ISINs) from the following sources:

* [Global Legal Entity Identifier Foundation](/datasets/gleif/) (GLEIF) is the coordinating body for the assignment of LEI codes. They also maintain a mapping of all companies who have an LEI code and the ISIN codes issued to those organizations. This is helpful with banks and large funds.
* The [National Settlement Depository](/datasets/ru_nsd_isin/) (NSD) of the Russian Federation publishes information about the assignment of ISIN codes to Russian securities. These are subject to US [Executive Order 14071](https://ofac.treasury.gov/sanctions-programs-and-country-information/russian-harmful-foreign-activities-sanctions).

We hope to add more sources to the system in the near future. If you wish to suggest a relevant dataset which we can legally include in OpenSanctions, please [get in touch](/contact/).

On a technical note, OpenSanctions does not consider ISINs to be attributes of companies. Instead, each ISIN is assigned to a [`Security`](/reference/#schema.Security) object, which in turn links to its `issuer` (a [`Company`](/reference/#schema.Company) object). We're happy to generate a simplified representation of this data [upon request](/contact/).


### <a id="replication"></a> If I run the published source code, will it rebuild the full database?

We publish the [source code](https://github.com/opensanctions) for the data processing stack used to build the [OpenSanctions data](/datasets/default/). This means that anyone can build their own versions of the data. However, a lot of the value added to OpenSanctions comes from how we use these tools, rather than the tools themselves. For example:

* You will need to build your own resolver data for [entity deduplication](/docs/identifiers) between source datasets. We manually approve deduplication decisions to build out the dataset published here. This data constitutes a proprietary asset not included with the source code. When you conduct your own deduplication, different identifiers will be generated and you will not be able to generate links to `opensanctions.org` using the data.
* We use [an enrichment process](/docs/enrichment/) based around loading company registries into the [yente](/docs/yente/) service to build out the graph-adjacent context of sanctioned entities. Replicating that process on your own infrastructure is a fairly complex exercise.
* Certain data sources (e.g. `wd_peps`, `ru_rupep`, `sy_obsalytics`) use non-open data to be built, and you will need to contact their publishers before including the data in your distribution, or exclude these sources.

When you're building your own version of the data instead of contributing to the project via a [data license](/licensing/), please act as an open source contributor instead of a customer. Don't request real-time support via [Slack](/slack/). Contribute your own GitHub issues and patches if you notice any issues with the code base, and contribute documentation if you notice holes in it.
