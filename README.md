# [auth-starter]

An authentication and organization management starter template built with Next.js, designed to accelerate development of projects requiring user authentication and organization handling.

## Features

- 🔐 Secure authentication with Kinde
- 👥 Organization and team management
- 🎨 Modern UI components with shadcn/ui
- 🔍 Type-safe database operations with Prisma
- ✅ Runtime schema validation with Zod
- 🎯 Responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js
- **Authentication**: Kinde
- **Database**: PostgreSQL
- **ORM**: Prisma
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Schema Validation**: Zod
- **Language**: TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- PostgreSQL
- npm or yarn or pnpm

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/auth-starter.git
```
```bash
cd auth-starter
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```
KINDE_CLIENT_ID=
KINDE_CLIENT_SECRET=
KINDE_ISSUER_URL=
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/api/auth/success
KINDE_DOMAIN=
KINDE_MANAGEMENT_API=
KINDE_MANAGEMENT_CLIENT_ID=
KINDE_MANAGEMENT_CLIENT_SECRET=
KINDE_MANAGEMENT_ACCESS_TOKEN=
DATABASE_URL=
DATABASE_URL_NON_POOLING=
```

5. Set up the database:
```bash
npx prisma generate
```
```bash
npx prisma db push
```

6. Run the development server:
```bash
pnpm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build production bundle
- `pnpm run lint` - Run ESLint

Review `package.json` for all available scripts.

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Kinde Authentication](https://kinde.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev)