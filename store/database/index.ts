import { defineStore, acceptHMRUpdate } from 'pinia'
import {
  RxDatabase, addRxPlugin,
  createRxDatabase,
  removeRxDatabase,
  RxStorage
} from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
// import { addPouchPlugin,  } from 'rxdb/plugins/lokijs'
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder'
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema';// import { RxDBValidatePlugin } from 'rxdb/plugins/validate'
// import * as IndexeddbAdaptor from 'pouchdb-adapter-indexeddb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { schemas, collections } from '~/data/database'
import { seedFakeLogbook } from '~/store/database/seeder'

// Add plugins.
// addRxPlugin(RxDBValidatePlugin)
addRxPlugin(RxDBQueryBuilderPlugin)
// addRxPlugin(RxDBMigrationSchemaPlugin)
// addPouchPlugin(IndexeddbAdaptor)

// Add the dev plugins.
if (import.meta.env.DEV) {
  addRxPlugin(RxDBDevModePlugin)
}

export const useDatabase = defineStore('entriesDb', () => {
  const storage = ref<RxStorage<any, any>>()
  const db = ref<RxDatabase>()

  /**
   *
   */
  async function createDatabase() {
    storage.value = getRxStorageDexie()

    db.value = await createRxDatabase({
      name: 'logbooks',
      storage: wrappedValidateAjvStorage({
        storage: storage.value
      })
    })

    db.value.addCollections(collections)
    try {
      } catch {

      }

    // Delay for testing 😈
    // // await new Promise((resolve) => {
    // //   setTimeout(resolve, 6666)
    // // })

    return db
  }

  /**
   *
   */
  async function resetDatabase() {
    if (confirm('This will delete all of your data!') !== true) {
      return
    }

    //
    console.warn('Deleting database...')

    await removeRxDatabase('logbooks', storage.value)
  }

  function getLogbooksQuery() {
    // rxdb.logbooks.findOne(logbookId)
  }

  function getLogbookEntriesQuery(logbook: string) {
    return db.value.entries
      .find()
      .where({ logbook })
      .sort('timestamp')
  }

  createDatabase()

  return {
    db,
    rxdb: db,

    createDatabase,
    resetDatabase,

    getLogbooksQuery,
    getLogbookEntriesQuery,
    // fetchState: db,
    // entries:  computed(() => db.value.entries),
    seed: () => { seedFakeLogbook(db.value) }
  }
})

// Initialize the database.
// useDatabase().createDatabase()

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDatabase, import.meta.hot))
}
