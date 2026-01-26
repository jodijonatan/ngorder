# Toko - E-Commerce Platform

A modern, full-stack e-commerce application built with Next.js, featuring user authentication, product management, order processing, and an admin dashboard.

## 🚀 Features

- **User Authentication**: Secure login and registration using NextAuth.js
- **Product Management**: Browse and manage products with detailed information
- **Shopping Cart**: Add products to cart and manage quantities
- **Order Processing**: Complete checkout flow with order tracking
- **Admin Dashboard**: Administrative interface for managing products and orders
- **Responsive Design**: Mobile-first design using Tailwind CSS
- **Database Integration**: PostgreSQL database with Prisma ORM

## 🛠 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun
- PostgreSQL database

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ngorder
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/toko_db"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma db push
   ```

5. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication pages
│   ├── (shop)/            # Shop pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── products/      # Product management
│   │   ├── orders/        # Order processing
│   │   └── checkout/      # Checkout functionality
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── providers.tsx      # Context providers
├── components/            # Reusable React components
│   ├── Button.tsx
│   ├── Navbar.tsx
│   └── ProductCard.tsx
├── lib/                   # Utility libraries
│   ├── auth.ts            # Authentication utilities
│   ├── prisma.ts          # Database client
│   └── utils.ts           # Helper functions
├── prisma/                # Database schema and migrations
│   └── schema.prisma
├── store/                 # State management
│   └── cart.ts            # Shopping cart store
└── public/                # Static assets
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth.js endpoints

### Products

- `GET /api/products` - Fetch all products

### Orders

- `GET /api/orders` - Fetch user orders
- `POST /api/orders` - Create new order

### Checkout

- `POST /api/checkout` - Process payment and create order

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

1. Build the application:

   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.
