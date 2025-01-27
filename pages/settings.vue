<template>
  <!-- v-if="!$fetchState.pending" -->
  <LayoutPage>
    <LayoutPageHeader>
      <template #title>
        <div class="flex items-center gap-2">
          <h1>Settings</h1>
        </div>
      </template>
    </LayoutPageHeader>

    <!-- <Card class="mb-6 bg-white">
      <template #title>
        <h2>Account Info</h2>
      </template>
      <h3>Email</h3>
      <h3>Password</h3>
    </Card> -->

    <!-- Remote storage -->
    <Card class="mb-6 bg-base-200">
      <template #title>
        <h2>Backup and sync</h2>
      </template>

      <div class="flex flex-col grow">
        <PlaceholderNote class="mb-4" />

        <ConnectRemoteStorage />
      </div>
    </Card>

    <!-- Theme -->
    <Card class="mb-6 bg-base-200">
      <template #title>
        <h2>Theme</h2>
      </template>

      <div class="flex flex-col">
        <PlaceholderNote class="mb-4" />

        <div class="grid grid-cols-4 gap-2">
          <SettingsThemePreview
            v-for="(themeName, index) in themeNames"
            :key="index"
            :theme-name="themeName"
          />
        </div>
      </div>
    </Card>
  </LayoutPage>
</template>

<script lang="ts">
import tailwindConfig from '#tailwind-config'

export default {
  data() {
    return {}
  },
  computed: {
    themeNames() {
      // Get themes list from daisyui config.
      // const fullConfig = resolveConfig(tailwindConfig)

      const { themes } = tailwindConfig.daisyui

      // Get a theme name string from each config item.
      return Object.entries(themes)
        .map(function ([key, value]) {
          if (typeof key === 'string') {
            const theme = key.match(/\[data-theme=(.*)\]/)
            console.log({ key, value, theme })

            if (theme) {
              return theme[1]
            }

            return key
          }

          // Simple string keys.
          if (typeof value === 'string') {
            return value
          }

          // User defined theme objects.
          if (key instanceof Object) {
            const keys = Object.keys(key)
            return keys[0]
            // return theme
          }

          return null
        })
        .filter(function (themeName) {
          return typeof themeName === 'string'
        })
    },
  },
  mounted() {
    const { themeNames } = this

    // console.log({ tailwindConfig, themeNames })
    // debugger
  },
  methods: {},
}
</script>
