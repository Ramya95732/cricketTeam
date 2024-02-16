const express = require('express')
const app = express()
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
app.use(express.json())

const dbPath = path.join(__dirname, 'cricketTeam.db')

let db = null

//API1
const initialize = async () => {
  try {
    db = await open({
      fileName: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => console.log('Success'))
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
initialize()

const convertDBobjTOResponseObj = dbObject => {
  return {
    playerId: dbObject.player_id,
    playerName: dbObject.playerName,
    jerseyNumber: dbObject.jersey_number,
    role: dbObject.role,
  }
}

app.get('/players/', async (request, response) => {
  const getNames = `
    SELECT 
     *
    FROM 
    cricket_team
    `
  const NamesArray = await db.all(getNames)
  response.send(NamesArray.map(i => convertDBobjTOResponseObj(i)))
})
