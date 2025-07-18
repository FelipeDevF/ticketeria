import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../../entities/user.entity';
import { Event, EventCategory, EventStatus } from '../../entities/event.entity';
import { Ticket, TicketType, TicketStatus } from '../../entities/ticket.entity';
import { Order, OrderStatus } from '../../entities/order.entity';
import { Payment, PaymentStatus, PaymentMethod } from '../../entities/payment.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async seed() {
    console.log('🌱 Iniciando seeds...');
    
    try {
      // Limpar dados existentes
      await this.clearData();
      
      // Criar usuários
      const users = await this.createUsers();
      
      // Criar eventos
      const events = await this.createEvents(users);
      
      // Criar ingressos
      const tickets = await this.createTickets(events);
      
      // Criar pedidos
      const orders = await this.createOrders(users, tickets);
      
      // Criar pagamentos
      await this.createPayments(orders);
      
      console.log('✅ Seeds concluídos com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao executar seeds:', error);
      throw error;
    }
  }

  private async clearData() {
    console.log('🧹 Limpando dados existentes...');
    await this.paymentRepository.delete({});
    await this.orderRepository.delete({});
    await this.ticketRepository.delete({});
    await this.eventRepository.delete({});
    await this.userRepository.delete({});
  }

  private async createUsers(): Promise<User[]> {
    console.log('👥 Criando usuários...');
    
    const hashedPassword = await bcrypt.hash('senha123', 12);
    
    const users = [
      {
        name: 'Admin Sistema',
        email: 'admin@ticketeria.com',
        password: hashedPassword,
        role: UserRole.ADMIN,
        cpf: '123.456.789-00',
        phone: '(11) 99999-9999',
        birthDate: new Date('1990-01-01'),
        address: 'Rua Admin, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        isActive: true,
      },
      {
        name: 'João Organizador',
        email: 'joao@eventos.com',
        password: hashedPassword,
        role: UserRole.ORGANIZER,
        cpf: '987.654.321-00',
        phone: '(11) 88888-8888',
        birthDate: new Date('1985-05-15'),
        address: 'Rua Organizador, 456',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '04567-890',
        isActive: true,
      },
      {
        name: 'Maria Cliente',
        email: 'maria@email.com',
        password: hashedPassword,
        role: UserRole.CUSTOMER,
        cpf: '111.222.333-44',
        phone: '(11) 77777-7777',
        birthDate: new Date('1995-10-20'),
        address: 'Rua Cliente, 789',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '07890-123',
        isActive: true,
      },
      {
        name: 'Pedro Cliente',
        email: 'pedro@email.com',
        password: hashedPassword,
        role: UserRole.CUSTOMER,
        cpf: '555.666.777-88',
        phone: '(11) 66666-6666',
        birthDate: new Date('1992-03-12'),
        address: 'Rua Pedro, 321',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zipCode: '12345-678',
        isActive: true,
      },
    ];

    return await this.userRepository.save(users);
  }

  private async createEvents(users: User[]): Promise<Event[]> {
    console.log('🎭 Criando eventos...');
    
    const organizer = users.find(u => u.role === UserRole.ORGANIZER);
    
    const events = [
      {
        title: 'Show de Rock Internacional',
        description: 'Um incrível show de rock com as melhores bandas internacionais. Uma noite inesquecível de música e energia!',
        category: EventCategory.MUSIC,
        startDate: new Date('2024-12-31T20:00:00Z'),
        endDate: new Date('2024-12-31T23:00:00Z'),
        venue: 'Estádio Municipal',
        address: 'Rua das Flores, 123 - Centro',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        imageUrl: 'https://exemplo.com/rock-show.jpg',
        capacity: 5000,
        status: EventStatus.PUBLISHED,
        isFeatured: true,
        tags: 'rock, música, internacional, show',
        organizerId: organizer.id,
      },
      {
        title: 'Peça de Teatro: Hamlet',
        description: 'A clássica peça de Shakespeare apresentada pela melhor companhia de teatro do país.',
        category: EventCategory.THEATER,
        startDate: new Date('2024-11-15T19:00:00Z'),
        endDate: new Date('2024-11-15T22:00:00Z'),
        venue: 'Teatro Municipal',
        address: 'Av. Paulista, 1000 - Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01310-100',
        imageUrl: 'https://exemplo.com/hamlet.jpg',
        capacity: 800,
        status: EventStatus.PUBLISHED,
        isFeatured: false,
        tags: 'teatro, shakespeare, clássico',
        organizerId: organizer.id,
      },
      {
        title: 'Final do Campeonato Brasileiro',
        description: 'A grande final do campeonato brasileiro de futebol. Não perca essa partida histórica!',
        category: EventCategory.SPORTS,
        startDate: new Date('2024-12-15T16:00:00Z'),
        endDate: new Date('2024-12-15T18:00:00Z'),
        venue: 'Arena Corinthians',
        address: 'Av. Miguel Ignácio Curi, 111 - Artur Alvim',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '08295-005',
        imageUrl: 'https://exemplo.com/futebol.jpg',
        capacity: 50000,
        status: EventStatus.PUBLISHED,
        isFeatured: true,
        tags: 'futebol, esporte, final',
        organizerId: organizer.id,
      },
      {
        title: 'Conferência de Tecnologia 2024',
        description: 'A maior conferência de tecnologia do Brasil. Palestras, workshops e networking.',
        category: EventCategory.CONFERENCE,
        startDate: new Date('2024-10-20T09:00:00Z'),
        endDate: new Date('2024-10-22T18:00:00Z'),
        venue: 'Centro de Convenções',
        address: 'Av. Brigadeiro Faria Lima, 3477 - Itaim Bibi',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '04538-133',
        imageUrl: 'https://exemplo.com/tech-conference.jpg',
        capacity: 2000,
        status: EventStatus.DRAFT,
        isFeatured: false,
        tags: 'tecnologia, conferência, inovação',
        organizerId: organizer.id,
      },
    ];

    return await this.eventRepository.save(events);
  }

  private async createTickets(events: Event[]): Promise<Ticket[]> {
    console.log('🎫 Criando ingressos...');
    
    const tickets = [];
    
    for (const event of events) {
      const eventTickets = [
        {
          name: 'VIP',
          description: 'Ingresso VIP com acesso exclusivo e área premium',
          type: TicketType.VIP,
          price: 50000, // R$ 500,00
          quantity: 100,
          soldQuantity: 0,
          reservedQuantity: 0,
          status: TicketStatus.AVAILABLE,
          saleStartDate: new Date('2024-01-01T00:00:00Z'),
          saleEndDate: new Date('2024-12-30T23:59:59Z'),
          maxPerPurchase: 4,
          hasSeatNumber: true,
          eventId: event.id,
        },
        {
          name: 'Premium',
          description: 'Ingresso Premium com melhor localização',
          type: TicketType.PREMIUM,
          price: 30000, // R$ 300,00
          quantity: 300,
          soldQuantity: 0,
          reservedQuantity: 0,
          status: TicketStatus.AVAILABLE,
          saleStartDate: new Date('2024-01-01T00:00:00Z'),
          saleEndDate: new Date('2024-12-30T23:59:59Z'),
          maxPerPurchase: 6,
          hasSeatNumber: true,
          eventId: event.id,
        },
        {
          name: 'Padrão',
          description: 'Ingresso padrão com acesso geral',
          type: TicketType.STANDARD,
          price: 15000, // R$ 150,00
          quantity: 1000,
          soldQuantity: 0,
          reservedQuantity: 0,
          status: TicketStatus.AVAILABLE,
          saleStartDate: new Date('2024-01-01T00:00:00Z'),
          saleEndDate: new Date('2024-12-30T23:59:59Z'),
          maxPerPurchase: 10,
          hasSeatNumber: false,
          eventId: event.id,
        },
        {
          name: 'Estudante',
          description: 'Ingresso com desconto para estudantes (apresentar carteirinha)',
          type: TicketType.STUDENT,
          price: 7500, // R$ 75,00
          quantity: 200,
          soldQuantity: 0,
          reservedQuantity: 0,
          status: TicketStatus.AVAILABLE,
          saleStartDate: new Date('2024-01-01T00:00:00Z'),
          saleEndDate: new Date('2024-12-30T23:59:59Z'),
          maxPerPurchase: 2,
          hasSeatNumber: false,
          eventId: event.id,
        },
      ];
      
      tickets.push(...eventTickets);
    }

    return await this.ticketRepository.save(tickets);
  }

  private async createOrders(users: User[], tickets: Ticket[]): Promise<Order[]> {
    console.log('🛒 Criando pedidos...');
    
    const customers = users.filter(u => u.role === UserRole.CUSTOMER);
    const orders = [];
    
    // Criar alguns pedidos de exemplo
    for (let i = 0; i < 5; i++) {
      const customer = customers[i % customers.length];
      const ticket = tickets[i % tickets.length];
      
      const order = {
        orderNumber: `ORD-${Date.now()}-${i + 1}`,
        quantity: Math.floor(Math.random() * 3) + 1,
        unitPrice: ticket.price,
        totalPrice: ticket.price * (Math.floor(Math.random() * 3) + 1),
        status: OrderStatus.CONFIRMED,
        attendeeNames: [`Participante ${i + 1}`],
        attendeeEmails: [customer.email],
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
        userId: customer.id,
        ticketId: ticket.id,
      };
      
      orders.push(order);
    }

    return await this.orderRepository.save(orders);
  }

  private async createPayments(orders: Order[]): Promise<Payment[]> {
    console.log('💳 Criando pagamentos...');
    
    const payments = [];
    
    for (const order of orders) {
      const payment = {
        amount: order.totalPrice,
        status: PaymentStatus.COMPLETED,
        paymentMethod: PaymentMethod.CREDIT_CARD,
        gatewayTransactionId: `TXN-${Date.now()}-${order.id}`,
        gatewayPaymentId: `PAY-${Date.now()}-${order.id}`,
        processedAt: new Date(),
        orderId: order.id,
      };
      
      payments.push(payment);
    }

    return await this.paymentRepository.save(payments);
  }
} 