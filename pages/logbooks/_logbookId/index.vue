<template>
  <LayoutPage v-if="!$fetchState.pending">
    <LayoutPageHeader>
      <template #title>
        <div class="flex items-center gap-2">
          <FormKit
            v-if="edit"
            v-model="fields"
            name="logbook"
            @submit="save"
          >
            <FormLogbookFields />
          </FormKit>

          <h1 v-else>
            {{ logbook.value.name }}
          </h1>
        </div>
      </template>

      <template #inline-actions>
        <!-- Rename -->
        <template>
          <template v-if="edit">
            <button class="gap-2 btn btn-warning" @click="reset">
              Cancel
            </button>

            <button
              class="gap-2 btn btn-success"
              @click="$formulate.submit('logbook')"
            >
              Save
              <span>💾</span>
            </button>
          </template>

          <template v-else>
            <button class="gap-2 btn" @click="edit = true">
              Rename
              <span>✏️</span>
            </button>
          </template>
        </template>
      </template>

      <template #main-actions>
        <nuxt-link class="btn btn-primary" :to="logbook.getNewEntryRoute()">
          Add entry
        </nuxt-link>

        <nuxt-link class="btn btn-outline" :to="{ name: 'logbooks' }">
          Back to logbooks
        </nuxt-link>

        <button class="gap-2 btn btn-success" @click="downloadLogbook">
          Download
          <span>💾</span>
        </button>
      </template>
    </LayoutPageHeader>

    <template v-if="entries.length === 0">
      <p>There are no entries in this logbook.</p>
    </template>

    <template v-else>
      <Card class="mb-6 bg-base-200">
        <!-- <template #title>
        <h3>My progress</h3>
      </template> -->

        <div class="min-h-48">
          <ProgressChart
            v-if="entries.length > 1"
            :entries="entries"
            full
            @selected="chartClicked"
          />
        </div>
      </Card>

      <Card class="mb-6 bg-base-200">
        <div class="flex mb-2 space-x-4">
          <h2 class="self-end mr-auto text-lg font-medium">
            Recent entries
          </h2>
          <nuxt-link class="btn btn-primary" :to="logbook.getNewEntryRoute()">
            Add entry
          </nuxt-link>
        </div>

        <!-- Logbook entries feed -->
        <div class="space-y-1 entries">
          <!-- <h3 class="pt-4 text-lg font-medium">This week</h3> -->

          <!-- Most recent entry -->
          <nuxt-link
            v-if="lastEntry"
            :to="lastEntry.getRoute()"
            class="grid items-end grid-cols-3 entries__entry"
          >
            <span class="mr-auto text-lg font-medium">
              {{ recentDateFormatter.format(new Date(lastEntry.timestamp)) }}
            </span>

            <CircleSemi
              class="col-span-2 col-start-2 entry__slice"
              :state="{
                red: lastEntry.amountRed,
                amber: lastEntry.amountAmber,
                green: lastEntry.amountGreen,
              }"
            />
          </nuxt-link>

          <!-- Last week's entries -->
          <nuxt-link
            v-for="entry in lastWeekEntries"
            :key="entry.primary"
            :to="entry.getRoute()"
            class="grid items-end content-end grid-cols-3 entries__entry"
          >
            <span>
              {{ recentDateFormatter.format(new Date(entry.timestamp)) }}
            </span>

            <CircleStrip
              style="height: 60px"
              class="col-span-2 col-start-2 entry__slice"
              :state="{
                red: entry.amountRed,
                amber: entry.amountAmber,
                green: entry.amountGreen,
              }"
            />
          </nuxt-link>

          <!-- Older entries -->
          <!-- <h3 class="pt-4 text-lg font-medium">Older</h3> -->

          <nuxt-link
            v-for="entry in olderEntries"
            :key="entry.primary"
            :to="entry.getRoute()"
            class="grid items-center grid-cols-3 entries__entry"
          >
            <span>
              {{ olderDateFormatter.format(new Date(entry.timestamp)) }}
            </span>

            <CircleStrip
              style="height: 30px"
              class="col-span-2 col-start-2 entry__slice"
              :state="{
                red: entry.amountRed,
                amber: entry.amountAmber,
                green: entry.amountGreen,
              }"
            />
          </nuxt-link>
        </div>
      </Card>
    </template>

    <!-- -->
    <template v-if="!$fetchState.pending" #debug>
      <Card>
        <template #title>
          Saved data
        </template>
        <pre>{{ JSON.stringify(logbook, null, 2) }}</pre>
      </Card>
    </template>
  </LayoutPage>
