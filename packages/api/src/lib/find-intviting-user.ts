import {config, logger} from './config.js';
import {alwatrNitrobase} from './nitrobase.js';

import type { CollectionItem } from 'alwatr/nitrobase';

export async function findInvitingUser(referralCode: string): Promise<User | undefined> {
  logger.logMethodArgs?.('updateInvitingUserData', {referralCode});

  const usersCollection = await alwatrNitrobase.openCollection<User>(config.nitrobase.usersCollection);

  const usersCollectionItems = usersCollection.items();

  let userItemsIteratorResultObject;
  while ((userItemsIteratorResultObject = usersCollectionItems.next()).done === false) {
    const _userItem = userItemsIteratorResultObject.value.data;

    if (_userItem.referralCode !== referralCode) {
      continue;
    }

    userItemsIteratorResultObject = {...userItemsIteratorResultObject, done: true};
    break;
  }

  logger.logMethodArgs?.('updateInvitingUserData', {userData: userItemsIteratorResultObject.value});
  return (userItemsIteratorResultObject.value as CollectionItem<User> | undefined)?.data;
}