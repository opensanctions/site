---
title: Frequently Asked Questions
section: about
summary: |
    We answer the most common questions about the OpenSanctions project, the dataset it
    produces and our content policies.
---

### What is OpenSanctions?

OpenSanctions brings together sanctions lists, lists of [politically exposed persons (PEPs)](#peps), and parties excluded from government contracts in different countries. This data is otherwise difficult to query because it is published in a multitude of semi-structured formats across dozens of government websites. OpenSanctions collects the data and converts it into a [well-defined and expressive format](/reference/) for [easy use and integration](/docs/bulk/) into third-party systems.


### Does OpenSanctions contain only sanctions lists?

No, we are just bad at naming things. The project includes sanctions lists, lists of politicians, ban lists used in government procurement, lists of known terrorists and other data sources relevant to journalistic research and due diligence. See our [inclusion criteria](/docs/criteria/) for details.


### Who is this for?

OpenSanctions is a resource for journalists and civil society who need to perform due diligence-style tasks (e.g. searching for persons of interest in a leak or open dataset), and for companies in the fintech/regtech space that need to perform basic know-your-customer checks.

OpenSanctions is an open project, anyone is invited to use the datasets, the [code base used to generate it](https://github.com/opensanctions/opensanctions), or to contribute additional information.


### Where does the data come from?

Our preferred sources are official datasets published by governments and other authorities all over the world; including commonly used sanctions and ban lists. Much of the data related to politically exposed persons is collected via Wikidata. In the future, we hope to also include information from media reporting, and relevant litigation.


### <a id="updates"></a> How frequently is OpenSanctions updated?

Most data sources are updated daily and refreshed data extracts are published several times a day. You can see a list of any [errors or warnings each dataset](/issues/) has generated. 

For data sources that require screen scraping rather than publishing structured data, a HTTP response cache with a maximum age of ten days is used to avoid running into rate limiting errors.


### <a id="api"></a> Is there an API for matching entity lists against OpenSanctions?

The core goal of OpenSanctions is providing high-quality bulk data access to its users. Besides doing so, but we also maintain an [OpenSanctions API](/api/) that makes it easy to search the data or to match the sanctions data against a list of customers or suspects.

If you provide another API that uses the OpenSanctions data, we’d love to hear about it and link to it from this site. Please take note of the [commercial licensing](/licensing/) rules if you do so.


### Does OpenSanctions use the same identifiers as Wikidata?

Nicely spotted, yes! OpenSanctions uses Wikidata QIDs for all humans which we've been able to match between both databases. This makes it easy to link up additional data from Wikidata, or other databases which utilise the same identification scheme.

While OpenSanctions does match persons against [Wikidata](/datasets/wikidata/), we don't do the same for other legal entities like companies or organizations. Wikidata talks about corporation as social constructs ("X is a large Russian oil company"), while sanctions apply to these entities in their most strict legal sense, where one corporation is often composed of hundreds or thousands of indidivual entities. Instead of Wikidata, we're matching company records only to other company-centric databases like [OpenCorporates](/datasets/opencorporates/).


### Can I contribute a new data source?

Yes, we’re open to contributions. We're particularly keen to add sources that include information from criminal cases, and family and associates of politically exposed persons. Please write a GitHub issue or join our team Slack in order to get started.


### Can I use this data for commercial purposes?

If you use OpenSanctions for your business, please [acquire a data license](/licensing/) to guarantee the continued development and operation of the project.


### <a id="peps"></a> What is a politically exposed person (PEP)?

Politically exposed persons (PEP) is a term from the banking industry to describe individuals
who have been entrusted with a prominent public function. This might include a members of
cabinets, parliaments, senior public servants or people that run state-owned companies.

The concept [is important](https://www.fatf-gafi.org/content/dam/fatf/documents/recommendations/Guidance-PEP-Rec12-22.pdf) because PEPs and members of their family should be the subject of enhanced public scrutiny. This is also mandated by financial crime laws in many countries.

OpenSanctions includes a [PEPs collection](/datasets/peps/) that combines lists of
politicians from multiple origins.


### <a id="collections"></a> What is a collection?

A collection is a bundle of entities (people, companies, etc.) from multiple data sources. These sources might have a similar topical focus (e.g. international sanctions, or procurement bans) that sets the theme of the collection. Data users usually pick a relevant collection when integrating data into an upstream application.

OpenSanctions is an effort to acquire relevant data from a large array of online sources and to bundle it into more useful, synthetic entity lists for our users. To provide transparency and choice, we also re-publish the entities from each data source separately.


### Will you delete data about me?

OpenSanctions, by its nature, includes data about many individuals - particularly those mentioned on international sanctions lists, those holding a public office, and those included in published criminal databases. We believe that processing and publishing this data is in
the public interest.

If information about you is included in this site and you would like to see it removed, please contact the initial publisher of the information, e.g. the authority publishing the sanctions list, the law enforcement body etc. to discuss the removal of your information. 

Once that removal has been processed, please allow for up to one week for the information to disappear from OpenSanctions.
