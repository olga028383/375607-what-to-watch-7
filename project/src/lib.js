import * as dayjs from 'dayjs'

const getDataReviewFormat = (date, format) => {
  return dayjs(date).format(format);
};

export {getDataReviewFormat};
