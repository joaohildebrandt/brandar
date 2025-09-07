# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Brandar is a headless React calendar library built with TypeScript. It provides calendar functionality through a state management system using nanostores and React hooks.

## Development Commands

- `npm run build` - Build the library using rslib
- `npm run dev` - Start development mode with watch
- `npm run test` - Run tests with vitest
- `npm run check` - Run biome linting and formatting checks (auto-fixes)
- `npm run format` - Format code with biome
- `npm run storybook` - Start Storybook development server
- `npm run build:storybook` - Build Storybook for production

## Architecture

### Core Structure
The project follows a dual-architecture pattern:

1. **Core logic** (`/core/`) - Framework-agnostic calendar logic and state management
2. **React components** (`/src/`) - React-specific implementations and UI components

### State Management
- Uses nanostores for state management with stores in `/core/store/`
- React integration via `@nanostores/react`
- State is organized by domain: calendar, calendar-item, grid-view, time-grid-selection, etc.

### Component Architecture
Components are organized by view type:
- `grid-view/` - Week/day grid calendar view
- `tile-view/` - Month tile calendar view
- Each component has its own CSS module for styling

### Key Hooks
- `useCalendar()` - Main calendar hook in `src/core/hooks/use-calendar.ts`
- `useStore()` - Generic store access hook
- `useAction()` - Action dispatcher hook

### Build System
- Uses rslib for library building
- TypeScript with strict configuration
- Biome for linting and formatting (single quotes, space indentation)
- CSS Modules for component styling
- Tailwind CSS for utility classes

### Testing
- Vitest for testing
- Testing Library for React component tests
- Tests should be run with `npm run test`