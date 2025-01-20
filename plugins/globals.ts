import { get } from 'lodash-es'
import {
  Chart,
  //   ArcElement,
  LineElement,
  BarElement,
  PointElement,
  //   BarController,
  //   BubbleController,
  //   DoughnutController,
  LineController,
  //   PieController,
  //   PolarAreaController,
  //   RadarController,
  //   ScatterController,
  CategoryScale,
  LinearScale,
  //   LogarithmicScale,
  //   RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
} from 'chart.js'
// import { Vue } from '#app'
// import VueRx from 'vue-rx'
import 'chartjs-adapter-date-fns'


//
// Vue.use(VueRx)

//
// Vue.prototype.$get = get

Chart.register(
  //   ArcElement,
  LineElement,
  BarElement,
  PointElement,
  //   BarController,
  //   BubbleController,
  //   DoughnutController,
  LineController,
  //   PieController,
  //   PolarAreaController,
  //   RadarController,
  //   ScatterController,
  CategoryScale,
  LinearScale,
  //   LogarithmicScale,
  //   RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip
)

/**
 * Register the plugin...
 */
export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  // Default export required.

  return {
    provide: {
      poopies: true
    }
  }
})
