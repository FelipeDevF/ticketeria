import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  PIX = 'pix',
  BANK_SLIP = 'bank_slip',
  DIGITAL_WALLET = 'digital_wallet'
}

@Entity('payments')
@Index(['orderId'])
@Index(['status'])
@Index(['paymentMethod'])
@Index(['createdAt'])
export class Payment {
  @ApiProperty({ description: 'ID único do pagamento' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Valor do pagamento em centavos' })
  @Column({ type: 'int' })
  amount: number;

  @ApiProperty({ description: 'Status do pagamento', enum: PaymentStatus })
  @Column({ 
    type: 'enum', 
    enum: PaymentStatus, 
    default: PaymentStatus.PENDING 
  })
  status: PaymentStatus;

  @ApiProperty({ description: 'Método de pagamento', enum: PaymentMethod })
  @Column({ 
    type: 'enum', 
    enum: PaymentMethod 
  })
  paymentMethod: PaymentMethod;

  @ApiProperty({ description: 'ID da transação no gateway de pagamento', required: false })
  @Column({ type: 'varchar', length: 255, nullable: true })
  gatewayTransactionId: string;

  @ApiProperty({ description: 'ID do pagamento no gateway', required: false })
  @Column({ type: 'varchar', length: 255, nullable: true })
  gatewayPaymentId: string;

  @ApiProperty({ description: 'URL para pagamento (PIX, boleto)', required: false })
  @Column({ type: 'varchar', length: 500, nullable: true })
  paymentUrl: string;

  @ApiProperty({ description: 'Código PIX', required: false })
  @Column({ type: 'text', nullable: true })
  pixCode: string;

  @ApiProperty({ description: 'Código de barras do boleto', required: false })
  @Column({ type: 'varchar', length: 100, nullable: true })
  barcode: string;

  @ApiProperty({ description: 'Data de vencimento do pagamento', required: false })
  @Column({ type: 'timestamp with time zone', nullable: true })
  dueDate: Date;

  @ApiProperty({ description: 'Data de processamento do pagamento', required: false })
  @Column({ type: 'timestamp with time zone', nullable: true })
  processedAt: Date;

  @ApiProperty({ description: 'Mensagem de erro', required: false })
  @Column({ type: 'text', nullable: true })
  errorMessage: string;

  @ApiProperty({ description: 'Dados adicionais do pagamento', required: false })
  @Column({ type: 'jsonb', nullable: true })
  additionalData: Record<string, any>;

  @ApiProperty({ description: 'Data de criação do registro' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  // Relacionamentos
  @ApiProperty({ type: () => Order, description: 'Pedido relacionado' })
  @ManyToOne(() => Order, order => order.payments)
  order: Order;

  @ApiProperty({ description: 'ID do pedido' })
  @Column({ type: 'uuid' })
  orderId: string;
}
