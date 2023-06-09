export class AccessDeniedError extends Error {
    constructor() {
        super("Access denied");
        this.name = "AccessDeniedError"
        this.status = 401;

        this.body = {
            status: this.status,
            message: this.message
        };
    }
}

export class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = "ConflictError";
        this.status = 409;

        this.body = {
            status: this.status,
            message: this.message
        };
    }
}
export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
        this.status = 404;

        this.body = {
            status: this.status,
            message: this.message
        };
    }
}

export class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "BadRequestError";
        this.status = 400;

        this.body = {
            status: this.status,
            message: this.message
        };
    }
}

export class InternalServerError extends Error {
    constructor(){
        super("Something gone wrong");
        this.name = "InternalServerError";
        this.status = 500;

        this.body = {
            status: this.status,
            message: this.message
        };
    }
}