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
      // Check if email already exists
      try {
        await this.firebaseService.getUserByEmail(email);
        throw new BadRequestException('Email already registered');
      } catch (error: any) {
        if (error.code !== 'auth/user-not-found') {
          throw error;
        }

      }
      // Create user in Firebase Authentication
      const userRecord = await this.firebaseService.createUser(email, password);
      // Generate custom readable appId: USER-2082-0001
      const Year = new Date().getFullYear();
      const currentYear=Year+56;
      const userCount = await this.getNextUserSequence();
      const appId = `USER-${currentYear}-${String(userCount).padStart(4, '0')}`; 
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

      if (role >= 3) {
        const collectionName= role ===4?'operatorUsers':'adminUsers';
        await this.firebaseService
          .getFirestore()
          .collection(collectionName)
          .doc(userRecord.uid)
          .set({ ...userData, userType: role });
      }

      // Generate custom token for immediate login
      const customToken = await this.firebaseService.getAuth().createCustomToken(userRecord.uid);
      const roleName = {
        1:'Super Admin',
        2:'User',
        3:'Admin',
        4:'Operator',
      }[role] || 'User';
      this.logger.log(`Signup successful: ${email} | appId: ${appId} | Role:${roleName}`);

      return {
        uid: userRecord.uid,
        email,
        appId,
        customToken,
        roleName,
        message: 'Signup successful. Use customToken to sign in on client.',
      };
    } catch (error: any) {
      this.logger.error('Signup failed', error.stack);
      throw new BadRequestException(error.message || 'Signup failed');
    }
  }

  /**
   * Generate sequential number for appId using Firestore transaction
   * Ensures no duplicates even with concurrent signups
   */
  private async getNextUserSequence(): Promise<number> {
    const counterRef = this.firebaseService
      .getFirestore()
      .collection('counters')
      .doc('userSequence');

    return this.firebaseService.getFirestore().runTransaction(async (transaction) => {
      const doc = await transaction.get(counterRef);

      let newCount = 1;
      if (doc.exists) {
        newCount = (doc.data()?.count || 0) + 1;
      }

      // Save incremented count
      transaction.set(counterRef, { count: newCount }, { merge: true });

      return newCount;
    });
  }

  
  async login(dto: LoginDto) {
    const { email, password } = dto;

    try {
      // Verify user exists in Auth
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

      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
        { email, password, returnSecureToken: true },
      );

      const { idToken, refreshToken, expiresIn } = response.data;

      this.logger.log(`Login successful: ${email}`);

      return {
        idToken,
        refreshToken,
        expiresIn: parseInt(expiresIn),
        uid: userRecord.uid,
        email,
        message: 'Login successful. Use idToken with Firebase client SDK.',
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

    if (!doc.exists) {
      throw new BadRequestException('User profile not found');
    }

    return {
      uid,
      ...doc.data(),
    };
  }
}