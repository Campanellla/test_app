const serializeIds = (list = []) => list.map((id) => ({ id: String(id) }))

export default serializeIds
