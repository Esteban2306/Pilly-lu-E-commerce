# Pilly-lu E-commerce

A full-stack e-commerce platform for jewelry retail, built with a modern, scalable architecture featuring serverless frontend deployment and RESTful backend.

---

## Overview

Pilly-lu is a production-ready e-commerce application designed to manage product catalogs, user authentication, shopping cart operations, and order management. The platform addresses the need for a lightweight yet feature-complete jewelry retail solution with clear separation between customer-facing operations and administrative functions.

**Key characteristics:**
- Dual-role architecture: customer browsing and admin management
- Role-based access control (RBAC) with JWT authentication
- Support for both authenticated and anonymous shopping carts
- Dynamic product pricing with discount calculations
- Cloud-based image storage via Google Cloud Storage
- Server-rendered frontend with React Context for state management

---

## Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                              │
│  Next.js 15 (App Router) + TypeScript + React 19            │
│  ├─ Pages: Public (products, auth), Admin (management)      │
│  └─ State: Auth Context + Cart Context + React Query        │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST (Fetch API)
                     │ Bearer Token (JWT)
                     │ Credentials: include
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   API LAYER (Backend)                        │
│  Express.js + TypeScript (ESM)                              │
│  ├─ Routes: /users, /product, /cart, /order, /category     │
│  ├─ Middleware: Auth, RBAC, Error Handling, CORS           │
│  └─ Controllers: Business Logic                             │
└────────────────────┬────────────────────────────────────────┘
                     │ Mongoose ODM
                     │ Connection Pool
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  DATA LAYER                                  │
│  MongoDB (Mongoose Schema-based)                            │
│  ├─ Collections: users, products, orders, carts, categories │
│  ├─ Images, roles                                           │
│  └─ Relationships: ObjectId references                      │
└─────────────────────────────────────────────────────────────┘
                     
         External Services:
         ├─ Google Cloud Storage (Product images)
         ├─ UploadThing (Alternative image hosting)
         └─ OpenMeteo (Weather API, optional)
