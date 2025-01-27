import { useDatabase } from '~/store/database'

/**
 * Register the plugin...
 */
export default defineNuxtPlugin(async (nuxtApp: NuxtApp) => {
  const { databaseRef, storageRef } = useDatabase()

  return {
    // Add $db and $seed fields to app context.
    provide: {
      rxdb: databaseRef,
      rxdbStorage: storageRef,
    },
  }
})
