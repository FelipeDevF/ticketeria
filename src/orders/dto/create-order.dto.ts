import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsEnum, IsOptional, Min } from 'class-validator';
import { OrderStatus } from '../../entities/order.entity';

export class CreateOrderDto {
  @ApiProperty({ 
    example: 'uuid-do-usuario', 
    description: 'ID do usuário'
  })
  @IsUUID(4, { message: 'ID do usuário deve ser um UUID válido' })
  userId: string;

  @ApiProperty({ 
    example: 'uuid-do-ingresso', 
    description: 'ID do ingresso'
  })
  @IsUUID(4, { message: 'ID do ingresso deve ser um UUID válido' })
  ticketId: string;

  @ApiProperty({ 
    example: 2, 
    description: 'Quantidade de ingressos',
    minimum: 1
  })
  @IsInt({ message: 'Quantidade deve ser um número inteiro' })
  @Min(1, { message: 'Quantidade deve ser pelo menos 1' })
  quantity: number;

  @ApiProperty({ 
    example: OrderStatus.PENDING, 
    enum: OrderStatus, 
    description: 'Status do pedido',
    required: false 
  })
  @IsOptional()
  @IsEnum(OrderStatus, { message: 'Status deve ser um valor válido' })
  status?: OrderStatus;
}