```

### Data Flow

1. **Authentication Flow:**
   - User submits credentials (email/password)
   - Backend validates and issues JWT token
   - Frontend stores token in localStorage and HTTP headers
   - Backend verifies Bearer token on protected endpoints

2. **Product Browsing:**
   - Frontend fetches paginated products with React Query
   - Images resolved from Google Cloud Storage
   - Discount pricing calculated server-side

3. **Cart Management:**
   - Anonymous carts tracked via `anonId` identifier
   - Authenticated users have persistent cart in MongoDB
   - Cart merging on user login (anonymous → authenticated)

4. **Order Lifecycle:**
   - Cart items converted to order with calculated totals
   - Order status progression: pending → paid → shipped → delivered
   - Role-based access: users view own orders, admins manage all

### Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **Monorepo structure** | Simplified deployment, shared types, clearer dependency management |
| **JWT + Bearer tokens** | Stateless authentication, scalable across multiple instances |
| **MongoDB + Mongoose** | Flexible schema, excellent TypeScript support, document-based model matches e-commerce entities |
| **React Context for state** | Lightweight for this project scale, no additional bundle weight |
| **Server-side discount calculation** | Prevents client-side price manipulation |
| **Anonymous cart support** | Improved UX for guest checkout flows |
| **Role-based access in routes** | Security enforced at entry point, admin ObjectId hardcoded (see notes) |

---

## Tech Stack

### Frontend

| Technology | Version | Purpose | Justification |
|-----------|---------|---------|---------------|
| **Next.js** | 15.4.6 | React framework with App Router | App Router enables more maintainable file-based routing; Turbopack improves DX; built-in optimizations for images, code-splitting |
| **TypeScript** | 5.x | Type safety | Catch errors at compile-time; better IDE support; crucial for large features |
| **React** | 19.1.0 | UI library | Latest with use() hook, improved performance |
| **React Query** | 5.90.2 | Server state management | Automatic caching, background refetching, optimistic updates for cart/order operations |
| **Tailwind CSS** | 4.1.13 | Styling | Atomic CSS, minimal bundle size, rapid prototyping |
| **Radix UI** | Latest | Accessible components | Headless UI primitives, excellent accessibility (a11y) |
| **Framer Motion** | 12.23.24 | Animations | Smooth UX transitions, page transitions via ViewTransition API |
| **Zod** | 4.1.5 | Schema validation | Runtime type checking for API responses |

### Backend

| Technology | Version | Purpose | Justification |
|-----------|---------|---------|---------------|
| **Express.js** | 5.1.0 | HTTP server | Lightweight, mature, excellent middleware ecosystem |
| **TypeScript** | 5.9.2 | Type safety | Same reasoning as frontend; strict mode enabled |
| **Mongoose** | 8.17.1 | ODM for MongoDB | Provides schema validation, hooks, population, and type definitions |
| **JWT** | 9.0.2 | Authentication | Industry standard, stateless, scalable |
| **bcryptjs** | 3.0.2 | Password hashing | Cost-factor adjustable, resistant to timing attacks |
| **Multer** | 2.0.2 | File upload handling | Memory storage for streaming to Google Cloud |
| **Google Cloud Storage** | 7.17.0 | Image persistence | Scalable, CDN-integrated, cost-effective for media |
| **UploadThing** | 7.7.4 | Alternative file hosting | Drop-in solution, auto-resizing images |
| **Zod** | 4.1.5 | Request validation | Runtime type checking on incoming data |
| **Winston** | 3.17.0 | Logging | Structured logging with multiple transports |
| **Validator.js** | 13.15.15 | Data validation | Email, URL validation, sanitization |

### Database

**MongoDB** (connection via Mongoose)
- Document-based, schema flexibility for product attributes (color, material, SKU)
- Atomic operations for cart/order management
- Indexing on frequently queried fields (email, product IDs)

### Tooling & Dev Environment

| Tool | Purpose |
|------|---------|
| **ts-node-dev** | Backend dev server with auto-reload on TypeScript changes |
| **ESLint + Prettier** | Code quality and formatting (both frontend and backend) |
| **CORS middleware** | Handles cross-origin requests; configured for production domains |
| **Cookie Parser** | JWT token management via secure cookies |

---

## Core Features

### 1. User Management
- **Authentication:** Email/password signup and login with JWT tokens
- **Role-based Authorization:** Admin vs. Customer roles with distinct permissions
- **User Profiles:** First name, last name, email, password (bcrypt hashed)
- **User Listing:** Admin view of all users with search and role filtering

### 2. Product Catalog
- **Product CRUD:** Admin create/update/delete products
- **Attributes:** Name, description, price, original price, final price (with discount), color, material, SKU, stock status
- **Featured Products:** Toggle products for homepage prominence
- **Image Management:** Multi-image support (up to 4 per product) with Cloud Storage integration
- **Related Products:** Recommendations based on category
- **Pagination:** Efficient retrieval with configurable page size

### 3. Category Management
- **Category CRUD:** Admin manage jewelry categories
- **Product Filtering:** Browse products by category
- **Hierarchical Support:** Structure for future subcategories

### 4. Shopping Cart
- **Persistent Cart:** Synced across sessions for authenticated users
- **Anonymous Cart:** Temporary cart for guest users
- **Cart Operations:** Add items, remove items, update quantities, clear cart
- **Cart Merging:** Automatic merge of anonymous cart into user cart on login
- **Real-time Sync:** React Context keeps UI in sync with server state

### 5. Order Management
- **Order Creation:** Convert cart to order with automatic total/discount calculation
- **Status Tracking:** pendiente → pagado → enviado → entregado (or cancelado)
- **Order History:** Users view personal orders, admins view all
- **Order Modification:** Update product amounts, cancel orders, delete from order
- **User Association:** Orders linked to user with populated product details

### 6. Image Handling
- **Multi-format Upload:** Accepts JPEG, PNG, WebP
- **Size Limits:** Max 5MB per file, 4 files per product
- **Cloud Storage:** Google Cloud Storage with URL delivery
- **Optimization:** Next.js Image component with domains configuration

---

## Project Structure

### Frontend Structure
```
frontend/src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with providers
│   ├── (public)/                # Public routes
│   │   ├── page.tsx             # Homepage
│   │   ├── category/            # Category browsing
│   │   ├── product/             # Product detail pages
│   │   ├── products/            # Product listing with filters
│   │   └── order/               # Guest order tracking
│   ├── admin/                   # Admin routes (protected)
│   │   ├── layout.tsx           # Admin layout
│   │   ├── page.tsx             # Admin dashboard
│   │   ├── create/              # Product creation
│   │   ├── dashboard/           # Analytics/overview
│   │   ├── orders/              # Order management
│   │   └── users/               # User management
│   └── auth/                    # Auth pages
│       ├── signIn/              # Login page
│       └── signUp/              # Registration page
│
├── components/                  # Reusable React components
│   ├── adminPage/              # Admin-specific components
│   ├── auth/                   # Auth form components
│   ├── buttons/                # Button variants (add-to-cart, etc.)
│   ├── product/                # Product display (gallery, detail, sliders)
│   ├── NavBar/                 # Navigation
│   ├── footer/                 # Footer
│   ├── ui/                     # Shadcn components (button, dialog, drawer, etc.)
│   └── shadcn-studio/          # Custom UI components
│
├── context/                    # React Context providers
│   ├── authContext.tsx        # User authentication state
│   ├── cartContext.tsx        # Shopping cart state
│   └── types.ts               # Context type definitions
│
├── hooks/                      # Custom React hooks
│   ├── useProducts/            # Product fetching with React Query
│   ├── useUsers/               # User fetching and mutations
│   ├── useOrders/              # Order operations
│   ├── useCurrencyFormat/      # Format prices (locale-aware)
│   ├── useDebounce/            # Debounce values
│   ├── useIsMobile/            # Responsive behavior
│   ├── useSkeletonLoader/      # Loading states
│   └── weatherApi/             # OpenMeteo weather data
│
├── services/                   # API client classes
│   ├── Api.ts                 # Base HTTP client with auth
│   ├── AuthApi.ts             # Auth endpoints (login, signup)
│   ├── ProductApi.ts          # Product CRUD
│   ├── CartApi.ts             # Cart operations
│   ├── OrderApi.ts            # Order operations
│   ├── UserApi.ts             # User management
│   └── CategoryApi.ts         # Category operations
│
├── types/                      # TypeScript definitions
│   ├── product.types.ts       # Product interface
│   ├── cart.types.ts          # Cart interface
│   ├── order.types.ts         # Order interface
│   ├── user.types.ts          # User interface
│   ├── login.types.ts         # Auth request/response types
│   └── pagination.types.ts    # Pagination metadata
│
├── lib/                        # Utilities
│   ├── utils.ts               # Common utilities (cn(), formatting)
│   ├── token/                 # JWT token management
│   └── lib/                   # Internal utilities
│
├── utils/                      # Helper functions
│   ├── getWeatherIcon/        # Weather icon mapping
│   ├── modals/                # Modal content components
│   └── pagination/            # Pagination helpers
│
├── providers/                  # Provider wrappers
│   └── ReactQueryProvider.tsx # TanStack Query setup
│
└── globals.css                # Global styles and Tailwind imports
```

### Backend Structure
```
backend/src/
├── server.ts                   # Application entry point
├── app.ts                      # Express app configuration
│                               # (routes, middleware, CORS setup)
│
├── config/
│   └── db/
│       └── db.ts              # MongoDB connection handler
│
├── models/                     # Mongoose schemas
│   ├── users.ts               # User schema with validation
│   ├── product.ts             # Product schema
│   ├── cart.ts                # Cart schema (user or anonymous)
│   ├── order.ts               # Order schema with status enum
│   ├── category.ts            # Category schema
│   ├── image.ts               # Image metadata schema
│   └── role.ts                # Role definition schema
│
├── controllers/               # Business logic handlers
│   ├── product.controller.ts # CRUD + image management
│   ├── cart.controller.ts    # Add/remove/update cart items
│   ├── order.controller.ts   # Order creation, updates, cancellation
│   ├── users.controller.ts   # Auth (signup/login), user queries
│   └── category.controller.ts # Category operations
│
├── routes/                    # Express route definitions
│   ├── product.routes.ts     # /product endpoints
│   ├── cart.routes.ts        # /cart endpoints
│   ├── order.routes.ts       # /order endpoints
│   ├── user.routes.ts        # /users endpoints
│   └── category.routes.ts    # /category endpoints
│
├── middlewares/              # Express middleware functions
│   ├── auth.ts              # JWT verification (Bearer token)
│   ├── requireRole.ts       # Role-based authorization check
│   ├── uploadProductImages.ts # Multer configuration for images
│   ├── optionalAuth.ts      # Optional authentication layer
│   ├── bad-request.ts       # 400 error handler
│   ├── forbiden.ts          # 403 error handler
│   ├── not-found.ts         # 404 error handler
│   └── types/authTypes/     # Auth type definitions
│
├── types/                   # TypeScript interfaces
│   ├── order.type.ts       # Order type definitions
│   └── product.types.ts    # Product type definitions
│
├── utils/                  # Helper functions
│   ├── calculateDiscountedPrice.ts # Discount calculation logic
│   └── mergeCarts.ts              # Anonymous → authenticated cart merge
│
└── api/
    └── uploadThing/
        └── uploadRouter.ts  # UploadThing integration
