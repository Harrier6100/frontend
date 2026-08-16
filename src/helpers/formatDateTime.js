import dayjs from 'dayjs';

const format = (timestamp, pattern) => {
    if (!timestamp) return '';
    return dayjs(timestamp).format(pattern);
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
