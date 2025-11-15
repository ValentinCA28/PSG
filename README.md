# Internal DevOps Development Template

> A pre-configured Next.js template for internal web applications. Set up for teams working with AI assistants who need a solid foundation without the setup complexity.

## 🚀 Getting Started

### Start a New App From This Template (Do NOT push to the template)

Template repo: [FinanceFactorsLTD/Next.js-Development-Template](https://github.com/FinanceFactorsLTD/Next.js-Development-Template)

1) GitHub UI (recommended)

- Open the template repository in your browser
- Click "Use this template" → "Create a new repository"
- Owner: `FinanceFactorsLTD`
- Repository name: your app name (e.g., `customer-portal`, `loan-servicing-ui`)
- Visibility: Private (recommended)
- Click "Create repository"

2) GitHub CLI (alternative)

```bash
gh auth login  # GitHub.com, HTTPS, browser auth

# Replace <app-name> with your new repository name
gh repo create FinanceFactorsLTD/<app-name> \
  --template FinanceFactorsLTD/Next.js-Development-Template \
  --private --confirm
```

3) Open your new app repository in Cursor (or clone via CLI)

- Cursor: New Window → Clone → select `FinanceFactorsLTD/<app-name>` → Trust workspace
- CLI:
  ```bash
  gh repo clone FinanceFactorsLTD/<app-name>
  cd <app-name>
  ```

4) Install and run (development)

```bash
npm install
npm run dev
```

Notes

- Use `npm run dev` for development; `npm run build` is only for production builds
- Node.js 18.18+ (or 20+) recommended
- If port 3000 is in use, Next.js will automatically use another port
- Environment variables: if needed later, create `.env.local` in the project root

### Quick Start (Template is Ready!)

The development server should already be running. If not:

1. Start the server:
   ```bash
   npm run dev
   ```

2. Open in browser:
   Go to http://localhost:3002 (or whatever port is shown)

3. Explore the example:
   Visit `/dashboard` to see a working feature page

### Adding New Features

1. Create feature directory:
   ```bash
   mkdir src/app/my-feature
   ```

2. Add page component:
   ```typescript
   // src/app/my-feature/page.tsx
   export default function MyFeaturePage() {
     return <div>My Feature</div>;
   }
   ```

3. Add feature components:
   ```bash
   mkdir src/app/my-feature/components
   ```

4. Register global state fields:
   ```typescript
   const myField = useField('myFeature.data', {
     type: 'string',
     defaultValue: '',
     description: 'Feature-specific data'
   });
   ```

### Adding shadcn/ui Components

```bash
npx shadcn-ui@latest add [component-name]
```

## 🤖 AI Quick Context (copy-paste into your AI assistant)

```text
You are helping on an internal Next.js app using this base:
- Stack: Next.js (App Router, src/), TypeScript, Tailwind CSS, shadcn/ui, next-themes
- Routing & structure: create routes under src/app/<feature>/page.tsx; colocate feature UI in src/app/<feature>/components; shared components in src/components/; shadcn/ui in src/components/ui.
- Global state: use AppContext (src/contexts/AppContext.tsx). Register fields via useField('<fieldId>', { type, defaultValue, validation? }) and read/update them anywhere. Avoid duplicating state. The app is wrapped with <AppProvider /> in src/app/layout.tsx.
- Theme: managed by next-themes. Use ThemeToggle component. When reading theme in client components, gate on a mounted flag to avoid hydration mismatch.
- Utilities: use cn() from src/lib/utils.ts for Tailwind class merging.
- Coding standards: TypeScript strict, no any, absolute imports with @/, keep edits small and clear, preserve existing indentation/format, follow design philosophy (simplicity, intuitive UX).
- Dev workflow: npm install; npm run dev. Production builds are handled by Vercel from GitHub. No local build needed unless explicitly testing production (npm run build && npm start).
```

Tip: Give your AI assistant this README (or the snippet above) before asking for changes. Reference exact paths (e.g., `src/app/dashboard/page.tsx`) so it edits the right files.

## 🎯 Purpose & Philosophy

This template is designed for **internal development teams** working with AI assistants:

- **Ready to Code**: Create a new repository from this template, then `npm install` and `npm run dev` to start immediately
- **Theme System**: Light/dark mode toggle with system preference detection is already set up
- **AI Assistant Friendly**: Structured codebase that's easy for AI to understand and work with



