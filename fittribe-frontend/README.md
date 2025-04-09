# FitTribe Platform

FitTribe is a marketplace platform connecting fitness trainers with clients. This repository contains the frontend code for the FitTribe platform.

## Features

- User authentication (login, register, password reset)
- Trainer profiles and search
- Booking system for fitness sessions
- Payment processing with Stripe
- Real-time notifications
- Admin dashboard for platform management
- 3D visualization components

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Three.js (React Three Fiber)
- Stripe for payments
- Socket.io for real-time features

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Bangtechuk/Fittribe-frontend.git
cd Fittribe-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

The application is configured for deployment on Vercel. Connect your GitHub repository to Vercel for automatic deployments.

## Project Structure

- `/src/app` - Next.js app directory with page components
- `/src/components` - React components organized by feature
- `/src/contexts` - React context providers for state management
- `/src/styles` - Global styles and Tailwind configuration
- `/public` - Static assets

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Contact

For any inquiries, please contact [support@fittribe.fitness](mailto:support@fittribe.fitness)
