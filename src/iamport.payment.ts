export class IamportPayment {

    private success: boolean;
    private status: string;
    private response : object;

    constructor(response: {success: boolean, error_code: string, error_msg: string, imp_uid: string, merchant_uid: string,
                            pay_method: string, paid_amount: number, status: string, name: string, pg_provider: string, pg_tid: string,
                            buyer_name: string, buyer_email: string, buyer_tel: string, buyer_addr: string, buyer_postcode: string,
                            custom_data: any, paid_at: number, receipt_url: string}) {
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