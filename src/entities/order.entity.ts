import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Ticket } from './ticket.entity';
import { Payment } from './payment.entity';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

@Entity('orders')
@Index(['userId'])
@Index(['status'])
@Index(['createdAt'])
export class Order {
  @ApiProperty({ description: 'ID único do pedido' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Número do pedido (formato legível)' })
  @Column({ type: 'varchar', length: 50, unique: true })
  orderNumber: string;

  @ApiProperty({ description: 'Quantidade de ingressos' })
  @Column({ type: 'int' })
  quantity: number;

  @ApiProperty({ description: 'Preço unitário em centavos' })
  @Column({ type: 'int' })
  unitPrice: number;

  @ApiProperty({ description: 'Preço total em centavos' })
  @Column({ type: 'int' })
  totalPrice: number;

  @ApiProperty({ description: 'Status do pedido', enum: OrderStatus })
  @Column({ 
    type: 'enum', 
    enum: OrderStatus, 
    default: OrderStatus.PENDING 
  })
  status: OrderStatus;

  @ApiProperty({ description: 'Nomes dos participantes', required: false })
  @Column({ type: 'jsonb', nullable: true })
  attendeeNames: string[];

  @ApiProperty({ description: 'Emails dos participantes', required: false })
  @Column({ type: 'jsonb', nullable: true })
  attendeeEmails: string[];

  @ApiProperty({ description: 'Números dos assentos', required: false })
  @Column({ type: 'jsonb', nullable: true })
  seatNumbers: string[];

  @ApiProperty({ description: 'Observações do pedido', required: false })
  @Column({ type: 'text', nullable: true })
  notes: string;

  @ApiProperty({ description: 'Data de expiração do pedido' })
  @Column({ type: 'timestamp with time zone' })
  expiresAt: Date;

  @ApiProperty({ description: 'Data de criação do registro' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  // Relacionamentos
  @ApiProperty({ type: () => User, description: 'Usuário que fez o pedido' })
  @ManyToOne(() => User, user => user.orders)
  user: User;

  @ApiProperty({ description: 'ID do usuário' })
  @Column({ type: 'uuid' })
  userId: string;

  @ApiProperty({ type: () => Ticket, description: 'Ingresso relacionado' })
  @ManyToOne(() => Ticket, ticket => ticket.orders)
  ticket: Ticket;

  @ApiProperty({ description: 'ID do ingresso' })
  @Column({ type: 'uuid' })
  ticketId: string;

  @OneToMany(() => Payment, payment => payment.order)
  @ApiProperty({ type: () => [Payment], description: 'Pagamentos do pedido' })
  payments: Payment[];
}
