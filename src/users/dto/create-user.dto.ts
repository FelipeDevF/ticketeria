import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, MinLength, IsOptional, IsDateString, IsEnum, Matches } from 'class-validator';
import { UserRole } from '../../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ 
    example: 'João Silva', 
    description: 'Nome completo do usuário',
    minLength: 2,
    maxLength: 255
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(2, { message: 'Nome deve ter pelo menos 2 caracteres' })
  name: string;

  @ApiProperty({ 
    example: 'joao@exemplo.com', 
    description: 'Email do usuário (único)',
    maxLength: 255
  })
  @IsEmail({}, { message: 'Email deve ser um email válido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @ApiProperty({ 
    example: 'senha123', 
    description: 'Senha do usuário',
    minLength: 6,
    maxLength: 255
  })
  @IsString({ message: 'Senha deve ser uma string' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  password: string;

  @ApiProperty({ 
    example: '123.456.789-00', 
    description: 'CPF do usuário',
    required: false,
    maxLength: 14
  })
  @IsOptional()
  @IsString({ message: 'CPF deve ser uma string' })
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF deve estar no formato 123.456.789-00' })
  cpf?: string;

  @ApiProperty({ 
    example: '(11) 99999-9999', 
    description: 'Telefone do usuário',
    required: false,
    maxLength: 20
  })
  @IsOptional()
  @IsString({ message: 'Telefone deve ser uma string' })
  @Matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, { message: 'Telefone deve estar no formato (11) 99999-9999' })
  phone?: string;

  @ApiProperty({ 
    example: '1990-01-01', 
    description: 'Data de nascimento',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: 'Data de nascimento deve ser uma data válida' })
  birthDate?: string;

  @ApiProperty({ 
    example: 'Rua das Flores, 123', 
    description: 'Endereço do usuário',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Endereço deve ser uma string' })
  address?: string;

  @ApiProperty({ 
    example: 'São Paulo', 
    description: 'Cidade do usuário',
    required: false,
    maxLength: 100
  })
  @IsOptional()
  @IsString({ message: 'Cidade deve ser uma string' })
  city?: string;

  @ApiProperty({ 
    example: 'SP', 
    description: 'Estado do usuário (sigla)',
    required: false,
    maxLength: 2
  })
  @IsOptional()
  @IsString({ message: 'Estado deve ser uma string' })
  @Matches(/^[A-Z]{2}$/, { message: 'Estado deve ser a sigla com 2 letras maiúsculas' })
  state?: string;

  @ApiProperty({ 
    example: '01234-567', 
    description: 'CEP do usuário',
    required: false,
    maxLength: 9
  })
  @IsOptional()
  @IsString({ message: 'CEP deve ser uma string' })
  @Matches(/^\d{5}-\d{3}$/, { message: 'CEP deve estar no formato 12345-678' })
  zipCode?: string;

  @ApiProperty({ 
    description: 'Role do usuário',
    enum: UserRole,
    default: UserRole.CUSTOMER,
    required: false
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role deve ser um valor válido' })
  role?: UserRole;
}
