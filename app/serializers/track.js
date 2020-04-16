import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    trackTitle: 'title',
    composerName: 'composer',
    ensembleName: 'ensemble',
    conductorName: 'conductor'
  },
});
