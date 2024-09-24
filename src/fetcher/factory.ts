import chalk from 'chalk';
import { FetchOptions } from 'ofetch';

import { CommonConstant } from '@/constant';
import { Utils } from '@/utils';

type MessageType = 'info' | 'warning' | 'alert' | 'ghost' | 'success';
type ConsoleType = 'log' | 'time' | 'timeLog';

type ApiType = 'INTERNAL' | 'RAPID_FOREX';
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Init {
  apiName: string;
  apiType: ApiType;
  body?: Record<string, any>;
  headers?: Record<string, any>;
  method: Method;
  query?: Record<string, any>;
}

class FetchOptionFactory
  implements
    Pick<
      FetchOptions<'json'>,
      | 'method'
      | 'baseURL'
      | 'headers'
      | 'onRequest'
      | 'onRequestError'
      | 'onResponse'
      | 'onResponseError'
      | 'query'
      | 'body'
    >
{
  private _apiType: ApiType = 'INTERNAL';
  private _apiName: string = 'API';

  public method: Method = 'GET';
  public baseURL: string | undefined = undefined;
  public headers: Record<string, any> | undefined = undefined;
  public body?: Record<string, any> = undefined;
  public query?: Record<string, any> = undefined;

  public uniqueId: string;

  public constructor({ apiType, apiName, method, body, query, headers }: Init) {
    this._apiType = apiType;
    this._apiName = apiName;
    this.method = method;
    this.uniqueId = Math.random().toString().replace(/^0+./g, '');

    // update baseUrl
    switch (apiType) {
      case 'RAPID_FOREX':
        this.baseURL = CommonConstant.EXTERNAL_FOREX_API_ROUTE;
        this.headers = {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          ...headers,
        };
        break;
      case 'INTERNAL':
      default:
        this.baseURL = '/api';
        this.headers = headers;
        break;
    }

    if (body) this.body = body;
    if (query) this.query = query;
  }

  private _printMessage = (type: MessageType, message: string, consoleType: ConsoleType = 'log'): void => {
    let msg: string = '';
    switch (type) {
      case 'info':
        msg = chalk.blue(message);
        break;
      case 'warning':
        msg = chalk.yellow(message);
        break;
      case 'alert':
        msg = chalk.red(message);
        break;
      case 'ghost':
        msg = chalk.gray(message);
        break;
      case 'success':
        msg = chalk.green(message);
        break;
      default:
    }

    switch (consoleType) {
      case 'log':
        // eslint-disable-next-line no-console
        console.log(msg);
        break;
      case 'time':
        // eslint-disable-next-line no-console
        console.time(msg);
        break;
      case 'timeLog':
        // eslint-disable-next-line no-console
        console.timeLog(msg);
        break;
      default:
    }
  };

  public onRequest: FetchOptions['onRequest'] = (_context) => {
    this._printMessage(
      'info',
      `[${this.uniqueId}][${this._apiType}][${this._apiName}] Requesting ${Utils.GetCurrentLocalISOTime()}`,
    );
    this._printMessage('ghost', `[${this.uniqueId}][${this._apiType}][${this._apiName}]`, 'time');
  };

  public onRequestError: FetchOptions['onRequestError'] = (context) => {
    this._printMessage(
      'alert',
      `[${this.uniqueId}][${this._apiType}][${this._apiName}] RequestError: ${context.error}`,
    );
    this._printMessage('ghost', `[${this.uniqueId}][${this._apiType}][${this._apiName}]`, 'timeLog');
  };

  public onResponse: FetchOptions['onResponse'] = (context) => {
    this._printMessage(
      'success',
      `[${this.uniqueId}][${this._apiType}][${this._apiName}][${
        context.response.status
      }] Response ${Utils.GetCurrentLocalISOTime()}`,
    );
    this._printMessage('ghost', `[${this.uniqueId}][${this._apiType}][${this._apiName}]`, 'timeLog');
  };

  public onResponseError: FetchOptions['onResponseError'] = (context) => {
    this._printMessage(
      'alert',
      `[${this.uniqueId}][${this._apiType}][${this._apiName}][${context.response.status}] ResponseError: ${context.error}`,
    );
    this._printMessage('alert', `[URL]: ${context.request}`);
    this._printMessage('alert', `[Headers]:`);
    this._printMessage('alert', JSON.stringify(context.response.headers));
    this._printMessage('alert', `[Body]:`);
    this._printMessage('alert', JSON.stringify(context.options));
    this._printMessage('ghost', `[${this.uniqueId}][${this._apiType}][${this._apiName}]`, 'timeLog');
  };
}

export { FetchOptionFactory };