```

### Key Components and Their Roles

**Frontend State Management:**
- `AuthContext`: Manages user identity, token, login/logout operations
- `CartContext`: Manages shopping cart state, synchronizes with backend
- `React Query`: Handles server state (products, orders) with caching and refetching

**Backend Request Flow:**
1. Request arrives at Express server
2. CORS middleware validates origin
3. Route handler called
4. Middleware chain: optional auth → optional role check
5. Controller processes business logic
6. Mongoose operations interact with MongoDB
7. Response serialized and returned

---

## Setup & Installation

### Prerequisites

- **Node.js:** v22.18.0 or higher
- **npm:** v10 or higher (or yarn/pnpm)
- **MongoDB:** v5.0+ (local or cloud instance, e.g., MongoDB Atlas)
- **Google Cloud Storage:** Service account credentials (for image uploads)

### Backend Setup

1. **Clone and navigate:**
```bash
git clone https://github.com/Esteban2306/pilly-lu-e-commerce.git
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables** (`.env` file):
```env
PORT=3001
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/pilly-lu
JWT_SECRET=your-secret-key-min-32-chars
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_BUCKET_NAME=your-bucket-name
GOOGLE_APPLICATION_CREDENTIALS=./path/to/service-account-key.json
NODE_ENV=development
```

