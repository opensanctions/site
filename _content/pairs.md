---
title: Matcher training data
summary: >
    We've produced a comprehensive dataset of record linkage judgements that
    can be used to develop entity matching technology. While we're using this
    data to build our own tools, we're also sharing the data as a community
    resource.
---

As soon as you start dealing with [entity data](/docs/entities/), one question becomes ubiquitous: are two given entities the same? Checking if a customer of your business is on a sanctions list, or if a politician has undecleared offshore wealth: both tasks boil down to this problem.

Integrating sanctions data from different sources also raises this issue (is the person sanctioned by country X the same as the one sanctioned by country Y?). To [deduplicate the OpenSanctions database](/articles/2021-11-11-deduplication/), we've made 170,000 (April 2022) manual judgements about entity pairs contained in our system.

The dataset of pairwise judgements is a valuable resource for building our own [matching API](/docs/api/) and its scoring. But as an open project, we're also sharing it for others who might want to develop their own technology. You can find the data here:

* **[pairs.json](https://data.opensanctions.org/contrib/training/pairs.json)** (700MB+, updated daily, [non-commercial use](/licensing/))

## Using the pairs data

The data has the following format, with two [entities](/docs/entities/) on each line:

```json
{
    "judgement": "negative|positive",
    "left": { ... entity data ... },
    "right": { ... entity data ... },
}
```

The data is intended for use with the [nomenklatura](https://github.com/opensanctions/nomenklatura) data integration framework (Python), but can easily be parsed outside of that context. Nomenklatura also contains the basic statistical model which is trained by the OpenSanctions project using the data.

If you use this data, please tell us about this! We're keen to hear how people use this data, and how the format or semantics could be improved.