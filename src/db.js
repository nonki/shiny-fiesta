const games = [
  {
    title: 'Test Game 1',
    key: '12345-12345-12456'
  },
  {
    title: 'Test Game 2',
    key: '99999-99999-9999'
  }
]

module.exports.getGameByKey = (keyId, cbk) => {
  const id = parseInt(keyId)
  if (!games[id])
    return cbk({error: 'Game not found.'}, null)

  return cbk(null, games[id])
}
