import swaggerJsDoc from 'swagger-jsdoc'
import path from 'path'

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fast Delivery',
            version: '1.0.0',
            description: 'A simple Express API',
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Local server',
            },
        ],
    },
    apis: [
        path.resolve(__dirname, './docs/admin-routes.ts'),
        path.resolve(__dirname, './docs/driver-routes.ts'),
        path.resolve(__dirname, './docs/order-routes.ts'),
        path.resolve(__dirname, './docs/package-routes.ts'),
    ],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)

export default swaggerDocs
