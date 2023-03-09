---
title: yente
menu_path: /docs/yente/
summary:
    yente is an open source screening API service. It provides functions to search, retrieve or match FollowTheMoney entities, including people, companies or vessels that are subject to international sanctions. 
---

**yente:** **Intro** · [Deployment](/docs/yente/deploy/) · [Settings](/docs/yente/settings/) · [Custom datasets](/docs/yente/datasets/) · [FAQ](/docs/yente/faq/)

The yente API is built to provide access to [OpenSanctions data](/datasets/), it can also be used to [search and match other data](/docs/yente/datasets/), such as [company registries](/kyb/) or [custom watchlists](/docs/yente/datasets/).

While `yente` is the open source core code base for the [OpenSanctions API](https://api.opensanctions.org), it can also be run [on-premises as a KYC appliance](/docs/self-hosted/) so that no customer data leaves the deployment context. The software is distributed as a Docker image with a pre-defined `docker-compose.yml` configuration that also provisions the requisite ElasticSearch index.

## Using the software

**Note:** this documentation is only relevant to users who plan to [self-host](/docs/self-hosted/) the API. [Click here](/docs/api/) if you'd prefer to use our hosted API service.

* [Deploy yente in your infrastructure](/docs/yente/deploy/)
* [Settings and configuration](/docs/yente/settings/)
* [Adding custom datasets](/docs/yente/datasets/)
* [Frequently asked questions](/docs/yente/faq/)
* [GitHub repository](https://github.com/opensanctions/yente)
* [Report an issue](https://github.com/opensanctions/yente/issues/new)

## Using the API

* [API endpoints](https://api.opensanctions.org)
    * [openapi.json](https://api.opensanctions.org/openapi.json)

## Technical overview

Here is a very quick tour of how `yente` works:

* When the application starts, it will download a metadata file from `data.opensanctions.org` which states the latest version of the OpenSanctions data that was been released. 
* If there is fresh data, it will create an ElasticSearch index with a timestamp that match the latest release of the data (e.g. `yente-entities-all-00220221030xxxx`).
* It will then fetch the latest data from `data.opensanctions.org` (a 500MB+ JSON file) and store it onto the `/tmp` volume of the container.
* Once the data is downloaded, it will read entity data from the file and push it into ElasticSearch in small batches.
* When all the data is indexed, `yente` will create an ES index alias from `yente-entities-all` to the latest snapshot of the index (e.g. `yente-entities-all-00220221030xxxx`) and delete all older snapshots of the index.
* Only once this has completed will the `/search` and `/match` APIs work correctly. On the plus side, any future updates to the data will be indexed first, and the switch-over to the new data will be instantaneous.
