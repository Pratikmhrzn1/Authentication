import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ← ADD THIS BLOCK TO ENABLE CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }); 
  // ← END OF CORS BLOCK

  await app.listen(3000);
  console.log('Backend running on http://localhost:3000');
}
bootstrap();