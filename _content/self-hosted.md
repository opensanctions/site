---
title: Self-hosting the OpenSanctions API
summary: |
    The OpenSanctions API server is based on an open source software package. By
    installing that software on your own infrastructure, you can control scaling,
    save costs and protect your customers' privacy.
---

<img class="img-fluid" src="https://assets.opensanctions.org/images/articles/selfhosted.png" style="width: 40%; float: right; padding-left: 1em;">

The idea is simple: in addition to offering the [hosted OpenSanctions API](/docs/api/), we've made it easy to run the system by yourself. The API server application, [yente](/docs/yente/), is simple to install and will update itself with the latest OpenSanctions data in regular intervals.

### What are the benefits of self-hosting?

* Self-hosting the API means none of your customer data is shared with others. Instead of submitting a list of vetting targets to us, your data remains fully within your control.
* You can [import additional entity lists](/docs/yente/datasets/) that the API should check against, for example if your organization has an in-house watchlist, or you need to cross-check specific datasets not included in OpenSanctions in order to meet regulatory requirements.
* All you need is a [bulk data license](/licensing/). Since the API software is an open source package, we won't charge you to run it.
* It's fast and scalable. Need to check a few million names? No problem: using your own hardware, you won't face any query volume limitations. And of course, no API is faster than the one that sits on the same server as the application that uses it.
* You don't need to declare OpenSanctions as a data processor for your customer data under the terms of the GDPR.

### How do I get started?

We recommend you take the following steps:

1. Evaluate the [deployment options](/docs/yente/deploy/) for your infrastructure. The service will automatically import OpenSanctions data unless [configured otherwise](/docs/yente/datasets/).
2. Try out the service by building a simple API client (Tutorial: [Using the matching API to do KYC-style checks](/articles/2022-02-01-matching-api/))
3. Acquire a [bulk data license](/licensing) so that you're legally entitled to use the OpenSanctions dataset.
4. Scale up: you can run as many instances of the API as you choose, and handle as many screening requests as you wish.

### What are the server requirements?

The OpenSanctions API software, [yente](/docs/yente/), ships as a set of two Docker containers (the application itself, and an ElasticSearch search index). Docker containers are [easy to run across different platforms](https://docs.docker.com/get-docker/) (Linux, Mac, Windows) and computing environments (e.g. Amazon AWS, Google Compute or Microsoft Azure). While we suggest running a simple setup based on `docker-compose` as a starting point, the software also works well on Kubernetes.

Hardware specifications: 4GB RAM, 1vCPU, 4GB hard drive. For improved performance, consider allocating 8GB RAM and housing the search index on an SSD-backed disk.

### How often does the on-prem service update with new data?

By default, the service will check for updated data every 30 minutes and download OpenSanctions bulk data whenever a new release is found. Releases are published at least once a day, but usually several times each day.

### What support is available with the application?

While the OpenSanctions team will have no visibility into your self-hosted service, we are happy to offer consultation services to [discuss the use of the software](/contact/) and work out a deployment strategy for your use case.
