import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Ticket } from './ticket.entity';

export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export enum EventCategory {
  MUSIC = 'music',
  THEATER = 'theater',
  SPORTS = 'sports',
  CONFERENCE = 'conference',
  WORKSHOP = 'workshop',
  EXHIBITION = 'exhibition',
  OTHER = 'other'
}

@Entity('events')
@Index(['startDate'])
@Index(['category'])
@Index(['status'])
export class Event {
  @ApiProperty({ description: 'ID único do evento' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Título do evento' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ description: 'Descrição detalhada do evento' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'Categoria do evento', enum: EventCategory })
  @Column({ 
    type: 'enum', 
    enum: EventCategory 
  })
  category: EventCategory;

  @ApiProperty({ description: 'Data e hora de início do evento' })
  @Column({ type: 'timestamp with time zone' })
  startDate: Date;

  @ApiProperty({ description: 'Data e hora de término do evento' })
  @Column({ type: 'timestamp with time zone' })
  endDate: Date;

  @ApiProperty({ description: 'Local do evento' })
  @Column({ type: 'varchar', length: 255 })
  venue: string;

  @ApiProperty({ description: 'Endereço completo do evento' })
  @Column({ type: 'text' })
  address: string;

  @ApiProperty({ description: 'Cidade do evento' })
  @Column({ type: 'varchar', length: 100 })
  city: string;

  @ApiProperty({ description: 'Estado do evento' })
  @Column({ type: 'varchar', length: 2 })
  state: string;

  @ApiProperty({ description: 'CEP do evento' })
  @Column({ type: 'varchar', length: 9 })
  zipCode: string;

  @ApiProperty({ description: 'URL da imagem do evento', required: false })
  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl: string;

  @ApiProperty({ description: 'Capacidade máxima do evento' })
  @Column({ type: 'int' })
  capacity: number;

  @ApiProperty({ description: 'Status do evento', enum: EventStatus })
  @Column({ 
    type: 'enum', 
    enum: EventStatus, 
    default: EventStatus.DRAFT 
  })
  status: EventStatus;

  @ApiProperty({ description: 'Se o evento é destaque' })
  @Column({ type: 'boolean', default: false })
  isFeatured: boolean;

  @ApiProperty({ description: 'Tags do evento (separadas por vírgula)', required: false })
  @Column({ type: 'varchar', length: 500, nullable: true })
  tags: string;

  @ApiProperty({ description: 'Informações adicionais do evento', required: false })
  @Column({ type: 'jsonb', nullable: true })
  additionalInfo: Record<string, any>;

  @ApiProperty({ description: 'Data de criação do registro' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  // Relacionamentos
  @ApiProperty({ type: () => User, description: 'Organizador do evento' })
  @ManyToOne(() => User, user => user.id)
  organizer: User;

  @ApiProperty({ description: 'ID do organizador' })
  @Column({ type: 'uuid' })
  organizerId: string;

  @OneToMany(() => Ticket, ticket => ticket.event)
  @ApiProperty({ type: () => [Ticket], description: 'Ingressos do evento' })
  tickets: Ticket[];
}
