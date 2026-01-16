import moment from 'moment';

const format = (timestamp, style) => {
    if (!timestamp) return '';
    return moment.utc(timestamp).local().format(style);
};

export const getDate = (timestamp) => {
    return format(timestamp, 'YYYY-MM-DD');
};

export const getTime = (timestamp) => {
    return format(timestamp, 'HH:mm:ss');
};

export const getDateTime = (timestamp) => {
    return format(timestamp, 'YYYY-MM-DD HH:mm:ss');
};
