Project Structure:
├── README.md
├── codefetch
│   └── codebase.md
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── public
├── src
├── tsconfig.json
├── tsconfig.tsbuildinfo
└── vitest.config.ts


.cursorrules
```
1 | ---
2 | description: General rules for NextJS Super Project (Next.js v15+)
3 | globs: \*_/_
4 | ---
5 | 
6 | You are a Senior Full Stack Developer specialized in modern Next.js applications (v15+).
7 | 
8 | ## Agent Behavior
9 | 
10 | The AI should:
11 | 
12 | - Read the `README.md` first to understand the project requirements and structure
13 | - Read the `codebase.md` in folder `codefetch`
14 | - Before coding, write a brief plan of implementation
15 | - Always write/update tests for each new feature or component
16 | - Run tests to confirm each change works as expected
17 | - Update documentation for new components and features
18 | - Follow user requirements carefully and accurately
19 | - Ensure code is complete and production-ready
20 | - Leave NO todos, placeholders, or incomplete implementations
21 | 
22 | ## Honesty and Clarity
23 | 
24 | - If you're uncertain about an answer, say so
25 | - If you don't know the answer, admit it rather than guessing
26 | - Be concise and minimize unnecessary prose
27 | - Include all required imports and dependencies
28 | - Think step-by-step for complex tasks
29 | - Describe your plan before implementing complex solutions
30 | - Confirm understanding before writing code
31 | 
32 | ## Terminal Commands
33 | 
34 | ### NextJS Commands
35 | 
36 | - `pnpm run dev` - Start the development server
37 |   - Use when: Actively developing with hot-reloading
38 |   - The server typically starts at http://localhost:3000
39 | - `pnpm run build` - Build the application for production
40 |   - Use when: Preparing for deployment or testing production build
41 | - `pnpm run start` - Start the production server
42 |   - Use when: Testing the production build locally
43 | - `pnpm run lint` - Run ESLint to check code quality
44 |   - Use when: Finding and fixing code quality issues
45 | - `pnpm test` - Run tests with Jest and React Testing Library
46 |   - Use when: Verifying that components and logic work as expected
47 |   - Example: `pnpm test -- --watch` to run in watch mode
48 | - `pnpm run test:ci` - Run tests in CI mode
49 |   - Use when: Running tests in a continuous integration environment
50 | 
51 | ### Best Practices
52 | 
53 | - Always run commands from the project root directory
54 | - Run both lint and tests before committing changes
55 | - Use watch mode during active development
56 | - Always verify that the build succeeds before deployment
57 | 
58 | ## General Code Standards
59 | 
60 | - Use TypeScript for all `.ts` and `.tsx` files
61 | - Follow the Next.js App Router project structure
62 | - Implement routing using Next.js App Router file-based routing system
63 | - Leverage Next.js v15+ features like React Server Components, Server Actions, and enhanced Image component
64 | - Properly distinguish between Server Components and Client Components with 'use client' directive
65 | - Implement proper loading, error, and not-found states using Next.js conventions
66 | - Use descriptive names for variables, functions, and components
67 | - Keep components small and focused on a single responsibility
68 | - Follow DRY (Don't Repeat Yourself) principles
69 | - Write bug-free, fully functional, and working code
70 | - Prioritize code readability over premature optimization
71 | - Use the latest React and Next.js features appropriately
72 | - Write comprehensive unit and integration tests
73 | - Implement proper accessibility (a11y) features
74 | - Use constants instead of raw values
75 | - Define TypeScript types and interfaces for all props and state
76 | - NEVER use the `any` type - always define proper types for all variables, parameters, and return values
77 | 
78 | ## Testing Standards
79 | 
80 | - Test components in isolation
81 | - Test both UI rendering and functionality
82 | - Use React Testing Library best practices
83 | - Test server-side functionality separately
84 | - Keep tests independent and isolated
85 | - Tests should be repeatable with consistent results
86 | - Tests should be readable and maintainable
87 | - Tests should run quickly
88 | - Test both positive and negative scenarios
89 | - Test edge cases and boundary conditions
90 | - Follow the AAA (Arrange-Act-Assert) pattern
91 | - Use descriptive test names
92 | - Mock external dependencies appropriately
93 | 
94 | ## Prompt Engineering Standards
95 | 
96 | - Design prompts using Vercel AI SDK's structured output generation
97 | - Use Zod schemas with proper `.describe()` annotations for all schema properties
98 | - Focus on financial domain specificity with special attention to:
99 |   - Banking terminology (transfers, deposits, withdrawals)
100 |   - Transaction categorization patterns
101 |   - Financial instruments and investment types
102 |   - Currency handling and formatting
103 |   - Brazilian financial system specifics
104 | - Create prompts that are language-aware and preserve original language in text fields
105 | - Implement error handling using the SDK's warning system
106 | - Use low temperature settings (0.1-0.3) explicitly set in SDK parameters
107 | - Leverage tool calling with descriptive, focused tools (keep under 5 tools per prompt)
108 | - Design two-stage processing where appropriate:
109 |   - First stage for extraction/detection
110 |   - Second stage for classification/categorization
111 | - Test prompts with diverse financial data samples across multiple languages
112 | - Use proper SDK debugging techniques to inspect and improve prompts
113 | - Organize schemas logically with proper naming conventions
114 | - Implement appropriate transformers for complex data types like dates
115 | - Balance schema complexity with model capabilities
116 | - Integrate AI components with proper server action patterns
117 | 
118 | ## Additional Guidance
119 | 
120 | - Use Next.js's optimized Image component for images
121 | - Implement SEO best practices with the Metadata API
122 | - Use Route Handlers for API functionality
123 | - Leverage Next.js's built-in CSS support (CSS Modules, Styled JSX, or Tailwind)
124 | - Implement proper error boundaries with error.tsx files
125 | - Use appropriate data fetching methods based on requirements:
126 |   - Use React Server Components for server-side data fetching
127 |   - Implement proper fetch caching options
128 |   - Use revalidation strategies appropriately
129 |   - Use SWR or React Query for client-side data fetching
130 | - Optimize for performance using Next.js best practices
131 | - Implement proper state management (React Context, Redux, Zustand, etc.)
132 | - Follow best practices for authentication and authorization
133 | - Use environment variables for configuration
134 | - Implement proper form validation and handling with Server Actions
135 | - Follow responsive design principles
136 | 
137 | ## TypeScript Best Practices
138 | 
139 | - NEVER use the `any` type in the codebase
140 | - Always define explicit types for variables, parameters, function returns, and component props
141 | - Use proper type narrowing techniques instead of type assertions when possible
142 | - When type assertions are necessary, use 'as' syntax with the most specific type possible
143 | - Use union types to represent variables that can have multiple types
144 | - Use intersection types to combine types
145 | - Leverage TypeScript's utility types (Partial, Required, Pick, Omit, etc.)
146 | - Create reusable type definitions for common data structures
147 | - Use generics for flexible, reusable components and functions
148 | - Enable strict mode in TypeScript configuration
149 | - Use readonly for immutable properties
150 | - Use proper null handling with optional chaining and nullish coalescing
151 | - Define constants with literal types when appropriate
152 | - Use enums for related constants with semantic meaning
153 | - Test TypeScript types with test cases that would fail to compile if the types are incorrect
154 | 
155 | <available_instructions>
156 | Cursor rules are user provided instructions for the AI to follow to help work with the codebase.
157 | They may or may not be relevent to the task at hand. If they are, use the fetch_rules tool to fetch the full rule.
158 | Some rules may be automatically attached to the conversation if the user attaches a file that matches the rule's glob, and wont need to be fetched.
159 | 
160 | nextjs: Next.js v15+ specific rules
161 | performance: Performance optimization specific rules for Next.js v15+
162 | api: API and Backend specific rules for Next.js v15+
163 | react: React specific rules
164 | colors: Color system and theming guidelines
165 | tailwind: Tailwind CSS v4 specific rules
166 | testing: Testing specific rules for Next.js v15+
167 | typescript: TypeScript specific rules
168 | prompts: Prompt engineering guidelines for Finance Mind's AI components
169 | </available_instructions>
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
7 | import prettierConfig from 'eslint-config-prettier';
8 | import importPlugin from 'eslint-plugin-import';
9 | import unusedImportsPlugin from 'eslint-plugin-unused-imports';
10 | 
11 | const __filename = fileURLToPath(import.meta.url);
12 | const __dirname = dirname(__filename);
13 | 
14 | const compat = new FlatCompat({
15 |   baseDirectory: __dirname,
16 | });
17 | 
18 | const eslintConfig = [
19 |   // Base configurations
20 |   ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
21 | 
22 |   // Prettier config to turn off ESLint rules that conflict with Prettier
23 |   prettierConfig,
24 | 
25 |   // Common JavaScript/TypeScript rules
26 |   {
27 |     files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
28 |     plugins: {
29 |       import: importPlugin,
30 |       'unused-imports': unusedImportsPlugin,
31 |     },
32 |     rules: {
33 |       // Import sorting rules
34 |       'import/first': 'error',
35 |       'import/newline-after-import': 'error',
36 |       'import/no-duplicates': 'error',
37 |       // Unused imports auto-fix rules
38 |       'unused-imports/no-unused-imports': 'error',
39 |       'unused-imports/no-unused-vars': [
40 |         'warn',
41 |         {
42 |           vars: 'all',
43 |           varsIgnorePattern: '^_',
44 |           args: 'after-used',
45 |           argsIgnorePattern: '^_',
46 |         },
47 |       ],
48 |       'import/order': [
49 |         'error',
50 |         {
51 |           groups: [
52 |             'builtin', // Node.js built-in modules
53 |             'external', // Packages from node_modules
54 |             'internal', // Absolute imports within the project (using paths alias)
55 |             'parent', // Imports from parent directories
56 |             'sibling', // Imports from sibling directories
57 |             'index', // Index imports
58 |             'object', // Object imports
59 |             'type', // Type imports
60 |           ],
61 |           'newlines-between': 'always',
62 |           alphabetize: {
63 |             order: 'asc',
64 |             caseInsensitive: true,
65 |           },
66 |           pathGroups: [
67 |             // Optional: if you're using path aliases, define them here
68 |             // Example for a common 'components' alias
69 |             // {
70 |             //   'pattern': '@/components/**',
71 |             //   'group': 'internal',
72 |             //   'position': 'before'
73 |             // },
74 |           ],
75 |         },
76 |       ],
77 |     },
78 |   },
79 |   // TypeScript-specific configuration
80 |   {
81 |     files: ['**/*.{ts,tsx}'],
82 |     languageOptions: {
83 |       parser: typescriptParser,
84 |       parserOptions: {
85 |         ecmaVersion: 'latest',
86 |         sourceType: 'module',
87 |         project: './tsconfig.json',
88 |       },
89 |     },
90 |     plugins: {
91 |       '@typescript-eslint': typescriptPlugin,
92 |     },
93 |     rules: {
94 |       // TypeScript-specific rules
95 |       '@typescript-eslint/explicit-module-boundary-types': 'off', // Next.js doesn't need explicit return types
96 |       '@typescript-eslint/no-explicit-any': 'warn', // Avoid using 'any' type
97 |       // Disable the TypeScript unused vars rule in favor of the unused-imports plugin
98 |       '@typescript-eslint/no-unused-vars': 'off',
99 |       '@typescript-eslint/no-non-null-assertion': 'warn', // Warn about non-null assertions
100 |       '@typescript-eslint/consistent-type-imports': [
101 |         'error',
102 |         {
103 |           prefer: 'type-imports',
104 |           fixStyle: 'separate-type-imports',
105 |         },
106 |       ], // Enforce consistent type imports
107 |       '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // Prefer interfaces over types
108 |       '@typescript-eslint/ban-ts-comment': [
109 |         'error',
110 |         {
111 |           'ts-ignore': 'allow-with-description',
112 |           'ts-expect-error': 'allow-with-description',
113 |         },
114 |       ], // Only allow TS-ignore comments with descriptions
115 |     },
116 |   },
117 | ];
118 | 
119 | export default eslintConfig;
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
12 |     "lint:fix": "next lint --fix",
13 |     "test": "vitest run",
14 |     "test:watch": "vitest"
15 |   },
16 |   "dependencies": {
17 |     "@ai-sdk/openai": "^1.2.1",
18 |     "@ai-sdk/react": "^1.1.21",
19 |     "@hookform/resolvers": "^4.1.3",
20 |     "@radix-ui/react-dropdown-menu": "^2.1.6",
21 |     "@radix-ui/react-label": "^2.1.2",
22 |     "@radix-ui/react-popover": "^1.1.6",
23 |     "@radix-ui/react-select": "^2.1.6",
24 |     "@radix-ui/react-slot": "^1.1.2",
25 |     "@radix-ui/react-tabs": "^1.1.3",
26 |     "@vercel/analytics": "^1.5.0",
27 |     "ai": "^4.1.54",
28 |     "chrono-node": "^2.7.8",
29 |     "date-fns": "^4.1.0",
30 |     "next": "15.2.1",
31 |     "next-themes": "^0.4.4",
32 |     "pdfjs-dist": "^4.2.41",
33 |     "react": "^19.0.0",
34 |     "react-day-picker": "^9.6.0",
35 |     "react-dom": "^19.0.0",
36 |     "react-dropzone": "^14.3.8",
37 |     "react-hook-form": "^7.54.2",
38 |     "react-icons": "^5.5.0",
39 |     "sonner": "^2.0.1",
40 |     "tailwind-merge": "^3.0.2",
41 |     "zod": "^3.24.2"
42 |   },
43 |   "devDependencies": {
44 |     "@eslint/eslintrc": "^3",
45 |     "@shadcn/ui": "^0.0.4",
46 |     "@tailwindcss/postcss": "^4",
47 |     "@types/jest": "^29.5.14",
48 |     "@types/node": "^20",
49 |     "@types/pdfjs-dist": "^2.10.378",
50 |     "@types/react": "^19",
51 |     "@types/react-dom": "^19",
52 |     "@typescript-eslint/eslint-plugin": "^8.26.0",
53 |     "@typescript-eslint/parser": "^8.26.0",
54 |     "class-variance-authority": "^0.7.1",
55 |     "clsx": "^2.1.1",
56 |     "eslint": "^9",
57 |     "eslint-config-next": "15.2.1",
58 |     "eslint-config-prettier": "^10.1.1",
59 |     "eslint-plugin-import": "^2.31.0",
60 |     "eslint-plugin-prettier": "^5.2.3",
61 |     "eslint-plugin-unused-imports": "^4.1.4",
62 |     "lucide-react": "^0.479.0",
63 |     "prettier": "^3.5.3",
64 |     "tailwindcss": "^4",
65 |     "tailwindcss-animate": "^1.0.7",
66 |     "typescript": "^5",
67 |     "vitest": "^3.0.8"
68 |   }
69 | }
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

vitest.config.ts
```
1 | import { resolve } from 'path';
2 | 
3 | import { defineConfig } from 'vitest/config';
4 | 
5 | export default defineConfig({
6 |   test: {
7 |     environment: 'node',
8 |   },
9 |   resolve: {
10 |     alias: {
11 |       '@': resolve(__dirname, './src'),
12 |     },
13 |   },
14 | });
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
```
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
```

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

