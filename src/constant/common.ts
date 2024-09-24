import { MethodType } from '@prisma/client';
import currencyCodes from 'currency-codes-ts';
import { CurrencyCode } from 'currency-codes-ts/dist/types';

import { FormOption, MenuItem, Name, PFindPagination, SettingBase } from '@/types';

export abstract class CommonConstant {
  public static readonly MSG_DIRTY_DATA: string = 'dirty data';
  public static readonly MSG_CURRENCY_PRICE_PAIR: string = 'price and currency should both exist or not.';

  public static readonly EXTERNAL_FOREX_API_ROUTE: string =
    'https://currency-converter5.p.rapidapi.com/currency/historical';

  public static readonly DEFAULT_NAME: Name = '';

  public static readonly DATE_TIME_FORMAT: string = 'YYYY-MM-DD';

  public static readonly DEFAULT_EMPTY_STRING: string = '--';

  public static readonly MAX_PAGE_SIZE: number = 100;

  public static readonly DEFAULT_PAGE_SIZE: number = 10;

  public static readonly DEFAULT_PAGE: number = 1;

  public static readonly BASE_CURRENCY: CurrencyCode = 'USD';

  public static readonly DEFAULT_SETTING_BASE: SettingBase = {
    comment: 'auto created',
    name: 'Default',
  };

  public static readonly DEFAULT_SELECT_OPTION: FormOption = {
    label: 'Please choose',
    value: '',
  };

  public static readonly SIDE_MENU_LIST: MenuItem[] = [
    {
      children: [],
      icon: 'chart-pie-solid',
      label: 'dashboard',
      link: '/dashboard',
    },
    {
      children: [],
      icon: 'cubes-solid',
      label: 'asset',
      link: '/asset',
    },
    {
      children: [
        {
          children: [],
          icon: 'building-shield-solid',
          label: 'brand',
          link: '/setting/brand',
        },
        {
          children: [],
          icon: 'layer-group-solid',
          label: 'category',
          link: '/setting/category',
        },
        {
          children: [],
          icon: 'hammer-solid',
          label: 'method',
          link: '/setting/method',
        },
        {
          children: [],
          icon: 'person',
          label: 'owner',
          link: '/setting/owner',
        },
        {
          children: [],
          icon: 'location-dot-solid',
          label: 'place',
          link: '/setting/place',
        },
        {
          children: [],
          icon: 'desktop-solid',
          label: 'platform',
          link: '/setting/platform',
        },
        {
          children: [],
          icon: 'tags-solid',
          label: 'tag',
          link: '/setting/tag',
        },
        {
          children: [],
          icon: 'quote-right-solid',
          label: 'quote',
          link: '/setting/quote',
        },
      ],
      icon: 'gear-solid',
      label: 'setting',
      link: null,
    },
  ];

  public static readonly METHOD_TYPE_OPTIONS: FormOption[] = [
    {
      label: MethodType.START,
      value: MethodType.START,
    },
    {
      label: MethodType.END,
      value: MethodType.END,
    },
  ];

  public static readonly CURRENCY_CODE_OPTIONS: FormOption[] = currencyCodes.data
    .filter((item) => ['TWD', 'USD', 'JPY'].includes(item.code))
    .map((item) => ({
      label: item.code,
      value: item.code,
    }));

  public static readonly P_FIND_PAGINATION_DEFAULT: PFindPagination = {
    page: CommonConstant.DEFAULT_PAGE,
    pageSize: CommonConstant.DEFAULT_PAGE_SIZE,
  };
}
