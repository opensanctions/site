---
title: Deploying yente in your infrastructure
menu_path: /docs/yente/
summary:
    yente is an open source data match-making API. It provides functions search, retrieve or match FollowTheMoney entities, including people, companies or vessels that are subject to international sanctions. 
---

**yente:** [Intro](/docs/yente) · **Deployment** · [Settings](/docs/yente/settings/) · [Custom datasets](/docs/yente/datasets/) · [FAQ](/docs/yente/faq/)


In order to deploy `yente` on your own servers, we recommend you use `docker-compose` (or another Docker orchestration tool) to pull and run the pre-built containers. For example, you can download the `docker-compose.yml` in the repository and use it to boot an instance of the system:

```bash
mkdir -p yente && cd yente
wget https://raw.githubusercontent.com/opensanctions/yente/main/docker-compose.yml
docker-compose up
```

This will make the service available on Port 8000 of the local machine. You may have to wait for five to ten minutes until the service has finished indexing the data when it is first started.

**Next:** [Configure yente](/docs/yente/settings/)

## Using Kubernetes

If you run the container in a cluster management system like Kubernetes, you will need to run both of the services defined in the compose file (the API and ElasticSearch instance). You may also need to assign the API container network policy permissions to fetch data from `data.opensanctions.org` once every hour so that it can update itself.

* GitHub: [Example kubernetes configuration](https://github.com/opensanctions/yente/blob/main/kubernetes.example.yml)
* Docker image: ``ghcr.io/opensanctions/yente:latest``