4. **Run development server:**
```bash
npm run dev
```
Server runs on `http://localhost:3001`

5. **Build for production:**
```bash
npm run build
npm start
```

### Frontend Setup

1. **Navigate to frontend:**
```bash
cd ../frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables** (`.env.local` file):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_UPLOADTHING_APP_ID=your-uploadthing-app-id
```

4. **Run development server:**
```bash
npm run dev
```
Frontend runs on `http://localhost:3000`

5. **Build for production:**
```bash
npm run build
npm start
```

### Docker (Optional)

For containerized deployment, create a `Dockerfile` in each directory and use `docker-compose` for orchestration. This setup includes MongoDB in compose.

---

## Usage

### Public Workflows

**1. Browse Products:**
- Navigate to `/products` or `/category/:categoryId`
- View product details at `/product/:id`
- Pricing displays original price, discount percentage, and final price

**2. Shopping Cart (Anonymous or Authenticated):**
- Add items via "Add to Cart" button (stores in context)
- View cart at `/order` (displays summary)
- For guests: cart persists via `anonId` in localStorage
- For authenticated users: cart persists in MongoDB

**3. Login/Signup:**
- Sign up at `/auth/signUp` (requires email, password, first/last name)
- Login at `/auth/signIn` (email + password)
- JWT token stored in localStorage and Authorization header

**4. Checkout:**
- Proceed from cart to checkout
- Submit order (anonymous users may be prompted for email)
- Order appears in order history with status tracking

### Admin Workflows

**1. Access Admin Panel:**
- Navigate to `/admin` (requires admin role)
- Protected route enforces RBAC via middleware

**2. Product Management:**
- `/admin/create`: Create new products with images, pricing, categories
- `/admin/dashboard`: View product metrics
- Edit/delete products via dashboard

**3. Order Management:**
- `/admin/orders`: View all orders, filter by status
- Update order status (pendiente → pagado → enviado → entregado)
- Cancel orders or remove items

**4. User Management:**
- `/admin/users`: List all users with search
- Filter by role
- View user details and order history

---

## Performance & Scalability Considerations

### Current Optimizations

