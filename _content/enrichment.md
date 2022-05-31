---
title: Enrichment from external databases
summary: >
    A large number of data sources contain relevant details about the entities in
    our database, but including some of them in full as sources would be impractical. That's why we import them in part, whereever the contained data have direct links to the target entities in OpenSanctions.
---

The motivation for data enrichment comes from the following user needs:

* Can we import the network links of an entity in the [ICIJ Offshore Leaks](/datasets/offshoreleaks/) database that is also sanctioned?
* Can we use geocoding to make the addresses given on sanctions list more precise?
* Can we link every person on an international sanctions list to their Wikidata profile?
* Can we make it easier for data users to connect datasets like OpenSanctions and OpenCorporates.com?

All of these scenarios require matching the [entities](/docs/entities/) in OpenSanctions against an external database and then importing fragments of it ad-hoc when a positive match was found.

In order to provide [granular provenance](/docs/statements/) for the information contributed from such sources, we represent these external databases as special [datasets](/datasets/#externals) in OpenSanctions.

### More information

* [External databases](/datasets/#externals) that we currently source data from.
* [Suggest a data source](/contact/) that contains relevant information (e.g. about beneficial ownership of companies or assets, other relationships of sanctioned entities) and is openly re-usable.
* [nomenklatura](https://github.com/opensanctions/nomenklatura) is the custom-built data integration toolkit we use to enrich and cross-match our data. It can be used separately from OpenSanctions as an OSINT data management tool.