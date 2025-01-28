<template>
  <LayoutPage>
    <LayoutPageHeader>
      <template #title>
        <h1>Logbooks</h1>
      </template>

      <template #inline-actions />

      <template #main-actions>
        <button type="button" class="cursor-not-allowed btn" disabled>
          Add logbook from web
        </button>

        <nuxt-link class="btn btn-primary" to="/logbooks/new">
          Create blank logbook
        </nuxt-link>

        <button class="btn btn-info animate-bounce" @click="seedUserLogbook">
          Generate demo logbook
        </button>
      </template>
    </LayoutPageHeader>

    <div class="flex justify-end gap-2 mb-4" />

    <Card v-if="logbooks" class="mb-4 bg-base-200">
      <template #title />

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <LogbookItem
          v-for="logbook in logbooks"
          :key="logbook?.id"
          :document="logbook"
        />

        <Card>
          <nuxt-link class="flex-1 btn btn-outline" to="/logbooks/new">
            Add Logbook
          </nuxt-link>
        </Card>
      </div>
    </Card>
  </LayoutPage>
</template>

<script setup lang="ts">
import { useSubscription, useObservable } from '@vueuse/rxjs'
import { useDatabase } from '~/store/database'

const { getUserDatabase, seedUserLogbook, getLogbooksQuery } = useDatabase()

const db = await getUserDatabase()
// await db.waitForLeadership()

const logbooks = useObservable(db.logbooks.find({}).$)

// onMounted(() => {
//   console.log('Mounted', { ...logbooks.value })
// })

// watchEffect(() => {
//   console.log('Changed', logbooks.value)
// })
</script>
