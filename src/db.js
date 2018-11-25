const games = require(`../config/local/games.${process.env.ENV}.json`)

module.exports = {
  getGameByKey: (keyId, cbk) => {
    const id = parseInt(keyId)
    const game = games.filter(el => parseInt(el.id) === id).pop()
    if (!game) {
      return cbk({}, null)
    }

    return cbk(null, game)
  },
  getGames: (cbk) => {
    return cbk(null, games)
  },
}
