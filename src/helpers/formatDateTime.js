import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

const format = (timestamp, pattern) => {
    if (!timestamp) return '';
    return dayjs(timestamp).tz().format(pattern);
};

export const formatDate = (timestamp, pattern = 'YYYY-MM-DD') => {
    return format(timestamp, pattern);
};

export const formatTime = (timestamp, pattern = 'HH:mm:ss') => {
    return format(timestamp, pattern);
};

export const formatDateTime = (timestamp, pattern = 'YYYY-MM-DD HH:mm:ss') => {
    return format(timestamp, pattern);
};
