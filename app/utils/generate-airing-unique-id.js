import moment from 'moment';
export default function generateAiringUniqueId(airingAttrs) {
  let startDate = moment(airingAttrs.start_time);
  let endDate = moment(airingAttrs.end_time);

  return `a_${airingAttrs.show_id}_${startDate.format('YYYY-MM-DD_hh:mm')}_${endDate.format('YYYY-MM-DD_hh:mm')}`
}
