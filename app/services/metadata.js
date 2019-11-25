import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import config from '../config/environment';

export default Service.extend({
  headData: service(),
  setHeadData(metadata={}) {
    const defaultMetadata = {
      type: 'website',
      twitterCard: 'summary',
      path: '',
      keywords: 'npr, new york, WQXR, WNYC, arts, culture, classical, music, news, public, radio',
      description: 'The WQXR Beta is a new, experimental way to listen to WQXR FM 105.9, New York City’s classical music radio station. Enjoy classical programming that our listeners love, try out new features, and leave us your feedback.',
      ogDescription: 'Enjoy the classical programming you love, try out new features, and leave us your feedback.',
      ogTitle: 'A new way to listen to WQXR, NYC’s classical music radio station',
      twitterDescription: 'A new way to listen to WQXR, NYC’s classical music radio station',
      twitterSite: '@WQXR',
      facebookAppId: '110716008996381',
      image: {
        url: `https://media.wnyc.org/i/raw/2019/11/wqxr_jb_1200x1200.png`,
        w: '1200',
        h: '1200',
        altText: 'WQXR Beta'
      },
      feeds: [],
    };

    // filter out keys with undefined values, so they get replaced
    // by defaults when we merge.
    let filteredData = Object.keys(metadata).filter(key => {
      return typeof metadata[key] !== 'undefined';
    }).reduce((filteredObject, key) => {
      filteredObject[key] = metadata[key];
      return filteredObject;
    }, {});
    let mergedData = Object.assign({}, defaultMetadata, filteredData);
    mergedData.description = mergedData.description.replace(/(<([^>]+)>)/g, "");
    mergedData.ogDescription = mergedData.ogDescription.replace(/(<([^>]+)>)/g, "");
    mergedData.twitterDescription = mergedData.twitterDescription.replace(/(<([^>]+)>)/g, "");
    set(this, 'headData.type', mergedData.type);
    set(this, 'headData.twitterCard', mergedData.twitterCard);
    set(this, 'headData.url', `${config.webRoot}${mergedData.path}`);
    set(this, 'headData.keywords', mergedData.keywords);
    set(this, 'headData.description', mergedData.description);
    set(this, 'headData.ogTitle', mergedData.ogTitle);
    set(this, 'headData.ogDescription', mergedData.ogDescription);
    set(this, 'headData.twitterDescription', mergedData.twitterDescription);
    set(this, 'headData.twitterSite', mergedData.twitterSite);
    set(this, 'headData.facebookAppId', mergedData.facebookAppId);
    set(this, 'headData.image', mergedData.image);
    set(this, 'headData.feeds', mergedData.feeds);
    set(this, 'headData.mediaRoot', config.mediaRoot);
    set(this, 'headData.publisherAPI', config.publisherAPI);
  }
});
