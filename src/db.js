const games = require('../config/local/games.json')

module.exports = {
  getGameByKey: (keyId, cbk) => {
    const id = parseInt(keyId)
    return cbk(null, games.filter(el => el.id === keyId))
  },
  getGames: (cbk) => {
    return cbk(null, games)
  },
}
