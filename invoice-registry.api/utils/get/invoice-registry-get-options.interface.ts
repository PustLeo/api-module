import {IApiOptions} from '../../../../../decorators/api.decorator/api-options.interface';

export interface IInvoiceRegistryGetOptions extends IApiOptions {
  params: {
    id: string | number;
  }
}
