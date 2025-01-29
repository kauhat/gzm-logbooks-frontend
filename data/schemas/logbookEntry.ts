import type {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxDocument,
  RxJsonSchema,
} from 'rxdb'
import { toTypedRxJsonSchema } from 'rxdb'
import type { RouteLocationRaw } from 'vue-router'

export const logbookEntrySchemaLiteral = {
  title: 'Entry',
  type: 'object',
  version: 3,
  properties: {
    timestamp: {
      type: 'string',
      minLength: 12,
      maxLength: 100,
    },
    logbook: {
      type: 'string',
      ref: 'logbooks',
      minLength: 1,
      maxLength: 100,
    },
    amountRed: {
      type: 'number',
    },
    amountAmber: {
      type: 'number',
    },
    amountGreen: {
      type: 'number',
    },
    comment: {
      type: 'string',
    },
  },
  primaryKey: 'timestamp',
  indexes: ['logbook'],
  required: ['timestamp', 'logbook'],
} as const

const schemaTyped = toTypedRxJsonSchema(logbookEntrySchemaLiteral)

// aggregate the document type from the schema
export type LogbookEntryDocumentType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>

export type LogbookEntryDocumentMethods = {
  getRoute: () => RouteLocationRaw
}

// we declare one static ORM-method for the collection
export type LogbookEntryCollectionMethods = {}

export type LogbookEntryDocument = RxDocument<
  LogbookEntryDocumentType,
  LogbookEntryDocumentMethods,
  LogbookEntryCollectionMethods
>

// and then merge all our types
export type LogbookEntryCollection = RxCollection<
  LogbookEntryDocumentType,
  LogbookEntryDocumentMethods,
  LogbookEntryCollectionMethods
>

// create the typed RxJsonSchema from the literal typed object.
export const logbookEntrySchema: RxJsonSchema<LogbookEntryDocumentType> =
  logbookEntrySchemaLiteral

export const logbookEntryDocumentMethods: LogbookEntryDocumentMethods = {
  getRoute() {
    const { primary, logbook } = this

    if (!primary || !logbook) {
      return null
    }

    return {
      name: 'logbooks-logbookId-entries-entryId',
      params: {
        logbookId: logbook,
        entryId: primary,
      },
    }
  },
}

export const logbookEntryCollectionMethods: LogbookEntryCollectionMethods = {}
