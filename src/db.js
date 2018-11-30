const games = require(`../config/local/games.json`)

module.exports = {
  getGameByKey: (keyId, cbk) => {
    const id = parseInt(keyId)
    let game = games.filter(el => parseInt(el.id) === id).pop()
    if (!game) {
      return cbk({}, null)
    }

    if (process.env.ENV.toLowerCase() !== 'live') {
      game.key = process.env.DEV_KEY
    }

    return cbk(null, game)
  },
  getGames: (cbk) => {
    return cbk(null, [...games.map(el => el.id)])
  },
}
