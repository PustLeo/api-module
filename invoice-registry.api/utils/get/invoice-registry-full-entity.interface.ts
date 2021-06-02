import {IInvoiceRegistryEntity} from '../invoice-registry-entity.interface';

export interface IInvoiceRegistryFullEntity extends IInvoiceRegistryEntity {
  invoices: any[];
}
