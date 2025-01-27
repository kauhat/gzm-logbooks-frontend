import type {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxDocument,
  RxJsonSchema,
} from 'rxdb'
import { toTypedRxJsonSchema } from 'rxdb'

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
export type LogbookEntryDocType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>

// create the typed RxJsonSchema from the literal typed object.
export const logbookEntrySchema: RxJsonSchema<LogbookEntryDocType> =
  logbookEntrySchemaLiteral

export type LogbookEntryDocMethods = {
  scream: (v: string) => string
}

export type LogbookEntryDocument = RxDocument<
  LogbookEntryDocType,
  LogbookEntryDocMethods
>

// we declare one static ORM-method for the collection
export type LogbookEntryCollectionMethods = {
  countAllDocuments: () => Promise<number>
}

// and then merge all our types
export type LogbookEntryCollection = RxCollection<
  LogbookEntryDocType,
  LogbookEntryDocMethods,
  LogbookEntryCollectionMethods
>
