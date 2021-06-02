import {IApiHandling} from '../../../decorators/api.decorator/api-handling.interface';
import {HttpClient} from '@angular/common/http';
import {InvoiceRegistryUrls} from './invoice-registry.urls';
import {Observable} from 'rxjs';
import {Api} from '../../../decorators/api.decorator/api.decorator';
import {ApiMethodEnum} from '../../../decorators/api.decorator/api-method.enum';
import {
  IInvoiceRegistryEntity, IInvoiceRegistryCreateOptions, IInvoiceRegistryGetOptions,
  IInvoiceRegistryGetAllOptions, InvoiceRegistryGetAllResponse, IInvoiceRegistryFullEntity,
  IInvoiceRegistryRemoveResponse, IInvoiceRegistryRemoveOptions, IInvoiceRegistryPrintOptions,
  IInvoiceRegistryPrintResponse
} from './utils/main';

export class InvoiceRegistryApi extends InvoiceRegistryUrls implements IApiHandling {

  constructor(public httpClient: HttpClient) {
    super();
  }

  create(options: IInvoiceRegistryCreateOptions): Observable<IInvoiceRegistryEntity>;
  create(options: IInvoiceRegistryCreateOptions & {isPromise: true}): Promise<IInvoiceRegistryEntity>;

  @Api<IInvoiceRegistryEntity>(ApiMethodEnum.Post)
  create(options: IInvoiceRegistryCreateOptions): Observable<IInvoiceRegistryEntity> | Promise<IInvoiceRegistryEntity> | string {
    return this.CREATE;
  }

  get(options: IInvoiceRegistryGetOptions): Observable<IInvoiceRegistryFullEntity>;
  get(options: IInvoiceRegistryGetOptions & {isPromise: true}): Promise<IInvoiceRegistryFullEntity>;

  @Api<IInvoiceRegistryFullEntity>(ApiMethodEnum.Get)
  get(options: IInvoiceRegistryGetOptions): Observable<IInvoiceRegistryFullEntity> | Promise<IInvoiceRegistryFullEntity> | string {
    return this.GET;
  }

  getAll(options: IInvoiceRegistryGetAllOptions): Observable<InvoiceRegistryGetAllResponse>;
  getAll(options: IInvoiceRegistryGetAllOptions & {isPromise: true}): Promise<InvoiceRegistryGetAllResponse>;

  @Api<InvoiceRegistryGetAllResponse>(ApiMethodEnum.Get)
  getAll(options: IInvoiceRegistryGetAllOptions): Observable<InvoiceRegistryGetAllResponse> | Promise<InvoiceRegistryGetAllResponse> | string {
    return this.GET_ALL;
  }

  remove(options: IInvoiceRegistryRemoveOptions): Observable<IInvoiceRegistryRemoveResponse>;
  remove(options: IInvoiceRegistryRemoveOptions & {isPromise: true}): Promise<IInvoiceRegistryRemoveResponse>;

  @Api<IInvoiceRegistryRemoveResponse>(ApiMethodEnum.Delete)
  remove(options: IInvoiceRegistryRemoveOptions): Observable<IInvoiceRegistryRemoveResponse> | Promise<IInvoiceRegistryRemoveResponse> | string {
    return this.REMOVE;
  }

  print(options: IInvoiceRegistryPrintOptions): Observable<IInvoiceRegistryPrintResponse>;
  print(options: IInvoiceRegistryPrintOptions & {isPromise: true}): Promise<IInvoiceRegistryPrintResponse>;

  @Api<IInvoiceRegistryPrintResponse>(ApiMethodEnum.Post)
  print(options: IInvoiceRegistryPrintOptions): Observable<IInvoiceRegistryPrintResponse> | Promise<IInvoiceRegistryPrintResponse> | string {
    return this.PRINT;
  }
}
