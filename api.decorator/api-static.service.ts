import {Injectable, Type} from "@angular/core";
import {HttpEvent, HttpEventType, HttpParams, HttpProgressEvent} from "@angular/common/http";
import {ApiSchemaObservableFormatType} from "./api-schema-observable-format.type";

@Injectable({providedIn: 'root'})
export class ApiStaticService {

  public static readonly URL_PARAM_IDENTIFIER = new RegExp('{\\w+}', 'ig');
  public static readonly URL_PARAM_CLEAR_KEY = new RegExp('\\w+', 'ig');

  public static apiEventMessage(event: HttpEvent<any>, id: string): void {
    switch (event.type) {
      case HttpEventType.Sent:
        console.log(`[API][SENT][${id}] Запрос отправлен`);
        console.time(`[${id}]`);
        break;
      case HttpEventType.UploadProgress:
        const percentDone = Math.round(100 * (<HttpProgressEvent>event).loaded / (<HttpProgressEvent>event).total);
        console.log(`[API][PROGRESS][${id}] Загрузка - ${percentDone}%`);
        break;
      case HttpEventType.Response:
        console.log(`[API][RESPONSE][${id}] Запрос завершен`);
        console.timeEnd(`[${id}]`);
        break;
    }
  }

  public static asSchema<T extends Record<string, keyof ApiSchemaObservableFormatType>>(t: T): T {
    return t;
  }

  public static setParams(rawUrl: string, params?: any): string {
    if (!params) {
      return rawUrl.replace(/\/{\w+}/g, '');
    }
    const searchKeys: string[] = rawUrl.match(ApiStaticService.URL_PARAM_IDENTIFIER)
      .map((val: string) => val.match(ApiStaticService.URL_PARAM_CLEAR_KEY).pop());

    let result: string = rawUrl;
    searchKeys
      .filter((key: string) => (key in params))
      .forEach((val: string) => {
        result = result.replace(`{${val}}`, params[val]);
    });
    return result.replace(/\/\{\w*\}/ig, '');
  }

  public static setQuery(queries: any): HttpParams {
    let params: HttpParams = new HttpParams();
    if (!queries) {
      return params;
    }
    Object.entries(queries)
      .forEach(([key, value]: any[]) => params = params.append(key, value))
    return params;
  }
}
