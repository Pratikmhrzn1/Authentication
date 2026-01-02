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
      // Check if email exists
      try {
        await this.firebaseService.getUserByEmail(email);
        throw new BadRequestException('Email already registered');
      } catch (err: any) {
        if (err.code !== 'auth/user-not-found') throw err;
      }
      // Create user
      const userRecord = await this.firebaseService.createUser(email, password);

      const nepaliYear = new Date().getFullYear() + 56;
      const sequence = await this.getNextUserSequence();

      const appId = `USER-${nepaliYear}-${String(sequence).padStart(4, '0')}`;

      const userData = {
        appId,
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

      const customToken = await this.firebaseService
        .getAuth()
        .createCustomToken(userRecord.uid);

      this.logger.log(`Signup successful: ${email}`);
      return {
        uid: userRecord.uid,
        email,
        appId,
        customToken,
        message: 'Signup successful',
      };
    } catch (error: any) {
      this.logger.error('Signup failed', error.stack);
      throw new BadRequestException(error.message || 'Signup failed');
    }
  }

 
  async login(dto: LoginDto) {
  const { email, password } = dto;

  try {
    // 1. Get user record (this proves user exists in Firebase Auth)
    const userRecord = await this.firebaseService.getUserByEmail(email);
    // 2. Generate custom token (server-side, trusted)
    const customToken = await this.firebaseService.getAuth().createCustomToken(userRecord.uid);
    this.logger.log(`Login successful (custom token): ${email}`);
    return {
      customToken,
      uid: userRecord.uid,
      email: userRecord.email || email,
      message: 'Login successful. Use customToken to sign in on client.',
    };
  } catch (error: any) {
    this.logger.error('Login failed', error.stack);

    // Specific error messages
    if (error.code === 'auth/user-not-found') {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (error.code === 'auth/wrong-password') {
      throw new UnauthorizedException('Invalid email or password');
    }

    throw new UnauthorizedException('Invalid email or password');
  }
}
  async getProfile(uid: string) {
    const doc = await this.firebaseService
      .getFirestore()
      .collection('userList')
      .doc(uid)
      .get();

    if (!doc.exists) {
      throw new BadRequestException('User profile not found');
    }

    return { uid, ...doc.data() };
  }
  private async getNextUserSequence(): Promise<number> {
    const counterRef = this.firebaseService
      .getFirestore()
      .collection('counters')
      .doc('userSequence');

    return this.firebaseService.getFirestore().runTransaction(async (tx) => {
      const doc = await tx.get(counterRef);
      const count = doc.exists ? (doc.data()?.count || 0) + 1 : 1;
      tx.set(counterRef, { count }, { merge: true });
      return count;
    });
  }
}
