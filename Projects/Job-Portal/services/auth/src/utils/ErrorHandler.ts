export default class Errorhandler extends Error {
    httpStatusCode: number;
    constructor(httpStatusCode: number, message: string,) {
        super(message);
        this.httpStatusCode = httpStatusCode;
        Error.captureStackTrace(this, this.constructor)

    }
}