export class IamportCertification {

    private success: boolean;
    private impUid: string;
    private merchantUid: string;

    constructor(response : any) {
        this.success = response.success;
        this.impUid = response.imp_uid;
        this.merchantUid = response.merchant_uid;
    }

    public isSuccess() {
        return this.success;
    }

    public getImpUid() {
        return this.impUid;
    }

    public getMerchantUid() {
        return this.merchantUid;
    }

}