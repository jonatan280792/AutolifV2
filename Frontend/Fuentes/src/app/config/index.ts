import { environment } from '@environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { CurrencyMaskInputMode } from "ngx-currency";

const httpOptions = { headers: new HttpHeaders() };

httpOptions.headers
  = httpOptions.headers
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json; text/plain');

const Config = {
  api: {
    baseUrlMotor: environment.serviceUrl,
    options: httpOptions,
    timeout: 3000
  },
  appParams: {
    currencyMask: {
      align: "right",
      allowNegative: true,
      allowZero: true,
      decimal: ",",
      precision: 0,
      prefix: "$ ",
      suffix: "",
      thousands: ".",
      nullable: true,
      min: null,
      max: null,
      inputMode: CurrencyMaskInputMode.FINANCIAL
    },
    session: {
      timeoutLogoutMinutes: 5,
      timeoutWarningMinutes: 4
    },
    translatesPathlibrary: './assets/library/i18n/'
  },
};

export { Config };
