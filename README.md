<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->

#watchShop

A modern client-side computer store built with Next.js 15, TypeScript, and TailwindCSS.

🚀 Features  
- Dynamic product listing fetched client-side from an external API  
- API key authentication with secure Axios requests  
- Client-side state management with Redux Toolkit + redux-persist  
- Responsive calendar using `react-calendar` with Jalali support  
- Interactive store location map using `react-leaflet` and `leaflet`  
- Form validation with React Hook Form and Yup/Zod  
- Fully responsive design using TailwindCSS and Sass  
- Reusable UI components built with ShadCN, Radix UI, and Lucide icons  
- Toast notifications with `react-hot-toast`  
- Sales and analytics dashboards using Chart.js and Recharts  
- Carousel/slider support with Swiper  
- Built-in animations using Framer Motion and `tw-animate-css`

🛠️ Tech Stack  
Framework: Next.js 15 (App Router with Turbopack)  
Language: TypeScript  
Styling: TailwindCSS + Sass Modules  
State Management: Redux Toolkit + redux-persist  
HTTP Client: Axios + React Query  
Form Handling: React Hook Form + Yup / Zod  
Date Handling: jalali-moment + react-calendar  
Mapping: react-leaflet + leaflet  
Charts: chart.js + recharts  
UI Components: ShadCN, Radix UI, Lucide, FontAwesome, React Icons  
Animation: Framer Motion, tw-animate-css

📦 Installation  
Clone the repository:  
```bash
git clone https://github.com/dianaomr/computershop.git
cd computershop
Install dependencies:


```bash
yarn install
Create a .env.local file with your API credentials:

env
API_URL=https://your-api-url.com/api/products
API_KEY=your_api_key_here
Run the development server:

```bash
yarn dev

🌐 Pages & Site Functionality

Homepage: product slider, latest products, promotional banners

Product Page: detailed product view, add to cart, price info

Cart Page: view items, remove/update, total calculation

User Panel: user profile, form-based address management, order history

Admin Panel: dashboards with charts, product management

Calendar: date selection for filtering or delivery

Map: interactive store location via Leaflet

Forms: secure validation with full error feedback (React Hook Form + Yup/Zod)

Authentication: login/signup forms

UI: consistent, modular components with animations

##🔧 Configuration
The project uses several configuration files:

next.config.ts – Next.js configuration

.env.local – Environment variables for API URL and key

tsconfig.json – TypeScript configuration

tailwind.config.ts – TailwindCSS configuration

Redux setup in /store folder

UI components in /components/

Page routes in /pages

Styles in /styles/

