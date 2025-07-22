# 🎫 Ticketeria - Sistema de Vendas de Ingressos

Sistema completo de vendas de ingressos online desenvolvido com NestJS, TypeORM e PostgreSQL.

## 🚀 Funcionalidades

- **Autenticação e Autorização**: JWT com refresh tokens e controle de roles (Admin, Organizador, Cliente)
- **Gestão de Eventos**: CRUD completo com categorias, status e informações detalhadas
- **Gestão de Ingressos**: Diferentes tipos (VIP, Premium, Padrão, Estudante) com controle de estoque
- **Sistema de Pedidos**: Processo completo de compra com múltiplos ingressos
- **Pagamentos**: Integração com múltiplos métodos de pagamento (Cartão, PIX, Boleto)
- **Documentação API**: Swagger completo com exemplos e validações
- **Validações Avançadas**: DTOs com validações robustas usando class-validator
- **Seeds**: Dados de exemplo para desenvolvimento e testes

## 🛠️ Tecnologias

- **Backend**: NestJS 10.x
- **Banco de Dados**: PostgreSQL 15+
- **ORM**: TypeORM 0.3.x
- **Autenticação**: JWT + Passport
- **Validação**: class-validator + class-transformer
- **Documentação**: Swagger/OpenAPI 3
- **Criptografia**: bcrypt
- **Containerização**: Docker + Docker Compose

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou pnpm
- Docker e Docker Compose
- PostgreSQL (se não usar Docker)

## 🚀 Instalação

### 1. Clone o repositório
```bash
git clone <repository-url>
cd ticketeria
```

### 2. Instale as dependências
```bash
npm install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=ticketeria

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# App
PORT=3000
NODE_ENV=development
```

### 4. Inicie o banco de dados
```bash
# Com Docker (recomendado)
docker-compose up -d

# Ou configure um PostgreSQL local
```

### 5. Execute as migrações e seeds
```bash
# Setup completo do banco
npm run db:setup

# Ou individualmente:
pnpm typeorm:init:windows   # Cria as migrações iniciais baseado nas entities criadas
pnpm typeorm:windows migration:generate src/database/migrations/Nome_Da_Migragion   # Cria as migrações
pnpm typeorm:windows migration:run  # Executa migrações
npm run seed     # Executa seeds
```

### 6. Inicie o servidor
```bash
# Desenvolvimento
npm run start:dev

# Setup completo (migrações + seeds + servidor)
npm run dev:setup
```

## 📚 Documentação da API

Após iniciar o servidor, acesse a documentação Swagger:

- **URL**: http://localhost:3000/docs
- **Descrição**: Documentação completa da API com exemplos e testes

## 🏗️ Estrutura do Projeto

```
src/
├── auth/                 # Autenticação e autorização
│   ├── dto/             # DTOs de login e registro
│   ├── strategies/      # Estratégias JWT
│   └── guards/          # Guards de autenticação
├── users/               # Gestão de usuários
├── events/              # Gestão de eventos
├── tickets/             # Gestão de ingressos
├── orders/              # Gestão de pedidos
├── payments/            # Gestão de pagamentos
├── common/              # Código compartilhado
│   ├── decorators/      # Decorators customizados
│   ├── filters/         # Filtros de exceção
│   └── guards/          # Guards de autorização
├── database/            # Configuração do banco
│   └── seeds/           # Seeds de dados
├── entities/            # Entidades TypeORM
└── migrations/          # Migrações do banco
```

## 🔐 Autenticação

O sistema utiliza JWT com refresh tokens:

### Endpoints de Autenticação
- `POST /auth/register` - Registro de usuário
- `POST /auth/login` - Login
- `POST /auth/refresh` - Renovação de token
- `POST /auth/logout` - Logout

### Roles do Sistema
- **ADMIN**: Acesso total ao sistema
- **ORGANIZER**: Pode criar e gerenciar eventos
- **CUSTOMER**: Pode comprar ingressos

## 🎭 Gestão de Eventos

### Categorias de Eventos
- Música
- Teatro
- Esportes
- Conferência
- Workshop
- Exposição
- Outros

### Status de Eventos
- **DRAFT**: Rascunho
- **PUBLISHED**: Publicado
- **CANCELLED**: Cancelado
- **COMPLETED**: Concluído

## 🎫 Tipos de Ingressos

- **VIP**: Acesso exclusivo e área premium
- **PREMIUM**: Melhor localização
- **STANDARD**: Acesso geral
- **STUDENT**: Desconto para estudantes
- **SENIOR**: Desconto para idosos

## 💳 Métodos de Pagamento

- Cartão de Crédito
- Cartão de Débito
- PIX
- Boleto Bancário
- Carteira Digital

## 🛡️ Segurança

- Senhas criptografadas com bcrypt
- JWT com expiração configurável
- Validação robusta de dados
- Proteção contra SQL Injection
- Rate limiting (configurável)
- CORS configurado

## 🧪 Seeds de Dados

O sistema inclui seeds com dados de exemplo:

### Usuários Criados
- **Admin**: admin@ticketeria.com / senha123
- **Organizador**: joao@eventos.com / senha123
- **Clientes**: maria@email.com, pedro@email.com / senha123

### Eventos de Exemplo
- Show de Rock Internacional
- Peça de Teatro: Hamlet
- Final do Campeonato Brasileiro
- Conferência de Tecnologia 2024

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev          # Servidor em modo desenvolvimento
npm run start:debug        # Servidor com debug

# Banco de Dados
npm run migrate            # Executa migrações
npm run seed               # Executa seeds
npm run db:setup           # Migrações + Seeds

# Build e Produção
npm run build              # Build do projeto
npm run start:prod         # Servidor em produção

# Qualidade de Código
npm run lint               # ESLint
npm run format             # Prettier
```

## 🔧 Configuração de Desenvolvimento

### Variáveis de Ambiente de Desenvolvimento
```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=ticketeria_dev
JWT_SECRET=dev-secret-key
JWT_REFRESH_SECRET=dev-refresh-secret
```

### Logs
O sistema inclui logs detalhados para:
- Requisições HTTP
- Erros de validação
- Operações de banco de dados
- Autenticação

## 🐳 Docker

### Iniciar com Docker Compose
```bash
# Inicia todos os serviços
docker-compose up -d

# Visualiza logs
docker-compose logs -f

# Para os serviços
docker-compose down
```

### Build da Imagem
```bash
docker build -t ticketeria .
docker run -p 3000:3000 ticketeria
```

## 📊 Monitoramento

### Health Check
- **Endpoint**: `GET /health`
- **Status**: Retorna status do sistema e conectividade com banco

### Métricas (Futuro)
- Prometheus metrics
- Grafana dashboards
- APM com New Relic/Datadog

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Para suporte e dúvidas:
- Abra uma issue no GitHub
- Consulte a documentação Swagger em `/docs`
- Verifique os logs do sistema

## 🔄 Roadmap

- [ ] Integração com gateways de pagamento reais
- [ ] Sistema de notificações (email/SMS)
- [ ] Dashboard administrativo
- [ ] Relatórios e analytics
- [ ] Sistema de cupons de desconto
- [ ] API para aplicativos móveis
- [ ] Cache com Redis
- [ ] Testes automatizados
- [ ] CI/CD pipeline

---

Desenvolvido com ❤️ usando NestJS 