const games = require('../config/local/games.json')

module.exports.getGameByKey = (keyId, cbk) => {
  const id = parseInt(keyId)
  if (!games[id])
    return cbk({error: 'Game not found.'}, null)

  return cbk(null, games[id])
}
