import { Injectable } from '@angular/core';
import { IamportPayment } from "./iamport.payment";
import { Platform } from "ionic-angular";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
export class IamportService {

    constructor(private platform: Platform, private inAppBrowser: InAppBrowser) {

    }

    private static parseQuery(query: string) {
        let obj = {},
            arr = query.split('&');

        for (let element of arr) {
            const pair = element.split("=" );
            obj[ decodeURIComponent(pair[0]) ] = decodeURIComponent(pair[1]);
        }

        return obj;
    }

    public payment(userCode: string, param): Promise<IamportPayment> {
        const promise = new Promise((resolve, reject) => {
            this.platform.ready().then(()=> {
                const paymentUrl = 'iamport-checkout.html?user-code=' + userCode;
                const redirectUrl = "http://localhost/iamport";
                const browser = this.inAppBrowser.create(paymentUrl,'_blank', 'location=no');
                let paymentProgress = false;

                param.m_redirect_url = redirectUrl;

                browser.on("loadstart" )
                    .subscribe(
                        (e) => {
                            if ( e.url.startsWith(redirectUrl) ) {
                                const query  = e.url.substring( redirectUrl.length+1 );
                                const data = IamportService.parseQuery(query);

                                resolve(data);
                                browser.close();
                            }
                        }
                    );

                browser.on("loadstop" )
                    .subscribe(
                        (e) => {
                            if ( !paymentProgress && (e.url).indexOf(paymentUrl) > -1 ) {
                                paymentProgress = true;

                                const inlineCallback = `(rsp) => {
                                                        if( rsp.success ) {
                                                            location.href = '${redirectUrl}?imp_success=true&imp_uid='+rsp.imp_uid+'&merchant_uid='+rsp.merchant_uid+'&vbank_num='+rsp.vbank_num+'&vbank_name='+rsp.vbank_name;
                                                        } else {
                                                            location.href = '${redirectUrl}?imp_success=false&imp_uid='+rsp.imp_uid+'&merchant_uid='+rsp.merchant_uid+'&error_msg='+rsp.error_msg;
                                                        }
                                                   }`;
                                const iamport_script = `IMP.request_pay(${JSON.stringify(param)}, ${inlineCallback})`;

                                browser.executeScript({
                                    code : iamport_script
                                });
                            }
                        }, (e) => {

                        }
                    );

                browser.on("exit" )
                    .subscribe(
                        (e) => {
                            reject("사용자가 결제를 취소하였습니다.");
                        }
                    );

                browser.show();
            });
        });

        return promise;
    }

}
