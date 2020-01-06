export default function generateTrackUniqueId(trackAttrs) {
  // This should be obsoleted by this ticket: https://jira.wnyc.org/browse/DSODA-304
  //
  // The point of this is to generate an ID so that we can match up
  // a track coming from woms and a track that comes from publisher
  // Currently the start time coming from woms and publisher are not exactly the same
  // so I'm only taking the date along with the catno to generate a unique ID.
  // 
  return `t_${trackAttrs.catno}_${new Date(trackAttrs.start_time).toISOString().split('T')[0]}`
}
