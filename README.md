# xtext-extractor

Extendable Text Extractor

**NOTE** module is still in active development. Give it a week or so :)


[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=stanimirovv_xtext-extractor&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=stanimirovv_xtext-extractor)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=stanimirovv_xtext-extractor&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=stanimirovv_xtext-extractor)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=stanimirovv_xtext-extractor&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=stanimirovv_xtext-extractor)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=stanimirovv_xtext-extractor&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=stanimirovv_xtext-extractor)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=stanimirovv_xtext-extractor&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=stanimirovv_xtext-extractor)

Design Pattern driven with extensibility in mind.

Currently supports pdf extraction with ```pdftotext```, WIP doc via ```antiword```

# Prerequisites

```pdftotext``` must be installed:

```bash
#Ubuntu/Debian:
sudo apt-get update && sudo apt-get install -y xpdf

# CentOS:
sudo yum install poppler-utils

# OSX
brew install --cask pdftotext

```

# Synopsis

```typescript
import {extractorFactory} from 'xtext-extractor/dist/extractor';

const extractor = extractorFactory('my/file/path.pdf');
const text = await extractor.extract();
console.log(`extracted text: ${text}`);
```

# Add custom extractor
```
TODO
```

# Why ?

While researching what libraries we have for overall text extraction a few things became evident - there are a lot of libraries that do this, however:
* Most of them are buggy or unsupported
* They lack autmated testing and code quality control
* Security vulnerabilities, outdated packages, conflicts etc

Additionally there isn't a common interface so the error handling and routing layers must grow with each new suported file type.

How are these problems adressed here ? 

Usability:
* Support for easily adding additional extractors
* Error types to reduce the amount of error checking code required

Stability:
* TS Strict Mode + Eslint
* Static Code analysis via sonarcloud
* high test coverage (TO be added in the CI pipeline)
* dependancies are tracked by renovatebot, but merged after passing tests and manual verification
