---
title: Plain text name list
menu_path: /docs/bulk/
summary: |
    This data format simply lists all the names of people, companies and vessels in a text file.
---

The simplest format we publish is a simple text file with the names of all persons and companies targeted in each dataset, one name per line. The format can be used for:

* [Batch searches in ICIJ DataShare](https://icij.gitbook.io/datashare/all/batch-search-documents)
* Simple text matching using regular expressions.

The plain text files are encoded in ``utf-8``. If non-latin names don't show up correctly in your application, make sure you've opened the file with the right encoding.

The major downside of using this format is that it doesn't allow you to get the identifier (and hence the web site link) for each name. If you need this, consider using one of the [CSV-based](/docs/formats/csv/) formats instead.