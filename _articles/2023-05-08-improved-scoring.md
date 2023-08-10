---
title: "New scoring modes in the OpenSanctions API"
image_url: https://assets.opensanctions.org/images/articles/regression.png
summary: |
    You can now select from a range of different algorithms that score your results when you use the OpenSanctions API to screen a set of companies and people.
tags: 
    - API
    - Scoring
---

The OpenSanctions API - both the easy-to-use [hosted service](/api/) and the [self-hosted option](/docs/self-hosted/) - provides an easy way to submit a set of entity descriptions (e.g. a list of customers, business counterparties, or subjects of an investigation) and check their presence on a [sanctions](/datasets/sanctions/) or [PEPs list](/datasets/peps/).

<img class="img-fluid article-image img-shadow" src="https://assets.opensanctions.org/images/articles/gazprombank.png">

Until now, this [matching API](/docs/api/matching/) has used a simple statistical model to assign a match score to each result it has returned. With the [new release](https://github.com/opensanctions/yente/releases) of `yente 3.4`, we've made that mechanism more flexible: clients can now select one of [a set of supported algorithms](/docs/api/scoring/) to optimise the behaviour of the API for their use case.

With the new release, we've added three new scoring systems to augment the existing model (now called `regression-v1`, it is used as the default if no other algorithm is specified):

* `regression-v2` is a new statistical model for matching people and companies. Unlike `regression-v1` it uses pronunciation-based (phonetic/soundex) comparison for entity names, and it has reduced the impact of birthdates as a decision criterion. The new model will generally produce much lower scores for results, so you may want to reduce your matching `threshold` parameter in the API to `0.5` or `0.6`.

* `name-based` is a simple scoring mechanism based on name similarity only. It uses two criteria, the Jaro-Winkler string distance mechanism and the Soundex phonetic algorithm. This can be a useful tool to conduct matching on data where you only have entity names, and no other details such as birth dates, nationalities, etc.

* `name-qualified` uses the score from the `name-based` mechanism but then considers other criteria, such as birth dates, nationalities, tax and registration identifiers. If any of these mismatch between the query and the result, the score is lowered. This attempts to anticipate a simple review process that a human analyst might otherwise undertake when a result is found.

You can [read more](/docs/api/scoring/) about these mechanisms and [inspect their detailed scoring criteria](/matcher/). But what's even more exciting: by making the matching logic of `yente` into a configurable component, we can now keep adding specialised scoring systems without breaking backward compatibility. And, because it's open source: [you could, too](https://github.com/opensanctions/nomenklatura/tree/master/nomenklatura/matching).

In the future, we can add algorithms that introduce [a more human-like understanding of names](https://medium.com/occrp-unreported/whats-in-a-name-searching-for-people-across-the-border-d03abdb6f16b), or use name frequencies to predict the likelihood of a certain name being unique. (Inserting a sentence here about the future application of OpenAI's GPT will be left as an exercise to the inclined reader.)

We're keen for any feedback regarding this change, and what our next steps with customised scoring  should be!