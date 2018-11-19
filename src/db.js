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
  if (!games[keyId])
    return cbk({error: 'Game not found.'}, null)

  return cbk(null, games[keyId])
}
