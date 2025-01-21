<template>
  <div class="w-full">
    <canvas ref="canvas" />
  </div>
</template>

<script lang="ts">
import { Chart } from 'chart.js'
import tailwindConfig from '#tailwind-config'
// import { defaultsDeep } from 'lodash-es'

export default defineComponent({
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    entries: {
      type: [Object, Array],
      default () {
        return {}
      }
    },
    full: {
      type: Boolean,
      default: false
    }
  },
  emits: ['selected'],
  setup (props, { emit, refs }) {
    const chart = ref(null)

    //
    const canvas = ref(null)

    const defaultOptions = readonly({
      animation: false,
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      },
      elements: {
        point: {
          pointStyle: 'circle',
          radius: 0
        },
        line: {
          showLine: false,
          borderWidth: 0,
          tension: 1 / 4
        }
      },
      // layout: {
      //   padding: props.full ? 80 : 0,
      // },
      scales: {
        x: {
          display: props.full,
          type: 'timeseries',
          time: {
            unit: 'day'
          },
          ticks: {
            auto: true,
            display: true,
            align: 'start',
            // showLabelBackdrop: true,
            source: 'data',
            // maxTicksLimit: 12,
            minRotation: 0
          },
          grid: {
            display: true
          }
          // max: new Date(),
          // suggestedMax: new Date(),
        },
        y: {
          display: false,
          min: 0,
          max: props.full ? 1.03 : 1
        }
      },
      onClick (event, elements = [], legend) {
        const first = elements[0]

        if (first && first.element) {
          const dataset = legend.data?.datasets[first.datasetIndex]
          const pointData = dataset?.data[first.index]
          const primary = pointData?.id

          emit('selected', primary)
        }
      }
    })

    const chartOptions = reactive(props.options || {})
    Object.assign(chartOptions, defaultOptions)

    const chartData = computed({
      get () {
        //
        const datasets = props.entries.reduce(
          (accumulator, entry) => {
            accumulator.red.push({
              primary: entry.primary,
              x: entry.timestamp,
              y: entry.amountRed ?? 0
            })
            accumulator.amber.push({
              primary: entry.primary,
              x: entry.timestamp,
              y: entry.amountAmber ?? 0
            })
            accumulator.green.push({
              primary: entry.primary,
              x: entry.timestamp,
              y: entry.amountGreen ?? 0
            })
            return accumulator
          },

          // Initial value.
          {
            red: [],
            amber: [],
            green: []
          }
        )

        // NEED TO FIND CURRENT THEME FOR BELOW
        const { comfort, growth, anxiety } = tailwindConfig.theme.colors

        return {
          datasets: [
            {
              fill: {
                target: 'origin',
                above: comfort
              },
              data: datasets.green,
              stepped: props.full ? false : 'before'
            },
            {
              fill: {
                target: 'origin',
                above: growth
              },
              data: datasets.amber,
              stepped: props.full ? false : 'before'
            },
            {
              fill: {
                target: 'origin',
                above: anxiety
              },
              data: datasets.red,
              stepped: props.full ? false : 'before'
            }
          ]
        }
      }
    })

    onMounted(() => {
      const { canvas } = refs

      chart.value = new Chart(canvas, {
        type: 'line',
        options: chartOptions,
        data: {
          datasets: chartData.value.datasets
        }
      })

      chart.value.update()
    })

    // Update chart on changes.
    watch(chartData, (value, oldValue) => {
      if (!(value && chart.value?.data?.datasets?.length > 0)) {
        return
      }

      console.log('Updating chart...')
      chart.value.data.datasets = value.datasets
      chart.value?.update()
    })

    return { canvas, chart, chartOptions, chartData }
  }
})
</script>
