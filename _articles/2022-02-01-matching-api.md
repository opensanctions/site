---
title: "How-to: Using the matching API to do KYC-style checks"
summary: |
    Know-Your-Customer (KYC) checks are a different challenge to normal text searches: your query is supposed to describe a person or company in some detail to allow the OpenSanctions API to check if that entity (or a similar one) is flagged.
---

OpenSanctions open source API server, [yente](https://github.com/opensanctions/yente), is a powerful way to query and access the entities in our database. [Business license holders](/licensing) can use it both online and as an on-premises deployment to match a set of customer records against international sanctions and politicians lists.

The most basic way to do those bulk searches might be running simple text queries against the `/search` endpoint - but this will lead to imprecise and incomplete results. Instead, this how-to will show you how to use the `/match` endpoint to get more precise matches using *query-by-example* to do multi-attribute lookups.

### Step 1: Speak the language

Let's say, for example, that you have a customers dataset that specifies the name, birth date, nationality and perhaps a national ID number for each person you want to check. 

The first step would then be to implement a piece of code formats each of these entries conform with the [entity format](/docs/entities/) used by OpenSanctions, assigning each of the columns in your source data to one of the fields specified in the [data dictionary](/reference) (This, of course, works not just for [people](/reference/#schema.Person), but also [companies](/reference/#schema.Company), [vessels](/reference/#schema.Vessel), even [crypto wallets](/reference/#schema.CryptoWallet)).

Here's an example entity in JSON format:

```json
{
    "schema": "Person",
    "properties": {
        "name": ["Arkadiii Romanovich Rotenberg", "Ротенберг Аркадий"],
        "birthDate": ["1951"],
        "nationality": "Russia",
    }
}
```

A few things to note:

* The `schema` defines the type of entities to match this example against. Of course, the schema could also be `Company`, or a [`LegalEntity`](/reference/#schema.LegalEntity) (a more general entity type that matches both people and companies!).
* You can specify a list of property values, rather than a single value - for example, different variations of the name, or different addresses and identification numbers.
* The API internally uses standardised formats for [country codes](/reference#type.country), [dates](/reference#type.date), phone numbers etc., but you can just supply a country name and the API will attempt to identify the correct country code (in this case: `ru`) for the entity.

Generating this JSON form of your records should be a simple exercise. Do not worry too much about details like whether a country name should live in the `country` or `jurisdiction` properties: the matching happens by data type (in this case: [country](/reference#type.country)), not precise field name.

### Step 2: Choose where to look

OpenSanctions combines data from dozens of different sources - some are sanctions lists, others databases of national politicians or entities involved in crime. When running a matching process, you probably want it to run against one of the provided [collections](/datasets) that combine and de-duplicate entities from multiple data sources:

* [`default`](/datasets/default/) is the widest collection of sources, including sanctioned entities, politicians and entities linked to crime.
* [`sanctions`](/datasets/sanctions/) contains only the entities mentioned in the international sanctions lists included by the system.
* [`peps`](/datasets/peps/) lists the entities known to be politically exposed persons (PEPs), e.g. politicians and their close associates and family members.

What collection will be queried is determined by the URL of the matching endpoint used in your integration, e.g. `https://api.opensanctions.org/match/sanctions`.

### Step 3: Chunk your lookups into batches

In order to avoid the overhead of sending thousands upon thousands of HTTP requests, you can group the entities to be matched into batches, sending a few of them at a time. A good batch size is 20 or 50, not 5000. 

### And now, the code

Below is an example Python script that demonstrates how to use the matching API. Note that when running this for your own data, you'll need to add a data source, and a place to store the highest-scoring matches for analyst review.

```python
import requests
from pprint import pprint

# The OpenSanctions service API. This endpoint will only do sanctions checks.
URL = "https://api.opensanctions.org/match/sanctions"

# A query for a person with a specific name and birth date. Note multiple names given 
# in different alphabets:
EXAMPLE_1 = {
    "schema": "Person",
    "properties": {
        "name": ["Arkadiii Romanovich Rotenberg", "Ротенберг Аркадий"],
        "birthDate": ["1951"],
    },
}

# Similarly, a company search using just a name and jurisdiction.
EXAMPLE_2 = {
    "schema": "Company",
    "properties": {
        "name": ["Stroygazmontazh"],
        "jurisdiction": ["Russia"],
    },
}

# We put both of these queries into a matching batch, giving each of them an
# ID that we can recognize it by later:
BATCH = {"queries": {"q1": EXAMPLE_1, "q2": EXAMPLE_2}}

# Send the batch off to the API and raise an exception for a non-OK response code.
response = requests.post(URL, json=BATCH)
response.raise_for_status()

responses = response.json().get("responses")

# The responses will include a set of results for each entity, and a parsed version of
# the original query:
example_1_response = responses.get("q1")
example_2_response = responses.get("q2")

# You can use the returned query to debug if the API correctly parsed and interpreted 
# the queries you provided. If any of the fields or values are missing, it's an
# indication their format wasn't accepted by the system.
pprint(example_2_response["query"])

# The results are a list of entities, formatted using the same structure as your
# query examples. By default, the API will at most return five potential matches.
for result in example_2_response['results']:
    pprint(result)
```

### Understanding the results

If one of your queries returns a result, this is not immediately cause for alarm: the database for politically exposed persons in particular contains many individuals with common names, and matches will be fairly frequent. Instead, you should set up a process for human review.

In terms of analysis, it's helpful to look at the [`topics`](/reference/#type.topic) property for entities: it will often indicate the relevance of an entity (whether it is sanctioned, a politician or just an associate). You can also view the OpenSanctions entity page (`https://opensanctions.org/entities/<id>`) for each result to see their documented connections to other items (connection/graph data is also available via the `/entities/<id>` API endpoint!).

### Give us feedback!

As you implement this, please also take the time to [get in touch](/contact/) and give us some feedback. While this service is stable, there is room for many improvements that we are aware of. In particular, we're trying to understand:

* What additional information should be returned by the API to help you decide the level of relevance of a specific result to your query? Should we include a heuristics-based boolean `match: true` field, even if it is not perfect?

* What fields are in your customer data that cannot be matched in OpenSanctions yet? What is your experience with doing searches across different alphabets - does the support need to be more expansive, or produce fewer results?

Thank you for reading and trying it out!