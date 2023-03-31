---
title: Commercial use FAQ
section: about
summary: |
    Below you will find answers to the most common questions asked by commercial
    partners who wish to license the dataset for business purposes.
---

Please also have a look at our [project-wide FAQ](/docs/faq/), which covers product-related questions (e.g. update frequency, project scope).

### Why should I use OpenSanctions?

OpenSanctions builds and publishes a high-quality, up-to-date dataset of entities of interest (people and companies), including [international sanctions targets](/datasets/sanctions/), known [criminal figures](/datasets/crime/) and [politically exposed persons (PEPs)](/datasets/peps/). To do so, we consolidate and deduplicate data from hundreds of sources covering 240+ countries and territories.

We build the **raw materials innovative services need**. By making this data a readily accessible commodity, we help businesses to reduce their exposure to risk and startups to develop cutting-edge technology and services.

We **do things openly and transparently**. That’s why, besides making our [bulk data easily accessible](/docs/bulk/), [publishing our code](https://github.com/opensanctions/opensanctions) and [details about our algorithms](/matcher/), we also invite commercial partners to [self-host our API for enhanced privacy and performance](/docs/self-hosted/).

### What is the value-add from OpenSanctions?

* **Our data pipeline** pulls in entities from a [wide range of official sources and research-driven databases](/datasets/), creating a unique set of targets.
* **[Entity deduplication](/articles/2021-11-11-deduplication/)** avoids redundant matches and contextualizes entities across data sources to build comprehensive profiles.
* **Meticulous data cleaning** creates a [coherent data structure](/reference/) with well-defined field names, formats, and country codes. Entity names are stored in multiple alphabets.
* **Our graph of entities** contains rich connectivity information, showing family, ownership and business ties between actors.
* **Our [API service](/api/)** allows you to search and perform precise matching of your own records against our database.

### What is included in each pricing tier?

Our pricing is designed such that 

* **Internal use bulk data** includes the right to use the full datasert for any in-house purpose: screening your customers (for example, using our [self-hosted API](/docs/self-hosted/) software), powering your investigations, enriching an internal knowledge graph. This also includes the development of customer-facing applications in which significant value is added.
* **OEM bulk data** lets you use the OpenSanctions data as a building block in any external-facing products and services that are principally based on the data, and it can also include the re-sale of the data as part of your own data solutions.
* **OpenSanctions API** lets you use our [API service](/api/) to query and match entities. You can use the service on a pay-as-you-go basis, or subscribe to a bulk license and host the matching software [on your own premises](/docs/self-hosted).

If you're unsure if your intended use case qualifies as **internal use**, please just [contact us](/contact/) so we can learn a bit about your needs and find a fair solution.

The licensing cost for OpenSanctions amounts to about one engineering day per month. We think that with the level of data cleaning and de-duplication we provide, our comprehensive documentation and ever-growing collections of crawlers, this is a good deal.

### What do people use OpenSanctions for?

It’s really up to you! Some of the use cases we have seen include: 

* Building know-your-customer and enhanced due diligence workflows for regulated industries and organizations that want to understand their own risk exposure.
* Expanding anti-corruption and anti-money laundering investigations using open source intelligence and network analysis.
* Complementing traditional offerings (Refinitiv, LexisNexis, DowJones) with higher-frequency checks. 

### How do I acquire a commercial license?

Please contact us at **info@opensanctions.org** to set up a brief call with our team. (You can also [sneak into the calendar](/meeting/) directly!)

If you need no further convincing, you can also just [purchase access to our API service](/api/) or [internal use bulk data](https://buy.stripe.com/8wMeVRgBrca54nu5kD) subscription.

### <a id="exemptions"></a> Who is exempted from commercial licensing?

Beyond the definition of [non-commercial use](https://creativecommons.org/faq/#does-my-use-violate-the-noncommercial-clause-of-the-licenses) provided by Creative Commons, we also grant a zero-cost license to the groups listed below:

* any journalistic media that publish their findings [in the public interest](https://gijn.org/membership-in-gijn/)
* advocacy and non-profit groups working to improve democratic governance
* any public institution of a country invaded by the Russian Armed Forces (UA, GE, MD, BY, KZ).

Please note that activities undertaken by for-profit businesses that do not directly generate revenue (product demos, showcases) are considered commercial use, unless otherwise agreed.

### Do you offer a trial/evaluation period?

Yes. We’re keen to support projects or products that have not gone to market yet by granting a heavily discounted use of the OpenSanctions database during the development period. 

### Do you offer usage-based licensing?

While our [API service](/api/) is metered, we don't generally consider usage as a factor in how we price the bulk data service. If your own pricing structure for bulk data use is prohibitive for you, please [get in touch](/contact/) and we’ll find a solution.

### What data formats do you make available?

OpenSanctions internally uses a rich data model called FollowTheMoney to store its data. For developers, we recommend using the [JSON-based data exports](/docs/bulk/json/), while analysts are encouraged to explore the simplified [CSV format](/docs/bulk/csv/) we provide exports in.

We’re keen to consider additional export formats that our partners might find useful. Please [contact us](/contact/) to share your requirements and discuss an implementation strategy.

### Does OpenSanctions include beneficial ownership data?

At the moment, we only publish whatever holdings and beneficial owners are specified in our data sources (e.g. the [US OFAC SDN Advanced Format](https://home.treasury.gov/policy-issues/financial-sanctions/specially-designated-nationals-list-data-formats-data-schemas)).

A big part of [our roadmap](/articles/2022-03-14-future-project/) is to build connections with other datasets, such as [OpenCorporates](https://opencorporates.com/) and [OpenOwnership](https://register.openownership.org/), in particular in order to document the corporate ownership structures associated with sanctioned entities (cf. [OFAC 50% rule](https://home.treasury.gov/system/files/126/licensing_guidance.pdf)). 

### How does payment work?

We commonly use two methods for payment:

* **Automated payments via [Stripe](https://stripe.com/)**. Stripe accepts a [broad range of payment methods](https://stripe.com/global), including credit and debit cards.
* **SEPA bank transfers**. We will issue regular invoices for your payment. To reduce bookkeeping overhead, we’re happy to agree on a quarterly or semi-annual billing schedule.

OpenSanctions is based in Germany. We may be required to apply 19% VAT on invoices inside the EU where the reverse charge method does not apply.

### What are the terms for using the service and bulk data?

We have a [standard service agreement](https://docs.google.com/document/d/1uLEXJOH-27WENEiDAUlcfbAClkT3Ul08Y6kR1h6V4WE/edit) that covers the use of the OpenSanctions service.

### <a id="redlines"></a> Can we change the proposed service agreement?

We founded OpenSanctions as an engineering-centric business that creates high-quality data  for risk management and sanctions compliance. Our goal is to provide compelling KYC/AML information at a competitive price.

To make this possible, we rely on the cooperation of our prospective business partners. Our prices are structured to enable the development and maintenance of the products we offer; our prices are not structured for us to retain a sales-focused legal team.

With that in mind, here are our asks:

* Our [service agreement](https://docs.google.com/document/d/1uLEXJOH-27WENEiDAUlcfbAClkT3Ul08Y6kR1h6V4WE/edit) has been reviewed and approved by Fortune 500 companies. If you can sign it as-is, please do so. Please don’t make it a point of pride to alter the proposed terms.
* If you need to change the agreement, we’ll consider our relationship an OEM use of the data. Internal-use terms are fully standardised.
* All legal negotiations have to be conducted in writing so that we can consult outside counsel.
* Don’t change the jurisdiction. We’re based in Germany, a jurisdiction that puts significant regulatory and liability-related responsibilities on us. You’re in great hands.

If the suggestion of a limited redlining process seems unrealistic to you, this may be an indication that you need to do business with the LexisNexis Industrial Complex.

### What happens if OpenSanctions discontinues its service?

Thanks to the open source nature of our product, you would not lose access to the data for some time.

Any technologist or organization could pick up [our technology](https://github.com/opensanctions/opensanctions) and continue maintenance, hopefully relying on the same network of partners we are developing. We’re building a community resource, not a startup.