.cursor/rules/prompts.mdc
```
1 | ---
2 | description: Prompt engineering guidelines for Finance Mind's AI components using Vercel AI SDK
3 | globs: src/actions/ai/**/*
4 | ---
5 | 
6 | You are a prompt engineering expert specializing in financial AI systems for the Finance Mind application, with deep knowledge of Vercel AI SDK implementation.
7 | 
8 | # Prompt Engineering with Vercel AI SDK for Finance Mind
9 | 
10 | ## Core Principles
11 | 
12 | 1. **Financial Domain Specificity**: All prompts must be tailored to financial contexts with special attention to:
13 |    - Banking terminology accuracy
14 |    - Transaction categorization patterns
15 |    - Financial instruments and their characteristics
16 |    - Multi-currency handling and formatting
17 |    - Brazilian financial system specifics (PIX, boletos, parcelamentos)
18 | 
19 | 2. **Structured Output Generation**: Leverage Vercel AI SDK's `generateObject` for deterministic structured responses:
20 |    - Define Zod schemas for validation and type safety
21 |    - Add `.describe("...")` to Zod schema properties to guide the model
22 |    - Use transformers for complex data types like dates
23 |    - Keep schema complexity manageable for better model performance
24 | 
25 | 3. **Language Preservation**: Create prompts that are language-aware:
26 |    - Detect input language automatically
27 |    - Preserve original language in text fields (descriptions, merchant names)
28 |    - Standardize only category and type values to English constants
29 |    - Handle date expressions in multiple languages (Portuguese, English, Spanish)
30 | 
31 | 4. **Schema-First Approach**: Begin with the end in mind:
32 |    - Define Zod schemas before writing prompts
33 |    - Create clear property descriptions in schemas
34 |    - Use semantic naming for all schema properties
35 |    - Implement proper transformers for data conversion
36 | 
37 | ## Vercel AI SDK Implementation
38 | 
39 | ### Transaction Field Extraction Example
40 | 
41 | ```typescript
42 | import { generateObject } from 'ai';
43 | import { openai } from '@ai-sdk/openai';
44 | import { z } from 'zod';
45 | 
46 | // Define schema with Zod for type safety and validation
47 | const transactionSchema = z.object({
48 |   description: z.string().describe("Cleaned transaction description in original language"),
49 |   amount: z.number().describe("Transaction amount - positive for income, negative for expenses"),
50 |   date: z.string()
51 |     .datetime()
52 |     .describe("ISO format date of the transaction")
53 |     .transform(value => new Date(value)),
54 |   merchant: z.string().nullable().describe("Merchant name if present, null otherwise"),
55 |   category: z.string().describe("Predefined transaction category"),
56 |   type: z.enum(["INCOME", "OUTCOME", "TRANSFER"]).describe("Transaction type"),
57 |   isInstallment: z.boolean().describe("Whether this is an installment payment"),
58 |   installmentNumber: z.number().nullable().describe("Current installment number if applicable"),
59 |   totalInstallments: z.number().nullable().describe("Total number of installments if applicable"),
60 |   currency: z.string().default("BRL").describe("ISO currency code")
61 | });
62 | 
63 | // Extract transaction data from user input
64 | export async function extractTransactionFields(userInput: string) {
65 |   try {
66 |     const result = await generateObject({
67 |       model: openai('gpt-4-turbo'),
68 |       schema: transactionSchema,
69 |       prompt: `You are a financial data extraction expert for Finance Mind.
70 | Extract structured transaction data from the user's input.
71 | 
72 | INPUT GUIDELINES:
73 | - Input may be in any language (primarily Portuguese, English, or Spanish)
74 | - Input may contain transaction details in natural language format
75 | - Input may include dates in various formats
76 | - Input may include currency amounts
77 | - Input may include merchant names
78 | 
79 | OUTPUT REQUIREMENTS:
80 | Return a structured transaction object following the schema provided.
81 | 
82 | EXAMPLES:
83 | Input: "150 para corrida de uber ontem"
84 | Output: {
85 |   "description": "Corrida de Uber",
86 |   "amount": -150,
87 |   "date": "2023-09-15T00:00:00.000Z", // assuming yesterday was this date
88 |   "merchant": "Uber",
89 |   "category": "TRANSPORTATION",
90 |   "type": "OUTCOME",
91 |   "isInstallment": false,
92 |   "installmentNumber": null,
93 |   "totalInstallments": null,
94 |   "currency": "BRL"
95 | }
96 | 
97 | Input: "${userInput}"`,
98 |       temperature: 0.2, // Low temperature for consistent results
99 |     });
100 | 
101 |     // Check for warnings
102 |     if (result.warnings && result.warnings.length > 0) {
103 |       console.warn('Extraction warnings:', result.warnings);
104 |     }
105 | 
106 |     return result;
107 |   } catch (error) {
108 |     console.error('Transaction extraction error:', error);
109 |     throw error;
110 |   }
111 | }
112 | ```
113 | 
114 | ### Transaction Categorization with Tool Calling
115 | 
116 | ```typescript
117 | import { generateObject } from 'ai';
118 | import { openai } from '@ai-sdk/openai';
119 | import { z } from 'zod';
120 | 
121 | // Define the categorization schema
122 | const categorizationSchema = z.object({
123 |   category: z.string().describe("Predefined transaction category"),
124 |   type: z.enum(["INCOME", "OUTCOME", "TRANSFER"]).describe("Transaction type"),
125 |   confidence: z.number().min(0).max(1).describe("Confidence level from 0.0 to 1.0"),
126 |   merchant: z.string().nullable().describe("Formatted merchant name if available"),
127 |   isInstallment: z.boolean().describe("Whether this is an installment payment"),
128 |   installmentNumber: z.number().nullable().describe("Current installment number if detected"),
129 |   totalInstallments: z.number().nullable().describe("Total number of installments if detected"),
130 |   isInternalTransfer: z.boolean().describe("Whether this is a transfer between user's own accounts"),
131 |   tags: z.array(z.string()).describe("Optional tags for further classification")
132 | });
133 | 
134 | // Define tools for enhanced transaction categorization
135 | const tools = [
136 |   {
137 |     name: "checkMerchantDatabase",
138 |     description: "Check for merchant information in our database to aid categorization",
139 |     parameters: z.object({
140 |       merchantName: z.string().describe("The name of the merchant to look up"),
141 |     }),
142 |   },
143 |   {
144 |     name: "detectTransferPattern",
145 |     description: "Detect if a transaction description matches known transfer patterns",
146 |     parameters: z.object({
147 |       description: z.string().describe("The transaction description to analyze"),
148 |     }),
149 |   }
150 | ];
151 | 
152 | // Categorize transaction data
153 | export async function categorizeTransaction(transactionData) {
154 |   try {
155 |     const result = await generateObject({
156 |       model: openai('gpt-4-turbo'),
157 |       schema: categorizationSchema,
158 |       tools,
159 |       prompt: `You are a financial transaction categorization expert for Finance Mind.
160 | Analyze the transaction details and determine the appropriate category, type, and other metadata.
161 | 
162 | INPUT:
163 | ${JSON.stringify(transactionData, null, 2)}
164 | 
165 | CATEGORIES:
166 | FOOD_DINING: Restaurants, food delivery, groceries, etc.
167 | SHOPPING: Retail purchases, online shopping, etc.
168 | TRANSPORTATION: Uber, taxis, public transit, fuel, etc.
169 | UTILITIES: Electricity, water, internet, phone, etc.
170 | HOUSING: Rent, mortgage, home maintenance, etc.
171 | HEALTH_FITNESS: Medical expenses, gym, pharmacy, etc.
172 | ENTERTAINMENT: Movies, games, streaming services, etc.
173 | TRAVEL: Hotels, flights, vacations, etc.
174 | EDUCATION: Tuition, books, courses, etc.
175 | PERSONAL_CARE: Haircuts, spa, beauty products, etc.
176 | INVESTMENT: Stock purchases, mutual funds, etc.
177 | INCOME: Salary, freelance income, etc.
178 | TRANSFER: Money transfers, credit card payments, etc.
179 | CREDIT_CARD_PAYMENT: Credit card bill payments
180 | SUBSCRIPTION: Regular subscription services
181 | OTHER: Miscellaneous expenses
182 | 
183 | BRAZILIAN FINANCIAL SYSTEM SPECIFICS:
184 | - PIX transactions are transfers and should be categorized as TRANSFER
185 | - "Compras parceladas" (installment purchases) should have isInstallment=true
186 | - "Boletos" are typically bill payments
187 | - IOF is a Brazilian financial transaction tax often seen with foreign currency transactions`,
188 |       temperature: 0.2,
189 |       toolChoice: "auto",
190 |     });
191 | 
192 |     // Check for warnings
193 |     if (result.warnings && result.warnings.length > 0) {
194 |       console.warn('Categorization warnings:', result.warnings);
195 |     }
196 | 
197 |     // Log request body for debugging if needed
198 |     // console.log('Request body:', result.request.body);
199 | 
200 |     return result;
201 |   } catch (error) {
202 |     console.error('Transaction categorization error:', error);
203 |     throw error;
204 |   }
205 | }
206 | ```
207 | 
208 | ## Best Practices with Vercel AI SDK
209 | 
210 | 1. **Model Selection**:
211 |    - Use `openai('gpt-4-turbo')` for complex financial reasoning tasks
212 |    - Use `openai('gpt-3.5-turbo')` for simpler categorization tasks 
213 |    - Consider Claude models for enhanced reasoning capabilities
214 |    - Match model capabilities to task complexity
215 | 
216 | 2. **Temperature Settings**:
217 |    - Use temperature 0.1-0.3 for financial data extraction and categorization
218 |    - Explicitly set in the SDK params: `temperature: 0.2`
219 | 
220 | 3. **Tool Design**:
221 |    - Keep tools focused and limited (5 or less per prompt)
222 |    - Use semantically meaningful names
223 |    - Provide clear descriptions for tools and parameters
224 |    - Add parameter descriptions using Zod's `.describe()`
225 | 
226 | 4. **Error Handling and Debugging**:
227 |    - Check `result.warnings` to identify potential issues
228 |    - Inspect request bodies with `result.request.body` when debugging
229 |    - Implement proper error handling with try/catch
230 |    - Log relevant information for troubleshooting
231 | 
232 | 5. **Schema Design**:
233 |    - Keep schemas as simple as possible while meeting requirements
234 |    - Use appropriate Zod validators and transformers
235 |    - Define clear types with descriptive property names
236 |    - Handle date formats with proper transformers
237 | 
238 | 6. **Testing and Iteration**:
239 |    - Test across multiple languages (PT-BR, EN, ES)
240 |    - Test edge cases (negative amounts, future dates, etc.)
241 |    - Systematically track model performance across iterations
242 |    - Document both successful and unsuccessful prompt strategies
243 | 
244 | ## Implementation Guidelines
245 | 
246 | 1. **Project Integration**:
247 |    ```typescript
248 |    // src/lib/ai/index.ts
249 |    import { openai } from '@ai-sdk/openai';
250 |    
251 |    // Configure OpenAI provider
252 |    export const openaiModel = openai(
253 |      process.env.OPENAI_MODEL || 'gpt-4-turbo', 
254 |      { apiKey: process.env.OPENAI_API_KEY }
255 |    );
256 |    
257 |    // Default configuration
258 |    export const defaultConfig = {
259 |      temperature: 0.2,
260 |      maxTokens: 1000,
261 |    };
262 |    ```
263 | 
264 | 2. **Schema Organization**:
265 |    ```typescript
266 |    // src/schemas/transaction-schemas.ts
267 |    import { z } from 'zod';
268 |    
269 |    export const transactionBaseSchema = z.object({
270 |      description: z.string().describe("Transaction description"),
271 |      amount: z.number().describe("Transaction amount"),
272 |      // ... other common properties
273 |    });
274 |    
275 |    export const extractionSchema = transactionBaseSchema.extend({
276 |      // Additional extraction fields
277 |    });
278 |    
279 |    export const categorizationSchema = z.object({
280 |      // Categorization specific fields
281 |    });
282 |    ```
283 | 
284 | 3. **Server Actions Integration**:
285 |    ```typescript
286 |    // src/actions/ai/extract-transaction-fields.ts
287 |    'use server';
288 |    
289 |    import { generateObject } from 'ai';
290 |    import { openaiModel, defaultConfig } from '@/lib/ai';
291 |    import { extractionSchema } from '@/schemas/transaction-schemas';
292 |    
293 |    export async function extractTransactionFields(input: string) {
294 |      // Implementation using Vercel AI SDK
295 |    }
296 |    ```
297 | 
298 | 4. **UI Integration**:
299 |    ```typescript
300 |    'use client';
301 |    
302 |    import { useCompletion } from 'ai/react';
303 |    
304 |    function TransactionInput() {
305 |      const { completion, input, handleInputChange, handleSubmit, isLoading } = 
306 |        useCompletion({
307 |          api: '/api/extract-transaction',
308 |        });
309 |      
310 |      // UI implementation
311 |    }
312 |    ```
313 | 
314 | Remember to inspect and handle warnings from the AI SDK calls to ensure proper integration, and implement appropriate error handling throughout your application. 
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
```
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
```

.cursor/rules/tailwind.mdc
```
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
```

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

src/actions/process-bank-statement.ts
```
1 | 'use server';
2 | 
3 | import { detectP2PTransfer } from '@/actions/ai/detect-person-to-person-transfer';
4 | import { extractCardFromFilename as aiExtractCardFromFilename } from '@/actions/ai/extract-card-info';
5 | import { TransactionType } from '@/lib/ai/types';
6 | import { parseCSV } from '@/lib/parsers/csv-parser';
7 | import { parsePDF } from '@/lib/parsers/pdf-parser';
8 | import { generateTransactionId } from '@/lib/utils/transaction-utils';
9 | 
10 | import { extractTransactionFields } from './ai/extract-transaction-fields';
11 | 
12 | import type { Transaction } from '@/interfaces/transaction';
13 | 
14 | export interface ProcessedStatement {
15 |   transactions: Transaction[];
16 |   errors?: string[];
17 |   warnings?: string[];
18 |   duplicatesSkipped?: number; // Add count of duplicates that were skipped
19 | }
20 | 
21 | /**
22 |  * Process bank statement files (CSV or PDF)
23 |  * @param fileContents Object containing file content as string/ArrayBuffer and metadata
24 |  * @param existingTransactions Optional array of existing transactions to check for duplicates
25 |  * @returns ProcessedStatement object with extracted transactions
26 |  */
27 | export async function processBankStatement(
28 |   fileContents: {
29 |     name: string;
30 |     content: string | ArrayBuffer;
31 |     contentType: string;
32 |   }[],
33 |   existingTransactions: Transaction[] = []
34 | ): Promise<ProcessedStatement> {
35 |   const result: ProcessedStatement = {
36 |     transactions: [],
37 |     errors: [],
38 |     warnings: [],
39 |     duplicatesSkipped: 0,
40 |   };
41 | 
42 |   try {
43 |     const allExtractedTransactions: Transaction[] = [];
44 |     const detectedAccounts: Set<string> = new Set();
45 | 
46 |     // Track existing transaction IDs to avoid duplicates
47 |     const processedTransactionIds: Set<string> = new Set(existingTransactions.map(t => t.id));
48 | 
49 |     // First pass: Extract all transactions from all files
50 |     for (const file of fileContents) {
51 |       try {
52 |         // Extract card info from filename using AI
53 |         const cardInfo = await extractCardInfoFromFilename(file.name);
54 | 
55 |         // Store card/account info for later transfer detection
56 |         if (cardInfo) {
57 |           detectedAccounts.add(cardInfo);
58 |         }
59 | 
60 |         let extractedRows: Array<Record<string, string | number>> = [];
61 | 
62 |         // Parse the file based on its type
63 |         if (file.contentType === 'text/csv' && typeof file.content === 'string') {
64 |           extractedRows = await parseCSV(file.content);
65 |         } else if (file.contentType === 'application/pdf' && file.content instanceof ArrayBuffer) {
66 |           extractedRows = await parsePDF(file.content);
67 |         } else {
68 |           result.errors?.push(`Unsupported file type for ${file.name}: ${file.contentType}`);
69 |           continue;
70 |         }
71 | 
72 |         if (extractedRows.length === 0) {
73 |           result.warnings?.push(`No data extracted from ${file.name}`);
74 |           continue;
75 |         }
76 | 
77 |         // Process each row to create transactions
78 |         for (const row of extractedRows) {
79 |           const transactionId = generateTransactionId(row);
80 | 
81 |           if (processedTransactionIds.has(transactionId)) {
82 |             if (result.duplicatesSkipped !== undefined) {
83 |               result.duplicatesSkipped++;
84 |             }
85 | 
86 |             continue;
87 |           }
88 | 
89 |           try {
90 |             const transactionFields = await extractTransactionFields(JSON.stringify(row));
91 | 
92 |             const transaction: Transaction = {
93 |               id: transactionId,
94 |               description: transactionFields.description,
95 |               amount: transactionFields.amount,
96 |               date: transactionFields.date,
97 |               merchant: transactionFields.merchant,
98 |               type: transactionFields.type,
99 |               category: transactionFields.category,
100 |               currency: transactionFields.currency || 'BRL',
101 |               card: cardInfo,
102 |               installment: transactionFields.installmentInfo,
103 |             };
104 | 
105 |             // Add to processed IDs to avoid duplicates within this batch
106 |             processedTransactionIds.add(transaction.id);
107 |             allExtractedTransactions.push(transaction);
108 |           } catch (rowError) {
109 |             result.errors?.push(
110 |               `Error processing row from ${file.name}: ${(rowError as Error).message}`
111 |             );
112 |           }
113 |         }
114 |       } catch (fileError) {
115 |         result.errors?.push(`Error processing file ${file.name}: ${(fileError as Error).message}`);
116 |       }
117 |     }
118 | 
119 |     // Second pass: Detect person-to-person transfers across all extracted transactions
120 |     const processedTransactions = await detectP2PTransfers(
121 |       allExtractedTransactions,
122 |       Array.from(detectedAccounts)
123 |     );
124 | 
125 |     // Store the processed transactions in the result
126 |     result.transactions = processedTransactions;
127 | 
128 |     // Sort transactions by date (newest first)
129 |     result.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
130 | 
131 |     return result;
132 |   } catch (error) {
133 |     console.error('Error processing bank statements:', error);
134 |     throw new Error(`Failed to process bank statements: ${(error as Error).message}`);
135 |   }
136 | }
137 | 
138 | /**
139 |  * Process all transactions to detect P2P transfers
140 |  * @param transactions List of transactions to process
141 |  * @param knownAccounts List of known account names/cards
142 |  * @returns Processed transactions with P2P transfer information
143 |  */
144 | async function detectP2PTransfers(
145 |   transactions: Transaction[],
146 |   knownAccounts: string[]
147 | ): Promise<Transaction[]> {
148 |   const processedTransactions: Transaction[] = [];
149 |   const transferMatches: Map<string, string> = new Map(); // Maps transaction IDs to their matching transfer
150 | 
151 |   // First pass: Use AI to detect potential P2P transfers
152 |   for (const transaction of transactions) {
153 |     // Skip transactions that have already been matched as a transfer
154 |     if (transferMatches.has(transaction.id)) {
155 |       continue;
156 |     }
157 | 
158 |     // Only check for transfers for large amounts or explicit transfer types
159 |     const isSignificantAmount = Math.abs(transaction.amount) >= 50; // Threshold to avoid checking small transactions
160 |     if (transaction.type === TransactionType.TRANSFER || isSignificantAmount) {
161 |       // Get other transactions to compare with (excluding this one)
162 |       const otherTransactions = transactions.filter(t => t.id !== transaction.id);
163 | 
164 |       // Detect if this is a P2P transfer
165 |       const result = await detectP2PTransfer(transaction, otherTransactions, knownAccounts);
166 | 
167 |       if ((result.isP2PTransfer || result.isInternalTransfer) && result.confidence >= 0.7) {
168 |         // Mark this transaction with the appropriate transfer types
169 |         transaction.isP2PTransfer = result.isP2PTransfer;
170 |         transaction.isInternalTransfer = result.isInternalTransfer;
171 | 
172 |         // If a matching transaction was identified
173 |         if (result.matchingTransactionId) {
174 |           // Store the transfer details
175 |           transaction.transfer = {
176 |             matchingTransactionId: result.matchingTransactionId,
177 |             fromAccount: result.fromPerson,
178 |             toAccount: result.toPerson,
179 |             fromPerson: result.fromPerson,
180 |             toPerson: result.toPerson,
181 |           };
182 | 
183 |           // Store the match to avoid duplicate processing
184 |           transferMatches.set(transaction.id, result.matchingTransactionId);
185 |           transferMatches.set(result.matchingTransactionId, transaction.id);
186 |         }
187 |       }
188 |     }
189 | 
190 |     processedTransactions.push(transaction);
191 |   }
192 | 
193 |   // Second pass: Make sure all transactions involved in transfers are marked correctly
194 |   for (const transaction of processedTransactions) {
195 |     // If this transaction is matched as part of a transfer but not yet marked
196 |     if (
197 |       transferMatches.has(transaction.id) &&
198 |       !transaction.isP2PTransfer &&
199 |       !transaction.isInternalTransfer
200 |     ) {
201 |       // Find the matching transaction
202 |       const matchingId = transferMatches.get(transaction.id);
203 |       const matchingTransaction = processedTransactions.find(t => t.id === matchingId);
204 | 
205 |       if (matchingTransaction) {
206 |         // Copy transfer types from the matching transaction
207 |         transaction.isP2PTransfer = matchingTransaction.isP2PTransfer;
208 |         transaction.isInternalTransfer = matchingTransaction.isInternalTransfer;
209 | 
210 |         // Copy transfer details from the matching transaction
211 |         if (matchingTransaction.transfer) {
212 |           transaction.transfer = {
213 |             matchingTransactionId: matchingTransaction.id,
214 |             // Swap from/to for the matching transaction
215 |             fromAccount: matchingTransaction.transfer.toAccount,
216 |             toAccount: matchingTransaction.transfer.fromAccount,
217 |             fromPerson: matchingTransaction.transfer.toPerson,
218 |             toPerson: matchingTransaction.transfer.fromPerson,
219 |           };
220 |         }
221 |       }
222 |     }
223 |   }
224 | 
225 |   return processedTransactions;
226 | }
227 | 
228 | /**
229 |  * Extract card information from filename using AI
230 |  * @param fileName The name of the file
231 |  * @returns Formatted card information string
232 |  */
233 | async function extractCardInfoFromFilename(fileName: string): Promise<string> {
234 |   try {
235 |     // Use AI to extract card information from filename
236 |     const extraction = await aiExtractCardFromFilename(fileName);
237 | 
238 |     // If confidence is too low, return generic card info
239 |     if (!extraction || extraction.confidence < 0.3) {
240 |       return '';
241 |     }
242 | 
243 |     // Format the card information based on the extraction
244 |     const parts: string[] = [];
245 | 
246 |     if (extraction.bankName) {
247 |       parts.push(extraction.bankName);
248 |     }
249 | 
250 |     if (extraction.accountType) {
251 |       parts.push(extraction.accountType);
252 |     }
253 | 
254 |     if (extraction.cardType) {
255 |       parts.push(extraction.cardType);
256 |     }
257 | 
258 |     if (extraction.cardIdentifier) {
259 |       parts.push(extraction.cardIdentifier);
260 |     }
261 | 
262 |     return parts.join(' ');
263 |   } catch (error) {
264 |     console.warn('Error extracting card info from filename:', error);
265 |     return '';
266 |   }
267 | }
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
7 | import { Providers } from '@/app/providers';
8 | import { ThemeProvider } from '@/components/theme-provider';
9 | import { ThemeToggle } from '@/components/theme-toggle';
10 | import { Button } from '@/components/ui/button';
11 | import { META_THEME_COLORS, siteConfig } from '@/config/site';
12 | import { cn } from '@/lib/utils';
13 | 
14 | import type { Metadata, Viewport } from 'next';
15 | 
16 | const geistSans = Geist({
17 |   variable: '--font-geist-sans',
18 |   subsets: ['latin'],
19 | });
20 | 
21 | const geistMono = Geist_Mono({
22 |   variable: '--font-geist-mono',
23 |   subsets: ['latin'],
24 | });
25 | 
26 | export const metadata: Metadata = {
27 |   title: {
28 |     default: siteConfig.name,
29 |     template: `%s - ${siteConfig.name}`,
30 |   },
31 |   metadataBase: new URL(siteConfig.url),
32 |   description: siteConfig.description,
33 |   keywords: ['finance', 'mind', 'Finance Mind', 'Finance Management'],
34 |   authors: [
35 |     {
36 |       name: 'Andre "Dezzy" Victor',
37 |       url: 'https://andredezzy.com',
38 |     },
39 |   ],
40 |   creator: 'andredezzy',
41 |   openGraph: {
42 |     type: 'website',
43 |     locale: 'en_US',
44 |     url: siteConfig.url,
45 |     title: siteConfig.name,
46 |     description: siteConfig.description,
47 |     siteName: siteConfig.name,
48 |     images: [
49 |       {
50 |         url: siteConfig.ogImage,
51 |         width: 1200,
52 |         height: 630,
53 |         alt: siteConfig.name,
54 |       },
55 |     ],
56 |   },
57 |   twitter: {
58 |     card: 'summary_large_image',
59 |     title: siteConfig.name,
60 |     description: siteConfig.description,
61 |     images: [siteConfig.ogImage],
62 |     creator: '@shadcn',
63 |   },
64 |   icons: {
65 |     icon: '/favicon.ico',
66 |     shortcut: '/favicon-16x16.png',
67 |     apple: '/apple-touch-icon.png',
68 |   },
69 |   manifest: `${siteConfig.url}/site.webmanifest`,
70 | };
71 | 
72 | export const viewport: Viewport = {
73 |   themeColor: META_THEME_COLORS.light,
74 | };
75 | 
76 | export default function RootLayout({ children }: { children: React.ReactNode }) {
77 |   return (
78 |     <html lang="en" suppressHydrationWarning>
79 |       <head>
80 |         <script
81 |           dangerouslySetInnerHTML={{
82 |             __html: `
83 |           try {
84 |             if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
85 |               document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
86 |             }
87 |           } catch (_) {}
88 |         `,
89 |           }}
90 |         />
91 |       </head>
92 | 
93 |       <body
94 |         className={cn(
95 |           `bg-background overscroll-none font-sans antialiased`,
96 |           geistSans.variable,
97 |           geistMono.variable
98 |         )}
99 |       >
100 |         <Providers>
101 |           <ThemeProvider
102 |             attribute="class"
103 |             defaultTheme="system"
104 |             enableSystem
105 |             disableTransitionOnChange
106 |           >
107 |             <header className="border-b border-border">
108 |               <div className="container mx-auto px-8 py-12">
109 |                 <div className="space-y-6">
110 |                   <div className="flex flex-col md:flex-row justify-between md:items-center items-start gap-8">
111 |                     <div className="mr-8">
112 |                       <h1 className="text-3xl font-bold text-foreground">Finance Mind</h1>
113 |                       <p className="mt-2 text-sm text-muted-foreground">
114 |                         AI-driven finance tracker for intelligent bank statement analysis and
115 |                         insights
116 |                       </p>
117 |                     </div>
118 | 
119 |                     <ThemeToggle className="order-first md:order-last" />
120 |                   </div>
121 | 
122 |                   <div className="flex gap-3 flex-wrap">
123 |                     <Button variant="secondary" asChild>
124 |                       <Link href="/">Overview</Link>
125 |                     </Button>
126 | 
127 |                     <Button variant="secondary" asChild>
128 |                       <Link href="/ai-playground">AI Playground</Link>
129 |                     </Button>
130 | 
131 |                     <Button variant="outline" asChild>
132 |                       <Link href="https://andredezzy.com">@andredezzy</Link>
133 |                     </Button>
134 |                   </div>
135 |                 </div>
136 |               </div>
137 |             </header>
138 | 
139 |             {children}
140 | 
141 |             <footer className="border-t border-border mt-12">
142 |               <div className="container mx-auto px-8 py-12">
143 |                 <div className="flex flex-col md:flex-row gap-8">
144 |                   <div className="flex-1 pb-6">
145 |                     <div className="flex items-center">
146 |                       <h3 className="text-lg font-semibold text-foreground flex-1">Finance Mind</h3>
147 |                     </div>
148 | 
149 |                     <p className="mt-2 text-sm text-muted-foreground">
150 |                       Take control of your financial life with intelligent analytics and insights.
151 |                     </p>
152 |                   </div>
153 | 
154 |                   <div className="md:hidden">
155 |                     <h4 className="text-sm font-medium text-foreground">Features</h4>
156 |                     <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
157 |                       <li>Bank statement processing</li>
158 |                       <li>Transaction categorization</li>
159 |                       <li>Financial insights</li>
160 |                       <li>Multi-currency support</li>
161 |                     </ul>
162 |                   </div>
163 | 
164 |                   <div className="hidden md:block">
165 |                     <h4 className="text-sm font-medium text-foreground mb-2 text-left">Features</h4>
166 |                     <ul className="space-y-2 text-sm text-muted-foreground text-left">
167 |                       <li>Bank statement processing</li>
168 |                       <li>Transaction categorization</li>
169 |                       <li>Financial insights</li>
170 |                       <li>Multi-currency support</li>
171 |                     </ul>
172 |                   </div>
173 | 
174 |                   <div className="md:hidden">
175 |                     <h4 className="text-sm font-medium text-foreground">Links</h4>
176 |                     <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
177 |                       <li>Documentation</li>
178 |                       <li>Support</li>
179 |                       <li>Privacy Policy</li>
180 |                       <li>Terms of Service</li>
181 |                     </ul>
182 |                   </div>
183 | 
184 |                   <div className="hidden md:block">
185 |                     <h4 className="text-sm font-medium text-foreground mb-2 text-left">Links</h4>
186 |                     <ul className="space-y-2 text-sm text-muted-foreground text-left">
187 |                       <li>Documentation</li>
188 |                       <li>Privacy Policy</li>
189 |                       <li>Terms of Service</li>
190 |                       <li>Support</li>
191 |                     </ul>
192 |                   </div>
193 |                 </div>
194 | 
195 |                 <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
196 |                   <p className="text-xs text-muted-foreground">
197 |                     &copy; {new Date().getFullYear()} Finance Mind. All rights reserved.
198 |                   </p>
199 |                   <div className="mt-4 md:mt-0 flex space-x-4">
200 |                     <span className="text-xs text-muted-foreground">
201 |                       <a
202 |                         href="https://andredezzy.com"
203 |                         target="_blank"
204 |                         rel="noopener noreferrer"
205 |                         className="text-primary hover:underline"
206 |                       >
207 |                         Andre &ldquo;Dezzy&rdquo; Victor
208 |                       </a>
209 |                     </span>
210 |                   </div>
211 |                 </div>
212 |               </div>
213 |             </footer>
214 |           </ThemeProvider>
215 |         </Providers>
216 | 
217 |         <Analytics />
218 |       </body>
219 |     </html>
220 |   );
221 | }
```

src/app/providers.tsx
```
1 | 'use client';
2 | 
3 | import { Toaster } from '@/components/ui/sonner';
4 | 
5 | import type { ReactNode } from 'react';
6 | 
7 | interface ProvidersProps {
8 |   children: ReactNode;
9 | }
10 | 
11 | export function Providers({ children }: ProvidersProps) {
12 |   return (
13 |     <>
14 |       {children}
15 | 
16 |       <Toaster position="bottom-right" />
17 |     </>
18 |   );
19 | }
```

src/components/manual-transaction-form.tsx
```
1 | 'use client';
2 | 
3 | import { zodResolver } from '@hookform/resolvers/zod';
4 | import { Loader2 } from 'lucide-react';
5 | import { useState } from 'react';
6 | import { useForm } from 'react-hook-form';
7 | import { toast } from 'sonner';
8 | import { z } from 'zod';
9 | 
10 | import { extractTransactionFields } from '@/actions/ai/extract-transaction-fields';
11 | import { Button } from '@/components/ui/button';
12 | import { DatePicker } from '@/components/ui/date-picker';
13 | import { Input } from '@/components/ui/input';
14 | import { Label } from '@/components/ui/label';
15 | import {
16 |   Select,
17 |   SelectContent,
18 |   SelectItem,
19 |   SelectTrigger,
20 |   SelectValue,
21 | } from '@/components/ui/select';
22 | import { TransactionType, TransactionCategory } from '@/lib/ai/types';
23 | 
24 | // Transaction form schema with required fields
25 | const transactionFormSchema = z.object({
26 |   description: z.string().min(1, { message: 'Description is required' }),
27 |   amount: z.coerce.number(),
28 |   category: z.nativeEnum(TransactionCategory),
29 |   type: z.nativeEnum(TransactionType),
30 |   date: z.date(),
31 |   merchant: z.string().optional(),
32 |   currency: z.string().default('BRL'),
33 | });
34 | 
35 | type TransactionFormValues = z.infer<typeof transactionFormSchema>;
36 | 
37 | // Helper function to get a display-friendly category name
38 | const getCategoryLabel = (category: string): string => {
39 |   // Convert SNAKE_CASE to Title Case and replace underscores with spaces
40 |   return category
41 |     .split('_')
42 |     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
43 |     .join(' ');
44 | };
45 | 
46 | // Currencies
47 | const CURRENCIES = [
48 |   { value: 'BRL', label: 'BRL' },
49 |   { value: 'USD', label: 'USD' },
50 |   { value: 'EUR', label: 'EUR' },
51 | ];
52 | 
53 | export function ManualTransactionForm() {
54 |   const [aiPrompt, setAiPrompt] = useState('');
55 |   const [isExtracting, setIsExtracting] = useState(false);
56 | 
57 |   // Initialize form with default values
58 |   const form = useForm<TransactionFormValues>({
59 |     resolver: zodResolver(transactionFormSchema),
60 |     defaultValues: {
61 |       description: '',
62 |       amount: 0,
63 |       category: TransactionCategory.UNCATEGORIZED,
64 |       type: TransactionType.OUTCOME,
65 |       date: new Date(),
66 |       merchant: '',
67 |       currency: 'BRL',
68 |     },
69 |   });
70 | 
71 |   // Handle AI extraction
72 |   const handleExtractTransaction = async () => {
73 |     if (!aiPrompt.trim()) {
74 |       toast.error('Empty prompt', {
75 |         description: 'Please enter a transaction description to extract',
76 |       });
77 |       return;
78 |     }
79 | 
80 |     setIsExtracting(true);
81 |     try {
82 |       const extraction = await extractTransactionFields(aiPrompt);
83 | 
84 |       // Update form with extracted values
85 |       form.setValue('description', extraction.description || '');
86 |       form.setValue('amount', extraction.amount || 0);
87 | 
88 |       // Type safety for category
89 |       if (
90 |         extraction.category &&
91 |         Object.values(TransactionCategory).includes(extraction.category as TransactionCategory)
92 |       ) {
93 |         form.setValue('category', extraction.category as TransactionCategory);
94 |       }
95 | 
96 |       // Type safety for transaction type
97 |       if (
98 |         extraction.type &&
99 |         Object.values(TransactionType).includes(extraction.type as TransactionType)
100 |       ) {
101 |         form.setValue('type', extraction.type as TransactionType);
102 |       }
103 | 
104 |       form.setValue('currency', extraction.currency || 'BRL');
105 |       form.setValue('merchant', extraction.merchant || '');
106 | 
107 |       if (extraction.date) {
108 |         form.setValue('date', new Date(extraction.date));
109 |       }
110 | 
111 |       toast.success('Transaction extracted', {
112 |         description: 'The transaction details have been extracted',
113 |       });
114 |     } catch (error) {
115 |       console.error('Error extracting transaction:', error);
116 |       toast.error('Extraction failed', {
117 |         description: 'Could not extract transaction details',
118 |       });
119 |     } finally {
120 |       setIsExtracting(false);
121 |     }
122 |   };
123 | 
124 |   // Handle form submission
125 |   const onSubmit = (data: TransactionFormValues) => {
126 |     // Here you would typically save the transaction to your database
127 |     console.log('Transaction submitted:', data);
128 |     toast.success('Transaction added', {
129 |       description: 'Your transaction has been successfully added',
130 |     });
131 | 
132 |     // Reset form
133 |     form.reset();
134 |     setAiPrompt('');
135 |   };
136 | 
137 |   // Handle key press for quick add input
138 |   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
139 |     if (e.key === 'Enter' && !isExtracting) {
140 |       e.preventDefault();
141 |       handleExtractTransaction();
142 |     }
143 |   };
144 | 
145 |   return (
146 |     <div className="space-y-8">
147 |       {/* Row 1: Input field with button */}
148 |       <div className="flex gap-2">
149 |         <Input
150 |           id="ai-prompt"
151 |           placeholder="Quick add (e.g., '50 for lunch yesterday')"
152 |           value={aiPrompt}
153 |           onChange={e => setAiPrompt(e.target.value)}
154 |           onKeyDown={handleKeyPress}
155 |           className="flex-1"
156 |         />
157 |         <Button
158 |           variant="secondary"
159 |           onClick={handleExtractTransaction}
160 |           disabled={isExtracting}
161 |           className="shrink-0"
162 |         >
163 |           {isExtracting ? (
164 |             <>
165 |               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
166 |               Extract
167 |             </>
168 |           ) : (
169 |             'Extract'
170 |           )}
171 |         </Button>
172 |       </div>
173 | 
174 |       <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
175 |         {/* Row 2: Currency, Amount, Description */}
176 |         <div className="grid grid-cols-12 gap-3">
177 |           {/* Currency */}
178 |           <div className="col-span-3 space-y-2">
179 |             <Label htmlFor="currency">Currency</Label>
180 |             <Select
181 |               value={form.watch('currency')}
182 |               onValueChange={value => form.setValue('currency', value)}
183 |             >
184 |               <SelectTrigger id="currency" className="w-full">
185 |                 <SelectValue placeholder="BRL" />
186 |               </SelectTrigger>
187 |               <SelectContent>
188 |                 {CURRENCIES.map(currency => (
189 |                   <SelectItem key={currency.value} value={currency.value}>
190 |                     {currency.label}
191 |                   </SelectItem>
192 |                 ))}
193 |               </SelectContent>
194 |             </Select>
195 |           </div>
196 | 
197 |           {/* Amount */}
198 |           <div className="col-span-3 space-y-2">
199 |             <Label htmlFor="amount">Amount</Label>
200 |             <Input
201 |               id="amount"
202 |               type="number"
203 |               step="0.01"
204 |               placeholder="0.00"
205 |               {...form.register('amount', { valueAsNumber: true })}
206 |             />
207 |             {form.formState.errors.amount && (
208 |               <p className="text-sm text-destructive">{form.formState.errors.amount.message}</p>
209 |             )}
210 |           </div>
211 | 
212 |           {/* Description */}
213 |           <div className="col-span-6 space-y-2">
214 |             <Label htmlFor="description">Description</Label>
215 |             <Input
216 |               id="description"
217 |               placeholder="Transaction description"
218 |               {...form.register('description')}
219 |             />
220 |             {form.formState.errors.description && (
221 |               <p className="text-sm text-destructive">
222 |                 {form.formState.errors.description.message}
223 |               </p>
224 |             )}
225 |           </div>
226 |         </div>
227 | 
228 |         {/* Row 3: Type and Category */}
229 |         <div className="flex w-full gap-3">
230 |           {/* Transaction Type */}
231 |           <div className="flex-1 space-y-2">
232 |             <Label htmlFor="transaction-type">Type</Label>
233 |             <Select
234 |               value={form.watch('type')}
235 |               onValueChange={value => form.setValue('type', value as TransactionType)}
236 |             >
237 |               <SelectTrigger id="transaction-type" className="w-full">
238 |                 <SelectValue placeholder="Select type" />
239 |               </SelectTrigger>
240 |               <SelectContent>
241 |                 {Object.values(TransactionType).map(type => (
242 |                   <SelectItem key={type} value={type}>
243 |                     {getCategoryLabel(type)}
244 |                   </SelectItem>
245 |                 ))}
246 |               </SelectContent>
247 |             </Select>
248 |           </div>
249 | 
250 |           {/* Category */}
251 |           <div className="flex-1 space-y-2">
252 |             <Label htmlFor="category">Category</Label>
253 |             <Select
254 |               value={form.watch('category')}
255 |               onValueChange={value => form.setValue('category', value as TransactionCategory)}
256 |             >
257 |               <SelectTrigger id="category" className="w-full">
258 |                 <SelectValue placeholder="Select category" />
259 |               </SelectTrigger>
260 |               <SelectContent className="max-h-72">
261 |                 <SelectItem value={TransactionCategory.UNCATEGORIZED}>Uncategorized</SelectItem>
262 | 
263 |                 {/* Income Categories - Use section dividers instead of invalid empty strings */}
264 |                 <div className="px-2 py-1.5 text-xs font-semibold text-primary">Income</div>
265 |                 <SelectItem value={TransactionCategory.SALARY}>Salary</SelectItem>
266 |                 <SelectItem value={TransactionCategory.INVESTMENT_INCOME}>
267 |                   Investment Income
268 |                 </SelectItem>
269 |                 <SelectItem value={TransactionCategory.REIMBURSEMENT}>Reimbursement</SelectItem>
270 |                 <SelectItem value={TransactionCategory.GIFT}>Gift</SelectItem>
271 | 
272 |                 {/* Expense Categories - Use section dividers instead of invalid empty strings */}
273 |                 <div className="px-2 py-1.5 text-xs font-semibold text-primary">Expenses</div>
274 |                 <SelectItem value={TransactionCategory.GROCERIES}>Groceries</SelectItem>
275 |                 <SelectItem value={TransactionCategory.DINING}>Dining</SelectItem>
276 |                 <SelectItem value={TransactionCategory.ENTERTAINMENT}>Entertainment</SelectItem>
277 |                 <SelectItem value={TransactionCategory.TRANSPORTATION}>Transportation</SelectItem>
278 |                 <SelectItem value={TransactionCategory.UTILITIES}>Utilities</SelectItem>
279 |                 <SelectItem value={TransactionCategory.HOUSING}>Housing</SelectItem>
280 |                 <SelectItem value={TransactionCategory.HEALTH}>Health</SelectItem>
281 |                 <SelectItem value={TransactionCategory.EDUCATION}>Education</SelectItem>
282 |                 <SelectItem value={TransactionCategory.SHOPPING}>Shopping</SelectItem>
283 |                 <SelectItem value={TransactionCategory.TRAVEL}>Travel</SelectItem>
284 |                 <SelectItem value={TransactionCategory.PERSONAL_CARE}>Personal Care</SelectItem>
285 |                 <SelectItem value={TransactionCategory.SUBSCRIPTIONS}>Subscriptions</SelectItem>
286 |               </SelectContent>
287 |             </Select>
288 |             {form.formState.errors.category && (
289 |               <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>
290 |             )}
291 |           </div>
292 |         </div>
293 | 
294 |         {/* Row 4: Date and Merchant */}
295 |         <div className="flex w-full gap-3">
296 |           {/* Date */}
297 |           <div className="flex-1 space-y-2">
298 |             <Label htmlFor="date">Date</Label>
299 |             <DatePicker
300 |               date={form.watch('date')}
301 |               onSelect={date => form.setValue('date', date || new Date())}
302 |             />
303 |             {form.formState.errors.date && (
304 |               <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>
305 |             )}
306 |           </div>
307 | 
308 |           {/* Merchant */}
309 |           <div className="flex-1 space-y-2">
310 |             <Label htmlFor="merchant">Merchant</Label>
311 |             <Input
312 |               id="merchant"
313 |               placeholder="Merchant or payee (optional)"
314 |               {...form.register('merchant')}
315 |             />
316 |           </div>
317 |         </div>
318 | 
319 |         {/* Submit Button */}
320 |         <Button type="submit" className="w-full mt-4">
321 |           Add Transaction
322 |         </Button>
323 |       </form>
324 |     </div>
325 |   );
326 | }
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

