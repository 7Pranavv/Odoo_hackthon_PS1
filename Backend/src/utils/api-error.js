class ApiError extends Error {
    constructor(
        statusCode,
        message = 'An error occurred',
        error = [],
        stack = ''

    ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        this.stack = stack;
        this.success = false;

        if(stack) {
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
