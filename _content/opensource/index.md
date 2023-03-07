---
title: OpenSanctions open source codebase
menu_path: /docs/opensource/
summary:
    This technical documentation is intended to be read by Python developers who wish to run the OpenSanctions crawlers on their own infrastructure, or plan to add their own crawlers to the system.
---

This documentation is only relevant if you wish to run the OpenSanctions open source code. This will not be needed for the vast majority of data users.

**Caveat:** running the open source version of the data will not produce the same output data as the data on this website. This is caused by a variety of configuration issues, mainly related to deduplication and data enrichment. The deduplication mappings - which determine the entity IDs used in the OpenSanctions data - are a commercial asset of OpenSanctions.

## System overview

The OpenSanctions pipeline handles the following key steps:

* Fetching entity data from online sources and parsing the original format
* Normalising the entities in source data into the [OpenSanctions data model](/docs/entities/)
* Storing entities to a local staging database for processing
* Merging entities across different [sources](/datasets/)
* Exporting data into a [variety of target formats](/docs/bulk/) (JSON, CSV)

These steps are triggered using a command-line utility, ``opensanctions``, which can run [parts of this process](/docs/opensource/usage/) for specific segments of the data.

## Documentation

* [Installing the open source code base](/docs/opensource/install/)
* [Using the OpenSanctions CLI](/docs/opensource/usage/)
* [Developing a crawler](/docs/opensource/crawlers/)
