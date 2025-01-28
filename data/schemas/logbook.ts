import type {
  ExtractDocumentTypeFromTypedRxJsonSchema,
  RxCollection,
  RxDatabase,
  RxDocument,
  RxJsonSchema,
  RxQuery,
} from 'rxdb'
import { toTypedRxJsonSchema } from 'rxdb'
import type { RouteLocationNormalized } from 'vue-router'

export const logbookSchemaLiteral = {
  title: 'logbook',
  type: 'object',
  primaryKey: 'id',
  version: 3,
  properties: {
    id: {
      type: 'string',
      maxLength: 100,
      final: true,
    },
    name: {
      type: 'string',
      maxLength: 100,
    },
  },
  required: ['id', 'name'],
  // indexes: []
} as const

const schemaTyped = toTypedRxJsonSchema(logbookSchemaLiteral)

// aggregate the document type from the schema
export type LogbookDocumentType = ExtractDocumentTypeFromTypedRxJsonSchema<
  typeof schemaTyped
>

export type LogbookDocumentMethods = {
  getEntriesQuery: (database: RxDatabase) => RxQuery
  getRoute: () => RouteLocationNormalized
  getNewEntryRoute: () => RouteLocationNormalized
}

export type LogbookCollectionMethods = {
  // countAllDocuments: () => Promise<number>
}

export type LogbookDocument = RxDocument<
  LogbookDocumentType,
  LogbookDocumentMethods,
  LogbookCollectionMethods
>

// and then merge all our types
export type LogbookCollection = RxCollection<
  LogbookDocumentType,
  LogbookDocumentMethods,
  LogbookCollectionMethods
>

// create the typed RxJsonSchema from the literal typed object.
export const logbookSchema: RxJsonSchema<LogbookDocumentType> =
  logbookSchemaLiteral

export const logbookDocumentMethods: LogbookDocumentMethods = {
  getEntriesQuery(db) {
    const { primary, id } = this as LogbookDocument

    return db.entries
      .find({
        selector: {
          logbook: { $eq: primary },
        },
      })
      .sort('timestamp')
  },

  getRoute(): RouteLocationNormalized {
    console.log(toRaw(this))

    const { primary, id } = this as LogbookDocument

    return {
      name: 'logbooks-_logbookId',
      params: {
        logbookId: primary,
      },
    }
  },

  getNewEntryRoute(): RouteLocationNormalized {
    const { primary, id } = this as LogbookDocument

    return {
      name: 'logbooks-logbookId-entries-new',
      params: {
        logbookId: primary,
      },
    }
  },
}

export const logbookCollectionMethods: LogbookCollectionMethods = {}
