---
title: Statement data model
summary: >
    Inside the OpenSanctions database, information from different sources is stored in a statement-based data model which lets us trace the origin and temporal range of each attribute of any tracked entity.
---

*This page covers an advanced topic: most users will not need to interact with the statement-based data. See also: [export formats guide](/docs/bulk/), [entity data model](/docs/entities/).*

The OpenSanctions database is designed to meet the following design objectives:

* Be able to [dynamically merge and un-merge entities](/articles/2021-11-11-deduplication/) from a broad range of data sources.
* Be able to identify the origin of each piece of information about a sanctions target or other entity.
* Track entities and their properties as they change over time.

In order to meet these goals, the system uses a statement-based database design. To illustrate this, think of a claim like this one: *the US sanctions list, as of the most recent update, claims that entity ``ofac-12345`` has the property ``name`` set to the value `John Doe`*.

All information in the system is stored using this way, including links between different entites. When exports are generated, the system will do so by grouping all the statements that pertain to a particular entity and combining them into the desired format. The [forms of the data](/docs/bulk/) we publish, including the JSON format returned by the [API](/api/), are simplified/aggregated for easier use. If you're trying to use the data in a way that does not require granular provenance, use these more common export formats.

### Model implementation

As a database schema, this results in a table with the following columns:

* ``entity_id`` (source ID): the entity identifier as derived from the data source, e.g. ``ofac-nnnn`` for entries on the US OFAC sanctions lists.
* ``prop`` (property): the entity attribute that this statement relates to, e.g. ``birthDate``, or ``name`` (see [data dictionary](/reference/#schema)).
* ``prop_type`` (property type): the data type of the given property, e.g. ``date``, ``country``, ``name`` etc.
* ``value``: the actual value of the property for the entity. If multiple values are indicated in the source data, each of them will result in a separate statement.
* ``lang``: the language (3 letter code) of the value, if it is known.
* ``original_value``: the property value before it was cleaned (e.g. country name vs. code, unparsed date).
* ``dataset`` (source dataset): the source dataset identifier (same as the [dataset URL slugs](/datasets/#sources)).
* ``schema`` (schema): the type of the given entity. Specific statements can indicate more or less specific schemata, e.g. ``LegalEntity`` and ``Company`` (the resulting entity would be a ``Company``) - see [data dictionary](/reference/#schema).
* ``first_seen`` (first seen): the first date when the processing pipeline found this value linked to the given entity. Please note that this only records values after July 2021, when we started tracking the data - more realistic evidence of when an entity was added to the given sanctions list can be found in the ``createdAt`` property.
* ``last_seen`` (last seen): the latest date when the processing pipeline found this value.
* ``target`` (is target): a boolean to indicate if the entity to which this statement belong is a target - a designated sanctioned entity - in the data source. Some entities, like addresses, or family members, are included but not targets in their own right.
* ``canonical_id`` (deduplicated ID): the entity identifier as resulting from [our de-duplication process](/articles/2021-11-11-deduplication/). If no de-duplication has been performed, this is the same as ``entity_id``. If the entity has been merged with others inside the same database, it will receive an ID starting with ``NK-`` (short for nomenklatura). If the entity has been [de-referenced against Wikidata](/articles/2022-01-25-wikidata/), the Wikidata item ID (like ``Q7747``) will override any ``NK-`` IDs.

### <a id="download"></a> Accessing the statements data

**On the web site:** If you'd like to play with how this looks in practice, you can use the **[raw data explorer](/statements)** to browse and filter the statement data. You can add extra query parameters like `schema`, `entity_id`, `canonical_id`, `prop`, etc. in your browser's URL bar.

**Bulk data access:** The statements table is exported to CSV format every night as part of the regular data pipeline runs. You can fetch the data here:

* **[statements.csv](https://data.opensanctions.org/datasets/latest/statements.csv)**

This file is subject to [non-commercial licensing](/licensing/). You can import this CSV into a local install of the OpenSanctions codebase using the ``opensanctions import-statements [file]`` command.