## 📁 File Structure Standards

### Core Principles

1. **Route-based organization**: Each feature gets its own descriptive folder
2. **Colocation**: Keep related components close to where they're used
3. **Shared resources**: Common components live in dedicated shared directories
4. **Clear separation**: Distinguish between UI components, business logic, and contexts

### Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing/Home page
│   ├── layout.tsx                # Root layout with providers
│   ├── globals.css               # Global styles and CSS variables
│   ├── [descriptivefoldername]/  # Feature-specific routes
│   │   ├── page.tsx              # Route page component
│   │   ├── layout.tsx            # Optional: route-specific layout
│   │   ├── loading.tsx           # Optional: loading UI
│   │   ├── error.tsx             # Optional: error UI
│   │   └── components/           # Route-specific components
│   │       ├── FeatureComponent.tsx
│   │       └── ...
│   └── ...
├── components/                   # Shared components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── layout/                   # Layout components
│   │   ├── Navigation.tsx        # Navigation bar (included)
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── forms/                    # Reusable form components
│   ├── data-display/             # Tables, lists, etc.
│   └── ...
├── contexts/                     # React contexts for state management
│   ├── AppContext.tsx            # Global app state
│   └── ...
├── lib/                          # Utility functions and configurations
│   ├── utils.ts                  # shadcn/ui utilities (cn function)
│   ├── validations.ts            # Form validation schemas
│   └── ...
└── types/                        # TypeScript type definitions
    ├── global.ts
    └── ...
```

### Naming Conventions

- **Files**: `PascalCase.tsx` for components, `kebab-case.ts` for utilities
- **Folders**: `kebab-case` or `descriptivefoldername`
- **Components**: `PascalCase` for component names
- **Functions**: `camelCase` for function names
- **Constants**: `UPPER_SNAKE_CASE` for constants

## 🧩 Component Architecture

### Component Categories

1. **UI Components** (`src/components/ui/`)
   - shadcn/ui components
   - Basic building blocks
   - No business logic
   - Highly reusable

2. **Shared Components** (`src/components/`)
   - Cross-feature components
   - May contain business logic
   - Moderately reusable

3. **Feature Components** (`src/app/[feature]/components/`)
   - Feature-specific components
   - Contains feature business logic
   - Low reusability, high cohesion

### Component Design Principles

- **Single Responsibility**: Each component should have one clear purpose
- **Composition over Inheritance**: Build complex UIs by composing simple components
- **Props Interface**: Always define explicit TypeScript interfaces for props
- **Default Props**: Use default parameters instead of defaultProps
- **Error Boundaries**: Implement error boundaries for robust UIs

## 🌐 Global State Management

### AppContext Pattern

Our global state management uses a **field registry pattern** for maximum efficiency:

```typescript
// Register a field
const userName = useField('userName', {
  type: 'string',
  defaultValue: '',
  validation: (value) => typeof value === 'string' && value.length > 0,
  description: 'User name for the application'
});

// Use the field
<input 
  value={userName.value} 
  onChange={(e) => userName.setValue(e.target.value)} 
/>
```

### Key Benefits

- **No Redundancy**: Fields are shared globally by ID
- **Type Safety**: Full TypeScript support with generic types
- **Validation**: Built-in validation system
- **Performance**: Efficient updates with selective re-renders
- **Developer Experience**: Auto-registration and cleanup

### Field Types

- `string`: Text and string data
- `number`: Numeric values
- `boolean`: True/false values
- `object`: Complex objects
- `array`: Lists and collections

### Best Practices

1. **Descriptive IDs**: Use clear, descriptive field IDs (`userProfile.email` not `email`)
2. **Default Values**: Always provide sensible defaults
3. **Validation**: Implement validation for data integrity
4. **Cleanup**: Fields auto-cleanup on component unmount (configurable)
5. **Stable Validation Functions**: Define validation functions outside components or use `useCallback` to prevent infinite re-renders

```typescript
// ✅ Good: Stable validation function
const validateEmail = (value: any) => /\S+@\S+\.\S+/.test(value);

function MyComponent() {
  const email = useField('email', {
    type: 'string',
    defaultValue: '',
    validation: validateEmail // Stable reference
  });
}

