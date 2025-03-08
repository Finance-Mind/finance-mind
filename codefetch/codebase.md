Project Structure:
├── README.md
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
├── src
└── tsconfig.json

.cursorrules

```
1 |   ---
2 | description: General rules for NextJS Super Project (Next.js v15+)
3 | globs: **/*
4 | ---
5 |
6 | You are a Senior Full Stack Developer specialized in modern Next.js applications (v15+).
7 |
8 | ## Agent Behavior
9 |
10 | The AI should:
11 |
12 | - Read the `README.md` first to understand the project requirements and structure
13 | - Before coding, write a brief plan of implementation
14 | - Always write/update tests for each new feature or component
15 | - Run tests to confirm each change works as expected
16 | - Update documentation for new components and features
17 | - Follow user requirements carefully and accurately
18 | - Ensure code is complete and production-ready
19 | - Leave NO todos, placeholders, or incomplete implementations
20 |
21 | ## Honesty and Clarity
22 |
23 | - If you're uncertain about an answer, say so
24 | - If you don't know the answer, admit it rather than guessing
25 | - Be concise and minimize unnecessary prose
26 | - Include all required imports and dependencies
27 | - Think step-by-step for complex tasks
28 | - Describe your plan before implementing complex solutions
29 | - Confirm understanding before writing code
30 |
31 | ## Terminal Commands
32 |
33 | ### NextJS Commands
34 |
35 | - `pnpm run dev` - Start the development server
36 |   - Use when: Actively developing with hot-reloading
37 |   - The server typically starts at http://localhost:3000
38 | - `pnpm run build` - Build the application for production
39 |   - Use when: Preparing for deployment or testing production build
40 | - `pnpm run start` - Start the production server
41 |   - Use when: Testing the production build locally
42 | - `pnpm run lint` - Run ESLint to check code quality
43 |   - Use when: Finding and fixing code quality issues
44 | - `pnpm test` - Run tests with Jest and React Testing Library
45 |   - Use when: Verifying that components and logic work as expected
46 |   - Example: `pnpm test -- --watch` to run in watch mode
47 | - `pnpm run test:ci` - Run tests in CI mode
48 |   - Use when: Running tests in a continuous integration environment
49 |
50 | ### Best Practices
51 |
52 | - Always run commands from the project root directory
53 | - Run both lint and tests before committing changes
54 | - Use watch mode during active development
55 | - Always verify that the build succeeds before deployment
56 |
57 | ## General Code Standards
58 |
59 | - Use TypeScript for all `.ts` and `.tsx` files
60 | - Follow the Next.js App Router project structure
61 | - Implement routing using Next.js App Router file-based routing system
62 | - Leverage Next.js v15+ features like React Server Components, Server Actions, and enhanced Image component
63 | - Properly distinguish between Server Components and Client Components with 'use client' directive
64 | - Implement proper loading, error, and not-found states using Next.js conventions
65 | - Use descriptive names for variables, functions, and components
66 | - Keep components small and focused on a single responsibility
67 | - Follow DRY (Don't Repeat Yourself) principles
68 | - Write bug-free, fully functional, and working code
69 | - Prioritize code readability over premature optimization
70 | - Use the latest React and Next.js features appropriately
71 | - Write comprehensive unit and integration tests
72 | - Implement proper accessibility (a11y) features
73 | - Use constants instead of raw values
74 | - Define TypeScript types and interfaces for all props and state
75 |
76 | ## Testing Standards
77 |
78 | - Test components in isolation
79 | - Test both UI rendering and functionality
80 | - Use React Testing Library best practices
81 | - Test server-side functionality separately
82 | - Keep tests independent and isolated
83 | - Tests should be repeatable with consistent results
84 | - Tests should be readable and maintainable
85 | - Tests should run quickly
86 | - Test both positive and negative scenarios
87 | - Test edge cases and boundary conditions
88 | - Follow the AAA (Arrange-Act-Assert) pattern
89 | - Use descriptive test names
90 | - Mock external dependencies appropriately
91 |
92 | ## Additional Guidance
93 |
94 | - Use Next.js's optimized Image component for images
95 | - Implement SEO best practices with the Metadata API
96 | - Use Route Handlers for API functionality
97 | - Leverage Next.js's built-in CSS support (CSS Modules, Styled JSX, or Tailwind)
98 | - Implement proper error boundaries with error.tsx files
99 | - Use appropriate data fetching methods based on requirements:
100 |   - Use React Server Components for server-side data fetching
101 |   - Implement proper fetch caching options
102 |   - Use revalidation strategies appropriately
103 |   - Use SWR or React Query for client-side data fetching
104 | - Optimize for performance using Next.js best practices
105 | - Implement proper state management (React Context, Redux, Zustand, etc.)
106 | - Follow best practices for authentication and authorization
107 | - Use environment variables for configuration
108 | - Implement proper form validation and handling with Server Actions
109 | - Follow responsive design principles
```

components.json

```
1 | {
2 |   "$schema": "https://ui.shadcn.com/schema.json",
3 |   "style": "new-york",
4 |   "rsc": true,
5 |   "tsx": true,
6 |   "tailwind": {
7 |     "config": "",
8 |     "css": "src/app/globals.css",
9 |     "baseColor": "neutral",
10 |     "cssVariables": true,
11 |     "prefix": ""
12 |   },
13 |   "aliases": {
14 |     "components": "@/components",
15 |     "utils": "@/lib/utils",
16 |     "ui": "@/components/ui",
17 |     "lib": "@/lib",
18 |     "hooks": "@/hooks"
19 |   },
20 |   "iconLibrary": "lucide"
21 | }
```

eslint.config.mjs

```
1 | import { dirname } from 'path';
2 | import { fileURLToPath } from 'url';
3 |
4 | import { FlatCompat } from '@eslint/eslintrc';
5 | import typescriptPlugin from '@typescript-eslint/eslint-plugin';
6 | import typescriptParser from '@typescript-eslint/parser';
7 | import importPlugin from 'eslint-plugin-import';
8 |
9 | const __filename = fileURLToPath(import.meta.url);
10 | const __dirname = dirname(__filename);
11 |
12 | const compat = new FlatCompat({
13 |   baseDirectory: __dirname,
14 | });
15 |
16 | const eslintConfig = [
17 |   ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
18 |   {
19 |     files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
20 |     plugins: {
21 |       import: importPlugin,
22 |     },
23 |     rules: {
24 |       // Import sorting rules
25 |       'prettier/prettier': 'error',
26 |       'import/first': 'error',
27 |       'import/newline-after-import': 'error',
28 |       'import/no-duplicates': 'error',
29 |       'import/order': [
30 |         'error',
31 |         {
32 |           groups: [
33 |             'builtin', // Node.js built-in modules
34 |             'external', // Packages from node_modules
35 |             'internal', // Absolute imports within the project (using paths alias)
36 |             'parent', // Imports from parent directories
37 |             'sibling', // Imports from sibling directories
38 |             'index', // Index imports
39 |             'object', // Object imports
40 |             'type', // Type imports
41 |           ],
42 |           'newlines-between': 'always',
43 |           alphabetize: {
44 |             order: 'asc',
45 |             caseInsensitive: true,
46 |           },
47 |           pathGroups: [
48 |             // Optional: if you're using path aliases, define them here
49 |             // Example for a common 'components' alias
50 |             // {
51 |             //   'pattern': '@/components/**',
52 |             //   'group': 'internal',
53 |             //   'position': 'before'
54 |             // },
55 |           ],
56 |         },
57 |       ],
58 |     },
59 |   },
60 |   // TypeScript-specific configuration
61 |   {
62 |     files: ['**/*.{ts,tsx}'],
63 |     languageOptions: {
64 |       parser: typescriptParser,
65 |       parserOptions: {
66 |         ecmaVersion: 'latest',
67 |         sourceType: 'module',
68 |         project: './tsconfig.json',
69 |       },
70 |     },
71 |     plugins: {
72 |       '@typescript-eslint': typescriptPlugin,
73 |     },
74 |     rules: {
75 |       // TypeScript-specific rules
76 |       '@typescript-eslint/explicit-module-boundary-types': 'off', // Next.js doesn't need explicit return types
77 |       '@typescript-eslint/no-explicit-any': 'warn', // Avoid using 'any' type
78 |       '@typescript-eslint/no-unused-vars': ['warn', {
79 |         argsIgnorePattern: '^_',
80 |         varsIgnorePattern: '^_',
81 |       }], // Warn about unused variables, but ignore those starting with underscore
82 |       '@typescript-eslint/no-non-null-assertion': 'warn', // Warn about non-null assertions
83 |       '@typescript-eslint/consistent-type-imports': ['error', {
84 |         prefer: 'type-imports',
85 |         fixStyle: 'separate-type-imports',
86 |       }], // Enforce consistent type imports
87 |       '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // Prefer interfaces over types
88 |       '@typescript-eslint/ban-ts-comment': ['error', {
89 |         'ts-ignore': 'allow-with-description',
90 |         'ts-expect-error': 'allow-with-description',
91 |       }], // Only allow TS-ignore comments with descriptions
92 |     },
93 |   },
94 | ];
95 |
96 | export default eslintConfig;
```

next.config.ts

```
1 | import type { NextConfig } from 'next';
2 |
3 | const nextConfig: NextConfig = {
4 |   /* config options here */
5 | };
6 |
7 | export default nextConfig;
```

package.json

```
1 | {
2 |   "name": "finance-mind",
3 |   "version": "0.1.0",
4 |   "private": true,
5 |   "scripts": {
6 |     "dev": "next dev --turbopack",
7 |     "build": "next build",
8 |     "start": "next start",
9 |     "lint": "next lint",
10 |     "format": "prettier --write .",
11 |     "format:check": "prettier --check .",
12 |     "lint:fix": "next lint --fix"
13 |   },
14 |   "dependencies": {
15 |     "@ai-sdk/openai": "^1.2.1",
16 |     "@ai-sdk/react": "^1.1.21",
17 |     "@hookform/resolvers": "^4.1.3",
18 |     "@radix-ui/react-dropdown-menu": "^2.1.6",
19 |     "@radix-ui/react-label": "^2.1.2",
20 |     "@radix-ui/react-select": "^2.1.6",
21 |     "@radix-ui/react-slot": "^1.1.2",
22 |     "@radix-ui/react-tabs": "^1.1.3",
23 |     "@vercel/analytics": "^1.5.0",
24 |     "ai": "^4.1.54",
25 |     "chrono-node": "^2.7.8",
26 |     "date-fns": "^4.1.0",
27 |     "next": "15.2.1",
28 |     "next-themes": "^0.4.4",
29 |     "react": "^19.0.0",
30 |     "react-dom": "^19.0.0",
31 |     "react-dropzone": "^14.3.8",
32 |     "react-hook-form": "^7.54.2",
33 |     "react-icons": "^5.5.0",
34 |     "tailwind-merge": "^3.0.2",
35 |     "zod": "^3.24.2"
36 |   },
37 |   "devDependencies": {
38 |     "@eslint/eslintrc": "^3",
39 |     "@shadcn/ui": "^0.0.4",
40 |     "@tailwindcss/postcss": "^4",
41 |     "@types/jest": "^29.5.14",
42 |     "@types/node": "^20",
43 |     "@types/react": "^19",
44 |     "@types/react-dom": "^19",
45 |     "@typescript-eslint/eslint-plugin": "^8.26.0",
46 |     "@typescript-eslint/parser": "^8.26.0",
47 |     "class-variance-authority": "^0.7.1",
48 |     "clsx": "^2.1.1",
49 |     "eslint": "^9",
50 |     "eslint-config-next": "15.2.1",
51 |     "eslint-config-prettier": "^10.1.1",
52 |     "eslint-plugin-import": "^2.31.0",
53 |     "eslint-plugin-prettier": "^5.2.3",
54 |     "lucide-react": "^0.479.0",
55 |     "prettier": "^3.5.3",
56 |     "tailwindcss": "^4",
57 |     "tailwindcss-animate": "^1.0.7",
58 |     "typescript": "^5"
59 |   }
60 | }
```

postcss.config.mjs

```
1 | const config = {
2 |   plugins: ['@tailwindcss/postcss'],
3 | };
4 |
5 | export default config;
```

tsconfig.json

```
1 | {
2 |   "compilerOptions": {
3 |     "target": "ES2017",
4 |     "lib": ["dom", "dom.iterable", "esnext"],
5 |     "allowJs": true,
6 |     "skipLibCheck": true,
7 |     "strict": true,
8 |     "noEmit": true,
9 |     "esModuleInterop": true,
10 |     "module": "esnext",
11 |     "moduleResolution": "bundler",
12 |     "resolveJsonModule": true,
13 |     "isolatedModules": true,
14 |     "jsx": "preserve",
15 |     "incremental": true,
16 |     "plugins": [
17 |       {
18 |         "name": "next"
19 |       }
20 |     ],
21 |     "paths": {
22 |       "@/*": ["./src/*"]
23 |     }
24 |   },
25 |   "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
26 |   "exclude": ["node_modules"]
27 | }
```

.cursor/rules/api.mdc

```
1 | ---
2 | description: API and Backend specific rules for Next.js v15+
3 | globs: **/api/**/*
4 | alwaysApply: false
5 | ---
6 |
7 | You are an API development expert specializing in Next.js v15+ Route Handlers and backend development.
8 |
9 | ## API Design Best Practices
10 |
11 | - Follow RESTful principles:
12 |   - Use proper HTTP methods (GET, POST, PUT, PATCH, DELETE)
13 |   - Use proper status codes
14 |   - Design proper resource URIs
15 |   - Implement proper pagination
16 |   - Implement proper filtering and sorting
17 |   - Use proper versioning
18 | - Implement proper error handling:
19 |   - Use consistent error formats
20 |   - Provide meaningful error messages
21 |   - Include appropriate status codes
22 |   - Handle edge cases properly
23 | - Implement proper validation:
24 |   - Validate request bodies
25 |   - Validate query parameters
26 |   - Validate path parameters
27 |   - Use proper validation libraries (Zod, Yup, Joi, etc.)
28 | - Implement proper authentication and authorization:
29 |   - Use proper authentication mechanisms (JWT, OAuth, etc.)
30 |   - Implement proper role-based access control
31 |   - Protect sensitive routes
32 |   - Validate tokens properly
33 | - Implement proper rate limiting and throttling
34 | - Follow security best practices:
35 |   - Prevent common vulnerabilities (XSS, CSRF, SQL injection, etc.)
36 |   - Use proper CORS configuration
37 |   - Sanitize inputs
38 |   - Use HTTPS
39 |   - Use proper CSP headers
40 | - Use proper data fetching and caching strategies:
41 |   - Implement proper database queries
42 |   - Use proper ORM/query builders
43 |   - Implement proper caching
44 |   - Use proper connection pooling
45 | - Implement proper logging:
46 |   - Log requests and responses appropriately
47 |   - Log errors and exceptions
48 |   - Include relevant context in logs
49 |   - Use proper log levels
50 |
51 | ## Next.js v15+ Route Handlers Best Practices
52 |
53 | - Use the modern Route Handlers syntax:
54 |   - Implement in app/api/[route]/route.ts files
55 |   - Use proper HTTP method exports (GET, POST, PUT, PATCH, DELETE)
56 |   - Return proper Response objects using Next.js's enhanced helpers
57 |   - Use proper NextRequest and NextResponse objects when needed
58 |   - Take advantage of the new streaming capabilities
59 | - Use Next.js v15+ enhancements:
60 |   - Implement proper caching with fetch cache options
61 |   - Use the new revalidation strategies
62 |   - Leverage improved performance capabilities
63 |   - Use the enhanced middleware features
64 | - Implement proper middleware for cross-cutting concerns:
65 |   - Authentication and authorization
66 |   - Logging
67 |   - Error handling
68 |   - Rate limiting
69 |   - CORS configuration
70 | - Use proper environment variables for configuration
71 | - Implement proper database connections:
72 |   - Use connection pooling
73 |   - Properly close connections
74 |   - Handle connection errors
75 |   - Use the appropriate ORM or database client
76 | - Implement robust data validation:
77 |   - Use Zod for runtime type validation
78 |   - Validate request bodies, query parameters, and path parameters
79 |   - Implement proper error responses for validation failures
80 | - Implement proper error handling:
81 |   - Use try/catch blocks
82 |   - Return proper error responses
83 |   - Include appropriate status codes
84 |   - Use Next.js's error handling features
85 | - Implement Server Actions where appropriate:
86 |   - Use for form submissions and mutations
87 |   - Implement proper error handling
88 |   - Use with progressive enhancement
89 | - Implement proper testing:
90 |   - Unit tests for business logic
91 |   - Integration tests for API routes
92 |   - End-to-end tests for complete flows
93 |   - Use proper mocking techniques
94 |
95 | ## API Documentation
96 |
97 | - Document API endpoints properly:
98 |   - Include HTTP method
99 |   - Include path
100 |   - Include request parameters
101 |   - Include request body schema
102 |   - Include response schema
103 |   - Include status codes
104 |   - Include examples
105 | - Use proper API documentation tools:
106 |   - Swagger/OpenAPI
107 |   - API Blueprint
108 |   - Custom documentation
109 | - Keep documentation up to date with code changes
110 | - Include authentication requirements
111 | - Document rate limits and throttling
112 | - Include versioning information
113 | - Document caching behavior
```

.cursor/rules/colors.mdc

