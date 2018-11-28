const games = require(`../config/local/games.json`)

module.exports = {
  getGameByKey: (keyId, cbk) => {
    const id = parseInt(keyId)
    let game = games.filter(el => parseInt(el.id) === id).pop()
    if (!game) {
      return cbk({}, null)
    }

    if (process.env.ENV.toLowerCase() !== 'live') {
      game.key = '3V6YG-99BCK-9LQKK'
    }

    return cbk(null, game)
  },
  getGames: (cbk) => {
    let gamesReturn = games
    if (process.env.ENV.toLowerCase() !== 'live') {
      gamesReturn = [...gamesReturn.map(el => el.id)]
    }

    return cbk(null, gamesReturn)
  },
}
