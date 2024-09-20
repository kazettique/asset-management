import { DbBase } from '../common';
import { DAsset } from './asset';
import { DOwner } from './owner';

export interface DOwnershipHistory extends DbBase {
  asset: Pick<DAsset, 'id' | 'name'>;
  owner: Pick<DOwner, 'id' | 'name'>;
  startDate: Date;
}
