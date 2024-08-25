import { Id, MCategory, Name, NString, NType } from '@/types';

export interface RCreateCategory extends Name {
  comment: NString;
}

export interface RUpdateCategory extends RCreateCategory {
  id: Id;
}

// todo: both used in update, create, need rename
export interface DBCreateCategory extends Pick<MCategory, 'comment' | 'name'> {}
