import {IApiOptions} from '../../../../../decorators/api.decorator/api-options.interface';

export interface IInvoiceRegistryRemoveOptions extends IApiOptions {
  params?: {
    id: string | number;
  };
  queries?: {
    ids: number[] | string[];
  }
}
