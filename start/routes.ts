    /*
    |--------------------------------------------------------------------------
    | Routes file
    |--------------------------------------------------------------------------
    |
    | The routes file is used for defining the HTTP routes.
    |
    */
    import swaggerOptions from '#config/swagger'
    import swaggerUi  from 'swagger-ui-express'
    import swaggerJsdoc from 'swagger-jsdoc'


    import router from '@adonisjs/core/services/router'
    const FindlocsController = () => import('#controllers/findlocs_controller')

    router.get('/locs', [FindlocsController, 'findlocs'])
    router.get('/findloc', [FindlocsController, 'partner'])
    router.get('/order', [FindlocsController, 'findNearby'])
    router.on('/').render('pages/home')



    const swaggerDocs = swaggerJsdoc(swaggerOptions)
    router
    .get('/docs', ({ response }) => {
        response.send(swaggerUi.generateHTML(swaggerDocs))
    })
    .as('swagger')
    router
    .get('/swagger.json', ({ response }) => {
        response.send(swaggerDocs)
    })
    .as('swagger-json')

    /**
 * @swagger
 * /locs:
 *   get:
 *     description: Get all locations
 *     responses:
 *       200:
 *         description: Successful response
 *    model
 * 
 */