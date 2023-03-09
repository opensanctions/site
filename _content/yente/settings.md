---
title: Configuring yente
menu_path: /docs/yente/
summary:
    The yente service is built to require a minimum of configuration, but several environment variables can be used to define the ElasticSearch instance to use, and to define a custom data manifest.
---

**yente:** [Intro](/docs/yente) · [Deploy](/docs/yente/deploy/) · **Settings** · [Custom datasets](/docs/yente/datasets/) · [Troubleshooting](/docs/yente/trouble/)


The API server has a few operations-related settings, which are passed as environment variables. The settings include:

- ``YENTE_ENDPOINT_URL`` the URL which should be used to generate external links back to
  the API server, e.g. ``https://yente.mycompany.com``.
- ``YENTE_MANIFEST`` specify the path of the `manifest.yml` that defines the datasets exposed by the service. This is used to [add extra datasets to the service](/docs/yente/datasets/) or to define custom scopes for entity screening.
- ``YENTE_SCHEDULE`` gives the frequency at which new data will be indexed as a a [crontab](https://crontab.guru/).
- ``YENTE_AUTO_REINDEX`` can be set to ``false`` to disable automatic data updates and force data to be re-indexed only via the command line (``yente reindex``).
- ``YENTE_UPDATE_TOKEN`` should be set to a secret string. The token is used with a `POST` request to the `/updatez` endpoint to force an immediate re-indexing of the data.
- ``YENTE_ELASTICSEARCH_URL``: Elasticsearch URL, defaults to `http://localhost:9200`.
- ``YENTE_ELASTICSEARCH_INDEX``: Elasticsearch index, defaults to `yente`.
- ``YENTE_ELASTICSEARCH_CLOUD_ID``: If you are using Elastic Cloud and want to use the ID rather than endpoint URL.
- ``YENTE_ELASTICSEARCH_USERNAME``: Elasticsearch username. **Required** if connection using ``YENTE_ES_CLOUD_ID``.
- ``YENTE_ELASTICSEARCH_PASSWORD``: Elasticsearch password. **Required** if connection using ``YENTE_ES_CLOUD_ID``.

## Managing data updates

By default, `yente` will check for an updated build of the OpenSanctions database published at `data.opensanctions.org` every 30 minutes. If a fresh version is found, an indexing process will be spawned and load the data into the ElasticSearch index.

You can change this behaviour in two ways:

* Specify a [crontab](https://crontab.guru/) for `YENTE_SCHEDULE` in your environment in order to run the auto-update process at a different interval. Setting the environment variable `YENTE_AUTO_REINDEX` to `false` will disable automatic data updates entirely.
* If you wish to manually run an indexing process, you can do so by calling the script `yente/reindex.py`. This command must be invoked inside the application container. For example, in a docker-compose based environment, the full command would be: `docker-compose run app python3 yente/reindex.py`.

The production settings for api.ppensanctions.org use these two options in conjunction to move reindexing to a separate Kubernetes CronJob that allows for stricter resource management.
