import {Observable, of, throwError} from 'rxjs';
import {IApiOptions} from "./api-options.interface";
import {IApiHandling} from "./api-handling.interface";
import {HttpEvent, HttpRequest, HttpResponse} from "@angular/common/http";
import {filter, flatMap, map, tap} from 'rxjs/operators';
import {ApiStaticService} from "../../api-static.service";
import {v4 as uuid} from 'uuid';
import {ApiMethodEnum} from "./api-method.enum";
import {IApiResValidateConstructor} from './api-res-validate-constructor.interface';

export function Api<T>(method: ApiMethodEnum, responseValidate: IApiResValidateConstructor = null) {
  const validate = (data: T) => {
    if (!responseValidate) {
      return of(data);
    }
    const instance = new responseValidate(data);
    if (instance.isValid) {
      return of(data);
    }
    return throwError(instance.error);
  };
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): TypedPropertyDescriptor<any> {


    return {
      value: function (options?: IApiOptions & {isPromise: true}): Observable<T> | Promise<T> | Observable<HttpEvent<T>> | Promise<HttpEvent<T>> {
        const rawUrl = <string>descriptor.value.apply(this, options);
        const _this: IApiHandling = this as IApiHandling;
        const id: string = uuid();
        const extra: any = {};
        let url: string = rawUrl;
        let body = null;
        let isFull = null;
        let isPromise: boolean = false;
        if (options) {
          url = ApiStaticService.setParams(rawUrl, options?.params);

          if (options.queries) {
            extra.params = ApiStaticService.setQuery(options?.queries);
          }
          if (options.responseType) {
            extra.responseType = options.responseType;
          }

          body = options.body ? options.body : null;
          isFull = options.isFull ? options.isFull : null;
          isPromise = options.isPromise ? options.isPromise : false;
        }

        const req = new HttpRequest(method, url, body, extra);

        if (isFull) {
          const result = _this.httpClient.request<T>(req);
          return isPromise ? (<Observable<HttpEvent<T>>>result).toPromise()
            : result;
        }
        const result = _this.httpClient.request<T>(req)
          .pipe(tap((event: HttpEvent<T>) => ApiStaticService.apiEventMessage(event, id)),
            filter((event: any) => event instanceof HttpResponse),
            map((event: HttpResponse<T>) => event.body),
            flatMap((data: T) => validate(data)));
        return isPromise ? (<Observable<T>>result).toPromise()
          : result;
      }
    };
  }
}
