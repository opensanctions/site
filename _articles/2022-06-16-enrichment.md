---
title: "Weaving a deeper sanctions web using data enrichment"
image_url: https://assets.opensanctions.org/images/articles/enrichment/prevezon2.png
summary: |
    We're adding linked data from the GLEIF company database and the ICIJ 
    OffshoreLeaks to enrich the corporate targets in our system with relevant 
    ownership or officership relations.
---

Running a sanctions or PEPs check is about more than just looking up a name on a government list. To truly understand if a company or person is affected by sanctions and poses a risk, analysts also need to consider their network - entities they are affiliated with, companies they own, even personal relationships. 

<img class="img-fluid" src="https://assets.opensanctions.org/images/articles/enrichment/prevezon2.png">
<p class="img-caption">
    Tracking complex corporate networks is the bread and butter of financial crime
    investigations (Graphic: US v. Prevezon)
</p>

The US Office of Foreign Assets Control (OFAC), as well as some other authorities, have even made this a legal requirement: US sanctions targeted at a designated person or company apply not just to the entity itself, but also to all companies majority-owned or controlled by that entity. This rule, known as [the “shadow OFAC” provision](https://home.treasury.gov/system/files/126/licensing_guidance.pdf), has irrevocably married sanctions screening and beneficial ownership analysis.

That’s why, as the OpenSanctions dataset matures, building a deeper and richer network around sanctions targets will be a priority for the project. To do that, we’re using a process of data enrichment, in which we import extra information - a list of subsidiaries of a sanctioned company, or more detailed information about a person - from external databases.

## Linking to the leaks 

<img class="img-left" src="https://assets.opensanctions.org/images/articles/enrichment/ol_ayad2.png">Our first target for this enrichment is the [ICIJ Offshore Leaks database](/datasets/icij_offshoreleaks). It is the published version of the data underlying multiple cross-border reporting projects, including the Panama Papers, Pandora Papers and Bahamas Leaks.

It lists the previously hidden beneficial owners of hundreds of thousands of companies. By intersecting it with our sanctions database, we can pull in subsidiaries, parent companies, and hidden assets. Up until now, we’ve [linked up 102 sanctioned entities present in the Offshore Leaks](/search/?scope=offshoreleaks&topics=sanction), and imported 227 additional companies and people that are in some way related to those.

<div class="clearfix"></div>

## Legal Entity Identifiers

<img class="img-right" src="https://assets.opensanctions.org/images/articles/enrichment/gleif-logo.png"> While Offshore Leaks will help us find the owner of mysterious offshore companies, the [Global Legal Entity Identifier Foundation](https://gleif.org/) (GLEIF) offers a very different source of context: a [global database of corporations that have been issued an international company code](/datasets/gleif/) (LEI). These identifiers have been assigned to many banks and companies that issue securities. They also provide some ownership information for each company with a LEI, providing us helpful context especially for the Russian banks that have been the target of recent sanctions. In total, we’ve [matched up 148 companies to GLEIF’s database](/search/?scope=gleif&topics=sanction) so far, bringing in over 480 additional relationships.

## Get the Offshore Leaks and GLEIF data in full

One more thing. The mechanism we use for cross-referencing our database with these external sources is our own [matching API service](/api/). We’ve essentially converted the full datasets for Offshore Leaks and GLEIF to the [FollowTheMoney data format](/docs/entities/) used by OpenSanctions. Which - you guessed it - means those files are also openly available for those who would like to use the full datasets:

* GLEIF: [Source code](https://github.com/opensanctions/gleif), [JSON export](https://data.opensanctions.org/contrib/gleif/gleif.json) (754MB) 
* ICIJ OffshoreLeaks: [Source code](https://github.com/opensanctions/icij-offshoreleaks), [JSON export](https://data.opensanctions.org/contrib/icij-offshoreleaks/full-oldb.json) (1.2GB)

## What’s next?

With the technical framework for data enrichment in place, it will become easy for us to link up new sources. Our focus will be on company and beneficial ownership databases, for example, the EGRUL database of the Russian Federation. We’re also using enrichment against non-corporate data sources, like [Wikidata](/datasets/wikidata/) and [Nominatim](/datasets/nominatim/), the address geocoding service of the OpenStreetMap project.

Overall, the plan is to build a deep and comprehensive reference database for sanctions and associated entities that can be used to go beneath the surface of what names are listed. 
