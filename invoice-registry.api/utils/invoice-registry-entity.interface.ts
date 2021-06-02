import {IInvoiceRegistryPayerInfo} from './invoice-registry-payer-info.interface';
import {IInvoiceRegistryPeriodInfo} from './invoice-registry-period-info.interface';

export interface IInvoiceRegistryEntity {
  id: number;
  payer: IInvoiceRegistryPayerInfo;
  period: IInvoiceRegistryPeriodInfo;
  createdAt: string;
  userId: number;
}
