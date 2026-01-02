import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as admin from 'firebase-admin';

declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken;
    }
  }
}

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header. Expected: Bearer <idToken>');
    }

    const idToken = authHeader.split('Bearer ')[1].trim();

    if (!idToken) {
      throw new UnauthorizedException('No Firebase ID token provided');
    }

    try {
      // Verify the Firebase ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      // Attach the decoded user info to the request
      request.user = decodedToken;

      return true;
    } catch (error: any) {
      // Handle common Firebase auth errors with friendly messages
      const errorMessage = {
        'auth/id-token-expired': 'Token has expired. Please log in again.',
        'auth/argument-error': 'Invalid token format.',
        'auth/id-token-revoked': 'Token has been revoked.',
        'auth/invalid-id-token': 'Invalid Firebase ID token.',
        'auth/user-not-found': 'User not found.',
      }[error.code] || 'Invalid or expired Firebase token. Please log in again.';

      throw new UnauthorizedException(errorMessage);
    }
  }
}