src/config/user.ts
```
1 | /**
2 |  * User configuration with personal financial information
3 |  * This file contains user-specific settings that are used throughout the application
4 |  */
5 | 
6 | export const userConfig = {
7 |   /**
8 |    * Card holder information - used for identifying the primary account owner
9 |    * in bank statements and financial documents
10 |    */
11 |   cardHolder: {
12 |     name: 'André Victor',
13 |     possibleVariations: ['André', 'Andre Victor', 'Andre V.'],
14 |   },
15 | 
16 |   /**
17 |    * Default currency settings
18 |    */
19 |   currency: {
20 |     code: 'BRL',
21 |     symbol: 'R$',
22 |   },
23 | };
24 | 
25 | export type UserConfig = typeof userConfig;
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
8 |   date: string;
9 |   description: string;
10 |   category: TransactionCategory;
11 |   card?: string;
12 |   merchant?: string;
13 |   fee?: number;
14 |   installment?: {
15 |     current: number;
16 |     total: number;
17 |   };
18 |   isInternalTransfer?: boolean;
19 |   isP2PTransfer?: boolean;
20 |   transfer?: {
21 |     matchingTransactionId?: string;
22 |     fromAccount?: string;
23 |     toAccount?: string;
24 |     fromPerson?: string;
25 |     toPerson?: string;
26 |   };
27 | }
```

