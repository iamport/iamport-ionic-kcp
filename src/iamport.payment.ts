export class IamportPayment {

    private success: boolean;
    private status: string;
    private response : object;

    constructor(response : any) {
        this.success = response.success;
        this.status = response.status;
        this.response = response;
    }

    public isSuccess() {
        return this.success;
    }

    public getStatus() {
        return this.status;
    }

    public getResponse() {
        return this.response;
    }

}