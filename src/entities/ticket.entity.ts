import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Event } from './event.entity';
import { Order } from './order.entity';

export enum TicketType {
  VIP = 'vip',
  PREMIUM = 'premium',
  STANDARD = 'standard',
  STUDENT = 'student',
  SENIOR = 'senior'
}

export enum TicketStatus {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  SOLD = 'sold',
  CANCELLED = 'cancelled'
}

@Entity('tickets')
@Index(['eventId', 'type'])
@Index(['status'])
@Index(['price'])
export class Ticket {
  @ApiProperty({ description: 'ID único do ingresso' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nome do tipo de ingresso' })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({ description: 'Descrição do ingresso' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'Tipo do ingresso', enum: TicketType })
  @Column({ 
    type: 'enum', 
    enum: TicketType 
  })
  type: TicketType;

  @ApiProperty({ description: 'Preço do ingresso em centavos' })
  @Column({ type: 'int' })
  price: number;

  @ApiProperty({ description: 'Quantidade total disponível' })
  @Column({ type: 'int' })
  quantity: number;

  @ApiProperty({ description: 'Quantidade vendida' })
  @Column({ type: 'int', default: 0 })
  soldQuantity: number;

  @ApiProperty({ description: 'Quantidade reservada' })
  @Column({ type: 'int', default: 0 })
  reservedQuantity: number;

  @ApiProperty({ description: 'Status do ingresso', enum: TicketStatus })
  @Column({ 
    type: 'enum', 
    enum: TicketStatus, 
    default: TicketStatus.AVAILABLE 
  })
  status: TicketStatus;

  @ApiProperty({ description: 'Data de início da venda' })
  @Column({ type: 'timestamp with time zone' })
  saleStartDate: Date;

  @ApiProperty({ description: 'Data de fim da venda' })
  @Column({ type: 'timestamp with time zone' })
  saleEndDate: Date;

  @ApiProperty({ description: 'Limite de ingressos por compra' })
  @Column({ type: 'int', default: 10 })
  maxPerPurchase: number;

  @ApiProperty({ description: 'Se o ingresso inclui assento numerado' })
  @Column({ type: 'boolean', default: false })
  hasSeatNumber: boolean;

  @ApiProperty({ description: 'Informações adicionais do ingresso', required: false })
  @Column({ type: 'jsonb', nullable: true })
  additionalInfo: Record<string, any>;

  @ApiProperty({ description: 'Data de criação do registro' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  // Relacionamentos
  @ApiProperty({ type: () => Event, description: 'Evento relacionado' })
  @ManyToOne(() => Event, event => event.tickets)
  event: Event;

  @ApiProperty({ description: 'ID do evento' })
  @Column({ type: 'uuid' })
  eventId: string;

  @OneToMany(() => Order, order => order.ticket)
  @ApiProperty({ type: () => [Order], description: 'Pedidos do ingresso' })
  orders: Order[];
}
