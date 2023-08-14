---
title: Simplified CSV (comma-separated values) table
menu_path: /docs/bulk/
summary: |
    CSV exports of the source data are intended to be used for high-level analysis or the
    import into legacy systems.
---

The tabular data export is targeted at analysts who wish to access the OpenSanctions
data in a spreadsheet application like Microsoft Excel (help: [open CSV in Excel](https://support.microsoft.com/en-us/office/import-or-export-text-txt-or-csv-files-5250ac4c-663c-47ce-937b-339e391393ba)).

Unfortunately, the structure of persons of interest data does not easily lend itself to
a simple tabular form. For example, a person might have multiple nationalities, or have
been a member of several political parties in their career.

**There are countless ways to generate CSV excerpts from OpenSanctions. If you would like to work with us to build an export format that's ideally suited for your use case, please [get in touch](/contact/).**

The "Simplified CSV" format addresses this by presenting a highly limited view of the
data, in which only a select set of key columns is provided. These include:

* ``id``: the [unique identifier](/docs/identifiers/) of the given entity.
* ``schema``: the [entity type](/reference/#schema).
* ``name``: the display name of the given entity.
* ``aliases``: any alias names (e.g. other scripts, nom de guerre) provided by the data sources.
* ``birth_date``: for people, their birth date.
* ``countries``: a list of [countries](/reference/#type.country) linked to this entity. Includes countries of residence, nationalities and corporate jurisdictions.
* ``addresses``: a list of known addresses for the entity.
* ``identifiers``: identifiers such as corporate registrations, passport numbers or tax identifiers linked to this sanctions target.
* ``sanctions``: details regarding the sanctions designation, if any.
* ``phones``: a list of phone numbers in E.164 format.
* ``emails``: a list of email addresses linked to the entity.
* ``dataset``: the dataset this entity is in.
* ``first_seen``: the earliest date this entity has been noticed by OpenSanctions.
* ``last_seen``: the most recent time this entity was observed in source data.
* ``last_change``: the most recent time the checksum of the values in this entity has changed.

Further technical notes:

* The CSV is formatted using ``,`` (comma) as a delimiter, encoded as ``utf-8``.
* Some fields in the CSV can contain multiple values in one cell. These are stored as a
  nested CSV using the ``;`` (semicolon) delimiter.
* The export contains only [targeted entities](/reference/#targets), not all entities
  in the dataset.

### Statement-based CSV format

You may also be interested in our [statement-based CSV exports](/docs/statements), which provide a high-fidelity way to import provenanced OpenSanctions claims into a system.