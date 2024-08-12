// config/swagger.ts
export default {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'AdonisJS API Documentation',
      version: '1.0.0',
      description: 'API documentation for your AdonisJS project',
    },
    servers: [
      {
        url: 'http://localhost:3333',
        description: 'Development server',
      },
    ],
  },
  apis: ['../app/**/*.ts', '../start/routes.ts'],
}
