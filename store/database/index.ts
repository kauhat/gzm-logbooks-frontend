import { defineStore, acceptHMRUpdate } from 'pinia'
import type {
  RxDatabase,
  RxStorage
} from 'rxdb';
import { addRxPlugin,
  createRxDatabase,
  removeRxDatabase
} from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv';
// import { addPouchPlugin,  } from 'rxdb/plugins/lokijs'
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder'
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema'
// import * as IndexeddbAdaptor from 'pouchdb-adapter-indexeddb'
import { schemas, collections } from '~/data/database'
import { seedFakeLogbook } from '~/store/database/seeder'

// Add plugins.
addRxPlugin(RxDBQueryBuilderPlugin)
addRxPlugin(RxDBMigrationSchemaPlugin)
// addPouchPlugin(IndexeddbAdaptor)

// Add the dev plugins.
if (import.meta.env.DEV) {
  addRxPlugin(RxDBDevModePlugin)
}

export const useDatabase = defineStore('entriesDb', () => {
  const db = shallowRef<RxDatabase>()

  const storage = shallowRef<RxStorage<any, any>>(
      wrappedValidateAjvStorage({
      storage: getRxStorageDexie()
    }
  ))

  /**
   *
   */
  async function createDatabase() {
    db.value = await createRxDatabase({
      name: 'logbooks',
      storage: storage.value
    })

    await db.value.addCollections(collections)
      .then(async function (db) {
        // Delay for testing 😈
        // // await new Promise((resolve) => {
        // //   setTimeout(resolve, 6666)
        // // })

        console.log(await db.logbooks.find().exec())

        const observable = db.logbooks.find().$;

        observable.subscribe(logbooks => {
            console.log('Currently have ' + logbooks.length + ' logbooks', logbooks);
        });

        return db
      })
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
    return db.value.logbooks.find()
  }

  function getLogbookEntriesQuery(id: string) {
    return db.value.entries
      .find()
      .where({ id })
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
    seed: () => {

      console.log(db.value)
      seedFakeLogbook(db.value) }
  }
})

// Initialize the database.
// useDatabase().createDatabase()

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDatabase, import.meta.hot))
}
