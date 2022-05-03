---
title: Commercial use FAQ
summary: |
    Below you will find answers to the most common questions asked by commercial
    partners who wish to license the dataset for business purposes.
---

*Please also have a look at our [project-wide FAQ](/docs/api/), which covers product-related questions (e.g. update frequency, project scope).*

### Why should I use OpenSanctions?

OpenSanctions builds and publishes a high-quality, up-to-date dataset of entities of interest (people and companies), including [international sanctions targets](/datasets/sanctions/), known [criminal figures](/datasets/crime/) and [politically exposed persons (PEPs)](/datasets/peps/). To do so, we consolidate and deduplicate data from hundreds of sources covering 240+ countries and territories.

We build the **raw materials innovative services need**. By making this data a readily accessible commodity, we help businesses to reduce their exposure to risk and startups to develop cutting-edge technology and services.

We **do things openly and transparently**. That’s why, besides making our [bulk data easily accessible](/docs/usage/), [publishing our code](https://github.com/opensanctions/opensanctions) and [details about our algorithms](/matcher/), we also invite commercial partners to [self-host our API for enhanced privacy and performance](/docs/self-hosted/).

### What is the value-add from OpenSanctions?

* **Our data pipeline** pulls in entities from a [wide range of official sources and research-driven databases](/datasets/), creating a unique set of targets.
* **[Entity deduplication](/articles/2021-11-11-deduplication/)** avoids redundant matches and contextualizes entities across data sources to build comprehensive profiles.
* **Meticulous data cleaning** creates a [coherent data structure](/reference/) with well-defined field names, formats, and country codes. Entity names are stored in multiple alphabets.
* **Our graph of entities** contains rich connectivity information, showing family, ownership and business ties between actors.
* **Our [API service](/docs/api/)** allows you to search and perform precise matching of your own records against our database.

### What do people use OpenSanctions for?

It’s really up to you! Some of the use cases we have seen include: 

* Building know-your-customer and enhanced due diligence workflows for regulated industries and organizations that want to understand their own risk exposure.
* Expanding anti-corruption and anti-money laundering investigations using open source intelligence and network analysis.
* Complementing traditional offerings (Refinitiv, LexisNexis, DowJones) with higher-frequency checks. 

### What forms of use are covered by commercial licenses?

We want people to use the data as **widely and flexibly as possible**. Commercial license-holders can use the data for any purpose (in-house or in products) that build upon the data. We simply ask that you don’t distribute the data in a way that will directly compete with our bulk data offering (building KYC APIs is enouraged, of course!).

### How do I acquire a commercial license?

Please contact us at **info@opensanctions.org** to set up a brief call with our team. (You can also [sneak into the calendar](https://calendly.com/flindenberg/opensanctions-intro) directly!)

If you need no further convincing, you can also just enroll for a subscription of the [sanctions data](https://buy.stripe.com/5kAdRNad3fmhg6ceV4), [combined sanctions and PEPs data](https://buy.stripe.com/14kfZV5WN8XT9HO28j), or [purchase access to our API service](https://buy.stripe.com/aEU6pl4SJ6PL7zG3co).

### Who is exempted from commercial licensing?

OpenSanctions is fully free to use for: 

* any journalistic media that publish their findings in the public interest
* advocacy and non-profit groups working to improve democratic governance
* any public institution of a country invaded by the Russian Armed Forces (UA, GE, MD, BY, KZ).

Please note that activities undertaken by for-profit businesses that do not directly generate revenue (product demos, showcases) are considered commercial use, unless otherwise agreed.

### Do you offer a trial/evaluation period?

Yes. We’re keen to support projects or products that have not gone to market yet by granting a heavily discounted use of the OpenSanctions database during the development period. 

### Do you offer usage-based licensing?

Not typically. We prefer to keep things simple by using flat monthly pricing. If your own pricing structure does not allow you to make such a commitment, please [get in touch](/contact/) and we’ll find a solution.

### What data formats do you make available?

OpenSanctions internally uses a rich data model called FollowTheMoney to store its data. For developers, we recommend using the [JSON-based data exports](/docs/usage/#entities.ftm.json), while analysts are encouraged to explore the simplified [CSV format](/docs/usage/#targets.simple.csv) we provide exports in.

We’re keen to consider additional export formats that our partners might find useful. Please [contact us](/contact/) to share your requirements and discuss an implementation strategy.

### Does OpenSanctions include beneficial ownership data?

At the moment, we only publish whatever holdings and beneficial owners are specified in our data sources (e.g. the [US OFAC SDN Advanced Format](https://home.treasury.gov/policy-issues/financial-sanctions/specially-designated-nationals-list-data-formats-data-schemas)).

A big part of [our roadmap](/articles/2022-03-14-future-project/) is to build connections with other datasets, such as [OpenCorporates](https://opencorporates.com/) and [OpenOwnership](https://register.openownership.org/), in particular in order to document the corporate ownership structures associated with sanctioned entities (cf. [OFAC 50% rule](https://home.treasury.gov/system/files/126/licensing_guidance.pdf)). 

### How does payment work?

We commonly use two methods for payment:

* **Automated payments via [Stripe](https://stripe.com/)**. Stripe accepts a [broad range of payment methods](https://stripe.com/global), including credit and debit cards.
* **SEPA bank transfers**. We will issue regular invoices for your payment. To reduce bookkeeping overhead, we’re happy to agree on a quarterly or semi-annual billing schedule.

OpenSanctions is based in Germany. We may be required to apply 19% VAT on invoices inside the EU where the reverse charge method does not apply.

### What are the specific terms for using the service?

We have a [standard service agreement](https://docs.google.com/document/d/1uLEXJOH-27WENEiDAUlcfbAClkT3Ul08Y6kR1h6V4WE/edit) that covers the use of the OpenSanctions service. For customers who wish to substantially alter the provided terms, we charge a $950 setup fee to help cover our administrative expenses.

### What happens if OpenSanctions discontinues its service?

Thanks to the open source nature of our product, you would not lose access to the data for some time.

Any technologist or organization could pick up [our technology](https://github.com/opensanctions/opensanctions) and continue maintenance, hopefully relying on the same network of partners we are developing. We’re building a community resource, not a startup.

