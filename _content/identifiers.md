---
title: Identifiers and de-duplication
summary: |
    A key function of OpenSanctions is to merge entities from multiple sources - in particular sanctions lists - into merged profiles. Source and combined entities use different sets
    of identifiers to enable data integration.
---

As data is collected from a broad range of [data sources](/datasets/#sources), the same logical [entity](/docs/entities/) - persons, companies, even aircraft or addresses - may be referenced in several sources. To avoid duplicate search and matching results and allow for an integrated view of relevant information, these entities are combined when exported or shown on the web site.

**NOTE:** *This guide is about IDs used by OpenSanctions to identify [entities](/docs/entities/), not the identifiers - company registration numbers, passport, tax or national ID numbers - included in the data itself.*

## Deduplication and entity IDs

Check out [our 2021 blog post](/articles/2021-11-11-deduplication/) to learn more about how we actually decide which entities to merge. In short, the process is the following:

* A **crawler will collect information from a data source**, and emit entities with source-specific IDs. These IDs are prefixed with a dataset key. For example, entities from the [US OFAC](/datasets/us_ofac_sdn/) dataset all start with `ofac-`, while those on the European sanctions list begin with `eu-fsf-`. The remainder of the ID will be generated from the source data. It is often an identifier assigned by the data publisher, or some other key that remains stable over time.
* The newly imported entity will be **matched against all the existing records** in the system, and an analyst decides whether to merge it with one of the existing profiles. This usually takes place 12 to 72 hours after a new entity is collected from the data source.
* If the entity was merged with others, the **combined entity will be assigned an ID** using the format `NK-xxxxxx`. `NK` IDs are random unique text identifiers. They are sometimes called *canonical IDs* in the data and documentation.
* If the merged entity describes a person, it **may also be identified using a Q-ID** (e.g. `Q12345`). Q-IDs are [Wikidata item identifiers](https://www.wikidata.org/wiki/Wikidata:Identifiers). They are preferred over `NK-` identifiers.

## Rules for working with IDs

As you use entity data or import it into another system, you should be aware of the following rules in order to ensure data consistency:

* Entities will change their ID as they go through de-duplication. In the best case, this happens only once: going from a data source ID (`ofac-81717`) to a canonical ID (`NK-1GH7ajs8ka` or `Q12345`). This transition would either happen if the same logical entity already exists in another source, or some time later, as a second source begins referencing the same logical entity.
* Sometimes, two merged entities might later be discovered to be identical to each other. In that case, one of the canonical IDs will be chosen to remain active, the other will stop being used.
* All previous identities - data source IDs and disused canonical IDs - will be included in the `referents` attribute of the published entity data. This list can be used to update existing references to an entity if needed.
* Our eventual goal is to have all humans in OpenSanctions identified by a Wikidata item ID (i.e. `Q12345`). However, this is not likely to be fully implemented in the near term. In the interim, people IDs will be a mix of QIDs and NK-IDs.
