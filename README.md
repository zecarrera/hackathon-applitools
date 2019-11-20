## What is it?
Test automation hackathon exercise from [applitools](https://applitools.com/hackathon-instructions).
This project contains tests written in a tradditional approach using [Cypress](https://www.cypress.io/) and a visual testing alternative using [applitools/eyes-cypress](https://github.com/applitools/eyes-cypress).

## Getting Started

This section provides a high-level requirement & quick start guide.

### Prerequisites

- [Nodejs](https://nodejs.org/en/)
- In order to use applitools you need a valid API_KEY
-- export APPLITOOLS_API_KEY= {yourAPIKey}
-- set APPLITOOLS_API_KEY= {yourAPIKey}

### Standard Installation

1. Make sure all the prerequisites are installed.
2. Fork this repository.
3. Clone your forked repository, ie. `git clone https://github.com/<your-username>/hackathon-applitools`
4. Run `npm install`

## Running tests 
There are 4 different commands to allow you to run different tests configurations.

### Running tests with cypress UI (configured to use hackatonV2 demo app)
`npm run cypress`

### Running traditional test set from the terminal

#### Traditional tests on demo app V1
`npm run hackatonV1-traditional`
#### Traditional tests on demo app V2
`npm run hackatonV2-traditional`

### Running visual test set from the terminal
#### Visual tests on demo app V1
`npm run hackatonV1-visual`
#### Visual tests on demo app V2
`npm run hackatonV2-visual`

## Project structure

### Page-objects folder

#### Dashboard-page
#### Login-page


