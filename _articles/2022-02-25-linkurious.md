---
title: "Using graph analytics to find evidence of corruption"
image_url: https://assets.pudo.org/opensanctions/images/webinar.png
summary: |
    In cooperation with Linkurious, we worked to develop a network graph view
    of the OpenSanctions data and demo how it can be used in anti-corruption
    and money laundering investigations.
---

<a href="https://www.bigmarker.com/linkurious/Finding-evidence-of-corruption-and-money-laundering-with-open-data">
    <img class="img-fluid" src="https://assets.pudo.org/opensanctions/images/webinar.png">
</a><br/><br/>

During [the webinar](https://www.bigmarker.com/linkurious/Finding-evidence-of-corruption-and-money-laundering-with-open-data), we demonstrated the powerful combination of the [Linkurious](https://linkurious.com) graph analytics platform and the OpenSanctions entity graph of sanctions and politically exposed persons.

The demonstration showed a network combining OpenSanctions data with the [ICIJ OffshoreLeaks database](https://offshoreleaks.icij.org/), which includes offshore company details published as part of the Panama Papers, Paradise and Pandora Papers investigations. Using only name-based matching, the graph allows us to draw the lines between sanctioned individuals, PEPs and potentially shady offshores. We also demonstrated how stored queries and alert-driven case management can be used to scale up this investigative process.

Linkurious also documented [using graph analytics for PEP screening](https://linkurious.com/blog/pep-screening-graph-analytics/) in a case study blog post.

## Use the demo data, it's public!

The underlying mechanism for this demo combines the OpenSanctions and OffshoreLeaks data into a [CYPHER](https://neo4j.com/developer/cypher/) script that will import the data into the [Neo4J graph database](https://neo4j.com/). From there, it can be analysed or imported into the Linkurious analysis tool.

The data, as well as the script used to generate it, is available from our GitHub repository and can be used to replicate and expand the demonstrated functions:

* **[opensanctions/offshore-graph](https://github.com/opensanctions/offshore-graph)**

As always, we're keen to hear any feedback, suggestions and ideas on this! And, of course, get in touch with [Linkurious](https://linkurious.com) if you're interested in trying out their power tool for investigations.