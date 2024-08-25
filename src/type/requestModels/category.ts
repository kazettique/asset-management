import { MCategory, Name } from '@/type';

export interface RCreateCategory extends Name {
  comment: string;
}

export interface DBCreateCategory extends Pick<MCategory, 'comment' | 'name'> {}
