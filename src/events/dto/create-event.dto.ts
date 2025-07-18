import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsOptional, IsDateString, IsEnum, IsInt, Min, Max, IsBoolean, IsUrl } from 'class-validator';
import { EventCategory, EventStatus } from '../../entities/event.entity';

export class CreateEventDto {
  @ApiProperty({ 
    example: 'Show de Rock Internacional', 
    description: 'Título do evento',
    minLength: 3,
    maxLength: 255
  })
  @IsString({ message: 'Título deve ser uma string' })
  @IsNotEmpty({ message: 'Título é obrigatório' })
  @MinLength(3, { message: 'Título deve ter pelo menos 3 caracteres' })
  title: string;

  @ApiProperty({ 
    example: 'Um incrível show de rock com as melhores bandas internacionais...', 
    description: 'Descrição detalhada do evento'
  })
  @IsString({ message: 'Descrição deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  @MinLength(10, { message: 'Descrição deve ter pelo menos 10 caracteres' })
  description: string;

  @ApiProperty({ 
    description: 'Categoria do evento',
    enum: EventCategory,
    example: EventCategory.MUSIC
  })
  @IsEnum(EventCategory, { message: 'Categoria deve ser um valor válido' })
  category: EventCategory;

  @ApiProperty({ 
    example: '2024-12-31T20:00:00Z', 
    description: 'Data e hora de início do evento (ISO 8601)'
  })
  @IsDateString({}, { message: 'Data de início deve ser uma data válida' })
  startDate: string;

  @ApiProperty({ 
    example: '2024-12-31T23:00:00Z', 
    description: 'Data e hora de término do evento (ISO 8601)'
  })
  @IsDateString({}, { message: 'Data de término deve ser uma data válida' })
  endDate: string;

  @ApiProperty({ 
    example: 'Estádio Municipal', 
    description: 'Local do evento',
    maxLength: 255
  })
  @IsString({ message: 'Local deve ser uma string' })
  @IsNotEmpty({ message: 'Local é obrigatório' })
  venue: string;

  @ApiProperty({ 
    example: 'Rua das Flores, 123 - Centro', 
    description: 'Endereço completo do evento'
  })
  @IsString({ message: 'Endereço deve ser uma string' })
  @IsNotEmpty({ message: 'Endereço é obrigatório' })
  address: string;

  @ApiProperty({ 
    example: 'São Paulo', 
    description: 'Cidade do evento',
    maxLength: 100
  })
  @IsString({ message: 'Cidade deve ser uma string' })
  @IsNotEmpty({ message: 'Cidade é obrigatória' })
  city: string;

  @ApiProperty({ 
    example: 'SP', 
    description: 'Estado do evento (sigla)',
    maxLength: 2
  })
  @IsString({ message: 'Estado deve ser uma string' })
  @IsNotEmpty({ message: 'Estado é obrigatório' })
  state: string;

  @ApiProperty({ 
    example: '01234-567', 
    description: 'CEP do evento',
    maxLength: 9
  })
  @IsString({ message: 'CEP deve ser uma string' })
  @IsNotEmpty({ message: 'CEP é obrigatório' })
  zipCode: string;

  @ApiProperty({ 
    example: 'https://exemplo.com/imagem.jpg', 
    description: 'URL da imagem do evento',
    required: false,
    maxLength: 500
  })
  @IsOptional()
  @IsUrl({}, { message: 'URL da imagem deve ser uma URL válida' })
  imageUrl?: string;

  @ApiProperty({ 
    example: 1000, 
    description: 'Capacidade máxima do evento',
    minimum: 1,
    maximum: 100000
  })
  @IsInt({ message: 'Capacidade deve ser um número inteiro' })
  @Min(1, { message: 'Capacidade deve ser pelo menos 1' })
  @Max(100000, { message: 'Capacidade não pode exceder 100.000' })
  capacity: number;

  @ApiProperty({ 
    description: 'Status do evento',
    enum: EventStatus,
    default: EventStatus.DRAFT,
    required: false
  })
  @IsOptional()
  @IsEnum(EventStatus, { message: 'Status deve ser um valor válido' })
  status?: EventStatus;

  @ApiProperty({ 
    example: false, 
    description: 'Se o evento é destaque',
    required: false
  })
  @IsOptional()
  @IsBoolean({ message: 'isFeatured deve ser um valor booleano' })
  isFeatured?: boolean;

  @ApiProperty({ 
    example: 'rock, música, internacional', 
    description: 'Tags do evento (separadas por vírgula)',
    required: false,
    maxLength: 500
  })
  @IsOptional()
  @IsString({ message: 'Tags deve ser uma string' })
  tags?: string;
}
