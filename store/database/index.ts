import { defineStore, acceptHMRUpdate } from 'pinia'
import type { RxDatabase, RxStorage } from 'rxdb'
import { addRxPlugin, createRxDatabase, removeRxDatabase } from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'
import { wrappedValidateAjvStorage } from 'rxdb/plugins/validate-ajv'
// import { addPouchPlugin,  } from 'rxdb/plugins/lokijs'
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder'
import { RxDBMigrationSchemaPlugin } from 'rxdb/plugins/migration-schema'
// import * as IndexeddbAdaptor from 'pouchdb-adapter-indexeddb'
import { schemas, collections, type UserDatabase } from '~/data/database'
import { seedFakeLogbook } from '~/store/database/seeder'

// Add plugins.
addRxPlugin(RxDBQueryBuilderPlugin)
addRxPlugin(RxDBMigrationSchemaPlugin)
// addPouchPlugin(IndexeddbAdaptor)

// Add the dev plugins.
if (import.meta.env.DEV) {
  addRxPlugin(RxDBDevModePlugin)
}

/**
 *
 */
async function createUserDatabase(
  storage: RxStorage<unknown, unknown>,
): Promise<UserDatabase> {
  const db = (await createRxDatabase({
    name: 'logbooks',
    storage: storage,
  })) as UserDatabase

  await db.addCollections(collections)

  // Delay for testing 😈
  // // await new Promise((resolve) => {
  // //   setTimeout(resolve, 6666)
  // // })

  // Attach observer...
  // const observable = db.logbooks.find().$

  // observable.subscribe((logbooks) => {
  //   console.log('Currently have ' + logbooks.length + ' logbooks', logbooks)
  // })

  return db
}

/**
 *
 */
async function resetDatabase(database: RxDatabase) {
  if (confirm('This will delete all of your data!') !== true) {
    return
  }

  //
  console.warn('Deleting database...')

  const deleted = await removeRxDatabase(database.name, database.storage)

  console.log(`Deleted ${deleted.length} collections`)
}

export const useDatabase = defineStore('userDatabase', () => {
  const databaseRef = shallowRef<UserDatabase>()
  const storageRef = shallowRef<RxStorage<unknown, unknown>>()

  const readyPromise = (async function () {
    const newStorage = wrappedValidateAjvStorage({
      storage: getRxStorageDexie(),
    })

    const newDb = await createUserDatabase(newStorage)

    databaseRef.value = newDb
    storageRef.value = newStorage

    return databaseRef.value
  })()

  async function getUserDatabase() {
    return await readyPromise
  }

  async function resetUserDatabase() {
    await resetDatabase(await readyPromise)

    window.location.reload()
  }

  async function seedUserLogbook() {
    console.info('Seeding user logbook(s)')

    return Promise.all([seedFakeLogbook(await getUserDatabase())])
  }

  function getLogbooksQuery() {
    return databaseRef.value?.logbooks.find()
  }

  function getLogbookEntriesQuery(id: string) {
    return databaseRef.value?.entries.find().where({ id }).sort('timestamp')
  }

  return {
    readyPromise,

    userData: computed(() => databaseRef.value),

    storageRef,
    databaseRef,

    getLogbooksQuery,
    getLogbookEntriesQuery,
    // fetchState: db,
    // entries:  computed(() => db.value.entries),

    getUserDatabase,
    resetUserDatabase,
    seedUserLogbook,

    logbooks: computed(() => databaseRef.value?.logbooks),
  }
})

// Initialize the database.
// useDatabase().createDatabase()

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDatabase, import.meta.hot))
}
