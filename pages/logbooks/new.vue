<template>
  <LayoutPage>
    <LayoutPageHeader>
      <template #title>
        <h1>Add a new logbook</h1>
      </template>
    </LayoutPageHeader>

    <Card class="mb-4 bg-white">
      <FormLogbook @submit="save" />
    </Card>

    <div class="flex justify-end gap-2">
      <button class="btn btn-primary" @click="$formulate.submit('logbook')">
        Create logbook
      </button>
    </div>
  </LayoutPage>
</template>

<script lang="ts">
import { useDatabase } from '~/store/database'

export default {
  methods: {
    async save(fields) {
      const { userData } = useDatabase()

      // Create document in db.
      const doc = userData.logbooks.insert(fields)

      if (doc) {
        // Redirect to logbook page.
        return navigateTo(doc?.getRoute())
      }
    },
  },
}
</script>
