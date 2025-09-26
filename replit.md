# PCOUNT - Production Monitoring Application

## Overview

PCOUNT is a React Native web application built with Expo for production line monitoring and counting. The application provides a comprehensive dashboard for tracking production statistics, managing production lines, and monitoring manufacturing operations. It features real-time production data, multi-contract support, and responsive design optimized for web deployment.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Expo React Native configured for web deployment
- **Language**: TypeScript with strict type checking
- **Navigation**: React Navigation with bottom tabs and stack-based navigation
- **Styling**: Styled Components with React Native for consistent theming
- **State Management**: React Context API for authentication and global state
- **Development Server**: Expo Metro bundler configured for port 5000

### Authentication & Authorization
- **Auth System**: Token-based authentication using JWT
- **Secure Storage**: Expo SecureStore with localStorage fallback for web
- **Multi-contract Support**: Users can select between multiple contracts after login
- **Default Credentials**: Admin/Admin for development environment
- **Session Management**: Automatic token refresh and secure token storage

### Data Architecture
- **Hybrid Data Strategy**: API-first with automatic fallback to mock data
- **API Versioning**: Support for both V1 and V2 endpoints based on feature requirements
- **State Management**: Custom hooks for data fetching with loading and error states
- **Real-time Updates**: Production statistics and line status monitoring
- **Offline Capability**: Mock data fallback ensures application functions without API

### Component Architecture
- **Styled Components**: Centralized theming system with responsive design
- **Custom Hooks**: Reusable hooks for API calls, mock fallback, and data management
- **Error Handling**: Comprehensive error boundaries with retry mechanisms
- **Loading States**: Consistent loading indicators across all data-driven components
- **Responsive Design**: Adaptive layouts for different screen sizes

### Build & Deployment
- **Development**: Hot reloading with Expo development server
- **Production Build**: Optimized static web build using `expo export`
- **Deployment**: Autoscale configuration for stateless web application
- **Static Serving**: Production deployment using serve package on dynamic ports

## External Dependencies

### Core Framework Dependencies
- **Expo SDK 54**: React Native development platform with web support
- **React 19.1.0**: Frontend framework with latest features
- **React Navigation**: Bottom tabs and stack navigation system
- **Styled Components**: CSS-in-JS styling solution

### Production & Visualization
- **React Native SVG**: Vector graphics for charts and visualizations
- **Expo Linear Gradient**: Gradient backgrounds and UI elements
- **React Native Vector Icons**: Material Design icons throughout the application

### Development & Build Tools
- **TypeScript**: Static type checking and enhanced development experience
- **Metro Bundler**: Module bundling and development server
- **Serve Package**: Production static file serving

### Storage & Security
- **Expo SecureStore**: Secure token storage with web fallback
- **React Native Safe Area Context**: Safe area handling for different devices

### API Integration
- **PCount API V1**: Production data, circuits, and dashboard endpoints
- **PCount API V2**: Authentication and user management
- **Custom HTTP Client**: Axios-like service with automatic retry and error handling
- **Environment Configuration**: Flexible API endpoint configuration

### Mock Data System
- **Development Fallback**: Automatic mock data when API is unavailable
- **Production Simulation**: Realistic production line and statistics data
- **Contract Management**: Multi-contract mock data for testing workflows