// Load schemas.
import { entrySchemaLiteral, entrySchema } from '~/data/schemas/entry.ts'
import { logbookSchemaLiteral, logbookSchema } from '~/data/schemas/logbook.ts'

export const schemas = {
  entrySchema,
  logbookSchema
}

export const collections = {
  //
  logbooks: {
    schema: logbookSchema,

    migrationStrategies: {
      // TODO: Add migrations for previous versions.
           1: () => { },
                            2: () => { },
                            3: () => { },
    },

    methods: {
      getRoute() {
        const { primary } = this

        if (!primary) {
          return null
        }

        return {
          name: 'logbooks-logbookId',
          params: {
            logbookId: primary
          }
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
            logbookId: primary
          }
        }
      }
    }
  },

  //
  entries: {
    schema: entrySchema,

    migrationStrategies: {
      // TODO: Add migrations for previous versions.
           1: () => { },
                            2: () => { },
                            3: () => { }
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
            entryId: primary
          }
        }
      }
    }
  }
}
