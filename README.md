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
When running traditional test specs, screenshots and video captures are available at cypress/screenshots and cypress/videos, in case a test fails.

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

### Cypress-Integration folder
Contains test files that were built to exercise the demo app using the traditional approach and the visual AI.

### Page-objects folder
Helper functions that allow us to write easier to read tests. Functions are used by both traditional and visual test specs.
Each file contains functions and checks to iterate with elements from the page in that given scope.
Login-page focuses on the login form.
Dashboard-page focuses on the features available once user is logged in. 

