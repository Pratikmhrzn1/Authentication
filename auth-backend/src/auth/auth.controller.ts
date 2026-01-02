import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Request,
  UseGuards,
  HttpException,ForbiddenException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('profile/:uid')
@UseGuards(FirebaseAuthGuard)
async getProfile(@Param('uid') uid: string, @Request() req) {
  // Optional: Only allow user to access their own profile
  if (req.user.uid !== uid) {
    throw new ForbiddenException('Cannot access other users profile');
  }

  return this.authService.getProfile(uid);
}
}
