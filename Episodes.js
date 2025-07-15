function getFilled(column) {
  let unitsFilled = 0
  for (let i = 1; i < column.length; i++) {
    let height = column[i]
    let units = Math.min.apply(null, [Math.max.apply(null, column.slice(i + 1, column.length)), Math.max.apply(null, column.slice(0, i))])
    if (units > height) {
        unitsFilled += units - height
    }
  }
  return unitsFilled
}

console.log(getFilled([1, 3, 1, 4, 1, 2, 3, 1])) // expected result 5