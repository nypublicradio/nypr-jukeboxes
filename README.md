# nypr-jukeboxes

[![Maintainability](https://api.codeclimate.com/v1/badges/a3974ae872fd966336bc/maintainability)](https://codeclimate.com/github/nypublicradio/nypr-jukeboxes/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a3974ae872fd966336bc/test_coverage)](https://codeclimate.com/github/nypublicradio/nypr-jukeboxes/test_coverage)

This is the repositiory for WQXR Beta a.k.a. jukeboxes.

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

### Deploying with CircleCI

#### Deploying to the Production Environment

Creating and publishing a git tag that matches a semver version number (e.g. v1.1.1) will trigger a CircleCI workflow that deploys the client to production environment (beta.wqxr.org). 

The usual way to do this is [creating a new release in GitHub](https://docs.github.com/en/github/administering-a-repository/managing-releases-in-a-repository#creating-a-release). Use your version number, starting with a "v", as the tag version, and fill in the description with a list of what's been added since the last release to serve as release notes.

#### Deploying to the Demo Environment

Whenever code is merged to the `main` branch, it's automatically deployed to the demo environment (beta-wqxr.demo.nypr.digital).

If you want to manually deploy code in another branch to the demo environment, you can use create a tag named `demo` and push that tag.

```
git tag demo -f
git push origin refs/tags/demo -f
```

#### Deploying QA Builds

QA builds are static builds of the ember client that can be loaded via a query string. 

CircleCI will create a QA build when you push code to a branch matching the pattern /[A-Za-z-_]+\/[A-Za-z-_\d]+/ (e.g. username/DT-500). You can find a link to the QA build on the "Artifacts" tab of the deploy step in the CircleCI web interface.

Note: Fastboot's server-side rendering will still render the initial page load using the code loaded on the demo enviroment, but the client will replace it with the code from your QA build almost immediately. Unless you're testing something that relies on the server rendered output, such as Open Graph metadata fetching, you won't need to worry about this detail.

Read more about how QA Builds work here: https://wiki.nypr.digital/display/DT/Web+Clients
