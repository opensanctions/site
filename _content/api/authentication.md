---
title: Authentication
summary: >
    When using the hosted OpenSanctions API, you must always provide an API key when you make requests.
---

**Note:** You need an authentication to use the [hosted API](/api/). If you're running the [yente](/docs/self-hosted/) application, you can disregard this page.

To use the OpenSanctions API, you need an API key to identify yourself. Please visit the [API product
page](/api/) or [contact us](/contact/) to learn more. OpenSanctions will issue free API keys to non-commercial users and those working in media companies.

Once you have obtained an API key, you must include it with each request sent to the service. The key can be provided either in the `Authorization` HTTP header, or using the `?api_key=` query parameter.

For the header option, please include the key into your request like this:

```
Authorization: ApiKey xxxxxxxxxxxxxxxxxxxxxxxx
```

When using the query parameter, you can simply append it to the request URL:

```
https://api.opensanctions.org/search/default?q=test&api_key=xxxxxxxxxx
```

### Python example

Here's a code snippet that demonstrates how you can include the API key in each request when using the Python `requests` library:

```python
import os
import requests

API_URL = "http://api.opensanctions.org"
# Read an environment variable to get the API key:
API_KEY = os.environ.get("OPENSANCTIONS_API_KEY")

session = requests.Session()
session.headers['Authorization'] = f"ApiKey {API_KEY}"

# Fetch an entity:
response = session.get(f"{API_URL}/entities/Q7747")
response.raise_for_status()
entity_data = response.json()

# Run a match query:
query = {"schema": "Person", "properties": {"name": ["Vladimir Putin"]}}
request = {"queries": {"query": query}}
response = session.post(f"{API_URL}/match/default", json=query)
response.raise_for_status()
results = response.json().get("responses").get("query").get("results")
```
