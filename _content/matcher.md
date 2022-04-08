---
title: How we score
path: /matcher/
summary: |
    The OpenSpending API supports matching of entities using a simple query-by-example
    mechanism. For transparency, you can find the weighting of features used in that API
    here. 
---

The API uses a simple entity comparison model based on [logistic regression](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html). Both the [training data](/docs/pairs/) and [the code](https://github.com/opensanctions/nomenklatura/tree/master/nomenklatura/matching) are fully public, inviting public scrutiny and proposals for improvement.