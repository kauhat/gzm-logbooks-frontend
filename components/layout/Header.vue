<template>
  <div class="text-gray-800 border-b border-base-200 bg-base-100">
    <LayoutContainer class="flex flex-col gap-1">
      <div class="flex-wrap gap-2 navbar md:flex-nowrap">
        <!-- Title -->
        <div
          class="flex flex-col items-start w-auto grow min-w-fit basis-1/2 md:text-center text-base-content md:navbar-center md:w-auto"
        >
          <nuxt-link to="/" class="text-lg font-bold md:text-">
            {{ title }}
          </nuxt-link>

          <span class="text-sm">{{ buildName }}</span>
        </div>

        <!-- Left buttons -->
        <div class="w-auto gap-2 md:order-first md:navbar-start">
          <button
            v-if="canGoBack"
            class="btn btn-outline"
            @click="$router.back()"
          >
            Back
          </button>
        </div>

        <!-- Right buttons -->
        <div
          class="flex-wrap gap-2 md:min-w-fit md:justify-end md:order-last md:navbar-end"
        >
          <a
            href="https://forms.gle/8LsDP9BTpcNFk9nZ9"
            target="_blank"
            class="gap-2 btn btn-outline"
          >
            Feedback
            <span>📝</span>
          </a>

          <div
            class="tooltip tooltip-info tooltip-bottom"
            data-tip="Report bugs and suggest features"
          >
            <a
              href="https://github.com/kauhat/gzm-logbooks-frontend/issues/new/choose"
              target="_blank"
              class="gap-2 btn btn-outline"
            >
              Github
              <span>🐛</span>
            </a>
          </div>

          <div
            class="tooltip tooltip-error tooltip-bottom"
            data-tip="This will wipe all your logbooks!"
          >
            <button class="gap-2 btn btn-warning" @click="resetDatabase()">
              Reset data
              <span>🔥</span>
            </button>
          </div>

          <nuxt-link class="gap-2 btn btn-outline" to="/settings">
            Settings
            <span>⚙️</span>
          </nuxt-link>
        </div>
      </div>

      <!--
      <div class="flex justify-center flex-1 order-last gap-2 grow">
      <div class="md:hidden">
        <a
          href="https://forms.gle/8LsDP9BTpcNFk9nZ9"
          target="_blank"
          class="gap-2 btn btn-info"
        >
          Feedback Form
          <span>📝</span>
        </a>
        </div>
        <div class="md:hidden">

        <button class="gap-2 btn btn-warning" @click="resetDatabase()">
          Reset data
          <span>🔥</span>
        </button>
      </div>
      </div> -->
    </LayoutContainer>
  </div>
</template>

<script lang="ts">
import { useDatabase } from '~/store/database'

export default {
  data () {
    const { siteTitle: title, appInfo } = this.$config.public
    const { buildName } = appInfo

    return {
      title,
      buildName
    }
  },

  computed: {
    canGoBack () {
      // const router = useRouter()
      const { $router } = this

      console.log({ $router })

      // FIXME: Get history from router.
      // return window?.history?.length > 2

      return false
    }
  },

  methods: {
    async resetDatabase () {
      // TODO: Get storage..
      // const router = useRouter()
      const { $router } = this

      try {
        useDatabase().resetDatabase()
      } finally {
        // $router.go('/')
        useNuxtApp()

        // TODO: Doesn't work.
        await this.$nuxt.refresh()
      }
    }
  }
}
</script>