src/lib/ai.ts
```
1 | import { openai } from '@ai-sdk/openai';
2 | 
3 | // Default model to use - can be overridden in specific implementations
4 | export const defaultModel = process.env.AI_MODEL || 'gpt-3.5-turbo';
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

src/schemas/form-schemas.ts
```
1 | import { z } from 'zod';
2 | 
3 | /**
4 |  * Schema for the transaction categorizer form
5 |  */
6 | export const transactionCategorizerFormSchema = z.object({
7 |   description: z
8 |     .string()
9 |     .min(1, 'Description is required')
10 |     .describe('Transaction description text input by the user'),
11 |   amount: z
12 |     .string()
13 |     .min(1, 'Amount is required')
14 |     .refine(val => !isNaN(parseFloat(val)), {
15 |       message: 'Amount must be a valid number',
16 |     })
17 |     .describe('Transaction amount as entered by the user (string to be parsed to number)'),
18 |   date: z.string().optional().describe('Optional transaction date in string format'),
19 |   merchant: z.string().optional().describe('Optional merchant name for the transaction'),
20 | });
21 | 
22 | /**
23 |  * Schema for the transaction extractor form
24 |  */
25 | export const transactionExtractorFormSchema = z.object({
26 |   prompt: z.string().min(1, 'Please describe the transaction'),
27 | });
28 | 
29 | // Types for the form values
30 | export type TransactionCategorizerFormValues = z.infer<typeof transactionCategorizerFormSchema>;
31 | export type TransactionExtractorFormValues = z.infer<typeof transactionExtractorFormSchema>;
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
9 |   description: z.string().describe('Transaction description or details text'),
10 |   amount: z.number().describe('Transaction amount - positive for income, negative for expenses'),
11 |   date: z.string().or(z.date()).describe('Transaction date as string or Date object'),
12 |   merchant: z.string().optional().describe('Merchant name if available'),
13 | });
14 | 
15 | /**
16 |  * Schema for transaction categorization response
17 |  */
18 | export const transactionCategorizeResponseSchema = z.object({
19 |   category: z
20 |     .nativeEnum(TransactionCategory)
21 |     .describe('Predefined transaction category from TransactionCategory enum'),
22 |   type: z.nativeEnum(TransactionType).describe('Transaction type: INCOME, OUTCOME, or TRANSFER'),
23 |   merchant: z
24 |     .string()
25 |     .optional()
26 |     .describe('Formatted/cleaned merchant name extracted from the transaction'),
27 |   isInstallment: z
28 |     .boolean()
29 |     .optional()
30 |     .describe('Whether this transaction is part of an installment plan'),
31 |   installmentInfo: z
32 |     .object({
33 |       current: z.number().describe('Current installment number'),
34 |       total: z.number().describe('Total number of installments'),
35 |     })
36 |     .optional()
37 |     .describe('Installment details if this is an installment payment'),
38 |   confidence: z.number().min(0).max(1).optional().describe('AI confidence score from 0.0 to 1.0'),
39 | });
40 | 
41 | /**
42 |  * Schema for transaction extraction
43 |  */
44 | export const transactionExtractionSchema = z.object({
45 |   description: z.string().describe('The cleaned transaction description in original language'),
46 |   amount: z
47 |     .number()
48 |     .describe('The transaction amount as a number (positive for income, negative for expenses)'),
49 |   date: z
50 |     .string()
51 |     .describe('The transaction date in readable format (e.g., today, yesterday, etc.)'),
52 |   merchant: z.string().optional().describe('The merchant or entity name if present'),
53 |   category: z
54 |     .nativeEnum(TransactionCategory)
55 |     .describe('The transaction category from predefined list'),
56 |   type: z.nativeEnum(TransactionType).describe('The transaction type (INCOME, OUTCOME, TRANSFER)'),
57 |   isInstallment: z.boolean().describe('Whether this is an installment payment'),
58 |   installmentInfo: z
59 |     .object({
60 |       current: z.number().describe('Current installment number'),
61 |       total: z.number().describe('Total number of installments'),
62 |     })
63 |     .optional()
64 |     .describe('Details about the installment if applicable'),
65 |   currency: z.string().default('BRL').describe('ISO currency code (defaults to BRL)'),
66 |   confidence: z
67 |     .number()
68 |     .min(0)
69 |     .max(1)
70 |     .optional()
71 |     .describe('AI confidence level in the extraction (0.0 to 1.0)'),
72 | });
73 | 
74 | // Types for schema inference
75 | export type TransactionCategorizeInput = z.infer<typeof transactionCategorizeSchema>;
76 | export type TransactionCategorizeResponse = z.infer<typeof transactionCategorizeResponseSchema>;
77 | export type TransactionExtraction = z.infer<typeof transactionExtractionSchema>;
```

src/types/pdfjs.d.ts
```
1 | /**
2 |  * Type declaration for PDF.js worker module
3 |  */
4 | declare module 'pdfjs-dist/build/pdf.worker.mjs';
```

src/actions/ai/categorize-transaction.ts
```
1 | 'use server';
2 | 
3 | import { generateObject } from 'ai';
4 | 
5 | import { openai, defaultModel } from '@/lib/ai';
6 | import { TransactionCategory, TransactionType } from '@/lib/ai/types';
7 | import { transactionCategorizeResponseSchema } from '@/schemas/transaction-schemas';
8 | 
9 | import type { TransactionCategorizeResponse } from '@/schemas/transaction-schemas';
10 | 
11 | /**
12 |  * Categorizes a financial transaction using AI
13 |  */
14 | export async function categorizeTransaction({
15 |   description,
16 |   amount,
17 |   date,
18 |   merchant,
19 | }: {
20 |   description?: unknown;
21 |   amount?: unknown;
22 |   date?: unknown;
23 |   merchant?: unknown;
24 | }): Promise<TransactionCategorizeResponse> {
25 |   try {
26 |     // Define system instructions for the AI model
27 |     const systemPrompt = `
28 | // ROLE
29 | You are a financial transaction categorization expert specializing in Brazilian and global financial systems.
30 | 
31 | // TASK
32 | Analyze transaction details and determine the appropriate category, type, and additional metadata.
33 | 
34 | // CATEGORIES
35 | Income: SALARY, INVESTMENT, REIMBURSEMENT, GIFT
36 | Expense: GROCERIES, DINING, ENTERTAINMENT, TRANSPORTATION, UTILITIES, HOUSING, HEALTH, EDUCATION, SHOPPING, TRAVEL, PERSONAL_CARE, SUBSCRIPTIONS
37 | Other: UNCATEGORIZED
38 | 
39 | // TRANSACTION TYPES
40 | - INCOME: For money coming in (positive amounts)
41 | - OUTCOME: For money going out (negative amounts) 
42 | - TRANSFER: For money movement between accounts (PIX, bank transfers, credit card payments)
43 | 
44 | // RULES
45 | - Preserve original language: Keep merchant names and descriptions in their ORIGINAL LANGUAGE
46 | - Format merchant names without translating them
47 | - Format merchant names with proper capitalization (e.g., "CAIO RODRIGUES" -> "Caio Rodrigues")
48 | - PIX detection: If description contains "Pix" or "PIX", set type to TRANSFER
49 | - Installment detection: If description mentions "parcela" or has a format like "1/3", it's an installment payment
50 | - Transfer keywords: "Transferência", "TED", "DOC", "Transfer" -> set type to TRANSFER
51 | - Credit card payment keywords: "Pagamento de fatura", "Pagamento fatura" -> set type to TRANSFER
52 | - Salary keywords: "Salário", "Salary", "Pagamento", "Folha"
53 | 
54 | // P2P TRANSFER DETECTION
55 | - Short descriptions with just names (e.g., "caio", "jon") are likely transfers
56 | - Negative amounts indicate money sent TO someone
57 | - Positive amounts indicate money received FROM someone
58 | `.trim();
59 | 
60 |     // Define the specific transaction data for analysis
61 |     const userPrompt = `
62 | Analyze and categorize this financial transaction:
63 | 
64 | Description: ${description}
65 | Amount: ${amount}
66 | Date: ${date instanceof Date ? date.toISOString() : date}
67 | ${merchant ? `Merchant: ${merchant}` : ''}
68 | `.trim();
69 | 
70 |     // Use generateObject with the schema to structure the output
71 |     const result = await generateObject({
72 |       model: openai(defaultModel),
73 |       schema: transactionCategorizeResponseSchema,
74 |       system: systemPrompt,
75 |       prompt: userPrompt,
76 |       temperature: 0.2, // Low temperature for consistent results
77 |     });
78 | 
79 |     // Log warnings if any
80 |     if (result.warnings && result.warnings.length > 0) {
81 |       console.warn('Transaction categorization warnings:', result.warnings);
82 |     }
83 | 
84 |     console.log('Categorization result:', result.object);
85 | 
86 |     // Return the categorization result
87 |     return result.object;
88 |   } catch (error) {
89 |     console.error('AI categorization error:', error);
90 |     // Fallback categorization on error
91 |     return {
92 |       category: TransactionCategory.UNCATEGORIZED,
93 |       type:
94 |         amount && typeof amount === 'number' && amount >= 0
95 |           ? TransactionType.INCOME
96 |           : TransactionType.OUTCOME,
97 |       confidence: 0.1,
98 |     };
99 |   }
100 | }
```

src/actions/ai/detect-person-to-person-transfer.ts
```
1 | 'use server';
2 | 
3 | import { openai } from '@ai-sdk/openai';
4 | import { generateObject } from 'ai';
5 | import { z } from 'zod';
6 | 
7 | import { userConfig } from '@/config/user';
8 | import { defaultModel } from '@/lib/ai';
9 | import { TransactionType } from '@/lib/ai/types';
10 | 
11 | import type { Transaction } from '@/interfaces/transaction';
12 | 
13 | // Schema for person-to-person transfer detection response
14 | const p2pTransferSchema = z.object({
15 |   isP2PTransfer: z
16 |     .boolean()
17 |     .describe(
18 |       'Whether this transaction is a person-to-person transfer (between accounts or to another person)'
19 |     ),
20 |   isInternalTransfer: z
21 |     .boolean()
22 |     .describe(
23 |       'Whether this is a transfer between own accounts owned by the same person (not to another person)'
24 |     ),
25 |   confidence: z
26 |     .number()
27 |     .min(0)
28 |     .max(1)
29 |     .describe('Confidence level of the detection from 0.0 to 1.0'),
30 |   matchingTransactionId: z
31 |     .string()
32 |     .optional()
33 |     .describe('ID of a matching transaction in the opposite direction, if found'),
34 |   fromPerson: z
35 |     .string()
36 |     .optional()
37 |     .describe(
38 |       'The source person or account name in original language (e.g., "Own Nubank Account", "João Silva")'
39 |     ),
40 |   toPerson: z
41 |     .string()
42 |     .optional()
43 |     .describe(
44 |       'The destination person or account name in original language (e.g., "Own Itaú Account", "Maria Souza")'
45 |     ),
46 |   reason: z
47 |     .string()
48 |     .optional()
49 |     .describe('Clear explanation for the classification in a single sentence'),
50 | });
51 | 
52 | export type P2PTransferDetection = z.infer<typeof p2pTransferSchema>;
53 | 
54 | /**
55 |  * Detect if a transaction is a person-to-person transfer, including internal transfers
56 |  * @param transaction The transaction to analyze
57 |  * @param otherTransactions Other transactions to compare for potential matches
58 |  * @param accountsAndCards List of user's known accounts and cards
59 |  * @returns Detection result with confidence score
60 |  */
61 | export async function detectP2PTransfer(
62 |   transaction: Transaction,
63 |   otherTransactions: Transaction[] = [],
64 |   accountsAndCards: string[] = []
65 | ): Promise<P2PTransferDetection> {
66 |   try {
67 |     // Don't process transactions that are already determined to not be transfers
68 |     if (
69 |       transaction.type !== TransactionType.TRANSFER &&
70 |       !isLikelyTransfer(transaction.description)
71 |     ) {
72 |       return {
73 |         isP2PTransfer: false,
74 |         isInternalTransfer: false,
75 |         confidence: 0.9,
76 |         reason: "Transaction type is not TRANSFER and description doesn't suggest a transfer",
77 |       };
78 |     }
79 | 
80 |     // Check if we have any matching transactions in the opposite direction
81 |     const matchingTransaction = findMatchingTransaction(transaction, otherTransactions);
82 | 
83 |     // Define system instructions for the AI model
84 |     const systemPrompt = `
85 | // ROLE
86 | You are a financial transfer detection expert specializing in Brazilian banking systems.
87 | 
88 | // TASK
89 | Analyze transactions and determine if they represent transfers between people or accounts.
90 | 
91 | // TRANSFER TYPES
92 | - INTERNAL TRANSFERS: Between accounts owned by the same person (e.g., from checking to savings)
93 | - EXTERNAL TRANSFERS: From one person to another person (e.g., paying a friend)
94 | 
95 | // TRANSACTION TYPE
96 | Remember that TRANSFER is a transaction type, not a category. Transactions with type TRANSFER can have various categories based on the purpose of the transfer.
97 | 
98 | // INTERNAL TRANSFER INDICATORS
99 | - Transfer terminology with account references ("transfer from checking to savings")
100 | - Banking terms: "transferência", "TED", "DOC", "PIX" between own accounts
101 | - Bank names on both sides of the transaction
102 | - Matching opposing transaction with similar amount and timing
103 | - References to "own account", "self", or "between accounts"
104 | 
105 | // EXTERNAL TRANSFER INDICATORS
106 | - Recipient names that are not the account holder
107 | - PIX/payment services with recipient information
108 | - References to sending/receiving money to others
109 | - Personal transfer descriptions
110 | 
111 | // CONTEXT
112 | Account holder name: "${userConfig.cardHolder.name}"
113 | Known accounts: ${accountsAndCards.join(', ')}
114 | `.trim();
115 | 
116 |     // Define the specific transaction data for analysis
117 |     const userPrompt = `
118 | Analyze this transaction for P2P transfer detection:
119 | 
120 | Description: ${transaction.description}
121 | Amount: ${transaction.amount}
122 | Date: ${transaction.date}
123 | Type: ${transaction.type}
124 | Category: ${transaction.category}
125 | ${transaction.merchant ? `Merchant: ${transaction.merchant}` : ''}
126 | 
127 | ${
128 |   matchingTransaction
129 |     ? `There is a matching transaction in the opposite direction:
130 | Matching ID: ${matchingTransaction.id}
131 | Matching Description: ${matchingTransaction.description}
132 | Matching Amount: ${matchingTransaction.amount}
133 | Matching Date: ${matchingTransaction.date}
134 | `
135 |     : 'No matching transaction found in the opposite direction.'
136 | }
137 | `.trim();
138 | 
139 |     const result = await generateObject({
140 |       model: openai(defaultModel),
141 |       schema: p2pTransferSchema,
142 |       system: systemPrompt,
143 |       prompt: userPrompt,
144 |       temperature: 0.2,
145 |     });
146 | 
147 |     // Log warnings if any
148 |     if (result.warnings && result.warnings.length > 0) {
149 |       console.warn('P2P transfer detection warnings:', result.warnings);
150 |     }
151 | 
152 |     console.log('P2P transfer detection result:', result.object);
153 | 
154 |     return result.object;
155 |   } catch (error) {
156 |     console.error('P2P transfer detection error:', error);
157 |     return {
158 |       isP2PTransfer: transaction.type === TransactionType.TRANSFER,
159 |       isInternalTransfer: false,
160 |       confidence: 0.3,
161 |       reason: 'Error in P2P detection, defaulting based on transaction type',
162 |     };
163 |   }
164 | }
165 | 
166 | /**
167 |  * Check if a transaction description is likely to be a transfer
168 |  * @param description The transaction description
169 |  * @returns True if the description suggests a transfer
170 |  */
171 | function isLikelyTransfer(description: string): boolean {
172 |   const transferTerms = [
173 |     'transfer',
174 |     'transferencia',
175 |     'transferência',
176 |     'ted',
177 |     'doc',
178 |     'pix',
179 |     'envio',
180 |     'enviada',
181 |     'enviado',
182 |     'recebido',
183 |     'recebida',
184 |     'entre contas',
185 |     'mesma titularidade',
186 |     'para conta',
187 |     'da conta',
188 |     'from account',
189 |     'to account',
190 |     'pagamento para',
191 |     'payment to',
192 |     'enviou pix',
193 |     'sent pix',
194 |     'recebeu pix',
195 |     'received pix',
196 |   ];
197 | 
198 |   const normalizedDesc = description.toLowerCase();
199 | 
200 |   return transferTerms.some(term => normalizedDesc.includes(term));
201 | }
202 | 
203 | /**
204 |  * Find a matching transaction that likely represents the other side of a transfer
205 |  * @param transaction The transaction to find a match for
206 |  * @param otherTransactions List of other transactions to search
207 |  * @returns Matching transaction if found, undefined otherwise
208 |  */
209 | function findMatchingTransaction(
210 |   transaction: Transaction,
211 |   otherTransactions: Transaction[]
212 | ): Transaction | undefined {
213 |   // Don't try to match if we don't have other transactions
214 |   if (!otherTransactions.length) return undefined;
215 | 
216 |   // For transfers, we look for transactions in the opposite direction
217 |   // with a similar amount within a short time window
218 |   const isOutgoing = transaction.amount < 0;
219 |   const absAmount = Math.abs(transaction.amount);
220 | 
221 |   // For matching, we allow a 3-day window (transfers might take time to appear)
222 |   const maxTimeDifference = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
223 | 
224 |   // Look for matching transactions
225 |   return otherTransactions.find(other => {
226 |     // If transactions have the same direction, they're not matching sides of a transfer
227 |     const otherIsOutgoing = other.amount < 0;
228 |     if (isOutgoing === otherIsOutgoing) return false;
229 | 
230 |     // Check if amounts match (allow for small differences due to fees)
231 |     const otherAbsAmount = Math.abs(other.amount);
232 |     const amountDiff = Math.abs(absAmount - otherAbsAmount);
233 |     const isAmountSimilar = amountDiff <= 1 || amountDiff / absAmount <= 0.01; // 1 currency unit or 1% difference
234 | 
235 |     if (!isAmountSimilar) return false;
236 | 
237 |     // Check if the transactions are close in time
238 |     const timeDiff = Math.abs(
239 |       new Date(transaction.date).getTime() - new Date(other.date).getTime()
240 |     );
241 |     const isTimeClose = timeDiff <= maxTimeDifference;
242 | 
243 |     return isTimeClose;
244 |   });
245 | }
```

src/actions/ai/extract-card-info-from-row.ts
```
1 | 'use server';
2 | 
3 | import { openai } from '@ai-sdk/openai';
4 | import { generateObject } from 'ai';
5 | import { z } from 'zod';
6 | 
7 | import { defaultModel } from '@/lib/ai';
8 | 
9 | // Schema for card extraction from transaction data
10 | const cardExtractionFromRowSchema = z.object({
11 |   cardType: z
12 |     .string()
13 |     .optional()
14 |     .describe(
15 |       'Card brand or network (e.g., Visa, Mastercard, Elo, American Express) in original case'
16 |     ),
17 |   cardIdentifier: z
18 |     .string()
19 |     .optional()
20 |     .describe('Card identifier such as final digits (e.g., "Final 1234", "****5678") if present'),
21 |   bankName: z
22 |     .string()
23 |     .optional()
24 |     .describe(
25 |       'Bank or financial institution name (e.g., Nubank, Itaú, Santander) in original language'
26 |     ),
27 |   isCredit: z
28 |     .boolean()
29 |     .optional()
30 |     .describe('Whether this is a credit card (true) or debit/other card (false)'),
31 |   cardName: z
32 |     .string()
33 |     .optional()
34 |     .describe('Card product name or tier (e.g., "Gold", "Platinum", "Black") if identifiable'),
35 |   confidence: z
36 |     .number()
37 |     .min(0)
38 |     .max(1)
39 |     .describe('Confidence level of the extraction from 0.0 (low) to 1.0 (high)'),
40 | });
41 | 
42 | export type CardExtractionFromRow = z.infer<typeof cardExtractionFromRowSchema>;
43 | 
44 | /**
45 |  * Use AI to extract card information from transaction row data
46 |  * @param rowData Transaction row data
47 |  * @returns Extracted card information with confidence level
48 |  */
49 | export async function extractCardInfoFromRow(
50 |   rowData: Record<string, string | number>
51 | ): Promise<CardExtractionFromRow> {
52 |   try {
53 |     // Convert row data to string for AI analysis
54 |     const rowDataString = Object.entries(rowData)
55 |       .map(([key, value]) => `${key}: ${value}`)
56 |       .join('\n');
57 | 
58 |     // Define system instructions for the AI model
59 |     const systemPrompt = `
60 | // ROLE
61 | You are a financial data specialist focused on identifying card information in transaction data.
62 | 
63 | // TASK
64 | Extract card details from transaction rows with high precision.
65 | 
66 | // PATTERNS TO IDENTIFY
67 | - Card types: Visa, Mastercard, Elo, Amex, etc.
68 | - Card identifiers: "****1234", "XXXX1234", "Final 1234"
69 | - Credit vs. debit indicators
70 | - Bank names associated with cards
71 | - Card product tiers (Gold, Platinum, Black)
72 | 
73 | // BRAZILIAN TERMINOLOGY
74 | - "cartão" = card
75 | - "crédito" = credit
76 | - "débito" = debit
77 | - "fatura" = statement/bill
78 | - "compra no cartão" = card purchase
79 | - "pagamento" = payment
80 | 
81 | // FORMATTING RULES
82 | - Keep all extracted text in its ORIGINAL LANGUAGE and case
83 | - Set confidence based on the clarity of the card information (0.0-1.0)
84 | `.trim();
85 | 
86 |     // Define the specific transaction data for analysis
87 |     const userPrompt = `
88 | Extract card information from this transaction data:
89 | 
90 | ${rowDataString}
91 | `.trim();
92 | 
93 |     // Generate the card extraction using Vercel AI SDK
94 |     const result = await generateObject({
95 |       model: openai(defaultModel),
96 |       schema: cardExtractionFromRowSchema,
97 |       system: systemPrompt,
98 |       prompt: userPrompt,
99 |       temperature: 0.2, // Low temperature for consistent results
100 |     });
101 | 
102 |     // Log warnings if any
103 |     if (result.warnings && result.warnings.length > 0) {
104 |       console.warn('Card extraction warnings:', result.warnings);
105 |     }
106 | 
107 |     console.log('Card extraction from row result:', result.object);
108 |     return result.object;
109 |   } catch (error) {
110 |     console.error('Card extraction from row error:', error);
111 |     // Return a minimal result with low confidence on error
112 |     return {
113 |       confidence: 0.1,
114 |     };
115 |   }
116 | }
117 | 
118 | /**
119 |  * Format extracted card information into a readable string
120 |  * @param extraction Card extraction result
121 |  * @returns Formatted card string or undefined if no useful information
122 |  */
123 | export async function formatCardInfo(
124 |   extraction: CardExtractionFromRow
125 | ): Promise<string | undefined> {
126 |   if (!extraction || extraction.confidence < 0.3) {
127 |     return undefined;
128 |   }
129 | 
130 |   const parts: string[] = [];
131 | 
132 |   // Add bank name if available
133 |   if (extraction.bankName) {
134 |     parts.push(extraction.bankName);
135 |   }
136 | 
137 |   // Add card type with credit/debit designation if available
138 |   if (extraction.cardType) {
139 |     if (extraction.isCredit !== undefined) {
140 |       parts.push(`${extraction.isCredit ? 'Credit' : 'Debit'} ${extraction.cardType}`);
141 |     } else {
142 |       parts.push(extraction.cardType);
143 |     }
144 |   } else if (extraction.isCredit !== undefined) {
145 |     // Just add credit/debit if we have that but no card type
146 |     parts.push(extraction.isCredit ? 'Credit' : 'Debit');
147 |   }
148 | 
149 |   // Add card name if available and not redundant with bank name
150 |   if (extraction.cardName && extraction.bankName !== extraction.cardName) {
151 |     parts.push(extraction.cardName);
152 |   }
153 | 
154 |   // Add card identifier if available
155 |   if (extraction.cardIdentifier) {
156 |     parts.push(extraction.cardIdentifier);
157 |   }
158 | 
159 |   return parts.length > 0 ? parts.join(' - ') : undefined;
160 | }
```

src/actions/ai/extract-card-info.ts
```
1 | 'use server';
2 | 
3 | import { openai } from '@ai-sdk/openai';
4 | import { generateObject } from 'ai';
5 | import { z } from 'zod';
6 | 
7 | import { defaultModel } from '@/lib/ai';
8 | 
9 | // Schema for card extraction response
10 | const cardExtractionSchema = z.object({
11 |   bankName: z.string().optional().describe('The name of the bank (e.g., Nubank, Itaú, Bradesco)'),
12 |   cardType: z
13 |     .string()
14 |     .optional()
15 |     .describe('The type of card (e.g., Visa, Mastercard, credit, debit)'),
16 |   accountType: z
17 |     .string()
18 |     .optional()
19 |     .describe('The type of account (e.g., checking, savings, credit)'),
20 |   cardIdentifier: z.string().optional().describe('Card identifier like last digits if present'),
21 |   statementType: z.string().optional().describe('Type of statement (e.g., monthly, annual)'),
22 |   statementPeriod: z.string().optional().describe('Period covered by the statement if present'),
23 |   confidence: z.number().min(0).max(1).describe('Confidence level of the extraction (0-1)'),
24 | });
25 | 
26 | export type CardExtraction = z.infer<typeof cardExtractionSchema>;
27 | 
28 | /**
29 |  * Use AI to extract card and bank information from a filename
30 |  * @param fileName The filename to analyze
31 |  * @returns Extracted card and bank information
32 |  */
33 | export async function extractCardFromFilename(fileName: string): Promise<CardExtraction> {
34 |   try {
35 |     // Define system instructions for the AI model
36 |     const systemPrompt = `
37 | // ROLE
38 | You are a financial data specialist with expertise in bank statement files.
39 | 
40 | // TASK
41 | Analyze a filename and extract information about the bank, card type, account type, and other relevant details.
42 | 
43 | // COMMON BRAZILIAN BANKS
44 | - Nubank
45 | - Itaú
46 | - Bradesco
47 | - Santander
48 | - Banco do Brasil (often abbreviated as BB)
49 | - Caixa Econômica Federal (often just Caixa)
50 | - Inter
51 | - C6 Bank
52 | - BTG Pactual
53 | 
54 | // COMMON CARD TYPES
55 | - Visa
56 | - Mastercard
57 | - Elo
58 | - American Express (often Amex)
59 | - Hipercard
60 | 
61 | // ACCOUNT TYPES
62 | - Checking account (conta corrente)
63 | - Savings account (poupança)
64 | - Credit card (cartão de crédito)
65 | - Investment account (conta investimento)
66 | 
67 | // BRAZILIAN TERMINOLOGY
68 | - "extrato" = account statement
69 | - "fatura" = credit card statement
70 | - Month names in Portuguese: janeiro, fevereiro, março, abril, maio, junho, julho, agosto, setembro, outubro, novembro, dezembro
71 | - Abbreviated months: jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez
72 | 
73 | // GUIDELINES
74 | - Analyze the filename carefully for bank names, card types, or account types
75 | - Extract any identifiable information like statement periods or card identifiers
76 | - Leave fields empty if information is not present or ambiguous
77 | - Provide confidence level based on clarity of matches
78 | - For unclear filenames, provide best guess with lower confidence
79 | `.trim();
80 | 
81 |     // Define the specific filename for analysis
82 |     const userPrompt = `
83 | Analyze this bank statement filename and extract any relevant bank or card information: 
84 | 
85 | "${fileName}"
86 | `.trim();
87 | 
88 |     // Generate the card extraction
89 |     const result = await generateObject({
90 |       model: openai(defaultModel),
91 |       schema: cardExtractionSchema,
92 |       system: systemPrompt,
93 |       prompt: userPrompt,
94 |       temperature: 0.2, // Low temperature for more consistent results
95 |     });
96 | 
97 |     // Log warnings if any
98 |     if (result.warnings && result.warnings.length > 0) {
99 |       console.warn('Card extraction warnings:', result.warnings);
100 |     }
101 | 
102 |     console.log('Card extraction result:', result.object);
103 | 
104 |     return result.object;
105 |   } catch (error) {
106 |     console.error('Card extraction error:', error);
107 |     // Return a minimal result with low confidence on error
108 |     return {
109 |       confidence: 0.1,
110 |     };
111 |   }
112 | }
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
19 |     // Define system instructions for the AI model
20 |     const systemPrompt = `
21 | // ROLE
22 | You are a financial assistant specialized in extracting transaction details from text.
23 | 
24 | // TASK
25 | Extract all relevant transaction information from user input, including description, amount, date, merchant, and categorization.
26 | 
27 | // REQUIRED FIELDS
28 | - Description: What the transaction is for
29 | - Amount: As a number, negative for expenses
30 | - Date: Format as "original: [original expression]|english: [english equivalent]"
31 | - Merchant: If present in the input
32 | - Category: Based on transaction description
33 | - Transaction type: INCOME, OUTCOME, or TRANSFER
34 | - Installment information: If applicable
35 | - Currency: Default to BRL if not specified
36 | 
37 | // DATE HANDLING EXAMPLES
38 | - "hoje" in Portuguese → "original: hoje|english: today"
39 | - "明天" in Chinese → "original: 明天|english: tomorrow"
40 | - "last Friday" in English → "original: last Friday|english: last Friday"
41 | - "próximo mês" → "original: próximo mês|english: next month"
42 | - When no date is specified in the input → use "original: today|english: today" (today's date)
43 | 
44 | // TRANSACTION TYPE RULES
45 | - Positive amounts: Treat as INCOME
46 | - Negative amounts: Treat as OUTCOME
47 | - Transfer keywords: "transfer", "sent to", "received from" → TRANSFER
48 | - PIX, TED, DOC keywords → TRANSFER type
49 | 
50 | // CATEGORIES
51 | - Income: SALARY, INVESTMENT, REIMBURSEMENT, GIFT
52 | - Expense: GROCERIES, DINING, ENTERTAINMENT, TRANSPORTATION, UTILITIES, HOUSING, HEALTH, EDUCATION, SHOPPING, TRAVEL, PERSONAL_CARE, SUBSCRIPTIONS
53 | - Default: UNCATEGORIZED
54 | 
55 | // P2P TRANSFER DETECTION
56 | - Person name with amount (e.g., "caio 150", "jon 100"):
57 |   * Set type to TRANSFER
58 |   * Choose appropriate category based on context
59 |   * Format as "Transferência para [Name]" (or appropriate translation)
60 |   * Extract person name as merchant
61 |   * Assume negative amount unless context indicates otherwise
62 |   * + prefix indicates money received from person
63 | 
64 | // LANGUAGE HANDLING
65 | - Detect input language and preserve it in text fields
66 | - Only use English for predefined category and type values
67 | - Format according to conventions of detected language
68 | - Do not translate user content except for date parsing
69 | 
70 | // FORMATTING RULES
71 | - Format merchant names with proper capitalization, also in the description (e.g., "CAIO RODRIGUES" -> "Caio Rodrigues")
72 | - Format merchant names without translating them
73 | 
74 | // FORMATTING EXAMPLES
75 | - Portuguese: "150 corrida uber ontem" → "Corrida de Uber", type: OUTCOME, category: TRANSPORTATION
76 | - English: "150 uber" → "Uber ride", type: OUTCOME, category: TRANSPORTATION
77 | - Spanish: "50 comida ayer" → "Comida", type: OUTCOME, category: DINING
78 | - P2P: "caio 150" → "Transferência para Caio", type: TRANSFER
79 | - P2P with context: "caio 150 churrasco" → "Transferência para Caio (Churrasco)", type: TRANSFER, category: DINING
80 | `.trim();
81 | 
82 |     // Define the specific user input for analysis
83 |     const userPrompt = prompt; // The user's input is directly used as the prompt
84 | 
85 |     // Use generateObject with the schema to structure the output
86 |     const result = await generateObject({
87 |       model: openai(defaultModel),
88 |       schema: transactionExtractionSchema,
89 |       system: systemPrompt,
90 |       prompt: userPrompt,
91 |       temperature: 0.2, // Low temperature for consistent results
92 |     });
93 | 
94 |     // Log warnings if any
95 |     if (result.warnings && result.warnings.length > 0) {
96 |       console.warn('Transaction extraction warnings:', result.warnings);
97 |     }
98 | 
99 |     // Parse natural language date using chrono-node
100 |     const extractedResult = result.object as TransactionExtraction;
101 | 
102 |     // If we have a date string, try to parse it with chrono-node
103 |     if (typeof extractedResult.date === 'string') {
104 |       try {
105 |         // Parse the formatted date string to extract original and English versions
106 |         const dateString = extractedResult.date;
107 |         let englishDateExpression = dateString;
108 | 
109 |         // Check if the date is in the expected format "original: X|english: Y"
110 |         if (dateString.includes('|english:')) {
111 |           const parts = dateString.split('|english:');
112 |           if (parts.length === 2) {
113 |             englishDateExpression = parts[1].trim();
114 |           }
115 |         }
116 | 
117 |         // Parse the English date expression using chrono-node
118 |         const parsedDate = chrono.parseDate(englishDateExpression);
119 | 
120 |         // If we successfully parsed the date, convert it to ISO format
121 |         if (parsedDate) {
122 |           extractedResult.date = parsedDate.toISOString();
123 |         } else {
124 |           // If chrono failed to parse, try to use Date.parse as fallback
125 |           const fallbackDate = new Date(englishDateExpression);
126 |           if (!isNaN(fallbackDate.getTime())) {
127 |             extractedResult.date = fallbackDate.toISOString();
128 |           } else {
129 |             // If all parsing attempts fail, default to today's date
130 |             console.log('Date parsing failed, defaulting to today');
131 |             extractedResult.date = new Date().toISOString();
132 |           }
133 |         }
134 |       } catch (error) {
135 |         console.warn('Error parsing natural language date:', error);
136 |         // Default to today's date if parsing fails
137 |         console.log('Date parsing error, defaulting to today');
138 |         extractedResult.date = new Date().toISOString();
139 |       }
140 |     } else if (!extractedResult.date) {
141 |       // If no date was provided at all, default to today
142 |       console.log('No date provided, defaulting to today');
143 |       extractedResult.date = new Date().toISOString();
144 |     }
145 | 
146 |     console.log('Extraction result:', extractedResult);
147 | 
148 |     return extractedResult;
149 |   } catch (error) {
150 |     console.error('Transaction extraction error:', error);
151 |     throw new Error('Failed to extract transaction details from text');
152 |   }
153 | }
```

src/actions/ai/identify-columns.ts
```
1 | 'use server';
2 | 
3 | import { openai } from '@ai-sdk/openai';
4 | import { generateObject } from 'ai';
5 | import { z } from 'zod';
6 | 
7 | import { userConfig } from '@/config/user';
8 | import { defaultModel } from '@/lib/ai';
9 | 
10 | // Schema for column mapping
11 | const columnMappingSchema = z.object({
12 |   date: z.string().optional().describe('Column containing transaction dates'),
13 |   description: z
14 |     .string()
15 |     .optional()
16 |     .describe('Column containing transaction descriptions or details'),
17 |   amount: z
18 |     .string()
19 |     .optional()
20 |     .describe('Column containing transaction amounts (positive for income, negative for expenses)'),
21 |   balance: z
22 |     .string()
23 |     .optional()
24 |     .describe('Column containing account balance after the transaction'),
25 |   type: z.string().optional().describe('Column containing transaction types or categories'),
26 |   merchant: z.string().optional().describe('Column containing merchant/payee names'),
27 |   identifier: z
28 |     .string()
29 |     .optional()
30 |     .describe('Column containing transaction reference numbers or IDs'),
31 |   currency: z.string().optional().describe('Column containing currency codes or symbols'),
32 |   card: z.string().optional().describe('Column containing card information or identifiers'),
33 |   fee: z.string().optional().describe('Column containing transaction fees or charges'),
34 |   notes: z.string().optional().describe('Column containing additional notes or information'),
35 |   cardHolder: z
36 |     .string()
37 |     .optional()
38 |     .describe('Column containing the card holder name (account owner)'),
39 |   confidence: z
40 |     .number()
41 |     .min(0)
42 |     .max(1)
43 |     .describe('Confidence level in the column mapping from 0.0 to 1.0'),
44 | });
45 | 
46 | export type ColumnMapping = z.infer<typeof columnMappingSchema>;
47 | 
48 | /**
49 |  * Identify the purpose of columns in a bank statement using AI
50 |  * @param headers Array of column headers from the file
51 |  * @param sampleRows Array of sample data rows to help with identification
52 |  * @returns Mapping of standard transaction fields to the actual column names in the file
53 |  */
54 | export async function identifyColumns(
55 |   headers: string[],
56 |   sampleRows: Array<Record<string, string | number>>
57 | ): Promise<ColumnMapping> {
58 |   try {
59 |     // Prepare sample data for AI analysis
60 |     const headerStr = headers.join(', ');
61 |     const sampleDataStr = sampleRows
62 |       .slice(0, 3) // Use up to 3 sample rows
63 |       .map(row => {
64 |         return Object.entries(row)
65 |           .map(([key, value]) => `${key}: ${value}`)
66 |           .join(', ');
67 |       })
68 |       .join('\n');
69 | 
70 |     // Define system instructions for the AI model
71 |     const systemPrompt = `
72 | // ROLE
73 | You are a financial data processing expert specializing in bank statement analysis.
74 | 
75 | // TASK
76 | Identify the purpose of each column in a bank statement by analyzing column headers and sample data.
77 | 
78 | // STANDARD FINANCIAL FIELDS
79 | - date: Transaction date column
80 | - amount: Transaction amount column (positive for income, negative for expenses)
81 | - description: Transaction description or details column
82 | - balance: Account balance column
83 | - type: Transaction type or category column
84 | - merchant: Column containing merchant/payee names
85 | - identifier: Transaction ID or reference number column
86 | - currency: Currency code or symbol column
87 | - card: Card name or identifier column
88 | - fee: Transaction fee column
89 | - notes: Additional information column
90 | - cardHolder: Card holder name column (expected to contain "${userConfig.cardHolder.name}")
91 | 
92 | // CONSIDERATIONS
93 | - Column headers vary across banks and languages
94 | - Date formats vary (DD/MM/YYYY, MM/DD/YYYY, etc.)
95 | - Amount columns might be split into separate debit/credit columns
96 | - In Brazilian statements, "Data" means "Date" and "Valor" means "Amount"/"Value"
97 | - Some statements use negative numbers for expenses, others use separate columns
98 | `.trim();
99 | 
100 |     // Define the specific statement data for analysis
101 |     const userPrompt = `
102 | Identify the purpose of each column in this bank statement:
103 | 
104 | Headers: ${headerStr}
105 | 
106 | Sample Data:
107 | ${sampleDataStr}
108 | 
109 | Map each column to the appropriate standard field.
110 | `.trim();
111 | 
112 |     // Use Vercel AI SDK to generate the column mapping
113 |     const result = await generateObject({
114 |       model: openai(defaultModel),
115 |       schema: columnMappingSchema,
116 |       system: systemPrompt,
117 |       prompt: userPrompt,
118 |       temperature: 0.2, // Low temperature for consistent results
119 |     });
120 | 
121 |     // Log warnings if any
122 |     if (result.warnings && result.warnings.length > 0) {
123 |       console.warn('Column mapping warnings:', result.warnings);
124 |     }
125 | 
126 |     console.log('Column mapping result:', result.object);
127 |     return result.object;
128 |   } catch (error) {
129 |     console.error('Column mapping error:', error);
130 |     // Return empty mapping on error
131 |     return {
132 |       confidence: 0.1,
133 |     };
134 |   }
135 | }
```

src/app/(app)/page.tsx
```
1 | 'use client';
2 | 
3 | import { useState } from 'react';
4 | 
5 | import { FileUploader } from '@/components/file-upload/file-uploader';
6 | import { ManualTransactionForm } from '@/components/manual-transaction-form';
7 | import { Button } from '@/components/ui/button';
8 | import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
9 | import { TransactionCategory } from '@/lib/ai/types';
10 | 
11 | import type { Transaction } from '@/interfaces/transaction';
12 | 
13 | export default function OverviewPage() {
14 |   const [transactions, setTransactions] = useState<Transaction[]>([]);
15 |   const [errors, setErrors] = useState<string[]>([]);
16 |   const [warnings, setWarnings] = useState<string[]>([]);
17 | 
18 |   // Handler for processed transactions
19 |   const handleTransactionsProcessed = (
20 |     newTransactions: Transaction[],
21 |     newErrors?: string[],
22 |     newWarnings?: string[]
23 |   ) => {
24 |     // Update the transaction list
25 |     setTransactions(prev => {
26 |       // Combine existing and new transactions
27 |       // In a real app, we would check for duplicates here
28 |       const combined = [...newTransactions, ...prev];
29 |       // Sort transactions by date (newest first)
30 |       return combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
31 |     });
32 | 
33 |     // Update errors and warnings
34 |     if (newErrors && newErrors.length > 0) {
35 |       setErrors(prev => [...newErrors, ...prev]);
36 |     }
37 | 
38 |     if (newWarnings && newWarnings.length > 0) {
39 |       setWarnings(prev => [...newWarnings, ...prev]);
40 |     }
41 |   };
42 | 
43 |   // Format currency for display
44 |   const formatCurrency = (amount: number, currency: string = 'BRL') => {
45 |     return new Intl.NumberFormat('pt-BR', {
46 |       style: 'currency',
47 |       currency,
48 |     }).format(amount);
49 |   };
50 | 
51 |   // Format date for display
52 |   const formatDate = (date: string) => {
53 |     return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
54 |   };
55 | 
56 |   return (
57 |     <div className="container mx-auto px-8 py-16">
58 |       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
59 |         {/* Upload Bank Statements */}
60 |         <FileUploader onTransactionsProcessed={handleTransactionsProcessed} />
61 | 
62 |         {/* Add Manual Transaction */}
63 |         <Card className="border h-full flex flex-col">
64 |           <CardHeader>
65 |             <CardTitle>Add Manual Transaction</CardTitle>
66 |             <CardDescription>
67 |               Record financial activities not present in your bank statements
68 |             </CardDescription>
69 |           </CardHeader>
70 |           <CardContent className="flex-grow">
71 |             <ManualTransactionForm />
72 |           </CardContent>
73 |         </Card>
74 |       </div>
75 | 
76 |       {/* Errors and Warnings */}
77 |       {(errors.length > 0 || warnings.length > 0) && (
78 |         <Card className="border mb-8">
79 |           <CardHeader>
80 |             <CardTitle>Processing Messages</CardTitle>
81 |             <CardDescription>
82 |               {errors.length > 0 ? 'Some errors occurred during processing' : 'Processing notes'}
83 |             </CardDescription>
84 |           </CardHeader>
85 |           <CardContent>
86 |             {errors.length > 0 && (
87 |               <div className="mb-4">
88 |                 <h3 className="text-sm font-medium text-destructive mb-2">Errors:</h3>
89 |                 <ul className="space-y-1 text-sm text-destructive/80 list-disc pl-5">
90 |                   {errors.map((error, index) => (
91 |                     <li key={index}>{error}</li>
92 |                   ))}
93 |                 </ul>
94 |               </div>
95 |             )}
96 | 
97 |             {warnings.length > 0 && (
98 |               <div>
99 |                 <h3 className="text-sm font-medium text-amber-600 mb-2">Warnings:</h3>
100 |                 <ul className="space-y-1 text-sm text-amber-600/80 list-disc pl-5">
101 |                   {warnings.map((warning, index) => (
102 |                     <li key={index}>{warning}</li>
103 |                   ))}
104 |                 </ul>
105 |               </div>
106 |             )}
107 |           </CardContent>
108 |         </Card>
109 |       )}
110 | 
111 |       {/* Transactions Table */}
112 |       <Card className="border mb-8">
113 |         <CardHeader>
114 |           <div className="flex items-center justify-between">
115 |             <div>
116 |               <CardTitle>Transactions</CardTitle>
117 |               <CardDescription>AI-powered categorized transactions</CardDescription>
118 |             </div>
119 |             <div className="flex gap-2">
120 |               <Button variant="outline" size="sm">
121 |                 <svg
122 |                   xmlns="http://www.w3.org/2000/svg"
123 |                   width="24"
124 |                   height="24"
125 |                   viewBox="0 0 24 24"
126 |                   fill="none"
127 |                   stroke="currentColor"
128 |                   strokeWidth="2"
129 |                   strokeLinecap="round"
130 |                   strokeLinejoin="round"
131 |                   className="h-4 w-4 mr-1"
132 |                 >
133 |                   <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
134 |                   <line x1="3" x2="21" y1="9" y2="9" />
135 |                   <line x1="9" x2="9" y1="21" y2="9" />
136 |                 </svg>
137 |                 Filter
138 |               </Button>
139 |               <Button variant="outline" size="sm">
140 |                 <svg
141 |                   xmlns="http://www.w3.org/2000/svg"
142 |                   width="24"
143 |                   height="24"
144 |                   viewBox="0 0 24 24"
145 |                   fill="none"
146 |                   stroke="currentColor"
147 |                   strokeWidth="2"
148 |                   strokeLinecap="round"
149 |                   strokeLinejoin="round"
150 |                   className="h-4 w-4 mr-1"
151 |                 >
152 |                   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
153 |                   <polyline points="7 10 12 15 17 10" />
154 |                   <line x1="12" x2="12" y1="15" y2="3" />
155 |                 </svg>
156 |                 Export
157 |               </Button>
158 |             </div>
159 |           </div>
160 |         </CardHeader>
161 |         <CardContent>
162 |           <div className="border">
163 |             <div className="relative w-full overflow-auto">
164 |               <table className="w-full caption-bottom text-sm">
165 |                 <thead>
166 |                   <tr className="border-b transition-colors bg-muted/50">
167 |                     <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
168 |                     <th className="h-12 px-4 text-left align-middle font-medium">Description</th>
169 |                     <th className="h-12 px-4 text-left align-middle font-medium min-w-[200px]">
170 |                       Category
171 |                     </th>
172 |                     <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
173 |                     <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
174 |                   </tr>
175 |                 </thead>
176 |                 <tbody>
177 |                   {transactions.length > 0 ? (
178 |                     transactions.map(transaction => (
179 |                       <tr
180 |                         key={transaction.id}
181 |                         className="border-b last:border-b-0 transition-colors hover:bg-muted/50"
182 |                       >
183 |                         <td className="p-4 align-middle">{formatDate(transaction.date)}</td>
184 |                         <td className="p-4 align-middle">
185 |                           {transaction.description}
186 |                           {transaction.merchant && (
187 |                             <div className="text-xs text-muted-foreground">
188 |                               {transaction.merchant}
189 |                             </div>
190 |                           )}
191 |                           {transaction.card && (
192 |                             <div className="text-xs font-medium text-primary mt-1">
193 |                               {transaction.card}
194 |                             </div>
195 |                           )}
196 |                         </td>
197 |                         <td className="p-4 align-middle">
198 |                           <span
199 |                             className={`inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold ${
200 |                               transaction.isInternalTransfer
201 |                                 ? 'bg-blue-50 text-blue-700 border-blue-200'
202 |                                 : transaction.isP2PTransfer
203 |                                   ? 'bg-purple-50 text-purple-700 border-purple-200'
204 |                                   : transaction.type === 'INCOME'
205 |                                     ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
206 |                                     : transaction.type === 'OUTCOME'
207 |                                       ? 'bg-red-50 text-red-700 border-red-200'
208 |                                       : 'bg-blue-50 text-blue-700 border-blue-200'
209 |                             }`}
210 |                           >
211 |                             {transaction.isInternalTransfer
212 |                               ? 'Internal Transfer'
213 |                               : transaction.category !== TransactionCategory.UNCATEGORIZED
214 |                                 ? transaction.category
215 |                                 : 'P2P Transfer'}
216 |                           </span>
217 |                           {transaction.installment && (
218 |                             <div className="text-xs text-muted-foreground mt-1">
219 |                               Installment {transaction.installment.current}/
220 |                               {transaction.installment.total}
221 |                             </div>
222 |                           )}
223 |                           {(transaction.isInternalTransfer || transaction.isP2PTransfer) &&
224 |                             transaction.transfer && (
225 |                               <div className="text-xs text-blue-600 mt-1">
226 |                                 {transaction.transfer.fromPerson &&
227 |                                 transaction.transfer.toPerson ? (
228 |                                   <>
229 |                                     From: {transaction.transfer.fromPerson} → To:{' '}
230 |                                     {transaction.transfer.toPerson}
231 |                                   </>
232 |                                 ) : transaction.transfer.fromAccount &&
233 |                                   transaction.transfer.toAccount ? (
234 |                                   <>
235 |                                     From: {transaction.transfer.fromAccount} → To:{' '}
236 |                                     {transaction.transfer.toAccount}
237 |                                   </>
238 |                                 ) : null}
239 |                               </div>
240 |                             )}
241 |                         </td>
242 |                         <td className="p-4 align-middle">
243 |                           <span
244 |                             className={
245 |                               transaction.type === 'INCOME' ? 'text-emerald-600' : 'text-red-600'
246 |                             }
247 |                           >
248 |                             {formatCurrency(transaction.amount, transaction.currency)}
249 |                           </span>
250 |                         </td>
251 |                         <td className="p-4 align-middle">
252 |                           <div className="flex gap-2">
253 |                             <Button variant="ghost" size="icon" className="h-8 w-8">
254 |                               <svg
255 |                                 xmlns="http://www.w3.org/2000/svg"
256 |                                 width="24"
257 |                                 height="24"
258 |                                 viewBox="0 0 24 24"
259 |                                 fill="none"
260 |                                 stroke="currentColor"
261 |                                 strokeWidth="2"
262 |                                 strokeLinecap="round"
263 |                                 strokeLinejoin="round"
264 |                                 className="h-4 w-4"
265 |                               >
266 |                                 <path d="M12 20h9" />
267 |                                 <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
268 |                               </svg>
269 |                               <span className="sr-only">Edit</span>
270 |                             </Button>
271 |                             <Button variant="ghost" size="icon" className="h-8 w-8">
272 |                               <svg
273 |                                 xmlns="http://www.w3.org/2000/svg"
274 |                                 width="24"
275 |                                 height="24"
276 |                                 viewBox="0 0 24 24"
277 |                                 fill="none"
278 |                                 stroke="currentColor"
279 |                                 strokeWidth="2"
280 |                                 strokeLinecap="round"
281 |                                 strokeLinejoin="round"
282 |                                 className="h-4 w-4"
283 |                               >
284 |                                 <path d="M3 6h18" />
285 |                                 <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
286 |                                 <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
287 |                               </svg>
288 |                               <span className="sr-only">Delete</span>
289 |                             </Button>
290 |                           </div>
291 |                         </td>
292 |                       </tr>
293 |                     ))
294 |                   ) : (
295 |                     <tr>
296 |                       <td colSpan={5} className="p-4 text-center text-muted-foreground">
297 |                         No transactions found. Upload a bank statement or add a manual transaction.
298 |                       </td>
299 |                     </tr>
300 |                   )}
301 |                 </tbody>
302 |               </table>
303 |             </div>
304 |           </div>
305 |         </CardContent>
306 |       </Card>
307 |     </div>
308 |   );
309 | }
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
107 |                       <Input
108 |                         placeholder="Transaction description (e.g., 'Groceries' or 'caio')"
109 |                         {...field}
110 |                       />
111 |                     </FormControl>
112 |                     <FormMessage />
113 |                   </FormItem>
114 |                 )}
115 |               />
116 | 
117 |               <FormField
118 |                 control={form.control}
119 |                 name="amount"
120 |                 render={({ field }) => (
121 |                   <FormItem>
122 |                     <FormLabel>Amount</FormLabel>
123 |                     <FormControl>
124 |                       <Input
125 |                         type="number"
126 |                         step="0.01"
127 |                         placeholder="Enter amount (negative for expenses)"
128 |                         {...field}
129 |                       />
130 |                     </FormControl>
131 |                     <FormMessage />
132 |                   </FormItem>
133 |                 )}
134 |               />
135 | 
136 |               <FormField
137 |                 control={form.control}
138 |                 name="date"
139 |                 render={({ field }) => (
140 |                   <FormItem>
141 |                     <FormLabel>Date</FormLabel>
142 |                     <FormControl>
143 |                       <Input type="date" placeholder="Transaction date" {...field} />
144 |                     </FormControl>
145 |                     <FormMessage />
146 |                   </FormItem>
147 |                 )}
148 |               />
149 | 
150 |               <FormField
151 |                 control={form.control}
152 |                 name="merchant"
153 |                 render={({ field }) => (
154 |                   <FormItem>
155 |                     <FormLabel>Merchant (optional)</FormLabel>
156 |                     <FormControl>
157 |                       <Input placeholder="Merchant name" {...field} />
158 |                     </FormControl>
159 |                     <FormMessage />
160 |                   </FormItem>
161 |                 )}
162 |               />
163 |             </div>
164 | 
165 |             <Button type="submit" className="w-full" disabled={isLoading}>
166 |               {isLoading ? 'Categorizing...' : 'Categorize Transaction'}
167 |             </Button>
168 |           </form>
169 |         </Form>
170 | 
171 |         {error && (
172 |           <div className="mt-4 p-3 bg-destructive/20 text-destructive rounded-md">
173 |             <p>{error}</p>
174 |           </div>
175 |         )}
176 | 
177 |         {result && (
178 |           <div className="mt-8 space-y-6">
179 |             <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
180 | 
181 |             <div className="space-y-2">
182 |               <h3 className="font-medium">Result:</h3>
183 |               <div className="grid grid-cols-2 gap-2">
184 |                 <div className="text-sm font-medium">Category:</div>
185 |                 <div className="text-sm">{getCategoryLabel(result.category)}</div>
186 | 
187 |                 <div className="text-sm font-medium">Type:</div>
188 |                 <div className="text-sm">{getTypeLabel(result.type)}</div>
189 | 
190 |                 {result.merchant && (
191 |                   <>
192 |                     <div className="text-sm font-medium">Merchant:</div>
193 |                     <div className="text-sm">{result.merchant}</div>
194 |                   </>
195 |                 )}
196 | 
197 |                 {result.isInstallment && result.installmentInfo && (
198 |                   <>
199 |                     <div className="text-sm font-medium">Installment:</div>
200 |                     <div className="text-sm">
201 |                       {result.installmentInfo.current}/{result.installmentInfo.total}
202 |                     </div>
203 |                   </>
204 |                 )}
205 | 
206 |                 {result.confidence !== undefined && (
207 |                   <>
208 |                     <div className="text-sm font-medium">Confidence:</div>
209 |                     <div className="text-sm">{(result.confidence * 100).toFixed(1)}%</div>
210 |                   </>
211 |                 )}
212 |               </div>
213 |             </div>
214 |           </div>
215 |         )}
216 |       </CardContent>
217 | 
218 |       <CardFooter className="flex flex-col space-y-4 mt-auto pt-8">
219 |         <div>
220 |           <h3 className="text-sm font-medium mb-2">How It Works</h3>
221 |           <div className="space-y-2">
222 |             <p className="text-xs text-muted-foreground">
223 |               The Transaction Categorizer uses AI to intelligently categorize transactions based on
224 |               description and amount.
225 |             </p>
226 |             <p className="text-xs text-muted-foreground">Our system:</p>
227 |             <ul className="text-xs text-muted-foreground list-decimal pl-4 space-y-1">
228 |               <li>
229 |                 Uses advanced language models to handle Brazilian financial terms and patterns
230 |               </li>
231 |               <li>Detects installment payments, transfers, and other special transaction types</li>
232 |               <li>
233 |                 Recognizes person-to-person transfers like &quot;caio 150&quot; or &quot;jon
234 |                 100&quot; as PIX transactions
235 |               </li>
236 |               <li>
237 |                 All processing happens securely on the server, with no data stored permanently
238 |               </li>
239 |             </ul>
240 |           </div>
241 |         </div>
242 |         <Button variant="outline" className="w-full mt-4" onClick={handleReset}>
243 |           Clear
244 |         </Button>
245 |       </CardFooter>
246 |     </Card>
247 |   );
248 | };
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
113 |                       placeholder="Examples: 'I spent R$150 at Restaurant Central on groceries yesterday' or 'caio 150' (transfer to Caio)"
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
197 |               <li>&quot;caio 150&quot; (transfer to Caio of R$150)</li>
198 |               <li>&quot;jon 100&quot; (transfer to Jon of R$100)</li>
199 |               <li>&quot;+150 maria&quot; (received R$150 from Maria)</li>
200 |             </ul>
201 |           </div>
202 |         </div>
203 | 
204 |         <Button variant="outline" className="w-full mt-4" onClick={handleReset}>
205 |           Clear
206 |         </Button>
207 |       </CardFooter>
208 |     </Card>
209 |   );
210 | };
```

src/components/file-upload/file-uploader.tsx
```
1 | 'use client';
2 | 
3 | import { FileIcon, XIcon, UploadIcon, Loader2 } from 'lucide-react';
4 | import { useState, useCallback } from 'react';
5 | import { useDropzone } from 'react-dropzone';
6 | 
7 | import { processBankStatement } from '@/actions/process-bank-statement';
8 | import { Button } from '@/components/ui/button';
9 | import {
10 |   Card,
11 |   CardContent,
12 |   CardDescription,
13 |   CardFooter,
14 |   CardHeader,
15 |   CardTitle,
16 | } from '@/components/ui/card';
17 | import { cn } from '@/lib/utils';
18 | 
19 | import type { Transaction } from '@/interfaces/transaction';
20 | 
21 | interface FileUploaderProps {
22 |   onTransactionsProcessed: (
23 |     transactions: Transaction[],
24 |     errors?: string[],
25 |     warnings?: string[]
26 |   ) => void;
27 | }
28 | 
29 | export function FileUploader({ onTransactionsProcessed }: FileUploaderProps) {
30 |   const [files, setFiles] = useState<File[]>([]);
31 |   const [isProcessing, setIsProcessing] = useState(false);
32 |   const [error, setError] = useState<string | null>(null);
33 |   // Keep track of processed transactions to avoid duplicates
34 |   const [processedTransactions, setProcessedTransactions] = useState<Transaction[]>([]);
35 |   // Add state to track duplicates that were skipped
36 |   const [skippedDuplicates, setSkippedDuplicates] = useState<number>(0);
37 | 
38 |   const onDrop = useCallback((acceptedFiles: File[]) => {
39 |     setFiles(prev => [...prev, ...acceptedFiles]);
40 |     setError(null);
41 |   }, []);
42 | 
43 |   const { getRootProps, getInputProps, isDragActive } = useDropzone({
44 |     onDrop,
45 |     accept: {
46 |       'text/csv': ['.csv'],
47 |       'application/pdf': ['.pdf'],
48 |     },
49 |     disabled: isProcessing,
50 |   });
51 | 
52 |   const handleProcessFiles = async () => {
53 |     if (files.length === 0) return;
54 | 
55 |     setIsProcessing(true);
56 |     setError(null);
57 | 
58 |     try {
59 |       // Read file contents
60 |       const fileContents = await Promise.all(
61 |         files.map(async file => {
62 |           try {
63 |             const content =
64 |               file.type === 'text/csv'
65 |                 ? await readFileAsText(file)
66 |                 : await readFileAsArrayBuffer(file);
67 | 
68 |             return {
69 |               name: file.name,
70 |               content,
71 |               contentType: file.type,
72 |             };
73 |           } catch (error) {
74 |             console.error(`Error reading file ${file.name}:`, error);
75 |             throw new Error(`Failed to read file ${file.name}: ${(error as Error).message}`);
76 |           }
77 |         })
78 |       );
79 | 
80 |       // Process the files - pass existing processed transactions to avoid duplicates
81 |       const result = await processBankStatement(fileContents, processedTransactions);
82 | 
83 |       // Store the new transactions to check for duplicates in future uploads
84 |       setProcessedTransactions(prevTransactions => [...prevTransactions, ...result.transactions]);
85 | 
86 |       // Update skipped duplicates counter
87 |       if (result.duplicatesSkipped !== undefined) {
88 |         setSkippedDuplicates(prev => prev + result.duplicatesSkipped!);
89 |       }
90 | 
91 |       // Pass the results to the parent component
92 |       onTransactionsProcessed(result.transactions, result.errors, result.warnings);
93 | 
94 |       // Clear the files after successful processing
95 |       setFiles([]);
96 |     } catch (error) {
97 |       console.error('Error processing files:', error);
98 |       setError(`Failed to process files: ${(error as Error).message}`);
99 |     } finally {
100 |       setIsProcessing(false);
101 |     }
102 |   };
103 | 
104 |   const readFileAsText = (file: File): Promise<string> => {
105 |     return new Promise((resolve, reject) => {
106 |       const reader = new FileReader();
107 |       reader.onload = () => resolve(reader.result as string);
108 |       reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
109 |       reader.readAsText(file);
110 |     });
111 |   };
112 | 
113 |   const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
114 |     return new Promise((resolve, reject) => {
115 |       const reader = new FileReader();
116 |       reader.onload = () => resolve(reader.result as ArrayBuffer);
117 |       reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
118 |       reader.readAsArrayBuffer(file);
119 |     });
120 |   };
121 | 
122 |   return (
123 |     <div
124 |       {...getRootProps()}
125 |       className={cn(
126 |         'border-2 border-dashed transition-colors h-full',
127 |         isDragActive ? 'border-primary' : 'border-muted-foreground/25',
128 |         isProcessing ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-muted/50'
129 |       )}
130 |     >
131 |       <input {...getInputProps()} />
132 | 
133 |       <Card className="border-0 bg-transparent h-full flex flex-col">
134 |         <CardHeader>
135 |           <CardTitle>Upload Bank Statements</CardTitle>
136 |           <CardDescription>
137 |             Drag and drop your bank or credit card statements in CSV or PDF format
138 |           </CardDescription>
139 |         </CardHeader>
140 |         <CardContent className="flex-grow">
141 |           {files.length > 0 ? (
142 |             <div className="space-y-3">
143 |               <div className="text-sm font-medium">Selected files:</div>
144 |               <ul className="space-y-2">
145 |                 {files.map((file, index) => (
146 |                   <li
147 |                     key={index}
148 |                     className="flex items-center justify-between bg-muted/50 p-2 text-sm"
149 |                   >
150 |                     <div className="flex items-center gap-2">
151 |                       <FileIcon className="h-4 w-4 text-muted-foreground" />
152 |                       <span className="truncate max-w-[200px]">{file.name}</span>
153 |                       <span className="text-muted-foreground">
154 |                         ({Math.round(file.size / 1024)} KB)
155 |                       </span>
156 |                     </div>
157 |                     <Button
158 |                       variant="ghost"
159 |                       size="icon"
160 |                       className="h-6 w-6"
161 |                       disabled={isProcessing}
162 |                       onClick={e => {
163 |                         e.stopPropagation();
164 |                         setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
165 |                       }}
166 |                     >
167 |                       <XIcon className="h-4 w-4" />
168 |                       <span className="sr-only">Remove file</span>
169 |                     </Button>
170 |                   </li>
171 |                 ))}
172 |               </ul>
173 |             </div>
174 |           ) : (
175 |             <div className="flex flex-col items-center justify-center h-full py-8 text-center">
176 |               <UploadIcon className="h-10 w-10 text-muted-foreground mb-2" />
177 |               <p className="text-sm text-muted-foreground">
178 |                 {isProcessing
179 |                   ? 'Processing files... Please wait'
180 |                   : 'Click or drag and drop to upload files'}
181 |               </p>
182 |             </div>
183 |           )}
184 | 
185 |           {error && (
186 |             <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-md">
187 |               {error}
188 |             </div>
189 |           )}
190 | 
191 |           {skippedDuplicates > 0 && (
192 |             <div className="mt-4 p-3 bg-muted text-muted-foreground text-sm rounded-md">
193 |               {skippedDuplicates} duplicate transaction{skippedDuplicates !== 1 ? 's' : ''} skipped
194 |             </div>
195 |           )}
196 |         </CardContent>
197 |         <CardFooter className="mt-auto">
198 |           <div className="w-full">
199 |             <p className="mb-2 text-sm">{files.length} file(s) selected</p>
200 |             <Button
201 |               className="w-full"
202 |               disabled={files.length === 0 || isProcessing}
203 |               onClick={e => {
204 |                 e.stopPropagation();
205 |                 handleProcessFiles();
206 |               }}
207 |             >
208 |               {isProcessing ? (
209 |                 <>
210 |                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
211 |                   Processing...
212 |                 </>
213 |               ) : (
214 |                 'Process Statements'
215 |               )}
216 |             </Button>
217 |           </div>
218 |         </CardFooter>
219 |       </Card>
220 |     </div>
221 |   );
222 | }
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

