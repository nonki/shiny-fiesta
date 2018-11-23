const games = require('../config/local/games.json')

module.exports = {
  getGameByKey: (keyId, cbk) => {
    const id = parseInt(keyId)
    const game = games.filter(el => el.id === keyId).pop()
    if (game) {return cbk({ error: 'Game not found.' }, null)}

    return cbk(null, game)
  },
  getGames: (cbk) => {
    return cbk(null, games)
  },
}
