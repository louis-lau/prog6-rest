import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as helmet from 'helmet'

import { AppModule } from './app.module'

declare const module: any

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  // app.use(helmet())
  app.enableCors({
    preflightContinue: true,
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  )

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Prog6 REST API')
    .setDescription('A movie collection')
    .setVersion('1.0')
    .addTag('Movies')
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup('swagger', app, swaggerDocument, {
    swaggerOptions: {
      defaultModelsExpandDepth: 0,
      operationsSorter: 'method',
      displayRequestDuration: true,
    },
  })

  await app.listen(3000)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose((): Promise<void> => app.close())
  }
}
bootstrap()
