const serializeArray = (array = [], serializeItem) => {
  let needFilter = false

  let newArray = array.map((item) => {
    if (!item) {
      needFilter = true
      return null
    }

    return serializeItem(item)
  })

  if (needFilter) newArray = newArray.filter((item) => !!item)

  return newArray
}

export default serializeArray