// ❌ Avoid: Inline validation functions
function MyComponent() {
  const email = useField('email', {
    type: 'string',
    defaultValue: '',
    validation: (value) => /\S+@\S+\.\S+/.test(value) // New function every render!
  });
}
```

## 🎨 Design System

### Color System

Our design system uses CSS variables for consistent theming:

```css
/* Light theme */
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--primary: 221.2 83.2% 53.3%;
--secondary: 210 40% 95%;

/* Dark theme */
--background: 222.2 84% 4.9%;
--foreground: 210 40% 98%;
--primary: 217.2 91.2% 59.8%;
--secondary: 222.2 84% 4.9%;
```

### Typography

- **Font Family**: Inter for body text, SF Mono for code
- **Scale**: Consistent type scale using Tailwind classes
- **Line Height**: Optimized for readability
- **Font Features**: Ligatures and proper font feature settings

### Spacing System

- **Base Unit**: 4px (0.25rem)
- **Scale**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px
- **Consistent**: Use Tailwind spacing classes

### Component Patterns

1. **Cards**: Use for grouped content
2. **Buttons**: Clear hierarchy with primary, secondary, outline variants
3. **Forms**: Consistent spacing and validation patterns
4. **Navigation**: Clear information architecture

## 🛠️ Development Standards

### Code Quality

- **TypeScript**: Strict mode enabled, no `any` types
- **ESLint**: Enforced coding standards
- **Prettier**: Consistent code formatting
- **Imports**: Absolute imports using `@/` alias

### Performance

- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Use Next.js Image component
- **Lazy Loading**: Implement for non-critical components
- **Bundle Analysis**: Regular bundle size monitoring

### Testing Strategy

- **Unit Tests**: For utility functions and hooks
- **Component Tests**: For isolated component behavior
- **Integration Tests**: For feature workflows
- **E2E Tests**: For critical user journeys

### Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliance
- **Focus Management**: Clear focus indicators

## 🚀 Getting Started

### Start a New App From This Template (Do NOT push to the template)

Template repo: [FinanceFactorsLTD/Next.js-Development-Template](https://github.com/FinanceFactorsLTD/Next.js-Development-Template)

1) GitHub UI (recommended)

- Open the template repository in your browser
- Click "Use this template" → "Create a new repository"
- Owner: `FinanceFactorsLTD`
- Repository name: your app name (e.g., `customer-portal`, `loan-servicing-ui`)
- Visibility: Private (recommended)
- Click "Create repository"

2) GitHub CLI (alternative)

```bash
gh auth login  # GitHub.com, HTTPS, browser auth

# Replace <app-name> with your new repository name
gh repo create FinanceFactorsLTD/<app-name> \
  --template FinanceFactorsLTD/Next.js-Development-Template \
  --private --confirm