src/components/ui/calendar.tsx
```
1 | 'use client';
2 | 
3 | import { ChevronLeft, ChevronRight } from 'lucide-react';
4 | import * as React from 'react';
5 | import { DayPicker } from 'react-day-picker';
6 | 
7 | import { buttonVariants } from '@/components/ui/button';
8 | import { cn } from '@/lib/utils';
9 | 
10 | export type CalendarProps = React.ComponentProps<typeof DayPicker>;
11 | 
12 | function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
13 |   return (
14 |     <DayPicker
15 |       showOutsideDays={showOutsideDays}
16 |       className={cn('p-3', className)}
17 |       classNames={{
18 |         months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
19 |         month: 'space-y-4',
20 |         caption: 'flex justify-center pt-1 relative items-center',
21 |         caption_label: 'text-sm font-medium',
22 |         nav: 'space-x-1 flex items-center',
23 |         nav_button: cn(
24 |           buttonVariants({ variant: 'outline' }),
25 |           'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
26 |         ),
27 |         nav_button_previous: 'absolute left-1',
28 |         nav_button_next: 'absolute right-1',
29 |         table: 'w-full border-collapse space-y-1',
30 |         head_row: 'flex',
31 |         head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
32 |         row: 'flex w-full mt-2',
33 |         cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
34 |         day: cn(
35 |           buttonVariants({ variant: 'ghost' }),
36 |           'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
37 |         ),
38 |         day_range_end: 'day-range-end',
39 |         day_selected:
40 |           'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
41 |         day_today: 'bg-accent text-accent-foreground',
42 |         day_outside:
43 |           'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
44 |         day_disabled: 'text-muted-foreground opacity-50',
45 |         day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
46 |         day_hidden: 'invisible',
47 |         ...classNames,
48 |       }}
49 |       components={{
50 |         PreviousMonthButton: () => <ChevronLeft className="h-4 w-4" />,
51 |         NextMonthButton: () => <ChevronRight className="h-4 w-4" />,
52 |       }}
53 |       {...props}
54 |     />
55 |   );
56 | }
57 | 
58 | Calendar.displayName = 'Calendar';
59 | 
60 | export { Calendar };
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

src/components/ui/date-picker.tsx
```
1 | 'use client';
2 | 
3 | import { format } from 'date-fns';
4 | import { ptBR } from 'date-fns/locale';
5 | import { Calendar as CalendarIcon } from 'lucide-react';
6 | 
7 | import { Button } from '@/components/ui/button';
8 | import { Calendar } from '@/components/ui/calendar';
9 | import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
10 | import { cn } from '@/lib/utils';
11 | 
12 | interface DatePickerProps {
13 |   date?: Date;
14 |   onSelect: (date: Date | undefined) => void;
15 | }
16 | 
17 | export function DatePicker({ date, onSelect }: DatePickerProps) {
18 |   return (
19 |     <Popover>
20 |       <PopoverTrigger asChild>
21 |         <Button
22 |           variant="outline"
23 |           className={cn(
24 |             'w-full justify-start text-left font-normal',
25 |             !date && 'text-muted-foreground'
26 |           )}
27 |         >
28 |           <CalendarIcon className="mr-2 h-4 w-4" />
29 |           {date ? format(date, 'PPP', { locale: ptBR }) : <span>Selecione uma data</span>}
30 |         </Button>
31 |       </PopoverTrigger>
32 |       <PopoverContent className="w-auto p-0">
33 |         <Calendar mode="single" selected={date} onSelect={onSelect} initialFocus locale={ptBR} />
34 |       </PopoverContent>
35 |     </Popover>
36 |   );
37 | }
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

