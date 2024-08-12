import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class FindlocsController {
  async findlocs({ request, response }: HttpContext) {
    const locationString = request.input('location') // Example: "40.712784 -74.005941"
    const [latitude, longitude] = locationString
      .split(' ')
      .map((coord: string) => parseFloat(coord))
    console.log(longitude)
    await db.rawQuery(
      `INSERT INTO locs (location) VALUES (ST_GeogFromText('SRID=4326;POINT(${longitude} ${latitude})')::geography)`
    )

    return response.status(201).send({ message: 'Location stored successfully' })
  }

  public async findNearby({ request, response }: HttpContext) {
    const locationString = request.input('location') // Example: "40.712784 -74.005941"
    const coordinates = locationString.split(' ').filter(Boolean)
    console.log(coordinates)
    var i = 0
    const [latitude, longitude] = coordinates.map((coord: string) => {
      const cleanedCoord = coord.replace(/['"]/g, '')
      console.log(i++)
      console.log(parseFloat(cleanedCoord))
      return parseFloat(cleanedCoord)
    })
    console.log('latitude:', latitude, 'longitude:', longitude)
    const nearbyLocs = await db
      .from('locs')
      .select('*')
      .select(
        db.raw(
          `
        ST_Distance(
          location,
          ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography
        ) AS distance
      `,
          [longitude, latitude]
        )
      )

    return response.status(200).send(nearbyLocs)
  }

  public async partner({ request, response }: HttpContext) {
    const locationString = request.input('location') // Example: "40.712784 -74.005941"
    const coordinates = locationString.split(' ').filter(Boolean)
    console.log(coordinates)
    var i = 0
    const [latitude, longitude] = coordinates.map((coord: string) => {
      const cleanedCoord = coord.replace(/['"]/g, '')
      console.log(i++)
      console.log(parseFloat(cleanedCoord))
      return parseFloat(cleanedCoord)
    })
    console.log('latitude:', latitude, 'longitude:', longitude)
    const nearbyLocs = await db
      .from('locs')
      .select('*')
      .whereRaw(
        `
        ST_DWithin(
          location,
          ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography,
          ?
        )
      `,
        [longitude, latitude, 20000]
      )

    return response.status(200).send(nearbyLocs)
  }
}
// ///const distances = await Database
//       .from('locs')
//       .select('*')
//       .select(Database.raw(`
//         ST_Distance(
//           location,
//           ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography
//         ) AS distance
//     //   `, [longitude, latitude]

