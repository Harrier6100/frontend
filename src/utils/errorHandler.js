export const errorHandler = (error) => {
    if (!error.response) {
        return { message: error.message };
    }

    const { status, message } = error.response.data;
    return { status, message };
};
