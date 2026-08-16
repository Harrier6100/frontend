export const errorHandler = (err) => {
    if (!err.isAxiosError) {
        console.error(err);
        return;
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
