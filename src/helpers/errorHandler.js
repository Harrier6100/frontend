export const errorHandler = (err) => {
    if (!err.response) {
        const { message } = err;
        return { message };
    }

    const { status, message } = err.response.data;
    return { status, message };
};
