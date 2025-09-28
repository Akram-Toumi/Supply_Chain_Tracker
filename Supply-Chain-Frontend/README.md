# Supply Chain Tracker - Frontend

A comprehensive supply chain management application built with React, TypeScript, and Vite. This frontend provides role-based dashboards and tools for different stakeholders in the supply chain: Producers, Distributors, Transporters, Warehouses, and Consumers. It enables tracking of products from production to delivery, ensuring transparency, authenticity verification, and efficient logistics management using blockchain-inspired tracking principles.

## Features

- **Role-Based Authentication**: Secure login and signup with role-specific access control.
- **Producer Dashboard**: Manage products, batches, certifications, and analytics.
- **Distributor Dashboard**: Handle inventory, orders, verification, and analytics.
- **Transporter Dashboard**: Track shipments, routes, reports, and real-time tracking.
- **Warehouse Dashboard**: Manage storage, shipments, and overview.
- **Consumer Dashboard**: Scan products for authenticity, view history, and overview.
- **Responsive Layout**: Modern UI with sidebar navigation, navbar, and footer using Tailwind CSS.
- **Protected Routes**: Role-based routing to ensure users only access authorized pages.
- **Product Lifecycle Tracking**: End-to-end visibility from production to consumer.

## Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context (AuthContext)
- **Routing**: React Router (inferred from role-based components)
- **Linting**: ESLint with TypeScript support
- **Icons/Assets**: Custom assets including React and Vite SVGs

## Project Structure

```
src/
├── App.tsx               # Main application component with routing
├── main.tsx              # Entry point
├── App.css               # Global styles
├── index.css             # Tailwind CSS imports
├── vite-env.d.ts         # Vite TypeScript declarations
├── assets/               # Static images and assets
│   ├── react.svg
│   └── images/
├── components/           # Reusable UI components
│   ├── DashboardSidebar.tsx
│   ├── Logo.tsx
│   ├── RoleBasedRoute.tsx
│   └── auth/
│       ├── LoginForm.tsx
│       └── SignUpForm.tsx
├── contexts/             # React contexts for state management
│   └── AuthContext.tsx
├── layouts/              # Page layouts
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   └── Sidebar.tsx
├── pages/                # Route-specific pages
│   ├── Landing.tsx
│   ├── Login.tsx
│   ├── SignUp.tsx
│   ├── ConsumerDashboard.tsx
│   ├── DistributorDashboard.tsx
│   ├── ProducerDashboard.tsx
│   ├── TransporterDashboard.tsx
│   └── WarehouseDashboard.tsx
│   ├── consumer/         # Consumer-specific pages
│   │   ├── ConsumerOverview.tsx
│   │   ├── ProductAuthenticity.tsx
│   │   ├── ProductHistory.tsx
│   │   └── ProductScanner.tsx
│   ├── distributor/      # Distributor-specific pages
│   │   ├── DistributorAnalytics.tsx
│   │   ├── DistributorInventory.tsx
│   │   ├── DistributorOrders.tsx
│   │   ├── DistributorOverview.tsx
│   │   └── DistributorVerification.tsx
│   ├── producer/         # Producer-specific pages
│   │   ├── Analytics.tsx
│   │   ├── BatchesList.tsx
│   │   ├── CertificationsList.tsx
│   │   ├── ProducerOverview.tsx
│   │   └── ProductsList.tsx
│   ├── transporter/      # Transporter-specific pages
│   │   ├── TransporterOverview.tsx
│   │   ├── TransporterReports.tsx
│   │   ├── TransporterRoutes.tsx
│   │   ├── TransporterShipments.tsx
│   │   └── TransporterTracking.tsx
│   └── warehouse/        # Warehouse-specific pages
│       ├── WarehouseOverview.tsx
│       ├── WarehouseShipments.tsx
│       └── WarehouseStorage.tsx
├── services/             # API services
│   └── authService.ts
├── types/                # TypeScript type definitions
│   ├── auth.ts
│   └── producer.ts
└── utils/                # Utility functions
```

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Akram-Toumi/Supply_Chain_Tracker.git
   cd Supply-Chain-Frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `env.example` to `.env.local` and configure your environment variables:
     ```bash
     cp env.example .env.local
     ```
   - Configure the following variables in `.env.local`:
     ```
     # Blockchain Configuration
     VITE_CONTRACT_ADDRESS=
     VITE_RPC_URL=http://127.0.0.1:7545
     VITE_RPC_URL_BACKUP=http://127.0.0.1:8545
     VITE_CHAIN_ID=1337
     VITE_CHAIN_NAME=Ganache Local
     
     # API Configuration (if needed)
     VITE_API_URL=http://localhost:3001/api
     ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

5. **Build for Production**
   ```bash
   npm run build
   ```
   Output will be in the `dist/` directory.

## Usage

1. **Authentication**: Users sign up or log in via `/login` or `/signup`, selecting their role (Producer, Distributor, Transporter, Warehouse, Consumer).
2. **Navigation**: Use the sidebar to access role-specific dashboards and tools.
3. **Key Workflows**:
   - **Producers**: Add products and batches, manage certifications.
   - **Distributors**: Verify incoming shipments, manage orders and inventory.
   - **Transporters**: Create routes, track shipments in real-time.
   - **Warehouses**: Monitor storage and handle incoming/outgoing shipments.
   - **Consumers**: Scan QR codes or IDs to verify product authenticity and view full history.

All data interactions assume integration with a backend API (not included in this frontend repo). The application uses blockchain principles for immutable tracking records.

## Role-Based Access

- **RoleBasedRoute.tsx**: Protects routes based on user role from AuthContext.
- Users are redirected to appropriate dashboards upon login.
- Unauthorized access attempts redirect to login or landing page.

## Development

- **Tailwind Configuration**: Customize styles in `tailwind.config.js`.
- **Vite Configuration**: Modify `vite.config.ts` for plugins or server options.
- **TypeScript**: Strict mode enabled; extend types in `src/types/`.
- **Testing**: Add tests using Vitest or Jest (setup not included).
- **Linting**: Run `npm run lint` to check code quality.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/Akram-Toumi/Supply_Chain_Tracker](https://github.com/Akram-Toumi/Supply_Chain_Tracker)

For support or questions, open an issue on GitHub.
