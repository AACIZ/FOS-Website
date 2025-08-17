# FiguringOut Solutions - Digital Marketing Agency Website

## Overview

FiguringOut Solutions is a modern, single-page digital marketing agency website built with React and Express. The application features a futuristic, immersive design with dark aesthetics, glassmorphism effects, and interactive animations. The website showcases the agency's services across multiple industries including fashion, healthcare, food & hospitality, and e-commerce, emphasizing their mission to "multiply your impact" rather than just market.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Styling**: Tailwind CSS with custom CSS variables for consistent theming and dark mode support
- **UI Components**: Radix UI primitives with shadcn/ui component library for accessible, customizable components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for full-stack type safety
- **Development**: Hot module replacement and middleware setup for development workflow
- **Storage Interface**: Abstract storage layer with in-memory implementation, designed for easy database integration

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema**: Shared schema definitions between client and server using Zod for validation
- **Migrations**: Drizzle Kit for database schema management and migrations
- **Connection**: Configured for Neon Database serverless PostgreSQL

### Design System
- **Typography**: Inter for body text and Orbitron for headings, creating a modern tech aesthetic
- **Color Scheme**: Custom CSS variables with purple/blue/cyan gradient palette for futuristic branding
- **Visual Effects**: 
  - Glassmorphism with backdrop blur and transparency
  - Gradient text effects and animations
  - Custom cursor with magnetic hover interactions
  - Floating particles and morphing background elements
  - Parallax scrolling and depth-based hover effects

### Interactive Features
- **Custom Cursor**: Magnetic cursor effects that respond to hoverable elements
- **Scroll Interactions**: Progress indicator and smooth scrolling between sections
- **Animations**: CSS-based animations for fade-ins, scaling, and floating effects
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts

### Content Sections
- **Hero**: Large typography with animated background and call-to-action buttons
- **About**: Company statistics and mission with animated counters
- **Services**: Grid layout showcasing six core service offerings
- **Portfolio**: Case studies with industry categorization and growth metrics
- **Industries**: Eight industry sectors with specialized expertise
- **Contact**: Form with validation and toast notifications for user feedback

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing for single-page application navigation
- **drizzle-orm**: Type-safe ORM for PostgreSQL database operations
- **@neondatabase/serverless**: Serverless PostgreSQL database connection

### UI and Styling Dependencies
- **@radix-ui/***: Comprehensive suite of accessible UI primitives for components
- **tailwindcss**: Utility-first CSS framework for rapid styling
- **class-variance-authority**: Type-safe component variant management
- **clsx**: Conditional class name utility for dynamic styling

### Development and Build Tools
- **vite**: Fast build tool with hot module replacement
- **@vitejs/plugin-react**: React support for Vite
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **typescript**: Static type checking across the entire application

### Form and Validation
- **react-hook-form**: Performance-focused form library
- **@hookform/resolvers**: Validation resolvers for form schemas
- **zod**: Schema validation for type-safe data handling

### Additional Features
- **date-fns**: Date manipulation and formatting utilities
- **lucide-react**: Modern icon library for UI elements
- **embla-carousel-react**: Touch-friendly carousel component for portfolio showcase