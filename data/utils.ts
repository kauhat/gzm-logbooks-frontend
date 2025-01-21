export const entryAmountsToCircleInputModel = function (entry) {
  return {
    red: entry.amountRed,
    amber: entry.amountAmber,
    green: entry.amountGreen
  }
}

export const circleInputModelToEntryAmounts = function (model) {
  return {
    amountRed: 1, // Outer ring is fixed.
    amountAmber: model.amber,
    amountGreen: model.green
  }
}
