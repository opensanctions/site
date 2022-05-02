---
title: Using the API on your own premises
summary: |
    The OpenSanctions API server is an open source software package. By installing
    it on your own infrastructure, you can control scaling, save costs and protect
    your customers' privacy.
---

The idea is simple: in addition to offering the hosted OpenSanctions API, we've 
made it incredibly easy to run the system by yourself. The API server application,
`yente`, is simple to install and will self-update with the latest OpenSanctions
data in regular intervals.

### What are the benefits of self-hosting the API?

* Self-hosting the API means none of your customer data is shared with others. 
  Instead of uploading a full list of your vetting targets to us, they remain
  fully within your control.
* You can import additional entity lists that the API should check against,
  for example if your organization has an in-house blocking list, or you need
  to cross-check specific datasets not included in OpenSanctions in order to
  meet regulatory requirements.
* All you need is a bulk data license. Since the API software is an open source
  package, we won't charge you to run it.
* It's fast and scalable. Need to check a couple of million names? No problem:
  using your own hardware, you won't face any query volume limitations. And of
  course, no API is faster than the one that sits on the same server as the
  application that uses it.
* You don't need to declare OpenSanctions as a data processor for your customer
  data under the terms of the GDPR.

### What are the server requirements?

The OpenSanctions API software, yente, ships as a set of two Docker containers (the
application itself, and an ElasticSearch search index). Docker containers are easy
to run across different platforms (Linux, Mac, Windows) and computing environments
(e.g. Amazon AWS, Google Compute or Microsoft Azure). While we suggest running a
simple setup based on `docker-compose` as a starting point, the software also runs
well on Kubernetes.

Hardware specifications: 2GB RAM, 1vCPU, 4GB hard drive. For ideal performance,
consider allocating 4GB RAM and housing the search index on an SSD-backed disk.

### What if we need support with the application?

Quite frankly, that's the hitch. The OpenSanctions team will have no visibility
into a self-hosted service and cannot offer on-demand support. Beyond that, 
however, we are happy to provide paid consultations to discuss the use of the 
software.
