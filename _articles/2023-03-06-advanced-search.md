---
title: "Introducing our new Advanced Screening search"
image_url: https://assets.opensanctions.org/images/articles/advanced-search.png
summary: |
    We're introducing a new advanced screening search, which lets you use multiple search criteria and fuzzy matching to identify watchlist entities.
# draft: false
---

The OpenSanctions Default dataset includes a wide variety of information on entities that are under sanctions, are politically exposed people (PEPs), or are on criminal wanted lists. We currently compile 65 data sources and 283,590 targets.

That can be a lot to get through with only a simple search interface. And it’s why we have added a set of advanced screening options to our search. These options take advantage of the power of our [matching API](/articles/2022-02-01-matching-api/), which is the same one we use in our [software-as-a-service API](/docs/api/) and in our open source [yente software](https://github.com/opensanctions/yente).

<img class="img-fluid img-shadow" src="https://assets.opensanctions.org/images/articles/advanced-search-button.png">

You can [get to those options](/advancedsearch/) by clicking the ‘Advanced’ button next to the Search button when conducting a search. When you do, you’re presented with a number of options that will help you to refine in advance the criteria you’re searching for, including the type of entity you’re looking for (company, person, legal entity, cryptocurrency wallet, etc.), and a set of other matchin criteria based on the entity type.

<img class="img-fluid img-shadow" src="https://assets.opensanctions.org/images/articles/advanced-search-screen.png">

## What you can do with Advanced Screening search

One of the key features of the Advanced Screening search is the ability to search for variations of a name. For example, if a user searches for "John Smith," the tool will also find results like "John Smit," "John Smyth," and other variations of the name. This can help users catch matches that they might have missed otherwise.

The first five results are displayed in the bottom part of the screen. They include the name of the entity, the topics (risk indications) assigned to them, a matching score and an explanation of the score.

Another useful feature is the ability to refine your search and scoring precision by filling in additional criteria such as the country name or code, or the birth date.

## Benefits of the Advanced Screening search

The [Advanced Screening search](/advancedsearch/) offers several benefits to users. The main one is that if you already know something about what you’re searching for, you can immediately focus on that area. For example, if you’re looking for a company, you can limit the search to companies. If it’s a person, you can look for people.

In addition, if you’re looking for an organisation on a specific list (what we refer to as a ‘scope’), such as the [US OFAC Specially Designated Nationals](/datasets/us_ofac_sdn/) list, you can set the search to look only there. This lets you pick the specific data source to search in, or, conversely, to select the entire OpenSanctions Default dataset.

## Matching entities using the OpenSanctions API

OpenSanctions’ Advanced Screening search is also a way to explore the [matching API](/articles/2022-02-01-matching-api/) that can help users conduct more efficient and effective due diligence by [using our API](/docs/api/). By screening against a range of watchlists and using features such as name variations and criteria like corporate identifiers, incorporation dates, businesses can reduce the number of false positives and identify potential risks more quickly. This can help them save time and money, better manage their risks, and comply with regulations aimed at preventing financial crimes.

The Advanced Search available on the OpenSanctions website for individual searches. [OpenSanctions data is available for commercial use](/licensing/). Organizations interested in using OpenSanctions on a commercial basis can purchase either a bulk rate license, which allows you to host a copy of the OpenSanctions Default dataset on your own premises, or to set up an account to use our Software-as-a-Service API for larger-scale searches. [Feel free to get in touch](/contact/) with any additional questions.