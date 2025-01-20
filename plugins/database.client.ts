import { useDatabase } from '~/store/database'

/**
 * Register the plugin...
 */
export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  const { rxdb, createDatabase } = useDatabase()

  // createDatabase()

  return {
    // Add $db and $seed fields to app context.
    provide: {
      rxdb: () => rxdb
    }
  }
})
