import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ← ADD THIS BLOCK TO ENABLE CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Allow only your Vite frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // If you plan to send cookies/auth later
  });
  // ← END OF CORS BLOCK

  await app.listen(3000);
  console.log('🚀 Backend running on http://localhost:3000');
}
bootstrap();