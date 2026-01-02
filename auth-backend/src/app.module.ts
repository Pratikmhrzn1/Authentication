import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import * as admin from 'firebase-admin';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    FirebaseModule,
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    if (!admin.apps.length) {
      try {
        const privateKey = this.configService.get<string>('FIREBASE_PRIVATE_KEY');
        if (!privateKey) {
          throw new Error('FIREBASE_PRIVATE_KEY missing');
        }

        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
            clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
            privateKey: privateKey.replace(/\\n/g, '\n'),  
          }),
        });
        console.log('Firebase Admin initialized successfully');
      } catch (error) {
        console.error('Firebase Admin init failed:', error);
      }
    }
  }
}