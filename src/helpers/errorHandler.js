import axios from 'axios';

export const errorHandler = (err) => {
    if (!axios.isAxiosError(err)) {
        console.error(err);
        return {
            status: 0,
            code: 'error.unknown',
            message: err.message,
        };
    }

    if (!err.response) {
        return {
            status: 0,
            code: 'error.network',
            message: err.message,
        };
    }

    const { status, code, message } = err.response.data;

    return {
        status,
        code: code ? `error.${code.toLowerCase()}` : 'error.unknown',
        message: message ?? 'error.unexpected',
    };
};
