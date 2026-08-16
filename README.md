# D Anmol Enterprises - Booking & Transport Portal

A complete, production-ready logistics and commute management portal for **D Anmol Enterprises**. Customers can book passenger Cabs (local/outstation) or request Cargo Tempos (Tata Ace, Mahindra Jeeto, Pickup, Trucks) with real-time fare calculation. Operators can manage booking workflows from a secure, password-protected administrator dashboard.

## Tech Stack
- **Framework**: Next.js 16/15 (App Router, TypeScript, ESLint)
- **Styling**: Tailwind CSS v4 (Custom color variables & keyframe animations)
- **Database ORM**: Prisma 6 ORM
- **Database Engine**: PostgreSQL

---

## 1. Setup & Environment Variables

Copy the environment sample and configure your local credentials:
```bash
cp .env.example .env
```

Open `.env` and fill out the fields:
- `DATABASE_URL`: Your PostgreSQL connection string. (E.g. `postgresql://postgres:password@localhost:5432/danmol_db?schema=public`)
- `ADMIN_SECRET` / `NEXTAUTH_SECRET`: Secret hash passphrases used to sign HTTP-only cookie tokens.
- `GOOGLE_MAPS_API_KEY`: *(Optional)* API key to enable Places Autocomplete on pickup/drop fields.
- `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`: *(Optional)* Merchant key pairs for payment processing.

---

## 2. Database Migration & Seeding

Ensure your PostgreSQL server is active, then execute:

```bash
# 1. Run migrations to create tables
npx prisma db push

# 2. Generate client static definitions
npx prisma generate

# 3. Seed default admin credentials
npx prisma db seed
```

This will automatically populate your database with the initial operator credentials:
- **Email**: `admin@danmol.com`
- **Password**: `Admin@2026`

---

## 3. Running Locally

Install dependencies and start the hot-reloading development server:

```bash
# Install NPM packages
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the public site.
Go to [http://localhost:3000/admin](http://localhost:3000/admin) to log in as an administrator.

---

## 4. Admin Dashboard Credentials

Log in using the seeded database credentials. Once logged in, you can:
- View all bookings in a responsive table.
- Search bookings by Booking ID, Customer Name, or Phone.
- Filter bookings by service type (Cab/Tempo), booking status, or target booking date.
- Open detail modals to view goods descriptions, passenger pax, and estimated weight.
- Modify the booking status (Pending, Confirmed, Assigned, In Progress, Completed, Cancelled).
- Permanently cancel or delete entries from the database records.

---

## 5. Deployment Guidelines

This Next.js app can be deployed directly to Vercel, AWS Amplify, or a custom VPS:

### Vercel Deployment
1. Import this repository into Vercel.
2. Add your `.env` variables in Vercel Project Settings under Environment Variables.
3. Vercel automatically runs `npm run build` which compiles the routes and generates the client.
4. Set up an external PostgreSQL instance (e.g., Supabase, Neon.tech, AWS RDS) and link its URL.

### Traditional Server (VPS / Docker)
If hosting on a VPS:
```bash
# Build the application bundle
npm run build

# Start production server
npm run start
```

---

## 6. Development Customizations & API Keys

### Google Maps Autocomplete
Pickup and Drop inputs use `components/LocationInput.tsx`. To connect autocomplete:
1. Load the Google Maps script inside `app/layout.tsx`.
2. Uncomment the `useEffect` block inside `components/LocationInput.tsx` to instantiate `google.maps.places.Autocomplete`.

### Fare Calibration
Standard rates and base pricing for cabs and tempos are defined in `lib/fare-calculator.ts`. To change base margins or per-km rates, edit the configuration structures:
- `CAB_FARES`
- `TEMPO_FARES`
