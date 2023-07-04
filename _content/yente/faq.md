---
title: Frequent questions about yente
menu_path: /docs/yente/
summary:
    Common issues experienced while deploying and operating yente.
---

**yente:** [Intro](/docs/yente) · [Deployment](/docs/yente/deploy/) · [Settings](/docs/yente/settings/) · [Custom datasets](/docs/yente/datasets/) · **FAQ**


### <a id="updates"></a> How often is data in yente API updated?

The self-hosted API is - by default - configured to check for new OpenSanctions data releases every 30 minutes (cf. `YENTE_SCHEDULE`). New data releases are [published several times a day](/docs/bulk/faq/#updates).

If new data is available, [an indexing process will be started](#technical), and requests will switch to the new data once it is fully searchable (ca. 15 minutes).


## <a id="technical"></a> How does yente update its data?

Here is a very quick tour of how `yente` works:

* When the application starts, it will download a metadata file from `data.opensanctions.org` which states the latest version of the OpenSanctions data that was been released. 
* If there is fresh data, it will create an ElasticSearch index with a timestamp that match the latest release of the data (e.g. `yente-entities-all-00220221030xxxx`).
* It will then fetch the latest data from `data.opensanctions.org` (a 500MB+ JSON file) and store it onto the `/tmp` volume of the container.
* Once the data is downloaded, it will read entity data from the file and push it into ElasticSearch in small batches.
* When all the data is indexed, `yente` will create an ES index alias from `yente-entities-all` to the latest snapshot of the index (e.g. `yente-entities-all-00220221030xxxx`) and delete all older snapshots of the index.
* Only once this has completed will the `/search` and `/match` APIs work correctly. On the plus side, any future updates to the data will be indexed first, and the switch-over to the new data will be instantaneous.


### All my HTTP requests return `index_not_found_exception`, what's wrong?

This probably means that the initial index-building ([described above](#technical)) never completed. Check the following: 

1. That the machine you are running the indexer/yente app on is able to fetch data via HTTPS from `data.opensanctions.org`.
2. That a temporary, timestamped index (see above) was created in ElasticSearch (which means indexing has at least begun).
3. That the final `yente-entities-all` was created. If a timestamped index was created, but the final alias does not exist, it likely means that indexing was aborted half-way. This could be because a) the downloaded data could not be fetched or stored in its entirety, b) the indexing of entities was aborted, perhaps due to a lack of system memory or compute time.

While debugging this issue, you can use `http://yente-service:8000/updatez?token=UPDATE_TOKEN&force=true` to trigger a forced re-index of the data at any time. The `UPDATE_TOKEN` is a secret token you can define in the environment of the `yente` pod using the `YENTE_UPDATE_TOKEN` variable.

### Why is it called yente?

yente [makes you a match](https://www.youtube.com/watch?v=jVGNdB6iEeA).