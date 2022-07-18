---
title: Digging into sanctioned companies using OpenCorporates
image_url: https://assets.pudo.org/opensanctions/images/opencorporates-home.png
summary: |
    Both OpenSanctions and OpenCorporates provide powerful data building blocks for
    compliance. By linking our databases up, we make it easier to track assets or
    assess exposure.
---

<!--img class="img-fluid" src="https://assets.pudo.org/opensanctions/images/opencorporates-home.png" -->

The clue is in the name: We’ve modeled OpenSanctions after [OpenCorporates](https://opencorporates.com/), the open database of companies, in some important ways. That inspiration is not limited to making sanctions lists publicly searchable and viewable, but also includes putting a focus on clear data provenance, and using commercial licensing as a means to create a sustainable open data resource.

So it’s only natural that our projects should aim to complement each other. The key requirement for that is integration: we need to make it easy to use the connections between both databases, for example to help analysts continue their research of a sanctioned company by checking the corporate reports, directors and owners on OpenCorporates.

That’s why we’ve started an effort to create explicit links between the two databases. Over [1,500 companies are now linked up](/datasets/opencorporates/), thanks to the easy-to-use [OpenCorporates API](https://api.opencorporates.com/) and our [data enrichment framework](/docs/enrichment/). Take German energy policy wunderkind Nord Stream 2, for example: its [OpenSanctions profile](/entities/NK-csg2VfZAwP6ot77KuPiPkk/) now links to the company’s corporate details and records. 

<img class="img-fluid" src="https://assets.pudo.org/opensanctions/images/taggart.png">
<p class="img-caption">
    There’s a photo of the exact moment I first saw a demo of OpenCorporates in 2011, presented by 
    founder Chris Taggart.
</p>

What’s really interesting about these few thousand hyperlinks is that they give a hint to what we think will be an important next phase of open data: both projects are (very differently sized) tiles of a jigsaw tapestry of business transparency. OpenCorporates [blog post on the cooperation] does a great job of explaining that vision:

> This joining of the dots between our databases is just the latest development in the evolution of an ecosystem of critical open datasets.
>
> Whether you’re looking to integrate data about legal entities, beneficial ownership or sanctions – high-quality and openly available datasets are being curated to help all.
>
> And the more interconnected these datasets are, the greater their utility – and the easier they are to build solutions with.
>
> “I believe we will see an infrastructure of building blocks of open data sources, including our sanctions data and OpenCorporates’ company data – as well as others like extractive resource data and property ownership data” Friedrich said. “These will be high quality and provenanced, and allow users to answer key questions like: ‘how closely am I linked to a certain company?’”

Continue reading for the [full announcement on OpenCorporates blog].

