<template>
  <ClientOnly>
    <Head>
      <!-- <Script type="text/css" children="body { background-color: green; }" /> -->
    </Head>

    <div class="flex flex-col grow" :data-theme="themeName">
      <LayoutHeader />

      <LayoutContainer max="lg" class="my-4 px-2">
        <DemoWarning />
      </LayoutContainer>

      <NuxtErrorBoundary @error="logError">
        <slot v-if="rxdb" class="px-4" />
      </NuxtErrorBoundary>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">

import { useDatabase } from '~/store/database'
</script>

<script lang="ts">
import { useConfigStore } from '~/store/config'

export default {
  computed: {
    themeName () {
      const configStore = useConfigStore()

      return configStore.currentTheme
    }
  },
  mounted () {
    // Print routes for debug.
    // console.log('Routes...', this.$nuxt.context.app.router.getRoutes())
  },
  methods: {
    logError: error => console.error(error)
  }
}
</script>

<style>
html,
body,
#__nuxt,
#__layout {
  height: 100%;
}

#__layout {
  display: flex;
  flex-direction: column;
}
</style>
