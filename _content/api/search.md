---
title: "Using the search function to find entities"
summary: |
    Both the OpenSanctions web site and the API expose a full text search function that users can use to find relevant entities. Below you can find some help on how to use the built-in syntax and advanced search operators effectively.
---

**Note:** The search API is not suitable for building a screening process. Please check the [FAQ](/docs/api/faq/) to understand when to use the search or [matching](/docs/api/matching/) APIs.

## Search syntax

Beyond a simple keyword search, OpenSanctions supports many more complex search operations to find matches based on spelling variations, proximity to other terms, and much more.

### Finding an exact phrase or name

By default, OpenSanctions tries to find matches based off your keywords pretty broadly, returning matches that include all of your keywords first, followed by matches that might only include one of your keywords. For example, if you type the keywords:

`Ilham Aliyev`

The search will return all matches that have the words “Ilham” and “Aliyev,” followed by matches that have either “Ilham” or “Aliyev” but not both, in them. Depending on your needs, this might not be ideal.

If you want the search to only return matches that have exactly “Ilham Aliyev”, then you should put quotations around those two keywords.

`"Ilham Aliyev"`

### Allow for variations in spelling

Sometimes a name can be spelled many different ways or even mispelled many different ways. One way to solve this problem is to simply type each variation in the search form:

`Aliyev Əliyev Aliyeva Əliyeva`

You might capture all the variations you want, but you also might miss some by accident. Another way to look for variants of a name is to use the `~` operator:

`Aliyev~2`

What this translates to is: Give me matches that include the keyword Aliyev, but also matches that include up to any 2 letter variations from the keyword Aliyev. These variations include adding, removing, and changing a letter. This includes Aliyev, of course, but also includes Əliyev, which is just one letter variation different, and Əliyeva, which is two letter variations different from Aliyev.

### Search for words that should be in proximity to each other

If you do not want to find a precise keyword, but merely specify that two words are supposed to appear close to each other, you might want to use a proximity search, which also uses the `~` operator. This will try to find all the requested search keywords within a given distance from each other. For example, to find matches where the keywords `Trump` and `Aliyev` are ten or fewer words apart from each other, you can formulate the search as:

`"Trump Aliyev"~10`

### Including and excluding combinations of keywords

You can tell the search to find matches to multiple keywords in a variety of ways or combinations, otherwise known as a composite search.

To tell Aleph that a keyword must exist in all resulting matches, use a `+` operator. Similarly, to tell Aleph that a keyword must not exist in any of the resulting matches, use `-` operator.

`+Trump -Aliyev`

This translates to: Give me all matches in which each match must include the keyword `Trump` and must definitely not include the keyword `Aliyev`.

You can take these combinations a step further using the `AND` operator or the `OR` operator.

`Trump AND Aliyev`

This translates to: Give me all matches in which each match must contain both the keywords `Trump` and `Aliyev`, but don’t return any matches that only contains just one of those keywords.

`Trump OR Aliyev`

This translates to: Give me all matches in which each match may contain the keywords `Trump` or `Aliyev` or both.

You can build on these searches even further like so:

`+Aliyev AND (Obama OR Trump) -Georgia`

This translates to: Give me all matches in which each match must contain the keyword `Aliyev` and must contain either the keyword `Obama` or the keyword `Trump`, but must not contain the keyword `Georgia`.

### Field queries

The data accessed by the search API can also be queried by directly naming a field (think: spreadsheet column) which should be considered. Field queries work by combining a field name with a value to be searched within that field:

`name_parts:vladimir properties.lastName:Putin phones:+4915223433333`

Some of the most useful fields available include the following, which collect multiple values of the same logical type: 

* `countries` - a list of all countries linked to an entity.
* `identifiers` - any government identiifer, including tax and corporate IDs, passport numbers etc.
* `name_parts` - individual parts of a name after processing, e.g. `john` or `smith`. All values have been converted to the latin alphabet, lowercase and company types are contracted into an abbreviation (`ooo`, `gmbh`, `asbl`).
* `topics` - a list of semantic tags related to the entity, like `role.pep`, `sanction`.
* `dates` - dates linked to any entity, also accessible as year-only (e.g. `dates:2022`)
* `phones` - any phone numbers given, in E164 international format.
* `referents` - all former IDs of an entity (before record linkage, e.g. `ofac-12444`)
* others: `genders`, `ibans`, `emails`.

You can also query any property associated with an entity by addressing the property field directly using the `properties.` prefix. For example, the following are valid field names: `properties.firstName`, `properties.innCode`, `properties.jurisdiction`. For a full index of all entity properties, check out the [data dictionary](/reference/).

Field queries can lead to unexpected results because some fields are only searchable for precise values, or for the backend value stored in them. For example, a search for `countries:Russia` will not work - you must use `countries:ru` instead.


### For Dorks

OpenSanctions uses the search engine ElasticSearch in the backend, and many of the operators will work in the search form, but are more advanced. To check out what else is possible, see [ElasticSearch’s documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#query-string-syntax).

## Using the API

When using the OpenSanctions API (or [yente](/docs/yente/)), you can call the `/search/<dataset>` endpoint to conduct searches.

The `dataset` component of the path will define the scope of data you wish to consider: either a single data source (e.g. `us_ofac_sdn`), or a collection of sources (e.g. `sanctions`, `peps` or `default`).

Here's a brief overview of the essential query parameters:

* `q` - the search query text, which enables all of the syntax described above.
* `limit` and `offset` can be used to set the result count and to skip a defined number of results.
* `schema` can be used to filter by [entity type](/reference/), e.g. `Person`, `Company` or `Vessel`. Parent types (e.g. `LegalEntity`, `Asset`) will also return their sub-types (`Person`, `Organization`) for search queries.
* `sort` can control the sorting direction of the results. By default, this is by search relevancy - but you can also set a field like `first_seen:desc` to find the newest entities for a search.
* `simple` is a boolean to disable some advanced search syntax features.

The API response for all searches will include faceted aggregations of the data for `countries`, `topics`, and `datasets` alongside the result list. These aggregations will show, e.g. how many results match a specific country or mention a specific classification topic. They can be used to render facet filters for web displays of the results.

See the [full documentation here](https://api.opensanctions.org/#tag/Matching/operation/search_search__dataset__get).