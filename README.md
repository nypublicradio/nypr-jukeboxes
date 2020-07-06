# nypr-jukeboxes

[![Maintainability](https://api.codeclimate.com/v1/badges/a3974ae872fd966336bc/maintainability)](https://codeclimate.com/github/nypublicradio/nypr-jukeboxes/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a3974ae872fd966336bc/test_coverage)](https://codeclimate.com/github/nypublicradio/nypr-jukeboxes/test_coverage)

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd nypr-jukeboxes`
* `yarn install`
* `cp .env.sample .env`

## Running / Development

This app uses mirage for testing, so for local development that uses real values from the API, you need to run ember serve with a proxy. This will make sure all xhr calls go the url specified by --proxy, instead of getting stubbed by mirage.

* `ember serve --proxy https://api.demo.nypr.digital/api`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
