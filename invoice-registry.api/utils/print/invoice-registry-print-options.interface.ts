import {IApiOptions} from '../../../../../decorators/api.decorator/api-options.interface';

export interface IInvoiceRegistryPrintOptions extends IApiOptions {
  body: {
    ids: number[];
  };
}