```

3) Open your new app repository in Cursor (or clone via CLI)

- Cursor: New Window → Clone → select `FinanceFactorsLTD/<app-name>` → Trust workspace
- CLI:
  ```bash
  gh repo clone FinanceFactorsLTD/<app-name>
  cd <app-name>
  ```

4) Install and run (development)

```bash
npm install
npm run dev
```

Notes

- Use `npm run dev` for development; `npm run build` is only for production builds
- Node.js 18.18+ (or 20+) recommended
- If port 3000 is in use, Next.js will automatically use another port
- Environment variables: if needed later, create `.env.local` in the project root

### Quick Start (Template is Ready!)

The development server should already be running. If not:

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Open in browser:**
   Navigate to [http://localhost:3002](http://localhost:3002)

3. **Explore the example:**
   Check out `/dashboard` to see a working feature page

### Adding New Features

1. **Create feature directory:**
   ```bash
   mkdir src/app/my-feature
   ```

2. **Add page component:**
   ```typescript
   // src/app/my-feature/page.tsx
   export default function MyFeaturePage() {
     return <div>My Feature</div>;
   }
   ```

3. **Add feature components:**
   ```bash
   mkdir src/app/my-feature/components
   ```

4. **Register global state fields:**
   ```typescript
   const myField = useField('myFeature.data', {
     type: 'string',
     defaultValue: '',
     description: 'Feature-specific data'
   });
   ```

### Adding shadcn/ui Components

```bash
npx shadcn-ui@latest add [component-name]
```

## 📦 Dependencies

### Core Dependencies

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type safety and developer experience
- **Tailwind CSS**: Utility-first styling

### UI Dependencies

- **shadcn/ui**: Beautiful, accessible components
- **Radix UI**: Unstyled, accessible primitives
- **Lucide React**: Beautiful SVG icons (includes theme toggle icons)
- **next-themes**: Dark/light mode support with working toggle

### Utility Dependencies

- **clsx**: Conditional className utility
- **tailwind-merge**: Merge Tailwind classes
- **class-variance-authority**: Type-safe variant API

## 🚀 Deployment with Vercel

You do not need to run `npm run build` locally. Vercel will automatically build and deploy your app from GitHub.

### Steps

1. Push your new app repository to GitHub (created from this template)
2. In Vercel, click "New Project" → "Import Git Repository"
3. Select your repository under the `FinanceFactorsLTD` organization
4. Framework Preset: Next.js (auto-detected)
5. Root Directory: project root (default)
6. Set any required Environment Variables in Vercel
7. Click Deploy

### Workflow

- Push to `main`/`master` → Triggers a production deployment
- Open a Pull Request → Vercel creates a preview deployment
- Manage env vars per environment (Development/Preview/Production) in Vercel

### Optional (local production test)

If you want to verify a production build locally:

```bash
npm run build
npm start
```

This is not required for normal development; use `npm run dev` during development.


## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 💡 Working with AI Assistants

This template is optimized for AI collaboration:

1. **Mention the template**: Tell your AI assistant you're using this specific template structure
2. **Reference file paths**: Use the exact paths shown in the structure guide
3. **Use the patterns**: Follow the established patterns for state management and components
4. **Check examples**: Point your AI to `/dashboard` as a reference implementation

### Common AI Prompts

- "Using this Next.js template structure, create a new feature page for [feature name]"
- "Add a global state field for [data] using the useField pattern"
- "Create a new component in the /components directory that follows our standards"

---

*Ready for your team to build internal applications efficiently with AI assistance.*

---

## Design Philosophy & Guidelines

### Core Principle
"Design is not just what it looks like and feels like. Design is how it works."

When implementing any feature or interface in this project, follow these fundamental design principles:

### 1. Simplicity Above All
- **Prioritize simplicity** - Simple can be harder than complex, but it's worth the effort
- **Clean thinking leads to clean design** - Take time to distill ideas to their essence
- **Less is more** - Remove everything that doesn't serve the user's goal

### 2. User-Centered Iteration
- **Think as a user first** - Always ask: "What would I want as a user?"
- **Iterate towards perfection** - But know when to ship by asking: "Does everything just make sense?"
- **Minimize friction** - Reduce steps and clicks to only what's essential
- **The goal**: Keep the experience smooth while offering configuration options that feel natural

### 3. Intuitive Design
- **No manual needed** - Any product that needs a manual to work is broken
- **Use familiar metaphors** - UIs must be based on concepts users already understand
- **Make things obviously intuitive** - Users should know what to do without thinking

### 4. Purposeful Details
- **Every element has purpose** - Apply the principle of shokunin (craftsman's dedication)
- **Consider everything**:
  - Every word choice
  - Every border and spacing
  - Every card, toggle, and menu
  - Every popover and selector
- **Design with intention** - Nothing is arbitrary

### 5. Visual Harmony
- **Symmetry** - Create visual balance
- **Space** - Use whitespace effectively
- **Order** - Establish clear hierarchy
- **Flow** - Guide users naturally through the interface

### 6. Empathetic Approach
- **Treat users how you'd want to be treated**
- **Don't overcomplicate** - Respect the user's time and intelligence
- **Be friendly** - The interface should feel approachable, not intimidating

### Implementation Guidelines

When coding any UI element or feature:

1. **Question every decision**: Is this the simplest solution that works well?
2. **Value small decisions**: The details add up to create the overall experience
3. **Test with fresh eyes**: Step back and approach as a first-time user would
4. **Remove friction**: If something requires explanation, redesign it
5. **Maintain consistency**: Patterns should be predictable across the application

### Remember
Great design happens when users don't notice the design—they just accomplish their goals effortlessly. Strive for that invisible excellence in every line of code and every pixel on screen.
