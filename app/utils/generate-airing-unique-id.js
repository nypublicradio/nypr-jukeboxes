import moment from 'moment';
export default function generateAiringUniqueId(airingAttrs) {
  let startDate = moment(airingAttrs['start-time']);
  let endDate = moment(airingAttrs['end-time']);

  return `a_${airingAttrs['show-id']}_${startDate.format('YYYY-MM-DD_hh:mm')}_${endDate.format('YYYY-MM-DD_hh:mm')}`
}