src/components/ui/popover.tsx
```
1 | 'use client';
2 | 
3 | import * as PopoverPrimitive from '@radix-ui/react-popover';
4 | import * as React from 'react';
5 | 
6 | import { cn } from '@/lib/utils';
7 | 
8 | const Popover = PopoverPrimitive.Root;
9 | 
10 | const PopoverTrigger = PopoverPrimitive.Trigger;
11 | 
12 | const PopoverContent = React.forwardRef<
13 |   React.ElementRef<typeof PopoverPrimitive.Content>,
14 |   React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
15 | >(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
16 |   <PopoverPrimitive.Portal>
17 |     <PopoverPrimitive.Content
18 |       ref={ref}
19 |       align={align}
20 |       sideOffset={sideOffset}
21 |       className={cn(
22 |         'z-50 w-72 rounded-md border border-border bg-card p-4 text-card-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
23 |         className
24 |       )}
25 |       {...props}
26 |     />
27 |   </PopoverPrimitive.Portal>
28 | ));
29 | PopoverContent.displayName = PopoverPrimitive.Content.displayName;
30 | 
31 | export { Popover, PopoverTrigger, PopoverContent };
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

src/components/ui/sonner.tsx
```
1 | 'use client';
2 | 
3 | import { useTheme } from 'next-themes';
4 | import { Toaster as Sonner } from 'sonner';
5 | 
6 | import type { ToasterProps } from 'sonner';
7 | 
8 | const Toaster = ({ ...props }: ToasterProps) => {
9 |   const { theme = 'system' } = useTheme();
10 | 
11 |   return (
12 |     <Sonner
13 |       theme={theme as ToasterProps['theme']}
14 |       className="toaster group"
15 |       toastOptions={{
16 |         classNames: {
17 |           toast:
18 |             'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg !rounded-[0px] !shadow-none',
19 |           description: 'group-[.toast]:text-muted-foreground',
20 |           actionButton:
21 |             'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium',
22 |           cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium',
23 |           icon: '!hidden',
24 |         },
25 |       }}
26 |       {...props}
27 |     />
28 |   );
29 | };
30 | 
31 | export { Toaster };
```

src/components/ui/textarea.tsx
```
1 | import * as React from 'react';
2 | 
3 | import { cn } from '@/lib/utils';
4 | 
5 | export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
6 | 
7 | const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
8 |   ({ className, ...props }, ref) => {
9 |     return (
10 |       <textarea
11 |         className={cn(
12 |           'flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
13 |           className
14 |         )}
15 |         ref={ref}
16 |         {...props}
17 |       />
18 |     );
19 |   }
20 | );
21 | Textarea.displayName = 'Textarea';
22 | 
23 | export { Textarea };
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
15 | 
16 |   // Expense categories
17 |   GROCERIES = 'GROCERIES',
18 |   DINING = 'DINING',
19 |   ENTERTAINMENT = 'ENTERTAINMENT',
20 |   TRANSPORTATION = 'TRANSPORTATION',
21 |   UTILITIES = 'UTILITIES',
22 |   HOUSING = 'HOUSING',
23 |   HEALTH = 'HEALTH',
24 |   EDUCATION = 'EDUCATION',
25 |   SHOPPING = 'SHOPPING',
26 |   TRAVEL = 'TRAVEL',
27 |   PERSONAL_CARE = 'PERSONAL_CARE',
28 |   SUBSCRIPTIONS = 'SUBSCRIPTIONS',
29 | 
30 |   // Unknown/uncategorized
31 |   UNCATEGORIZED = 'UNCATEGORIZED',
32 | }
33 | 
34 | // Define investment categories - separate from transaction categories
35 | export enum InvestmentCategory {
36 |   // General investment types
37 |   STOCKS = 'STOCKS',
38 |   BONDS = 'BONDS',
39 |   MUTUAL_FUNDS = 'MUTUAL_FUNDS',
40 |   ETFS = 'ETFS',
41 |   CRYPTOCURRENCY = 'CRYPTOCURRENCY',
42 |   REAL_ESTATE = 'REAL_ESTATE',
43 |   RETIREMENT = 'RETIREMENT',
44 |   SAVINGS = 'SAVINGS',
45 |   FIXED_INCOME = 'FIXED_INCOME',
46 | 
47 |   // Brazilian-specific investment types
48 |   TESOURO_DIRETO = 'TESOURO_DIRETO',
49 |   CDB = 'CDB',
50 |   LCI = 'LCI',
51 |   LCA = 'LCA',
52 |   DEBENTURES = 'DEBENTURES',
53 |   FUNDOS_IMOBILIARIOS = 'FUNDOS_IMOBILIARIOS',
54 | 
55 |   // Other
56 |   OTHER = 'OTHER',
57 |   UNCATEGORIZED = 'UNCATEGORIZED',
58 | }
59 | 
60 | // Define investment asset classes
61 | export enum AssetClass {
62 |   EQUITY = 'EQUITY', // Stocks, ETFs
63 |   FIXED_INCOME = 'FIXED_INCOME', // Bonds, CDs, Treasury
64 |   CASH = 'CASH', // Savings, Money Market
65 |   CRYPTOCURRENCY = 'CRYPTOCURRENCY', // Bitcoin, Ethereum, other digital assets
66 |   ALTERNATIVE = 'ALTERNATIVE', // Commodities, Art, Collectibles
67 |   REAL_ESTATE = 'REAL_ESTATE', // Property, REITs
68 |   MIXED = 'MIXED', // Mutual Funds, Mixed Portfolios
69 | }
70 | 
71 | // Define investment transaction types
72 | export enum InvestmentTransactionType {
73 |   BUY = 'BUY', // Purchase of investment
74 |   SELL = 'SELL', // Sale of investment
75 |   DIVIDEND = 'DIVIDEND', // Dividend payment
76 |   INTEREST = 'INTEREST', // Interest payment
77 |   DEPOSIT = 'DEPOSIT', // Deposit to investment account
78 |   WITHDRAWAL = 'WITHDRAWAL', // Withdrawal from investment account
79 |   FEE = 'FEE', // Investment-related fee
80 |   SPLIT = 'SPLIT', // Stock split
81 |   MERGER = 'MERGER', // Company merger affecting holdings
82 |   ACQUISITION = 'ACQUISITION', // Company acquisition affecting holdings
83 |   OTHER = 'OTHER', // Other investment transaction
84 | }
```

src/lib/parsers/csv-parser.ts
```
1 | /**
2 |  * CSV Parser for bank statements
3 |  *
4 |  * This module provides utilities to parse CSV files into structured data
5 |  * for bank statement processing.
6 |  */
7 | 
8 | /**
9 |  * Parse a CSV string into an array of objects
10 |  * @param csvContent The CSV content as a string
11 |  * @returns Array of objects where keys are column headers and values are cell values
12 |  */
13 | export async function parseCSV(
14 |   csvContent: string
15 | ): Promise<Array<Record<string, string | number>>> {
16 |   try {
17 |     const rows = csvContent.split(/\r?\n/);
18 | 
19 |     // Filter out empty rows
20 |     const nonEmptyRows = rows.filter(row => row.trim().length > 0);
21 | 
22 |     if (nonEmptyRows.length === 0) {
23 |       throw new Error('CSV file is empty');
24 |     }
25 | 
26 |     // Different CSV files might use different delimiters
27 |     // Let's detect the most likely delimiter
28 |     const possibleDelimiters = [',', ';', '\t', '|'];
29 |     const headerRow = nonEmptyRows[0];
30 |     const delimiter = detectDelimiter(headerRow, possibleDelimiters);
31 | 
32 |     // Parse headers (first row), and normalize to lowercase
33 |     const headers = parseCSVRow(headerRow, delimiter).map(header => header.toLowerCase().trim());
34 | 
35 |     // Parse data rows (all rows except the first)
36 |     const results: Array<Record<string, string | number>> = [];
37 | 
38 |     for (let i = 1; i < nonEmptyRows.length; i++) {
39 |       const row = nonEmptyRows[i];
40 |       const values = parseCSVRow(row, delimiter);
41 | 
42 |       if (values.length !== headers.length) {
43 |         console.warn(
44 |           `Row ${i + 1} has ${values.length} fields, expected ${headers.length}. Skipping.`
45 |         );
46 |         continue;
47 |       }
48 | 
49 |       const rowObject: Record<string, string | number> = {};
50 | 
51 |       for (let j = 0; j < headers.length; j++) {
52 |         const value = values[j].trim();
53 | 
54 |         // Try to convert to number if it looks like a number
55 |         if (looksLikeNumber(value)) {
56 |           rowObject[headers[j]] = parseFloat(value.replace(',', '.'));
57 |         } else {
58 |           rowObject[headers[j]] = value;
59 |         }
60 |       }
61 | 
62 |       results.push(rowObject);
63 |     }
64 | 
65 |     if (results.length === 0) {
66 |       console.warn('No data rows found in CSV');
67 |     }
68 | 
69 |     return results;
70 |   } catch (error) {
71 |     console.error('Error parsing CSV:', error);
72 |     throw new Error(`CSV parsing failed: ${(error as Error).message}`);
73 |   }
74 | }
75 | 
76 | /**
77 |  * Apply column mapping to parsed CSV data
78 |  * @param rows The parsed CSV data
79 |  * @param mapping The column mapping from AI
80 |  * @returns Array of objects with standardized field names
81 |  */
82 | export function applyColumnMapping<T extends Record<string, string | number>>(
83 |   rows: Array<Record<string, string | number>>,
84 |   mapping: T
85 | ): Array<{
86 |   [key in keyof T]?: string | number;
87 | }> {
88 |   if (!rows.length) {
89 |     return [];
90 |   }
91 | 
92 |   return rows.map(row => {
93 |     const mappedRow: {
94 |       [key in keyof T]?: string | number;
95 |     } = {};
96 | 
97 |     // Apply each field mapping
98 |     Object.entries(mapping).forEach(([field, columnName]) => {
99 |       // If we have a mapping for this field and the column exists in the row
100 |       if (columnName && typeof columnName === 'string' && columnName in row) {
101 |         mappedRow[field as keyof T] = row[columnName];
102 |       }
103 |     });
104 | 
105 |     // Include all original fields too with their original names
106 |     // This ensures we don't lose any data
107 |     Object.entries(row).forEach(([key, value]) => {
108 |       if (!(key in mappedRow)) {
109 |         mappedRow[key as keyof T] = value;
110 |       }
111 |     });
112 | 
113 |     return mappedRow;
114 |   });
115 | }
116 | 
117 | /**
118 |  * Parse a single CSV row, respecting quoted values that might contain delimiters
119 |  * @param row The CSV row as a string
120 |  * @param delimiter The delimiter character
121 |  * @returns Array of cell values
122 |  */
123 | function parseCSVRow(row: string, delimiter: string): string[] {
124 |   const result: string[] = [];
125 |   let currentValue = '';
126 |   let inQuotes = false;
127 | 
128 |   for (let i = 0; i < row.length; i++) {
129 |     const char = row[i];
130 |     const nextChar = i < row.length - 1 ? row[i + 1] : '';
131 | 
132 |     if (char === '"') {
133 |       if (inQuotes && nextChar === '"') {
134 |         // Escaped quote inside a quoted value
135 |         currentValue += '"';
136 |         i++; // Skip the next quote
137 |       } else {
138 |         // Toggle quotes state
139 |         inQuotes = !inQuotes;
140 |       }
141 |     } else if (char === delimiter && !inQuotes) {
142 |       // End of field
143 |       result.push(currentValue);
144 |       currentValue = '';
145 |     } else {
146 |       currentValue += char;
147 |     }
148 |   }
149 | 
150 |   // Add the last field
151 |   result.push(currentValue);
152 | 
153 |   return result;
154 | }
155 | 
156 | /**
157 |  * Detect the most likely delimiter in a CSV file
158 |  * @param headerRow The first row of the CSV file
159 |  * @param delimiters Array of possible delimiters to check
160 |  * @returns The most likely delimiter
161 |  */
162 | function detectDelimiter(headerRow: string, delimiters: string[]): string {
163 |   const counts = delimiters.map(delimiter => {
164 |     // Count occurrences outside of quotes
165 |     let count = 0;
166 |     let inQuotes = false;
167 | 
168 |     for (let i = 0; i < headerRow.length; i++) {
169 |       const char = headerRow[i];
170 | 
171 |       if (char === '"') {
172 |         inQuotes = !inQuotes;
173 |       } else if (char === delimiter && !inQuotes) {
174 |         count++;
175 |       }
176 |     }
177 | 
178 |     return { delimiter, count };
179 |   });
180 | 
181 |   // Return the delimiter with the highest count
182 |   const mostLikely = counts.sort((a, b) => b.count - a.count)[0];
183 | 
184 |   if (mostLikely.count === 0) {
185 |     // If no delimiter is found, default to comma
186 |     return ',';
187 |   }
188 | 
189 |   return mostLikely.delimiter;
190 | }
191 | 
192 | /**
193 |  * Check if a string looks like a number
194 |  * @param value The string to check
195 |  * @returns True if the string looks like a number
196 |  */
197 | function looksLikeNumber(value: string): boolean {
198 |   // Support formats like 1234, 1234.56, 1,234.56, -1234.56, etc.
199 |   return /^-?\s*[\d.,]+\s*$/.test(value);
200 | }
```

src/lib/parsers/pdf-parser.ts
```
1 | /**
2 |  * PDF Parser for bank statements
3 |  *
4 |  * This module provides utilities to parse PDF files into structured data
5 |  * for bank statement processing.
6 |  *
7 |  * Note: PDF parsing requires client-side libraries which must be dynamically
8 |  * imported to avoid server-side issues.
9 |  */
10 | 
11 | /**
12 |  * Parse a PDF file into an array of objects
13 |  * @param pdfContent The PDF content as an ArrayBuffer
14 |  * @returns Array of objects representing extracted data
15 |  */
16 | export async function parsePDF(
17 |   pdfContent: ArrayBuffer
18 | ): Promise<Array<Record<string, string | number>>> {
19 |   try {
20 |     // Dynamic import approach to ensure we only load PDF.js in the browser
21 |     // This avoids issues with server-side rendering
22 |     if (typeof window === 'undefined') {
23 |       console.warn('PDF parsing attempted in a server environment, returning empty result');
24 |       return [];
25 |     }
26 | 
27 |     // Dynamically import PDF.js only on the client side
28 |     // We use any typing here to avoid dependency on specific PDF.js types
29 |     // which can cause issues with type checking in SSR
30 |     const pdfjs = await import('pdfjs-dist');
31 | 
32 |     // Set the worker source
33 |     const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.mjs');
34 |     pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
35 | 
36 |     // Load the PDF document
37 |     const loadingTask = pdfjs.getDocument({ data: pdfContent });
38 |     const pdf = await loadingTask.promise;
39 | 
40 |     // Extract text from all pages
41 |     const extractedText: string[] = [];
42 | 
43 |     for (let i = 1; i <= pdf.numPages; i++) {
44 |       const page = await pdf.getPage(i);
45 |       const textContent = await page.getTextContent();
46 |       // Use a type assertion to handle unknown structure
47 | 
48 |       const pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
49 | 
50 |       extractedText.push(pageText);
51 |     }
52 | 
53 |     // Join all pages' text
54 |     const fullText = extractedText.join('\n');
55 | 
56 |     // Try to extract a table-like structure from the PDF
57 |     const extractedData = extractStructuredData(fullText);
58 | 
59 |     return extractedData;
60 |   } catch (error) {
61 |     console.error('Error parsing PDF:', error);
62 | 
63 |     // PDF.js might not be available during server-side rendering
64 |     // Return an empty array in this case to prevent blocking the process
65 |     if (
66 |       (error as Error).message.includes('document is not defined') ||
67 |       (error as Error).message.includes('window is not defined')
68 |     ) {
69 |       console.warn('PDF parsing attempted in a server environment, returning empty result');
70 |       return [];
71 |     }
72 | 
73 |     throw new Error(`PDF parsing failed: ${(error as Error).message}`);
74 |   }
75 | }
76 | 
77 | /**
78 |  * Extract structured data from PDF text
79 |  * @param text The extracted text from the PDF
80 |  * @returns Array of objects representing structured data
81 |  */
82 | function extractStructuredData(text: string): Array<Record<string, string | number>> {
83 |   const result: Array<Record<string, string | number>> = [];
84 | 
85 |   try {
86 |     // Look for table-like sections in the PDF
87 |     // This is a simplified approach that looks for common patterns in bank statements
88 | 
89 |     // First, try to find date patterns in the text
90 |     const datePatterns = [
91 |       // Common date formats: DD/MM/YYYY or MM/DD/YYYY or YYYY-MM-DD
92 |       /\d{1,2}[/-]\d{1,2}[/-]\d{2,4}/g,
93 |       // ISO format: YYYY-MM-DD
94 |       /\d{4}-\d{2}-\d{2}/g,
95 |     ];
96 | 
97 |     const potentialDateMatches: number[] = [];
98 | 
99 |     // Find all position indices where dates appear
100 |     for (const pattern of datePatterns) {
101 |       let match;
102 |       while ((match = pattern.exec(text)) !== null) {
103 |         potentialDateMatches.push(match.index);
104 |       }
105 |     }
106 | 
107 |     if (potentialDateMatches.length === 0) {
108 |       // No dates found, try a different approach
109 |       return parseUnstructuredText(text);
110 |     }
111 | 
112 |     // Sort date positions
113 |     potentialDateMatches.sort((a, b) => a - b);
114 | 
115 |     // Use date positions to identify potential rows
116 |     // This assumes dates are at consistent positions in each row
117 |     const lines = text.split('\n');
118 |     let currentLine = '';
119 | 
120 |     for (let i = 0; i < lines.length; i++) {
121 |       const line = lines[i].trim();
122 | 
123 |       if (line.length === 0) continue;
124 | 
125 |       // Check if this line contains a date
126 |       let hasDate = false;
127 |       for (const pattern of datePatterns) {
128 |         if (pattern.test(line)) {
129 |           hasDate = true;
130 |           break;
131 |         }
132 |       }
133 | 
134 |       if (hasDate) {
135 |         // If we had a previous row, add it to the result
136 |         if (currentLine) {
137 |           const parsedRow = parseStatementRow(currentLine);
138 |           if (Object.keys(parsedRow).length > 0) {
139 |             result.push(parsedRow);
140 |           }
141 |         }
142 | 
143 |         // Start a new row
144 |         currentLine = line;
145 |       } else if (currentLine) {
146 |         // Continue the current row
147 |         currentLine += ' ' + line;
148 |       }
149 |     }
150 | 
151 |     // Add the last row if any
152 |     if (currentLine) {
153 |       const parsedRow = parseStatementRow(currentLine);
154 |       if (Object.keys(parsedRow).length > 0) {
155 |         result.push(parsedRow);
156 |       }
157 |     }
158 | 
159 |     // If we couldn't extract any structured data, fall back to unstructured parsing
160 |     if (result.length === 0) {
161 |       return parseUnstructuredText(text);
162 |     }
163 | 
164 |     return result;
165 |   } catch (error) {
166 |     console.warn('Error extracting structured data from PDF:', error);
167 |     // Fall back to unstructured parsing
168 |     return parseUnstructuredText(text);
169 |   }
170 | }
171 | 
172 | /**
173 |  * Parse a single row from a bank statement
174 |  * @param text The row text
175 |  * @returns Object with parsed values
176 |  */
177 | function parseStatementRow(text: string): Record<string, string | number> {
178 |   const result: Record<string, string | number> = {};
179 | 
180 |   try {
181 |     // Try to extract date
182 |     const dateMatch = text.match(/\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}-\d{2}-\d{2}/);
183 |     if (dateMatch) {
184 |       result.date = dateMatch[0];
185 |     }
186 | 
187 |     // Try to extract amount (typically currency values)
188 |     // Look for patterns like $123.45, R$123,45, 123.45, -123.45
189 |     const amountMatch = text.match(/[-+]?\s*[R$£€$]?\s*\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})/);
190 |     if (amountMatch) {
191 |       const amountStr = amountMatch[0].replace(/[R$£€$\s]/g, '').replace(',', '.');
192 |       result.amount = parseFloat(amountStr);
193 |     }
194 | 
195 |     // Extract description (everything except date and amount)
196 |     let description = text;
197 |     if (dateMatch) {
198 |       description = description.replace(dateMatch[0], '');
199 |     }
200 |     if (amountMatch) {
201 |       description = description.replace(amountMatch[0], '');
202 |     }
203 | 
204 |     // Clean up description
205 |     description = description.replace(/\s+/g, ' ').trim();
206 |     if (description) {
207 |       result.description = description;
208 |     }
209 | 
210 |     return result;
211 |   } catch (error) {
212 |     console.warn('Error parsing statement row:', error);
213 |     return {};
214 |   }
215 | }
216 | 
217 | /**
218 |  * Parse unstructured PDF text as a fallback
219 |  * @param text The full PDF text
220 |  * @returns Array of objects representing potential transactions
221 |  */
222 | function parseUnstructuredText(text: string): Array<Record<string, string | number>> {
223 |   const result: Array<Record<string, string | number>> = [];
224 | 
225 |   try {
226 |     // Split by newlines and remove empty lines
227 |     const lines = text.split('\n').filter(line => line.trim().length > 0);
228 | 
229 |     // Look for lines that might represent transactions
230 |     // This is a simplified approach that looks for lines containing both
231 |     // date patterns and currency values
232 |     for (const line of lines) {
233 |       const parsedRow = parseStatementRow(line);
234 | 
235 |       // Only consider rows that have at least a date or amount
236 |       if (parsedRow.date || parsedRow.amount !== undefined) {
237 |         result.push(parsedRow);
238 |       }
239 |     }
240 | 
241 |     return result;
242 |   } catch (error) {
243 |     console.warn('Error parsing unstructured text:', error);
244 |     return [];
245 |   }
246 | }
```

src/lib/utils/transaction-utils.ts
```
1 | /**
2 |  * Transaction Utilities
3 |  *
4 |  * This module provides utility functions for working with transactions.
5 |  */
6 | 
7 | /**
8 |  * Generates a deterministic transaction ID based on transaction data
9 |  *
10 |  * This function creates a consistent ID for transactions based on their properties,
11 |  * ensuring that the same transaction will always have the same ID regardless of
12 |  * when or how many times it's processed.
13 |  *
14 |  * @param transaction Transaction data to generate ID from
15 |  * @returns A deterministic transaction ID
16 |  */
17 | export function generateTransactionId(transaction?: Record<string, unknown>): string {
18 |   // If no transaction data is provided, fall back to random UUID
19 |   if (!transaction) {
20 |     return crypto.randomUUID();
21 |   }
22 | 
23 |   // Safely extract and normalize transaction properties
24 |   let dateStr = '';
25 |   let amountStr = '';
26 |   let descriptionStr = '';
27 |   let merchantStr = '';
28 |   let cardStr = '';
29 | 
30 |   // Extract date
31 |   if (transaction.date) {
32 |     if (transaction.date instanceof Date) {
33 |       dateStr = transaction.date.toISOString().split('T')[0]; // YYYY-MM-DD
34 |     } else if (typeof transaction.date === 'string') {
35 |       // Try to parse date string
36 |       const parsedDate = new Date(transaction.date);
37 |       if (!isNaN(parsedDate.getTime())) {
38 |         dateStr = parsedDate.toISOString().split('T')[0];
39 |       }
40 |     }
41 |   }
42 | 
43 |   // Extract amount
44 |   if (transaction.amount !== undefined && transaction.amount !== null) {
45 |     if (typeof transaction.amount === 'number') {
46 |       amountStr = transaction.amount.toFixed(2);
47 |     } else if (typeof transaction.amount === 'string') {
48 |       const parsedAmount = parseFloat(transaction.amount);
49 |       if (!isNaN(parsedAmount)) {
50 |         amountStr = parsedAmount.toFixed(2);
51 |       }
52 |     }
53 |   }
54 | 
55 |   // Extract description
56 |   if (transaction.description) {
57 |     if (typeof transaction.description === 'string') {
58 |       descriptionStr = transaction.description.trim().toLowerCase();
59 |     } else {
60 |       descriptionStr = String(transaction.description).trim().toLowerCase();
61 |     }
62 |   }
63 | 
64 |   // Extract merchant if available
65 |   if (transaction.merchant) {
66 |     if (typeof transaction.merchant === 'string') {
67 |       merchantStr = transaction.merchant.trim().toLowerCase();
68 |     } else {
69 |       merchantStr = String(transaction.merchant).trim().toLowerCase();
70 |     }
71 |   }
72 | 
73 |   // Extract card if available
74 |   if (transaction.card) {
75 |     if (typeof transaction.card === 'string') {
76 |       cardStr = transaction.card.trim().toLowerCase();
77 |     } else {
78 |       cardStr = String(transaction.card).trim().toLowerCase();
79 |     }
80 |   }
81 | 
82 |   // If essential data is missing, return random UUID
83 |   if (!dateStr || !amountStr || !descriptionStr) {
84 |     return crypto.randomUUID();
85 |   }
86 | 
87 |   // Combine all components for hashing
88 |   const dataToHash = `${dateStr}|${amountStr}|${descriptionStr}|${merchantStr}|${cardStr}`;
89 | 
90 |   // Create a hash of the data
91 |   // Note: In browser environments, this uses the subtle crypto API
92 |   // In Node.js, it would use the crypto module
93 |   const encoder = new TextEncoder();
94 |   const data = encoder.encode(dataToHash);
95 | 
96 |   // Using a simple hashing approach that works in both browser and Node.js
97 |   // For production, consider using a more robust hashing algorithm
98 |   let hash = 0;
99 |   for (let i = 0; i < data.length; i++) {
100 |     hash = (hash << 5) - hash + data[i];
101 |     hash |= 0; // Convert to 32bit integer
102 |   }
103 | 
104 |   // Create a hex representation and add a prefix to make it clear this is a deterministic ID
105 |   const hexHash = Math.abs(hash).toString(16).padStart(8, '0');
106 |   return `tx-${dateStr}-${hexHash}`;
107 | }
108 | 
109 | /**
110 |  * Determines if a transaction is likely a duplicate of another
111 |  *
112 |  * @param transaction1 First transaction to compare
113 |  * @param transaction2 Second transaction to compare
114 |  * @returns True if the transactions are likely duplicates
115 |  */
116 | export function isDuplicateTransaction(
117 |   transaction1: {
118 |     date: Date;
119 |     amount: number;
120 |     description: string;
121 |   },
122 |   transaction2: {
123 |     date: Date;
124 |     amount: number;
125 |     description: string;
126 |   }
127 | ): boolean {
128 |   // Check if amount is the same (within a small epsilon for floating point issues)
129 |   const amountMatches = Math.abs(transaction1.amount - transaction2.amount) < 0.01;
130 |   if (!amountMatches) return false;
131 | 
132 |   // Check if descriptions are similar
133 |   const description1 = transaction1.description.toLowerCase();
134 |   const description2 = transaction2.description.toLowerCase();
135 |   const descriptionSimilarity = calculateStringSimilarity(description1, description2);
136 | 
137 |   // Check if dates are close (within 1 day)
138 |   const dateTimeDiff = Math.abs(transaction1.date.getTime() - transaction2.date.getTime());
139 |   const dateMatches = dateTimeDiff <= 24 * 60 * 60 * 1000; // 1 day in milliseconds
140 | 
141 |   // If dates are more than 2 days apart, it's not a duplicate regardless of description
142 |   if (dateTimeDiff > 48 * 60 * 60 * 1000) return false;
143 | 
144 |   // If dates are between 1-2 days apart, only consider it a duplicate if descriptions are identical
145 |   if (dateTimeDiff > 24 * 60 * 60 * 1000 && descriptionSimilarity < 1) return false;
146 | 
147 |   // For transactions within 24 hours, use similarity threshold
148 |   return (
149 |     amountMatches &&
150 |     ((dateMatches && descriptionSimilarity > 0.7) ||
151 |       (description1 === description2 && dateTimeDiff <= 48 * 60 * 60 * 1000))
152 |   );
153 | }
154 | 
155 | /**
156 |  * Calculate similarity between two strings (0-1 where 1 is identical)
157 |  * Using a simplified version of Levenshtein distance
158 |  *
159 |  * @param str1 First string
160 |  * @param str2 Second string
161 |  * @returns Similarity score between 0-1
162 |  */
163 | function calculateStringSimilarity(str1: string, str2: string): number {
164 |   // If either string is empty, return 0
165 |   if (str1.length === 0 || str2.length === 0) {
166 |     return 0;
167 |   }
168 | 
169 |   // If strings are identical, return 1
170 |   if (str1 === str2) {
171 |     return 1;
172 |   }
173 | 
174 |   // Calculate Levenshtein distance
175 |   const matrix: number[][] = [];
176 | 
177 |   // Initialize matrix
178 |   for (let i = 0; i <= str1.length; i++) {
179 |     matrix[i] = [i];
180 |   }
181 | 
182 |   for (let j = 0; j <= str2.length; j++) {
183 |     matrix[0][j] = j;
184 |   }
185 | 
186 |   // Fill matrix
187 |   for (let i = 1; i <= str1.length; i++) {
188 |     for (let j = 1; j <= str2.length; j++) {
189 |       const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
190 |       matrix[i][j] = Math.min(
191 |         matrix[i - 1][j] + 1, // deletion
192 |         matrix[i][j - 1] + 1, // insertion
193 |         matrix[i - 1][j - 1] + cost // substitution
194 |       );
195 |     }
196 |   }
197 | 
198 |   // Calculate similarity (1 - normalized distance)
199 |   const distance = matrix[str1.length][str2.length];
200 |   const maxLength = Math.max(str1.length, str2.length);
201 | 
202 |   return 1 - distance / maxLength;
203 | }
```

src/app/(app)/ai-playground/page.tsx
```
1 | import { TransactionCategorizer } from '@/components/ai-playground/transaction-categorizer';
2 | import { TransactionExtractor } from '@/components/ai-playground/transaction-extractor';
3 | 
4 | import type { Metadata } from 'next';
5 | 
6 | export const metadata: Metadata = {
7 |   title: 'AI-Powered Playground',
8 |   description: 'Try out our tools for transaction management',
9 | };
10 | 
11 | export default function AIPlaygroundPage() {
12 |   return (
13 |     <div className="container mx-auto px-8 py-16 space-y-12">
14 |       <div>
15 |         <h1 className="text-3xl font-bold tracking-tight">AI-Powered Playground</h1>
16 |         <p className="mt-2 text-muted-foreground">Try out our tools for transaction management</p>
17 |       </div>
18 | 
19 |       <div className="flex flex-wrap gap-8">
20 |         {/* Transaction Extractor Section */}
21 |         <TransactionExtractor />
22 | 
23 |         {/* Transaction Categorizer Section */}
24 |         <TransactionCategorizer />
25 |       </div>
26 |     </div>
27 |   );
28 | }
```

src/lib/utils/__tests__/transaction-utils.test.ts
```
1 | import { describe, expect, test } from 'vitest';
2 | 
3 | import { generateTransactionId, isDuplicateTransaction } from '@/lib/utils/transaction-utils';
4 | 
5 | 
6 | describe('Transaction Utilities', () => {
7 |   describe('generateTransactionId', () => {
8 |     test('should generate a deterministic ID for the same transaction data', () => {
9 |       const transaction1 = {
10 |         date: new Date('2023-05-15'),
11 |         amount: 42.99,
12 |         description: 'Coffee Shop',
13 |         merchant: 'Starbucks',
14 |         card: 'Credit Card',
15 |       };
16 | 
17 |       const transaction2 = {
18 |         date: new Date('2023-05-15'),
19 |         amount: 42.99,
20 |         description: 'Coffee Shop',
21 |         merchant: 'Starbucks',
22 |         card: 'Credit Card',
23 |       };
24 | 
25 |       const id1 = generateTransactionId(transaction1);
26 |       const id2 = generateTransactionId(transaction2);
27 | 
28 |       expect(id1).toBe(id2);
29 |       expect(id1).toMatch(/^tx-\d{4}-\d{2}-\d{2}-[a-f0-9]+$/); // Format: tx-YYYY-MM-DD-hash
30 |     });
31 | 
32 |     test('should generate different IDs for different transaction data', () => {
33 |       const transaction1 = {
34 |         date: new Date('2023-05-15'),
35 |         amount: 42.99,
36 |         description: 'Coffee Shop',
37 |       };
38 | 
39 |       const transaction2 = {
40 |         date: new Date('2023-05-15'),
41 |         amount: 42.99,
42 |         description: 'Bookstore',
43 |       };
44 | 
45 |       const id1 = generateTransactionId(transaction1);
46 |       const id2 = generateTransactionId(transaction2);
47 | 
48 |       expect(id1).not.toBe(id2);
49 |     });
50 | 
51 |     test('should generate different IDs for transactions with same description but different amounts', () => {
52 |       const transaction1 = {
53 |         date: new Date('2023-05-15'),
54 |         amount: 42.99,
55 |         description: 'Coffee Shop',
56 |       };
57 | 
58 |       const transaction2 = {
59 |         date: new Date('2023-05-15'),
60 |         amount: 37.5,
61 |         description: 'Coffee Shop',
62 |       };
63 | 
64 |       const id1 = generateTransactionId(transaction1);
65 |       const id2 = generateTransactionId(transaction2);
66 | 
67 |       expect(id1).not.toBe(id2);
68 |     });
69 | 
70 |     test('should generate a UUID if transaction data is incomplete', () => {
71 |       const id = generateTransactionId({
72 |         date: new Date(),
73 |         // Missing required amount or description
74 |       });
75 | 
76 |       expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i); // UUID format
77 |     });
78 |   });
79 | 
80 |   describe('isDuplicateTransaction', () => {
81 |     test('should identify exact duplicates', () => {
82 |       const transaction1 = {
83 |         date: new Date('2023-05-15'),
84 |         amount: 42.99,
85 |         description: 'Coffee Shop',
86 |       };
87 | 
88 |       const transaction2 = {
89 |         date: new Date('2023-05-15'),
90 |         amount: 42.99,
91 |         description: 'Coffee Shop',
92 |       };
93 | 
94 |       expect(isDuplicateTransaction(transaction1, transaction2)).toBe(true);
95 |     });
96 | 
97 |     test('should identify duplicates with small variations in description', () => {
98 |       const transaction1 = {
99 |         date: new Date('2023-05-15'),
100 |         amount: 42.99,
101 |         description: 'Coffee Shop - Main St',
102 |       };
103 | 
104 |       const transaction2 = {
105 |         date: new Date('2023-05-15'),
106 |         amount: 42.99,
107 |         description: 'Coffee Shop Main St',
108 |       };
109 | 
110 |       expect(isDuplicateTransaction(transaction1, transaction2)).toBe(true);
111 |     });
112 | 
113 |     test('should identify duplicates with date within 24 hours', () => {
114 |       const transaction1 = {
115 |         date: new Date('2023-05-15T10:00:00'),
116 |         amount: 42.99,
117 |         description: 'Coffee Shop',
118 |       };
119 | 
120 |       const transaction2 = {
121 |         date: new Date('2023-05-16T09:00:00'), // 23 hours later
122 |         amount: 42.99,
123 |         description: 'Coffee Shop',
124 |       };
125 | 
126 |       expect(isDuplicateTransaction(transaction1, transaction2)).toBe(true);
127 |     });
128 | 
129 |     test('should not identify as duplicate if description is very different', () => {
130 |       const transaction1 = {
131 |         date: new Date('2023-05-15'),
132 |         amount: 42.99,
133 |         description: 'Coffee Shop',
134 |       };
135 | 
136 |       const transaction2 = {
137 |         date: new Date('2023-05-15'),
138 |         amount: 42.99,
139 |         description: 'Bookstore Downtown', // Very different description
140 |       };
141 | 
142 |       expect(isDuplicateTransaction(transaction1, transaction2)).toBe(false);
143 |     });
144 | 
145 |     test('should not identify as duplicate if amount is different', () => {
146 |       const transaction1 = {
147 |         date: new Date('2023-05-15'),
148 |         amount: 42.99,
149 |         description: 'Coffee Shop',
150 |       };
151 | 
152 |       const transaction2 = {
153 |         date: new Date('2023-05-15'),
154 |         amount: 37.5, // Different amount
155 |         description: 'Coffee Shop',
156 |       };
157 | 
158 |       expect(isDuplicateTransaction(transaction1, transaction2)).toBe(false);
159 |     });
160 | 
161 |     test('should not identify as duplicate if date is more than 48 hours apart', () => {
162 |       const transaction1 = {
163 |         date: new Date('2023-05-15T10:00:00'),
164 |         amount: 42.99,
165 |         description: 'Coffee Shop',
166 |       };
167 | 
168 |       const transaction2 = {
169 |         date: new Date('2023-05-18T10:00:00'), // 72 hours later
170 |         amount: 42.99,
171 |         description: 'Coffee Shop',
172 |       };
173 | 
174 |       // Calculate similarity for debugging
175 |       const description1 = transaction1.description.toLowerCase();
176 |       const description2 = transaction2.description.toLowerCase();
177 | 
178 |       // Import the similarity function for testing
179 |       const calculateStringSimilarity = (str1: string, str2: string): number => {
180 |         // If either string is empty, return 0
181 |         if (str1.length === 0 || str2.length === 0) {
182 |           return 0;
183 |         }
184 | 
185 |         // If strings are identical, return 1
186 |         if (str1 === str2) {
187 |           return 1;
188 |         }
189 | 
190 |         // Calculate Levenshtein distance
191 |         const matrix: number[][] = [];
192 | 
193 |         // Initialize matrix
194 |         for (let i = 0; i <= str1.length; i++) {
195 |           matrix[i] = [i];
196 |         }
197 | 
198 |         for (let j = 0; j <= str2.length; j++) {
199 |           matrix[0][j] = j;
200 |         }
201 | 
202 |         // Fill matrix
203 |         for (let i = 1; i <= str1.length; i++) {
204 |           for (let j = 1; j <= str2.length; j++) {
205 |             const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
206 |             matrix[i][j] = Math.min(
207 |               matrix[i - 1][j] + 1, // deletion
208 |               matrix[i][j - 1] + 1, // insertion
209 |               matrix[i - 1][j - 1] + cost // substitution
210 |             );
211 |           }
212 |         }
213 | 
214 |         // Calculate similarity (1 - normalized distance)
215 |         const distance = matrix[str1.length][str2.length];
216 |         const maxLength = Math.max(str1.length, str2.length);
217 | 
218 |         return 1 - distance / maxLength;
219 |       };
220 | 
221 |       const descriptionSimilarity = calculateStringSimilarity(description1, description2);
222 | 
223 |       // Using the same calculation as in the function
224 |       const dateTimeDiff = Math.abs(transaction1.date.getTime() - transaction2.date.getTime());
225 |       const dateMatches = dateTimeDiff <= 24 * 60 * 60 * 1000; // 1 day in milliseconds
226 | 
227 |       console.log('Debug info:');
228 |       console.log('Description 1:', description1);
229 |       console.log('Description 2:', description2);
230 |       console.log('Description similarity:', descriptionSimilarity);
231 |       console.log('Date time difference (ms):', dateTimeDiff);
232 |       console.log('Date time difference (hours):', dateTimeDiff / (60 * 60 * 1000));
233 |       console.log('Date matches (within 24h):', dateMatches);
234 | 
235 |       const result = isDuplicateTransaction(transaction1, transaction2);
236 |       console.log('Result:', result);
237 | 
238 |       expect(result).toBe(false);
239 |     });
240 |   });
241 | });
```
