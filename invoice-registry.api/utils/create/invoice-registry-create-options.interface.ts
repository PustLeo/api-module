import {IApiOptions} from '../../../../../decorators/api.decorator/api-options.interface';

export interface IInvoiceRegistryCreateOptions extends IApiOptions {
  body: {
    ids: number[];
    payerId: number;
    period: {
      begin: string;
      end: string;
    }
  }
}
