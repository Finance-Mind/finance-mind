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
15 | - Only write/update tests when explicitly requested by the user
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
57 | - Never create, copy or move files and folder using command line
58 | 
59 | ## General Code Standards
60 | 
61 | - Use TypeScript for all `.ts` and `.tsx` files
62 | - Follow the Next.js App Router project structure
63 | - Implement routing using Next.js App Router file-based routing system
64 | - Leverage Next.js v15+ features like React Server Components, Server Actions, and enhanced Image component
65 | - Properly distinguish between Server Components and Client Components with 'use client' directive
66 | - Implement proper loading, error, and not-found states using Next.js conventions
67 | - Use descriptive names for variables, functions, and components
68 | - Keep components small and focused on a single responsibility
69 | - Follow DRY (Don't Repeat Yourself) principles
70 | - Write bug-free, fully functional, and working code
71 | - Prioritize code readability over premature optimization
72 | - Use the latest React and Next.js features appropriately
73 | - Write comprehensive unit and integration tests
74 | - Implement proper accessibility (a11y) features
75 | - Use constants instead of raw values
76 | - Define TypeScript types and interfaces for all props and state
77 | - NEVER use the `any` type - always define proper types for all variables, parameters, and return values
78 | 
79 | ## Code Documentation and Comments
80 | 
81 | - Avoid "stupid comments" that only repeat what the code already says
82 | - Comments should explain WHY, not WHAT (the code already shows what it does)
83 | - Do not add comments for obvious operations
84 | - Only comment complex logic, business rules, or non-obvious decisions
85 | - Use proper grammar and complete sentences in comments
86 | - Keep comments up-to-date when changing code
87 | 
88 | ### JSDoc Documentation
89 | 
90 | - Use JSDoc comments for all public functions, classes, and interfaces
91 | - Document parameters with `@param`, return values with `@returns`
92 | - Include type information even when TypeScript already provides it
93 | - Add examples with `@example` for complex functions
94 | - Document thrown exceptions with `@throws`
95 | - Add proper descriptions that explain purpose and context
96 | - Use `@see` to reference related functionality
97 | - Keep JSDoc comments concise but complete
98 | 
99 | ### Examples
100 | 
101 | Bad comment (avoid):
102 | 
103 | ```typescript
104 | // This function increments the counter by 1
105 | function incrementCounter() {
106 |   counter += 1;
107 | }
108 | ```
109 | 
110 | Good comment:
111 | 
112 | ```typescript
113 | /**
114 |  * Increments the activity counter and triggers analytics
115 |  * when threshold is reached.
116 |  *
117 |  * @see trackUserActivity for the analytics implementation
118 |  */
119 | function incrementCounter() {
120 |   counter += 1;
121 |   if (counter >= ACTIVITY_THRESHOLD) {
122 |     trackUserActivity();
123 |   }
124 | }
125 | ```
126 | 
127 | ## Testing Standards
128 | 
129 | - Only write tests when explicitly requested by the user
130 | - When implementing tests, follow these guidelines:
131 |   - Test components in isolation
132 |   - Test both UI rendering and functionality
133 |   - Use React Testing Library best practices
134 |   - Test server-side functionality separately
135 |   - Keep tests independent and isolated
136 |   - Tests should be repeatable with consistent results
137 |   - Tests should be readable and maintainable
138 |   - Tests should run quickly
139 |   - Test both positive and negative scenarios
140 |   - Test edge cases and boundary conditions
141 |   - Follow the AAA (Arrange-Act-Assert) pattern
142 |   - Use descriptive test names
143 |   - Mock external dependencies appropriately
144 | 
145 | ## Prompt Engineering Standards
146 | 
147 | - Design prompts using Vercel AI SDK's structured output generation
148 | - Use Zod schemas with proper `.describe()` annotations for all schema properties
149 | - Focus on financial domain specificity with special attention to:
150 |   - Banking terminology (transfers, deposits, withdrawals)
151 |   - Transaction categorization patterns
152 |   - Financial instruments and investment types
153 |   - Currency handling and formatting
154 |   - Brazilian financial system specifics
155 | - Create prompts that are language-aware and preserve original language in text fields
156 | - Implement error handling using the SDK's warning system
157 | - Use low temperature settings (0.1-0.3) explicitly set in SDK parameters
158 | - Leverage tool calling with descriptive, focused tools (keep under 5 tools per prompt)
159 | - Design two-stage processing where appropriate:
160 |   - First stage for extraction/detection
161 |   - Second stage for classification/categorization
162 | - Test prompts with diverse financial data samples across multiple languages
163 | - Use proper SDK debugging techniques to inspect and improve prompts
164 | - Organize schemas logically with proper naming conventions
165 | - Implement appropriate transformers for complex data types like dates
166 | - Balance schema complexity with model capabilities
167 | - Integrate AI components with proper server action patterns
168 | 
169 | ## Additional Guidance
170 | 
171 | - Use Next.js's optimized Image component for images
172 | - Implement SEO best practices with the Metadata API
173 | - Use Route Handlers for API functionality
174 | - Leverage Next.js's built-in CSS support (CSS Modules, Styled JSX, or Tailwind)
175 | - Implement proper error boundaries with error.tsx files
176 | - Use appropriate data fetching methods based on requirements:
177 |   - Use React Server Components for server-side data fetching
178 |   - Implement proper fetch caching options
179 |   - Use revalidation strategies appropriately
180 |   - Use SWR or React Query for client-side data fetching
181 | - Optimize for performance using Next.js best practices
182 | - Implement proper state management (React Context, Redux, Zustand, etc.)
183 | - Follow best practices for authentication and authorization
184 | - Use environment variables for configuration
185 | - Implement proper form validation and handling with Server Actions
186 | - Follow responsive design principles
187 | 
188 | ## TypeScript Best Practices
189 | 
190 | - NEVER use the `any` type in the codebase
191 | - Always define explicit types for variables, parameters, function returns, and component props
192 | - Use proper type narrowing techniques instead of type assertions when possible
193 | - When type assertions are necessary, use 'as' syntax with the most specific type possible
194 | - Use union types to represent variables that can have multiple types
195 | - Use intersection types to combine types
196 | - Leverage TypeScript's utility types (Partial, Required, Pick, Omit, etc.)
197 | - Create reusable type definitions for common data structures
198 | - Use generics for flexible, reusable components and functions
199 | - Enable strict mode in TypeScript configuration
200 | - Use readonly for immutable properties
201 | - Use proper null handling with optional chaining and nullish coalescing
202 | - Define constants with literal types when appropriate
203 | - Use enums for related constants with semantic meaning
204 | - Test TypeScript types with test cases that would fail to compile if the types are incorrect
205 | 
206 | <available_instructions>
207 | Cursor rules are user provided instructions for the AI to follow to help work with the codebase.
208 | They may or may not be relevent to the task at hand. If they are, use the fetch_rules tool to fetch the full rule.
209 | Some rules may be automatically attached to the conversation if the user attaches a file that matches the rule's glob, and wont need to be fetched.
210 | 
211 | nextjs: Next.js v15+ specific rules
212 | performance: Performance optimization specific rules for Next.js v15+
213 | api: API and Backend specific rules for Next.js v15+
214 | react: React specific rules
215 | colors: Color system and theming guidelines
216 | tailwind: Tailwind CSS v4 specific rules
217 | testing: Testing specific rules for Next.js v15+
218 | typescript: TypeScript specific rules
219 | prompts: Prompt engineering guidelines for Finance Mind's AI components
220 | </available_instructions>
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
8 | import unusedImportsPlugin from 'eslint-plugin-unused-imports';
9 | 
10 | const __filename = fileURLToPath(import.meta.url);
11 | const __dirname = dirname(__filename);
12 | 
13 | const compat = new FlatCompat({
14 |   baseDirectory: __dirname,
15 | });
16 | 
17 | const eslintConfig = [
18 |   // Base configurations
19 |   ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
20 | 
21 |   // Prettier config to turn off ESLint rules that conflict with Prettier
22 |   prettierConfig,
23 | 
24 |   // Common JavaScript/TypeScript rules
25 |   {
26 |     files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
27 |     plugins: {
28 |       'unused-imports': unusedImportsPlugin,
29 |     },
30 |     rules: {
31 |       // Keyword spacing rule
32 |       'keyword-spacing': ['error', { before: true, after: true }],
33 | 
34 |       // Statement spacing rules
35 |       'space-before-blocks': ['error', 'always'],
36 |       'space-infix-ops': 'error',
37 |       'space-in-parens': ['error', 'never'],
38 |       'space-before-function-paren': [
39 |         'error',
40 |         {
41 |           anonymous: 'always',
42 |           named: 'never',
43 |           asyncArrow: 'always',
44 |         },
45 |       ],
46 |       'comma-spacing': ['error', { before: false, after: true }],
47 |       'semi-spacing': ['error', { before: false, after: true }],
48 |       'brace-style': ['error', '1tbs', { allowSingleLine: true }],
49 |       'padded-blocks': ['error', 'never'],
50 | 
51 |       // Statement separation rule
52 |       'padding-line-between-statements': [
53 |         'error',
54 |         { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
55 |         { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
56 |         {
57 |           blankLine: 'always',
58 |           prev: '*',
59 |           next: ['return', 'if', 'for', 'while', 'do', 'switch', 'try'],
60 |         },
61 |         { blankLine: 'always', prev: ['if', 'for', 'while', 'do', 'switch', 'try'], next: '*' },
62 |       ],
63 | 
64 |       // Unused imports auto-fix rules
65 |       'unused-imports/no-unused-imports': 'error',
66 |       'unused-imports/no-unused-vars': [
67 |         'warn',
68 |         {
69 |           vars: 'all',
70 |           varsIgnorePattern: '^_',
71 |           args: 'after-used',
72 |           argsIgnorePattern: '^_',
73 |         },
74 |       ],
75 | 
76 |       // JSX specific rules
77 |       'react/jsx-newline': ['error', { prevent: false }],
78 |     },
79 |   },
80 | 
81 |   // TypeScript-specific configuration
82 |   {
83 |     files: ['**/*.{ts,tsx}'],
84 |     languageOptions: {
85 |       parser: typescriptParser,
86 |       parserOptions: {
87 |         ecmaVersion: 'latest',
88 |         sourceType: 'module',
89 |         project: './tsconfig.json',
90 |       },
91 |     },
92 |     plugins: {
93 |       '@typescript-eslint': typescriptPlugin,
94 |     },
95 |     rules: {
96 |       // TypeScript-specific rules
97 |       '@typescript-eslint/explicit-module-boundary-types': 'off', // Next.js doesn't need explicit return types
98 |       '@typescript-eslint/no-explicit-any': 'error', // Avoid using 'any' type
99 | 
100 |       // Disable the TypeScript unused vars rule in favor of the unused-imports plugin
101 |       '@typescript-eslint/no-unused-vars': 'off',
102 |       '@typescript-eslint/no-non-null-assertion': 'warn', // Warn about non-null assertions
103 |       '@typescript-eslint/consistent-type-imports': [
104 |         'error',
105 |         {
106 |           prefer: 'type-imports',
107 |           fixStyle: 'separate-type-imports',
108 |         },
109 |       ], // Enforce consistent type imports
110 |       '@typescript-eslint/consistent-type-definitions': ['error', 'interface'], // Prefer interfaces over types
111 |       '@typescript-eslint/ban-ts-comment': [
112 |         'error',
113 |         {
114 |           'ts-ignore': 'allow-with-description',
115 |           'ts-expect-error': 'allow-with-description',
116 |         },
117 |       ], // Only allow TS-ignore comments with descriptions
118 |     },
119 |   },
120 | ];
121 | 
122 | export default eslintConfig;
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
23 |     "@radix-ui/react-progress": "^1.1.2",
24 |     "@radix-ui/react-select": "^2.1.6",
25 |     "@radix-ui/react-slot": "^1.1.2",
26 |     "@radix-ui/react-tabs": "^1.1.3",
27 |     "@vercel/analytics": "^1.5.0",
28 |     "ai": "^4.1.54",
29 |     "chrono-node": "^2.7.8",
30 |     "date-fns": "^4.1.0",
31 |     "next": "15.2.1",
32 |     "next-themes": "^0.4.4",
33 |     "pdfjs-dist": "^4.2.41",
34 |     "react": "^19.0.0",
35 |     "react-day-picker": "^9.6.0",
36 |     "react-dom": "^19.0.0",
37 |     "react-dropzone": "^14.3.8",
38 |     "react-hook-form": "^7.54.2",
39 |     "react-icons": "^5.5.0",
40 |     "sonner": "^2.0.1",
41 |     "tailwind-merge": "^3.0.2",
42 |     "zod": "^3.24.2"
43 |   },
44 |   "devDependencies": {
45 |     "@eslint/eslintrc": "^3",
46 |     "@ianvs/prettier-plugin-sort-imports": "^4.4.1",
47 |     "@shadcn/ui": "^0.0.4",
48 |     "@tailwindcss/postcss": "^4",
49 |     "@trivago/prettier-plugin-sort-imports": "^5.2.2",
50 |     "@types/jest": "^29.5.14",
51 |     "@types/node": "^20",
52 |     "@types/pdfjs-dist": "^2.10.378",
53 |     "@types/react": "^19",
54 |     "@types/react-dom": "^19",
55 |     "@typescript-eslint/eslint-plugin": "^8.26.0",
56 |     "@typescript-eslint/parser": "^8.26.0",
57 |     "class-variance-authority": "^0.7.1",
58 |     "clsx": "^2.1.1",
59 |     "eslint": "^9",
60 |     "eslint-config-next": "15.2.1",
61 |     "eslint-config-prettier": "^10.1.1",
62 |     "eslint-plugin-prettier": "^5.2.3",
63 |     "eslint-plugin-unused-imports": "^4.1.4",
64 |     "lucide-react": "^0.479.0",
65 |     "prettier": "^3.5.3",
66 |     "prettier-plugin-tailwindcss": "^0.6.11",
67 |     "tailwindcss": "^4",
68 |     "tailwindcss-animate": "^1.0.7",
69 |     "type-fest": "^4.37.0",
70 |     "typescript": "^5",
71 |     "vitest": "^3.0.8"
72 |   }
73 | }
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
56 |   type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]).describe("Transaction type"),
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
90 |   "type": "EXPENSE",
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
124 |   type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]).describe("Transaction type"),
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
3 | import type { Metadata, Viewport } from 'next';
4 | import { Geist, Geist_Mono } from 'next/font/google';
5 | import Link from 'next/link';
6 | 
7 | import { Analytics } from '@vercel/analytics/react';
8 | 
9 | import { Providers } from '@/app/providers';
10 | import { ThemeProvider } from '@/components/theme-provider';
11 | import { ThemeToggle } from '@/components/theme-toggle';
12 | import { Button } from '@/components/ui/button';
13 | import { META_THEME_COLORS, siteConfig } from '@/config/site';
14 | import { cn } from '@/lib/utils';
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
107 |             <header className="border-border border-b">
108 |               <div className="container mx-auto px-8 py-12">
109 |                 <div className="space-y-6">
110 |                   <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
111 |                     <div className="mr-8">
112 |                       <h1 className="text-foreground text-3xl font-bold">Finance Mind</h1>
113 | 
114 |                       <p className="text-muted-foreground mt-2 text-sm">
115 |                         AI-driven finance tracker for intelligent bank statement analysis and
116 |                         insights
117 |                       </p>
118 |                     </div>
119 | 
120 |                     <ThemeToggle className="order-first md:order-last" />
121 |                   </div>
122 | 
123 |                   <div className="mr-16 flex flex-wrap gap-3">
124 |                     <Button variant="secondary" asChild>
125 |                       <Link href="/">Overview</Link>
126 |                     </Button>
127 | 
128 |                     <Button variant="secondary" asChild>
129 |                       <Link href="/ai-playground">AI Playground</Link>
130 |                     </Button>
131 | 
132 |                     <Button variant="outline" asChild>
133 |                       <Link href="https://andredezzy.com">@andredezzy</Link>
134 |                     </Button>
135 |                   </div>
136 |                 </div>
137 |               </div>
138 |             </header>
139 | 
140 |             {children}
141 | 
142 |             <footer className="border-border mt-12 border-t">
143 |               <div className="container mx-auto px-8 py-12">
144 |                 <div className="flex flex-col gap-8 md:flex-row">
145 |                   <div className="flex-1 pb-6">
146 |                     <div className="flex items-center">
147 |                       <h3 className="text-foreground flex-1 text-lg font-semibold">Finance Mind</h3>
148 |                     </div>
149 | 
150 |                     <p className="text-muted-foreground mt-2 text-sm">
151 |                       Take control of your financial life with intelligent analytics and insights.
152 |                     </p>
153 |                   </div>
154 | 
155 |                   <div className="md:hidden">
156 |                     <h4 className="text-foreground text-sm font-medium">Features</h4>
157 | 
158 |                     <ul className="text-muted-foreground mt-2 space-y-2 text-sm">
159 |                       <li>Bank statement processing</li>
160 | 
161 |                       <li>Transaction categorization</li>
162 | 
163 |                       <li>Financial insights</li>
164 | 
165 |                       <li>Multi-currency support</li>
166 |                     </ul>
167 |                   </div>
168 | 
169 |                   <div className="hidden md:block">
170 |                     <h4 className="text-foreground mb-2 text-left text-sm font-medium">Features</h4>
171 | 
172 |                     <ul className="text-muted-foreground space-y-2 text-left text-sm">
173 |                       <li>Bank statement processing</li>
174 | 
175 |                       <li>Transaction categorization</li>
176 | 
177 |                       <li>Financial insights</li>
178 | 
179 |                       <li>Multi-currency support</li>
180 |                     </ul>
181 |                   </div>
182 | 
183 |                   <div className="md:hidden">
184 |                     <h4 className="text-foreground text-sm font-medium">Links</h4>
185 | 
186 |                     <ul className="text-muted-foreground mt-2 space-y-2 text-sm">
187 |                       <li>Documentation</li>
188 | 
189 |                       <li>Support</li>
190 | 
191 |                       <li>Privacy Policy</li>
192 | 
193 |                       <li>Terms of Service</li>
194 |                     </ul>
195 |                   </div>
196 | 
197 |                   <div className="hidden md:block">
198 |                     <h4 className="text-foreground mb-2 text-left text-sm font-medium">Links</h4>
199 | 
200 |                     <ul className="text-muted-foreground space-y-2 text-left text-sm">
201 |                       <li>Documentation</li>
202 | 
203 |                       <li>Privacy Policy</li>
204 | 
205 |                       <li>Terms of Service</li>
206 | 
207 |                       <li>Support</li>
208 |                     </ul>
209 |                   </div>
210 |                 </div>
211 | 
212 |                 <div className="border-border mt-8 flex flex-col items-start justify-between border-t pt-8 md:flex-row md:items-center">
213 |                   <p className="text-muted-foreground text-xs">
214 |                     &copy; {new Date().getFullYear()} Finance Mind. All rights reserved.
215 |                   </p>
216 | 
217 |                   <div className="mt-4 flex space-x-4 md:mt-0">
218 |                     <span className="text-muted-foreground text-xs">
219 |                       <a
220 |                         href="https://andredezzy.com"
221 |                         target="_blank"
222 |                         rel="noopener noreferrer"
223 |                         className="text-primary hover:underline"
224 |                       >
225 |                         Andre &ldquo;Dezzy&rdquo; Victor
226 |                       </a>
227 |                     </span>
228 |                   </div>
229 |                 </div>
230 |               </div>
231 |             </footer>
232 |           </ThemeProvider>
233 |         </Providers>
234 | 
235 |         <Analytics />
236 |       </body>
237 |     </html>
238 |   );
239 | }
```

src/app/providers.tsx
```
1 | 'use client';
2 | 
3 | import type { ReactNode } from 'react';
4 | 
5 | import { Toaster } from '@/components/ui/sonner';
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

src/components/theme-provider.tsx
```
1 | 'use client';
2 | 
3 | import * as React from 'react';
4 | 
5 | import { ThemeProvider as NextThemesProvider } from 'next-themes';
6 | 
7 | export function ThemeProvider({
8 |   children,
9 |   ...props
10 | }: React.ComponentProps<typeof NextThemesProvider>) {
11 |   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
12 | }
```

