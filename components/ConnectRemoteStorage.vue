<template>
  <div id="remoteStorageWidget" ref="widgetContainer" />
</template>

<script lang="ts">
import Widget from 'remotestorage-widget'

export default {
  async mounted () {
    const { $remoteStorage: storage } = this
    const { widgetContainer: element } = this.$refs

    console.log({ storage, element })

    if (!storage || !element) {
      throw new Error('Could not set up remote storage widget.')
    }

    //
    await storage.on('ready', async () => {
      console.log({ Widget })
      // const Widget = await import('remotestorage-widget')
      const widget = Widget
      // .then(
      //   (widget) => widget.attach(element.id)
      // )
    })
  }
}
</script>
