import { MethodType } from '@prisma/client';

import { FormOption, MenuItem, Name } from '@/types';

export abstract class CommonConstant {
  public static readonly MSG_DIRTY_DATA: string = 'dirty data';

  public static readonly DEFAULT_NAME: Name = '';

  public static readonly DATE_TIME_FORMAT: string = 'YYYY-MM-DD';

  public static readonly DEFAULT_EMPTY_STRING: string = '--';

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
          icon: 'dollar-sign-solid',
          label: 'currency',
          link: '/setting/currency',
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
}
