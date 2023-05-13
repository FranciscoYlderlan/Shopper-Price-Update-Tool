export class AppError {
    constructor(message, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }
    Message() {
        return {
            message: this.message,
            statusCode: this.statusCode,
        };
    }
    static MessageServerError() {
        return {
            message: 'Internal Server Error.',
            statusCode: 500,
        };
    }
}