src/components/theme-toggle.tsx
```
1 | 'use client';
2 | 
3 | import { useEffect, useState } from 'react';
4 | 
5 | import { useTheme } from 'next-themes';
6 | import { FiMonitor, FiMoon, FiSun } from 'react-icons/fi';
7 | 
8 | import { cn } from '@/lib/utils';
9 | 
10 | type ThemeOption = 'light' | 'dark' | 'system';
11 | 
12 | interface ThemeButtonProps {
13 |   theme: string | undefined;
14 |   value: ThemeOption;
15 |   icon: React.ElementType;
16 |   label: string;
17 |   onClick: (theme: ThemeOption) => void;
18 | }
19 | 
20 | function ThemeButton({ theme, value, icon: Icon, label, onClick }: ThemeButtonProps) {
21 |   const isActive = theme === value;
22 | 
23 |   return (
24 |     <button
25 |       onClick={() => onClick(value)}
26 |       className="text-foreground flex h-10 w-10 cursor-pointer items-center justify-center rounded-none"
27 |       aria-label={label}
28 |       aria-pressed={isActive}
29 |       data-state={isActive ? 'active' : 'inactive'}
30 |     >
31 |       <Icon className="h-4 w-4" />
32 |     </button>
33 |   );
34 | }
35 | 
36 | export function ThemeToggle({ className }: { className?: string }) {
37 |   const { theme, setTheme } = useTheme();
38 |   const [mounted, setMounted] = useState(false);
39 | 
40 |   // Only render theme toggle on client to avoid hydration mismatch
41 |   useEffect(() => {
42 |     setMounted(true);
43 |   }, []);
44 | 
45 |   const handleThemeChange = (newTheme: ThemeOption) => {
46 |     setTheme(newTheme);
47 |   };
48 | 
49 |   const themeOptions: Array<{
50 |     value: ThemeOption;
51 |     icon: React.ElementType;
52 |     label: string;
53 |   }> = [
54 |     { value: 'light', icon: FiSun, label: 'Light mode' },
55 |     { value: 'dark', icon: FiMoon, label: 'Dark mode' },
56 |     { value: 'system', icon: FiMonitor, label: 'System preference' },
57 |   ];
58 | 
59 |   // Avoid rendering toggle until client-side to prevent hydration mismatch
60 |   if (!mounted) {
61 |     return <div className="h-[38px] w-[138px]" />; // Placeholder with same size
62 |   }
63 | 
64 |   return (
65 |     <div className={cn('relative inline-block text-left', className)}>
66 |       <div
67 |         className="border-border bg-background flex items-center border"
68 |         role="group"
69 |         aria-label="Theme selection"
70 |       >
71 |         {themeOptions.map(option => (
72 |           <ThemeButton
73 |             key={option.value}
74 |             theme={theme}
75 |             value={option.value}
76 |             icon={option.icon}
77 |             label={option.label}
78 |             onClick={handleThemeChange}
79 |           />
80 |         ))}
81 |       </div>
82 |     </div>
83 |   );
84 | }
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
1 | import { clsx, type ClassValue } from 'clsx';
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

src/schemas/transaction.ts
```
1 | import { z } from 'zod';
2 | 
3 | import { TransactionCategory } from '@/types/transaction/enums/transaction-category';
4 | import { TransactionType } from '@/types/transaction/enums/transaction-type';
5 | 
6 | // Define the installment schema
7 | const installmentSchema = z.object({
8 |   current: z.number().int().positive().describe('Current installment number'),
9 |   total: z.number().int().positive().describe('Total number of installments'),
10 | });
11 | 
12 | // Define the transfer schema
13 | const transferSchema = z.object({
14 |   matchingTransactionId: z
15 |     .string()
16 |     .optional()
17 |     .describe('ID of the matching transaction in a transfer'),
18 |   fromAccount: z.string().optional().describe('Source account ID for the transfer'),
19 |   toAccount: z.string().optional().describe('Destination account ID for the transfer'),
20 |   fromPerson: z.string().optional().describe('Source person name for the transfer'),
21 |   toPerson: z.string().optional().describe('Destination person name for the transfer'),
22 | });
23 | 
24 | // Define the main transaction schema
25 | export const transactionSchema = z.object({
26 |   id: z.string().describe('Unique identifier for the transaction'),
27 |   type: z.nativeEnum(TransactionType).describe('Type of transaction'),
28 |   amount: z.number().describe('Transaction amount'),
29 |   currency: z.string().describe('Currency code for the transaction'),
30 |   date: z.string().describe('Date of the transaction'),
31 |   description: z.string().describe('Description of the transaction'),
32 |   category: z.nativeEnum(TransactionCategory).describe('Category of the transaction'),
33 |   card: z.string().optional().describe('Card used for the transaction'),
34 |   merchant: z.string().optional().describe('Merchant name for the transaction'),
35 |   fee: z.number().optional().describe('Fee associated with the transaction'),
36 |   installment: installmentSchema.optional().describe('Installment details if applicable'),
37 |   isInternalTransfer: z.boolean().optional().describe('Whether this is an internal transfer'),
38 |   isP2PTransfer: z.boolean().optional().describe('Whether this is a peer-to-peer transfer'),
39 |   transfer: transferSchema.optional().describe('Transfer details if applicable'),
40 | });
41 | 
42 | export type Transaction = z.infer<typeof transactionSchema>;
```

src/utils/apply-column-mapping.ts
```
1 | /**
2 |  * Apply column mapping to parsed CSV data
3 |  * @param rows The parsed CSV data
4 |  * @param mapping The column mapping from AI
5 |  * @returns Array of objects with standardized field names
6 |  */
7 | export function applyColumnMapping<T extends Record<string, string | number>>(
8 |   rows: Array<Record<string, string | number>>,
9 |   mapping: T
10 | ): Array<{
11 |   [key in keyof T]?: string | number;
12 | }> {
13 |   if (!rows.length) {
14 |     return [];
15 |   }
16 | 
17 |   return rows.map(row => {
18 |     const mappedRow: {
19 |       [key in keyof T]?: string | number;
20 |     } = {};
21 | 
22 |     // Apply each field mapping
23 |     Object.entries(mapping).forEach(([field, columnName]) => {
24 |       // If we have a mapping for this field and the column exists in the row
25 |       if (columnName && typeof columnName === 'string' && columnName in row) {
26 |         mappedRow[field as keyof T] = row[columnName];
27 |       }
28 |     });
29 | 
30 |     // Include all original fields too with their original names
31 |     // This ensures we don't lose any data
32 |     Object.entries(row).forEach(([key, value]) => {
33 |       if (!(key in mappedRow)) {
34 |         mappedRow[key as keyof T] = value;
35 |       }
36 |     });
37 | 
38 |     return mappedRow;
39 |   });
40 | }
```

src/utils/calculate-string-similarity.ts
```
1 | /**
2 |  * Calculate similarity between two strings (0-1 where 1 is identical)
3 |  * Using a simplified version of Levenshtein distance
4 |  *
5 |  * @param str1 First string
6 |  * @param str2 Second string
7 |  * @returns Similarity score between 0-1
8 |  */
9 | export function calculateStringSimilarity(str1: string, str2: string): number {
10 |   // If either string is empty, return 0
11 |   if (str1.length === 0 || str2.length === 0) {
12 |     return 0;
13 |   }
14 | 
15 |   // If strings are identical, return 1
16 |   if (str1 === str2) {
17 |     return 1;
18 |   }
19 | 
20 |   // Calculate Levenshtein distance
21 |   const matrix: number[][] = [];
22 | 
23 |   // Initialize matrix
24 |   for (let i = 0; i <= str1.length; i++) {
25 |     matrix[i] = [i];
26 |   }
27 | 
28 |   for (let j = 0; j <= str2.length; j++) {
29 |     matrix[0][j] = j;
30 |   }
31 | 
32 |   // Fill matrix
33 |   for (let i = 1; i <= str1.length; i++) {
34 |     for (let j = 1; j <= str2.length; j++) {
35 |       const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
36 | 
37 |       matrix[i][j] = Math.min(
38 |         matrix[i - 1][j] + 1, // deletion
39 |         matrix[i][j - 1] + 1, // insertion
40 |         matrix[i - 1][j - 1] + cost // substitution
41 |       );
42 |     }
43 |   }
44 | 
45 |   // Calculate similarity (1 - normalized distance)
46 |   const distance = matrix[str1.length][str2.length];
47 |   const maxLength = Math.max(str1.length, str2.length);
48 | 
49 |   return 1 - distance / maxLength;
50 | }
```

src/utils/detect-mobile-device.ts
```
1 | /**
2 |  * Detects if the current device is a mobile device
3 |  * @returns True if the device is mobile, false otherwise
4 |  */
5 | export function detectMobileDevice(): boolean {
6 |   if (typeof window === 'undefined') {
7 |     return false;
8 |   }
9 | 
10 |   const userAgent =
11 |     navigator.userAgent || navigator.vendor || (window as Window & { opera?: string }).opera || '';
12 |   const mobileRegex =
13 |     /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
14 | 
15 |   return mobileRegex.test(userAgent);
16 | }
```

src/utils/format-duration.ts
```
1 | /**
2 |  * Formats a duration in milliseconds to a human-readable string
3 |  * @param ms The duration in milliseconds
4 |  * @returns The formatted duration string
5 |  */
6 | export function formatDuration(ms: number): string {
7 |   if (ms < 1000) {
8 |     return `${ms}ms`;
9 |   }
10 | 
11 |   const seconds = Math.floor(ms / 1000);
12 |   const minutes = Math.floor(seconds / 60);
13 |   const remainingSeconds = seconds % 60;
14 | 
15 |   if (minutes === 0) {
16 |     return `${seconds}s`;
17 |   }
18 | 
19 |   return `${minutes}m ${remainingSeconds}s`;
20 | }
```

src/utils/transaction-utils.ts
```
1 | /**
2 |  * Transaction Utilities
3 |  *
4 |  * This module provides utility functions for working with transactions.
5 |  */
6 | 
7 | import { calculateStringSimilarity } from '@/utils/calculate-string-similarity';
8 | 
9 | /**
10 |  * Determines if a transaction is likely a duplicate of another
11 |  *
12 |  * @param transaction1 First transaction to compare
13 |  * @param transaction2 Second transaction to compare
14 |  * @returns True if the transactions are likely duplicates
15 |  */
16 | export function isDuplicateTransaction(
17 |   transaction1: {
18 |     date: Date;
19 |     amount: number;
20 |     description: string;
21 |   },
22 |   transaction2: {
23 |     date: Date;
24 |     amount: number;
25 |     description: string;
26 |   }
27 | ): boolean {
28 |   // Check if amount is the same (within a small epsilon for floating point issues)
29 |   const amountMatches = Math.abs(transaction1.amount - transaction2.amount) < 0.01;
30 | 
31 |   if (!amountMatches) {
32 |     return false;
33 |   }
34 | 
35 |   // Check if descriptions are similar
36 |   const description1 = transaction1.description.toLowerCase();
37 |   const description2 = transaction2.description.toLowerCase();
38 |   const descriptionSimilarity = calculateStringSimilarity(description1, description2);
39 | 
40 |   // Check if dates are close (within 1 day)
41 |   const dateTimeDiff = Math.abs(transaction1.date.getTime() - transaction2.date.getTime());
42 |   const dateMatches = dateTimeDiff <= 24 * 60 * 60 * 1000; // 1 day in milliseconds
43 | 
44 |   // If dates are more than 2 days apart, it's not a duplicate regardless of description
45 |   if (dateTimeDiff > 48 * 60 * 60 * 1000) return false;
46 | 
47 |   // If dates are between 1-2 days apart, only consider it a duplicate if descriptions are identical
48 |   if (dateTimeDiff > 24 * 60 * 60 * 1000 && descriptionSimilarity < 1) return false;
49 | 
50 |   // For transactions within 24 hours, use similarity threshold
51 |   return (
52 |     amountMatches &&
53 |     ((dateMatches && descriptionSimilarity > 0.7) ||
54 |       (description1 === description2 && dateTimeDiff <= 48 * 60 * 60 * 1000))
55 |   );
56 | }
```

src/app/(app)/page.tsx
```
1 | 'use client';
2 | 
3 | import { useState } from 'react';
4 | 
5 | import { ManualTransactionForm } from '@/components/overview/manual-transaction-form';
6 | import { StatementFileUploader } from '@/components/overview/statement-file-uploader/card';
7 | import { Button } from '@/components/ui/button';
8 | import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
9 | import type { Transaction } from '@/schemas/transaction';
10 | import { TransactionCategory } from '@/types/transaction/enums/transaction-category';
11 | 
12 | export default function OverviewPage() {
13 |   const [transactions, setTransactions] = useState<Transaction[]>([]);
14 |   const [errors, setErrors] = useState<string[]>([]);
15 |   const [warnings, setWarnings] = useState<string[]>([]);
16 | 
17 |   // Calculate derived metrics from transactions
18 |   const totalIncome = transactions
19 |     .filter(t => t.type === 'INCOME')
20 |     .reduce((sum, t) => sum + t.amount, 0);
21 | 
22 |   const totalExpenses = transactions
23 |     .filter(t => t.type === 'EXPENSE')
24 |     .reduce((sum, t) => sum + t.amount, 0);
25 | 
26 |   const totalTransfers = transactions
27 |     .filter(t => t.type === 'TRANSFER')
28 |     .reduce((sum, t) => sum + t.amount, 0);
29 | 
30 |   // Use Math.abs on totalTransfers to ensure it's always subtracted as a positive value
31 |   const balance = totalIncome - totalExpenses - Math.abs(totalTransfers);
32 | 
33 |   console.log('transactions', transactions);
34 |   console.log(
35 |     'income transactions',
36 |     transactions.filter(t => t.type === 'INCOME')
37 |   );
38 |   console.log(
39 |     'expense transactions',
40 |     transactions.filter(t => t.type === 'EXPENSE')
41 |   );
42 |   console.log(
43 |     'transfer transactions',
44 |     transactions.filter(t => t.type === 'TRANSFER')
45 |   );
46 |   console.log('totalIncome', totalIncome);
47 |   console.log('totalExpenses', totalExpenses);
48 |   console.log('totalTransfers', totalTransfers);
49 |   console.log('balance', balance);
50 | 
51 |   // Calculate top expense categories
52 |   const expensesByCategory = transactions
53 |     .filter(t => t.type === 'EXPENSE' || t.type === 'TRANSFER')
54 |     .reduce(
55 |       (acc, transaction) => {
56 |         const category = transaction.category;
57 | 
58 |         if (!acc[category]) {
59 |           acc[category] = 0;
60 |         }
61 | 
62 |         acc[category] += transaction.amount;
63 | 
64 |         return acc;
65 |       },
66 |       {} as Record<string, number>
67 |     );
68 | 
69 |   const topCategories = Object.entries(expensesByCategory)
70 |     .sort((a, b) => b[1] - a[1])
71 |     .slice(0, 5);
72 | 
73 |   // Handler for processed transactions
74 |   const handleTransactionsProcessed = (
75 |     newTransactions: Transaction[],
76 |     newErrors?: string[],
77 |     newWarnings?: string[]
78 |   ) => {
79 |     console.log('Processing new transactions:', newTransactions.length);
80 | 
81 |     // Update the transaction list
82 |     setTransactions(prev => {
83 |       // Combine existing and new transactions
84 |       // In a real app, we would check for duplicates here
85 |       const combined = [...newTransactions, ...prev];
86 | 
87 |       // Sort transactions by date (newest first)
88 |       return combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
89 |     });
90 | 
91 |     // Update errors and warnings
92 |     if (newErrors && newErrors.length > 0) {
93 |       setErrors(prev => [...newErrors, ...prev]);
94 |     }
95 | 
96 |     if (newWarnings && newWarnings.length > 0) {
97 |       setWarnings(prev => [...newWarnings, ...prev]);
98 |     }
99 |   };
100 | 
101 |   // Format currency for display
102 |   const formatCurrency = (amount: number, currency: string = 'BRL') => {
103 |     return new Intl.NumberFormat('pt-BR', {
104 |       style: 'currency',
105 |       currency,
106 |     }).format(amount);
107 |   };
108 | 
109 |   // Format date for display
110 |   const formatDate = (date: string) => {
111 |     return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
112 |   };
113 | 
114 |   return (
115 |     <div className="container mx-auto px-8 py-16">
116 |       <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
117 |         {/* Upload Bank Statements */}
118 |         <StatementFileUploader onTransactionsProcessed={handleTransactionsProcessed} />
119 | 
120 |         {/* Add Manual Transaction */}
121 |         <ManualTransactionForm />
122 |       </div>
123 | 
124 |       {/* Errors and Warnings */}
125 |       {(errors.length > 0 || warnings.length > 0) && (
126 |         <Card className="mb-8 border">
127 |           <CardHeader>
128 |             <CardTitle>Processing Messages</CardTitle>
129 | 
130 |             <CardDescription>
131 |               {errors.length > 0 ? 'Some errors occurred during processing' : 'Processing notes'}
132 |             </CardDescription>
133 |           </CardHeader>
134 | 
135 |           <CardContent>
136 |             {errors.length > 0 && (
137 |               <div className="mb-4">
138 |                 <h3 className="text-destructive mb-2 text-sm font-medium">Errors:</h3>
139 | 
140 |                 <ul className="text-destructive/80 list-disc space-y-1 pl-5 text-sm">
141 |                   {errors.map((error, index) => (
142 |                     <li key={index}>{error}</li>
143 |                   ))}
144 |                 </ul>
145 |               </div>
146 |             )}
147 | 
148 |             {warnings.length > 0 && (
149 |               <div className="mb-4">
150 |                 <h3 className="mb-2 text-sm font-medium text-amber-600 dark:text-amber-400">
151 |                   Warnings:
152 |                 </h3>
153 | 
154 |                 <ul className="list-disc space-y-1 pl-5 text-sm text-amber-600/80 dark:text-amber-400/90">
155 |                   {warnings.map((warning, index) => (
156 |                     <li key={index}>{warning}</li>
157 |                   ))}
158 |                 </ul>
159 |               </div>
160 |             )}
161 |           </CardContent>
162 |         </Card>
163 |       )}
164 | 
165 |       {/* Transactions Table */}
166 |       <Card className="mb-8 border">
167 |         <CardHeader>
168 |           <div className="flex items-center justify-between">
169 |             <div>
170 |               <CardTitle>Transactions</CardTitle>
171 | 
172 |               <CardDescription>AI-powered categorized transactions</CardDescription>
173 |             </div>
174 | 
175 |             <div className="flex gap-2">
176 |               <Button variant="outline" size="sm">
177 |                 <svg
178 |                   xmlns="http://www.w3.org/2000/svg"
179 |                   width="24"
180 |                   height="24"
181 |                   viewBox="0 0 24 24"
182 |                   fill="none"
183 |                   stroke="currentColor"
184 |                   strokeWidth="2"
185 |                   strokeLinecap="round"
186 |                   strokeLinejoin="round"
187 |                   className="mr-1 h-4 w-4"
188 |                 >
189 |                   <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
190 | 
191 |                   <line x1="3" x2="21" y1="9" y2="9" />
192 | 
193 |                   <line x1="9" x2="9" y1="21" y2="9" />
194 |                 </svg>
195 |                 Filter
196 |               </Button>
197 | 
198 |               <Button variant="outline" size="sm">
199 |                 <svg
200 |                   xmlns="http://www.w3.org/2000/svg"
201 |                   width="24"
202 |                   height="24"
203 |                   viewBox="0 0 24 24"
204 |                   fill="none"
205 |                   stroke="currentColor"
206 |                   strokeWidth="2"
207 |                   strokeLinecap="round"
208 |                   strokeLinejoin="round"
209 |                   className="mr-1 h-4 w-4"
210 |                 >
211 |                   <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
212 | 
213 |                   <polyline points="7 10 12 15 17 10" />
214 | 
215 |                   <line x1="12" x2="12" y1="15" y2="3" />
216 |                 </svg>
217 |                 Export
218 |               </Button>
219 |             </div>
220 |           </div>
221 |         </CardHeader>
222 | 
223 |         <CardContent>
224 |           <div className="border">
225 |             <div className="relative w-full overflow-auto">
226 |               <table className="w-full caption-bottom text-sm">
227 |                 <thead>
228 |                   <tr className="bg-muted/50 border-b transition-colors">
229 |                     <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
230 | 
231 |                     <th className="h-12 px-4 text-left align-middle font-medium">Description</th>
232 | 
233 |                     <th className="h-12 min-w-[200px] px-4 text-left align-middle font-medium">
234 |                       Category
235 |                     </th>
236 | 
237 |                     <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
238 | 
239 |                     <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
240 |                   </tr>
241 |                 </thead>
242 | 
243 |                 <tbody>
244 |                   {transactions.length > 0 ? (
245 |                     transactions.map((transaction, index) => {
246 |                       // Create a composite key using both the transaction ID and array index
247 |                       // This ensures uniqueness even if the transaction ID is somehow duplicated
248 |                       const uniqueKey = `${transaction.id}-${index}`;
249 | 
250 |                       return (
251 |                         <tr
252 |                           key={uniqueKey}
253 |                           className="hover:bg-muted/50 border-b transition-colors last:border-b-0"
254 |                         >
255 |                           <td className="p-4 align-middle">{formatDate(transaction.date)}</td>
256 | 
257 |                           <td className="p-4 align-middle">
258 |                             {transaction.description}
259 | 
260 |                             {transaction.merchant && (
261 |                               <div className="text-muted-foreground text-xs">
262 |                                 {transaction.merchant}
263 |                               </div>
264 |                             )}
265 | 
266 |                             {transaction.card && (
267 |                               <div className="text-primary mt-1 text-xs font-medium">
268 |                                 {transaction.card}
269 |                               </div>
270 |                             )}
271 |                           </td>
272 | 
273 |                           <td className="p-4 align-middle">
274 |                             <span
275 |                               className={`inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold ${
276 |                                 transaction.isInternalTransfer
277 |                                   ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300'
278 |                                   : transaction.isP2PTransfer
279 |                                     ? 'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300'
280 |                                     : transaction.type === 'INCOME'
281 |                                       ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
282 |                                       : transaction.type === 'EXPENSE'
283 |                                         ? 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300'
284 |                                         : 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300'
285 |                               }`}
286 |                             >
287 |                               {transaction.isInternalTransfer
288 |                                 ? 'Internal Transfer'
289 |                                 : transaction.category !== TransactionCategory.UNCATEGORIZED
290 |                                   ? transaction.category
291 |                                   : 'P2P Transfer'}
292 |                             </span>
293 | 
294 |                             {transaction.installment && (
295 |                               <div className="text-muted-foreground mt-1 text-xs">
296 |                                 {`Installment ${transaction.installment.current}/${transaction.installment.total}`}
297 |                               </div>
298 |                             )}
299 | 
300 |                             {(transaction.isInternalTransfer || transaction.isP2PTransfer) &&
301 |                               transaction.transfer && (
302 |                                 <div className="mt-1 text-xs text-blue-600 dark:text-blue-400">
303 |                                   {transaction.transfer.fromPerson &&
304 |                                   transaction.transfer.toPerson ? (
305 |                                     <>
306 |                                       {`From: ${transaction.transfer.fromPerson} → To: ${transaction.transfer.toPerson}`}
307 |                                     </>
308 |                                   ) : transaction.transfer.fromAccount &&
309 |                                     transaction.transfer.toAccount ? (
310 |                                     <>
311 |                                       {`From: ${transaction.transfer.fromAccount} → To: ${transaction.transfer.toAccount}`}
312 |                                     </>
313 |                                   ) : null}
314 |                                 </div>
315 |                               )}
316 |                           </td>
317 | 
318 |                           <td className="p-4 align-middle whitespace-nowrap">
319 |                             <span
320 |                               className={
321 |                                 transaction.amount < 0
322 |                                   ? 'text-red-600 dark:text-red-400'
323 |                                   : 'text-emerald-600 dark:text-emerald-400'
324 |                               }
325 |                             >
326 |                               {formatCurrency(transaction.amount, transaction.currency)}
327 |                             </span>
328 |                           </td>
329 | 
330 |                           <td className="p-4 align-middle">
331 |                             <div className="flex gap-2">
332 |                               <Button variant="ghost" size="icon" className="h-8 w-8">
333 |                                 <svg
334 |                                   xmlns="http://www.w3.org/2000/svg"
335 |                                   width="24"
336 |                                   height="24"
337 |                                   viewBox="0 0 24 24"
338 |                                   fill="none"
339 |                                   stroke="currentColor"
340 |                                   strokeWidth="2"
341 |                                   strokeLinecap="round"
342 |                                   strokeLinejoin="round"
343 |                                   className="h-4 w-4"
344 |                                 >
345 |                                   <path d="M12 20h9" />
346 | 
347 |                                   <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
348 |                                 </svg>
349 | 
350 |                                 <span className="sr-only">Edit</span>
351 |                               </Button>
352 | 
353 |                               <Button variant="ghost" size="icon" className="h-8 w-8">
354 |                                 <svg
355 |                                   xmlns="http://www.w3.org/2000/svg"
356 |                                   width="24"
357 |                                   height="24"
358 |                                   viewBox="0 0 24 24"
359 |                                   fill="none"
360 |                                   stroke="currentColor"
361 |                                   strokeWidth="2"
362 |                                   strokeLinecap="round"
363 |                                   strokeLinejoin="round"
364 |                                   className="h-4 w-4"
365 |                                 >
366 |                                   <path d="M3 6h18" />
367 | 
368 |                                   <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
369 | 
370 |                                   <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
371 |                                 </svg>
372 | 
373 |                                 <span className="sr-only">Delete</span>
374 |                               </Button>
375 |                             </div>
376 |                           </td>
377 |                         </tr>
378 |                       );
379 |                     })
380 |                   ) : (
381 |                     <tr>
382 |                       <td colSpan={5} className="text-muted-foreground p-4 text-center">
383 |                         No transactions found. Upload a bank statement or add a manual transaction.
384 |                       </td>
385 |                     </tr>
386 |                   )}
387 |                 </tbody>
388 |               </table>
389 |             </div>
390 |           </div>
391 |         </CardContent>
392 |       </Card>
393 | 
394 |       <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
395 |         {/* Month Overview Card */}
396 |         <Card className="border">
397 |           <CardHeader>
398 |             <CardTitle>Month Overview</CardTitle>
399 |           </CardHeader>
400 | 
401 |           <CardContent>
402 |             <div className="space-y-4">
403 |               <div>
404 |                 <div className="mb-1 flex items-center justify-between">
405 |                   <span className="text-sm">Income</span>
406 | 
407 |                   <span className="text-sm text-emerald-600 dark:text-emerald-400">
408 |                     {formatCurrency(totalIncome)}
409 |                   </span>
410 |                 </div>
411 | 
412 |                 <div className="h-2.5 w-full bg-emerald-100 dark:bg-emerald-900">
413 |                   <div
414 |                     className="h-2.5 bg-emerald-500 dark:bg-emerald-600"
415 |                     style={{
416 |                       width: '100%',
417 |                     }}
418 |                   ></div>
419 |                 </div>
420 |               </div>
421 | 
422 |               <div>
423 |                 <div className="mb-1 flex items-center justify-between">
424 |                   <span className="text-sm">Expenses</span>
425 | 
426 |                   <span className="text-sm text-red-500 dark:text-red-400">
427 |                     {formatCurrency(totalExpenses)}
428 |                   </span>
429 |                 </div>
430 | 
431 |                 <div className="h-2.5 w-full bg-red-100 dark:bg-red-900">
432 |                   <div
433 |                     className="h-2.5 bg-red-400 dark:bg-red-600"
434 |                     style={{
435 |                       width: `${Math.min(100, (totalExpenses / Math.max(totalIncome, 1)) * 100)}%`,
436 |                     }}
437 |                   ></div>
438 |                 </div>
439 |               </div>
440 | 
441 |               <div>
442 |                 <div className="mb-1 flex items-center justify-between">
443 |                   <span className="text-sm">Transfers</span>
444 | 
445 |                   <span className="text-sm text-blue-500 dark:text-blue-400">
446 |                     {formatCurrency(totalTransfers)}
447 |                   </span>
448 |                 </div>
449 | 
450 |                 <div className="h-2.5 w-full bg-blue-100 dark:bg-blue-900">
451 |                   <div
452 |                     className="h-2.5 bg-blue-400 dark:bg-blue-600"
453 |                     style={{
454 |                       width: `${Math.min(100, (Math.abs(totalTransfers) / Math.max(totalIncome, 1)) * 100)}%`,
455 |                     }}
456 |                   ></div>
457 |                 </div>
458 |               </div>
459 | 
460 |               <div className="mt-8">
461 |                 <div className="flex items-center justify-between">
462 |                   <span>Balance</span>
463 | 
464 |                   <span
465 |                     className={`${balance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}
466 |                   >
467 |                     {formatCurrency(balance)}
468 |                   </span>
469 |                 </div>
470 |               </div>
471 |             </div>
472 |           </CardContent>
473 |         </Card>
474 | 
475 |         {/* Top Categories Card */}
476 |         <Card className="border">
477 |           <CardHeader>
478 |             <CardTitle>Top Categories</CardTitle>
479 |           </CardHeader>
480 | 
481 |           <CardContent>
482 |             <div className="space-y-4">
483 |               {topCategories.map(([category, amount], index) => {
484 |                 const categoryColors: Record<string, { bg: string; text: string }> = {
485 |                   GROCERIES: {
486 |                     bg: 'bg-emerald-500 dark:bg-emerald-600',
487 |                     text: 'text-emerald-600 dark:text-emerald-400',
488 |                   },
489 |                   DINING: {
490 |                     bg: 'bg-amber-500 dark:bg-amber-600',
491 |                     text: 'text-amber-600 dark:text-amber-400',
492 |                   },
493 |                   ENTERTAINMENT: {
494 |                     bg: 'bg-purple-500 dark:bg-purple-600',
495 |                     text: 'text-purple-600 dark:text-purple-400',
496 |                   },
497 |                   TRANSPORTATION: {
498 |                     bg: 'bg-orange-500 dark:bg-orange-600',
499 |                     text: 'text-orange-600 dark:text-orange-400',
500 |                   },
501 |                   UTILITIES: {
502 |                     bg: 'bg-violet-500 dark:bg-violet-600',
503 |                     text: 'text-violet-600 dark:text-violet-400',
504 |                   },
505 |                   HOUSING: {
506 |                     bg: 'bg-cyan-500 dark:bg-cyan-600',
507 |                     text: 'text-cyan-600 dark:text-cyan-400',
508 |                   },
509 |                   HEALTH: {
510 |                     bg: 'bg-rose-500 dark:bg-rose-600',
511 |                     text: 'text-rose-600 dark:text-rose-400',
512 |                   },
513 |                   EDUCATION: {
514 |                     bg: 'bg-blue-500 dark:bg-blue-600',
515 |                     text: 'text-blue-600 dark:text-blue-400',
516 |                   },
517 |                   SHOPPING: {
518 |                     bg: 'bg-fuchsia-500 dark:bg-fuchsia-600',
519 |                     text: 'text-fuchsia-600 dark:text-fuchsia-400',
520 |                   },
521 |                   TRAVEL: {
522 |                     bg: 'bg-indigo-500 dark:bg-indigo-600',
523 |                     text: 'text-indigo-600 dark:text-indigo-400',
524 |                   },
525 |                   PERSONAL_CARE: {
526 |                     bg: 'bg-pink-500 dark:bg-pink-600',
527 |                     text: 'text-pink-600 dark:text-pink-400',
528 |                   },
529 |                   SUBSCRIPTIONS: {
530 |                     bg: 'bg-lime-500 dark:bg-lime-600',
531 |                     text: 'text-lime-600 dark:text-lime-400',
532 |                   },
533 |                   UNCATEGORIZED: {
534 |                     bg: 'bg-gray-500 dark:bg-gray-600',
535 |                     text: 'text-gray-600 dark:text-gray-400',
536 |                   },
537 |                 };
538 | 
539 |                 const defaultColor = {
540 |                   bg: 'bg-gray-500 dark:bg-gray-600',
541 |                   text: 'text-gray-600 dark:text-gray-400',
542 |                 };
543 |                 const color = categoryColors[category] || defaultColor;
544 | 
545 |                 return (
546 |                   <div key={index}>
547 |                     <div className="mb-1 flex items-center justify-between">
548 |                       <div className="flex items-center gap-2">
549 |                         <div className={`h-3 w-3 rounded-sm ${color.bg}`}></div>
550 | 
551 |                         <span className="text-sm">{category}</span>
552 |                       </div>
553 | 
554 |                       <span className={`${color.text}`}>{formatCurrency(amount)}</span>
555 |                     </div>
556 |                   </div>
557 |                 );
558 |               })}
559 | 
560 |               {topCategories.length === 0 && (
561 |                 <div className="text-muted-foreground p-4 text-center">
562 |                   No expense data available
563 |                 </div>
564 |               )}
565 |             </div>
566 |           </CardContent>
567 |         </Card>
568 | 
569 |         {/* Upcoming Payments Card */}
570 |         <Card className="border">
571 |           <CardHeader>
572 |             <CardTitle>
573 |               Upcoming Payments <span className="text-muted-foreground font-normal">(soon)</span>
574 |             </CardTitle>
575 |           </CardHeader>
576 | 
577 |           <CardContent>
578 |             <div className="space-y-4">
579 |               {/* For demo purposes, we'll show simulated upcoming payments */}
580 |               <div className="border-b pb-3">
581 |                 <div className="flex items-start justify-between gap-2">
582 |                   <div className="space-y-1">
583 |                     <h4>Credit Card Payment</h4>
584 | 
585 |                     <p className="text-muted-foreground text-xs">Due in 5 days</p>
586 |                   </div>
587 | 
588 |                   <span className="mt-0.5 text-sm text-red-600 dark:text-red-400">
589 |                     {formatCurrency(1250)}
590 |                   </span>
591 |                 </div>
592 |               </div>
593 | 
594 |               <div className="border-b pb-3">
595 |                 <div className="flex items-start justify-between gap-2">
596 |                   <div className="space-y-1">
597 |                     <h4>Internet Bill</h4>
598 | 
599 |                     <p className="text-muted-foreground text-xs">Due in 8 days</p>
600 |                   </div>
601 | 
602 |                   <span className="mt-0.5 text-sm text-red-600 dark:text-red-400">
603 |                     {formatCurrency(120)}
604 |                   </span>
605 |                 </div>
606 |               </div>
607 | 
608 |               <div className="border-b pb-3">
609 |                 <div className="flex items-start justify-between gap-2">
610 |                   <div className="space-y-1">
611 |                     <h4>Smartphone Installment</h4>
612 | 
613 |                     <p className="text-muted-foreground text-xs">Due in 12 days</p>
614 |                   </div>
615 | 
616 |                   <span className="mt-0.5 text-sm text-red-600 dark:text-red-400">
617 |                     {formatCurrency(210)}
618 |                   </span>
619 |                 </div>
620 |               </div>
621 | 
622 |               <div className="pb-3">
623 |                 <div className="flex items-start justify-between gap-2">
624 |                   <div className="space-y-1">
625 |                     <h4>Rent</h4>
626 | 
627 |                     <p className="text-muted-foreground text-xs">Due in 15 days</p>
628 |                   </div>
629 | 
630 |                   <span className="mt-0.5 text-sm text-red-600 dark:text-red-400">
631 |                     {formatCurrency(900)}
632 |                   </span>
633 |                 </div>
634 |               </div>
635 | 
636 |               <div className="pt-2 text-center">
637 |                 <Button variant="outline" className="w-full">
638 |                   View All Upcoming Payments
639 |                 </Button>
640 |               </div>
641 |             </div>
642 |           </CardContent>
643 |         </Card>
644 |       </div>
645 |     </div>
646 |   );
647 | }
```

src/components/ui/button.tsx
```
1 | import * as React from 'react';
2 | 
3 | import { Slot } from '@radix-ui/react-slot';
4 | import { cva, type VariantProps } from 'class-variance-authority';
5 | 
6 | import { cn } from '@/lib/utils';
7 | 
8 | const buttonVariants = cva(
9 |   "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
10 |   {
11 |     variants: {
12 |       variant: {
13 |         default: 'bg-primary text-primary-foreground hover:bg-primary/90',
14 |         destructive:
15 |           'bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-white',
16 |         outline: 'border-input bg-background hover:bg-accent hover:text-accent-foreground border',
17 |         secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
18 |         ghost: 'hover:bg-accent hover:text-accent-foreground',
19 |         link: 'text-primary underline-offset-4 hover:underline',
20 |       },
21 |       size: {
22 |         default: 'h-9 px-4 py-2 has-[>svg]:px-3',
23 |         sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
24 |         lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
25 |         icon: 'size-9',
26 |       },
27 |     },
28 |     defaultVariants: {
29 |       variant: 'default',
30 |       size: 'default',
31 |     },
32 |   }
33 | );
34 | 
35 | function Button({
36 |   className,
37 |   variant,
38 |   size,
39 |   asChild = false,
40 |   ...props
41 | }: React.ComponentProps<'button'> &
42 |   VariantProps<typeof buttonVariants> & {
43 |     asChild?: boolean;
44 |   }) {
45 |   const Comp = asChild ? Slot : 'button';
46 | 
47 |   return (
48 |     <Comp
49 |       data-slot="button"
50 |       className={cn(buttonVariants({ variant, size, className }))}
51 |       {...props}
52 |     />
53 |   );
54 | }
55 | 
56 | export { Button, buttonVariants };
```

src/components/ui/calendar.tsx
```
1 | 'use client';
2 | 
3 | import * as React from 'react';
4 | 
5 | import { ChevronLeft, ChevronRight } from 'lucide-react';
6 | import { DayPicker } from 'react-day-picker';
7 | 
8 | import { buttonVariants } from '@/components/ui/button';
9 | import { cn } from '@/lib/utils';
10 | 
11 | export type CalendarProps = React.ComponentProps<typeof DayPicker>;
12 | 
13 | function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
14 |   return (
15 |     <DayPicker
16 |       showOutsideDays={showOutsideDays}
17 |       className={cn('p-3', className)}
18 |       classNames={{
19 |         months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
20 |         month: 'space-y-4',
21 |         caption: 'flex justify-center pt-1 relative items-center',
22 |         caption_label: 'text-sm font-medium',
23 |         nav: 'space-x-1 flex items-center',
24 |         nav_button: cn(
25 |           buttonVariants({ variant: 'outline' }),
26 |           'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
27 |         ),
28 |         nav_button_previous: 'absolute left-1',
29 |         nav_button_next: 'absolute right-1',
30 |         table: 'w-full border-collapse space-y-1',
31 |         head_row: 'flex',
32 |         head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
33 |         row: 'flex w-full mt-2',
34 |         cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
35 |         day: cn(
36 |           buttonVariants({ variant: 'ghost' }),
37 |           'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
38 |         ),
39 |         day_range_end: 'day-range-end',
40 |         day_selected:
41 |           'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
42 |         day_today: 'bg-accent text-accent-foreground',
43 |         day_outside:
44 |           'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
45 |         day_disabled: 'text-muted-foreground opacity-50',
46 |         day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
47 |         day_hidden: 'invisible',
48 |         ...classNames,
49 |       }}
50 |       components={{
51 |         PreviousMonthButton: () => <ChevronLeft className="h-4 w-4" />,
52 |         NextMonthButton: () => <ChevronRight className="h-4 w-4" />,
53 |       }}
54 |       {...props}
55 |     />
56 |   );
57 | }
58 | 
59 | Calendar.displayName = 'Calendar';
60 | 
61 | export { Calendar };
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
29 | 
30 |           {date ? format(date, 'PPP', { locale: ptBR }) : <span>Selecione uma data</span>}
31 |         </Button>
32 |       </PopoverTrigger>
33 | 
34 |       <PopoverContent className="w-auto p-0">
35 |         <Calendar mode="single" selected={date} onSelect={onSelect} initialFocus locale={ptBR} />
36 |       </PopoverContent>
37 |     </Popover>
38 |   );
39 | }
```

src/components/ui/form.tsx
```
1 | 'use client';
2 | 
3 | import * as React from 'react';
4 | 
5 | import type * as LabelPrimitive from '@radix-ui/react-label';
6 | import { Slot } from '@radix-ui/react-slot';
7 | import {
8 |   Controller,
9 |   FormProvider,
10 |   useFormContext,
11 |   useFormState,
12 |   type ControllerProps,
13 |   type FieldPath,
14 |   type FieldValues,
15 | } from 'react-hook-form';
16 | 
17 | import { Label } from '@/components/ui/label';
18 | import { cn } from '@/lib/utils';
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
3 | import * as React from 'react';
4 | 
5 | import * as LabelPrimitive from '@radix-ui/react-label';
6 | 
7 | import { cn } from '@/lib/utils';
8 | 
9 | function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
10 |   return (
11 |     <LabelPrimitive.Root
12 |       data-slot="label"
13 |       className={cn(
14 |         'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
15 |         className
16 |       )}
17 |       {...props}
18 |     />
19 |   );
20 | }
21 | 
22 | export { Label };
```

src/components/ui/popover.tsx
```
1 | 'use client';
2 | 
3 | import * as React from 'react';
4 | 
5 | import * as PopoverPrimitive from '@radix-ui/react-popover';
6 | 
7 | import { cn } from '@/lib/utils';
8 | 
9 | const Popover = PopoverPrimitive.Root;
10 | 
11 | const PopoverTrigger = PopoverPrimitive.Trigger;
12 | 
13 | const PopoverContent = React.forwardRef<
14 |   React.ElementRef<typeof PopoverPrimitive.Content>,
15 |   React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
16 | >(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
17 |   <PopoverPrimitive.Portal>
18 |     <PopoverPrimitive.Content
19 |       ref={ref}
20 |       align={align}
21 |       sideOffset={sideOffset}
22 |       className={cn(
23 |         'border-border bg-card text-card-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-none',
24 |         className
25 |       )}
26 |       {...props}
27 |     />
28 |   </PopoverPrimitive.Portal>
29 | ));
30 | 
31 | PopoverContent.displayName = PopoverPrimitive.Content.displayName;
32 | 
33 | export { Popover, PopoverTrigger, PopoverContent };
```

src/components/ui/select.tsx
```
1 | 'use client';
2 | 
3 | import * as React from 'react';
4 | 
5 | import * as SelectPrimitive from '@radix-ui/react-select';
6 | import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
7 | 
8 | import { cn } from '@/lib/utils';
9 | 
10 | function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
11 |   return <SelectPrimitive.Root data-slot="select" {...props} />;
12 | }
13 | 
14 | function SelectGroup({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
15 |   return <SelectPrimitive.Group data-slot="select-group" {...props} />;
16 | }
17 | 
18 | function SelectValue({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) {
19 |   return <SelectPrimitive.Value data-slot="select-value" {...props} />;
20 | }
21 | 
22 | function SelectTrigger({
23 |   className,
24 |   children,
25 |   ...props
26 | }: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
27 |   return (
28 |     <SelectPrimitive.Trigger
29 |       data-slot="select-trigger"
30 |       className={cn(
31 |         "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
32 |         className
33 |       )}
34 |       {...props}
35 |     >
36 |       {children}
37 | 
38 |       <SelectPrimitive.Icon asChild>
39 |         <ChevronDownIcon className="size-4 opacity-50" />
40 |       </SelectPrimitive.Icon>
41 |     </SelectPrimitive.Trigger>
42 |   );
43 | }
44 | 
45 | function SelectContent({
46 |   className,
47 |   children,
48 |   position = 'popper',
49 |   ...props
50 | }: React.ComponentProps<typeof SelectPrimitive.Content>) {
51 |   return (
52 |     <SelectPrimitive.Portal>
53 |       <SelectPrimitive.Content
54 |         data-slot="select-content"
55 |         className={cn(
56 |           'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border',
57 |           position === 'popper' &&
58 |             'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
59 |           className
60 |         )}
61 |         position={position}
62 |         {...props}
63 |       >
64 |         <SelectScrollUpButton />
65 | 
66 |         <SelectPrimitive.Viewport
67 |           className={cn(
68 |             'p-1',
69 |             position === 'popper' &&
70 |               'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
71 |           )}
72 |         >
73 |           {children}
74 |         </SelectPrimitive.Viewport>
75 | 
76 |         <SelectScrollDownButton />
77 |       </SelectPrimitive.Content>
78 |     </SelectPrimitive.Portal>
79 |   );
80 | }
81 | 
82 | function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
83 |   return (
84 |     <SelectPrimitive.Label
85 |       data-slot="select-label"
86 |       className={cn('px-2 py-1.5 text-sm font-medium', className)}
87 |       {...props}
88 |     />
89 |   );
90 | }
91 | 
92 | function SelectItem({
93 |   className,
94 |   children,
95 |   ...props
96 | }: React.ComponentProps<typeof SelectPrimitive.Item>) {
97 |   return (
98 |     <SelectPrimitive.Item
99 |       data-slot="select-item"
100 |       className={cn(
101 |         "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
102 |         className
103 |       )}
104 |       {...props}
105 |     >
106 |       <span className="absolute right-2 flex size-3.5 items-center justify-center">
107 |         <SelectPrimitive.ItemIndicator>
108 |           <CheckIcon className="size-4" />
109 |         </SelectPrimitive.ItemIndicator>
110 |       </span>
111 | 
112 |       <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
113 |     </SelectPrimitive.Item>
114 |   );
115 | }
116 | 
117 | function SelectSeparator({
118 |   className,
119 |   ...props
120 | }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
121 |   return (
122 |     <SelectPrimitive.Separator
123 |       data-slot="select-separator"
124 |       className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
125 |       {...props}
126 |     />
127 |   );
128 | }
129 | 
130 | function SelectScrollUpButton({
131 |   className,
132 |   ...props
133 | }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
134 |   return (
135 |     <SelectPrimitive.ScrollUpButton
136 |       data-slot="select-scroll-up-button"
137 |       className={cn('flex cursor-default items-center justify-center py-1', className)}
138 |       {...props}
139 |     >
140 |       <ChevronUpIcon className="size-4" />
141 |     </SelectPrimitive.ScrollUpButton>
142 |   );
143 | }
144 | 
145 | function SelectScrollDownButton({
146 |   className,
147 |   ...props
148 | }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
149 |   return (
150 |     <SelectPrimitive.ScrollDownButton
151 |       data-slot="select-scroll-down-button"
152 |       className={cn('flex cursor-default items-center justify-center py-1', className)}
153 |       {...props}
154 |     >
155 |       <ChevronDownIcon className="size-4" />
156 |     </SelectPrimitive.ScrollDownButton>
157 |   );
158 | }
159 | 
160 | export {
161 |   Select,
162 |   SelectContent,
163 |   SelectGroup,
164 |   SelectItem,
165 |   SelectLabel,
166 |   SelectScrollDownButton,
167 |   SelectScrollUpButton,
168 |   SelectSeparator,
169 |   SelectTrigger,
170 |   SelectValue,
171 | };
```

src/components/ui/sonner.tsx
```
1 | 'use client';
2 | 
3 | import { useTheme } from 'next-themes';
4 | import { Toaster as Sonner, type ToasterProps } from 'sonner';
5 | 
6 | const Toaster = ({ ...props }: ToasterProps) => {
7 |   const { theme = 'system' } = useTheme();
8 | 
9 |   return (
10 |     <Sonner
11 |       theme={theme as ToasterProps['theme']}
12 |       className="toaster group"
13 |       toastOptions={{
14 |         classNames: {
15 |           toast:
16 |             'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg !rounded-[0px] !shadow-none',
17 |           description: 'group-[.toast]:text-muted-foreground',
18 |           actionButton:
19 |             'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium',
20 |           cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium',
21 |           icon: '!hidden',
22 |         },
23 |       }}
24 |       {...props}
25 |     />
26 |   );
27 | };
28 | 
29 | export { Toaster };
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
12 |           'border-border bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
13 |           className
14 |         )}
15 |         ref={ref}
16 |         {...props}
17 |       />
18 |     );
19 |   }
20 | );
21 | 
22 | Textarea.displayName = 'Textarea';
23 | 
24 | export { Textarea };
```

src/components/ai-playground/transaction-extractor.tsx
```
1 | 'use client';
2 | 
3 | import { useState } from 'react';
4 | 
5 | import { zodResolver } from '@hookform/resolvers/zod';
6 | import { useForm } from 'react-hook-form';
7 | 
8 | import { extractTransactionFields } from '@/actions/ai/extract-transaction-fields';
9 | import { Button } from '@/components/ui/button';
10 | import {
11 |   Card,
12 |   CardContent,
13 |   CardDescription,
14 |   CardFooter,
15 |   CardHeader,
16 |   CardTitle,
17 | } from '@/components/ui/card';
18 | import {
19 |   Form,
20 |   FormControl,
21 |   FormField,
22 |   FormItem,
23 |   FormLabel,
24 |   FormMessage,
25 | } from '@/components/ui/form';
26 | import { Textarea } from '@/components/ui/textarea';
27 | import type { TransactionExtraction } from '@/schemas/ai/transaction-extraction';
28 | import {
29 |   transactionExtractorFormSchema,
30 |   type TransactionExtractorFormValues,
31 | } from '@/schemas/form-schemas';
32 | import type { TransactionCategory } from '@/types/transaction/enums/transaction-category';
33 | import type { TransactionType } from '@/types/transaction/enums/transaction-type';
34 | 
35 | export const TransactionExtractor = () => {
36 |   const [result, setResult] = useState<TransactionExtraction | null>(null);
37 |   const [isLoading, setIsLoading] = useState(false);
38 |   const [error, setError] = useState<string | null>(null);
39 | 
40 |   // Initialize the form with react-hook-form
41 |   const form = useForm<TransactionExtractorFormValues>({
42 |     resolver: zodResolver(transactionExtractorFormSchema),
43 |     defaultValues: {
44 |       prompt: '',
45 |     },
46 |   });
47 | 
48 |   const onSubmit = async (values: TransactionExtractorFormValues) => {
49 |     setIsLoading(true);
50 |     setError(null);
51 | 
52 |     try {
53 |       // Use the server action instead of the API call
54 |       const result = await extractTransactionFields(values.prompt);
55 | 
56 |       setResult(result);
57 |     } catch (err) {
58 |       setError(err instanceof Error ? err.message : 'An unknown error occurred');
59 |     } finally {
60 |       setIsLoading(false);
61 |     }
62 |   };
63 | 
64 |   // Helper function to get the category label
65 |   const getCategoryLabel = (category: TransactionCategory) => {
66 |     return category
67 |       .replace(/_/g, ' ')
68 |       .toLowerCase()
69 |       .replace(/\b\w/g, l => l.toUpperCase());
70 |   };
71 | 
72 |   // Helper function to get the type label
73 |   const getTypeLabel = (type: TransactionType) => {
74 |     return type.toLowerCase().charAt(0).toUpperCase() + type.toLowerCase().slice(1);
75 |   };
76 | 
77 |   // Format date for display
78 |   const formatDate = (date: string) => {
79 |     try {
80 |       const parsed = new Date(date);
81 | 
82 |       return parsed.toLocaleDateString();
83 |     } catch {
84 |       // Return the original string if it can't be parsed as date
85 |       return date;
86 |     }
87 |   };
88 | 
89 |   // Reset form and results
90 |   const handleReset = () => {
91 |     form.reset();
92 |     setResult(null);
93 |     setError(null);
94 |   };
95 | 
96 |   return (
97 |     <Card className="w-full max-w-md">
98 |       <CardHeader>
99 |         <CardTitle>Transaction Extractor</CardTitle>
100 | 
101 |         <CardDescription>
102 |           Describe a transaction in natural language, and our AI will extract the details.
103 |         </CardDescription>
104 |       </CardHeader>
105 | 
106 |       <CardContent>
107 |         <Form {...form}>
108 |           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
109 |             <FormField
110 |               control={form.control}
111 |               name="prompt"
112 |               render={({ field }) => (
113 |                 <FormItem>
114 |                   <FormLabel>Describe Your Transaction</FormLabel>
115 | 
116 |                   <FormControl>
117 |                     <Textarea
118 |                       placeholder="Examples: 'I spent R$150 at Restaurant Central on groceries yesterday' or 'caio 150' (transfer to Caio)"
119 |                       rows={5}
120 |                       className="mt-1 resize-none"
121 |                       {...field}
122 |                     />
123 |                   </FormControl>
124 | 
125 |                   <FormMessage />
126 |                 </FormItem>
127 |               )}
128 |             />
129 | 
130 |             <Button type="submit" className="w-full" disabled={isLoading}>
131 |               {isLoading ? 'Extracting...' : 'Extract Transaction Details'}
132 |             </Button>
133 |           </form>
134 |         </Form>
135 | 
136 |         {error && (
137 |           <div className="bg-destructive/20 text-destructive mt-4 rounded-md p-3">
138 |             <p>{error}</p>
139 |           </div>
140 |         )}
141 | 
142 |         {result && (
143 |           <div className="mt-8 space-y-6">
144 |             <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
145 | 
146 |             <div className="space-y-2">
147 |               <h3 className="font-medium">Extracted Details:</h3>
148 | 
149 |               <div className="grid grid-cols-2 gap-2">
150 |                 <div className="text-sm font-medium">Description:</div>
151 | 
152 |                 <div className="text-sm">{result.description}</div>
153 | 
154 |                 <div className="text-sm font-medium">Amount:</div>
155 | 
156 |                 <div className="text-sm">{`${result.amount} ${result.currency || 'BRL'}`}</div>
157 | 
158 |                 <div className="text-sm font-medium">Date:</div>
159 | 
160 |                 <div className="text-sm">{formatDate(result.date)}</div>
161 | 
162 |                 <div className="text-sm font-medium">Category:</div>
163 | 
164 |                 <div className="text-sm">{getCategoryLabel(result.category)}</div>
165 | 
166 |                 <div className="text-sm font-medium">Type:</div>
167 | 
168 |                 <div className="text-sm">{getTypeLabel(result.type)}</div>
169 | 
170 |                 {result.merchant && (
171 |                   <>
172 |                     <div className="text-sm font-medium">Merchant:</div>
173 | 
174 |                     <div className="text-sm">{result.merchant}</div>
175 |                   </>
176 |                 )}
177 | 
178 |                 {result.isInstallment && result.installmentInfo && (
179 |                   <>
180 |                     <div className="text-sm font-medium">Installment:</div>
181 | 
182 |                     <div className="text-sm">
183 |                       {`${result.installmentInfo.current}/${result.installmentInfo.total}`}
184 |                     </div>
185 |                   </>
186 |                 )}
187 |               </div>
188 |             </div>
189 |           </div>
190 |         )}
191 |       </CardContent>
192 | 
193 |       <CardFooter className="mt-auto flex flex-col space-y-4 pt-8">
194 |         <div>
195 |           <h3 className="mb-2 text-sm font-medium">How It Works</h3>
196 | 
197 |           <div className="space-y-2">
198 |             <p className="text-muted-foreground text-xs">
199 |               The Transaction Extractor uses AI to parse natural language descriptions into
200 |               structured transaction data.
201 |             </p>
202 | 
203 |             <p className="text-muted-foreground text-xs">Try examples like:</p>
204 | 
205 |             <ul className="text-muted-foreground list-decimal space-y-1 pl-4 text-xs">
206 |               <li>&quot;I paid R$150 for groceries at Mercado Extra yesterday&quot;</li>
207 | 
208 |               <li>&quot;Received my salary of R$3500 from Company XYZ&quot;</li>
209 | 
210 |               <li>
211 |                 &quot;Smartphone installment payment of R$210, 3rd of 12 monthly payments&quot;
212 |               </li>
213 | 
214 |               <li>&quot;Transferred R$500 from my checking account to my savings account&quot;</li>
215 | 
216 |               <li>&quot;caio 150&quot; (transfer to Caio of R$150)</li>
217 | 
218 |               <li>&quot;jon 100&quot; (transfer to Jon of R$100)</li>
219 | 
220 |               <li>&quot;+150 maria&quot; (received R$150 from Maria)</li>
221 |             </ul>
222 |           </div>
223 |         </div>
224 | 
225 |         <Button variant="outline" className="mt-4 w-full" onClick={handleReset}>
226 |           Clear
227 |         </Button>
228 |       </CardFooter>
229 |     </Card>
230 |   );
231 | };
```

src/schemas/ai/transaction-extraction.ts
```
1 | import { z } from 'zod';
2 | 
3 | import { TransactionCategory } from '@/types/transaction/enums/transaction-category';
4 | import { TransactionType } from '@/types/transaction/enums/transaction-type';
5 | 
6 | /**
7 |  * Schema for transaction extraction
8 |  */
9 | export const transactionExtractionSchema = z.object({
10 |   description: z.string().describe('The cleaned transaction description in original language'),
11 |   amount: z
12 |     .number()
13 |     .describe('The transaction amount as a number (positive for income, negative for expenses)'),
14 |   date: z
15 |     .string()
16 |     .describe('The transaction date in readable format (e.g., today, yesterday, etc.)'),
17 |   merchant: z.string().optional().describe('The merchant or entity name if present'),
18 |   category: z
19 |     .nativeEnum(TransactionCategory)
20 |     .describe('The transaction category from predefined list'),
21 |   type: z.nativeEnum(TransactionType).describe('The transaction type (INCOME, EXPENSE, TRANSFER)'),
22 |   isInstallment: z.boolean().describe('Whether this is an installment payment'),
23 |   installmentInfo: z
24 |     .object({
25 |       current: z.number().describe('Current installment number'),
26 |       total: z.number().describe('Total number of installments'),
27 |     })
28 |     .optional()
29 |     .describe('Details about the installment if applicable'),
30 |   currency: z.string().default('BRL').describe('ISO currency code (defaults to BRL)'),
31 |   confidence: z
32 |     .number()
33 |     .min(0)
34 |     .max(1)
35 |     .optional()
36 |     .describe('AI confidence level in the extraction (0.0 to 1.0)'),
37 | });
38 | 
39 | /**
40 |  * Schema for batch transaction extraction - uses an object with numbered transaction properties
41 |  * This is compatible with generateObject which requires object schemas
42 |  */
43 | export const transactionBatchExtractionSchema = z.object({
44 |   transactions: z
45 |     .array(transactionExtractionSchema)
46 |     .describe('Array of extracted transaction data'),
47 | });
48 | 
49 | // Types for schema inference
50 | export type TransactionExtraction = z.infer<typeof transactionExtractionSchema>;
51 | export type TransactionBatchExtraction = z.infer<typeof transactionBatchExtractionSchema>;
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
77 |  * Parse a single CSV row, respecting quoted values that might contain delimiters
78 |  * @param row The CSV row as a string
79 |  * @param delimiter The delimiter character
80 |  * @returns Array of cell values
81 |  */
82 | function parseCSVRow(row: string, delimiter: string): string[] {
83 |   const result: string[] = [];
84 |   let currentValue = '';
85 |   let inQuotes = false;
86 | 
87 |   for (let i = 0; i < row.length; i++) {
88 |     const char = row[i];
89 |     const nextChar = i < row.length - 1 ? row[i + 1] : '';
90 | 
91 |     if (char === '"') {
92 |       if (inQuotes && nextChar === '"') {
93 |         // Escaped quote inside a quoted value
94 |         currentValue += '"';
95 |         i++; // Skip the next quote
96 |       } else {
97 |         // Toggle quotes state
98 |         inQuotes = !inQuotes;
99 |       }
100 |     } else if (char === delimiter && !inQuotes) {
101 |       // End of field
102 |       result.push(currentValue);
103 |       currentValue = '';
104 |     } else {
105 |       currentValue += char;
106 |     }
107 |   }
108 | 
109 |   // Add the last field
110 |   result.push(currentValue);
111 | 
112 |   return result;
113 | }
114 | 
115 | /**
116 |  * Detect the most likely delimiter in a CSV file
117 |  * @param headerRow The first row of the CSV file
118 |  * @param delimiters Array of possible delimiters to check
119 |  * @returns The most likely delimiter
120 |  */
121 | function detectDelimiter(headerRow: string, delimiters: string[]): string {
122 |   const counts = delimiters.map(delimiter => {
123 |     // Count occurrences outside of quotes
124 |     let count = 0;
125 |     let inQuotes = false;
126 | 
127 |     for (let i = 0; i < headerRow.length; i++) {
128 |       const char = headerRow[i];
129 | 
130 |       if (char === '"') {
131 |         inQuotes = !inQuotes;
132 |       } else if (char === delimiter && !inQuotes) {
133 |         count++;
134 |       }
135 |     }
136 | 
137 |     return { delimiter, count };
138 |   });
139 | 
140 |   // Return the delimiter with the highest count
141 |   const mostLikely = counts.sort((a, b) => b.count - a.count)[0];
142 | 
143 |   if (mostLikely.count === 0) {
144 |     // If no delimiter is found, default to comma
145 |     return ',';
146 |   }
147 | 
148 |   return mostLikely.delimiter;
149 | }
150 | 
151 | /**
152 |  * Check if a string looks like a number
153 |  * @param value The string to check
154 |  * @returns True if the string looks like a number
155 |  */
156 | function looksLikeNumber(value: string): boolean {
157 |   // Support formats like 1234, 1234.56, 1,234.56, -1234.56, etc.
158 |   return /^-?\s*[\d.,]+\s*$/.test(value);
159 | }
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
24 | 
25 |       return [];
26 |     }
27 | 
28 |     // Check if this is a mobile device - use a simpler approach for mobile
29 |     const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
30 |       navigator.userAgent
31 |     );
32 | 
33 |     // Limit PDF size on mobile devices to prevent crashes
34 |     if (isMobile && pdfContent.byteLength > 5 * 1024 * 1024) {
35 |       // 5MB limit on mobile
36 |       console.warn('PDF file too large for mobile processing');
37 | 
38 |       return [
39 |         {
40 |           error: 'PDF file too large for mobile processing',
41 |           message: 'Please use a smaller file or try on desktop',
42 |         },
43 |       ];
44 |     }
45 | 
46 |     try {
47 |       // Dynamically import PDF.js only on the client side
48 |       // We use any typing here to avoid dependency on specific PDF.js types
49 |       // which can cause issues with type checking in SSR
50 |       const pdfjs = await import('pdfjs-dist');
51 | 
52 |       // Set the worker source
53 |       const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.mjs');
54 | 
55 |       pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
56 | 
57 |       // Use a timeout to prevent hanging on problematic PDFs
58 |       const timeoutPromise = new Promise<never>((_, reject) => {
59 |         const timeout = isMobile ? 15000 : 30000; // Shorter timeout on mobile
60 | 
61 |         setTimeout(() => reject(new Error('PDF processing timed out')), timeout);
62 |       });
63 | 
64 |       // Load the PDF document with timeout
65 |       const loadingTask = pdfjs.getDocument({ data: pdfContent });
66 | 
67 |       // Add progress callback for better user feedback
68 |       loadingTask.onProgress = (progressData: { loaded: number; total: number }) => {
69 |         console.log(
70 |           `PDF loading: ${Math.round((progressData.loaded / progressData.total) * 100)}%`
71 |         );
72 |       };
73 | 
74 |       // Race between PDF loading and timeout
75 |       const pdf = await Promise.race([loadingTask.promise, timeoutPromise]);
76 | 
77 |       // Limit the number of pages processed on mobile to improve performance
78 |       const pagesToProcess = isMobile ? Math.min(pdf.numPages, 5) : pdf.numPages;
79 | 
80 |       // Extract text from pages (with limits for mobile)
81 |       const extractedText: string[] = [];
82 | 
83 |       for (let i = 1; i <= pagesToProcess; i++) {
84 |         try {
85 |           const page = await pdf.getPage(i);
86 |           // Using a simpler text extraction approach
87 |           const textContent = await page.getTextContent();
88 | 
89 |           const pageText = textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
90 | 
91 |           extractedText.push(pageText);
92 | 
93 |           // Mobile optimization: free up memory as we go
94 |           if (isMobile) {
95 |             page.cleanup();
96 |           }
97 |         } catch (pageError) {
98 |           console.warn(`Error extracting text from page ${i}:`, pageError);
99 |           extractedText.push(`[Error extracting page ${i}]`);
100 |           continue; // Continue with next page despite error
101 |         }
102 |       }
103 | 
104 |       // Join all pages' text
105 |       const fullText = extractedText.join('\n');
106 | 
107 |       // Clean up PDF document to free memory
108 |       pdf.destroy();
109 | 
110 |       // Try to extract a table-like structure from the PDF
111 |       const extractedData = extractStructuredData(fullText);
112 | 
113 |       return extractedData;
114 |     } catch (pdfJsError) {
115 |       console.error('PDF.js error:', pdfJsError);
116 | 
117 |       // Special handling for mobile-specific errors
118 |       if (isMobile) {
119 |         const errorMessage = (pdfJsError as Error).message || String(pdfJsError);
120 | 
121 |         if (
122 |           errorMessage.includes('out of memory') ||
123 |           errorMessage.includes('allocation failed') ||
124 |           errorMessage.includes('timeout')
125 |         ) {
126 |           console.log('Attempting minimal PDF extraction for mobile...');
127 | 
128 |           try {
129 |             // Try the minimal extraction approach as a fallback
130 |             return await extractMinimalPdfContent(pdfContent);
131 |           } catch (minimalError) {
132 |             console.error('Even minimal PDF extraction failed:', minimalError);
133 | 
134 |             return [
135 |               {
136 |                 error: 'PDF processing failed on mobile',
137 |                 message: 'This PDF is too complex to process on mobile. Please try on desktop.',
138 |               },
139 |             ];
140 |           }
141 |         }
142 |       }
143 | 
144 |       throw pdfJsError;
145 |     }
146 |   } catch (error) {
147 |     console.error('Error parsing PDF:', error);
148 | 
149 |     // PDF.js might not be available during server-side rendering
150 |     // Return an empty array in this case to prevent blocking the process
151 |     if (
152 |       (error as Error).message.includes('document is not defined') ||
153 |       (error as Error).message.includes('window is not defined')
154 |     ) {
155 |       console.warn('PDF parsing attempted in a server environment, returning empty result');
156 | 
157 |       return [];
158 |     }
159 | 
160 |     // Return a meaningful error object rather than throwing
161 |     // This allows the application to continue and display a user-friendly error
162 |     return [
163 |       {
164 |         error: 'PDF parsing failed',
165 |         message: (error as Error).message || 'Unknown error',
166 |       },
167 |     ];
168 |   }
169 | }
170 | 
171 | /**
172 |  * Extract structured data from PDF text
173 |  * @param text The extracted text from the PDF
174 |  * @returns Array of objects representing structured data
175 |  */
176 | function extractStructuredData(text: string): Array<Record<string, string | number>> {
177 |   const result: Array<Record<string, string | number>> = [];
178 | 
179 |   try {
180 |     // Look for table-like sections in the PDF
181 |     // This is a simplified approach that looks for common patterns in bank statements
182 | 
183 |     // First, try to find date patterns in the text
184 |     const datePatterns = [
185 |       // Common date formats: DD/MM/YYYY or MM/DD/YYYY or YYYY-MM-DD
186 |       /\d{1,2}[/-]\d{1,2}[/-]\d{2,4}/g,
187 |       // ISO format: YYYY-MM-DD
188 |       /\d{4}-\d{2}-\d{2}/g,
189 |     ];
190 | 
191 |     const potentialDateMatches: number[] = [];
192 | 
193 |     // Find all position indices where dates appear
194 |     for (const pattern of datePatterns) {
195 |       let match;
196 | 
197 |       while ((match = pattern.exec(text)) !== null) {
198 |         potentialDateMatches.push(match.index);
199 |       }
200 |     }
201 | 
202 |     if (potentialDateMatches.length === 0) {
203 |       // No dates found, try a different approach
204 |       return parseUnstructuredText(text);
205 |     }
206 | 
207 |     // Sort date positions
208 |     potentialDateMatches.sort((a, b) => a - b);
209 | 
210 |     // Use date positions to identify potential rows
211 |     // This assumes dates are at consistent positions in each row
212 |     const lines = text.split('\n');
213 |     let currentLine = '';
214 | 
215 |     for (let i = 0; i < lines.length; i++) {
216 |       const line = lines[i].trim();
217 | 
218 |       if (line.length === 0) continue;
219 | 
220 |       // Check if this line contains a date
221 |       let hasDate = false;
222 | 
223 |       for (const pattern of datePatterns) {
224 |         if (pattern.test(line)) {
225 |           hasDate = true;
226 |           break;
227 |         }
228 |       }
229 | 
230 |       if (hasDate) {
231 |         // If we had a previous row, add it to the result
232 |         if (currentLine) {
233 |           const parsedRow = parseStatementRow(currentLine);
234 | 
235 |           if (Object.keys(parsedRow).length > 0) {
236 |             result.push(parsedRow);
237 |           }
238 |         }
239 | 
240 |         // Start a new row
241 |         currentLine = line;
242 |       } else if (currentLine) {
243 |         // Continue the current row
244 |         currentLine += ' ' + line;
245 |       }
246 |     }
247 | 
248 |     // Add the last row if any
249 |     if (currentLine) {
250 |       const parsedRow = parseStatementRow(currentLine);
251 | 
252 |       if (Object.keys(parsedRow).length > 0) {
253 |         result.push(parsedRow);
254 |       }
255 |     }
256 | 
257 |     // If we couldn't extract any structured data, fall back to unstructured parsing
258 |     if (result.length === 0) {
259 |       return parseUnstructuredText(text);
260 |     }
261 | 
262 |     return result;
263 |   } catch (error) {
264 |     console.warn('Error extracting structured data from PDF:', error);
265 | 
266 |     // Fall back to unstructured parsing
267 |     return parseUnstructuredText(text);
268 |   }
269 | }
270 | 
271 | /**
272 |  * Parse a single row from a bank statement
273 |  * @param text The row text
274 |  * @returns Object with parsed values
275 |  */
276 | function parseStatementRow(text: string): Record<string, string | number> {
277 |   const result: Record<string, string | number> = {};
278 | 
279 |   try {
280 |     // Try to extract date
281 |     const dateMatch = text.match(/\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}-\d{2}-\d{2}/);
282 | 
283 |     if (dateMatch) {
284 |       result.date = dateMatch[0];
285 |     }
286 | 
287 |     // Try to extract amount (typically currency values)
288 |     // Look for patterns like $123.45, R$123,45, 123.45, -123.45
289 |     const amountMatch = text.match(/[-+]?\s*[R$£€$]?\s*\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})/);
290 | 
291 |     if (amountMatch) {
292 |       const amountStr = amountMatch[0].replace(/[R$£€$\s]/g, '').replace(',', '.');
293 | 
294 |       result.amount = parseFloat(amountStr);
295 |     }
296 | 
297 |     // Extract description (everything except date and amount)
298 |     let description = text;
299 | 
300 |     if (dateMatch) {
301 |       description = description.replace(dateMatch[0], '');
302 |     }
303 | 
304 |     if (amountMatch) {
305 |       description = description.replace(amountMatch[0], '');
306 |     }
307 | 
308 |     // Clean up description
309 |     description = description.replace(/\s+/g, ' ').trim();
310 | 
311 |     if (description) {
312 |       result.description = description;
313 |     }
314 | 
315 |     return result;
316 |   } catch (error) {
317 |     console.warn('Error parsing statement row:', error);
318 | 
319 |     return {};
320 |   }
321 | }
322 | 
323 | /**
324 |  * Parse unstructured PDF text as a fallback
325 |  * @param text The full PDF text
326 |  * @returns Array of objects representing potential transactions
327 |  */
328 | function parseUnstructuredText(text: string): Array<Record<string, string | number>> {
329 |   const result: Array<Record<string, string | number>> = [];
330 | 
331 |   try {
332 |     // Split by newlines and remove empty lines
333 |     const lines = text.split('\n').filter(line => line.trim().length > 0);
334 | 
335 |     // Look for lines that might represent transactions
336 |     // This is a simplified approach that looks for lines containing both
337 |     // date patterns and currency values
338 |     for (const line of lines) {
339 |       const parsedRow = parseStatementRow(line);
340 | 
341 |       // Only consider rows that have at least a date or amount
342 |       if (parsedRow.date || parsedRow.amount !== undefined) {
343 |         result.push(parsedRow);
344 |       }
345 |     }
346 | 
347 |     return result;
348 |   } catch (error) {
349 |     console.warn('Error parsing unstructured text:', error);
350 | 
351 |     return [];
352 |   }
353 | }
354 | 
355 | // Define a proper interface for PDF.js document options
356 | interface PDFDocumentLoadingOptions {
357 |   data: ArrayBuffer;
358 |   disableFontFace?: boolean;
359 |   nativeImageDecoderSupport?: string;
360 |   ignoreErrors?: boolean;
361 |   isEvalSupported?: boolean;
362 |   cMapUrl?: string;
363 |   cMapPacked?: boolean;
364 | }
365 | 
366 | /**
367 |  * Extract a minimal amount of text from a PDF, optimized for mobile devices
368 |  * This is a fallback when full processing fails on mobile
369 |  * @param pdfContent The PDF content as an ArrayBuffer
370 |  * @returns A simplified extraction with just basic information
371 |  */
372 | async function extractMinimalPdfContent(
373 |   pdfContent: ArrayBuffer
374 | ): Promise<Array<Record<string, string | number>>> {
375 |   try {
376 |     // Dynamically import PDF.js
377 |     const pdfjs = await import('pdfjs-dist');
378 |     const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.mjs');
379 | 
380 |     pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
381 | 
382 |     // Configure PDF.js with minimal memory usage
383 |     const loadingTask = pdfjs.getDocument({
384 |       data: pdfContent,
385 |       disableFontFace: true,
386 |       // @ts-ignore - PDF.js custom properties
387 |       nativeImageDecoderSupport: 'none',
388 |       ignoreErrors: true,
389 |       isEvalSupported: false,
390 |       cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
391 |       cMapPacked: true,
392 |     } as PDFDocumentLoadingOptions);
393 | 
394 |     // Use a shorter timeout for mobile
395 |     const timeoutMs = 10000; // 10 seconds
396 |     const timeoutPromise = new Promise<never>((_, reject) => {
397 |       setTimeout(() => reject(new Error('PDF minimal processing timed out')), timeoutMs);
398 |     });
399 | 
400 |     // Only process the first 2 pages at most
401 |     const pdf = await Promise.race([loadingTask.promise, timeoutPromise]);
402 |     const pagesToProcess = Math.min(pdf.numPages, 2);
403 | 
404 |     const extractedText: string[] = [];
405 | 
406 |     for (let i = 1; i <= pagesToProcess; i++) {
407 |       try {
408 |         const page = await pdf.getPage(i);
409 |         // Using a simpler text extraction approach
410 |         const textContent = await page.getTextContent();
411 | 
412 |         const pageText = textContent.items
413 |           .map(item => ('str' in item ? item.str : ''))
414 |           .join(' ')
415 |           .trim();
416 | 
417 |         extractedText.push(pageText);
418 | 
419 |         // Free up memory immediately
420 |         page.cleanup();
421 |       } catch (pageError) {
422 |         console.warn(`Error in minimal extraction from page ${i}:`, pageError);
423 |         continue;
424 |       }
425 |     }
426 | 
427 |     // Clean up
428 |     pdf.destroy();
429 | 
430 |     // Extract just the most likely transaction data
431 |     // Look for date patterns and currency values
432 |     const result: Array<Record<string, string | number>> = [];
433 |     const fullText = extractedText.join(' ');
434 | 
435 |     // Find all dates in the text
436 |     const dateRegex = /\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}-\d{2}-\d{2}/g;
437 |     const dates = Array.from(fullText.matchAll(dateRegex), m => m[0]);
438 | 
439 |     // Find all monetary values
440 |     const moneyRegex = /[-+]?\s*[R$£€$]?\s*\d{1,3}(?:[,.]\d{3})*(?:[,.]\d{2})/g;
441 |     const amounts = Array.from(fullText.matchAll(moneyRegex), m => m[0]);
442 | 
443 |     // Create simple records with just dates and amounts if we have any
444 |     if (dates.length > 0 || amounts.length > 0) {
445 |       // Create records with what we have
446 |       const maxItems = Math.max(dates.length, amounts.length);
447 | 
448 |       for (let i = 0; i < maxItems; i++) {
449 |         const record: Record<string, string | number> = {};
450 | 
451 |         if (i < dates.length) {
452 |           record.date = dates[i];
453 |         }
454 | 
455 |         if (i < amounts.length) {
456 |           const amountStr = amounts[i].replace(/[R$£€$\s]/g, '').replace(',', '.');
457 | 
458 |           try {
459 |             record.amount = parseFloat(amountStr);
460 |           } catch {
461 |             record.amount_text = amounts[i];
462 |           }
463 |         }
464 | 
465 |         if (Object.keys(record).length > 0) {
466 |           result.push(record);
467 |         }
468 |       }
469 |     }
470 | 
471 |     // If we couldn't extract structured data, return at least what we found
472 |     if (result.length === 0 && extractedText.length > 0) {
473 |       return [{ raw_content: extractedText.join('\n').substring(0, 1000) }];
474 |     }
475 | 
476 |     return result;
477 |   } catch (error) {
478 |     console.error('Error in minimal PDF extraction:', error);
479 | 
480 |     return [
481 |       {
482 |         error: 'PDF minimal extraction failed',
483 |         message: 'Could not extract even basic information from this PDF',
484 |       },
485 |     ];
486 |   }
487 | }
```

src/utils/file-reading/array-buffer-to-base64.ts
```
1 | /**
2 |  * Converts an ArrayBuffer to a Base64 string
3 |  * @param buffer The ArrayBuffer to convert
4 |  * @returns The Base64 string
5 |  */
6 | export function arrayBufferToBase64(buffer: ArrayBuffer): string {
7 |   let binary = '';
8 |   const bytes = new Uint8Array(buffer);
9 |   const len = bytes.byteLength;
10 | 
11 |   for (let i = 0; i < len; i++) {
12 |     binary += String.fromCharCode(bytes[i]);
13 |   }
14 | 
15 |   return window.btoa(binary);
16 | }
```

src/utils/file-reading/read-file-as-array-buffer.ts
```
1 | /**
2 |  * Reads a file as an ArrayBuffer
3 |  * @param file The file to read
4 |  * @param isMobile Whether the device is mobile
5 |  * @returns A promise that resolves to the file content as an ArrayBuffer
6 |  */
7 | export function readFileAsArrayBuffer(file: File, isMobile: boolean): Promise<ArrayBuffer> {
8 |   return new Promise((resolve, reject) => {
9 |     const reader = new FileReader();
10 | 
11 |     reader.onload = () => {
12 |       if (reader.result instanceof ArrayBuffer) {
13 |         resolve(reader.result);
14 |       } else {
15 |         reject(new Error(`Failed to read file as ArrayBuffer: ${file.name}`));
16 |       }
17 |     };
18 | 
19 |     reader.onerror = event => {
20 |       console.error('FileReader error:', event);
21 |       reject(new Error(`Failed to read file: ${file.name}`));
22 |     };
23 | 
24 |     // Use smaller chunk sizes for large files on mobile to avoid memory issues
25 |     if (isMobile && file.size > 5 * 1024 * 1024) {
26 |       // 5MB
27 |       reject(new Error('File too large for mobile processing'));
28 | 
29 |       return;
30 |     }
31 | 
32 |     reader.readAsArrayBuffer(file);
33 |   });
34 | }
```

src/utils/file-reading/read-file-as-text.ts
```
1 | /**
2 |  * Reads a file as text
3 |  * @param file The file to read
4 |  * @returns A promise that resolves to the file content as text
5 |  */
6 | export function readFileAsText(file: File): Promise<string> {
7 |   return new Promise((resolve, reject) => {
8 |     const reader = new FileReader();
9 | 
10 |     reader.onload = () => {
11 |       if (typeof reader.result === 'string') {
12 |         resolve(reader.result);
13 |       } else {
14 |         reject(new Error(`Failed to read file as text: ${file.name}`));
15 |       }
16 |     };
17 | 
18 |     reader.onerror = event => {
19 |       console.error('FileReader error:', event);
20 |       reject(new Error(`Failed to read file: ${file.name}`));
21 |     };
22 | 
23 |     reader.readAsText(file);
24 |   });
25 | }
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
9 | import type { Transaction } from '@/schemas/transaction';
10 | import { TransactionType } from '@/types/transaction/enums/transaction-type';
11 | import { calculateStringSimilarity } from '@/utils/calculate-string-similarity';
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
22 |     .describe("Whether this is a transfer between user's own accounts"),
23 |   matchingTransactionId: z.string().optional().describe('ID of the matching transaction if found'),
24 |   fromPerson: z.string().optional().describe('Person or account sending the money'),
25 |   toPerson: z.string().optional().describe('Person or account receiving the money'),
26 |   confidence: z
27 |     .number()
28 |     .min(0)
29 |     .max(1)
30 |     .describe('Confidence level for this detection from 0.0 to 1.0'),
31 |   reason: z.string().describe('Explanation for why this was classified as it was'),
32 | });
33 | 
34 | export type P2PTransferDetection = z.infer<typeof p2pTransferSchema>;
35 | 
36 | /**
37 |  * Improved helper function to check if names are similar (likely the same person)
38 |  * This helps with detecting internal transfers between accounts owned by the same person
39 |  */
40 | function areSimilarNames(name1: string, name2: string): boolean {
41 |   // Clean up names for comparison
42 |   const clean1 = name1.toLowerCase().trim();
43 |   const clean2 = name2.toLowerCase().trim();
44 | 
45 |   // Direct match
46 |   if (clean1 === clean2) return true;
47 | 
48 |   // Use string similarity algorithm for fuzzy matching
49 |   const SIMILARITY_THRESHOLD = 0.75; // High threshold for name matching
50 |   const similarityScore = calculateStringSimilarity(clean1, clean2);
51 | 
52 |   if (similarityScore >= SIMILARITY_THRESHOLD) return true;
53 | 
54 |   // Check if one is a subset of the other
55 |   if (clean1.includes(clean2) || clean2.includes(clean1)) return true;
56 | 
57 |   // Check for first name match (if both have multiple names)
58 |   const firstName1 = clean1.split(' ')[0];
59 |   const firstName2 = clean2.split(' ')[0];
60 | 
61 |   if (firstName1 && firstName2) {
62 |     // If first names are similar with high threshold
63 |     const firstNameSimilarity = calculateStringSimilarity(firstName1, firstName2);
64 | 
65 |     if (firstNameSimilarity >= 0.9) return true;
66 | 
67 |     // Exact first name match
68 |     if (firstName1 === firstName2) return true;
69 |   }
70 | 
71 |   // Check against known variations of the user's name
72 |   const userVariations = userConfig.cardHolder.possibleVariations.map(v => v.toLowerCase().trim());
73 | 
74 |   // Check similarity against all name variations
75 |   for (const variation of [...userVariations, userConfig.cardHolder.name.toLowerCase().trim()]) {
76 |     // Check similarity of name1 against variation
77 |     if (calculateStringSimilarity(clean1, variation) >= SIMILARITY_THRESHOLD) {
78 |       // If name1 matches a variation, check if name2 matches any variation too
79 |       if (clean2 === userConfig.cardHolder.name.toLowerCase().trim()) return true;
80 | 
81 |       for (const otherVar of [...userVariations, userConfig.cardHolder.name.toLowerCase().trim()]) {
82 |         if (calculateStringSimilarity(clean2, otherVar) >= SIMILARITY_THRESHOLD) {
83 |           return true;
84 |         }
85 |       }
86 |     }
87 | 
88 |     // Check similarity of name2 against variation
89 |     if (calculateStringSimilarity(clean2, variation) >= SIMILARITY_THRESHOLD) {
90 |       // If name2 matches a variation, check if name1 matches any variation too
91 |       if (clean1 === userConfig.cardHolder.name.toLowerCase().trim()) return true;
92 | 
93 |       for (const otherVar of [...userVariations, userConfig.cardHolder.name.toLowerCase().trim()]) {
94 |         if (calculateStringSimilarity(clean1, otherVar) >= SIMILARITY_THRESHOLD) {
95 |           return true;
96 |         }
97 |       }
98 |     }
99 |   }
100 | 
101 |   return false;
102 | }
103 | 
104 | /**
105 |  * Detect if a transaction is a person-to-person transfer, including internal transfers
106 |  * @param transaction The transaction to analyze
107 |  * @param otherTransactions Other transactions to compare for potential matches
108 |  * @param accountsAndCards List of user's known accounts and cards
109 |  * @returns Detection result with confidence score
110 |  */
111 | export async function detectP2PTransfer(
112 |   transaction: Transaction,
113 |   otherTransactions: Transaction[] = [],
114 |   accountsAndCards: string[] = []
115 | ): Promise<P2PTransferDetection> {
116 |   try {
117 |     // Don't process transactions that are already determined to not be transfers
118 |     if (
119 |       transaction.type !== TransactionType.TRANSFER &&
120 |       !isLikelyTransfer(transaction.description)
121 |     ) {
122 |       return {
123 |         isP2PTransfer: false,
124 |         isInternalTransfer: false,
125 |         confidence: 0.9,
126 |         reason: "Transaction type is not TRANSFER and description doesn't suggest a transfer",
127 |       };
128 |     }
129 | 
130 |     // First check for obvious internal transfers using name-based heuristics
131 |     if (transaction.merchant) {
132 |       // If this is a received transfer and the merchant name seems to be the same person
133 |       if (
134 |         transaction.amount > 0 &&
135 |         areSimilarNames(transaction.merchant, userConfig.cardHolder.name)
136 |       ) {
137 |         return {
138 |           isP2PTransfer: false,
139 |           isInternalTransfer: true,
140 |           confidence: 0.9,
141 |           fromPerson: transaction.merchant,
142 |           toPerson: userConfig.cardHolder.name,
143 |           reason: `This appears to be an internal transfer between accounts owned by the same person (${transaction.merchant} and ${userConfig.cardHolder.name}).`,
144 |         };
145 |       }
146 |     }
147 | 
148 |     // Check if we have any matching transactions in the opposite direction
149 |     const matchingTransaction = findMatchingTransaction(transaction, otherTransactions);
150 | 
151 |     // Define system instructions for the AI model
152 |     const systemPrompt = `
153 | // ROLE
154 | You are a financial transfer detection expert specializing in Brazilian banking systems.
155 | 
156 | // TASK
157 | Analyze transactions and determine if they represent transfers between people or accounts.
158 | 
159 | // TRANSFER TYPES
160 | - INTERNAL TRANSFERS: Between accounts owned by the same person (e.g., from checking to savings)
161 | - EXTERNAL TRANSFERS: From one person to another person (e.g., paying a friend)
162 | 
163 | // TRANSACTION TYPE
164 | Remember that TRANSFER is a transaction type, not a category. Transactions with type TRANSFER can have various categories based on the purpose of the transfer.
165 | 
166 | // INTERNAL TRANSFER INDICATORS
167 | - Transfer terminology with account references ("transfer from checking to savings")
168 | - Banking terms: "transferência", "TED", "DOC", "PIX" between own accounts
169 | - Bank names on both sides of the transaction
170 | - Matching opposing transaction with similar amount and timing
171 | - References to "own account", "self", or "between accounts"
172 | - Similar names that likely represent the same person (e.g., "Andre Dezzy Victor" and "André Victor")
173 | 
174 | // EXTERNAL TRANSFER INDICATORS
175 | - Recipient names that are not the account holder
176 | - PIX/payment services with recipient information
177 | - References to sending/receiving money to others
178 | - Personal transfer descriptions
179 | 
180 | // CONTEXT
181 | Account holder name: "${userConfig.cardHolder.name}"
182 | Known accounts: ${accountsAndCards.join(', ')}
183 | `.trim();
184 | 
185 |     // Define the specific transaction data for analysis
186 |     const userPrompt = `
187 | Analyze this transaction for P2P transfer detection:
188 | 
189 | Description: ${transaction.description}
190 | Amount: ${transaction.amount}
191 | Date: ${transaction.date}
192 | Type: ${transaction.type}
193 | Category: ${transaction.category}
194 | ${transaction.merchant ? `Merchant: ${transaction.merchant}` : ''}
195 | 
196 | ${
197 |   matchingTransaction
198 |     ? `There is a matching transaction in the opposite direction:
199 | Matching ID: ${matchingTransaction.id}
200 | Matching Description: ${matchingTransaction.description}
201 | Matching Amount: ${matchingTransaction.amount}
202 | Matching Date: ${matchingTransaction.date}
203 | `
204 |     : 'No matching transaction found in the opposite direction.'
205 | }
206 | `.trim();
207 | 
208 |     const result = await generateObject({
209 |       model: openai(defaultModel),
210 |       schema: p2pTransferSchema,
211 |       system: systemPrompt,
212 |       prompt: userPrompt,
213 |       temperature: 0.2,
214 |     });
215 | 
216 |     // Log warnings if any
217 |     if (result.warnings && result.warnings.length > 0) {
218 |       console.warn('P2P transfer detection warnings:', result.warnings);
219 |     }
220 | 
221 |     console.log('P2P transfer detection result:', result.object);
222 | 
223 |     return result.object;
224 |   } catch (error) {
225 |     console.error('P2P transfer detection error:', error);
226 | 
227 |     return {
228 |       isP2PTransfer: transaction.type === TransactionType.TRANSFER,
229 |       isInternalTransfer: false,
230 |       confidence: 0.3,
231 |       reason: 'Error in P2P detection, defaulting based on transaction type',
232 |     };
233 |   }
234 | }
235 | 
236 | /**
237 |  * Check if a transaction description is likely to be a transfer
238 |  * @param description The transaction description
239 |  * @returns True if the description suggests a transfer
240 |  */
241 | function isLikelyTransfer(description: string): boolean {
242 |   const transferTerms = [
243 |     'transfer',
244 |     'transferencia',
245 |     'transferência',
246 |     'ted',
247 |     'doc',
248 |     'pix',
249 |     'envio',
250 |     'enviada',
251 |     'enviado',
252 |     'recebido',
253 |     'recebida',
254 |     'entre contas',
255 |     'mesma titularidade',
256 |     'para conta',
257 |     'da conta',
258 |     'from account',
259 |     'to account',
260 |     'pagamento para',
261 |     'payment to',
262 |     'enviou pix',
263 |     'sent pix',
264 |     'recebeu pix',
265 |     'received pix',
266 |   ];
267 | 
268 |   const normalizedDesc = description.toLowerCase();
269 | 
270 |   return transferTerms.some(term => normalizedDesc.includes(term));
271 | }
272 | 
273 | /**
274 |  * Find a matching transaction that likely represents the other side of a transfer
275 |  * @param transaction The transaction to find a match for
276 |  * @param otherTransactions List of other transactions to search
277 |  * @returns Matching transaction if found, undefined otherwise
278 |  */
279 | function findMatchingTransaction(
280 |   transaction: Transaction,
281 |   otherTransactions: Transaction[]
282 | ): Transaction | undefined {
283 |   // Don't try to match if we don't have other transactions
284 |   if (!otherTransactions.length) return undefined;
285 | 
286 |   // For transfers, we look for transactions in the opposite direction
287 |   // with a similar amount within a short time window
288 |   const isOutgoing = transaction.amount < 0;
289 |   const absAmount = Math.abs(transaction.amount);
290 | 
291 |   // For matching, we allow a 3-day window (transfers might take time to appear)
292 |   const maxTimeDifference = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
293 | 
294 |   // Helper to check name similarity in descriptions/merchants
295 |   const checkDescriptionSimilarity = (desc1: string, desc2: string): boolean => {
296 |     if (!desc1 || !desc2) return false;
297 | 
298 |     const clean1 = desc1.toLowerCase().trim();
299 |     const clean2 = desc2.toLowerCase().trim();
300 | 
301 |     // Direct match
302 |     if (clean1 === clean2) return true;
303 | 
304 |     // Use string similarity for fuzzy matching
305 |     return calculateStringSimilarity(clean1, clean2) >= 0.6; // Lower threshold for descriptions
306 |   };
307 | 
308 |   // Look for matching transactions
309 |   return otherTransactions.find(other => {
310 |     // If transactions have the same direction, they're not matching sides of a transfer
311 |     const otherIsOutgoing = other.amount < 0;
312 | 
313 |     if (isOutgoing === otherIsOutgoing) return false;
314 | 
315 |     // Check if amounts match (allow for small differences due to fees)
316 |     const otherAbsAmount = Math.abs(other.amount);
317 |     const amountDiff = Math.abs(absAmount - otherAbsAmount);
318 |     const isAmountSimilar = amountDiff <= 1 || amountDiff / absAmount <= 0.01; // 1 currency unit or 1% difference
319 | 
320 |     if (!isAmountSimilar) return false;
321 | 
322 |     // Check if dates are close (within the allowed window)
323 |     const transactionDate = new Date(transaction.date).getTime();
324 |     const otherDate = new Date(other.date).getTime();
325 |     const timeDiff = Math.abs(transactionDate - otherDate);
326 | 
327 |     if (timeDiff > maxTimeDifference) return false;
328 | 
329 |     // Check if the descriptions or merchants are related
330 |     // This helps identify transfers between accounts even if the transaction IDs are different
331 |     if (
332 |       transaction.merchant &&
333 |       other.merchant &&
334 |       areSimilarNames(transaction.merchant, other.merchant)
335 |     ) {
336 |       return true;
337 |     }
338 | 
339 |     // Check description similarity
340 |     if (checkDescriptionSimilarity(transaction.description, other.description)) {
341 |       return true;
342 |     }
343 | 
344 |     // If both have merchants, check for similarity in merchants vs descriptions
345 |     if (
346 |       transaction.merchant &&
347 |       other.description &&
348 |       checkDescriptionSimilarity(transaction.merchant, other.description)
349 |     ) {
350 |       return true;
351 |     }
352 | 
353 |     if (
354 |       other.merchant &&
355 |       transaction.description &&
356 |       checkDescriptionSimilarity(other.merchant, transaction.description)
357 |     ) {
358 |       return true;
359 |     }
360 | 
361 |     // For transfer identification, if amount and timing match, that's often enough
362 |     return isAmountSimilar && timeDiff <= maxTimeDifference;
363 |   });
364 | }
```

src/actions/ai/extract-card-from-filename.ts
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
107 | 
108 |     // Return a minimal result with low confidence on error
109 |     return {
110 |       confidence: 0.1,
111 |     };
112 |   }
113 | }
```

src/actions/ai/extract-transaction-fields.ts
```
1 | 'use server';
2 | 
3 | import { openai } from '@ai-sdk/openai';
4 | import { generateObject } from 'ai';
5 | import * as chrono from 'chrono-node';
6 | import type { JsonObject } from 'type-fest';
7 | 
8 | import { defaultModel } from '@/lib/ai';
9 | import {
10 |   transactionBatchExtractionSchema,
11 |   transactionExtractionSchema,
12 |   type TransactionExtraction,
13 | } from '@/schemas/ai/transaction-extraction';
14 | import { TransactionCategory } from '@/types/transaction/enums/transaction-category';
15 | import { TransactionType } from '@/types/transaction/enums/transaction-type';
16 | 
17 | // Maximum number of transactions to process in a single batch
18 | const MAX_BATCH_SIZE = 7;
19 | 
20 | /**
21 |  * Builds a unified system prompt for transaction extraction
22 |  * Works for both single and batch transactions
23 |  */
24 | function buildSystemPrompt(isBatch: boolean): string {
25 |   return `
26 | // ROLE
27 | You are a financial assistant specialized in extracting transaction details from ${isBatch ? 'multiple transactions at once' : 'text'}.
28 | 
29 | // TASK
30 | Extract all relevant transaction information from ${isBatch ? 'each transaction in the batch' : 'user input'}, including description, amount, date, merchant, and categorization.
31 | 
32 | // REQUIRED FIELDS${isBatch ? ' FOR EACH TRANSACTION' : ''}
33 | - Description: What the transaction is for
34 | - Amount: As a number, negative for expenses
35 | - Date: Format as "original: [original expression]|english: [english equivalent]"
36 | - Merchant: If present in the input
37 | - Category: Based on transaction description
38 | - Transaction type: INCOME, EXPENSE, or TRANSFER
39 | - Installment information: If applicable
40 | - Currency: Default to BRL if not specified
41 | 
42 | // DATE HANDLING EXAMPLES
43 | - "hoje" in Portuguese → "original: hoje|english: today"
44 | - "明天" in Chinese → "original: 明天|english: tomorrow"
45 | - "last Friday" in English → "original: last Friday|english: last Friday"
46 | - If the date is not present, consider it as today's date → "original: |english: today"
47 | 
48 | // LANGUAGE HANDLING
49 | - Detect the language and maintain it for descriptions and merchant names
50 | - Use appropriate formatting conventions for each language
51 | - Only standardize category and type values
52 | 
53 | // FORMATTING RULES
54 | - Merchant Names
55 |   * Format merchant names with proper capitalization (e.g., "CAIO RODRIGUES" -> "Caio Rodrigues")
56 |   * Preserve original language in merchant names (no translation)
57 |   * Include merchant document/ID when present (e.g., "CAIO RODRIGUES •••.229.046-••" -> "Caio Rodrigues •••.229.046-••")
58 | 
59 | - Transaction Descriptions
60 |   * Format descriptions according to the detected language conventions
61 |   * Include merchant name in description with proper capitalization
62 |   * For transfers, use appropriate transfer terminology based on language
63 | 
64 | // EXAMPLES BY LANGUAGE, TYPE AND CATEGORY
65 | // Regular Transactions
66 | - Portuguese: "150 corrida uber ontem" → "Corrida de Uber", type: EXPENSE, category: TRANSPORTATION
67 | - English: "150 uber" → "Uber ride", type: EXPENSE, category: TRANSPORTATION
68 | - Spanish: "50 comida ayer" → "Comida", type: EXPENSE, category: DINING
69 | 
70 | // P2P Transfers
71 | - Simple: "caio 150" → "Transferência para Caio", type: TRANSFER
72 | - With context: "caio 150 churrasco" → "Transferência para Caio (Churrasco)", type: TRANSFER, category: DINING
73 | - Complex: "Transferência recebida pelo Pix - CAIO RODRIGUES GUIMARAES - •••.229.046-•• - BANCO INTER (0077) Agência: 1 Conta: 6886889-8" → 
74 |   "Transferência recebida pelo Pix de Caio Rodrigues Guimarães - Banco Inter | Agência: 1 | Conta: 6886889-8", type: TRANSFER, category: UNCATEGORIZED
75 | ${isBatch ? "\n// PROCESS EACH TRANSACTION INDEPENDENTLY\n- Maintain accuracy for each individual transaction\n- Don't let one transaction influence the categorization of another" : ''}`.trim();
76 | }
77 | 
78 | /**
79 |  * Extract transaction fields from text input or structured data
80 |  * @param prompt A single transaction description or transaction data object
81 |  * @returns Extracted transaction fields - single object or array depending on input
82 |  */
83 | export async function extractTransactionFields(prompt: string): Promise<TransactionExtraction>;
84 | export async function extractTransactionFields(prompt: JsonObject): Promise<TransactionExtraction>;
85 | export async function extractTransactionFields(prompts: string[]): Promise<TransactionExtraction[]>;
86 | export async function extractTransactionFields(
87 |   prompts: JsonObject[]
88 | ): Promise<TransactionExtraction[]>;
89 | export async function extractTransactionFields(
90 |   promptInput: string | JsonObject | string[] | JsonObject[]
91 | ): Promise<TransactionExtraction | TransactionExtraction[]> {
92 |   // Handle single string input
93 |   if (typeof promptInput === 'string') {
94 |     return extractSingleTransaction(promptInput);
95 |   }
96 | 
97 |   // Handle single JsonObject input
98 |   if (!Array.isArray(promptInput) && typeof promptInput === 'object' && promptInput !== null) {
99 |     return extractSingleTransaction(JSON.stringify(promptInput));
100 |   }
101 | 
102 |   // Now we know it's an array
103 |   const inputArray = promptInput as string[] | JsonObject[];
104 | 
105 |   // Handle empty array case
106 |   if (inputArray.length === 0) {
107 |     return [];
108 |   }
109 | 
110 |   // Handle single item array case
111 |   if (inputArray.length === 1) {
112 |     const item = inputArray[0];
113 |     const stringifiedItem = typeof item === 'string' ? item : JSON.stringify(item);
114 | 
115 |     return [await extractSingleTransaction(stringifiedItem)];
116 |   }
117 | 
118 |   // Convert all items to strings for batch processing
119 |   const stringifiedArray = inputArray.map(item =>
120 |     typeof item === 'string' ? item : JSON.stringify(item)
121 |   );
122 | 
123 |   // Handle batch processing for arrays
124 |   return processBatchTransactions(stringifiedArray);
125 | }
126 | 
127 | /**
128 |  * Process a single transaction (internal implementation)
129 |  */
130 | async function extractSingleTransaction(prompt: string): Promise<TransactionExtraction> {
131 |   try {
132 |     // Generate the system prompt for a single transaction
133 |     const systemPrompt = buildSystemPrompt(false);
134 | 
135 |     // Define the specific user input for analysis
136 |     const userPrompt = prompt; // The user's input is directly used as the prompt
137 | 
138 |     // Use generateObject with the schema to structure the output
139 |     const result = await generateObject({
140 |       model: openai(defaultModel),
141 |       schema: transactionExtractionSchema,
142 |       system: systemPrompt,
143 |       prompt: userPrompt,
144 |       temperature: 0.2, // Low temperature for consistent results
145 |     });
146 | 
147 |     // Log warnings if any
148 |     if (result.warnings && result.warnings.length > 0) {
149 |       console.warn('Transaction extraction warnings:', result.warnings);
150 |     }
151 | 
152 |     // Parse natural language date using chrono-node
153 |     const extractedResult = result.object as TransactionExtraction;
154 | 
155 |     // If we have a date string, try to parse it with chrono-node
156 |     if (typeof extractedResult.date === 'string') {
157 |       try {
158 |         // Parse the formatted date string to extract original and English versions
159 |         const dateString = extractedResult.date;
160 |         let englishDateExpression = dateString;
161 | 
162 |         // Extract English expression if available
163 |         if (dateString.includes('|english:')) {
164 |           const parts = dateString.split('|english:');
165 | 
166 |           if (parts.length > 1) {
167 |             englishDateExpression = parts[1].trim();
168 |           }
169 |         }
170 | 
171 |         // Use chrono-node to parse the English date expression
172 |         const parsedDate = chrono.parseDate(englishDateExpression);
173 | 
174 |         if (parsedDate) {
175 |           // Update the date field with the parsed date
176 |           return {
177 |             ...extractedResult,
178 |             date: parsedDate.toISOString(),
179 |           };
180 |         }
181 |       } catch (dateError) {
182 |         console.error('Date parsing error:', dateError);
183 |       }
184 |     }
185 | 
186 |     return extractedResult;
187 |   } catch (error) {
188 |     console.error('Transaction extraction error:', error);
189 |     throw error;
190 |   }
191 | }
192 | 
193 | /**
194 |  * Process multiple transactions in a batch (internal implementation)
195 |  */
196 | async function processBatchTransactions(prompts: string[]): Promise<TransactionExtraction[]> {
197 |   // If the batch is too large, split it into smaller chunks
198 |   if (prompts.length > MAX_BATCH_SIZE) {
199 |     const results: TransactionExtraction[] = [];
200 | 
201 |     // Process in chunks of MAX_BATCH_SIZE
202 |     for (let i = 0; i < prompts.length; i += MAX_BATCH_SIZE) {
203 |       const chunk = prompts.slice(i, i + MAX_BATCH_SIZE);
204 |       const chunkResults = await processBatchTransactions(chunk);
205 | 
206 |       results.push(...chunkResults);
207 |     }
208 | 
209 |     return results;
210 |   }
211 | 
212 |   try {
213 |     // Generate the system prompt for batch transactions
214 |     const systemPrompt = buildSystemPrompt(true);
215 | 
216 |     // Format the batch data for the prompt
217 |     const batchData = prompts.map((t, i) => `TRANSACTION ${i + 1}:\n${t}`).join('\n\n');
218 | 
219 |     // Define the user prompt for batch analysis with clear output format guidance
220 |     const userPrompt = `
221 | Process this batch of ${prompts.length} transactions:
222 | 
223 | ${batchData}
224 | 
225 | EXPECTED OUTPUT FORMAT:
226 | - You should return an object with a 'transactions' array
227 | - Each item in the transactions array should contain all required fields (description, amount, date, etc.)
228 | - Maintain the order of transactions to match the input order
229 | `.trim();
230 | 
231 |     // Use generateObject with the batch schema (wrapper object with transactions array)
232 |     const result = await generateObject({
233 |       model: openai(defaultModel),
234 |       schema: transactionBatchExtractionSchema,
235 |       system: systemPrompt,
236 |       prompt: userPrompt,
237 |       temperature: 0.2, // Low temperature for consistent results
238 |     });
239 | 
240 |     // Log warnings if any
241 |     if (result.warnings && result.warnings.length > 0) {
242 |       console.warn('Batch transaction extraction warnings:', result.warnings);
243 |     }
244 | 
245 |     // Extract the transactions array from the response
246 |     const batchResult = result.object;
247 |     const extractedTransactions = batchResult.transactions || [];
248 | 
249 |     // Process dates for each extracted transaction
250 |     return extractedTransactions.map(processExtractedDate);
251 |   } catch (error) {
252 |     console.error('Batch transaction extraction error:', error);
253 | 
254 |     // Fall back to individual processing on batch failure
255 |     console.log('Falling back to individual transaction processing');
256 | 
257 |     const results: TransactionExtraction[] = [];
258 | 
259 |     for (const prompt of prompts) {
260 |       try {
261 |         // Process each transaction individually
262 |         const result = await extractSingleTransaction(prompt);
263 | 
264 |         results.push(result);
265 |       } catch (individualError) {
266 |         console.error('Individual transaction extraction error:', individualError);
267 |         // Add a minimal result to maintain array size/order
268 |         results.push({
269 |           description: `Failed to process: ${prompt.substring(0, 50)}...`,
270 |           amount: 0,
271 |           date: new Date().toISOString(),
272 |           type: TransactionType.EXPENSE,
273 |           category: TransactionCategory.UNCATEGORIZED,
274 |           merchant: undefined,
275 |           isInstallment: false,
276 |           installmentInfo: undefined,
277 |           currency: 'BRL',
278 |         });
279 |       }
280 |     }
281 | 
282 |     return results;
283 |   }
284 | }
285 | 
286 | /**
287 |  * Helper function to process extracted dates
288 |  */
289 | function processExtractedDate(extractedResult: TransactionExtraction): TransactionExtraction {
290 |   // If we have a date string, try to parse it with chrono-node
291 |   if (typeof extractedResult.date === 'string') {
292 |     try {
293 |       // Parse the formatted date string to extract original and English versions
294 |       const dateString = extractedResult.date;
295 |       let englishDateExpression = dateString;
296 | 
297 |       // Extract English expression if available
298 |       if (dateString.includes('|english:')) {
299 |         const parts = dateString.split('|english:');
300 | 
301 |         if (parts.length > 1) {
302 |           englishDateExpression = parts[1].trim();
303 |         }
304 |       }
305 | 
306 |       // Use chrono-node to parse the English date expression
307 |       const parsedDate = chrono.parseDate(englishDateExpression);
308 | 
309 |       if (parsedDate) {
310 |         return {
311 |           ...extractedResult,
312 |           date: parsedDate.toISOString(),
313 |         };
314 |       }
315 |     } catch (dateError) {
316 |       console.error('Date parsing error:', dateError);
317 |     }
318 |   }
319 | 
320 |   return extractedResult;
321 | }
```

src/components/overview/manual-transaction-form.tsx
```
1 | 'use client';
2 | 
3 | import { useState } from 'react';
4 | 
5 | import { zodResolver } from '@hookform/resolvers/zod';
6 | import { Loader2 } from 'lucide-react';
7 | import { useForm } from 'react-hook-form';
8 | import { toast } from 'sonner';
9 | import { z } from 'zod';
10 | 
11 | import { extractTransactionFields } from '@/actions/ai/extract-transaction-fields';
12 | import { Button } from '@/components/ui/button';
13 | import {
14 |   Card,
15 |   CardContent,
16 |   CardDescription,
17 |   CardFooter,
18 |   CardHeader,
19 |   CardTitle,
20 | } from '@/components/ui/card';
21 | import { DatePicker } from '@/components/ui/date-picker';
22 | import { Input } from '@/components/ui/input';
23 | import { Label } from '@/components/ui/label';
24 | import {
25 |   Select,
26 |   SelectContent,
27 |   SelectItem,
28 |   SelectTrigger,
29 |   SelectValue,
30 | } from '@/components/ui/select';
31 | import { TransactionCategory } from '@/types/transaction/enums/transaction-category';
32 | import { TransactionType } from '@/types/transaction/enums/transaction-type';
33 | 
34 | // Transaction form schema with required fields
35 | const transactionFormSchema = z.object({
36 |   description: z.string().min(1, { message: 'Description is required' }),
37 |   amount: z.coerce.number(),
38 |   category: z.nativeEnum(TransactionCategory),
39 |   type: z.nativeEnum(TransactionType),
40 |   date: z.date(),
41 |   merchant: z.string().optional(),
42 |   currency: z.string().default('BRL'),
43 | });
44 | 
45 | type TransactionFormValues = z.infer<typeof transactionFormSchema>;
46 | 
47 | // Helper function to get a display-friendly category name
48 | const getCategoryLabel = (category: string): string => {
49 |   // Convert SNAKE_CASE to Title Case and replace underscores with spaces
50 |   return category
51 |     .split('_')
52 |     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
53 |     .join(' ');
54 | };
55 | 
56 | // Currencies
57 | const CURRENCIES = [
58 |   { value: 'BRL', label: 'BRL' },
59 |   { value: 'USD', label: 'USD' },
60 |   { value: 'EUR', label: 'EUR' },
61 | ];
62 | 
63 | interface ManualTransactionFormProps {
64 |   className?: string;
65 |   title?: string;
66 |   description?: string;
67 | }
68 | 
69 | export function ManualTransactionForm({
70 |   className = '',
71 |   title = 'Add Manual Transaction',
72 |   description = 'Record financial activities not present in your bank statements',
73 | }: ManualTransactionFormProps) {
74 |   const [aiPrompt, setAiPrompt] = useState('');
75 |   const [isExtracting, setIsExtracting] = useState(false);
76 | 
77 |   // Initialize form with default values
78 |   const form = useForm<TransactionFormValues>({
79 |     resolver: zodResolver(transactionFormSchema),
80 |     defaultValues: {
81 |       description: '',
82 |       amount: 0,
83 |       category: TransactionCategory.UNCATEGORIZED,
84 |       type: TransactionType.EXPENSE,
85 |       date: new Date(),
86 |       merchant: '',
87 |       currency: 'BRL',
88 |     },
89 |   });
90 | 
91 |   // Handle AI extraction
92 |   const handleExtractTransaction = async () => {
93 |     if (!aiPrompt.trim()) {
94 |       toast.error('Empty prompt', {
95 |         description: 'Please enter a transaction description to extract',
96 |       });
97 | 
98 |       return;
99 |     }
100 | 
101 |     setIsExtracting(true);
102 | 
103 |     try {
104 |       const extraction = await extractTransactionFields(aiPrompt);
105 | 
106 |       // Update form with extracted values
107 |       form.setValue('description', extraction.description || '');
108 |       form.setValue('amount', extraction.amount || 0);
109 | 
110 |       // Type safety for category
111 |       if (
112 |         extraction.category &&
113 |         Object.values(TransactionCategory).includes(extraction.category as TransactionCategory)
114 |       ) {
115 |         form.setValue('category', extraction.category as TransactionCategory);
116 |       }
117 | 
118 |       // Type safety for transaction type
119 |       if (
120 |         extraction.type &&
121 |         Object.values(TransactionType).includes(extraction.type as TransactionType)
122 |       ) {
123 |         form.setValue('type', extraction.type as TransactionType);
124 |       }
125 | 
126 |       form.setValue('currency', extraction.currency || 'BRL');
127 |       form.setValue('merchant', extraction.merchant || '');
128 | 
129 |       if (extraction.date) {
130 |         form.setValue('date', new Date(extraction.date));
131 |       }
132 | 
133 |       toast.success('Transaction extracted', {
134 |         description: 'The transaction details have been extracted',
135 |       });
136 |     } catch (error) {
137 |       console.error('Error extracting transaction:', error);
138 |       toast.error('Extraction failed', {
139 |         description: 'Could not extract transaction details',
140 |       });
141 |     } finally {
142 |       setIsExtracting(false);
143 |     }
144 |   };
145 | 
146 |   // Handle form submission
147 |   const onSubmit = (data: TransactionFormValues) => {
148 |     // Here you would typically save the transaction to your database
149 |     console.log('Transaction submitted:', data);
150 |     toast.success('Transaction added', {
151 |       description: 'Your transaction has been successfully added',
152 |     });
153 | 
154 |     // Reset form
155 |     form.reset();
156 |     setAiPrompt('');
157 |   };
158 | 
159 |   // Handle key press for quick add input
160 |   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
161 |     if (e.key === 'Enter' && !isExtracting) {
162 |       e.preventDefault();
163 |       handleExtractTransaction();
164 |     }
165 |   };
166 | 
167 |   return (
168 |     <Card className={`flex h-full flex-col border ${className}`}>
169 |       <CardHeader>
170 |         <CardTitle>{title}</CardTitle>
171 | 
172 |         <CardDescription>{description}</CardDescription>
173 |       </CardHeader>
174 | 
175 |       <CardContent>
176 |         <div className="space-y-8">
177 |           {/* Row 1: Input field with button */}
178 |           <div className="flex gap-2">
179 |             <Input
180 |               id="ai-prompt"
181 |               placeholder="Quick add (e.g., '50 for lunch yesterday')"
182 |               value={aiPrompt}
183 |               onChange={e => setAiPrompt(e.target.value)}
184 |               onKeyDown={handleKeyPress}
185 |               className="flex-1"
186 |             />
187 | 
188 |             <Button
189 |               variant="secondary"
190 |               onClick={handleExtractTransaction}
191 |               disabled={isExtracting}
192 |               className="shrink-0"
193 |             >
194 |               {isExtracting ? (
195 |                 <>
196 |                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
197 |                   Extract
198 |                 </>
199 |               ) : (
200 |                 'Extract'
201 |               )}
202 |             </Button>
203 |           </div>
204 | 
205 |           <form
206 |             id="transaction-form"
207 |             onSubmit={form.handleSubmit(onSubmit)}
208 |             className="flex flex-col gap-3"
209 |           >
210 |             {/* Row 2: Currency, Amount, Description */}
211 |             <div className="grid grid-cols-12 gap-3">
212 |               {/* Currency */}
213 |               <div className="col-span-3 space-y-2">
214 |                 <Label htmlFor="currency">Currency</Label>
215 | 
216 |                 <Select
217 |                   value={form.watch('currency')}
218 |                   onValueChange={value => form.setValue('currency', value)}
219 |                 >
220 |                   <SelectTrigger id="currency" className="w-full">
221 |                     <SelectValue placeholder="BRL" />
222 |                   </SelectTrigger>
223 | 
224 |                   <SelectContent>
225 |                     {CURRENCIES.map(currency => (
226 |                       <SelectItem key={currency.value} value={currency.value}>
227 |                         {currency.label}
228 |                       </SelectItem>
229 |                     ))}
230 |                   </SelectContent>
231 |                 </Select>
232 |               </div>
233 | 
234 |               {/* Amount */}
235 |               <div className="col-span-3 space-y-2">
236 |                 <Label htmlFor="amount">Amount</Label>
237 | 
238 |                 <Input
239 |                   id="amount"
240 |                   type="number"
241 |                   step="0.01"
242 |                   placeholder="0.00"
243 |                   {...form.register('amount', { valueAsNumber: true })}
244 |                 />
245 | 
246 |                 {form.formState.errors.amount && (
247 |                   <p className="text-destructive text-sm">{form.formState.errors.amount.message}</p>
248 |                 )}
249 |               </div>
250 | 
251 |               {/* Description */}
252 |               <div className="col-span-6 space-y-2">
253 |                 <Label htmlFor="description">Description</Label>
254 | 
255 |                 <Input
256 |                   id="description"
257 |                   placeholder="Transaction description"
258 |                   {...form.register('description')}
259 |                 />
260 | 
261 |                 {form.formState.errors.description && (
262 |                   <p className="text-destructive text-sm">
263 |                     {form.formState.errors.description.message}
264 |                   </p>
265 |                 )}
266 |               </div>
267 |             </div>
268 | 
269 |             {/* Row 3: Type and Category */}
270 |             <div className="flex w-full gap-3">
271 |               {/* Transaction Type */}
272 |               <div className="flex-1 space-y-2">
273 |                 <Label htmlFor="transaction-type">Type</Label>
274 | 
275 |                 <Select
276 |                   value={form.watch('type')}
277 |                   onValueChange={value => form.setValue('type', value as TransactionType)}
278 |                 >
279 |                   <SelectTrigger id="transaction-type" className="w-full">
280 |                     <SelectValue placeholder="Select type" />
281 |                   </SelectTrigger>
282 | 
283 |                   <SelectContent>
284 |                     {Object.values(TransactionType).map(type => (
285 |                       <SelectItem key={type} value={type}>
286 |                         {getCategoryLabel(type)}
287 |                       </SelectItem>
288 |                     ))}
289 |                   </SelectContent>
290 |                 </Select>
291 |               </div>
292 | 
293 |               {/* Category */}
294 |               <div className="flex-1 space-y-2">
295 |                 <Label htmlFor="category">Category</Label>
296 | 
297 |                 <Select
298 |                   value={form.watch('category')}
299 |                   onValueChange={value => form.setValue('category', value as TransactionCategory)}
300 |                 >
301 |                   <SelectTrigger id="category" className="w-full">
302 |                     <SelectValue placeholder="Select category" />
303 |                   </SelectTrigger>
304 | 
305 |                   <SelectContent className="max-h-72">
306 |                     <SelectItem value={TransactionCategory.UNCATEGORIZED}>Uncategorized</SelectItem>
307 | 
308 |                     {/* Income Categories - Use section dividers instead of invalid empty strings */}
309 |                     <div className="text-primary px-2 py-1.5 text-xs font-semibold">Income</div>
310 | 
311 |                     <SelectItem value={TransactionCategory.SALARY}>Salary</SelectItem>
312 | 
313 |                     <SelectItem value={TransactionCategory.INVESTMENT_INCOME}>
314 |                       Investment Income
315 |                     </SelectItem>
316 | 
317 |                     <SelectItem value={TransactionCategory.REIMBURSEMENT}>Reimbursement</SelectItem>
318 | 
319 |                     <SelectItem value={TransactionCategory.GIFT}>Gift</SelectItem>
320 | 
321 |                     {/* Expense Categories - Use section dividers instead of invalid empty strings */}
322 |                     <div className="text-primary px-2 py-1.5 text-xs font-semibold">Expenses</div>
323 | 
324 |                     <SelectItem value={TransactionCategory.GROCERIES}>Groceries</SelectItem>
325 | 
326 |                     <SelectItem value={TransactionCategory.DINING}>Dining</SelectItem>
327 | 
328 |                     <SelectItem value={TransactionCategory.ENTERTAINMENT}>Entertainment</SelectItem>
329 | 
330 |                     <SelectItem value={TransactionCategory.TRANSPORTATION}>
331 |                       Transportation
332 |                     </SelectItem>
333 | 
334 |                     <SelectItem value={TransactionCategory.UTILITIES}>Utilities</SelectItem>
335 | 
336 |                     <SelectItem value={TransactionCategory.HOUSING}>Housing</SelectItem>
337 | 
338 |                     <SelectItem value={TransactionCategory.HEALTH}>Health</SelectItem>
339 | 
340 |                     <SelectItem value={TransactionCategory.EDUCATION}>Education</SelectItem>
341 | 
342 |                     <SelectItem value={TransactionCategory.SHOPPING}>Shopping</SelectItem>
343 | 
344 |                     <SelectItem value={TransactionCategory.TRAVEL}>Travel</SelectItem>
345 | 
346 |                     <SelectItem value={TransactionCategory.PERSONAL_CARE}>Personal Care</SelectItem>
347 | 
348 |                     <SelectItem value={TransactionCategory.SUBSCRIPTIONS}>Subscriptions</SelectItem>
349 |                   </SelectContent>
350 |                 </Select>
351 | 
352 |                 {form.formState.errors.category && (
353 |                   <p className="text-destructive text-sm">
354 |                     {form.formState.errors.category.message}
355 |                   </p>
356 |                 )}
357 |               </div>
358 |             </div>
359 | 
360 |             {/* Row 4: Date and Merchant */}
361 |             <div className="flex w-full gap-3">
362 |               {/* Date */}
363 |               <div className="flex-1 space-y-2">
364 |                 <Label htmlFor="date">Date</Label>
365 | 
366 |                 <DatePicker
367 |                   date={form.watch('date')}
368 |                   onSelect={date => form.setValue('date', date || new Date())}
369 |                 />
370 | 
371 |                 {form.formState.errors.date && (
372 |                   <p className="text-destructive text-sm">{form.formState.errors.date.message}</p>
373 |                 )}
374 |               </div>
375 | 
376 |               {/* Merchant */}
377 |               <div className="flex-1 space-y-2">
378 |                 <Label htmlFor="merchant">Merchant</Label>
379 | 
380 |                 <Input
381 |                   id="merchant"
382 |                   placeholder="Merchant or payee (optional)"
383 |                   {...form.register('merchant')}
384 |                 />
385 |               </div>
386 |             </div>
387 |           </form>
388 |         </div>
389 |       </CardContent>
390 | 
391 |       <CardFooter className="mt-auto">
392 |         <Button type="submit" form="transaction-form" className="w-full">
393 |           Add Transaction
394 |         </Button>
395 |       </CardFooter>
396 |     </Card>
397 |   );
398 | }
```

src/types/modules/pdfjs.d.ts
```
1 | /**
2 |  * Type declaration for PDF.js worker module
3 |  */
4 | declare module 'pdfjs-dist/build/pdf.worker.mjs';
```

src/types/file-uploader/processing-durations.ts
```
1 | /**
2 |  * Interface for tracking processing durations
3 |  */
4 | export interface ProcessingDurations {
5 |   total: number;
6 |   parsing?: number;
7 |   extraction?: number;
8 |   detection?: number;
9 | }
```

src/types/file-uploader/processing-step.ts
```
1 | import type { ReactNode } from 'react';
2 | 
3 | /**
4 |  * Supported processing step IDs
5 |  */
6 | export type ProcessingStepId = 'parsing' | 'extraction' | 'detection';
7 | 
8 | /**
9 |  * Processing step UI model
10 |  */
11 | export interface ProcessingStep {
12 |   id: ProcessingStepId;
13 |   name: string;
14 |   icon: ReactNode;
15 |   isActive: boolean;
16 |   isComplete: boolean;
17 |   isPending: boolean;
18 |   time?: number;
19 | }
```

src/app/(app)/ai-playground/page.tsx
```
1 | import type { Metadata } from 'next';
2 | 
3 | import { TransactionExtractor } from '@/components/ai-playground/transaction-extractor';
4 | 
5 | export const metadata: Metadata = {
6 |   title: 'AI-Powered Playground',
7 |   description: 'Try out our tools for transaction management',
8 | };
9 | 
10 | export default function AIPlaygroundPage() {
11 |   return (
12 |     <div className="container mx-auto space-y-12 px-8 py-16">
13 |       <div>
14 |         <h1 className="text-3xl font-bold tracking-tight">AI-Powered Playground</h1>
15 | 
16 |         <p className="text-muted-foreground mt-2">Try out our tools for transaction management</p>
17 |       </div>
18 | 
19 |       <div className="flex flex-wrap gap-8">
20 |         {/* Transaction Extractor Section */}
21 |         <TransactionExtractor />
22 |       </div>
23 |     </div>
24 |   );
25 | }
```

src/app/api/process-bank-statement/route.ts
```
1 | import { detectP2PTransfer } from '@/actions/ai/detect-person-to-person-transfer';
2 | import { extractCardFromFilename as aiExtractCardFromFilename } from '@/actions/ai/extract-card-from-filename';
3 | import { extractTransactionFields } from '@/actions/ai/extract-transaction-fields';
4 | import { parseCSV } from '@/lib/parsers/csv-parser';
5 | import { parsePDF } from '@/lib/parsers/pdf-parser';
6 | import type { Transaction } from '@/schemas/transaction';
7 | import { TransactionType } from '@/types/transaction/enums/transaction-type';
8 | 
9 | import {
10 |   ProcessBankStatementRequestSchema,
11 |   type ExtractedRow,
12 |   type FileContent,
13 |   type ProcessedStatement,
14 |   type TimingMetrics,
15 |   type TransactionFields,
16 |   type TransferDetectionResult,
17 | } from './schemas';
18 | 
19 | export const runtime = 'edge';
20 | 
21 | // API route handlers
22 | export async function POST(request: Request): Promise<Response> {
23 |   try {
24 |     const data = await request.json();
25 | 
26 |     // Validate request data using Zod schema
27 |     const parseResult = ProcessBankStatementRequestSchema.safeParse(data);
28 | 
29 |     if (!parseResult.success) {
30 |       return Response.json(
31 |         { error: `Invalid request: ${parseResult.error.message}` },
32 |         { status: 400 }
33 |       );
34 |     }
35 | 
36 |     const { fileContents, existingTransactions = [] } = parseResult.data;
37 | 
38 |     // Always use streaming mode - no need to check URL parameters
39 |     const encoder = new TextEncoder();
40 |     const customReadable = new ReadableStream({
41 |       async start(controller) {
42 |         try {
43 |           // Convert Base64-encoded content back to ArrayBuffer for PDF files
44 |           const processableFileContents = fileContents.map(file => {
45 |             if (file.contentType === 'application/pdf' && typeof file.content === 'string') {
46 |               return {
47 |                 ...file,
48 |                 content: base64ToArrayBuffer(file.content),
49 |               };
50 |             }
51 | 
52 |             return file;
53 |           });
54 | 
55 |           // Process with streaming updates
56 |           const result = await processBankStatementWithStreaming(
57 |             processableFileContents,
58 |             existingTransactions,
59 |             // Stream timing updates callback
60 |             timingMetrics => {
61 |               const update = JSON.stringify({
62 |                 event: 'timing-update',
63 |                 data: timingMetrics,
64 |               });
65 | 
66 |               controller.enqueue(encoder.encode(update + '\n'));
67 |             }
68 |           );
69 | 
70 |           // Send the final result
71 |           controller.enqueue(
72 |             encoder.encode(
73 |               JSON.stringify({
74 |                 event: 'complete',
75 |                 data: result,
76 |               }) + '\n'
77 |             )
78 |           );
79 |           controller.close();
80 |         } catch (error) {
81 |           console.error('Error processing files:', error);
82 |           controller.enqueue(
83 |             encoder.encode(
84 |               JSON.stringify({
85 |                 event: 'error',
86 |                 data: {
87 |                   message: `Failed to process bank statements: ${(error as Error).message}`,
88 |                 },
89 |               }) + '\n'
90 |             )
91 |           );
92 |           controller.close();
93 |         }
94 |       },
95 |     });
96 | 
97 |     return new Response(customReadable, {
98 |       headers: {
99 |         'Content-Type': 'text/event-stream',
100 |         'Cache-Control': 'no-cache',
101 |         Connection: 'keep-alive',
102 |       },
103 |     });
104 |   } catch (error) {
105 |     console.error('Error in API route:', error);
106 | 
107 |     return Response.json(
108 |       { error: `Failed to process bank statements: ${(error as Error).message}` },
109 |       { status: 500 }
110 |     );
111 |   }
112 | }
113 | 
114 | // Helper function to convert Base64 back to ArrayBuffer
115 | function base64ToArrayBuffer(base64: string): ArrayBuffer {
116 |   // Use Buffer in Node.js environment instead of window.atob
117 |   const binary = Buffer.from(base64, 'base64');
118 | 
119 |   return binary.buffer.slice(binary.byteOffset, binary.byteOffset + binary.byteLength);
120 | }
121 | 
122 | /**
123 |  * Process bank statement files (CSV or PDF) with streaming updates
124 |  * @param fileContents Object containing file content as string/ArrayBuffer and metadata
125 |  * @param existingTransactions Optional array of existing transactions to check for duplicates
126 |  * @param onTimingUpdate Callback for streaming timing updates
127 |  * @returns ProcessedStatement object with extracted transactions
128 |  */
129 | async function processBankStatementWithStreaming(
130 |   fileContents: FileContent[],
131 |   existingTransactions: Transaction[] = [],
132 |   onTimingUpdate: (timingMetrics: TimingMetrics) => void
133 | ): Promise<ProcessedStatement> {
134 |   const result = initializeResult();
135 |   const startTime = Date.now();
136 | 
137 |   // Send initial timing metrics
138 |   onTimingUpdate(result.processingTime);
139 | 
140 |   try {
141 |     // Extract and process all transactions from files
142 |     const { transactions, detectedAccounts } = await extractTransactionsFromFiles(
143 |       fileContents,
144 |       existingTransactions,
145 |       result,
146 |       // Send updates during extraction
147 |       updatedMetrics => {
148 |         result.processingTime = updatedMetrics;
149 |         onTimingUpdate(updatedMetrics);
150 |       }
151 |     );
152 | 
153 |     // Detect P2P transfers among transactions
154 |     const detectionStartTime = Date.now();
155 | 
156 |     // Send update before detection starts
157 |     result.processingTime.detection = 0;
158 |     onTimingUpdate(result.processingTime);
159 | 
160 |     const processedTransactions = await detectP2PTransfers(
161 |       transactions,
162 |       Array.from(detectedAccounts)
163 |     );
164 | 
165 |     result.processingTime.detection = Date.now() - detectionStartTime;
166 | 
167 |     // Send update after detection completes
168 |     onTimingUpdate(result.processingTime);
169 | 
170 |     // Store and sort the processed transactions
171 |     result.transactions = sortTransactionsByDate(processedTransactions);
172 | 
173 |     // Record total processing time
174 |     result.processingTime.total = Date.now() - startTime;
175 | 
176 |     // Send final timing metrics
177 |     onTimingUpdate(result.processingTime);
178 | 
179 |     return result;
180 |   } catch (error) {
181 |     console.error('Error processing bank statements:', error);
182 |     result.processingTime.total = Date.now() - startTime;
183 | 
184 |     // Send final timing metrics even on error
185 |     onTimingUpdate(result.processingTime);
186 | 
187 |     throw new Error(`Failed to process bank statements: ${(error as Error).message}`);
188 |   }
189 | }
190 | 
191 | /**
192 |  * Sort transactions by date (newest first)
193 |  */
194 | function sortTransactionsByDate(transactions: Transaction[]): Transaction[] {
195 |   return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
196 | }
197 | 
198 | /**
199 |  * Initialize the result object with default values
200 |  */
201 | function initializeResult(): ProcessedStatement {
202 |   return {
203 |     transactions: [],
204 |     errors: [],
205 |     warnings: [],
206 |     duplicatesSkipped: 0,
207 |     processingTime: {
208 |       total: 0,
209 |       parsing: 0,
210 |       extraction: 0,
211 |       detection: 0,
212 |     },
213 |   };
214 | }
215 | 
216 | /**
217 |  * Extract transactions from multiple files
218 |  */
219 | async function extractTransactionsFromFiles(
220 |   fileContents: FileContent[],
221 |   existingTransactions: Transaction[],
222 |   result: ProcessedStatement,
223 |   onTimingUpdate?: (timingMetrics: TimingMetrics) => void
224 | ): Promise<{ transactions: Transaction[]; detectedAccounts: Set<string> }> {
225 |   const allTransactions: Transaction[] = [];
226 |   const detectedAccounts: Set<string> = new Set();
227 |   const processedTransactionIds: Set<string> = new Set(existingTransactions.map(t => t.id));
228 | 
229 |   const parsingStartTime = Date.now();
230 | 
231 |   for (const file of fileContents) {
232 |     try {
233 |       // Extract card info from filename
234 |       const cardInfo = await extractCardInfoFromFilename(file.name);
235 | 
236 |       if (cardInfo) {
237 |         detectedAccounts.add(cardInfo);
238 |       }
239 | 
240 |       // Parse file based on its type
241 |       const extractedRows = await parseFile(file, result);
242 | 
243 |       if (extractedRows.length === 0) {
244 |         result.warnings.push(`No data extracted from ${file.name}`);
245 |         continue;
246 |       }
247 | 
248 |       // Update parsing time
249 |       result.processingTime.parsing = Date.now() - parsingStartTime;
250 | 
251 |       // Send timing update if callback is provided
252 |       if (onTimingUpdate) {
253 |         onTimingUpdate(result.processingTime);
254 |       }
255 | 
256 |       // Process rows into transactions
257 |       const extractionStartTime = Date.now();
258 |       const fileTransactions = await processExtractedRows(
259 |         extractedRows,
260 |         cardInfo,
261 |         processedTransactionIds,
262 |         result
263 |       );
264 | 
265 |       allTransactions.push(...fileTransactions);
266 |       result.processingTime.extraction += Date.now() - extractionStartTime;
267 | 
268 |       // Send timing update if callback is provided
269 |       if (onTimingUpdate) {
270 |         onTimingUpdate(result.processingTime);
271 |       }
272 |     } catch (fileError) {
273 |       result.errors.push(`Error processing file ${file.name}: ${(fileError as Error).message}`);
274 |     }
275 |   }
276 | 
277 |   return { transactions: allTransactions, detectedAccounts };
278 | }
279 | 
280 | /**
281 |  * Parse a file based on its content type
282 |  */
283 | async function parseFile(file: FileContent, result: ProcessedStatement): Promise<ExtractedRow[]> {
284 |   if (file.contentType === 'text/csv' && typeof file.content === 'string') {
285 |     return await parseCSV(file.content);
286 |   }
287 | 
288 |   if (file.contentType === 'application/pdf' && file.content instanceof ArrayBuffer) {
289 |     const extractedRows = await parsePDF(file.content);
290 | 
291 |     // Handle error objects returned by the PDF parser
292 |     if (
293 |       extractedRows.length === 1 &&
294 |       'error' in extractedRows[0] &&
295 |       'message' in extractedRows[0]
296 |     ) {
297 |       const errorObj = extractedRows[0] as { error: string; message: string };
298 | 
299 |       result.errors.push(`${errorObj.error}: ${errorObj.message} (${file.name})`);
300 | 
301 |       return [];
302 |     }
303 | 
304 |     return extractedRows;
305 |   }
306 | 
307 |   result.errors.push(`Unsupported file type for ${file.name}: ${file.contentType}`);
308 | 
309 |   return [];
310 | }
311 | 
312 | /**
313 |  * Process extracted rows into transactions
314 |  */
315 | async function processExtractedRows(
316 |   extractedRows: ExtractedRow[],
317 |   cardInfo: string,
318 |   processedTransactionIds: Set<string>,
319 |   result: ProcessedStatement
320 | ): Promise<Transaction[]> {
321 |   const transactions: Transaction[] = [];
322 | 
323 |   try {
324 |     // Try batch processing first
325 |     const batchResults = await extractTransactionFields(extractedRows);
326 | 
327 |     for (let i = 0; i < batchResults.length; i++) {
328 |       const transaction = createTransaction(
329 |         extractedRows[i],
330 |         batchResults[i],
331 |         cardInfo,
332 |         processedTransactionIds,
333 |         result
334 |       );
335 | 
336 |       if (transaction) {
337 |         transactions.push(transaction);
338 |       }
339 |     }
340 | 
341 |     return transactions;
342 |   } catch (batchError) {
343 |     console.error('Batch processing error, falling back to individual processing:', batchError);
344 | 
345 |     return processRowsIndividually(extractedRows, cardInfo, processedTransactionIds, result);
346 |   }
347 | }
348 | 
349 | /**
350 |  * Process rows individually as a fallback strategy
351 |  */
352 | async function processRowsIndividually(
353 |   extractedRows: ExtractedRow[],
354 |   cardInfo: string,
355 |   processedTransactionIds: Set<string>,
356 |   result: ProcessedStatement
357 | ): Promise<Transaction[]> {
358 |   const transactions: Transaction[] = [];
359 | 
360 |   for (const row of extractedRows) {
361 |     try {
362 |       const transactionFields = await extractTransactionFields(row);
363 |       const transaction = createTransaction(
364 |         row,
365 |         transactionFields,
366 |         cardInfo,
367 |         processedTransactionIds,
368 |         result
369 |       );
370 | 
371 |       if (transaction) {
372 |         transactions.push(transaction);
373 |       }
374 |     } catch {
375 |       result.errors.push(
376 |         `Error extracting transaction from row: ${JSON.stringify(row).substring(0, 100)}...`
377 |       );
378 |     }
379 |   }
380 | 
381 |   return transactions;
382 | }
383 | 
384 | /**
385 |  * Create a transaction from extracted data
386 |  */
387 | function createTransaction(
388 |   row: ExtractedRow,
389 |   transactionFields: TransactionFields,
390 |   cardInfo: string,
391 |   processedTransactionIds: Set<string>,
392 |   result: ProcessedStatement
393 | ): Transaction | null {
394 |   const transactionId = JSON.stringify(row);
395 | 
396 |   if (processedTransactionIds.has(transactionId)) {
397 |     result.duplicatesSkipped++;
398 | 
399 |     return null;
400 |   }
401 | 
402 |   const transaction: Transaction = {
403 |     id: transactionId,
404 |     description: transactionFields.description,
405 |     amount: transactionFields.amount,
406 |     date: transactionFields.date,
407 |     merchant: transactionFields.merchant,
408 |     type: transactionFields.type,
409 |     category: transactionFields.category,
410 |     currency: transactionFields.currency || 'BRL',
411 |     card: cardInfo,
412 |     installment: transactionFields.installmentInfo,
413 |   };
414 | 
415 |   processedTransactionIds.add(transaction.id);
416 | 
417 |   return transaction;
418 | }
419 | 
420 | /**
421 |  * Process all transactions to detect P2P transfers
422 |  * @param transactions List of transactions to process
423 |  * @param knownAccounts List of known account names/cards
424 |  * @returns Processed transactions with P2P transfer information
425 |  */
426 | async function detectP2PTransfers(
427 |   transactions: Transaction[],
428 |   knownAccounts: string[]
429 | ): Promise<Transaction[]> {
430 |   const processedTransactions: Transaction[] = [];
431 |   const transferMatches: Map<string, string> = new Map(); // Maps transaction IDs to their matching transfer
432 | 
433 |   // First pass: Detect potential P2P transfers
434 |   await detectPotentialTransfers(
435 |     transactions,
436 |     knownAccounts,
437 |     transferMatches,
438 |     processedTransactions
439 |   );
440 | 
441 |   // Second pass: Mark matched transactions
442 |   applyTransferMatches(processedTransactions, transferMatches);
443 | 
444 |   return processedTransactions;
445 | }
446 | 
447 | /**
448 |  * Detect potential P2P transfers in the transactions
449 |  */
450 | async function detectPotentialTransfers(
451 |   transactions: Transaction[],
452 |   knownAccounts: string[],
453 |   transferMatches: Map<string, string>,
454 |   processedTransactions: Transaction[]
455 | ): Promise<void> {
456 |   for (const transaction of transactions) {
457 |     // Skip transactions that have already been matched as a transfer
458 |     if (transferMatches.has(transaction.id)) {
459 |       continue;
460 |     }
461 | 
462 |     if (shouldCheckForTransfer(transaction)) {
463 |       // Get other transactions to compare with (excluding this one)
464 |       const otherTransactions = transactions.filter(t => t.id !== transaction.id);
465 | 
466 |       // Detect if this is a P2P transfer
467 |       const result = await detectP2PTransfer(transaction, otherTransactions, knownAccounts);
468 | 
469 |       if (isConfidentTransferResult(result)) {
470 |         applyTransferResult(transaction, result, transferMatches);
471 |       }
472 |     }
473 | 
474 |     processedTransactions.push(transaction);
475 |   }
476 | }
477 | 
478 | /**
479 |  * Check if a transaction should be analyzed for transfer detection
480 |  */
481 | function shouldCheckForTransfer(transaction: Transaction): boolean {
482 |   // Only check for transfers for large amounts or explicit transfer types
483 |   const isSignificantAmount = Math.abs(transaction.amount) >= 50;
484 | 
485 |   return transaction.type === TransactionType.TRANSFER || isSignificantAmount;
486 | }
487 | 
488 | /**
489 |  * Check if a transfer detection result is confident enough
490 |  */
491 | function isConfidentTransferResult(result: TransferDetectionResult): boolean {
492 |   return (result.isP2PTransfer || result.isInternalTransfer) && result.confidence >= 0.7;
493 | }
494 | 
495 | /**
496 |  * Apply transfer detection result to a transaction
497 |  */
498 | function applyTransferResult(
499 |   transaction: Transaction,
500 |   result: TransferDetectionResult,
501 |   transferMatches: Map<string, string>
502 | ): void {
503 |   // Mark this transaction with the appropriate transfer types
504 |   transaction.isP2PTransfer = result.isP2PTransfer;
505 |   transaction.isInternalTransfer = result.isInternalTransfer;
506 | 
507 |   // If a matching transaction was identified
508 |   if (result.matchingTransactionId) {
509 |     // Store the transfer details
510 |     transaction.transfer = {
511 |       matchingTransactionId: result.matchingTransactionId,
512 |       fromAccount: result.fromPerson || '',
513 |       toAccount: result.toPerson || '',
514 |       fromPerson: result.fromPerson || '',
515 |       toPerson: result.toPerson || '',
516 |     };
517 | 
518 |     // Store the match to avoid duplicate processing
519 |     transferMatches.set(transaction.id, result.matchingTransactionId);
520 |     transferMatches.set(result.matchingTransactionId, transaction.id);
521 |   }
522 | }
523 | 
524 | /**
525 |  * Apply transfer matches to all transactions
526 |  */
527 | function applyTransferMatches(
528 |   processedTransactions: Transaction[],
529 |   transferMatches: Map<string, string>
530 | ): void {
531 |   for (const transaction of processedTransactions) {
532 |     if (isUnmarkedTransferMatch(transaction, transferMatches)) {
533 |       const matchingId = transferMatches.get(transaction.id);
534 | 
535 |       if (!matchingId) continue;
536 | 
537 |       const matchingTransaction = processedTransactions.find(t => t.id === matchingId);
538 | 
539 |       if (matchingTransaction?.transfer) {
540 |         copyTransferProperties(transaction, matchingTransaction);
541 |       }
542 |     }
543 |   }
544 | }
545 | 
546 | /**
547 |  * Check if a transaction is an unmarked transfer match
548 |  */
549 | function isUnmarkedTransferMatch(
550 |   transaction: Transaction,
551 |   transferMatches: Map<string, string>
552 | ): boolean {
553 |   return (
554 |     transferMatches.has(transaction.id) &&
555 |     !transaction.isP2PTransfer &&
556 |     !transaction.isInternalTransfer
557 |   );
558 | }
559 | 
560 | /**
561 |  * Copy transfer properties from matching transaction
562 |  */
563 | function copyTransferProperties(transaction: Transaction, matchingTransaction: Transaction): void {
564 |   // Copy transfer types
565 |   transaction.isP2PTransfer = matchingTransaction.isP2PTransfer;
566 |   transaction.isInternalTransfer = matchingTransaction.isInternalTransfer;
567 | 
568 |   // Copy transfer details with swapped directions
569 |   if (matchingTransaction.transfer) {
570 |     transaction.transfer = {
571 |       matchingTransactionId: matchingTransaction.id,
572 |       fromAccount: matchingTransaction.transfer.toAccount,
573 |       toAccount: matchingTransaction.transfer.fromAccount,
574 |       fromPerson: matchingTransaction.transfer.toPerson,
575 |       toPerson: matchingTransaction.transfer.fromPerson,
576 |     };
577 |   }
578 | }
579 | 
580 | /**
581 |  * Extract card information from filename using AI
582 |  * @param fileName The name of the file
583 |  * @returns Formatted card information string
584 |  */
585 | async function extractCardInfoFromFilename(fileName: string): Promise<string> {
586 |   try {
587 |     // Use AI to extract card information from filename
588 |     const extraction = await aiExtractCardFromFilename(fileName);
589 | 
590 |     // If confidence is too low, return generic card info
591 |     if (!extraction || extraction.confidence < 0.3) {
592 |       return '';
593 |     }
594 | 
595 |     const parts: string[] = [];
596 | 
597 |     if (extraction.bankName) {
598 |       parts.push(extraction.bankName);
599 |     }
600 | 
601 |     if (extraction.accountType) {
602 |       parts.push(extraction.accountType);
603 |     }
604 | 
605 |     if (extraction.cardType) {
606 |       parts.push(extraction.cardType);
607 |     }
608 | 
609 |     if (extraction.cardIdentifier) {
610 |       parts.push(extraction.cardIdentifier);
611 |     }
612 | 
613 |     return parts.join(' ');
614 |   } catch (error) {
615 |     console.warn('Error extracting card info from filename:', error);
616 | 
617 |     return '';
618 |   }
619 | }
```

src/app/api/process-bank-statement/schemas.ts
```
1 | import { z } from 'zod';
2 | 
3 | import { TransactionCategory } from '@/types/transaction/enums/transaction-category';
4 | import { TransactionType } from '@/types/transaction/enums/transaction-type';
5 | 
6 | // Zod schemas for all the types used in the API
7 | export const FileContentSchema = z.object({
8 |   name: z.string(),
9 |   content: z.union([z.string(), z.instanceof(ArrayBuffer)]),
10 |   contentType: z.string(),
11 | });
12 | 
13 | export type FileContent = z.infer<typeof FileContentSchema>;
14 | 
15 | export const ExtractedRowSchema = z.record(z.union([z.string(), z.number()]));
16 | 
17 | export type ExtractedRow = z.infer<typeof ExtractedRowSchema>;
18 | 
19 | export const InstallmentInfoSchema = z.object({
20 |   current: z.number(),
21 |   total: z.number(),
22 | });
23 | 
24 | export const TransactionFieldsSchema = z.object({
25 |   description: z.string(),
26 |   amount: z.number(),
27 |   date: z.string(),
28 |   merchant: z.string().optional(),
29 |   type: z.nativeEnum(TransactionType),
30 |   category: z.nativeEnum(TransactionCategory),
31 |   currency: z.string().optional(),
32 |   installmentInfo: InstallmentInfoSchema.optional(),
33 |   confidence: z.number().optional(),
34 | });
35 | 
36 | export type TransactionFields = z.infer<typeof TransactionFieldsSchema>;
37 | 
38 | export const TransferDetectionResultSchema = z.object({
39 |   isP2PTransfer: z.boolean(),
40 |   isInternalTransfer: z.boolean(),
41 |   confidence: z.number(),
42 |   matchingTransactionId: z.string().optional(),
43 |   fromPerson: z.string().optional(),
44 |   toPerson: z.string().optional(),
45 | });
46 | 
47 | export type TransferDetectionResult = z.infer<typeof TransferDetectionResultSchema>;
48 | 
49 | export const TimingMetricsSchema = z.object({
50 |   total: z.number(),
51 |   parsing: z.number(),
52 |   extraction: z.number(),
53 |   detection: z.number(),
54 | });
55 | 
56 | export type TimingMetrics = z.infer<typeof TimingMetricsSchema>;
57 | 
58 | export const ProcessedStatementSchema = z.object({
59 |   transactions: z.array(z.any()), // Using z.any() for Transaction since it's imported
60 |   errors: z.array(z.string()),
61 |   warnings: z.array(z.string()),
62 |   duplicatesSkipped: z.number(),
63 |   processingTime: TimingMetricsSchema,
64 | });
65 | 
66 | export type ProcessedStatement = z.infer<typeof ProcessedStatementSchema>;
67 | 
68 | // Request schema for the API endpoint
69 | export const ProcessBankStatementRequestSchema = z.object({
70 |   fileContents: z.array(FileContentSchema),
71 |   existingTransactions: z.array(z.any()).optional(), // Using z.any() for Transaction since it's imported
72 | });
73 | 
74 | export type ProcessBankStatementRequest = z.infer<typeof ProcessBankStatementRequestSchema>;
```

src/components/overview/statement-file-uploader/card.tsx
```
1 | 'use client';
2 | 
3 | import { useCallback } from 'react';
4 | 
5 | import { Loader2, UploadIcon } from 'lucide-react';
6 | import { useDropzone } from 'react-dropzone';
7 | 
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
18 | import type { Transaction } from '@/schemas/transaction';
19 | import { formatDuration } from '@/utils/format-duration';
20 | 
21 | import { FileItem } from './file-item';
22 | import { ProcessingSteps } from './processing-steps';
23 | import { useStatementFileProcessing } from './use-statement-file-processing';
24 | 
25 | interface StatementFileUploaderProps {
26 |   onTransactionsProcessed: (
27 |     transactions: Transaction[],
28 |     errors?: string[],
29 |     warnings?: string[]
30 |   ) => void;
31 | }
32 | /**
33 |  * Component for handling file upload and processing of bank statements
34 |  */
35 | export function StatementFileUploader({ onTransactionsProcessed }: StatementFileUploaderProps) {
36 |   // Use the file processing hook
37 |   const {
38 |     files,
39 |     isProcessing,
40 |     error,
41 |     isMobile,
42 |     skippedDuplicates,
43 |     elapsedTime,
44 |     startTime,
45 |     showDuration,
46 |     processingDurations,
47 |     activeStep,
48 |     activeStepElapsedTime,
49 |     addFiles,
50 |     removeFile,
51 |     handleProcessFiles,
52 |   } = useStatementFileProcessing({ onTransactionsProcessed });
53 | 
54 |   // Handle file drop
55 |   const onDrop = useCallback(
56 |     (acceptedFiles: File[]) => {
57 |       addFiles(acceptedFiles);
58 |     },
59 |     [addFiles]
60 |   );
61 | 
62 |   // Configure dropzone
63 |   const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
64 |     onDrop,
65 |     accept: {
66 |       'text/csv': ['.csv'],
67 |       'application/pdf': ['.pdf'],
68 |     },
69 |     disabled: isProcessing,
70 |   });
71 | 
72 |   return (
73 |     <div className="h-full">
74 |       <div
75 |         {...getRootProps()}
76 |         className={cn(
77 |           'h-full border-2 border-dashed transition-colors',
78 |           isDragActive ? 'border-primary' : 'border-muted-foreground/25',
79 |           isProcessing ? 'cursor-not-allowed opacity-60' : 'hover:bg-muted/50 cursor-pointer'
80 |         )}
81 |       >
82 |         <input {...getInputProps()} />
83 | 
84 |         <Card className="flex h-full flex-col border-0 bg-transparent">
85 |           <CardHeader>
86 |             <CardTitle>Upload Bank Statements</CardTitle>
87 | 
88 |             <CardDescription>
89 |               {isMobile
90 |                 ? 'Tap here to select your bank or credit card statements'
91 |                 : 'Drag and drop your bank or credit card statements in CSV or PDF format'}
92 |             </CardDescription>
93 |           </CardHeader>
94 | 
95 |           <CardContent className="flex-grow">
96 |             {files.length > 0 ? (
97 |               <div className="space-y-3">
98 |                 <div className="text-sm font-medium">Selected files:</div>
99 | 
100 |                 <ul className="space-y-2">
101 |                   {files.map((file, index) => (
102 |                     <FileItem
103 |                       key={index}
104 |                       file={file}
105 |                       isProcessing={isProcessing}
106 |                       onRemove={() => removeFile(index)}
107 |                     />
108 |                   ))}
109 |                 </ul>
110 |               </div>
111 |             ) : (
112 |               <div className="flex h-full flex-col items-center justify-center py-8 text-center">
113 |                 <UploadIcon className="text-muted-foreground mb-2 h-10 w-10" />
114 | 
115 |                 <p className="text-muted-foreground text-sm">
116 |                   {isProcessing
117 |                     ? 'Processing files... Please wait'
118 |                     : isMobile
119 |                       ? 'Tap to select files'
120 |                       : 'Click or drag and drop to upload files'}
121 |                 </p>
122 |               </div>
123 |             )}
124 | 
125 |             {error && (
126 |               <div className="bg-destructive/10 dark:bg-destructive/20 text-destructive dark:text-destructive-foreground mt-4 rounded-md p-3 text-sm">
127 |                 {error}
128 |               </div>
129 |             )}
130 | 
131 |             {skippedDuplicates > 0 && (
132 |               <div className="bg-muted dark:bg-muted/50 text-muted-foreground mt-4 rounded-md p-3 text-sm">
133 |                 {`${skippedDuplicates} duplicated transaction${
134 |                   skippedDuplicates !== 1 ? 's' : ''
135 |                 } skipped`}
136 |               </div>
137 |             )}
138 | 
139 |             {isProcessing && startTime && (
140 |               <div className="bg-muted dark:bg-muted/50 text-muted-foreground mt-4 flex items-center rounded-md p-3 text-sm">
141 |                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
142 | 
143 |                 <span>Processing for {formatDuration(elapsedTime)}...</span>
144 |               </div>
145 |             )}
146 |           </CardContent>
147 | 
148 |           <CardFooter className="mt-auto flex flex-col items-start gap-6">
149 |             {showDuration && (
150 |               <div className="text-muted-foreground text-xs">
151 |                 <ProcessingSteps
152 |                   isProcessing={isProcessing}
153 |                   activeStep={activeStep}
154 |                   processingDurations={processingDurations}
155 |                   activeStepElapsedTime={activeStepElapsedTime}
156 |                 />
157 |               </div>
158 |             )}
159 | 
160 |             <div className="flex w-full flex-col gap-1">
161 |               <p className="mb-2 text-sm">{files.length} file(s) selected</p>
162 | 
163 |               <Button
164 |                 className="w-full"
165 |                 disabled={files.length === 0 || isProcessing}
166 |                 onClick={e => {
167 |                   e.stopPropagation();
168 |                   handleProcessFiles();
169 |                 }}
170 |               >
171 |                 {isProcessing ? 'Processing...' : 'Process Statements'}
172 |               </Button>
173 |             </div>
174 |           </CardFooter>
175 |         </Card>
176 |       </div>
177 |     </div>
178 |   );
179 | }
```

src/components/overview/statement-file-uploader/file-item.tsx
```
1 | 'use client';
2 | 
3 | import { FileIcon, XIcon } from 'lucide-react';
4 | 
5 | import { Button } from '@/components/ui/button';
6 | 
7 | export interface FileItemProps {
8 |   file: File;
9 |   onRemove: () => void;
10 |   isProcessing: boolean;
11 | }
12 | 
13 | /**
14 |  * Component for displaying individual file items
15 |  */
16 | export function FileItem({ file, onRemove, isProcessing }: FileItemProps) {
17 |   return (
18 |     <li className="bg-muted/50 dark:bg-muted/30 flex items-center justify-between p-2 text-sm">
19 |       <div className="flex flex-1 items-center gap-2">
20 |         <FileIcon className="text-muted-foreground h-4 w-4" />
21 | 
22 |         <span className="max-w-36 flex-1 truncate">{file.name}</span>
23 | 
24 |         <span className="text-muted-foreground min-w-10">({Math.round(file.size / 1024)} KB)</span>
25 |       </div>
26 | 
27 |       <Button
28 |         variant="ghost"
29 |         size="icon"
30 |         className="h-6 w-6"
31 |         disabled={isProcessing}
32 |         onClick={e => {
33 |           e.stopPropagation();
34 |           onRemove();
35 |         }}
36 |       >
37 |         <XIcon className="h-4 w-4" />
38 | 
39 |         <span className="sr-only">Remove file</span>
40 |       </Button>
41 |     </li>
42 |   );
43 | }
```

src/components/overview/statement-file-uploader/processing-steps.tsx
```
1 | 'use client';
2 | 
3 | import { useMemo } from 'react';
4 | 
5 | import { ActivityIcon, DatabaseIcon, ServerIcon } from 'lucide-react';
6 | 
7 | import type { ProcessingDurations } from '@/types/file-uploader/processing-durations';
8 | import type { ProcessingStep, ProcessingStepId } from '@/types/file-uploader/processing-step';
9 | import { formatDuration } from '@/utils/format-duration';
10 | 
11 | /**
12 |  * Checks if a duration value is completed (defined and greater than 0)
13 |  */
14 | function isDurationCompleted(duration?: number): boolean {
15 |   return duration !== undefined && duration > 0;
16 | }
17 | 
18 | /**
19 |  * Props for the enhanced ProcessingSteps component
20 |  */
21 | interface ProcessingStepsProps {
22 |   isProcessing: boolean;
23 |   activeStep: ProcessingStepId | null;
24 |   processingDurations: ProcessingDurations;
25 |   activeStepElapsedTime: number;
26 | }
27 | 
28 | export interface ProcessingStepsListProps {
29 |   steps: ProcessingStep[];
30 |   activeStep: ProcessingStepId | null;
31 |   activeStepElapsedTime: number;
32 | }
33 | 
34 | /**
35 |  * Component for displaying processing steps and their status
36 |  */
37 | function ProcessingStepsList({
38 |   steps,
39 |   activeStep,
40 |   activeStepElapsedTime,
41 | }: ProcessingStepsListProps) {
42 |   return (
43 |     <div className="flex flex-col space-y-1">
44 |       {steps.map(step => {
45 |         // Determine what time to display
46 |         const displayTime =
47 |           step.isActive && activeStep === step.id ? activeStepElapsedTime : step.time;
48 | 
49 |         // Determine styling and indicators based on step state
50 |         let statusIndicator = null;
51 |         let className = 'flex items-center';
52 | 
53 |         if (step.isComplete) {
54 |           className += ' text-emerald-600 dark:text-emerald-400';
55 |         } else if (step.isActive) {
56 |           statusIndicator = <span className="text-primary ml-2 animate-pulse">⋯</span>;
57 |           className += ' text-primary';
58 |         } else if (step.isPending) {
59 |           statusIndicator = <span className="text-muted-foreground ml-2 text-xs">pending</span>;
60 |           className += ' text-muted-foreground';
61 |         }
62 | 
63 |         return (
64 |           <div key={step.id} className={className}>
65 |             {step.icon}
66 | 
67 |             <span>
68 |               {`${step.name}: ${displayTime !== undefined ? formatDuration(displayTime) : '—'}`}
69 |             </span>
70 | 
71 |             {statusIndicator}
72 |           </div>
73 |         );
74 |       })}
75 |     </div>
76 |   );
77 | }
78 | 
79 | /**
80 |  * Enhanced ProcessingSteps component that handles both generation and display of steps
81 |  */
82 | export function ProcessingSteps({
83 |   isProcessing,
84 |   activeStep,
85 |   processingDurations,
86 |   activeStepElapsedTime,
87 | }: ProcessingStepsProps) {
88 |   // Memoize the steps calculation to avoid unnecessary recalculations
89 |   const steps = useMemo((): ProcessingStep[] => {
90 |     const parsingCompleted = isDurationCompleted(processingDurations.parsing);
91 |     const extractionCompleted = isDurationCompleted(processingDurations.extraction);
92 |     const detectionCompleted = isDurationCompleted(processingDurations.detection);
93 | 
94 |     return [
95 |       {
96 |         id: 'parsing',
97 |         name: 'Parsing',
98 |         icon: <ServerIcon className="mr-1 h-3 w-3" />,
99 |         isActive: isProcessing && activeStep === 'parsing',
100 |         isComplete: parsingCompleted,
101 |         isPending: isProcessing && !parsingCompleted,
102 |         time: processingDurations.parsing,
103 |       },
104 |       {
105 |         id: 'extraction',
106 |         name: 'Extraction',
107 |         icon: <DatabaseIcon className="mr-1 h-3 w-3" />,
108 |         isActive: isProcessing && activeStep === 'extraction',
109 |         isComplete: extractionCompleted,
110 |         isPending: isProcessing && parsingCompleted && !extractionCompleted,
111 |         time: processingDurations.extraction,
112 |       },
113 |       {
114 |         id: 'detection',
115 |         name: 'Detection',
116 |         icon: <ActivityIcon className="mr-1 h-3 w-3" />,
117 |         isActive: isProcessing && activeStep === 'detection',
118 |         isComplete: detectionCompleted,
119 |         isPending: isProcessing && extractionCompleted && !detectionCompleted,
120 |         time: processingDurations.detection,
121 |       },
122 |     ];
123 |   }, [isProcessing, activeStep, processingDurations]);
124 | 
125 |   return (
126 |     <ProcessingStepsList
127 |       steps={steps}
128 |       activeStep={activeStep}
129 |       activeStepElapsedTime={activeStepElapsedTime}
130 |     />
131 |   );
132 | }
```

src/components/overview/statement-file-uploader/use-statement-file-processing.ts
```
1 | 'use client';
2 | 
3 | import { useEffect, useState } from 'react';
4 | 
5 | import type { ProcessedStatement, TimingMetrics } from '@/app/api/process-bank-statement/schemas';
6 | import type { Transaction } from '@/schemas/transaction';
7 | import type { ProcessingDurations } from '@/types/file-uploader/processing-durations';
8 | import type { ProcessingStepId } from '@/types/file-uploader/processing-step';
9 | import { detectMobileDevice } from '@/utils/detect-mobile-device';
10 | import { arrayBufferToBase64 } from '@/utils/file-reading/array-buffer-to-base64';
11 | import { readFileAsArrayBuffer } from '@/utils/file-reading/read-file-as-array-buffer';
12 | import { readFileAsText } from '@/utils/file-reading/read-file-as-text';
13 | 
14 | /**
15 |  * Handles the streaming response from the API
16 |  * @param response The fetch response with a readable stream
17 |  * @param onTimingUpdate Optional callback for timing updates
18 |  */
19 | const handleStreamingResponse = async (
20 |   response: Response,
21 |   onTimingUpdate?: (metrics: TimingMetrics) => void
22 | ): Promise<ProcessedStatement> => {
23 |   if (!response.body) {
24 |     throw new Error('Response body is null');
25 |   }
26 | 
27 |   const reader = response.body.getReader();
28 |   const decoder = new TextDecoder();
29 | 
30 |   let result: ProcessedStatement | null = null;
31 |   let streamError: Error | null = null;
32 | 
33 |   try {
34 |     while (true) {
35 |       const { done, value } = await reader.read();
36 | 
37 |       if (done) {
38 |         break;
39 |       }
40 | 
41 |       // Decode the chunk and split by newlines (each line is an event)
42 |       const text = decoder.decode(value, { stream: true });
43 |       const lines = text.split('\n').filter(line => line.trim());
44 | 
45 |       for (const line of lines) {
46 |         try {
47 |           const event = JSON.parse(line);
48 | 
49 |           if (event.event === 'timing-update') {
50 |             // Update the timing metrics
51 |             const timingMetrics = event.data as TimingMetrics;
52 | 
53 |             if (onTimingUpdate) {
54 |               onTimingUpdate(timingMetrics);
55 |             }
56 |           } else if (event.event === 'complete') {
57 |             // This is the final result
58 |             result = event.data as ProcessedStatement;
59 |           } else if (event.event === 'error') {
60 |             // Handle error event
61 |             streamError = new Error(event.data.message);
62 |           }
63 |         } catch (parseError) {
64 |           console.error('Failed to parse streaming event:', parseError, line);
65 |         }
66 |       }
67 |     }
68 |   } catch (streamingError) {
69 |     console.error('Error during streaming:', streamingError);
70 |     throw streamingError;
71 |   } finally {
72 |     reader.releaseLock();
73 |   }
74 | 
75 |   // Check if we got an error from the stream
76 |   if (streamError) {
77 |     throw streamError;
78 |   }
79 | 
80 |   // Check if we got a result
81 |   if (!result) {
82 |     throw new Error('No result received from the server');
83 |   }
84 | 
85 |   return result;
86 | };
87 | 
88 | /**
89 |  * Hook for managing bank statement file processing state and logic
90 |  */
91 | export function useStatementFileProcessing({
92 |   onTransactionsProcessed,
93 | }: {
94 |   onTransactionsProcessed: (
95 |     transactions: Transaction[],
96 |     errors?: string[],
97 |     warnings?: string[]
98 |   ) => void;
99 | }) {
100 |   // File management state
101 |   const [files, setFiles] = useState<File[]>([]);
102 |   const [isProcessing, setIsProcessing] = useState(false);
103 |   const [error, setError] = useState<string | null>(null);
104 | 
105 |   // Transaction tracking state
106 |   const [processedTransactions, setProcessedTransactions] = useState<Transaction[]>([]);
107 |   const [skippedDuplicates, setSkippedDuplicates] = useState<number>(0);
108 | 
109 |   // Mobile detection state
110 |   const [isMobile, setIsMobile] = useState(false);
111 | 
112 |   // Processing timing state
113 |   const [startTime, setStartTime] = useState<number | null>(null);
114 |   const [showDuration, setShowDuration] = useState(false);
115 |   const [elapsedTime, setElapsedTime] = useState<number>(0);
116 |   const [processingDurations, setProcessingDurations] = useState<ProcessingDurations>({
117 |     total: 0,
118 |   });
119 | 
120 |   // Step tracking state
121 |   const [activeStep, setActiveStep] = useState<ProcessingStepId | null>(null);
122 |   const [activeStepStartTime, setActiveStepStartTime] = useState<number | null>(null);
123 |   const [activeStepElapsedTime, setActiveStepElapsedTime] = useState<number>(0);
124 | 
125 |   // Detect if user is on a mobile device
126 |   useEffect(() => {
127 |     setIsMobile(detectMobileDevice());
128 |   }, []);
129 | 
130 |   // Update elapsed time during processing
131 |   useEffect(() => {
132 |     let intervalId: NodeJS.Timeout | null = null;
133 | 
134 |     if (isProcessing && startTime) {
135 |       // Start the interval to update elapsed time every 100ms
136 |       intervalId = setInterval(() => {
137 |         const currentTime = Date.now();
138 |         const elapsed = currentTime - startTime;
139 | 
140 |         setElapsedTime(elapsed);
141 | 
142 |         // Also update active step elapsed time if there is an active step
143 |         if (activeStepStartTime) {
144 |           const stepElapsed = currentTime - activeStepStartTime;
145 | 
146 |           setActiveStepElapsedTime(stepElapsed);
147 |         }
148 |       }, 100);
149 |     } else {
150 |       // Reset elapsed times when not processing
151 |       setElapsedTime(0);
152 |       setActiveStepElapsedTime(0);
153 |     }
154 | 
155 |     // Clean up the interval when the component unmounts or processing stops
156 |     return () => {
157 |       if (intervalId) {
158 |         clearInterval(intervalId);
159 |       }
160 |     };
161 |   }, [isProcessing, startTime, activeStepStartTime]);
162 | 
163 |   // Track active step changes
164 |   useEffect(() => {
165 |     if (!isProcessing) {
166 |       setActiveStep(null);
167 |       setActiveStepStartTime(null);
168 | 
169 |       return;
170 |     }
171 | 
172 |     // Determine which step is currently active based on processingDurations
173 |     let currentActiveStep: ProcessingStepId | null = null;
174 | 
175 |     if (processingDurations.detection !== undefined && processingDurations.detection > 0) {
176 |       // Detection completed, no active step
177 |       currentActiveStep = null;
178 |     } else if (processingDurations.extraction !== undefined && processingDurations.extraction > 0) {
179 |       // Extraction completed, detection is active
180 |       currentActiveStep = 'detection';
181 |     } else if (processingDurations.parsing !== undefined && processingDurations.parsing > 0) {
182 |       // Parsing completed, extraction is active
183 |       currentActiveStep = 'extraction';
184 |     } else if (isProcessing) {
185 |       // Processing started, parsing is active
186 |       currentActiveStep = 'parsing';
187 |     }
188 | 
189 |     // If active step changed, update the start time
190 |     if (currentActiveStep !== activeStep) {
191 |       setActiveStep(currentActiveStep);
192 | 
193 |       if (currentActiveStep) {
194 |         setActiveStepStartTime(Date.now());
195 |         setActiveStepElapsedTime(0);
196 |       } else {
197 |         setActiveStepStartTime(null);
198 |       }
199 |     }
200 |   }, [isProcessing, processingDurations, activeStep]);
201 | 
202 |   /**
203 |    * Adds files to the state
204 |    */
205 |   const addFiles = (newFiles: File[]) => {
206 |     setFiles(prev => [...prev, ...newFiles]);
207 |     setError(null);
208 |   };
209 | 
210 |   /**
211 |    * Removes a file from the state
212 |    */
213 |   const removeFile = (index: number) => {
214 |     setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
215 |   };
216 | 
217 |   /**
218 |    * Processes the uploaded files
219 |    */
220 |   const handleProcessFiles = async () => {
221 |     if (files.length === 0) return;
222 | 
223 |     setIsProcessing(true);
224 |     setError(null);
225 |     setShowDuration(false);
226 |     setProcessingDurations({ total: 0 });
227 | 
228 |     const processingStartTime = Date.now();
229 | 
230 |     setStartTime(processingStartTime);
231 | 
232 |     try {
233 |       // Read file contents
234 |       const fileContents = await Promise.all(
235 |         files.map(async file => {
236 |           try {
237 |             // Handle file size limits on mobile
238 |             if (isMobile && file.size > 10 * 1024 * 1024) {
239 |               throw new Error(`File ${file.name} is too large for mobile processing.`);
240 |             }
241 | 
242 |             let content;
243 | 
244 |             if (file.type === 'text/csv') {
245 |               content = await readFileAsText(file);
246 |             } else {
247 |               const arrayBuffer = await readFileAsArrayBuffer(file, isMobile);
248 | 
249 |               content = arrayBufferToBase64(arrayBuffer);
250 |             }
251 | 
252 |             return {
253 |               name: file.name,
254 |               content,
255 |               contentType: file.type,
256 |             };
257 |           } catch (error) {
258 |             console.error(`Error reading file ${file.name}:`, error);
259 |             throw new Error(`Failed to read file ${file.name}: ${(error as Error).message}`);
260 |           }
261 |         })
262 |       );
263 | 
264 |       // Process files with API directly
265 |       const response = await fetch('/api/process-bank-statement', {
266 |         method: 'POST',
267 |         headers: {
268 |           'Content-Type': 'application/json',
269 |         },
270 |         body: JSON.stringify({
271 |           fileContents,
272 |           existingTransactions: processedTransactions,
273 |         }),
274 |       });
275 | 
276 |       if (!response.ok) {
277 |         const errorData = await response.json();
278 | 
279 |         throw new Error(errorData.error || `HTTP error ${response.status}`);
280 |       }
281 | 
282 |       if (!response.body) {
283 |         throw new Error('Response body is null');
284 |       }
285 | 
286 |       setShowDuration(true);
287 | 
288 |       // Handle the streaming response
289 |       const result = await handleStreamingResponse(
290 |         response,
291 |         // Provide a callback for timing updates
292 |         timingMetrics => {
293 |           setProcessingDurations(prev => ({
294 |             ...prev,
295 |             ...timingMetrics,
296 |           }));
297 |         }
298 |       );
299 | 
300 |       // Update state with results
301 |       setProcessedTransactions(prevTransactions => {
302 |         const existingTransactionIds = new Set(prevTransactions.map(t => t.id));
303 |         const uniqueNewTransactions = result.transactions.filter(
304 |           t => !existingTransactionIds.has(t.id)
305 |         );
306 | 
307 |         return [...prevTransactions, ...uniqueNewTransactions];
308 |       });
309 | 
310 |       setSkippedDuplicates(prev => prev + result.duplicatesSkipped);
311 | 
312 |       // Pass the results to the parent component
313 |       onTransactionsProcessed(result.transactions, result.errors, result.warnings);
314 | 
315 |       // Calculate total time
316 |       const totalDuration = Date.now() - processingStartTime;
317 | 
318 |       setProcessingDurations(prev => ({
319 |         ...prev,
320 |         total: totalDuration,
321 |       }));
322 | 
323 |       // Clear the files after successful processing
324 |       setFiles([]);
325 |     } catch (error) {
326 |       console.error('Error processing files:', error);
327 |       setError(`Failed to process files: ${(error as Error).message}`);
328 | 
329 |       // Calculate the processing duration even for errors
330 |       const endTime = Date.now();
331 |       const duration = endTime - processingStartTime;
332 | 
333 |       setShowDuration(true);
334 |       setProcessingDurations(prev => ({
335 |         ...prev,
336 |         total: duration,
337 |       }));
338 |     } finally {
339 |       setIsProcessing(false);
340 |     }
341 |   };
342 | 
343 |   return {
344 |     // State
345 |     files,
346 |     isProcessing,
347 |     error,
348 |     isMobile,
349 |     skippedDuplicates,
350 |     elapsedTime,
351 |     startTime,
352 |     showDuration,
353 |     processingDurations,
354 |     activeStep,
355 |     activeStepElapsedTime,
356 | 
357 |     // Actions
358 |     addFiles,
359 |     removeFile,
360 |     handleProcessFiles,
361 |   };
362 | }
```

src/types/transaction/enums/transaction-category.ts
```
1 | // Define transaction categories
2 | export enum TransactionCategory {
3 |   // Income categories
4 |   SALARY = 'SALARY',
5 |   INVESTMENT_INCOME = 'INVESTMENT_INCOME', // Keep this as income from investments, not the investments themselves
6 |   REIMBURSEMENT = 'REIMBURSEMENT',
7 |   GIFT = 'GIFT',
8 | 
9 |   // Expense categories
10 |   GROCERIES = 'GROCERIES',
11 |   DINING = 'DINING',
12 |   ENTERTAINMENT = 'ENTERTAINMENT',
13 |   TRANSPORTATION = 'TRANSPORTATION',
14 |   UTILITIES = 'UTILITIES',
15 |   HOUSING = 'HOUSING',
16 |   HEALTH = 'HEALTH',
17 |   EDUCATION = 'EDUCATION',
18 |   SHOPPING = 'SHOPPING',
19 |   TRAVEL = 'TRAVEL',
20 |   PERSONAL_CARE = 'PERSONAL_CARE',
21 |   SUBSCRIPTIONS = 'SUBSCRIPTIONS',
22 | 
23 |   // Unknown/uncategorized
24 |   UNCATEGORIZED = 'UNCATEGORIZED',
25 | }
```

src/types/transaction/enums/transaction-type.ts
```
1 | // Define transaction types
2 | export enum TransactionType {
3 |   INCOME = 'INCOME',
4 |   EXPENSE = 'EXPENSE',
5 |   TRANSFER = 'TRANSFER',
6 | }
```