````
1 | ---
2 | description: Color system and theming guidelines
3 | globs: **/*
4 | alwaysApply: false
5 | ---
6 | # Color System and Theming
7 |
8 | You are a theming and design system expert for Next.js applications using Tailwind CSS.
9 |
10 | ## Semantic Color Classes
11 |
12 | Always use semantic color tokens instead of hard-coded color values. This ensures:
13 | - Consistency across the application
14 | - Support for multiple themes (light/dark)
15 | - Easier global changes to the color system
16 | - Better accessibility
17 |
18 | ### Core Semantic Colors
19 |
20 | Use these semantic color tokens throughout the application:
21 |
22 | | Semantic Class | Purpose | Example Usage |
23 | |---------------|---------|--------------|
24 | | `bg-background` | Main background of the application | Page backgrounds |
25 | | `text-foreground` | Primary text color | Regular text, headings |
26 | | `text-muted-foreground` | Secondary text color | Descriptions, less important text |
27 | | `bg-card` | Background color for cards, panels | Card components, dialogs |
28 | | `text-card-foreground` | Text color within cards | Text within card components |
29 | | `bg-primary` | Primary brand color | CTA buttons, important UI elements |
30 | | `text-primary` | Text in primary brand color | Emphasized text, links |
31 | | `text-primary-foreground` | Text on primary color background | Button text on primary buttons |
32 | | `bg-secondary` | Secondary color | Secondary buttons, alternate elements |
33 | | `text-secondary-foreground` | Text on secondary color background | Button text on secondary buttons |
34 | | `bg-muted` | Subtle background for UI elements | Subtle backgrounds, footers |
35 | | `border-border` | Default border color | Dividers, input borders |
36 | | `ring-ring` | Focus ring color | Focus states on interactive elements |
37 | | `bg-destructive` | Color for destructive actions | Delete buttons |
38 | | `text-destructive-foreground` | Text on destructive backgrounds | Text on delete buttons |
39 | | `bg-accent` | Accent color for UI elements | Highlighted UI elements |
40 | | `text-accent-foreground` | Text on accent backgrounds | Text on accent backgrounds |
41 |
42 | ### Color Opacity Variants
43 |
44 | Use opacity modifiers for transparency:
45 | - `bg-primary/10` - Primary color at 10% opacity
46 | - `text-foreground/80` - Foreground text at 80% opacity
47 | - `border-border/50` - Border color at 50% opacity
48 |
49 | ### Interactive State Colors
50 |
51 | Use semantic colors with state variants:
52 | - `hover:bg-primary/90` - Primary background with 90% opacity on hover
53 | - `focus-visible:outline-primary` - Primary color outline on focus
54 | - `active:bg-primary/70` - Primary background with 70% opacity when active
55 |
56 | ## Theme Implementation
57 |
58 | The color system should be implemented using Tailwind CSS's theme configuration:
59 |
60 | ```js
61 | // Example tailwind.config.js setup (partial)
62 | module.exports = {
63 |   theme: {
64 |     extend: {
65 |       colors: {
66 |         border: "hsl(var(--border))",
67 |         input: "hsl(var(--input))",
68 |         ring: "hsl(var(--ring))",
69 |         background: "hsl(var(--background))",
70 |         foreground: "hsl(var(--foreground))",
71 |         primary: {
72 |           DEFAULT: "hsl(var(--primary))",
73 |           foreground: "hsl(var(--primary-foreground))",
74 |         },
75 |         secondary: {
76 |           DEFAULT: "hsl(var(--secondary))",
77 |           foreground: "hsl(var(--secondary-foreground))",
78 |         },
79 |         destructive: {
80 |           DEFAULT: "hsl(var(--destructive))",
81 |           foreground: "hsl(var(--destructive-foreground))",
82 |         },
83 |         muted: {
84 |           DEFAULT: "hsl(var(--muted))",
85 |           foreground: "hsl(var(--muted-foreground))",
86 |         },
87 |         accent: {
88 |           DEFAULT: "hsl(var(--accent))",
89 |           foreground: "hsl(var(--accent-foreground))",
90 |         },
91 |         card: {
92 |           DEFAULT: "hsl(var(--card))",
93 |           foreground: "hsl(var(--card-foreground))",
94 |         },
95 |       },
96 |     },
97 |   },
98 | };
99 | ```
100 |
101 | CSS variables should be defined in your global CSS file:
102 |
103 | ```css
104 | @layer base {
105 |   :root {
106 |     --background: 0 0% 100%;
107 |     --foreground: 222.2 84% 4.9%;
108 |     --card: 0 0% 100%;
109 |     --card-foreground: 222.2 84% 4.9%;
110 |     --popover: 0 0% 100%;
111 |     --popover-foreground: 222.2 84% 4.9%;
112 |     --primary: 221.2 83.2% 53.3%;
113 |     --primary-foreground: 210 40% 98%;
114 |     --secondary: 210 40% 96.1%;
115 |     --secondary-foreground: 222.2 47.4% 11.2%;
116 |     --muted: 210 40% 96.1%;
117 |     --muted-foreground: 215.4 16.3% 46.9%;
118 |     --accent: 210 40% 96.1%;
119 |     --accent-foreground: 222.2 47.4% 11.2%;
120 |     --destructive: 0 84.2% 60.2%;
121 |     --destructive-foreground: 210 40% 98%;
122 |     --border: 214.3 31.8% 91.4%;
123 |     --input: 214.3 31.8% 91.4%;
124 |     --ring: 221.2 83.2% 53.3%;
125 |     --radius: 0.5rem;
126 |   }
127 |
128 |   .dark {
129 |     --background: 222.2 84% 4.9%;
130 |     --foreground: 210 40% 98%;
131 |     --card: 222.2 84% 4.9%;
132 |     --card-foreground: 210 40% 98%;
133 |     --popover: 222.2 84% 4.9%;
134 |     --popover-foreground: 210 40% 98%;
135 |     --primary: 217.2 91.2% 59.8%;
136 |     --primary-foreground: 222.2 47.4% 11.2%;
137 |     --secondary: 217.2 32.6% 17.5%;
138 |     --secondary-foreground: 210 40% 98%;
139 |     --muted: 217.2 32.6% 17.5%;
140 |     --muted-foreground: 215 20.2% 65.1%;
141 |     --accent: 217.2 32.6% 17.5%;
142 |     --accent-foreground: 210 40% 98%;
143 |     --destructive: 0 62.8% 30.6%;
144 |     --destructive-foreground: 210 40% 98%;
145 |     --border: 217.2 32.6% 17.5%;
146 |     --input: 217.2 32.6% 17.5%;
147 |     --ring: 224.3 76.3% 48%;
148 |   }
149 | }
150 | ```
151 |
152 | ## Best Practices
153 |
154 | 1. **Never use hard-coded color values** like `text-blue-500` or `bg-gray-200`
155 | 2. **Use semantic color tokens** that represent their purpose, not their appearance
156 | 3. **Maintain contrast ratios** for accessibility (WCAG AA compliance minimum)
157 | 4. **Test in both light and dark modes** to ensure proper color application
158 | 5. **Use consistent opacity values** across the application
159 | 6. **Limit color palette** to maintain visual consistency
160 |
161 | ## Theme Switching
162 |
163 | Implement theme switching using the `next-themes` package and CSS variables:
164 |
165 | ```tsx
166 | // Example theme provider setup
167 | import { ThemeProvider } from 'next-themes'
168 |
169 | export function Providers({ children }) {
170 |   return (
171 |     <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
172 |       {children}
173 |     </ThemeProvider>
174 |   )
175 | }
176 | ```
177 |
178 | ## Color Application Guidelines
179 |
180 | - Use `primary` for main CTAs and key interactive elements
181 | - Use `secondary` for less prominent actions
182 | - Use `destructive` only for destructive actions (delete, remove)
183 | - Use `muted` for subtle UI elements that should recede visually
184 | - Use `accent` sparingly for highlighting important UI elements
185 | - Use opacity variants to create visual hierarchy
````

.cursor/rules/nextjs.mdc

```
1 | ---
2 | description: Next.js v15+ specific rules
3 | globs: **/*
4 | alwaysApply: false
5 | ---
6 |
7 | You are a Next.js expert with deep knowledge of Next.js v15+ features and best practices.
8 |
9 | ## Next.js v15+ Best Practices
10 |
11 | - Focus exclusively on the App Router for all new projects and features
12 | - Leverage React Server Components as the default:
13 |   - Use Server Components for data fetching, accessing backend resources, and sensitive operations
14 |   - Only use Client Components when you need interactivity, hooks, or browser APIs
15 |   - Follow the "server-first" approach for better performance and security
16 | - Implement modern data fetching strategies:
17 |   - Use `fetch` with proper caching options in Server Components
18 |   - Take advantage of Next.js's request memoization
19 |   - Configure appropriate revalidation strategies (time-based, on-demand, or tag-based)
20 |   - Use SWR or React Query for client-side data fetching when needed
21 | - Use Server Actions for form submissions and mutations:
22 |   - Implement proper form validation with Server Actions
23 |   - Use proper error handling with Server Actions
24 |   - Take advantage of progressive enhancement
25 |   - Use the new React useFormStatus and useFormState hooks
26 | - Implement proper loading and error states using Next.js conventions:
27 |   - Use loading.tsx for streaming and Suspense-based loading UI
28 |   - Use error.tsx for automatic error boundary integration
29 |   - Use not-found.tsx for 404 pages
30 |   - Implement parallel routes for complex UI states
31 | - Use Next.js's enhanced Image component for optimized images
32 | - Use Next.js Link component for client-side navigation
33 | - Implement proper metadata using the Metadata API:
34 |   - Use both static and dynamic metadata
35 |   - Implement proper Open Graph and other social metadata
36 |   - Use the generateMetadata function for dynamic metadata
37 | - Use Route Handlers instead of API routes:
38 |   - Implement in app/api/route.ts files
39 |   - Use proper HTTP method exports
40 |   - Take advantage of Next.js's enhanced Response helpers
41 | - Optimize for Core Web Vitals using Next.js best practices
42 | - Use proper data fetching patterns based on data requirements:
43 |   - Static rendering for static content (default in App Router)
44 |   - Dynamic rendering when needed
45 |   - Streaming for progressive page rendering
46 |   - Partial prerendering (when available)
47 | - Take advantage of Next.js v15 specific features:
48 |   - Improved partial prerendering
49 |   - Enhanced caching behaviors
50 |   - URL state and Search Params handling
51 |   - Improved image optimization
52 |   - Enhanced WebAssembly support
53 | - Implement proper SEO practices with Next.js's metadata API
54 | - Use dynamic imports for code splitting when appropriate
55 | - Implement proper authentication and authorization
56 | - Use environment variables for configuration
57 |
58 | ## Next.js v15+ Patterns
59 |
60 | - App directory structure:
61 |   - layout.tsx for shared UI
62 |   - page.tsx for route-specific UI
63 |   - loading.tsx for loading state
64 |   - error.tsx for error handling
65 |   - not-found.tsx for 404 pages
66 |   - Use route groups (folders with parentheses) for logical organization
67 |   - Use parallel routes for complex layouts
68 |   - Use intercepting routes for modal patterns
69 | - Route handlers:
70 |   - Implement in app/api/route.ts files
71 |   - Use proper HTTP method exports (GET, POST, PUT, PATCH, DELETE)
72 |   - Return proper Response objects
73 |   - Take advantage of Next.js's enhanced middleware capabilities
74 | - Modern data fetching:
75 |   - Use `fetch` with caching options in Server Components
76 |   - Use proper revalidation techniques:
77 |     - Incremental Static Regeneration with revalidate property
78 |     - On-demand revalidation with revalidatePath and revalidateTag
79 |     - Custom tag-based revalidation
80 | - Forms and mutations:
81 |   - Use Server Actions for form submissions
82 |   - Implement proper validation and error handling
83 |   - Take advantage of the useFormState and useFormStatus hooks
84 |   - Implement proper optimistic updates when needed
85 | - Authentication:
86 |   - Implement with NextAuth.js, Auth.js, or similar libraries
87 |   - Use middleware for protecting routes
88 |   - Take advantage of server components for secure auth checks
89 |   - Implement proper session management
90 |
91 | ## Next.js v15+ Component Structure
92 |
93 | - Separate components by responsibility:
94 |   - Page components for routes
95 |   - Layout components for shared UI
96 |   - UI components for reusable UI elements
97 |   - Feature components for specific features
98 | - Use proper component organization:
99 |   - Default to Server Components unless interactivity is needed
100 |   - Use 'use client' directive for Client Components
101 |   - Keep Client Components lean and focused on interactivity
102 |   - Use proper component composition for mixing Server and Client Components
103 | - Use proper naming conventions:
104 |   - PascalCase for components
105 |   - camelCase for functions and variables
106 |   - kebab-case for CSS class names
107 | - Implement proper prop validation with TypeScript
108 | - Use proper folder structure:
109 |   - app/ for routes and layouts
110 |   - components/ for shared components
111 |   - lib/ for utility functions
112 |   - hooks/ for custom hooks
113 |   - types/ for TypeScript types
114 |   - styles/ for global styles
115 |   - routes organized by feature or domain
```

.cursor/rules/performance.mdc

```
1 | ---
2 | description: Performance optimization specific rules for Next.js v15+
3 | globs: **/*
4 | alwaysApply: false
5 | ---
6 |
7 | You are a performance optimization expert specializing in Next.js v15+ applications.
8 |
9 | ## Performance Best Practices
10 |
11 | - Optimize Core Web Vitals:
12 |   - Improve Largest Contentful Paint (LCP)
13 |   - Minimize Cumulative Layout Shift (CLS)
14 |   - Improve First Input Delay (FID) / Interaction to Next Paint (INP)
15 |   - Optimize Time to First Byte (TTFB)
16 | - Leverage Next.js v15+ performance features:
17 |   - Use Partial Prerendering (PPR) for hybrid static/dynamic content
18 |   - Take advantage of automatic static optimization
19 |   - Use the improved router prefetching
20 |   - Leverage selective hydration capabilities
21 |   - Use the optimized React Server Components payload
22 | - Implement proper code splitting:
23 |   - Use dynamic imports for large components
24 |   - Use Next.js's automatic code splitting
25 |   - Use proper bundling strategies
26 |   - Lazy load components when appropriate
27 | - Optimize images:
28 |   - Use Next.js enhanced Image component
29 |   - Use proper image formats (WebP, AVIF)
30 |   - Use responsive images with proper sizes attribute
31 |   - Implement proper lazy loading
32 |   - Optimize image quality and size
33 |   - Take advantage of improved image optimization in v15+
34 | - Optimize JavaScript:
35 |   - Minimize bundle size
36 |   - Remove unused code with tree shaking
37 |   - Use proper dependencies and avoid bloat
38 |   - Use proper polyfills
39 |   - Implement proper code splitting
40 |   - Take advantage of improved bundling in v15+
41 | - Optimize CSS:
42 |   - Minimize CSS size
43 |   - Use proper CSS-in-JS solutions
44 |   - Implement proper CSS code splitting
45 |   - Remove unused CSS
46 |   - Use appropriate CSS methodologies
47 |   - Use the new CSS improvements in v15+
48 | - Implement proper caching strategies:
49 |   - Use proper HTTP caching headers
50 |   - Use proper browser caching
51 |   - Use CDN for static assets
52 |   - Implement proper data caching with new fetch cache options
53 |   - Use the improved cache invalidation strategies in v15+
54 |   - Use proper service worker strategies
55 | - Optimize fonts:
56 |   - Use system fonts when possible
57 |   - Use proper font loading strategies with next/font
58 |   - Minimize font files
59 |   - Use variable fonts when appropriate
60 |   - Implement font subsetting
61 |   - Take advantage of improved font optimization in v15+
62 | - Use proper state management:
63 |   - Minimize unnecessary re-renders
64 |   - Use proper memoization (useMemo, useCallback)
65 |   - Use proper state management libraries
66 |   - Implement proper data fetching strategies
67 |   - Take advantage of React's automatic memo in Server Components
68 |
69 | ## Next.js v15+ Performance Optimization
70 |
71 | - Use the App Router effectively:
72 |   - Leverage React Server Components for improved performance
73 |   - Implement proper streaming and suspense for faster time-to-first-byte
74 |   - Use proper data fetching strategies with improved caching
75 |   - Implement proper routing patterns
76 |   - Take advantage of parallel routes for complex UIs
77 | - Implement proper rendering strategies:
78 |   - Use static rendering for static content (default in App Router)
79 |   - Use dynamic rendering for highly dynamic content
80 |   - Use Partial Prerendering (PPR) for hybrid approaches
81 |   - Use streaming for progressive loading
82 |   - Use client-side rendering (CSR) only when necessary
83 | - Optimize data fetching:
84 |   - Implement proper fetch caching with Next.js v15+ options
85 |   - Use the improved revalidation strategies:
86 |     - Time-based revalidation
87 |     - On-demand revalidation
88 |     - Tag-based revalidation
89 |   - Implement parallel data fetching
90 |   - Use proper SWR or React Query patterns for client-side fetching
91 |   - Take advantage of request memoization
92 | - Implement proper prefetching:
93 |   - Use Next.js v15+ improved Link prefetching
94 |   - Implement proper data prefetching strategies
95 |   - Use proper resource hints
96 |   - Preload critical assets
97 | - Configure proper build optimizations:
98 |   - Enable proper build-time optimizations
99 |   - Use proper bundling strategies
100 |   - Enable proper tree shaking
101 |   - Use proper dependency optimization
102 |   - Take advantage of improved build output in v15+
103 | - Implement proper deployment strategies:
104 |   - Use proper CDN configuration
105 |   - Implement proper edge caching
106 |   - Use proper serverless deployment
107 |   - Implement proper scaling strategies
108 |   - Take advantage of Vercel's Edge Runtime or similar edge capabilities
109 |
110 | ## Performance Monitoring and Analysis
111 |
112 | - Use proper performance monitoring tools:
113 |   - Lighthouse
114 |   - Web Vitals
115 |   - Chrome DevTools Performance tab
116 |   - Next.js Analytics
117 |   - Vercel Analytics
118 |   - Use the improved Next.js performance metrics
119 | - Analyze performance metrics:
120 |   - Core Web Vitals
121 |   - Time to Interactive (TTI)
122 |   - First Contentful Paint (FCP)
123 |   - Total Blocking Time (TBT)
124 |   - Speed Index
125 |   - Server Timing metrics
126 | - Implement proper performance budgets:
127 |   - Set JavaScript budget
128 |   - Set CSS budget
129 |   - Set image budget
130 |   - Set font budget
131 |   - Set third-party script budget
132 |   - Use the improved budget tracking in Next.js
133 | - Implement proper performance testing:
134 |   - Test on multiple devices
135 |   - Test on multiple networks
136 |   - Test on multiple browsers
137 |   - Test real-world scenarios
138 |   - Use proper performance testing tools
```

.cursor/rules/react.mdc

```
1 | ---
2 | description: React specific rules
3 | globs: **/*
4 | alwaysApply: false
5 | ---
6 |
7 | You are a React expert specializing in modern React development with hooks and functional components.
8 |
9 | ## React Best Practices
10 |
11 | - Use functional components instead of class components
12 | - Use React hooks effectively:
13 |   - useState for local component state
14 |   - useEffect for side effects
15 |   - useContext for context consumption
16 |   - useReducer for complex state logic
17 |   - useMemo for expensive calculations
18 |   - useCallback for memoized callbacks
19 |   - useRef for persistent mutable values
20 |   - Custom hooks for reusable logic
21 | - Implement proper component composition
22 | - Keep components small and focused on a single responsibility
23 | - Implement proper prop validation with TypeScript or PropTypes
24 | - Use the React Developer Tools for debugging
25 | - Avoid unnecessary re-renders:
26 |   - Use React.memo for pure functional components
27 |   - Use useMemo and useCallback to prevent recreation of objects and functions
28 |   - Be mindful of dependency arrays in hooks
29 | - Implement proper error boundaries
30 | - Use keys appropriately in lists
31 | - Use fragment (<></>) instead of unnecessary divs
32 | - Handle component lifecycle properly with useEffect cleanup
33 | - Implement proper event handling:
34 |   - Use appropriate event handler naming (handleClick, handleSubmit)
35 |   - Debounce or throttle events when appropriate
36 | - Follow React's unidirectional data flow
37 | - Implement proper forms and controlled components
38 | - Use the Context API for global state when appropriate
39 | - Use proper state management tools for complex applications (Redux, Zustand, Jotai, etc.)
40 |
41 | ## React Component Structure
42 |
43 | - Use proper file organization:
44 |   - One component per file
45 |   - Group related components in folders
46 |   - Group components by feature or page
47 | - Follow naming conventions:
48 |   - PascalCase for component names
49 |   - camelCase for props, state, and event handlers
50 | - Use JSX best practices:
51 |   - Use self-closing tags for elements without children
52 |   - Use curly braces for dynamic content
53 |   - Use conditional rendering appropriately
54 |   - Destructure props
55 | - Implement proper prop interfaces or types with TypeScript
56 | - Use default props and fallback values where appropriate
57 | - Use proper styling approaches:
58 |   - CSS Modules
59 |   - Styled Components
60 |   - Tailwind CSS
61 |   - CSS-in-JS libraries
62 | - Extract reusable code into custom hooks
63 | - Implement proper accessibility (a11y) features:
64 |   - Use semantic HTML elements
65 |   - Implement proper ARIA attributes
66 |   - Ensure keyboard navigation works
67 |   - Ensure proper color contrast
68 | - Implement proper internationalization (i18n) when needed
69 |
70 | ## React Testing Best Practices
71 |
72 | - Use React Testing Library for component testing
73 | - Test component behavior, not implementation details
74 | - Write user-centric tests
75 | - Test both happy paths and edge cases
76 | - Mock external dependencies appropriately
77 | - Test asynchronous behavior properly
78 | - Use proper testing utilities and matchers
79 | - Test accessibility features
80 | - Test responsive behavior when appropriate
81 | - Use proper testing patterns:
82 |   - Arrange-Act-Assert (AAA)
83 |   - Given-When-Then (BDD style)
```

.cursor/rules/shadcn.mdc

````
1 | # shadcn/ui Guidelines
2 |
3 | You are a UI implementation expert for Next.js applications using shadcn/ui component patterns.
4 |
5 | ## Overview
6 |
7 | This project uses shadcn/ui component patterns without direct installation of the shadcn CLI or component library. Instead, we:
8 |
9 | 1. Follow shadcn/ui design principles and patterns
10 | 2. Manually implement components following shadcn structure
11 | 3. Use the existing CSS variables system for theming
12 |
13 | ## Component Structure
14 |
15 | When creating shadcn-style components:
16 |
17 | 1. Use a modular, composable approach where components are broken down into reusable parts
18 | 2. Follow the `ui/` directory structure
19 | 3. Use the `cn()` utility for merging classNames
20 | 4. Implement Radix UI patterns for accessibility (without the actual dependency)
21 |
22 | ## Implementation Strategy
23 |
24 | For each shadcn component to be replicated:
25 |
26 | 1. Create a dedicated component file in `src/components/ui/` directory
27 | 2. Ensure components support the theme system using semantic color tokens
28 | 3. Implement proper keyboard navigation and accessibility features
29 | 4. Maintain consistent styling across components
30 |
31 | ## Component Variants
32 |
33 | Use a consistent approach to component variants:
34 |
35 | ```tsx
36 | // Button component example
37 | const buttonVariants = cva(
38 |   "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
39 |   {
40 |     variants: {
41 |       variant: {
42 |         default: "bg-primary text-primary-foreground hover:bg-primary/90",
43 |         destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
44 |         outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
45 |         secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
46 |         ghost: "hover:bg-accent hover:text-accent-foreground",
47 |         link: "text-primary underline-offset-4 hover:underline",
48 |       },
49 |       size: {
50 |         default: "h-10 px-4 py-2",
51 |         sm: "h-9 rounded-md px-3",
52 |         lg: "h-11 rounded-md px-8",
53 |         icon: "h-10 w-10",
54 |       },
55 |     },
56 |     defaultVariants: {
57 |       variant: "default",
58 |       size: "default",
59 |     },
60 |   }
61 | );
62 | ```
63 |
64 | ## Common Utilities
65 |
66 | Implement these utilities to support shadcn-style components:
67 |
68 | 1. **`cn` utility** for merging classNames with Tailwind:
69 |
70 | ```tsx
71 | import { twMerge } from "tailwind-merge";
72 | import { clsx, type ClassValue } from "clsx";
73 |
74 | export function cn(...inputs: ClassValue[]) {
75 |   return twMerge(clsx(inputs));
76 | }
77 | ```
78 |
79 | 2. **Component structure** following this pattern:
80 |
81 | ```tsx
82 | import * as React from "react";
83 | import { cn } from "@/lib/utils";
84 |
85 | interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
86 |   variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
87 |   size?: "default" | "sm" | "lg" | "icon";
88 | }
89 |
90 | const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
91 |   ({ className, variant = "default", size = "default", ...props }, ref) => {
92 |     return (
93 |       <button
94 |         className={cn(buttonVariants({ variant, size, className }))}
95 |         ref={ref}
96 |         {...props}
97 |       />
98 |     );
99 |   }
100 | );
101 | Button.displayName = "Button";
102 |
103 | export { Button, buttonVariants };
104 | ```
105 |
106 | ## Best Practices
107 |
108 | 1. Always use semantic HTML elements
109 | 2. Implement proper ARIA attributes
110 | 3. Support keyboard navigation
111 | 4. Ensure components work with both light and dark themes
112 | 5. Maintain consistent spacing and sizing
113 | 6. Forward refs for all interactive components
114 | 7. Provide clear displayName for debugging
115 |
116 | ## Theme Integration
117 |
118 | Ensure all components respect the theme system:
119 |
120 | 1. Use semantic color tokens (`bg-primary`, `text-foreground`, etc.)
121 | 2. Respect dark mode with proper color transitions
122 | 3. Use CSS variables for themeable properties
123 |
124 | ## Form Components
125 |
126 | For form components, follow these guidelines:
127 |
128 | 1. Implement proper form validation states
129 | 2. Provide visual feedback for errors
130 | 3. Support disabled states
131 | 4. Include proper labeling
132 | 5. Use consistent styling across all form elements
133 |
134 | ## Implementation without Dependencies
135 |
136 | Since we're implementing without direct dependencies:
137 |
138 | 1. Manually create component files in the appropriate directory structure
139 | 2. Implement accessible patterns even without Radix UI
140 | 3. Use React's built-in capabilities for state management
141 | 4. Progressively enhance components as needed
````

.cursor/rules/tailwind.mdc

````
1 | ---
2 | description: Tailwind CSS v4 specific rules
3 | globs: **/*
4 | alwaysApply: false
5 | ---
6 |
7 | You are a Tailwind CSS v4 expert with deep knowledge of utility-first CSS and modern design systems.
8 |
9 | ## Tailwind CSS v4 Core Changes
10 |
11 | - **CSS-first configuration**: Configuration is now done in CSS instead of JavaScript
12 |   - Use `@theme` directive in CSS instead of `tailwind.config.js`
13 |   - Example:
14 |     ```css
15 |     @import "tailwindcss";
16 |
17 |     @theme {
18 |       --font-display: "Satoshi", "sans-serif";
19 |       --breakpoint-3xl: 1920px;
20 |       --color-avocado-500: oklch(0.84 0.18 117.33);
21 |       --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
22 |     }
23 |     ```
24 | - Legacy `tailwind.config.js` files can still be imported using the `@config` directive:
25 |   ```css
26 |   @import "tailwindcss";
27 |   @config "../../tailwind.config.js";
28 |   ```
29 | - **CSS import syntax**: Use `@import "tailwindcss"` instead of `@tailwind` directives
30 |   - Old: `@tailwind base; @tailwind components; @tailwind utilities;`
31 |   - New: `@import "tailwindcss";`
32 |
33 | - **Package changes**:
34 |   - PostCSS plugin is now `@tailwindcss/postcss` (not `tailwindcss`)
35 |   - CLI is now `@tailwindcss/cli`
36 |   - Vite plugin is `@tailwindcss/vite`
37 |   - No need for `postcss-import` or `autoprefixer` anymore
38 |
39 | - **Native CSS cascade layers**: Uses real CSS `@layer` instead of Tailwind's custom implementation
40 |
41 | ## Tailwind CSS v4 Theme Configuration
42 |
43 | - **CSS theme variables**: All design tokens are available as CSS variables
44 |   - Namespace format: `--category-name` (e.g., `--color-blue-500`, `--font-sans`)
45 |   - Access in CSS: `var(--color-blue-500)`
46 |   - Available namespaces:
47 |     - `--color-*` : Color utilities like `bg-red-500` and `text-sky-300`
48 |     - `--font-*` : Font family utilities like `font-sans`
49 |     - `--text-*` : Font size utilities like `text-xl`
50 |     - `--font-weight-*` : Font weight utilities like `font-bold`
51 |     - `--tracking-*` : Letter spacing utilities like `tracking-wide`
52 |     - `--leading-*` : Line height utilities like `leading-tight`
53 |     - `--breakpoint-*` : Responsive breakpoint variants like `sm:*`
54 |     - `--container-*` : Container query variants like `@sm:*` and size utilities like `max-w-md`
55 |     - `--spacing-*` : Spacing and sizing utilities like `px-4` and `max-h-16`
56 |     - `--radius-*` : Border radius utilities like `rounded-sm`
57 |     - `--shadow-*` : Box shadow utilities like `shadow-md`
58 |     - `--inset-shadow-*` : Inset box shadow utilities like `inset-shadow-xs`
59 |     - `--drop-shadow-*` : Drop shadow filter utilities like `drop-shadow-md`
60 |     - `--blur-*` : Blur filter utilities like `blur-md`
61 |     - `--perspective-*` : Perspective utilities like `perspective-near`
62 |     - `--aspect-*` : Aspect ratio utilities like `aspect-video`
63 |     - `--ease-*` : Transition timing function utilities like `ease-out`
64 |     - `--animate-*` : Animation utilities like `animate-spin`
65 |
66 | - **Simplified theme configuration**: Many utilities no longer need theme configuration
67 |   - Utilities like `grid-cols-12`, `z-40`, and `opacity-70` work without configuration
68 |   - Data attributes like `data-selected:opacity-100` don't need configuration
69 |
70 | - **Dynamic spacing scale**: Derived from a single spacing value
71 |   - Default: `--spacing: 0.25rem`
72 |   - Every multiple of the base value is available (e.g., `mt-21` works automatically)
73 |
74 | - **Overriding theme namespaces**:
75 |   - Override entire namespace: `--font-*: initial;`
76 |   - Override entire theme: `--*: initial;`
77 |
78 | ## Tailwind CSS v4 New Features
79 |
80 | - **Container query support**: Built-in now, no plugin needed
81 |   - `@container` for container context
82 |   - `@sm:`, `@md:`, etc. for container-based breakpoints
83 |   - `@max-md:` for max-width container queries
84 |   - Combine with `@min-md:@max-xl:hidden` for ranges
85 |
86 | - **3D transforms**:
87 |   - `transform-3d` enables 3D transforms
88 |   - `rotate-x-*`, `rotate-y-*`, `rotate-z-*` for 3D rotation
89 |   - `scale-z-*` for z-axis scaling
90 |   - `translate-z-*` for z-axis translation
91 |   - `perspective-*` utilities (`perspective-near`, `perspective-distant`, etc.)
92 |   - `perspective-origin-*` utilities
93 |   - `backface-visible` and `backface-hidden`
94 |
95 | - **Gradient enhancements**:
96 |   - Linear gradient angles: `bg-linear-45` (renamed from `bg-gradient-*`)
97 |   - Gradient interpolation: `bg-linear-to-r/oklch`, `bg-linear-to-r/srgb`
98 |   - Conic and radial gradients: `bg-conic`, `bg-radial-[at_25%_25%]`
99 |
100 | - **Shadow enhancements**:
101 |   - `inset-shadow-*` and `inset-ring-*` utilities
102 |   - Can be composed with regular `shadow-*` and `ring-*`
103 |
104 | - **New CSS property utilities**:
105 |   - `field-sizing-content` for auto-resizing textareas
106 |   - `scheme-light`, `scheme-dark` for `color-scheme` property
107 |   - `font-stretch-*` utilities for variable fonts
108 |
109 | ## Tailwind CSS v4 New Variants
110 |
111 | - **Composable variants**: Chain variants together
112 |   - Example: `group-has-data-potato:opacity-100`
113 |
114 | - **New variants**:
115 |   - `starting` variant for `@starting-style` transitions
116 |   - `not-*` variant for `:not()` pseudo-class
117 |   - `inert` variant for `inert` attribute
118 |   - `nth-*` variants (`nth-3:`, `nth-last-5:`, `nth-of-type-4:`, `nth-last-of-type-6:`)
119 |   - `in-*` variant (like `group-*` but without adding `group` class)
120 |   - `open` variant now supports `:popover-open`
121 |   - `**` variant for targeting all descendants
122 |
123 | ## Tailwind CSS v4 Custom Extensions
124 |
125 | - **Custom utilities**: Use `@utility` directive
126 |   ```css
127 |   @utility tab-4 {
128 |     tab-size: 4;
129 |   }
130 |   ```
131 |
132 | - **Custom variants**: Use `@variant` directive
133 |   ```css
134 |   @variant pointer-coarse (@media (pointer: coarse));
135 |   @variant theme-midnight (&:where([data-theme="midnight"] *));
136 |   ```
137 |
138 | - **Plugins**: Use `@plugin` directive
139 |   ```css
140 |   @plugin "@tailwindcss/typography";
141 |   ```
142 |
143 | ## Tailwind CSS v4 Breaking Changes
144 |
145 | - **Removed deprecated utilities**:
146 |   - `bg-opacity-*` → Use `bg-black/50` instead
147 |   - `text-opacity-*` → Use `text-black/50` instead
148 |   - And others: `border-opacity-*`, `divide-opacity-*`, etc.
149 |
150 | - **Renamed utilities**:
151 |   - `shadow-sm` → `shadow-xs` (and `shadow` → `shadow-sm`)
152 |   - `drop-shadow-sm` → `drop-shadow-xs` (and `drop-shadow` → `drop-shadow-sm`)
153 |   - `blur-sm` → `blur-xs` (and `blur` → `blur-sm`)
154 |   - `rounded-sm` → `rounded-xs` (and `rounded` → `rounded-sm`)
155 |   - `outline-none` → `outline-hidden` (for the old behavior)
156 |
157 | - **Default style changes**:
158 |   - Default border color is now `currentColor` (was `gray-200`)
159 |   - Default `ring` width is now 1px (was 3px)
160 |   - Placeholder text now uses current color at 50% opacity (was `gray-400`)
161 |   - Hover styles only apply on devices that support hover (`@media (hover: hover)`)
162 |
163 | - **Syntax changes**:
164 |   - CSS variables in arbitrary values: `bg-(--brand-color)` instead of `bg-[--brand-color]`
165 |   - Stacked variants now apply left-to-right (not right-to-left)
166 |   - Use CSS variables instead of `theme()` function
167 |
168 | ## Tailwind CSS v4 Advanced Configuration
169 |
170 | - **Using a prefix**:
171 |   ```css
172 |   @import "tailwindcss" prefix(tw);
173 |   ```
174 |   - Results in classes like `tw:flex`, `tw:bg-red-500`, `tw:hover:bg-red-600`
175 |
176 | - **Source detection**:
177 |   - Automatic by default (ignores `.gitignore` files and binary files)
178 |   - Add sources: `@source "../node_modules/@my-company/ui-lib";`
179 |   - Disable automatic detection: `@import "tailwindcss" source(none);`
180 |
181 | - **Legacy config files**:
182 |   ```css
183 |   @import "tailwindcss";
184 |   @config "../../tailwind.config.js";
185 |   ```
186 |
187 | - **Dark mode configuration**:
188 |   ```css
189 |   @import "tailwindcss";
190 |   @variant dark (&:where(.dark, .dark *));
191 |   ```
192 |
193 | - **Container customization**: Extend with `@utility`
194 |   ```css
195 |   @utility container {
196 |     margin-inline: auto;
197 |     padding-inline: 2rem;
198 |   }
199 |   ```
200 |
201 | - **Using `@apply` in Vue/Svelte**:
202 |   ```html
203 |   <style>
204 |     @import "../../my-theme.css" theme(reference);
205 |     /* or */
206 |     @import "tailwindcss/theme" theme(reference);
207 |
208 |     h1 {
209 |       @apply font-bold text-2xl text-red-500;
210 |     }
211 |   </style>
212 |   ```
213 |
214 | ## Tailwind CSS Best Practices
215 |
216 | - Use Tailwind's utility classes effectively:
217 |   - Understand the utility-first CSS approach
218 |   - Leverage the full range of available utilities
219 |   - Use responsive variants (sm:, md:, lg:, xl:, 2xl:)
220 |   - Use container query variants (@sm:, @md:, etc.)
221 |   - Use state variants (hover:, focus:, active:, etc.)
222 |   - Use dark mode variants (dark:)
223 |   - Use group, peer, and the new in-* modifiers for relationships
224 | - Use proper class organization:
225 |   - Group related utilities together
226 |   - Follow a consistent order for utilities
227 |   - Use appropriate spacing and layout utilities first
228 |   - Follow with typography, backgrounds, borders, etc.
229 | - Use proper responsive design:
230 |   - Design mobile-first
231 |   - Use appropriate breakpoints
232 |   - Use the new built-in container queries
233 |   - Test across multiple device sizes
234 | - Use Tailwind's CSS-first configuration effectively:
235 |   - Use @theme directive for custom values
236 |   - Create custom utilities with @utility
237 |   - Create custom variants with @variant
238 |   - Use proper color palette with OKLCH color space
239 | - Implement proper design systems:
240 |   - Create consistent components
241 |   - Maintain consistent spacing
242 |   - Use a coherent color scheme
243 |   - Maintain consistent typography
244 | - Use Tailwind's plugins appropriately:
245 |   - Use @plugin directive to import plugins
246 |   - Typography plugin for rich text
247 |   - Forms plugin for form elements
248 | - Optimize for production:
249 |   - Configure proper source detection
250 |   - Use appropriate content configuration
251 |   - Minimize unused utilities
252 |
253 | ## Tailwind CSS and Accessibility
254 |
255 | - Ensure proper color contrast
256 | - Use semantic HTML elements
257 | - Implement proper focus styles
258 | - Ensure proper text sizing
259 | - Implement proper spacing for readability
260 | - Use proper ARIA attributes with Tailwind classes
261 | - Test with screen readers and keyboard navigation
262 |
263 | ## Tailwind CSS and JavaScript Frameworks
264 |
265 | - Properly integrate Tailwind v4 with React/Next.js:
266 |   - Use className prop effectively
267 |   - Create properly typed utility components
268 |   - Use proper conditional classes
269 |   - Use libraries like clsx or tailwind-merge for class merging
270 | - Use proper state management with Tailwind classes:
271 |   - Conditionally apply classes based on state
272 |   - Use dynamic class generation when appropriate
273 |   - Properly handle class transitions and animations
274 |   - Use the new composable variants for complex state relationships
````

.cursor/rules/testing.mdc

```
1 | ---
2 | description: Testing specific rules for Next.js v15+
3 | globs: **/*
4 | alwaysApply: false
5 | ---
6 |
7 | You are a testing expert specializing in testing Next.js v15+ applications with Jest, React Testing Library, and Playwright/Cypress.
8 |
9 | ## Testing Best Practices
10 |
11 | - Follow the testing pyramid:
12 |   - Unit tests for individual functions and components
13 |   - Integration tests for component interactions
14 |   - End-to-end tests for critical user flows
15 | - Write maintainable tests:
16 |   - Follow the Arrange-Act-Assert (AAA) pattern
17 |   - Keep tests independent and isolated
18 |   - Mock external dependencies appropriately
19 |   - Use proper test doubles (spies, stubs, mocks)
20 |   - Use descriptive test names
21 | - Test behavior, not implementation:
22 |   - Focus on what the code does, not how it does it
23 |   - Avoid testing implementation details
24 |   - Test from the user's perspective when possible
25 | - Write comprehensive tests:
26 |   - Test happy paths
27 |   - Test edge cases
28 |   - Test error scenarios
29 |   - Test boundary conditions
30 | - Maintain high test quality:
31 |   - Avoid flaky tests
32 |   - Ensure tests are repeatable
33 |   - Keep tests fast
34 |   - Use proper assertions
35 |   - Use proper test isolation
36 | - Use proper test organization:
37 |   - Group related tests together
38 |   - Use proper describe and test blocks
39 |   - Use proper beforeEach/afterEach hooks
40 |   - Use proper beforeAll/afterAll hooks
41 |
42 | ## React Testing Best Practices for Next.js v15+
43 |
44 | - Use React Testing Library effectively:
45 |   - Focus on user interactions, not component internals
46 |   - Use proper queries (getBy, findBy, queryBy)
47 |   - Use proper user-event for simulating user interactions
48 |   - Test accessibility features
49 |   - Test component props and state effects
50 | - Test React Server Components properly:
51 |   - Use Jest with experimental RSC testing support
52 |   - Test rendering output
53 |   - Test data fetching capabilities
54 |   - Mock server-side resources
55 | - Test Client Components:
56 |   - Use 'use client' directive properly in test environment
57 |   - Test rendering and interactivity
58 |   - Test state management
59 |   - Test effect hooks
60 | - Test component interactions:
61 |   - Test form submissions with Server Actions
62 |   - Test button clicks
63 |   - Test user input
64 |   - Test keyboard interactions
65 | - Test hooks and custom hooks:
66 |   - Use proper hook testing utilities
67 |   - Test hook behavior, not implementation
68 |   - Test hook side effects
69 |   - Test hook error handling
70 |
71 | ## Next.js v15+ Testing Best Practices
72 |
73 | - Test App Router components:
74 |   - Test layout components
75 |   - Test page components
76 |   - Test loading states with Suspense
77 |   - Test error boundaries with error.tsx
78 |   - Test not-found handling
79 |   - Test parallel routes
80 |   - Test intercepting routes
81 | - Test data fetching:
82 |   - Test fetch calls in Server Components
83 |   - Test fetch caching behaviors
84 |   - Test revalidation strategies
85 |   - Test client-side data fetching with SWR/React Query
86 | - Test Route Handlers:
87 |   - Test request handling
88 |   - Test response formatting
89 |   - Test error handling
90 |   - Test authentication and authorization
91 |   - Test proper caching behaviors
92 | - Test Server Actions:
93 |   - Test form submissions
94 |   - Test data mutations
95 |   - Test validation logic
96 |   - Test error handling
97 |   - Test optimistic updates
98 | - Use proper mocking strategies:
99 |   - Mock Next.js modules (next/navigation, next/image, etc.)
100 |   - Mock API responses
101 |   - Mock server-side data fetching
102 |   - Mock authentication
103 |   - Use proper dependency injection for testability
104 |
105 | ## End-to-End Testing for Next.js v15+
106 |
107 | - Use Playwright or Cypress effectively:
108 |   - Test critical user flows
109 |   - Test authentication flows
110 |   - Test form submissions with Server Actions
111 |   - Test navigation with the App Router
112 |   - Test error handling
113 |   - Test responsive behavior
114 | - Test Next.js v15+ specific features:
115 |   - Test Partial Prerendering behavior
116 |   - Test streaming and progressive rendering
117 |   - Test parallel routes
118 |   - Test route interception
119 | - Write robust E2E tests:
120 |   - Use proper selectors
121 |   - Use proper waiting strategies
122 |   - Avoid flaky tests
123 |   - Use proper assertions
124 |   - Use proper test isolation
125 | - Test real-world scenarios:
126 |   - Test on multiple browsers
127 |   - Test responsive behavior
128 |   - Test accessibility
129 |   - Test performance when appropriate
130 |   - Test with different device types
```

.cursor/rules/typescript.mdc

```
1 | ---
2 | description: TypeScript specific rules
3 | globs: **/*
4 | alwaysApply: false
5 | ---
6 |
7 | You are a TypeScript expert with deep knowledge of type systems and modern TypeScript features.
8 |
9 | ## TypeScript Best Practices
10 |
11 | - Use TypeScript's type system effectively:
12 |   - Define interfaces and types for all data structures
13 |   - Use union types for variables that can be of multiple types
14 |   - Use intersection types to combine types
15 |   - Use generic types for reusable components and functions
16 |   - Use type guards to narrow types
17 |   - Use utility types (Partial, Omit, Pick, etc.)
18 |   - Use mapped types for transforming existing types
19 |   - Use conditional types for advanced type logic
20 | - Use proper type annotations:
21 |   - Explicit return types for functions
22 |   - Proper parameter types
23 |   - Descriptive interface and type names
24 |   - Proper generics constraints
25 | - Avoid using `any` type:
26 |   - Use `unknown` for truly unknown types
27 |   - Use `never` for impossible types
28 |   - Use proper type narrowing techniques
29 | - Use const assertions for literal types
30 | - Use TypeScript's strict mode
31 | - Use readonly for immutable properties
32 | - Use proper null checking:
33 |   - Use optional chaining (?.) for potentially null/undefined values
34 |   - Use nullish coalescing (??) for fallback values
35 | - Use proper error handling with typed errors
36 | - Use proper async/await with proper typings
37 | - Use TypeScript's module system properly:
38 |   - Use ES modules
39 |   - Use proper import/export syntax
40 |   - Use proper type imports/exports
41 | - Use proper TypeScript configuration:
42 |   - Appropriate tsconfig.json settings
43 |   - Strict type checking
44 |   - Proper lib configurations
45 |   - Proper module resolution
46 |
47 | ## TypeScript Code Structure
48 |
49 | - Use proper file organization:
50 |   - Separate types into dedicated type files when appropriate
51 |   - Use barrel exports for related types
52 |   - Group types by domain or feature
53 | - Follow naming conventions:
54 |   - PascalCase for interfaces, types, enums, and classes
55 |   - camelCase for variables, functions, and properties
56 |   - Use descriptive names that indicate the purpose
57 | - Use proper type definitions:
58 |   - Define reusable types for common structures
59 |   - Use type aliases for complex types
60 |   - Use interfaces for object shapes
61 |   - Use enums for fixed sets of values
62 | - Implement proper type guards:
63 |   - Use instanceof for classes
64 |   - Use typeof for primitives
65 |   - Use custom type predicates (is operators)
66 |   - Use in operator for property checks
67 | - Use proper typings for React components:
68 |   - Define prop interfaces or types
69 |   - Use proper event types
70 |   - Use proper state types
71 |   - Use proper ref types
72 |
73 | ## TypeScript Documentation
74 |
75 | - Use JSDoc comments for functions, interfaces, and types:
76 |   - Document parameters with @param
77 |   - Document return values with @returns
78 |   - Document exceptions with @throws
79 |   - Document examples with @example
80 |   - Use proper descriptions for all documented entities
81 | - Document complex type logic
82 | - Use TypeScript-specific JSDoc tags:
83 |   - @template for generics
84 |   - @typeParam for generic type parameters
85 | - Keep documentation up to date with code changes
```

src/components/theme-provider.tsx

```
1 | 'use client';
2 |
3 | import { ThemeProvider as NextThemesProvider } from 'next-themes';
4 | import * as React from 'react';
5 |
6 | export function ThemeProvider({
7 |   children,
8 |   ...props
9 | }: React.ComponentProps<typeof NextThemesProvider>) {
10 |   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
11 | }
```

src/components/theme-toggle.tsx

```
1 | 'use client';
2 |
3 | import { useTheme } from 'next-themes';
4 | import { useEffect, useState } from 'react';
5 | import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
6 |
7 | import { cn } from '@/lib/utils';
8 |
9 | type ThemeOption = 'light' | 'dark' | 'system';
10 |
11 | interface ThemeButtonProps {
12 |   theme: string | undefined;
13 |   value: ThemeOption;
14 |   icon: React.ElementType;
15 |   label: string;
16 |   onClick: (theme: ThemeOption) => void;
17 | }
18 |
19 | function ThemeButton({ theme, value, icon: Icon, label, onClick }: ThemeButtonProps) {
20 |   const isActive = theme === value;
21 |
22 |   return (
23 |     <button
24 |       onClick={() => onClick(value)}
25 |       className="h-10 w-10 flex items-center justify-center rounded-none cursor-pointer text-foreground"
26 |       aria-label={label}
27 |       aria-pressed={isActive}
28 |       data-state={isActive ? 'active' : 'inactive'}
29 |     >
30 |       <Icon className="h-4 w-4" />
31 |     </button>
32 |   );
33 | }
34 |
35 | export function ThemeToggle({ className }: { className?: string }) {
36 |   const { theme, setTheme } = useTheme();
37 |   const [mounted, setMounted] = useState(false);
38 |
39 |   // Only render theme toggle on client to avoid hydration mismatch
40 |   useEffect(() => {
41 |     setMounted(true);
42 |   }, []);
43 |
44 |   const handleThemeChange = (newTheme: ThemeOption) => {
45 |     setTheme(newTheme);
46 |   };
47 |
48 |   const themeOptions: Array<{
49 |     value: ThemeOption;
50 |     icon: React.ElementType;
51 |     label: string;
52 |   }> = [
53 |     { value: 'light', icon: FiSun, label: 'Light mode' },
54 |     { value: 'dark', icon: FiMoon, label: 'Dark mode' },
55 |     { value: 'system', icon: FiMonitor, label: 'System preference' },
56 |   ];
57 |
58 |   // Avoid rendering toggle until client-side to prevent hydration mismatch
59 |   if (!mounted) {
60 |     return <div className="w-[138px] h-[38px]" />; // Placeholder with same size
61 |   }
62 |
63 |   return (
64 |     <div className={cn('relative inline-block text-left', className)}>
65 |       <div
66 |         className="flex items-center border border-border bg-background"
67 |         role="group"
68 |         aria-label="Theme selection"
69 |       >
70 |         {themeOptions.map(option => (
71 |           <ThemeButton
72 |             key={option.value}
73 |             theme={theme}
74 |             value={option.value}
75 |             icon={option.icon}
76 |             label={option.label}
77 |             onClick={handleThemeChange}
78 |           />
79 |         ))}
80 |       </div>
81 |     </div>
82 |   );
83 | }
```

src/app/globals.css

```
1 | @import 'tailwindcss';
2 |
3 | @plugin "tailwindcss-animate";
4 |
5 | @custom-variant dark (&:is(.dark *));
6 |
7 | :root {
8 |   --background: oklch(1 0 0);
9 |   --foreground: oklch(0.145 0 0);
10 |   --card: oklch(1 0 0);
11 |   --card-foreground: oklch(0.145 0 0);
12 |   --popover: oklch(1 0 0);
13 |   --popover-foreground: oklch(0.145 0 0);
14 |   --primary: oklch(0.205 0 0);
15 |   --primary-foreground: oklch(0.985 0 0);
16 |   --secondary: oklch(0.97 0 0);
17 |   --secondary-foreground: oklch(0.205 0 0);
18 |   --muted: oklch(0.97 0 0);
19 |   --muted-foreground: oklch(0.556 0 0);
20 |   --accent: oklch(0.97 0 0);
21 |   --accent-foreground: oklch(0.205 0 0);
22 |   --destructive: oklch(0.577 0.185 27.325);
23 |   --destructive-foreground: oklch(0.577 0.185 27.325);
24 |   --border: oklch(0.922 0 0);
25 |   --input: oklch(0.922 0 0);
26 |   --ring: oklch(0.708 0 0);
27 |   --chart-1: oklch(0.646 0.222 41.116);
28 |   --chart-2: oklch(0.6 0.118 184.704);
29 |   --chart-3: oklch(0.398 0.07 227.392);
30 |   --chart-4: oklch(0.828 0.189 84.429);
31 |   --chart-5: oklch(0.769 0.188 70.08);
32 |   --radius: 0rem;
33 |   --sidebar: oklch(0.985 0 0);
34 |   --sidebar-foreground: oklch(0.145 0 0);
35 |   --sidebar-primary: oklch(0.205 0 0);
36 |   --sidebar-primary-foreground: oklch(0.985 0 0);
37 |   --sidebar-accent: oklch(0.97 0 0);
38 |   --sidebar-accent-foreground: oklch(0.205 0 0);
39 |   --sidebar-border: oklch(0.922 0 0);
40 |   --sidebar-ring: oklch(0.708 0 0);
41 | }
42 |
43 | .dark {
44 |   --background: oklch(0.145 0 0);
45 |   --foreground: oklch(0.985 0 0);
46 |   --card: oklch(0.145 0 0);
47 |   --card-foreground: oklch(0.985 0 0);
48 |   --popover: oklch(0.145 0 0);
49 |   --popover-foreground: oklch(0.985 0 0);
50 |   --primary: oklch(0.985 0 0);
51 |   --primary-foreground: oklch(0.205 0 0);
52 |   --secondary: oklch(0.269 0 0);
53 |   --secondary-foreground: oklch(0.985 0 0);
54 |   --muted: oklch(0.269 0 0);
55 |   --muted-foreground: oklch(0.708 0 0);
56 |   --accent: oklch(0.269 0 0);
57 |   --accent-foreground: oklch(0.985 0 0);
58 |   --destructive: oklch(0.396 0.11 25.723);
59 |   --destructive-foreground: oklch(0.637 0.187 25.331);
60 |   --border: oklch(0.269 0 0);
61 |   --input: oklch(0.269 0 0);
62 |   --ring: oklch(0.556 0 0);
63 |   --chart-1: oklch(0.488 0.243 264.376);
64 |   --chart-2: oklch(0.696 0.17 162.48);
65 |   --chart-3: oklch(0.769 0.188 70.08);
66 |   --chart-4: oklch(0.627 0.265 303.9);
67 |   --chart-5: oklch(0.645 0.246 16.439);
68 |   --sidebar: oklch(0.205 0 0);
69 |   --sidebar-foreground: oklch(0.985 0 0);
70 |   --sidebar-primary: oklch(0.488 0.243 264.376);
71 |   --sidebar-primary-foreground: oklch(0.985 0 0);
72 |   --sidebar-accent: oklch(0.269 0 0);
73 |   --sidebar-accent-foreground: oklch(0.985 0 0);
74 |   --sidebar-border: oklch(0.269 0 0);
75 |   --sidebar-ring: oklch(0.439 0 0);
76 | }
77 |
78 | @theme inline {
79 |   --font-sans: var(--font-sans);
80 |   --font-mono: var(--font-mono);
81 |   --color-background: var(--background);
82 |   --color-foreground: var(--foreground);
83 |   --color-card: var(--card);
84 |   --color-card-foreground: var(--card-foreground);
85 |   --color-popover: var(--popover);
86 |   --color-popover-foreground: var(--popover-foreground);
87 |   --color-primary: var(--primary);
88 |   --color-primary-foreground: var(--primary-foreground);
89 |   --color-secondary: var(--secondary);
90 |   --color-secondary-foreground: var(--secondary-foreground);
91 |   --color-muted: var(--muted);
92 |   --color-muted-foreground: var(--muted-foreground);
93 |   --color-accent: var(--accent);
94 |   --color-accent-foreground: var(--accent-foreground);
95 |   --color-destructive: var(--destructive);
96 |   --color-destructive-foreground: var(--destructive-foreground);
97 |   --color-border: var(--border);
98 |   --color-input: var(--input);
99 |   --color-ring: var(--ring);
100 |   --color-chart-1: var(--chart-1);
101 |   --color-chart-2: var(--chart-2);
102 |   --color-chart-3: var(--chart-3);
103 |   --color-chart-4: var(--chart-4);
104 |   --color-chart-5: var(--chart-5);
105 |   --radius-sm: var(--radius);
106 |   --radius-md: var(--radius);
107 |   --radius-lg: var(--radius);
108 |   --radius-xl: var(--radius);
109 |   --color-sidebar: var(--sidebar);
110 |   --color-sidebar-foreground: var(--sidebar-foreground);
111 |   --color-sidebar-primary: var(--sidebar-primary);
112 |   --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
113 |   --color-sidebar-accent: var(--sidebar-accent);
114 |   --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
115 |   --color-sidebar-border: var(--sidebar-border);
116 |   --color-sidebar-ring: var(--sidebar-ring);
117 |   --animate-accordion-down: accordion-down 0.2s ease-out;
118 |   --animate-accordion-up: accordion-up 0.2s ease-out;
119 |
120 |   @keyframes accordion-down {
121 |     from {
122 |       height: 0;
123 |     }
124 |     to {
125 |       height: var(--radix-accordion-content-height);
126 |     }
127 |   }
128 |
129 |   @keyframes accordion-up {
130 |     from {
131 |       height: var(--radix-accordion-content-height);
132 |     }
133 |     to {
134 |       height: 0;
135 |     }
136 |   }
137 | }
138 |
139 | @layer base {
140 |   * {
141 |     @apply border-border outline-ring/50;
142 |   }
143 |   body {
144 |     @apply bg-background text-foreground;
145 |   }
146 | }
```

src/app/layout.tsx

```
1 | import './globals.css';
2 |
3 | import { Analytics } from '@vercel/analytics/react';
4 | import { Geist, Geist_Mono } from 'next/font/google';
5 | import Link from 'next/link';
6 |
7 | import { ThemeProvider } from '@/components/theme-provider';
8 | import { ThemeToggle } from '@/components/theme-toggle';
9 | import { Button } from '@/components/ui/button';
10 | import { META_THEME_COLORS, siteConfig } from '@/config/site';
11 | import { cn } from '@/lib/utils';
12 |
13 | import type { Metadata, Viewport } from 'next';
14 |
15 | const geistSans = Geist({
16 |   variable: '--font-geist-sans',
17 |   subsets: ['latin'],
18 | });
19 |
20 | const geistMono = Geist_Mono({
21 |   variable: '--font-geist-mono',
22 |   subsets: ['latin'],
23 | });
24 |
25 | export const metadata: Metadata = {
26 |   title: {
27 |     default: siteConfig.name,
28 |     template: `%s - ${siteConfig.name}`,
29 |   },
30 |   metadataBase: new URL(siteConfig.url),
31 |   description: siteConfig.description,
32 |   keywords: ['finance', 'mind', 'Finance Mind', 'Finance Management'],
33 |   authors: [
34 |     {
35 |       name: 'Andre "Dezzy" Victor',
36 |       url: 'https://andredezzy.com',
37 |     },
38 |   ],
39 |   creator: 'andredezzy',
40 |   openGraph: {
41 |     type: 'website',
42 |     locale: 'en_US',
43 |     url: siteConfig.url,
44 |     title: siteConfig.name,
45 |     description: siteConfig.description,
46 |     siteName: siteConfig.name,
47 |     images: [
48 |       {
49 |         url: siteConfig.ogImage,
50 |         width: 1200,
51 |         height: 630,
52 |         alt: siteConfig.name,
53 |       },
54 |     ],
55 |   },
56 |   twitter: {
57 |     card: 'summary_large_image',
58 |     title: siteConfig.name,
59 |     description: siteConfig.description,
60 |     images: [siteConfig.ogImage],
61 |     creator: '@shadcn',
62 |   },
63 |   icons: {
64 |     icon: '/favicon.ico',
65 |     shortcut: '/favicon-16x16.png',
66 |     apple: '/apple-touch-icon.png',
67 |   },
68 |   manifest: `${siteConfig.url}/site.webmanifest`,
69 | };
70 |
71 | export const viewport: Viewport = {
72 |   themeColor: META_THEME_COLORS.light,
73 | };
74 |
75 | export default function RootLayout({
76 |   children,
77 | }: Readonly<{
78 |   children: React.ReactNode;
79 | }>) {
80 |   return (
81 |     <html lang="en" suppressHydrationWarning>
82 |       <head>
83 |         <script
84 |           dangerouslySetInnerHTML={{
85 |             __html: `
86 |           try {
87 |             if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
88 |               document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
89 |             }
90 |           } catch (_) {}
91 |         `,
92 |           }}
93 |         />
94 |       </head>
95 |
96 |       <body
97 |         className={cn(
98 |           `bg-background overscroll-none font-sans antialiased`,
99 |           geistSans.variable,
100 |           geistMono.variable
101 |         )}
102 |       >
103 |         <ThemeProvider
104 |           attribute="class"
105 |           defaultTheme="system"
106 |           enableSystem
107 |           disableTransitionOnChange
108 |         >
109 |           <header className="border-b border-border">
110 |             <div className="container mx-auto px-8 py-12">
111 |               <div className="space-y-6">
112 |                 <div className="flex flex-col md:flex-row justify-between md:items-center items-start gap-8">
113 |                   <div className="mr-8">
114 |                     <h1 className="text-3xl font-bold text-foreground">Finance Mind</h1>
115 |                     <p className="mt-2 text-sm text-muted-foreground">
116 |                       AI-driven finance tracker for intelligent bank statement analysis and insights
117 |                     </p>
118 |                   </div>
119 |
120 |                   <ThemeToggle className="order-first md:order-last" />
121 |                 </div>
122 |
123 |                 <div className="flex gap-3 flex-wrap">
124 |                   <Button variant="secondary" asChild>
125 |                     <Link href="/">Overview</Link>
126 |                   </Button>
127 |
128 |                   <Button variant="secondary" asChild>
129 |                     <Link href="/ai-playground">AI Playground</Link>
130 |                   </Button>
131 |
132 |                   <Button variant="outline" asChild>
133 |                     <Link href="https://andredezzy.com">@andredezzy</Link>
134 |                   </Button>
135 |                 </div>
136 |               </div>
137 |             </div>
138 |           </header>
139 |
140 |           {children}
141 |
142 |           <footer className="border-t border-border mt-12">
143 |             <div className="container mx-auto px-8 py-12">
144 |               <div className="flex flex-col md:flex-row gap-8">
145 |                 <div className="flex-1 pb-6">
146 |                   <div className="flex items-center">
147 |                     <h3 className="text-lg font-semibold text-foreground flex-1">Finance Mind</h3>
148 |                   </div>
149 |
150 |                   <p className="mt-2 text-sm text-muted-foreground">
151 |                     Take control of your financial life with intelligent analytics and insights.
152 |                   </p>
153 |                 </div>
154 |
155 |                 <div className="md:hidden">
156 |                   <h4 className="text-sm font-medium text-foreground">Features</h4>
157 |                   <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
158 |                     <li>Bank statement processing</li>
159 |                     <li>Transaction categorization</li>
160 |                     <li>Financial insights</li>
161 |                     <li>Multi-currency support</li>
162 |                   </ul>
163 |                 </div>
164 |
165 |                 <div className="hidden md:block">
166 |                   <h4 className="text-sm font-medium text-foreground mb-2 text-left">Features</h4>
167 |                   <ul className="space-y-2 text-sm text-muted-foreground text-left">
168 |                     <li>Bank statement processing</li>
169 |                     <li>Transaction categorization</li>
170 |                     <li>Financial insights</li>
171 |                     <li>Multi-currency support</li>
172 |                   </ul>
173 |                 </div>
174 |
175 |                 <div className="md:hidden">
176 |                   <h4 className="text-sm font-medium text-foreground">Links</h4>
177 |                   <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
178 |                     <li>Documentation</li>
179 |                     <li>Support</li>
180 |                     <li>Privacy Policy</li>
181 |                     <li>Terms of Service</li>
182 |                   </ul>
183 |                 </div>
184 |
185 |                 <div className="hidden md:block">
186 |                   <h4 className="text-sm font-medium text-foreground mb-2 text-left">Links</h4>
187 |                   <ul className="space-y-2 text-sm text-muted-foreground text-left">
188 |                     <li>Documentation</li>
189 |                     <li>Privacy Policy</li>
190 |                     <li>Terms of Service</li>
191 |                     <li>Support</li>
192 |                   </ul>
193 |                 </div>
194 |               </div>
195 |
196 |               <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
197 |                 <p className="text-xs text-muted-foreground">
198 |                   &copy; {new Date().getFullYear()} Finance Mind. All rights reserved.
199 |                 </p>
200 |                 <div className="mt-4 md:mt-0 flex space-x-4">
201 |                   <span className="text-xs text-muted-foreground">
202 |                     <a
203 |                       href="https://andredezzy.com"
204 |                       target="_blank"
205 |                       rel="noopener noreferrer"
206 |                       className="text-primary hover:underline"
207 |                     >
208 |                       Andre &ldquo;Dezzy&rdquo; Victor
209 |                     </a>
210 |                   </span>
211 |                 </div>
212 |               </div>
213 |             </div>
214 |           </footer>
215 |         </ThemeProvider>
216 |
217 |         <Analytics />
218 |       </body>
219 |     </html>
220 |   );
221 | }
```

src/config/site.ts

```
1 | export const siteConfig = {
2 |   name: 'Finance Mind',
3 |   url: 'https://finance-mind.andredezzy.com',
4 |   ogImage: 'https://finance-mind.andredezzy.com/og.jpg',
5 |   description:
6 |     'Your personal AI-driven finance tracker that intelligently processes bank statements, categorizes transactions, and provides deep insights into your financial health - all in one place.',
7 |   links: {
8 |     twitter: 'https://twitter.com/andredezzy',
9 |     github: 'https://github.com/andredezzy/finance-mind',
10 |   },
11 | };
12 |
13 | export type SiteConfig = typeof siteConfig;
14 |
15 | export const META_THEME_COLORS = {
16 |   light: '#ffffff',
17 |   dark: '#000000',
18 | };
```

src/lib/ai.ts

```
1 | import { openai } from '@ai-sdk/openai';
2 |
3 | // Default model to use - can be overridden in specific implementations
4 | export const defaultModel = process.env.AI_MODEL || 'gpt-4o';
5 |
6 | // Export the OpenAI client instance
7 | export { openai };
```

src/lib/utils.ts

```
1 | import { type ClassValue, clsx } from 'clsx';
2 | import { twMerge } from 'tailwind-merge';
3 |
4 | export function cn(...inputs: ClassValue[]) {
5 |   return twMerge(clsx(inputs));
6 | }
```

src/interfaces/transaction.ts

```
1 | import type { TransactionType, TransactionCategory } from '@/lib/ai/types';
2 |
3 | export interface Transaction {
4 |   id: string;
5 |   type: TransactionType;
6 |   amount: number;
7 |   currency: string;
8 |   date: Date;
9 |   description: string;
10 |   category: TransactionCategory;
11 |   card?: string;
12 |   merchant?: string;
13 |   fee?: number;
14 |   installment?: {
15 |     current: number;
16 |     total: number;
17 |   };
18 | }
```

src/schemas/form-schemas.ts

```
1 | import { z } from 'zod';
2 |
3 | /**
4 |  * Schema for the transaction categorizer form
5 |  */
6 | export const transactionCategorizerFormSchema = z.object({
7 |   description: z.string().min(1, 'Description is required'),
8 |   amount: z
9 |     .string()
10 |     .min(1, 'Amount is required')
11 |     .refine(val => !isNaN(parseFloat(val)), {
12 |       message: 'Amount must be a valid number',
13 |     }),
14 |   date: z.string().optional(),
15 |   merchant: z.string().optional(),
16 | });
17 |
18 | /**
19 |  * Schema for the transaction extractor form
20 |  */
21 | export const transactionExtractorFormSchema = z.object({
22 |   prompt: z.string().min(1, 'Please describe the transaction'),
23 | });
24 |
25 | // Types for the form values
26 | export type TransactionCategorizerFormValues = z.infer<typeof transactionCategorizerFormSchema>;
27 | export type TransactionExtractorFormValues = z.infer<typeof transactionExtractorFormSchema>;
```

src/schemas/investment-schemas.ts

```
1 | import { z } from 'zod';
2 |
3 | import { AssetClass, InvestmentCategory, InvestmentTransactionType } from '@/lib/ai/types';
4 |
5 | /**
6 |  * Schema for investment asset
7 |  */
8 | export const investmentAssetSchema = z.object({
9 |   id: z.string().optional(),
10 |   symbol: z.string().describe('The investment symbol/ticker'),
11 |   name: z.string().describe('The full name of the investment'),
12 |   assetClass: z.nativeEnum(AssetClass).describe('The asset class category'),
13 |   category: z.nativeEnum(InvestmentCategory).describe('The specific investment category'),
14 |   description: z.string().optional().describe('Additional information about the investment'),
15 |   currentPrice: z.number().optional().describe('The current market price per unit'),
16 |   currency: z.string().describe('Currency code (e.g., BRL, USD)'),
17 |   region: z.string().optional().describe('Geographic region of the investment'),
18 |   createdAt: z.date().optional(),
19 |   updatedAt: z.date().optional(),
20 | });
21 |
22 | /**
23 |  * Schema for investment transaction
24 |  */
25 | export const investmentTransactionSchema = z.object({
26 |   id: z.string().optional(),
27 |   assetId: z.string().describe('The ID of the related investment asset'),
28 |   type: z.nativeEnum(InvestmentTransactionType).describe('The type of investment transaction'),
29 |   date: z.string().or(z.date()).describe('The transaction date'),
30 |   quantity: z.number().describe('The quantity of units involved in the transaction'),
31 |   pricePerUnit: z.number().describe('The price per unit at the time of transaction'),
32 |   totalAmount: z.number().describe('The total transaction amount'),
33 |   fees: z.number().optional().describe('Any fees associated with the transaction'),
34 |   taxes: z.number().optional().describe('Any taxes associated with the transaction'),
35 |   notes: z.string().optional().describe('Additional notes about the transaction'),
36 |   broker: z.string().optional().describe('The broker or platform used for the transaction'),
37 |   currency: z.string().describe('Currency code (e.g., BRL, USD)'),
38 |   exchangeRate: z.number().optional().describe('Exchange rate at the time of transaction'),
39 |   createdAt: z.date().optional(),
40 |   updatedAt: z.date().optional(),
41 | });
42 |
43 | /**
44 |  * Schema for investment portfolio
45 |  */
46 | export const investmentPortfolioSchema = z.object({
47 |   id: z.string().optional(),
48 |   name: z.string().describe('The name of the portfolio'),
49 |   description: z.string().optional().describe('Description of the portfolio'),
50 |   assets: z.array(z.string()).describe('Array of asset IDs in this portfolio'),
51 |   baseCurrency: z.string().describe('The base currency for portfolio calculations'),
52 |   createdAt: z.date().optional(),
53 |   updatedAt: z.date().optional(),
54 | });
55 |
56 | /**
57 |  * Schema for investment holdings (calculated/current state)
58 |  */
59 | export const investmentHoldingSchema = z.object({
60 |   assetId: z.string().describe('The ID of the investment asset'),
61 |   portfolioId: z.string().optional().describe('The portfolio this holding belongs to'),
62 |   quantity: z.number().describe('Current quantity held'),
63 |   averageCost: z.number().describe('Average cost basis per unit'),
64 |   currentValue: z.number().describe('Current total market value'),
65 |   unrealizedGainLoss: z.number().describe('Unrealized gain/loss amount'),
66 |   unrealizedGainLossPercentage: z.number().describe('Unrealized gain/loss percentage'),
67 |   realizedGainLoss: z.number().describe('Total realized gain/loss from this asset'),
68 |   lastUpdated: z.date().describe('When this holding was last updated'),
69 | });
70 |
71 | /**
72 |  * Schema for investment performance metrics
73 |  */
74 | export const investmentPerformanceSchema = z.object({
75 |   assetId: z.string().optional().describe('The asset ID, if for a specific asset'),
76 |   portfolioId: z.string().optional().describe('The portfolio ID, if for a portfolio'),
77 |   timeframe: z.enum(['1D', '1W', '1M', '3M', '6M', '1Y', 'YTD', '3Y', '5Y', 'ALL']),
78 |   startDate: z.date().describe('Start date of the performance period'),
79 |   endDate: z.date().describe('End date of the performance period'),
80 |   startValue: z.number().describe('Value at the start of the period'),
81 |   endValue: z.number().describe('Value at the end of the period'),
82 |   absoluteReturn: z.number().describe('Absolute return amount'),
83 |   percentageReturn: z.number().describe('Percentage return'),
84 |   annualizedReturn: z.number().optional().describe('Annualized return percentage'),
85 |   dividendIncome: z.number().describe('Income from dividends during the period'),
86 |   interestIncome: z.number().describe('Income from interest during the period'),
87 |   contributions: z.number().describe('New money contributed during the period'),
88 |   withdrawals: z.number().describe('Money withdrawn during the period'),
89 | });
90 |
91 | // Types for schema inference
92 | export type InvestmentAsset = z.infer<typeof investmentAssetSchema>;
93 | export type InvestmentTransaction = z.infer<typeof investmentTransactionSchema>;
94 | export type InvestmentPortfolio = z.infer<typeof investmentPortfolioSchema>;
95 | export type InvestmentHolding = z.infer<typeof investmentHoldingSchema>;
96 | export type InvestmentPerformance = z.infer<typeof investmentPerformanceSchema>;
```

src/schemas/transaction-schemas.ts

```
1 | import { z } from 'zod';
2 |
3 | import { TransactionCategory, TransactionType } from '@/lib/ai/types';
4 |
5 | /**
6 |  * Schema for transaction categorization input
7 |  */
8 | export const transactionCategorizeSchema = z.object({
9 |   description: z.string(),
10 |   amount: z.number(),
11 |   date: z.string().or(z.date()),
12 |   merchant: z.string().optional(),
13 | });
14 |
15 | /**
16 |  * Schema for transaction categorization response
17 |  */
18 | export const transactionCategorizeResponseSchema = z.object({
19 |   category: z.nativeEnum(TransactionCategory),
20 |   type: z.nativeEnum(TransactionType),
21 |   merchant: z.string().optional(),
22 |   isInstallment: z.boolean().optional(),
23 |   installmentInfo: z
24 |     .object({
25 |       current: z.number(),
26 |       total: z.number(),
27 |     })
28 |     .optional(),
29 |   confidence: z.number().min(0).max(1).optional(),
30 | });
31 |
32 | /**
33 |  * Schema for transaction extraction
34 |  */
35 | export const transactionExtractionSchema = z.object({
36 |   description: z.string().describe('The transaction description'),
37 |   amount: z.number().describe('The transaction amount as a number'),
38 |   date: z.string().describe('The transaction date in ISO format or as specified'),
39 |   merchant: z.string().optional().describe('The merchant or entity name'),
40 |   category: z.nativeEnum(TransactionCategory).describe('The transaction category'),
41 |   type: z
42 |     .nativeEnum(TransactionType)
43 |     .describe('The transaction type (income, outcome, or transfer)'),
44 |   isInstallment: z.boolean().optional().describe('Whether this is an installment payment'),
45 |   installmentInfo: z
46 |     .object({
47 |       current: z.number(),
48 |       total: z.number(),
49 |     })
50 |     .optional()
51 |     .describe('Installment information if applicable'),
52 |   currency: z.string().optional().describe('Currency code (e.g., BRL, USD)'),
53 | });
54 |
55 | // Types for schema inference
56 | export type TransactionCategorizeInput = z.infer<typeof transactionCategorizeSchema>;
57 | export type TransactionCategorizeResponse = z.infer<typeof transactionCategorizeResponseSchema>;
58 | export type TransactionExtraction = z.infer<typeof transactionExtractionSchema>;
```

src/actions/ai/categorize-transaction.ts

```
1 | 'use server';
2 |
3 | import { generateObject } from 'ai';
4 |
5 | import { openai, defaultModel } from '@/lib/ai';
6 | import { TransactionCategory, TransactionType } from '@/lib/ai/types';
7 | import { transactionCategorizeResponseSchema as TransactionCategorizeResponseSchema } from '@/schemas/transaction-schemas';
8 |
9 | import type { TransactionCategorizeResponse } from '@/schemas/transaction-schemas';
10 |
11 | // The transaction categorization AI function
12 | export async function categorizeTransaction({
13 |   description,
14 |   amount,
15 |   date,
16 |   merchant,
17 | }: {
18 |   description: string;
19 |   amount: number;
20 |   date: string | Date;
21 |   merchant?: string;
22 | }): Promise<TransactionCategorizeResponse> {
23 |   // Determine transaction type based on amount
24 |   // Positive amounts are income, negative are expenses
25 |   const type = amount >= 0 ? TransactionType.INCOME : TransactionType.OUTCOME;
26 |
27 |   // Create a prompt for the AI to analyze the transaction
28 |   const prompt = `
29 |     I need to categorize this financial transaction:
30 |
31 |     Description: ${description}
32 |     Amount: ${amount}
33 |     Date: ${date}
34 |     ${merchant ? `Merchant: ${merchant}` : ''}
35 |
36 |     Based on this information, determine:
37 |     1. The most appropriate transaction category
38 |     2. If this is a transfer between accounts of the same person
39 |     3. If this is an installment payment, extract the current and total installment numbers
40 |     4. Extract a clean merchant name if present in the description
41 |     5. Your confidence level in this categorization (0.0 to 1.0)
42 |
43 |     Special cases to handle:
44 |     - If the description contains "Pix" or "PIX", categorize as PIX
45 |     - If the description mentions "parcela" or has a format like "1/3", it's likely an installment payment
46 |     - For transfers, look for keywords like "Transferência", "TED", "DOC", or "Transfer"
47 |     - For credit card payments, look for "Pagamento de fatura" or "Pagamento fatura"
48 |     - For salary, look for "Salário", "Salary", "Pagamento", "Folha"
49 |
50 |     Transaction categories to use:
51 |     Income: SALARY, INVESTMENT, REIMBURSEMENT, GIFT, OTHER_INCOME
52 |     Expense: GROCERIES, DINING, ENTERTAINMENT, TRANSPORTATION, UTILITIES, HOUSING, HEALTH, EDUCATION, SHOPPING, TRAVEL, PERSONAL_CARE, SUBSCRIPTIONS, OTHER_EXPENSE
53 |     Transfer: TRANSFER, PIX, BOLETO, CREDIT_CARD_PAYMENT
54 |     Other: UNCATEGORIZED
55 |
56 |     Transaction types to use: INCOME, OUTCOME, TRANSFER
57 |
58 |     Provide your analysis as a structured response.
59 |
60 |     IMPORTANT: Keep any extracted text (like merchant names) in the ORIGINAL LANGUAGE of the input. Do not translate merchant names or other text values to English, keep them in the language of the original description.
61 |
62 |     FORMATTING GUIDANCE:
63 |     1. Format and clean up merchant names while keeping the original language
64 |     2. Normalize formatting (e.g., removing excess spaces, fixing capitalization)
65 |     3. Extract key information in a structured way
66 |     4. Ensure proper formatting of installment information if present
67 |     5. Standardize the representation of categories and transaction types
68 |     6. Structure the response for consistent processing by the application
69 |
70 |     LANGUAGE-SPECIFIC FORMATTING EXAMPLES:
71 |     - Portuguese input with "corrida uber" → Format merchant as "Uber" and include Portuguese terms/prepositions in any text
72 |     - English input with just "uber" → Format merchant as "Uber" and use English conventions
73 |     - Spanish input → Use Spanish language conventions for text formatting
74 |
75 |     Use language-appropriate phrasing, articles, and prepositions based on the detected language.
76 |     The goal is natural and well-structured text that follows the conventions of the input language.
77 |   `;
78 |
79 |   try {
80 |     // Use generateObject instead of streamText for more reliable results
81 |     const result = await generateObject({
82 |       model: openai(defaultModel),
83 |       schema: TransactionCategorizeResponseSchema,
84 |       messages: [
85 |         {
86 |           role: 'system',
87 |           content:
88 |             'You are a financial transaction categorization expert, specialized in Brazilian financial systems and global transactions. Your task is to accurately categorize transactions, detect transfers, and identify installment payments. Always preserve the original language of text fields like merchant names. Format and structure the information for consistency and clarity, but do not translate the content.',
89 |         },
90 |         {
91 |           role: 'user',
92 |           content: prompt,
93 |         },
94 |       ],
95 |       temperature: 0.1, // Low temperature for more consistent results
96 |     });
97 |
98 |     console.log('Categorization result:', result);
99 |
100 |     // Return the categorization result
101 |     return result.object as TransactionCategorizeResponse;
102 |   } catch (error) {
103 |     console.error('AI categorization error:', error);
104 |     // Fallback categorization on error
105 |     return {
106 |       category: TransactionCategory.UNCATEGORIZED,
107 |       type: type,
108 |       confidence: 0.1,
109 |     };
110 |   }
111 | }
```

src/actions/ai/extract-transaction-fields.ts

```
1 | 'use server';
2 |
3 | import { openai } from '@ai-sdk/openai';
4 | import { generateObject } from 'ai';
5 | import * as chrono from 'chrono-node';
6 |
7 | import { defaultModel } from '@/lib/ai';
8 | import { transactionExtractionSchema } from '@/schemas/transaction-schemas';
9 |
10 | import type { TransactionExtraction } from '@/schemas/transaction-schemas';
11 |
12 | /**
13 |  * Extract transaction fields from a text prompt
14 |  * @param prompt The user's text description of a transaction
15 |  * @returns Extracted transaction fields
16 |  */
17 | export async function extractTransactionFields(prompt: string): Promise<TransactionExtraction> {
18 |   try {
19 |     const systemPrompt = `
20 |       You are a financial assistant specialized in extracting transaction details from text.
21 |       Extract all relevant transaction information including:
22 |
23 |       1. Transaction description (what the transaction is for)
24 |       2. Amount (as a number, negative for expenses)
25 |       3. Date (provide two outputs in this format: "original: [original date expression]|english: [english equivalent]")
26 |          Examples:
27 |          - If user says "hoje" in Portuguese → "original: hoje|english: today"
28 |          - If user says "明天" in Chinese → "original: 明天|english: tomorrow"
29 |          - If user says "last Friday" in English → "original: last Friday|english: last Friday"
30 |          - If user says "próximo mês" → "original: próximo mês|english: next month"
31 |       4. Merchant name (if present)
32 |       5. Transaction category (based on description)
33 |       6. Transaction type (INCOME, OUTCOME, or TRANSFER)
34 |       7. Whether it's an installment payment
35 |       8. Installment details (current number and total)
36 |       9. Currency (default to BRL if not specified)
37 |
38 |       Use the information provided in the text. If certain details are missing, make reasonable inferences.
39 |       For example, if no date is mentioned, use "original: today|english: today".
40 |
41 |       For transaction types:
42 |       - Positive amounts are typically INCOME
43 |       - Negative amounts are typically OUTCOME
44 |       - Transfers should be identified as TRANSFER based on keywords like "transfer", "sent to", "received from"
45 |
46 |       For categories, assign one of the following:
47 |       Income categories: SALARY, INVESTMENT, REIMBURSEMENT, GIFT, OTHER_INCOME
48 |       Expense categories: GROCERIES, DINING, ENTERTAINMENT, TRANSPORTATION, UTILITIES, HOUSING, HEALTH, EDUCATION, SHOPPING, TRAVEL, PERSONAL_CARE, SUBSCRIPTIONS, OTHER_EXPENSE
49 |       Transfer categories: TRANSFER, PIX, BOLETO, CREDIT_CARD_PAYMENT
50 |       Other: UNCATEGORIZED
51 |
52 |       IMPORTANT: Detect the language of the user's input and provide ALL text fields (description, merchant, etc.) in that SAME language.
53 |       Only the category values and transaction types should use the predefined English constants.
54 |       Do not translate the user's content to English unless specifically needed for date parsing.
55 |
56 |       FORMATTING GUIDANCE:
57 |       1. Format and structure the user's content for clarity and consistency
58 |       2. Clean up the merchant names (remove unnecessary prefixes, standardize formats)
59 |       3. Normalize descriptions to be concise and clear while preserving the original meaning and language
60 |       4. Format amounts properly (e.g., ensuring negative for expenses)
61 |       5. Extract installment information in a consistent format
62 |       6. Standardize formatting but DO NOT translate or change the language
63 |
64 |       LANGUAGE-SPECIFIC FORMATTING EXAMPLES:
65 |       - Portuguese input: "150 corrida uber ontem" → description: "Corrida de Uber"
66 |       - English input: "150 uber" → description: "Uber ride"
67 |       - Spanish input: "50 comida ayer" → description: "Comida"
68 |
69 |       Use language-appropriate phrasing, articles, and prepositions to create natural descriptions in the detected language.
70 |       Always format according to the conventions of the detected language (e.g., "de" in Portuguese, "ride" in English).
71 |     `;
72 |
73 |     // Use generateObject instead of streamText for tools functionality
74 |     const result = await generateObject({
75 |       model: openai(defaultModel),
76 |       schema: transactionExtractionSchema,
77 |       messages: [
78 |         {
79 |           role: 'system',
80 |           content: systemPrompt,
81 |         },
82 |         {
83 |           role: 'user',
84 |           content: prompt,
85 |         },
86 |       ],
87 |       temperature: 0.1, // Low temperature for more consistent results
88 |     });
89 |
90 |     // Parse natural language date using chrono-node
91 |     const extractedResult = result.object as TransactionExtraction;
92 |
93 |     // If we have a date string, try to parse it with chrono-node
94 |     if (typeof extractedResult.date === 'string') {
95 |       try {
96 |         // Parse the formatted date string to extract original and English versions
97 |         const dateString = extractedResult.date;
98 |         let englishDateExpression = dateString;
99 |
100 |         // Check if the date is in the expected format "original: X|english: Y"
101 |         if (dateString.includes('|english:')) {
102 |           const parts = dateString.split('|english:');
103 |           if (parts.length === 2) {
104 |             englishDateExpression = parts[1].trim();
105 |           }
106 |         }
107 |
108 |         // Parse the English date expression using chrono-node
109 |         const parsedDate = chrono.parseDate(englishDateExpression);
110 |
111 |         // If we successfully parsed the date, convert it to ISO format
112 |         if (parsedDate) {
113 |           extractedResult.date = parsedDate.toISOString();
114 |         } else {
115 |           // If chrono failed to parse, try to use Date.parse as fallback
116 |           const fallbackDate = new Date(englishDateExpression);
117 |           if (!isNaN(fallbackDate.getTime())) {
118 |             extractedResult.date = fallbackDate.toISOString();
119 |           }
120 |         }
121 |       } catch (error) {
122 |         console.warn('Error parsing natural language date:', error);
123 |         // Keep the original date string if parsing fails
124 |       }
125 |     }
126 |
127 |     console.log('Extraction result:', extractedResult);
128 |
129 |     return extractedResult;
130 |   } catch (error) {
131 |     console.error('Transaction extraction error:', error);
132 |     throw new Error('Failed to extract transaction details from text');
133 |   }
134 | }
```

src/components/ai-playground/transaction-categorizer.tsx

```
1 | 'use client';
2 |
3 | import { zodResolver } from '@hookform/resolvers/zod';
4 | import { useState } from 'react';
5 | import { useForm } from 'react-hook-form';
6 |
7 | import { categorizeTransaction } from '@/actions/ai/categorize-transaction';
8 | import { Button } from '@/components/ui/button';
9 | import {
10 |   Card,
11 |   CardContent,
12 |   CardDescription,
13 |   CardFooter,
14 |   CardHeader,
15 |   CardTitle,
16 | } from '@/components/ui/card';
17 | import {
18 |   Form,
19 |   FormControl,
20 |   FormField,
21 |   FormItem,
22 |   FormLabel,
23 |   FormMessage,
24 | } from '@/components/ui/form';
25 | import { Input } from '@/components/ui/input';
26 | import { transactionCategorizerFormSchema } from '@/schemas/form-schemas';
27 |
28 | import type { TransactionCategory, TransactionType } from '@/lib/ai/types';
29 | import type { TransactionCategorizerFormValues } from '@/schemas/form-schemas';
30 | import type { TransactionCategorizeResponse } from '@/schemas/transaction-schemas';
31 |
32 | export const TransactionCategorizer = () => {
33 |   const [result, setResult] = useState<TransactionCategorizeResponse | null>(null);
34 |   const [isLoading, setIsLoading] = useState(false);
35 |   const [error, setError] = useState<string | null>(null);
36 |
37 |   // Initialize the form with react-hook-form
38 |   const form = useForm<TransactionCategorizerFormValues>({
39 |     resolver: zodResolver(transactionCategorizerFormSchema),
40 |     defaultValues: {
41 |       description: '',
42 |       amount: '',
43 |       date: '',
44 |       merchant: '',
45 |     },
46 |   });
47 |
48 |   const onSubmit = async (values: TransactionCategorizerFormValues) => {
49 |     setIsLoading(true);
50 |     setError(null);
51 |
52 |     try {
53 |       // Use the server action instead of fetch API
54 |       const result = await categorizeTransaction({
55 |         description: values.description,
56 |         amount: parseFloat(values.amount),
57 |         date: values.date ? values.date : new Date().toISOString(),
58 |         merchant: values.merchant || undefined,
59 |       });
60 |
61 |       setResult(result);
62 |     } catch (err) {
63 |       setError(err instanceof Error ? err.message : 'An unknown error occurred');
64 |     } finally {
65 |       setIsLoading(false);
66 |     }
67 |   };
68 |
69 |   // Helper function to get the category label
70 |   const getCategoryLabel = (category: TransactionCategory) => {
71 |     return category
72 |       .replace(/_/g, ' ')
73 |       .toLowerCase()
74 |       .replace(/\b\w/g, l => l.toUpperCase());
75 |   };
76 |
77 |   // Helper function to get the type label
78 |   const getTypeLabel = (type: TransactionType) => {
79 |     return type.toLowerCase().charAt(0).toUpperCase() + type.toLowerCase().slice(1);
80 |   };
81 |
82 |   // Reset form and results
83 |   const handleReset = () => {
84 |     form.reset();
85 |     setResult(null);
86 |     setError(null);
87 |   };
88 |
89 |   return (
90 |     <Card className="w-full max-w-md">
91 |       <CardHeader>
92 |         <CardTitle>Transaction Categorizer</CardTitle>
93 |         <CardDescription>Enter transaction details to categorize it using AI.</CardDescription>
94 |       </CardHeader>
95 |
96 |       <CardContent>
97 |         <Form {...form}>
98 |           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
99 |             <div className="space-y-4">
100 |               <FormField
101 |                 control={form.control}
102 |                 name="description"
103 |                 render={({ field }) => (
104 |                   <FormItem>
105 |                     <FormLabel>Description</FormLabel>
106 |                     <FormControl>
107 |                       <Input placeholder="Transaction description" {...field} />
108 |                     </FormControl>
109 |                     <FormMessage />
110 |                   </FormItem>
111 |                 )}
112 |               />
113 |
114 |               <FormField
115 |                 control={form.control}
116 |                 name="amount"
117 |                 render={({ field }) => (
118 |                   <FormItem>
119 |                     <FormLabel>Amount</FormLabel>
120 |                     <FormControl>
121 |                       <Input
122 |                         type="number"
123 |                         step="0.01"
124 |                         placeholder="Enter amount (negative for expenses)"
125 |                         {...field}
126 |                       />
127 |                     </FormControl>
128 |                     <FormMessage />
129 |                   </FormItem>
130 |                 )}
131 |               />
132 |
133 |               <FormField
134 |                 control={form.control}
135 |                 name="date"
136 |                 render={({ field }) => (
137 |                   <FormItem>
138 |                     <FormLabel>Date</FormLabel>
139 |                     <FormControl>
140 |                       <Input type="date" placeholder="Transaction date" {...field} />
141 |                     </FormControl>
142 |                     <FormMessage />
143 |                   </FormItem>
144 |                 )}
145 |               />
146 |
147 |               <FormField
148 |                 control={form.control}
149 |                 name="merchant"
150 |                 render={({ field }) => (
151 |                   <FormItem>
152 |                     <FormLabel>Merchant (optional)</FormLabel>
153 |                     <FormControl>
154 |                       <Input placeholder="Merchant name" {...field} />
155 |                     </FormControl>
156 |                     <FormMessage />
157 |                   </FormItem>
158 |                 )}
159 |               />
160 |             </div>
161 |
162 |             <Button type="submit" className="w-full" disabled={isLoading}>
163 |               {isLoading ? 'Categorizing...' : 'Categorize Transaction'}
164 |             </Button>
165 |           </form>
166 |         </Form>
167 |
168 |         {error && (
169 |           <div className="mt-4 p-3 bg-destructive/20 text-destructive rounded-md">
170 |             <p>{error}</p>
171 |           </div>
172 |         )}
173 |
174 |         {result && (
175 |           <div className="mt-8 space-y-6">
176 |             <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
177 |
178 |             <div className="space-y-2">
179 |               <h3 className="font-medium">Result:</h3>
180 |               <div className="grid grid-cols-2 gap-2">
181 |                 <div className="text-sm font-medium">Category:</div>
182 |                 <div className="text-sm">{getCategoryLabel(result.category)}</div>
183 |
184 |                 <div className="text-sm font-medium">Type:</div>
185 |                 <div className="text-sm">{getTypeLabel(result.type)}</div>
186 |
187 |                 {result.merchant && (
188 |                   <>
189 |                     <div className="text-sm font-medium">Merchant:</div>
190 |                     <div className="text-sm">{result.merchant}</div>
191 |                   </>
192 |                 )}
193 |
194 |                 {result.isInstallment && result.installmentInfo && (
195 |                   <>
196 |                     <div className="text-sm font-medium">Installment:</div>
197 |                     <div className="text-sm">
198 |                       {result.installmentInfo.current}/{result.installmentInfo.total}
199 |                     </div>
200 |                   </>
201 |                 )}
202 |
203 |                 {result.confidence !== undefined && (
204 |                   <>
205 |                     <div className="text-sm font-medium">Confidence:</div>
206 |                     <div className="text-sm">{(result.confidence * 100).toFixed(1)}%</div>
207 |                   </>
208 |                 )}
209 |               </div>
210 |             </div>
211 |           </div>
212 |         )}
213 |       </CardContent>
214 |
215 |       <CardFooter className="flex flex-col space-y-4 mt-auto pt-8">
216 |         <div>
217 |           <h3 className="text-sm font-medium mb-2">How It Works</h3>
218 |           <div className="space-y-2">
219 |             <p className="text-xs text-muted-foreground">
220 |               The Transaction Categorizer uses AI to intelligently categorize transactions based on
221 |               description and amount.
222 |             </p>
223 |             <p className="text-xs text-muted-foreground">Our system:</p>
224 |             <ul className="text-xs text-muted-foreground list-decimal pl-4 space-y-1">
225 |               <li>
226 |                 Uses advanced language models to handle Brazilian financial terms and patterns
227 |               </li>
228 |               <li>Detects installment payments, transfers, and other special transaction types</li>
229 |               <li>
230 |                 All processing happens securely on the server, with no data stored permanently
231 |               </li>
232 |             </ul>
233 |           </div>
234 |         </div>
235 |         <Button variant="outline" className="w-full mt-4" onClick={handleReset}>
236 |           Clear
237 |         </Button>
238 |       </CardFooter>
239 |     </Card>
240 |   );
241 | };
```

src/components/ai-playground/transaction-extractor.tsx

```
1 | 'use client';
2 |
3 | import { zodResolver } from '@hookform/resolvers/zod';
4 | import { useState } from 'react';
5 | import { useForm } from 'react-hook-form';
6 |
7 | import { extractTransactionFields } from '@/actions/ai/extract-transaction-fields';
8 | import { Button } from '@/components/ui/button';
9 | import {
10 |   Card,
11 |   CardContent,
12 |   CardDescription,
13 |   CardFooter,
14 |   CardHeader,
15 |   CardTitle,
16 | } from '@/components/ui/card';
17 | import {
18 |   Form,
19 |   FormControl,
20 |   FormField,
21 |   FormItem,
22 |   FormLabel,
23 |   FormMessage,
24 | } from '@/components/ui/form';
25 | import { Textarea } from '@/components/ui/textarea';
26 | import { transactionExtractorFormSchema } from '@/schemas/form-schemas';
27 |
28 | import type { TransactionCategory, TransactionType } from '@/lib/ai/types';
29 | import type { TransactionExtractorFormValues } from '@/schemas/form-schemas';
30 | import type { TransactionExtraction } from '@/schemas/transaction-schemas';
31 |
32 | export const TransactionExtractor = () => {
33 |   const [result, setResult] = useState<TransactionExtraction | null>(null);
34 |   const [isLoading, setIsLoading] = useState(false);
35 |   const [error, setError] = useState<string | null>(null);
36 |
37 |   // Initialize the form with react-hook-form
38 |   const form = useForm<TransactionExtractorFormValues>({
39 |     resolver: zodResolver(transactionExtractorFormSchema),
40 |     defaultValues: {
41 |       prompt: '',
42 |     },
43 |   });
44 |
45 |   const onSubmit = async (values: TransactionExtractorFormValues) => {
46 |     setIsLoading(true);
47 |     setError(null);
48 |
49 |     try {
50 |       // Use the server action instead of the API call
51 |       const result = await extractTransactionFields(values.prompt);
52 |       setResult(result);
53 |     } catch (err) {
54 |       setError(err instanceof Error ? err.message : 'An unknown error occurred');
55 |     } finally {
56 |       setIsLoading(false);
57 |     }
58 |   };
59 |
60 |   // Helper function to get the category label
61 |   const getCategoryLabel = (category: TransactionCategory) => {
62 |     return category
63 |       .replace(/_/g, ' ')
64 |       .toLowerCase()
65 |       .replace(/\b\w/g, l => l.toUpperCase());
66 |   };
67 |
68 |   // Helper function to get the type label
69 |   const getTypeLabel = (type: TransactionType) => {
70 |     return type.toLowerCase().charAt(0).toUpperCase() + type.toLowerCase().slice(1);
71 |   };
72 |
73 |   // Format date for display
74 |   const formatDate = (date: string) => {
75 |     try {
76 |       const parsed = new Date(date);
77 |
78 |       return parsed.toLocaleDateString();
79 |     } catch {
80 |       // Return the original string if it can't be parsed as date
81 |       return date;
82 |     }
83 |   };
84 |
85 |   // Reset form and results
86 |   const handleReset = () => {
87 |     form.reset();
88 |     setResult(null);
89 |     setError(null);
90 |   };
91 |
92 |   return (
93 |     <Card className="w-full max-w-md">
94 |       <CardHeader>
95 |         <CardTitle>Transaction Extractor</CardTitle>
96 |         <CardDescription>
97 |           Describe a transaction in natural language, and our AI will extract the details.
98 |         </CardDescription>
99 |       </CardHeader>
100 |
101 |       <CardContent>
102 |         <Form {...form}>
103 |           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
104 |             <FormField
105 |               control={form.control}
106 |               name="prompt"
107 |               render={({ field }) => (
108 |                 <FormItem>
109 |                   <FormLabel>Describe Your Transaction</FormLabel>
110 |
111 |                   <FormControl>
112 |                     <Textarea
113 |                       placeholder="Example: I spent R$150.50 at Restaurant Central on groceries yesterday"
114 |                       rows={5}
115 |                       className="resize-none mt-1"
116 |                       {...field}
117 |                     />
118 |                   </FormControl>
119 |                   <FormMessage />
120 |                 </FormItem>
121 |               )}
122 |             />
123 |
124 |             <Button type="submit" className="w-full" disabled={isLoading}>
125 |               {isLoading ? 'Extracting...' : 'Extract Transaction Details'}
126 |             </Button>
127 |           </form>
128 |         </Form>
129 |
130 |         {error && (
131 |           <div className="mt-4 p-3 bg-destructive/20 text-destructive rounded-md">
132 |             <p>{error}</p>
133 |           </div>
134 |         )}
135 |
136 |         {result && (
137 |           <div className="mt-8 space-y-6">
138 |             <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
139 |
140 |             <div className="space-y-2">
141 |               <h3 className="font-medium">Extracted Details:</h3>
142 |               <div className="grid grid-cols-2 gap-2">
143 |                 <div className="text-sm font-medium">Description:</div>
144 |                 <div className="text-sm">{result.description}</div>
145 |
146 |                 <div className="text-sm font-medium">Amount:</div>
147 |                 <div className="text-sm">
148 |                   {result.amount} {result.currency || 'BRL'}
149 |                 </div>
150 |
151 |                 <div className="text-sm font-medium">Date:</div>
152 |                 <div className="text-sm">{formatDate(result.date)}</div>
153 |
154 |                 <div className="text-sm font-medium">Category:</div>
155 |                 <div className="text-sm">{getCategoryLabel(result.category)}</div>
156 |
157 |                 <div className="text-sm font-medium">Type:</div>
158 |                 <div className="text-sm">{getTypeLabel(result.type)}</div>
159 |
160 |                 {result.merchant && (
161 |                   <>
162 |                     <div className="text-sm font-medium">Merchant:</div>
163 |                     <div className="text-sm">{result.merchant}</div>
164 |                   </>
165 |                 )}
166 |
167 |                 {result.isInstallment && result.installmentInfo && (
168 |                   <>
169 |                     <div className="text-sm font-medium">Installment:</div>
170 |                     <div className="text-sm">
171 |                       {result.installmentInfo.current}/{result.installmentInfo.total}
172 |                     </div>
173 |                   </>
174 |                 )}
175 |               </div>
176 |             </div>
177 |           </div>
178 |         )}
179 |       </CardContent>
180 |
181 |       <CardFooter className="flex flex-col space-y-4 mt-auto pt-8">
182 |         <div>
183 |           <h3 className="text-sm font-medium mb-2">How It Works</h3>
184 |           <div className="space-y-2">
185 |             <p className="text-xs text-muted-foreground">
186 |               The Transaction Extractor uses AI to parse natural language descriptions into
187 |               structured transaction data.
188 |             </p>
189 |             <p className="text-xs text-muted-foreground">Try examples like:</p>
190 |             <ul className="text-xs text-muted-foreground list-decimal pl-4 space-y-1">
191 |               <li>&quot;I paid R$150 for groceries at Mercado Extra yesterday&quot;</li>
192 |               <li>&quot;Received my salary of R$3500 from Company XYZ&quot;</li>
193 |               <li>
194 |                 &quot;Smartphone installment payment of R$210, 3rd of 12 monthly payments&quot;
195 |               </li>
196 |               <li>&quot;Transferred R$500 from my checking account to my savings account&quot;</li>
197 |             </ul>
198 |           </div>
199 |         </div>
200 |
201 |         <Button variant="outline" className="w-full mt-4" onClick={handleReset}>
202 |           Clear
203 |         </Button>
204 |       </CardFooter>
205 |     </Card>
206 |   );
207 | };
```

src/app/(app)/page.tsx

```
1 | 'use client';
2 |
3 | import { FileIcon, XIcon, UploadIcon } from 'lucide-react';
4 | import { useState, useCallback } from 'react';
5 | import { useDropzone } from 'react-dropzone';
6 |
7 | import { Button } from '@/components/ui/button';
8 | import {
9 |   Card,
10 |   CardContent,
11 |   CardDescription,
12 |   CardFooter,
13 |   CardHeader,
14 |   CardTitle,
15 | } from '@/components/ui/card';
16 | import { Input } from '@/components/ui/input';
17 | import { Label } from '@/components/ui/label';
18 | import {
19 |   Select,
20 |   SelectContent,
21 |   SelectItem,
22 |   SelectTrigger,
23 |   SelectValue,
24 | } from '@/components/ui/select';
25 | import { cn } from '@/lib/utils';
26 |
27 | export default function OverviewPage() {
28 |   const [files, setFiles] = useState<File[]>([]);
29 |
30 |   const onDrop = useCallback((acceptedFiles: File[]) => {
31 |     setFiles(prev => [...prev, ...acceptedFiles]);
32 |   }, []);
33 |
34 |   const { getRootProps, getInputProps, isDragActive } = useDropzone({
35 |     onDrop,
36 |     accept: {
37 |       'text/csv': ['.csv'],
38 |       'application/pdf': ['.pdf'],
39 |     },
40 |   });
41 |
42 |   return (
43 |     <div className="container mx-auto px-8 py-16">
44 |       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
45 |         {/* Upload Bank Statements */}
46 |         <div
47 |           {...getRootProps()}
48 |           className={cn(
49 |             'border-2 border-dashed cursor-pointer hover:bg-muted/50 transition-colors h-full',
50 |             isDragActive ? 'border-primary' : 'border-muted-foreground/25'
51 |           )}
52 |         >
53 |           <input {...getInputProps()} />
54 |
55 |           <Card className="border-0 bg-transparent h-full flex flex-col">
56 |             <CardHeader>
57 |               <CardTitle>Upload Bank Statements</CardTitle>
58 |               <CardDescription>
59 |                 Drag and drop your bank or credit card statements in CSV or PDF format
60 |               </CardDescription>
61 |             </CardHeader>
62 |             <CardContent className="flex-grow">
63 |               {files.length > 0 ? (
64 |                 <div className="space-y-3">
65 |                   <div className="text-sm font-medium">Selected files:</div>
66 |                   <ul className="space-y-2">
67 |                     {files.map((file, index) => (
68 |                       <li
69 |                         key={index}
70 |                         className="flex items-center justify-between bg-muted/50 p-2 text-sm"
71 |                       >
72 |                         <div className="flex items-center gap-2">
73 |                           <FileIcon className="h-4 w-4 text-muted-foreground" />
74 |                           <span className="truncate max-w-[200px]">{file.name}</span>
75 |                           <span className="text-muted-foreground">
76 |                             ({Math.round(file.size / 1024)} KB)
77 |                           </span>
78 |                         </div>
79 |                         <Button
80 |                           variant="ghost"
81 |                           size="icon"
82 |                           className="h-6 w-6"
83 |                           onClick={e => {
84 |                             e.stopPropagation();
85 |                             setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
86 |                           }}
87 |                         >
88 |                           <XIcon className="h-4 w-4" />
89 |                           <span className="sr-only">Remove file</span>
90 |                         </Button>
91 |                       </li>
92 |                     ))}
93 |                   </ul>
94 |                 </div>
95 |               ) : (
96 |                 <div className="flex flex-col items-center justify-center h-full py-8 text-center">
97 |                   <UploadIcon className="h-10 w-10 text-muted-foreground mb-2" />
98 |                   <p className="text-sm text-muted-foreground">
99 |                     Click or drag and drop to upload files
100 |                   </p>
101 |                 </div>
102 |               )}
103 |             </CardContent>
104 |             <CardFooter className="mt-auto">
105 |               <div className="w-full">
106 |                 <p className="mb-2 text-sm">{files.length} file(s) selected</p>
107 |                 <Button className="w-full" disabled={files.length === 0}>
108 |                   Process Statements
109 |                 </Button>
110 |               </div>
111 |             </CardFooter>
112 |           </Card>
113 |         </div>
114 |
115 |         {/* Add Manual Transaction */}
116 |         <Card className="border h-full flex flex-col">
117 |           <CardHeader>
118 |             <CardTitle>Add Manual Transaction</CardTitle>
119 |             <CardDescription>
120 |               Record financial activities not present in your bank statements
121 |             </CardDescription>
122 |           </CardHeader>
123 |           <CardContent className="flex-grow">
124 |             <div className="grid gap-4">
125 |               <div className="grid grid-cols-2 gap-4">
126 |                 <div className="space-y-2">
127 |                   <Label htmlFor="transaction-type">Transaction Type</Label>
128 |                   <Select>
129 |                     <SelectTrigger id="transaction-type" className="w-full">
130 |                       <SelectValue placeholder="Select type" />
131 |                     </SelectTrigger>
132 |                     <SelectContent>
133 |                       <SelectItem value="expense">Expense</SelectItem>
134 |                       <SelectItem value="income">Income</SelectItem>
135 |                       <SelectItem value="transfer">Transfer</SelectItem>
136 |                     </SelectContent>
137 |                   </Select>
138 |                 </div>
139 |                 <div className="space-y-2">
140 |                   <Label htmlFor="amount">Amount</Label>
141 |                   <Input id="amount" type="number" placeholder="0.00" />
142 |                 </div>
143 |               </div>
144 |
145 |               <div className="space-y-2">
146 |                 <Label htmlFor="description">Description</Label>
147 |                 <Input id="description" placeholder="Transaction description" />
148 |               </div>
149 |
150 |               <div className="grid grid-cols-2 gap-4">
151 |                 <div className="space-y-2">
152 |                   <Label htmlFor="category">Category</Label>
153 |                   <Select>
154 |                     <SelectTrigger id="category" className="w-full">
155 |                       <SelectValue placeholder="Select category" />
156 |                     </SelectTrigger>
157 |                     <SelectContent>
158 |                       <SelectItem value="groceries">Groceries</SelectItem>
159 |                       <SelectItem value="entertainment">Entertainment</SelectItem>
160 |                       <SelectItem value="utilities">Utilities</SelectItem>
161 |                       <SelectItem value="transportation">Transportation</SelectItem>
162 |                       <SelectItem value="housing">Housing</SelectItem>
163 |                       <SelectItem value="healthcare">Healthcare</SelectItem>
164 |                       <SelectItem value="other">Other</SelectItem>
165 |                     </SelectContent>
166 |                   </Select>
167 |                 </div>
168 |                 <div className="space-y-2">
169 |                   <Label htmlFor="date">Date</Label>
170 |                   <Input id="date" type="date" />
171 |                 </div>
172 |               </div>
173 |             </div>
174 |           </CardContent>
175 |           <CardFooter className="mt-auto">
176 |             <Button className="w-full">Add Transaction</Button>
177 |           </CardFooter>
178 |         </Card>
179 |       </div>
180 |
181 |       {/* Transactions Table */}
182 |       <Card className="border mb-8">
183 |         <CardHeader>
184 |           <div className="flex items-center justify-between">
185 |             <div>
186 |               <CardTitle>Transactions</CardTitle>
187 |               <CardDescription>AI-powered categorized transactions</CardDescription>
188 |             </div>
189 |             <div className="flex gap-2">
190 |               <Button variant="outline" size="sm">
191 |                 <svg
192 |                   xmlns="http://www.w3.org/2000/svg"
193 |                   width="24"
194 |                   height="24"
195 |                   viewBox="0 0 24 24"
196 |                   fill="none"
197 |                   stroke="currentColor"
198 |                   strokeWidth="2"
199 |                   strokeLinecap="round"
200 |                   strokeLinejoin="round"
201 |                   className="h-4 w-4 mr-1"
202 |                 >
203 |                   <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
204 |                   <line x1="3" x2="21" y1="9" y2="9" />
205 |                   <line x1="9" x2="9" y1="21" y2="9" />
206 |                 </svg>
207 |                 Filter
208 |               </Button>
209 |               <Button variant="outline" size="sm">
210 |                 <svg
211 |                   xmlns="http://www.w3.org/2000/svg"
212 |                   width="24"
213 |                   height="24"
214 |                   viewBox="0 0 24 24"
215 |                   fill="none"
216 |                   stroke="currentColor"
217 |                   strokeWidth="2"
218 |                   strokeLinecap="round"
219 |                   strokeLinejoin="round"
220 |                   className="h-4 w-4 mr-1"
221 |                 >
222 |                   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
223 |                   <polyline points="7 10 12 15 17 10" />
224 |                   <line x1="12" x2="12" y1="15" y2="3" />
225 |                 </svg>
226 |                 Export
227 |               </Button>
228 |             </div>
229 |           </div>
230 |         </CardHeader>
231 |         <CardContent>
232 |           <div className="border">
233 |             <div className="relative w-full overflow-auto">
234 |               <table className="w-full caption-bottom text-sm">
235 |                 <thead>
236 |                   <tr className="border-b transition-colors bg-muted/50">
237 |                     <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
238 |                     <th className="h-12 px-4 text-left align-middle font-medium">Description</th>
239 |                     <th className="h-12 px-4 text-left align-middle font-medium">Category</th>
240 |                     <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
241 |                     <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
242 |                   </tr>
243 |                 </thead>
244 |                 <tbody>
245 |                   <tr className="border-b transition-colors hover:bg-muted/50">
246 |                     <td className="p-4 align-middle">2025-03-04</td>
247 |                     <td className="p-4 align-middle">Transferência recebida pelo Pix - JOAO</td>
248 |                     <td className="p-4 align-middle">
249 |                       <span className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border-emerald-200">
250 |                         Income
251 |                       </span>
252 |                     </td>
253 |                     <td className="p-4 align-middle font-medium text-emerald-600">R$ 30.00</td>
254 |                     <td className="p-4 align-middle">
255 |                       <div className="flex gap-2">
256 |                         <Button variant="ghost" size="icon" className="h-8 w-8">
257 |                           <svg
258 |                             xmlns="http://www.w3.org/2000/svg"
259 |                             width="24"
260 |                             height="24"
261 |                             viewBox="0 0 24 24"
262 |                             fill="none"
263 |                             stroke="currentColor"
264 |                             strokeWidth="2"
265 |                             strokeLinecap="round"
266 |                             strokeLinejoin="round"
267 |                             className="h-4 w-4"
268 |                           >
269 |                             <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
270 |                             <path d="m15 5 4 4" />
271 |                           </svg>
272 |                         </Button>
273 |                         <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
274 |                           <svg
275 |                             xmlns="http://www.w3.org/2000/svg"
276 |                             width="24"
277 |                             height="24"
278 |                             viewBox="0 0 24 24"
279 |                             fill="none"
280 |                             stroke="currentColor"
281 |                             strokeWidth="2"
282 |                             strokeLinecap="round"
283 |                             strokeLinejoin="round"
284 |                             className="h-4 w-4"
285 |                           >
286 |                             <path d="M3 6h18" />
287 |                             <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
288 |                             <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
289 |                           </svg>
290 |                         </Button>
291 |                       </div>
292 |                     </td>
293 |                   </tr>
294 |                   <tr className="border-b transition-colors hover:bg-muted/50">
295 |                     <td className="p-4 align-middle">2025-03-04</td>
296 |                     <td className="p-4 align-middle">Transferência enviada pelo Pix - ANA</td>
297 |                     <td className="p-4 align-middle">
298 |                       <span className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold bg-rose-50 text-rose-600 border-rose-200">
299 |                         Outcome
300 |                       </span>
301 |                     </td>
302 |                     <td className="p-4 align-middle font-medium text-rose-500">-R$ 6.00</td>
303 |                     <td className="p-4 align-middle">
304 |                       <div className="flex gap-2">
305 |                         <Button variant="ghost" size="icon" className="h-8 w-8">
306 |                           <svg
307 |                             xmlns="http://www.w3.org/2000/svg"
308 |                             width="24"
309 |                             height="24"
310 |                             viewBox="0 0 24 24"
311 |                             fill="none"
312 |                             stroke="currentColor"
313 |                             strokeWidth="2"
314 |                             strokeLinecap="round"
315 |                             strokeLinejoin="round"
316 |                             className="h-4 w-4"
317 |                           >
318 |                             <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
319 |                             <path d="m15 5 4 4" />
320 |                           </svg>
321 |                         </Button>
322 |                         <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
323 |                           <svg
324 |                             xmlns="http://www.w3.org/2000/svg"
325 |                             width="24"
326 |                             height="24"
327 |                             viewBox="0 0 24 24"
328 |                             fill="none"
329 |                             stroke="currentColor"
330 |                             strokeWidth="2"
331 |                             strokeLinecap="round"
332 |                             strokeLinejoin="round"
333 |                             className="h-4 w-4"
334 |                           >
335 |                             <path d="M3 6h18" />
336 |                             <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
337 |                             <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
338 |                           </svg>
339 |                         </Button>
340 |                       </div>
341 |                     </td>
342 |                   </tr>
343 |                   <tr className="border-b transition-colors hover:bg-muted/50">
344 |                     <td className="p-4 align-middle">2025-03-02</td>
345 |                     <td className="p-4 align-middle">
346 |                       Transferência entre contas - Nubank para Itaú
347 |                     </td>
348 |                     <td className="p-4 align-middle">
349 |                       <span className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-600 border-blue-200">
350 |                         Transfer
351 |                       </span>
352 |                     </td>
353 |                     <td className="p-4 align-middle font-medium text-blue-500">R$ 1,000.00</td>
354 |                     <td className="p-4 align-middle">
355 |                       <div className="flex gap-2">
356 |                         <Button variant="ghost" size="icon" className="h-8 w-8">
357 |                           <svg
358 |                             xmlns="http://www.w3.org/2000/svg"
359 |                             width="24"
360 |                             height="24"
361 |                             viewBox="0 0 24 24"
362 |                             fill="none"
363 |                             stroke="currentColor"
364 |                             strokeWidth="2"
365 |                             strokeLinecap="round"
366 |                             strokeLinejoin="round"
367 |                             className="h-4 w-4"
368 |                           >
369 |                             <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
370 |                             <path d="m15 5 4 4" />
371 |                           </svg>
372 |                         </Button>
373 |                         <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
374 |                           <svg
375 |                             xmlns="http://www.w3.org/2000/svg"
376 |                             width="24"
377 |                             height="24"
378 |                             viewBox="0 0 24 24"
379 |                             fill="none"
380 |                             stroke="currentColor"
381 |                             strokeWidth="2"
382 |                             strokeLinecap="round"
383 |                             strokeLinejoin="round"
384 |                             className="h-4 w-4"
385 |                           >
386 |                             <path d="M3 6h18" />
387 |                             <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
388 |                             <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
389 |                           </svg>
390 |                         </Button>
391 |                       </div>
392 |                     </td>
393 |                   </tr>
394 |                   <tr className="border-b transition-colors hover:bg-muted/50">
395 |                     <td className="p-4 align-middle">2025-02-20</td>
396 |                     <td className="p-4 align-middle">Gopag S*Bendito Japa</td>
397 |                     <td className="p-4 align-middle">
398 |                       <span className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold bg-purple-50 text-purple-700 border-purple-200">
399 |                         Food
400 |                       </span>
401 |                     </td>
402 |                     <td className="p-4 align-middle font-medium text-rose-500">-R$ 205.50</td>
403 |                     <td className="p-4 align-middle">
404 |                       <div className="flex gap-2">
405 |                         <Button variant="ghost" size="icon" className="h-8 w-8">
406 |                           <svg
407 |                             xmlns="http://www.w3.org/2000/svg"
408 |                             width="24"
409 |                             height="24"
410 |                             viewBox="0 0 24 24"
411 |                             fill="none"
412 |                             stroke="currentColor"
413 |                             strokeWidth="2"
414 |                             strokeLinecap="round"
415 |                             strokeLinejoin="round"
416 |                             className="h-4 w-4"
417 |                           >
418 |                             <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
419 |                             <path d="m15 5 4 4" />
420 |                           </svg>
421 |                         </Button>
422 |                         <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
423 |                           <svg
424 |                             xmlns="http://www.w3.org/2000/svg"
425 |                             width="24"
426 |                             height="24"
427 |                             viewBox="0 0 24 24"
428 |                             fill="none"
429 |                             stroke="currentColor"
430 |                             strokeWidth="2"
431 |                             strokeLinecap="round"
432 |                             strokeLinejoin="round"
433 |                             className="h-4 w-4"
434 |                           >
435 |                             <path d="M3 6h18" />
436 |                             <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
437 |                             <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
438 |                           </svg>
439 |                         </Button>
440 |                       </div>
441 |                     </td>
442 |                   </tr>
443 |                   <tr className="transition-colors hover:bg-muted/50">
444 |                     <td className="p-4 align-middle">2025-02-01</td>
445 |                     <td className="p-4 align-middle">Elidia Isabel Paraizo - Parcela 3/3</td>
446 |                     <td className="p-4 align-middle">
447 |                       <span className="inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 border-blue-200">
448 |                         Installment
449 |                       </span>
450 |                     </td>
451 |                     <td className="p-4 align-middle font-medium text-rose-500">-R$ 114.96</td>
452 |                     <td className="p-4 align-middle">
453 |                       <div className="flex gap-2">
454 |                         <Button variant="ghost" size="icon" className="h-8 w-8">
455 |                           <svg
456 |                             xmlns="http://www.w3.org/2000/svg"
457 |                             width="24"
458 |                             height="24"
459 |                             viewBox="0 0 24 24"
460 |                             fill="none"
461 |                             stroke="currentColor"
462 |                             strokeWidth="2"
463 |                             strokeLinecap="round"
464 |                             strokeLinejoin="round"
465 |                             className="h-4 w-4"
466 |                           >
467 |                             <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
468 |                             <path d="m15 5 4 4" />
469 |                           </svg>
470 |                         </Button>
471 |                         <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
472 |                           <svg
473 |                             xmlns="http://www.w3.org/2000/svg"
474 |                             width="24"
475 |                             height="24"
476 |                             viewBox="0 0 24 24"
477 |                             fill="none"
478 |                             stroke="currentColor"
479 |                             strokeWidth="2"
480 |                             strokeLinecap="round"
481 |                             strokeLinejoin="round"
482 |                             className="h-4 w-4"
483 |                           >
484 |                             <path d="M3 6h18" />
485 |                             <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
486 |                             <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
487 |                           </svg>
488 |                         </Button>
489 |                       </div>
490 |                     </td>
491 |                   </tr>
492 |                 </tbody>
493 |               </table>
494 |             </div>
495 |           </div>
496 |
497 |           <div className="flex items-center justify-end text-sm mt-6 px-1 text-muted-foreground">
498 |             Showing 4 of 120 transactions
499 |           </div>
500 |         </CardContent>
501 |       </Card>
502 |
503 |       {/* Financial Summary */}
504 |       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
505 |         <Card className="border">
506 |           <CardHeader className="pb-2">
507 |             <CardTitle className="text-lg">Month Overview</CardTitle>
508 |           </CardHeader>
509 |
510 |           <CardContent>
511 |             <div className="space-y-4">
512 |               <div className="space-y-2">
513 |                 <div className="flex items-center justify-between">
514 |                   <span className="text-sm text-muted-foreground">Income</span>
515 |                   <span className="text-sm font-medium text-emerald-600">R$ 6,250.00</span>
516 |                 </div>
517 |
518 |                 <div className="h-2 bg-muted overflow-hidden">
519 |                   <div className="h-full bg-emerald-500 w-[80%]" />
520 |                 </div>
521 |               </div>
522 |
523 |               <div className="space-y-2">
524 |                 <div className="flex items-center justify-between">
525 |                   <span className="text-sm text-muted-foreground">Expenses</span>
526 |                   <span className="text-sm font-medium text-rose-500">R$ 4,820.75</span>
527 |                 </div>
528 |
529 |                 <div className="h-2 bg-muted overflow-hidden">
530 |                   <div className="h-full bg-rose-400 w-[60%]" />
531 |                 </div>
532 |               </div>
533 |
534 |               <div className="pt-6">
535 |                 <div className="flex items-center justify-between">
536 |                   <span className="font-medium">Balance</span>
537 |                   <span className="font-medium text-emerald-600">R$ 1,429.25</span>
538 |                 </div>
539 |               </div>
540 |             </div>
541 |           </CardContent>
542 |         </Card>
543 |
544 |         <Card className="border">
545 |           <CardHeader className="pb-2">
546 |             <CardTitle className="text-lg">Top Categories</CardTitle>
547 |           </CardHeader>
548 |           <CardContent>
549 |             <div className="space-y-4">
550 |               <div className="flex items-center justify-between">
551 |                 <div className="flex items-center gap-2">
552 |                   <div className="h-4 w-4 bg-emerald-500" />
553 |                   <span className="text-sm">Food</span>
554 |                 </div>
555 |                 <span className="text-sm font-medium">R$ 1,240.50</span>
556 |               </div>
557 |               <div className="flex items-center justify-between">
558 |                 <div className="flex items-center gap-2">
559 |                   <div className="h-4 w-4 bg-purple-500" />
560 |                   <span className="text-sm">Utilities</span>
561 |                 </div>
562 |                 <span className="text-sm font-medium">R$ 850.25</span>
563 |               </div>
564 |               <div className="flex items-center justify-between">
565 |                 <div className="flex items-center gap-2">
566 |                   <div className="h-4 w-4 bg-orange-500" />
567 |                   <span className="text-sm">Transportation</span>
568 |                 </div>
569 |                 <span className="text-sm font-medium">R$ 725.00</span>
570 |               </div>
571 |               <div className="flex items-center justify-between">
572 |                 <div className="flex items-center gap-2">
573 |                   <div className="h-4 w-4 bg-emerald-500" />
574 |                   <span className="text-sm">Entertainment</span>
575 |                 </div>
576 |                 <span className="text-sm font-medium">R$ 620.30</span>
577 |               </div>
578 |               <div className="flex items-center justify-between">
579 |                 <div className="flex items-center gap-2">
580 |                   <div className="h-4 w-4 bg-rose-400" />
581 |                   <span className="text-sm">Others</span>
582 |                 </div>
583 |                 <span className="text-sm font-medium">R$ 1,384.70</span>
584 |               </div>
585 |             </div>
586 |           </CardContent>
587 |         </Card>
588 |
589 |         <Card className="border">
590 |           <CardHeader className="pb-2">
591 |             <CardTitle className="text-lg">Upcoming Payments</CardTitle>
592 |           </CardHeader>
593 |           <CardContent>
594 |             <div className="space-y-4">
595 |               <div className="flex items-center justify-between">
596 |                 <div>
597 |                   <div className="font-medium">Credit Card Payment</div>
598 |                   <div className="text-xs text-muted-foreground">Due in 5 days</div>
599 |                 </div>
600 |                 <span className="font-medium text-rose-500">R$ 1,250.00</span>
601 |               </div>
602 |               <div className="flex items-center justify-between">
603 |                 <div>
604 |                   <div className="font-medium">Internet Bill</div>
605 |                   <div className="text-xs text-muted-foreground">Due in 8 days</div>
606 |                 </div>
607 |                 <span className="font-medium text-rose-500">R$ 120.00</span>
608 |               </div>
609 |               <div className="flex items-center justify-between">
610 |                 <div>
611 |                   <div className="font-medium">Smartphone Installment</div>
612 |                   <div className="text-xs text-muted-foreground">Due in 12 days</div>
613 |                 </div>
614 |                 <span className="font-medium text-rose-500">R$ 210.00</span>
615 |               </div>
616 |               <div className="flex items-center justify-between">
617 |                 <div>
618 |                   <div className="font-medium">Rent</div>
619 |                   <div className="text-xs text-muted-foreground">Due in 15 days</div>
620 |                 </div>
621 |                 <span className="font-medium text-rose-500">R$ 900.00</span>
622 |               </div>
623 |             </div>
624 |           </CardContent>
625 |
626 |           <CardFooter className="mt-4">
627 |             <Button variant="outline" className="w-full text-xs">
628 |               View All Upcoming Payments
629 |             </Button>
630 |           </CardFooter>
631 |         </Card>
632 |       </div>
633 |     </div>
634 |   );
635 | }
```

src/components/ui/button.tsx

```
1 | import { Slot } from '@radix-ui/react-slot';
2 | import { cva, type VariantProps } from 'class-variance-authority';
3 | import * as React from 'react';
4 |
5 | import { cn } from '@/lib/utils';
6 |
7 | const buttonVariants = cva(
8 |   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
9 |   {
10 |     variants: {
11 |       variant: {
12 |         default: 'bg-primary text-primary-foreground hover:bg-primary/90',
13 |         destructive:
14 |           'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
15 |         outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
16 |         secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
17 |         ghost: 'hover:bg-accent hover:text-accent-foreground',
18 |         link: 'text-primary underline-offset-4 hover:underline',
19 |       },
20 |       size: {
21 |         default: 'h-9 px-4 py-2 has-[>svg]:px-3',
22 |         sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
23 |         lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
24 |         icon: 'size-9',
25 |       },
26 |     },
27 |     defaultVariants: {
28 |       variant: 'default',
29 |       size: 'default',
30 |     },
31 |   }
32 | );
33 |
34 | function Button({
35 |   className,
36 |   variant,
37 |   size,
38 |   asChild = false,
39 |   ...props
40 | }: React.ComponentProps<'button'> &
41 |   VariantProps<typeof buttonVariants> & {
42 |     asChild?: boolean;
43 |   }) {
44 |   const Comp = asChild ? Slot : 'button';
45 |
46 |   return (
47 |     <Comp
48 |       data-slot="button"
49 |       className={cn(buttonVariants({ variant, size, className }))}
50 |       {...props}
51 |     />
52 |   );
53 | }
54 |
55 | export { Button, buttonVariants };
```

src/components/ui/card.tsx

```
1 | import * as React from 'react';
2 |
3 | import { cn } from '@/lib/utils';
4 |
5 | function Card({ className, ...props }: React.ComponentProps<'div'>) {
6 |   return (
7 |     <div
8 |       data-slot="card"
9 |       className={cn(
10 |         'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-8',
11 |         className
12 |       )}
13 |       {...props}
14 |     />
15 |   );
16 | }
17 |
18 | function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
19 |   return (
20 |     <div
21 |       data-slot="card-header"
22 |       className={cn('flex flex-col gap-1.5 px-8', className)}
23 |       {...props}
24 |     />
25 |   );
26 | }
27 |
28 | function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
29 |   return (
30 |     <div
31 |       data-slot="card-title"
32 |       className={cn('leading-none font-semibold', className)}
33 |       {...props}
34 |     />
35 |   );
36 | }
37 |
38 | function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
39 |   return (
40 |     <div
41 |       data-slot="card-description"
42 |       className={cn('text-muted-foreground text-sm', className)}
43 |       {...props}
44 |     />
45 |   );
46 | }
47 |
48 | function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
49 |   return <div data-slot="card-content" className={cn('px-8', className)} {...props} />;
50 | }
51 |
52 | function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
53 |   return (
54 |     <div
55 |       data-slot="card-footer"
56 |       className={cn('flex flex-row items-center px-8', className)}
57 |       {...props}
58 |     />
59 |   );
60 | }
61 |
62 | export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```

src/components/ui/form.tsx

```
1 | 'use client';
2 |
3 | import { Slot } from '@radix-ui/react-slot';
4 | import * as React from 'react';
5 | import {
6 |   Controller,
7 |   FormProvider,
8 |   useFormContext,
9 |   useFormState,
10 |   type ControllerProps,
11 |   type FieldPath,
12 |   type FieldValues,
13 | } from 'react-hook-form';
14 |
15 | import { Label } from '@/components/ui/label';
16 | import { cn } from '@/lib/utils';
17 |
18 | import type * as LabelPrimitive from '@radix-ui/react-label';
19 |
20 | const Form = FormProvider;
21 |
22 | interface FormFieldContextValue<
23 |   TFieldValues extends FieldValues = FieldValues,
24 |   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
25 | > {
26 |   name: TName;
27 | }
28 |
29 | const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);
30 |
31 | const FormField = <
32 |   TFieldValues extends FieldValues = FieldValues,
33 |   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
34 | >({
35 |   ...props
36 | }: ControllerProps<TFieldValues, TName>) => {
37 |   return (
38 |     <FormFieldContext.Provider value={{ name: props.name }}>
39 |       <Controller {...props} />
40 |     </FormFieldContext.Provider>
41 |   );
42 | };
43 |
44 | const useFormField = () => {
45 |   const fieldContext = React.useContext(FormFieldContext);
46 |   const itemContext = React.useContext(FormItemContext);
47 |   const { getFieldState } = useFormContext();
48 |   const formState = useFormState({ name: fieldContext.name });
49 |   const fieldState = getFieldState(fieldContext.name, formState);
50 |
51 |   if (!fieldContext) {
52 |     throw new Error('useFormField should be used within <FormField>');
53 |   }
54 |
55 |   const { id } = itemContext;
56 |
57 |   return {
58 |     id,
59 |     name: fieldContext.name,
60 |     formItemId: `${id}-form-item`,
61 |     formDescriptionId: `${id}-form-item-description`,
62 |     formMessageId: `${id}-form-item-message`,
63 |     ...fieldState,
64 |   };
65 | };
66 |
67 | interface FormItemContextValue {
68 |   id: string;
69 | }
70 |
71 | const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);
72 |
73 | function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
74 |   const id = React.useId();
75 |
76 |   return (
77 |     <FormItemContext.Provider value={{ id }}>
78 |       <div data-slot="form-item" className={cn('grid gap-2', className)} {...props} />
79 |     </FormItemContext.Provider>
80 |   );
81 | }
82 |
83 | function FormLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
84 |   const { error, formItemId } = useFormField();
85 |
86 |   return (
87 |     <Label
88 |       data-slot="form-label"
89 |       data-error={!!error}
90 |       className={cn('data-[error=true]:text-destructive-foreground', className)}
91 |       htmlFor={formItemId}
92 |       {...props}
93 |     />
94 |   );
95 | }
96 |
97 | function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
98 |   const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
99 |
100 |   return (
101 |     <Slot
102 |       data-slot="form-control"
103 |       id={formItemId}
104 |       aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
105 |       aria-invalid={!!error}
106 |       {...props}
107 |     />
108 |   );
109 | }
110 |
111 | function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
112 |   const { formDescriptionId } = useFormField();
113 |
114 |   return (
115 |     <p
116 |       data-slot="form-description"
117 |       id={formDescriptionId}
118 |       className={cn('text-muted-foreground text-sm', className)}
119 |       {...props}
120 |     />
121 |   );
122 | }
123 |
124 | function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
125 |   const { error, formMessageId } = useFormField();
126 |   const body = error ? String(error?.message ?? '') : props.children;
127 |
128 |   if (!body) {
129 |     return null;
130 |   }
131 |
132 |   return (
133 |     <p
134 |       data-slot="form-message"
135 |       id={formMessageId}
136 |       className={cn('text-destructive-foreground text-sm', className)}
137 |       {...props}
138 |     >
139 |       {body}
140 |     </p>
141 |   );
142 | }
143 |
144 | export {
145 |   useFormField,
146 |   Form,
147 |   FormItem,
148 |   FormLabel,
149 |   FormControl,
150 |   FormDescription,
151 |   FormMessage,
152 |   FormField,
153 | };
```

src/components/ui/input.tsx

```
1 | import * as React from 'react';
2 |
3 | import { cn } from '@/lib/utils';
4 |
5 | function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
6 |   return (
7 |     <input
8 |       type={type}
9 |       data-slot="input"
10 |       className={cn(
11 |         'border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
12 |         'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
13 |         'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
14 |         className
15 |       )}
16 |       {...props}
17 |     />
18 |   );
19 | }
20 |
21 | export { Input };
```

src/components/ui/label.tsx

```
1 | 'use client';
2 |
3 | import * as LabelPrimitive from '@radix-ui/react-label';
4 | import * as React from 'react';
5 |
6 | import { cn } from '@/lib/utils';
7 |
8 | function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
9 |   return (
10 |     <LabelPrimitive.Root
11 |       data-slot="label"
12 |       className={cn(
13 |         'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
14 |         className
15 |       )}
16 |       {...props}
17 |     />
18 |   );
19 | }
20 |
21 | export { Label };
```

src/components/ui/select.tsx

```
1 | 'use client';
2 |
3 | import * as SelectPrimitive from '@radix-ui/react-select';
4 | import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
5 | import * as React from 'react';
6 |
7 | import { cn } from '@/lib/utils';
8 |
9 | function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
10 |   return <SelectPrimitive.Root data-slot="select" {...props} />;
11 | }
12 |
13 | function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
14 |   return <SelectPrimitive.Group data-slot="select-group" {...props} />;
15 | }
16 |
17 | function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
18 |   return <SelectPrimitive.Value data-slot="select-value" {...props} />;
19 | }
20 |
21 | function SelectTrigger({
22 |   className,
23 |   children,
24 |   ...props
25 | }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
26 |   return (
27 |     <SelectPrimitive.Trigger
28 |       data-slot="select-trigger"
29 |       className={cn(
30 |         "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
31 |         className
32 |       )}
33 |       {...props}
34 |     >
35 |       {children}
36 |       <SelectPrimitive.Icon asChild>
37 |         <ChevronDownIcon className="size-4 opacity-50" />
38 |       </SelectPrimitive.Icon>
39 |     </SelectPrimitive.Trigger>
40 |   );
41 | }
42 |
43 | function SelectContent({
44 |   className,
45 |   children,
46 |   position = 'popper',
47 |   ...props
48 | }: React.ComponentProps<typeof SelectPrimitive.Content>) {
49 |   return (
50 |     <SelectPrimitive.Portal>
51 |       <SelectPrimitive.Content
52 |         data-slot="select-content"
53 |         className={cn(
54 |           'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border',
55 |           position === 'popper' &&
56 |             'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
57 |           className
58 |         )}
59 |         position={position}
60 |         {...props}
61 |       >
62 |         <SelectScrollUpButton />
63 |         <SelectPrimitive.Viewport
64 |           className={cn(
65 |             'p-1',
66 |             position === 'popper' &&
67 |               'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
68 |           )}
69 |         >
70 |           {children}
71 |         </SelectPrimitive.Viewport>
72 |         <SelectScrollDownButton />
73 |       </SelectPrimitive.Content>
74 |     </SelectPrimitive.Portal>
75 |   );
76 | }
77 |
78 | function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
79 |   return (
80 |     <SelectPrimitive.Label
81 |       data-slot="select-label"
82 |       className={cn('px-2 py-1.5 text-sm font-medium', className)}
83 |       {...props}
84 |     />
85 |   );
86 | }
87 |
88 | function SelectItem({
89 |   className,
90 |   children,
91 |   ...props
92 | }: React.ComponentProps<typeof SelectPrimitive.Item>) {
93 |   return (
94 |     <SelectPrimitive.Item
95 |       data-slot="select-item"
96 |       className={cn(
97 |         "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
98 |         className
99 |       )}
100 |       {...props}
101 |     >
102 |       <span className="absolute right-2 flex size-3.5 items-center justify-center">
103 |         <SelectPrimitive.ItemIndicator>
104 |           <CheckIcon className="size-4" />
105 |         </SelectPrimitive.ItemIndicator>
106 |       </span>
107 |       <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
108 |     </SelectPrimitive.Item>
109 |   );
110 | }
111 |
112 | function SelectSeparator({
113 |   className,
114 |   ...props
115 | }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
116 |   return (
117 |     <SelectPrimitive.Separator
118 |       data-slot="select-separator"
119 |       className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
120 |       {...props}
121 |     />
122 |   );
123 | }
124 |
125 | function SelectScrollUpButton({
126 |   className,
127 |   ...props
128 | }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
129 |   return (
130 |     <SelectPrimitive.ScrollUpButton
131 |       data-slot="select-scroll-up-button"
132 |       className={cn('flex cursor-default items-center justify-center py-1', className)}
133 |       {...props}
134 |     >
135 |       <ChevronUpIcon className="size-4" />
136 |     </SelectPrimitive.ScrollUpButton>
137 |   );
138 | }
139 |
140 | function SelectScrollDownButton({
141 |   className,
142 |   ...props
143 | }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
144 |   return (
145 |     <SelectPrimitive.ScrollDownButton
146 |       data-slot="select-scroll-down-button"
147 |       className={cn('flex cursor-default items-center justify-center py-1', className)}
148 |       {...props}
149 |     >
150 |       <ChevronDownIcon className="size-4" />
151 |     </SelectPrimitive.ScrollDownButton>
152 |   );
153 | }
154 |
155 | export {
156 |   Select,
157 |   SelectContent,
158 |   SelectGroup,
159 |   SelectItem,
160 |   SelectLabel,
161 |   SelectScrollDownButton,
162 |   SelectScrollUpButton,
163 |   SelectSeparator,
164 |   SelectTrigger,
165 |   SelectValue,
166 | };
```

src/components/ui/textarea.tsx

```
1 | import * as React from 'react';
2 |
3 | import { cn } from '@/lib/utils';
4 |
5 | const Textarea = React.forwardRef<
6 |   HTMLTextAreaElement,
7 |   React.TextareaHTMLAttributes<HTMLTextAreaElement>
8 | >(({ className, ...props }, ref) => {
9 |   return (
10 |     <textarea
11 |       className={cn(
12 |         'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
13 |         className
14 |       )}
15 |       ref={ref}
16 |       {...props}
17 |     />
18 |   );
19 | });
20 | Textarea.displayName = 'Textarea';
21 |
22 | export { Textarea };
```

src/lib/ai/types.ts

```
1 | // Define transaction types
2 | export enum TransactionType {
3 |   INCOME = 'INCOME',
4 |   OUTCOME = 'OUTCOME',
5 |   TRANSFER = 'TRANSFER',
6 | }
7 |
8 | // Define transaction categories
9 | export enum TransactionCategory {
10 |   // Income categories
11 |   SALARY = 'SALARY',
12 |   INVESTMENT_INCOME = 'INVESTMENT_INCOME', // Keep this as income from investments, not the investments themselves
13 |   REIMBURSEMENT = 'REIMBURSEMENT',
14 |   GIFT = 'GIFT',
15 |   OTHER_INCOME = 'OTHER_INCOME',
16 |
17 |   // Expense categories
18 |   GROCERIES = 'GROCERIES',
19 |   DINING = 'DINING',
20 |   ENTERTAINMENT = 'ENTERTAINMENT',
21 |   TRANSPORTATION = 'TRANSPORTATION',
22 |   UTILITIES = 'UTILITIES',
23 |   HOUSING = 'HOUSING',
24 |   HEALTH = 'HEALTH',
25 |   EDUCATION = 'EDUCATION',
26 |   SHOPPING = 'SHOPPING',
27 |   TRAVEL = 'TRAVEL',
28 |   PERSONAL_CARE = 'PERSONAL_CARE',
29 |   SUBSCRIPTIONS = 'SUBSCRIPTIONS',
30 |   OTHER_EXPENSE = 'OTHER_EXPENSE',
31 |
32 |   // Transfer category
33 |   TRANSFER = 'TRANSFER',
34 |
35 |   // Specific to Brazilian financial system
36 |   PIX = 'PIX',
37 |   BOLETO = 'BOLETO',
38 |   CREDIT_CARD_PAYMENT = 'CREDIT_CARD_PAYMENT',
39 |
40 |   // Unknown/uncategorized
41 |   UNCATEGORIZED = 'UNCATEGORIZED',
42 | }
43 |
44 | // Define investment categories - separate from transaction categories
45 | export enum InvestmentCategory {
46 |   // General investment types
47 |   STOCKS = 'STOCKS',
48 |   BONDS = 'BONDS',
49 |   MUTUAL_FUNDS = 'MUTUAL_FUNDS',
50 |   ETFS = 'ETFS',
51 |   CRYPTOCURRENCY = 'CRYPTOCURRENCY',
52 |   REAL_ESTATE = 'REAL_ESTATE',
53 |   RETIREMENT = 'RETIREMENT',
54 |   SAVINGS = 'SAVINGS',
55 |   FIXED_INCOME = 'FIXED_INCOME',
56 |
57 |   // Brazilian-specific investment types
58 |   TESOURO_DIRETO = 'TESOURO_DIRETO',
59 |   CDB = 'CDB',
60 |   LCI = 'LCI',
61 |   LCA = 'LCA',
62 |   DEBENTURES = 'DEBENTURES',
63 |   FUNDOS_IMOBILIARIOS = 'FUNDOS_IMOBILIARIOS',
64 |
65 |   // Other
66 |   OTHER = 'OTHER',
67 |   UNCATEGORIZED = 'UNCATEGORIZED',
68 | }
69 |
70 | // Define investment asset classes
71 | export enum AssetClass {
72 |   EQUITY = 'EQUITY', // Stocks, ETFs
73 |   FIXED_INCOME = 'FIXED_INCOME', // Bonds, CDs, Treasury
74 |   CASH = 'CASH', // Savings, Money Market
75 |   CRYPTOCURRENCY = 'CRYPTOCURRENCY', // Bitcoin, Ethereum, other digital assets
76 |   ALTERNATIVE = 'ALTERNATIVE', // Commodities, Art, Collectibles
77 |   REAL_ESTATE = 'REAL_ESTATE', // Property, REITs
78 |   MIXED = 'MIXED', // Mutual Funds, Mixed Portfolios
79 | }
80 |
81 | // Define investment transaction types
82 | export enum InvestmentTransactionType {
83 |   BUY = 'BUY', // Purchase of investment
84 |   SELL = 'SELL', // Sale of investment
85 |   DIVIDEND = 'DIVIDEND', // Dividend payment
86 |   INTEREST = 'INTEREST', // Interest payment
87 |   DEPOSIT = 'DEPOSIT', // Deposit to investment account
88 |   WITHDRAWAL = 'WITHDRAWAL', // Withdrawal from investment account
89 |   FEE = 'FEE', // Investment-related fee
90 |   SPLIT = 'SPLIT', // Stock split
91 |   MERGER = 'MERGER', // Company merger affecting holdings
92 |   ACQUISITION = 'ACQUISITION', // Company acquisition affecting holdings
93 |   OTHER = 'OTHER', // Other investment transaction
94 | }
```

src/app/(app)/ai-playground/page.tsx

```
1 |
2 | import { TransactionCategorizer } from '@/components/ai-playground/transaction-categorizer';
3 | import { TransactionExtractor } from '@/components/ai-playground/transaction-extractor';
4 |
5 | import type { Metadata } from 'next';
6 |
7 | export const metadata: Metadata = {
8 |   title: 'AI-Powered Playground',
9 |   description: 'Try out our tools for transaction management',
10 | };
11 |
12 | export default function AIPlaygroundPage() {
13 |   return (
14 |     <div className="container mx-auto px-8 py-16 space-y-12">
15 |       <div>
16 |         <h1 className="text-3xl font-bold tracking-tight">AI-Powered Playground</h1>
17 |         <p className="mt-2 text-muted-foreground">Try out our tools for transaction management</p>
18 |       </div>
19 |
20 |       <div className="flex flex-wrap gap-8">
21 |         {/* Transaction Extractor Section */}
22 |         <TransactionExtractor />
23 |
24 |         {/* Transaction Categorizer Section */}
25 |         <TransactionCategorizer />
26 |       </div>
27 |     </div>
28 |   );
29 | }
```
