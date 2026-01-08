# HR Admin Dashboard (Sample)

This repository contains the front-end implementation of a B2B HR administration panel. It demonstrates my approach to building scalable, type-safe web applications using modern React ecosystems.

## 🛠 Tech Stack

- Framework: Next.js 14
- Styling: Tailwind + SCSS modules
- UI primitives: Shadcn-style components + TanStack Table
- Auth: NextAuth
- HTTP client: fetch wrapper

## 📂 Project Context & Scope

This project was originally developed as part of a startup initiative. I have sanitized the code for this public repository to demonstrate my coding standards and architectural choices.

**Key focuses of this codebase:**

- **Modular Component Structure:** Reusable UI elements to maintain consistency.
- **TypeScript Integration:** Ensuring type safety for props and API responses.
- **Responsive Design:** Layouts adapted for various screen sizes.
- **Data Handling:** Examples of how data is fetched and rendered in table/dashboard views.

_Note: Some API endpoints or proprietary logic have been mocked or removed for privacy/security reasons._

**Folder layout (top-level)**

```text
.
├── app/                           # Next.js App Router & Layouts
│   ├── (auth)/                    # Public authentication routes
│   │   └── login/
│   └── (root)/                    # Protected application routes
│       ├── (organization)/        # Admin views (Analysis, Contacts, Tests)
│       └── (employee)/            # Employee-specific dashboard views
├── components/                    # Reusable UI & Feature Components
│   ├── Aside/                     # Sidebar navigation & Menu items
│   ├── Charts/                    # Data visualization components
│   ├── Form/                      # Form logic (e.g., LoginForm)
│   ├── Modal/                     # Excel & Test upload modals
│   ├── Nav/                       # Top navigation bar
│   └── Tables/                    # DataTables & Column definitions
├── constants/                     # Static configuration (Menu links, enums)
├── interfaces/                    # TypeScript type definitions
├── lib/                           # External library configurations
├── public/                        # Static assets (images, icons)
├── services/                      # API Surface (Domain-separated)
│   ├── employee.ts                # Employee endpoints
│   ├── managements.ts             # Management endpoints
│   └── manager.ts                 # Exam/Test management endpoints
├── styles/                        # Global styles & SCSS modules
│   ├── globals.scss
│   └── resets.scss
└── utils/                         # Helper functions
    └── httpservice.tsx            # Centralized HTTP wrapper

```

## 🚀 Quick start

- Install deps: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`

Environment template: [.env.example](.env.example)

## 👤 Author

**Khashayar Hajnabi**

- [LinkedIn](https://www.linkedin.com/in/khashayar-hajnabi/)
