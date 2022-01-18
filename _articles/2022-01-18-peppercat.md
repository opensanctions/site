---
title: The CIA lost track of who runs the UK, so I picked up the slack
summary: |
    A guest post from Tony Bowden about his efforts to build an open source dataset
    of world leaders inside of Wikidata, the structured-data version of Wikipedia.
---

When I started building [EveryPolitician](http://everypolitician.org), back in 2015, I chose not to include Heads of Government and Cabinet Ministers, in part because I believed these were already well covered elsewhere. Turns out, I was wrong.

The main source people tend to use for this data is the [CIA World Leaders directory](https://www.cia.gov/resources/world-leaders/) ([OpenSanctions dataset](https://www.opensanctions.org/datasets/us_cia_world_leaders/)). This covers approximately 200 governments around the world, and claims to be published weekly. But it has a lot of problems.

<img class="img-fluid article-image" src="https://assets.pudo.org/opensanctions/images/peppercat-cia.png">

It's not as up to date as "published weekly" implies. It frequently lags far behind even full changes of government, never mind reshuffles or single member changes. In some cases it can be many years out of date.

[Fredis Refunjol](https://www.opensanctions.org/entities/Q1266936/) is still listed as the Governor of Aruba, for example, even though he left office in 2016. The most out of date I’ve found so far is [Philibert Andzembe](https://www.opensanctions.org/entities/us-cia-cameroon-philibert-andzembe-governor-central-bank/), who was fired as the Governor of the Bank of Central African States back in 2009.

I’m not convinced the site has had *any* updates at all since November 2020. But they don't make it easy to tell that. As they don’t provide any sources, it's not always easy to even check if the published information is correct.

When you do find an error, there also isn’t really much you can do about it. There’s no obvious way to let anyone involved with this project directly know about issues, just a generic (and slightly scary) CIA/OPA contact form. A December request from the OpenSanctions team regarding the maintenance of the World Leaders database remains unanswered.

There are also some surprising omissions. [For the UK](https://www.cia.gov/resources/government/united-kingdom/), the data is definitely over a year out of date, but also manages to entirely leave out some interesting positions, like the Prime Minister and Foreign Secretary!

The list of countries and territories also isn't as widespread as might be hoped. Thankfully it isn't restricted to places where the US has diplomatic relations, but the coverage is noticeably narrower than the 267 covered by their [World Factbook](https://www.cia.gov/the-world-factbook/).

There might be some sort of consistency behind what's included, but I've struggled to find it. Aruba is there, but not Curaçao or Sint Maarten; or indeed Greenland, or Scotland, both of which are probably significantly more autonomous. Yet Bermuda somehow also gets in.

And of course the most notable omission is the US government itself. That makes some degree of sense in that it's a US-based list of *foreign* governments, but it was initially quite a surprise to me when I first realised it was missing.

The US-centric view of the world pops up in other ways too. Perhaps the most obvious is the inclusion of each country's Ambassador to the US, and Permanent Representative to the UN in New York, but not any of their other (often much more domestically important) diplomats.

But even beyond all this, there are some deeper problems. The main one is that everything is entirely plain text ([Strings, not Things](https://medium.com/occrp-unreported/things-not-strings-knowledge-graphs-for-investigative-reporting-9d8a26913f65)). This is about as far from "Linked Data" as you can get: no-one even has IDs that could be pointed at from anywhere else.

To get any further information on any of these people you’ll have to search for them elsewhere by name (and manually resolve any disambiguation). To make this harder, the names have been Amercanised: [Andrej Babis](https://www.opensanctions.org/entities/Q10819807/), rather than Babiš; Juri, rather than Jüri, Ratas etc.

This is, at its heart, a print publication that has been quite awkwardly dumped onto a website, and the world really deserves something better.

These days, the ideal home for this sort of information is, of course, [Wikidata](https://www.wikidata.org), with everything wonderfully linked together in glorious multi-lingual technicolour.

So a few months ago I started digging into how good the coverage was there, and how well things get kept up to date. Unfortunately, beyond a couple of dozen countries the answer quickly came back as "not very".

For about half the countries in the world, at least 80% of the key people did have Wikidata items, but for about half of those, there was nothing to show what offices they currently held. 

And in a significant number of cases a key reason for that was that Wikidata didn't even have an item yet for the position (e.g. [Minister of Education of Bolivia](https://www.wikidata.org/wiki/Q110419069)). There'd be an item for the Ministry, or the List of Ministers, but not the Minister itself.

Of the ones who _did_ have statements about holding a relevant position, a large amount of those were entirely un-dated, or claimed to be current, even though the person left office several years ago.

And in the _other_ half of the world, coverage falls off fast. The average number of government ministers already existing in Wikidata falls below 20% in lots of countries, and up-to-date information on their positions is lower still.

Unlike the CIA database, however, with Wikidata I can actually *do* something about this. So I've spent the last few months trying to make this a lot better.

I’ve been working my way around the world, finding official lists of government ministers, bringing Wikidata up-to-date with them, and setting up alerts to let me know any time anything changes, to help ensure things _stay_ up to date.

Unfortunately Wikidata's single-item-based view, coupled with inconsistent modelling across different countries, makes it really difficult to see what's missing or incorrect without becoming an expert in both SPARQL and comparative political structures of the world.

So, to make it more likely that someone with much better local knowledge than me can spot obvious errors or omissions (given that even official sites are often out of date), I've also built a simple site, [Peppercat.org](https://peppercat.org), to show everything in a consistent format.

<img class="img-fluid article-image" src="https://assets.pudo.org/opensanctions/images/peppercat-home.png">

Currently this has Minister-level data, plus a sprinkling of other key positions (Attorney General, Head of the Military, Governor of the Central Bank, etc.) for over 150 places, and I'm trying to add another one new one every day.

But it’s starting to get progressively harder for me to find good source lists for many of the places currently missing. This is where I could really do with some help.

<img class="img-fluid article-image" src="https://assets.pudo.org/opensanctions/images/peppercat-coverage.png">

It’s usually not _too_ hard to find sources with lists of government Ministers at a single point of time (e.g. when a Cabinet was initially appointed, or there was a reshuffle). But it’s much better if there’s an official list that gets updated when there are changes.

So if you know where to find such a list for [somewhere that Peppercat doesn’t include yet](https://peppercat.org/), [please do let me know](https://peppercat.org/about.html), and I’ll look do my best to include it, and check the source daily for updates.

And, of course, more people looking for errors or out of date information, and either fixing things directly in Wikidata, or letting me know so I can investigate, is also always very helpful.

But mostly I’m hoping that people will start to *use* the data in interesting ways. Having everything directly in Wikidata means that much of it is already enhanced with lots of basic biographical information (gender, date and place of birth, etc), their career history, and an ever-increasing list of identifiers to cross-match with other datasets.

Comprehensive and up-to-date policial information is critical in civic tech, academia, data journalism, PEP checking, and many other areas. And Wikidata is going to be a key element of all those areas. So: explore and play, help make the data even better, and let us know how you get on!

*Tony Bowden created the EveryPolitician project at mySociety in 2015, and led it to becoming a key dataset of politicians worldwide. For five years before that he ran a funding and training program for civic tech projects across Central and Eastern Europe, the Balkans, the South Caucasus, Latin America, and Sub-Saharan Africa.*
