<template>
  <ClientOnly>
    <Head>
      <!-- <Script type="text/css" children="body { background-color: green; }" /> -->
    </Head>

    <div class="flex flex-col grow">
      <LayoutHeader />

      <LayoutContainer max="lg" class="my-4 px-2">
        <DemoWarning />
      </LayoutContainer>

      <NuxtErrorBoundary @error="logError">
        <slot class="px-4" />
      </NuxtErrorBoundary>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useObservable } from '@vueuse/rxjs'
import { useConfigStore } from '~/store/config'
import { useDatabase } from '~/store/database'

const { currentTheme } = storeToRefs(useConfigStore())
// const { userData } = storeToRefs(useDatabase())

useHead({
  bodyAttrs: {
    'data-theme': currentTheme,
  },
})

function logError(error) {
  const { message, stack } = error

  console.error({ message, stack })

  return error
}

const { getUserDatabase } = useDatabase()

// const db = useObservable((await getUserDatabase()).$)

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
