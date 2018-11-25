const games = require(`../config/local/games.json`)

module.exports = {
  getGameByKey: (keyId, cbk) => {
    const id = parseInt(keyId)
    let game = games.filter(el => parseInt(el.id) === id).pop()
    if (!game) {
      return cbk({}, null)
    }

    if (process.env.ENV.toLowerCase() !== 'live') {
      game.key = '11111-22222-33333'
    }

    return cbk(null, game)
  },
  getGames: (cbk) => {
    let gamesReturn = games
    if (process.env.ENV.toLowerCase() !== 'live') {
      gamesReturn = gamesReturn.map(el => {
        return {
          ...el,
          key: '11111-22222-33333',
        }
      })
    }

    return cbk(null, gamesReturn)
  },
}