| Area | Implementation | Benefit |
|------|---|---|
| **Image Delivery** | Google Cloud Storage with CDN | Fast global image delivery, reduced server load |
| **Product Pagination** | Server-side pagination with skip/limit | Efficient database queries, manageable response sizes |
| **Caching** | React Query with configurable stale times | Reduced API calls, faster perceived performance |
| **Code Splitting** | Next.js automatic route-based splitting | Smaller initial bundle, faster First Contentful Paint (FCP) |
| **Database Indexing** | Mongoose indexes on frequently queried fields | O(log n) lookup instead of O(n) |
| **Async Operations** | Non-blocking I/O throughout backend | Can handle thousands of concurrent connections |
| **JWT Authentication** | Stateless tokens, no session storage | Scales horizontally without shared state |

### Scalability Challenges & Solutions

**Challenge: Database Growth**
- **Current:** Single MongoDB instance
- **Future:** Sharding (horizontal partitioning) by user ID or product category

**Challenge: Image Storage**
- **Current:** Google Cloud Storage (highly scalable)
- **Potential Issue:** Transfer costs at massive scale
- **Future:** CDN caching layer, WebP format mandating, lazy-load images

**Challenge: Concurrent Orders**
- **Current:** MongoDB handles document-level locking
- **Future:** Queue system (Bull/RabbitMQ) for order processing

**Challenge: Auth Token Verification**
- **Current:** Verified on every protected endpoint
- **Future:** Implement Redis caching for recently-verified tokens

### What Could Be Improved

1. **Testing:** No unit/integration tests present. Recommend:
   - Jest for backend controller tests
   - React Testing Library for frontend components
   - E2E tests with Playwright or Cypress

2. **Error Handling:** Basic error middleware present, but:
   - No structured error codes (e.g., error code 1001 = "Product not found")
   - Improve error messages for API consumers

3. **Logging:** Winston configured but minimally used:
   - Add request logging middleware
   - Log all database operations
   - Monitor performance metrics

4. **Rate Limiting:** No protection against:
   - Brute-force login attacks
   - Excessive API calls
   - Implement express-rate-limit

5. **Input Validation:** Zod configured but not universally applied:
   - Standardize request schema validation
   - Centralize type definitions

6. **Security:**
   - No HTTPS enforcement in development
   - Admin role ID hardcoded as MongoDB ObjectId
   - Consider environment-based role definitions
   - No CSRF protection (less critical with JWT, but consider)

7. **API Documentation:** No OpenAPI/Swagger documentation
   - Would improve developer onboarding

---

## Limitations & Future Improvements

### Current Limitations

1. **Payment Processing:** No payment gateway integration (Stripe, PayPal, etc.)
   - Orders created but no payment verification

2. **Role Management:** Only "admin" and "customer" roles; no granular permissions
   - E.g., can't restrict admin to "view only" or "manage products only"

3. **Product Filtering:** Limited to category; no advanced filters
   - No price range filtering, color filters, or full-text search

4. **Inventory Management:** Basic stock flags but no real-time depletion
   - No reservation system; race conditions possible in high-concurrency

5. **Notifications:** No email confirmations or order status updates
   - Manual status updates required

6. **Analytics:** No dashboard metrics
   - Revenue, top products, user behavior not tracked

### Recommended Future Enhancements

**Short-term (1-2 weeks):**
- Add comprehensive error codes and structured logging
- Implement input validation schemas with Zod across all endpoints
- Add rate limiting middleware
- Create API documentation with Swagger/OpenAPI

**Medium-term (1-2 months):**
- Integrate Stripe for real payment processing
- Add email notifications (transactional emails via SendGrid or Mailgun)
- Implement search functionality (Elasticsearch or MongoDB text indexes)
- Add product reviews and ratings
- Create admin analytics dashboard

**Long-term (3-6 months):**
- Implement recommendation engine (collaborative filtering)
- Add promotional code/coupon system
- Implement wishlist feature
- Create mobile app (React Native or Flutter)
- Add real-time inventory sync
- Implement order fulfillment workflows (label printing, tracking integration)

---

## Author & Contact

**Author:** Esteban Castañeda

**Repository:** [GitHub - Pilly-lu E-commerce](https://github.com/Esteban2306/pilly-lu-e-commerce)

**Contact:** For technical inquiries, open an issue on the repository or reach out via the GitHub profile.

---

## License

This project is licensed under the ISC License.