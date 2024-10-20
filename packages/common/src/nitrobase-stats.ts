import {Region, StoreFileType, type StoreFileStat} from 'alwatr/nitrobase';

export const nitrobaseStats = {
  userInfoDocument: {
    name: 'user-info',
    region: Region.PerOwner,
    type: StoreFileType.Document,
  } as StoreFileStat,

  phoneDocument: {
    name: 'phone',
    region: Region.PerOwner,
    type: StoreFileType.Document,
  } as StoreFileStat,

  authDocument: {
    name: 'auth',
    region: Region.PerOwner,
    type: StoreFileType.Document,
  } as StoreFileStat,

  invitationCodeDocument: {
    name: 'invitation-code',
    region: Region.PerOwner,
    type: StoreFileType.Document,
  } as StoreFileStat,
} as const;
