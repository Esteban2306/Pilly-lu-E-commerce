class Forbiden extends Error {
    statusCode: number

    constructor(message: string) {
        super(message);
        this.statusCode = 403;
    }
}

export default Forbiden;