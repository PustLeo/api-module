export abstract class InvoiceRegistryUrls {
  private readonly INVOICE_REGISTRY = '/invoice_registry';
  protected readonly CREATE = this.INVOICE_REGISTRY;
  protected readonly GET = this.INVOICE_REGISTRY + '/{id}';
  protected readonly GET_ALL = this.INVOICE_REGISTRY;
  protected readonly REMOVE = this.GET;
  protected readonly PRINT = this.INVOICE_REGISTRY + '/print';
}
