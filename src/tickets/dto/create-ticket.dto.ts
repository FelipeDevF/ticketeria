import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, IsUUID, Min, IsOptional } from 'class-validator';
import { TicketType } from '../../entities/ticket.entity';

export class CreateTicketDto {
  @ApiProperty({ 
    example: 'Pista Premium', 
    description: 'Nome do tipo de ingresso',
    minLength: 1,
    maxLength: 100
  })
  @IsString({ message: 'Nome deve ser uma string' })
  name: string;

  @ApiProperty({ 
    example: 'Ingresso com acesso VIP e área exclusiva', 
    description: 'Descrição do ingresso'
  })
  @IsString({ message: 'Descrição deve ser uma string' })
  description: string;

  @ApiProperty({ 
    example: TicketType.PREMIUM, 
    description: 'Tipo do ingresso',
    enum: TicketType
  })
  @IsEnum(TicketType, { message: 'Tipo deve ser um valor válido' })
  type: TicketType;

  @ApiProperty({ 
    example: 15000, 
    description: 'Preço do ingresso em centavos',
    minimum: 1
  })
  @IsInt({ message: 'Preço deve ser um número inteiro' })
  @Min(1, { message: 'Preço deve ser pelo menos 1 centavo' })
  price: number;

  @ApiProperty({ 
    example: 100, 
    description: 'Quantidade total disponível',
    minimum: 1
  })
  @IsInt({ message: 'Quantidade deve ser um número inteiro' })
  @Min(1, { message: 'Quantidade deve ser pelo menos 1' })
  quantity: number;

  @ApiProperty({ 
    example: 'uuid-do-evento', 
    description: 'ID do evento'
  })
  @IsUUID(4, { message: 'ID do evento deve ser um UUID válido' })
  eventId: string;
}
