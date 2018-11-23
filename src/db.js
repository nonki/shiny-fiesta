const games = require('../config/local/games.json')

module.exports = {
  getGameByKey: (keyId, cbk) => {
    const id = parseInt(keyId)
    const game = games.filter(el => parseInt(el.id) === id)
    if (!game) {
      return cbk({ error: 'Game not found.' }, null)
    }

    return cbk(null, game)
  },
  getGames: (cbk) => {
    return cbk(null, games)
  },
}
