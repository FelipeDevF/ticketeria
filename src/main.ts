import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração global de CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  });

  // Configuração global de pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Filtros globais de exceção
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new ValidationExceptionFilter(),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('🎫 Ticketeria API')
    .setDescription(`
      Sistema completo de vendas de ingressos online.
      
      ## Funcionalidades
      - Autenticação JWT com refresh tokens
      - Gestão de eventos e ingressos
      - Sistema de pedidos e pagamentos
      - Controle de roles (Admin, Organizador, Cliente)
      
      ## Autenticação
      Use o endpoint /auth/login para obter um token JWT e inclua no header Authorization: Bearer {token}
    `)
    .setVersion('1.0.0')
    .addTag('auth', 'Autenticação e autorização')
    .addTag('users', 'Gestão de usuários')
    .addTag('events', 'Gestão de eventos')
    .addTag('tickets', 'Gestão de ingressos')
    .addTag('orders', 'Gestão de pedidos')
    .addTag('payments', 'Gestão de pagamentos')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addServer('http://localhost:3000', 'Servidor de Desenvolvimento')
    .addServer('https://api.ticketeria.com', 'Servidor de Produção')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: '🎫 Ticketeria API Documentation',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #2c3e50; font-size: 2.5em; }
      .swagger-ui .info .description { font-size: 1.1em; line-height: 1.6; }
    `,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`
🚀 Ticketeria API está rodando!
📚 Documentação: http://localhost:${port}/docs
🌐 Servidor: http://localhost:${port}
🔧 Ambiente: ${process.env.NODE_ENV || 'development'}
  `);
}

bootstrap();
