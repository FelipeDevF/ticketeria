import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiBody({ schema: { properties: { email: { type: 'string' }, password: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  async login(@Body() body: { email: string, password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { message: 'Credenciais inválidas' };
    }
    return this.authService.login(user);
  }

  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiBody({ schema: { properties: { email: { type: 'string' }, password: { type: 'string' }, name: { type: 'string' } } } })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  async register(@Body() body: { email: string, password: string, name: string }) {
    return this.authService.register(body);
  }
}
