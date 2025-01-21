import { clamp, defaults } from 'lodash-es'

export const growthInputDefaults = {
  padding: 0.05,
  minRadius: 0.1,
  maxDepth: 2
}

export const analysisSectionPrompts = [
  'Zone not found', // Zone 0 (null)
  'You were in the best zone for learning, good job! What do you think helped you stay in the growth zone?',
  'Looks like you have found your growth zone, what could you do to spend more time there?',
  'Looks like you have found your growth zone, what could you do to spend more time there?',
  'Looks like you stayed in the comfort zone a lot of the time. What could you do to challenge yourself?',
  'Looks like you need to develop a growth zone, where you feel safe to take risks and can cope with manageable challenges. What could help youfeel safe enough to take a risk?',
  'Looks like you felt out of your depth a lot of the time. What could you have done to calm down?'
]

/**
 *
 */
export function validateMoodInput (value) {
  const { padding, minRadius } = growthInputDefaults

  const amountGreen = clamp(value.amountGreen, minRadius, 1 - padding * 2)
  const amountAmber = clamp(
    value.amountAmber,
    amountGreen + padding,
    1 - padding
  )

  return {
    amountGreen,
    amountAmber,
    amountRed: 1
  }
}

/**
 *
 */
export function scaledMoodInput ({ amountRed, amountAmber, amountGreen }) {
  return {
    amountRed: (amountRed - amountAmber - 0.05) / 0.8,
    amountAmber: (amountAmber - amountGreen - 0.05) / 0.8,
    amountGreen: (amountGreen - 0.1) / 0.8
  }
}

/**
 *
 */
export function getTriangleSection ({ amountRed, amountAmber, amountGreen }) {
  if (amountRed < 1 / 3 && amountGreen < 1 / 3) {
    return 1
  } else if (amountRed < 1 / 3 && amountGreen < 2 / 3) {
    return 2
  } else if (amountRed < 2 / 3 && amountGreen < 1 / 3) {
    return 3
  } else if (amountGreen > 2 / 3) {
    return 4
  } else if (amountRed > 1 / 3 && amountGreen > 1 / 3) {
    return 5
  } else if (amountRed > 2 / 3) {
    return 6
  }

  return null
}
