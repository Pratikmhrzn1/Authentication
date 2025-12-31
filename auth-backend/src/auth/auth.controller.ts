import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import * as admin from 'firebase-admin'
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

@Post('signup')
async signup(@Body() dto: AuthDto) {
  return this.authService.signup(dto);
}

@Post('login')
async login(@Body() dto: AuthDto) {
  return this.authService.login(dto);
}
//yo chai testing ko lagi
@Post('test-firestore')
async testFirestore() {
  try {
    await admin.firestore().collection('test').doc('hello').set({ message: 'It works!', time: new Date() });
    return { success: true, message: 'Test document written!' };
  } catch (error: any) {
    console.error('Test Firestore error:', error);
    return { success: false, error: error.message };
  }
}
}