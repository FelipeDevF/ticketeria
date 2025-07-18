import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Order } from './order.entity';

export enum UserRole {
  ADMIN = 'admin',
  ORGANIZER = 'organizer',
  CUSTOMER = 'customer'
}

@Entity('users')
@Index(['email'], { unique: true })
export class User {
  @ApiProperty({ description: 'ID único do usuário' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Nome completo do usuário' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ description: 'Email do usuário (único)' })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiProperty({ description: 'Senha criptografada do usuário' })
  @Column({ type: 'varchar', length: 255 })
  @Exclude()
  password: string;

  @ApiProperty({ description: 'CPF do usuário', required: false })
  @Column({ type: 'varchar', length: 14, nullable: true })
  cpf: string;

  @ApiProperty({ description: 'Telefone do usuário', required: false })
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @ApiProperty({ description: 'Data de nascimento', required: false })
  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @ApiProperty({ description: 'Endereço do usuário', required: false })
  @Column({ type: 'text', nullable: true })
  address: string;

  @ApiProperty({ description: 'Cidade do usuário', required: false })
  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @ApiProperty({ description: 'Estado do usuário', required: false })
  @Column({ type: 'varchar', length: 2, nullable: true })
  state: string;

  @ApiProperty({ description: 'CEP do usuário', required: false })
  @Column({ type: 'varchar', length: 9, nullable: true })
  zipCode: string;

  @ApiProperty({ description: 'Role do usuário', enum: UserRole })
  @Column({ 
    type: 'enum', 
    enum: UserRole, 
    default: UserRole.CUSTOMER 
  })
  role: UserRole;

  @ApiProperty({ description: 'Se o usuário está ativo' })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Data de criação do registro' })
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @ApiProperty({ description: 'Data da última atualização' })
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  // Relacionamentos
  @OneToMany(() => Order, order => order.user)
  @ApiProperty({ type: () => [Order], description: 'Pedidos do usuário' })
  orders: Order[];
}
