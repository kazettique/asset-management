import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { z } from 'zod';

import { CommonConstant } from '@/constant';
import {
  AssetLifeStatus,
  DAsset,
  FAsset,
  FAssetFindPagination,
  FAssetFindPrimaryFilter,
  FAssetFindSecondaryFilter,
  FAssetFindSort,
  FAssetImport,
  MAsset,
  PAsset,
  PAssetFind,
  PAssetFindFilter,
  PAssetFindSort,
  VAsset,
  VAssetImportItem,
} from '@/types';

import { CommonValidator } from './common';
import { ForexValidator } from './forex';

export abstract class AssetValidator {
  public static readonly DAssetValidator: z.ZodSchema<DAsset> = z
    .object({
      meta: z.record(z.string(), z.any()).nullable(),
    })
    .and(CommonValidator.DbBaseValidator)
    .and(CommonValidator.AssetCommonValidator);

  public static readonly MAssetValidator: z.ZodSchema<MAsset> = z
    .object({
      meta: CommonValidator.AssetMetaValidator.nullable(),
    })
    .and(CommonValidator.DbBaseValidator)
    .and(CommonValidator.AssetCommonValidator);

  public static readonly VAssetValidator: z.ZodSchema<VAsset> = this.MAssetValidator;

  public static readonly PAssetValidator: z.ZodSchema<PAsset> = z
    .object({
      brandId: CommonValidator.IdValidator,
      categoryId: CommonValidator.IdValidator,
      comment: z.string().nullable(),
      endCurrency: z.string().nullable(),
      endDate: z.coerce.date().nullable(),
      endMethodId: CommonValidator.IdValidator.nullable(),
      endPlatformId: CommonValidator.IdValidator.nullable(),
      endPrice: CommonValidator.PriceValidator.nullable(),
      isCensored: z.boolean(),
      meta: CommonValidator.AssetMetaValidator,
      name: CommonValidator.NameValidator,
      ownerId: CommonValidator.IdValidator,
      placeId: CommonValidator.IdValidator,
      startCurrency: z.string().nullable(),
      startDate: z.coerce.date().nullable(),
      startMethodId: CommonValidator.IdValidator.nullable(),
      startPlatformId: CommonValidator.IdValidator.nullable(),
      startPrice: CommonValidator.PriceValidator.nullable(),
      tags: z.object({
        connect: z.object({ id: CommonValidator.IdValidator }).array(),
        create: z.object({ name: CommonValidator.NameValidator }).array(),
      }),
    })
    .superRefine((values, context) => {
      if (values.endDate !== null) {
        const startDate = dayjs(values.startDate);
        const endDate = dayjs(values.endDate);

        if (startDate.isAfter(endDate)) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'End date should be after start date.',
            path: ['endDate'],
          });
        }
      }
    });

  public static readonly FAssetValidator: z.ZodSchema<FAsset> = z
    .object({
      brandId: CommonValidator.FormOptionValidator,
      categoryId: CommonValidator.FormOptionValidator,
      comment: z.string(),
      endCurrency: CommonValidator.FormOptionValidator.nullable(),
      endDate: z.date().nullable(),
      endMethodId: CommonValidator.FormOptionValidator.nullable(),
      endPlatformId: CommonValidator.FormOptionValidator.nullable(),
      endPrice: z.string(),
      isCensored: z.boolean(),
      meta: CommonValidator.AssetMetaValidator,
      name: CommonValidator.NameValidator,
      ownerId: CommonValidator.FormOptionValidator,
      placeId: CommonValidator.FormOptionValidator,
      startCurrency: CommonValidator.FormOptionValidator.nullable(),
      startDate: z.date().nullable(),
      startMethodId: CommonValidator.FormOptionValidator.nullable(),
      startPlatformId: CommonValidator.FormOptionValidator.nullable(),
      startPrice: z.string(),
      tags: CommonValidator.FormOptionValidator.array(),
    })
    .superRefine((values, context) => {
      if (
        (values.startPrice.length !== 0 && values.startCurrency === null) ||
        (values.startPrice.length === 0 && values.startCurrency !== null)
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: CommonConstant.MSG_CURRENCY_PRICE_PAIR,
          path: ['startCurrency'],
        });
      }

      if (
        (values.endPrice.length !== 0 && values.endCurrency === null) ||
        (values.endPrice.length === 0 && values.endCurrency !== null)
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: CommonConstant.MSG_CURRENCY_PRICE_PAIR,
          path: ['endCurrency'],
        });
      }
    });

  public static readonly VAssetImportItemValidator: z.ZodSchema<VAssetImportItem> = z.object({
    comment: z.string(),
    endDate: z.string(),
    endPrice: z.string(),
    name: z.string(),
    startDate: z.string(),
    startPrice: z.string(),
  });

  public static readonly FAssetImportValidator: z.ZodSchema<FAssetImport> = z.object({
    brandId: CommonValidator.FormOptionValidator,
    categoryId: CommonValidator.FormOptionValidator,
    endCurrency: CommonValidator.FormOptionValidator.nullable(),
    endMethodId: CommonValidator.FormOptionValidator.nullable(),
    endPlatformId: CommonValidator.FormOptionValidator.nullable(),
    isCensored: z.boolean(),
    isLegalFileData: z.literal<boolean>(true),
    meta: CommonValidator.AssetMetaValidator,
    ownerId: CommonValidator.FormOptionValidator,
    placeId: CommonValidator.FormOptionValidator,
    startCurrency: CommonValidator.FormOptionValidator.nullable(),
    startMethodId: CommonValidator.FormOptionValidator.nullable(),
    startPlatformId: CommonValidator.FormOptionValidator.nullable(),
    tags: CommonValidator.FormOptionValidator.array(),
  });

  public static readonly PAssetFindFilterValidator: z.ZodSchema<PAssetFindFilter> = z.object({
    brands: CommonValidator.IdValidator.array().optional(),
    categories: CommonValidator.IdValidator.array().optional(),
    endDateRange: z.tuple([z.coerce.date().nullable(), z.coerce.date().nullable()]).optional(),
    endMethods: CommonValidator.IdValidator.array().optional(),
    endPlatforms: CommonValidator.IdValidator.array().optional(),
    endPriceRange: z
      .tuple([CommonValidator.PriceValidator.nullable(), CommonValidator.PriceValidator.nullable()])
      .optional(),
    lifeStatus: z.nativeEnum(AssetLifeStatus).optional(),
    owners: CommonValidator.IdValidator.array().optional(),
    places: CommonValidator.IdValidator.array().optional(),
    startDateRange: z.tuple([z.coerce.date().nullable(), z.coerce.date().nullable()]).optional(),
    startMethods: CommonValidator.IdValidator.array().optional(),
    startPlatforms: CommonValidator.IdValidator.array().optional(),
    startPriceRange: z
      .tuple([CommonValidator.PriceValidator.nullable(), CommonValidator.PriceValidator.nullable()])
      .optional(),
  });

  public static readonly PAssetFindSortValidator: z.ZodSchema<PAssetFindSort> = z.object({
    key: z.literal('startPrice').or(z.literal('endPrice')).or(z.literal('startDate')).or(z.literal('endDate')),
    order: z.nativeEnum(Prisma.SortOrder),
  });

  public static readonly PAssetFindValidator: z.ZodSchema<PAssetFind> = z
    .object({
      filters: this.PAssetFindFilterValidator,
      sort: this.PAssetFindSortValidator.optional(),
    })
    .and(CommonValidator.PFindPageValidator);

  public static readonly FAssetFindPrimaryValidator: z.ZodSchema<FAssetFindPrimaryFilter> = z.object({
    categories: z.string().array(),
    lifeStatus: z.nativeEnum(AssetLifeStatus),
    owners: z.string().array(),
  });

  public static readonly FAssetFindSecondaryFilter: z.ZodSchema<FAssetFindSecondaryFilter> = z.object({
    brands: CommonValidator.FormOptionValidator.array(),
    endDateRange: z.tuple([z.string(), z.string()]),
    endMethods: CommonValidator.FormOptionValidator.array(),
    endPlatforms: CommonValidator.FormOptionValidator.array(),
    endPriceRange: z.tuple([z.string(), z.string()]),
    places: CommonValidator.FormOptionValidator.array(),
    startDateRange: z.tuple([z.string(), z.string()]),
    startMethods: CommonValidator.FormOptionValidator.array(),
    startPlatforms: CommonValidator.FormOptionValidator.array(),
    startPriceRange: z.tuple([z.string(), z.string()]),
  });

  public static readonly FAssetFindSortValidator: z.ZodSchema<FAssetFindSort> = this.PAssetFindSortValidator;

  public static readonly FAssetFindPagination: z.ZodSchema<FAssetFindPagination> = CommonValidator.PFindPageValidator;
}
