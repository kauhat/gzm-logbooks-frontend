// Load schemas.
import type { RxCollectionCreator, RxDatabase } from 'rxdb'
import {
  logbookSchema,
  logbookCollectionMethods,
  logbookDocumentMethods,
  logbookEntrySchema,
  logbookEntryCollectionMethods,
  logbookEntryDocumentMethods,
  type LogbookCollection,
  type LogbookEntryCollection,
} from '~/data/schemas'

export type DatabaseCollections = {
  logbooks: LogbookCollection
  entries: LogbookEntryCollection
}

export type UserDatabase = RxDatabase<DatabaseCollections>

export const schemas = {
  logbookEntrySchema,
  logbookSchema,
}

export const collections = {
  //
  logbooks: {
    schema: logbookSchema,

    migrationStrategies: {
      // TODO: Add migrations for previous versions.
      1: (_oldDocumentData, _collection) => {},
      2: (_oldDocumentData, _collection) => {},
      3: (_oldDocumentData, _collection) => {},
    },

    statics: logbookCollectionMethods,

    methods: logbookDocumentMethods,
  },

  //
  entries: {
    schema: logbookEntrySchema,

    migrationStrategies: {
      // TODO: Add migrations for previous versions.
      1: (_oldDocumentData, _collection) => {},
      2: (_oldDocumentData, _collection) => {},
      3: (_oldDocumentData, _collection) => {},
    },

    statics: logbookEntryCollectionMethods,

    methods: logbookEntryDocumentMethods,
  },
} as { [toVersion: string]: RxCollectionCreator }
