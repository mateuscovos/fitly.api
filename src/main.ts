import { NestFactory } from '@nestjs/core' 
import { FastifyAdapter, NestFastifyApplication, } from '@nestjs/platform-fastify' 
import { AppModule } from './app.module' 
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger' 

async function bootstrap() {
  const adapter = new FastifyAdapter({ logger: true, })
  adapter.useStaticAssets({ root: '/' })

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter
  ) 

  const config = new DocumentBuilder()
    .setTitle('Fitly docs')
    .setDescription('Fitly is a service for quickly and efficiently shortening URLs.')
    .setVersion('0.1')
    .addTag('url')
    .build() 

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  } 

  const document = SwaggerModule.createDocument(app, config, options) 
  SwaggerModule.setup('docs', app, document) 

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(3000, '0.0.0.0') 
}
bootstrap() 