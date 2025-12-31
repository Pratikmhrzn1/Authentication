import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import axios from 'axios';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly firebaseService: FirebaseService) {}

  async signup(dto: SignupDto) {
    const { email, password, fullName, phoneNumber, role = 2 } = dto;

    try {
      // Check if user exists
      try {
        await this.firebaseService.getUserByEmail(email);
        throw new BadRequestException('Email already registered');
      } catch (error: any) {
        if (error.code !== 'auth/user-not-found') throw error;
      }

      // Create in Firebase Auth
      const userRecord = await this.firebaseService.createUser(email, password);

      // Save profile in Firestore
      const userData = {
        email,
        fullName: fullName || '',
        phoneNumber: phoneNumber || '',
        role,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };

      await this.firebaseService
        .getFirestore()
        .collection('userList')
        .doc(userRecord.uid)
        .set(userData);

      // Generate custom token for immediate login
      const customToken = await this.firebaseService.getAuth().createCustomToken(userRecord.uid);

      this.logger.log(`Signup successful: ${email}`);

      return {
        uid: userRecord.uid,
        email,
        customToken,
        message: 'Signup successful. Use customToken to sign in.',
      };
    } catch (error: any) {
      this.logger.error('Signup failed', error.stack);
      throw new BadRequestException(error.message || 'Signup failed');
    }
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;
    try {
      // Verify user exists
      const userRecord = await this.firebaseService.getUserByEmail(email);
      const apiKey = process.env.FIREBASE_API_KEY;
      if (!apiKey) {
        const customToken = await this.firebaseService.getAuth().createCustomToken(userRecord.uid);
        return {
          customToken,
          uid: userRecord.uid,
          email,
          message: 'Use custom token to sign in (exchange on client)',
        };
      }

      // Get real ID token via REST API
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        { email, password, returnSecureToken: true },
      );

      const { idToken, refreshToken, expiresIn } = response.data;

      return {
        idToken,
        refreshToken,
        expiresIn: parseInt(expiresIn),
        uid: userRecord.uid,
        email,
        message: 'Login successful',
      };
    } catch (error: any) {
      this.logger.error('Login failed', error.stack);
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  async getProfile(uid: string) {
    const doc = await this.firebaseService
      .getFirestore()
      .collection('userList')
      .doc(uid)
      .get();

    if (!doc.exists) throw new BadRequestException('User not found');

    return { uid, ...doc.data() };
  }
}