import {IApiOptions} from '../../../../../decorators/api.decorator/api-options.interface';

export interface IInvoiceRegistryGetAllOptions extends IApiOptions {
  queries: {
    payer_id?: string | number;
    ids?: number[] | string[];
  }
}
