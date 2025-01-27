// Load schemas.
import type { RxDatabase } from 'rxdb'
import {
  LogbookEntrySchemaLiteral,
  logbookEntrySchema,
  LogbookSchemaLiteral,
  logbookSchema,
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
      1: () => {},
      2: () => {},
      3: () => {},
    },

    methods: {
      getRoute() {
        const { primary } = this

        if (!primary) {
          return null
        }

        return {
          name: 'logbooks-_logbookId',
          params: {
            logbookId: primary,
          },
        }
      },

      getNewEntryRoute() {
        const { primary } = this

        if (!primary) {
          return null
        }

        return {
          name: 'logbooks-logbookId-entries-new',
          params: {
            logbookId: primary,
          },
        }
      },
    },
  },

  //
  entries: {
    schema: logbookEntrySchema,

    migrationStrategies: {
      // TODO: Add migrations for previous versions.
      1: () => {},
      2: () => {},
      3: () => {},
    },

    methods: {
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
    },
  },
}
