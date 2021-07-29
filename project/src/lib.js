import dayjs from 'dayjs';

const getDataReviewFormat = (date, format) => dayjs(date).format(format);

export {getDataReviewFormat};