</template>

<script lang="ts">
import { format } from 'date-fns'
import { useDatabase } from '~/store/database'
import { scaledMoodInput } from '~/data/config'

export default {

  async setup () {
    const { logbookId } = this.$route.params
    const { rxdb } = useDatabase()

    // Get logbook record from database.
    this.logbook = await rxdb.logbooks.findOne(logbookId).exec()

    // Get all entries.
    this.entries = await db.entries
      .find()
      .where({ logbook: logbookId })
      .sort({ timestamp: 'desc' })
      .exec()

    // Redirect if logbook is missing.
    if (!this.logbook) {
      return navigateTo({ name: 'logbooks' })
    }

    // Set form data.
    this.reset()
  },
  data () {
    return {
      logbook: null,
      edit: false,
      fields: {}
    }
  },

  computed: {
    logbookId () {
      return this.logbook?.primary
    },

    // Slices of logbook entries...
    lastEntry () {
      // Get last logbook entry.
      return this.entries[0]
    },

    lastWeekEntries () {
      // Get last weeks records.
      return this.entries
        .slice(1)
        .filter(
          entry =>
            Date.now() - 7 * 24 * 60 * 60 * 1000 < new Date(entry.timestamp)
        )
    },

    olderEntries () {
      // Get other records.
      return this.entries
        .slice(1)
        .filter(
          entry =>
            Date.now() - 7 * 24 * 60 * 60 * 1000 > new Date(entry.timestamp)
        )
    },

    // Setup date formatters...
    recentDateFormatter: () =>
      new Intl.DateTimeFormat('default', {
        weekday: 'long',
        month: '2-digit',
        day: '2-digit'
      }),

    olderDateFormatter: () =>
      new Intl.DateTimeFormat('default', {
        month: '2-digit',
        day: '2-digit'
      })
  },

  methods: {
    chartClicked (timestamp) {
      navigateTo({
        name: 'logbooks-logbookId-entries-entryId',
        params: {
          logbookId: this.logbook.primary,
          entryId: timestamp
        }
      })
    },

    async save (fields) {
      const data = {
        name: fields.name
      }

      await this.logbook.atomicPatch(data)

      //
      this.$fetch()
    },

    downloadLogbook () {
      const data = this.entries.map((entry) => {
        const { timestamp, comment, amountRed, amountAmber, amountGreen } =
          entry

        const mood = scaledMoodInput({
          amountRed,
          amountAmber,
          amountGreen
        })

        return [
          format(new Date(timestamp), 'yyyy-MM-dd'),
          comment,
          mood.amountRed.toFixed(4),
          mood.amountAmber.toFixed(4),
          mood.amountGreen.toFixed(4)
        ]
      })

      let csv = 'Date,Comment,Anxiety,Growth,Comfort,\n'
      data.forEach(function (row) {
        csv += row.join(',')
        csv += '\n'
      })

      const hiddenElement = document.createElement('a')
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv)
      hiddenElement.target = '_blank'
      hiddenElement.download = this.logbook.name + '.csv'
      hiddenElement.click()
    },
    reset () {
      const { name } = this.logbook
      console.log(this.logbook)

      this.fields = {
        name: this.logbook.name
      }
      this.$fetch() // Dirty
      //
      this.edit = false
    }
  }
}
</script>

<style scoped>
.entries__entry {
  transition: 0.5s;
  transition-property: opacity;
}

.entries:hover .entry__slice {
  opacity: 0.5;
}

.entries__entry:hover .entry__slice {
  opacity: 1;
}
</style>
