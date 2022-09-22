import moment from 'moment';

const formatDate = (date) => {
  const timestamp = new Date(date);
  return moment(timestamp).format('DD/MM/YYYY');
};

export default formatDate;
