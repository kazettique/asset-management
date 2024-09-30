export enum GenderType {
  MALE,
  FEMALE,
  OTHERS,
}

export enum AssetLifeStatus {
  ALL = 'ALL',
  DEAD = 'DEAD',
  LIVE = 'LIVE',
}

export enum ImportTaskStatus {
  DONE = 'DONE',
  FAILED = 'FAILED',
  PROCESSING = 'PROCESSING',
  QUEUE = 'QUEUED',
}

export enum SettingKey {
  CURRENCY_OPTION_LIST = 'currencyOptionList',
  DISPLAY_FOREX = 'displayForex',
  SHOW_CENSOR_ASSET = 'showCensorAsset',
}
