---
title: FollowTheMoney-based JSON format
summary: |
    The JSON entity format published by OpenSanctions describes entities and their
    relationships in detail.
---

We offer two JSON-based export formats that are both based on [the FollowTheMoney](https://followthemoney.tech) (FtM) data model:

* The `entities.ftm.json` export includes one entity per line.
    * Entities are not just things like people or companies: passports, sanctions, family or business relationships are also represented as entities. Read the [overview of the entity data structure](/docs/entities/) to understand how these form into a complex graph structure.
    * Browse the [data dictionary](/reference/) to see details regarding the property semantics used by OpenSanctions.
    * For implementors who want to import OpenSanctions data into their system, we recommend exploring this format for import.
* The `targets.nested.json` format is based on the entity format but combines related entities into a nested object structure. It contains one line per [target](/reference/#targets), with adjacent entities (e.g. addresses, sanctions) nested inside the properties section of the data structure.
