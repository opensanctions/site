---
title: Using our PEPs data
summary: |
  How information about Politically-exposed persons is represented in our dataset 
  and how you can use it most effectively in your AML solution or research.
---

All PEPs have the `role.pep` topic.

Positions additionally have topics classifying the position according to their jurisdiction and role. 

| Key PEP categories  | Topics |
|--------------------|--------|
| National head of government, head of state | `role.head`, `geo.national` |  
| National executive | `role.executive`, `geo.national` |
| Central Bank leadership | `role.bank` |
| Diplomatic positions | `role.diplo` |
| Political party leadership | `pol.party` |
