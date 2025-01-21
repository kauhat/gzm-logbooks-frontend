import { defineStore, acceptHMRUpdate } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useConfigStore = defineStore('config', {
  state: () => ({ currentTheme: useLocalStorage('config/currentTheme', null) }),
  getters: {
  },
  actions: {
    switchTheme (newTheme: string) {
      this.currentTheme = newTheme
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfigStore, import.meta.hot))
}
