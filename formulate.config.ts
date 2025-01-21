export default {
  library: {
    'mood-circle': {
      component: 'FormulateCircleInput'
    }
  },
  classes: {
    outer: 'mb-4',
    element: 'form-control',
    input (context, classes) {
      const _classes = classes.concat([
        getDaisyUiInputClass(context.classification)
      ])

      return _classes
    },
    label: 'label label-text',
    help: 'text-xs mb-1 text-gray-600',
    error: 'text-xs mb-1 text-red-700'
  }
}

/**
 *
 * @param {*} type
 * @returns
 */
function getDaisyUiInputClass (type) {
  if (type === 'button') {
    return 'btn'
  }

  if (type === 'textarea') {
    return 'textarea textarea-bordered'
  }

  return 'input input-bordered'
}
