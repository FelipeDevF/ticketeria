import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum, IsOptional, IsString, Min } from 'class-validator';
import { PaymentStatus, PaymentMethod } from '../../entities/payment.entity';

export class CreatePaymentDto {
  @ApiProperty({ 
    example: 15000, 
    description: 'Valor do pagamento em centavos',
    minimum: 1
  })
  @IsInt({ message: 'Valor deve ser um número inteiro' })
  @Min(1, { message: 'Valor deve ser pelo menos 1 centavo' })
  amount: number;

  @ApiProperty({ 
    description: 'Status do pagamento',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING
  })
  @IsEnum(PaymentStatus, { message: 'Status deve ser um valor válido' })
  status: PaymentStatus;

  @ApiProperty({ 
    description: 'Método de pagamento',
    enum: PaymentMethod
  })
  @IsEnum(PaymentMethod, { message: 'Método de pagamento deve ser um valor válido' })
  paymentMethod: PaymentMethod;

  @ApiProperty({ 
    example: 'TXN-123456', 
    description: 'ID da transação no gateway',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'ID da transação deve ser uma string' })
  gatewayTransactionId?: string;

  @ApiProperty({ 
    example: 'PAY-789012', 
    description: 'ID do pagamento no gateway',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'ID do pagamento deve ser uma string' })
  gatewayPaymentId?: string;

  @ApiProperty({ 
    example: 'uuid-do-pedido', 
    description: 'ID do pedido relacionado'
  })
  @IsString({ message: 'ID do pedido deve ser uma string' })
  orderId: string;
}
