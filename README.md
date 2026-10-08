# MSK Embroidery Website

Next.js website for MSK Embroidery Machines with MySQL database integration.

## Run locally

1. Extract the project.
2. Open Command Prompt in the folder containing `package.json`.
3. Install packages:

```bash
npm install
```

4. Create a MySQL database named `msk_embroidery`.
5. Copy `.env.example` to `.env.local` and add your MySQL username/password.
6. Generate Prisma Client and create the database tables:

```bash
npx prisma generate
npx prisma db push
```

7. Start the website:

```bash
npm run dev
```

8. Open http://localhost:3000

## Database features

- Product information is stored in MySQL.
- Product changes from `/admin` are saved to MySQL.
- Contact/enquiry form submissions are saved to MySQL.
- Database credentials stay in `.env.local` and must never be pushed to GitHub.

## GitHub safety

`.env.local`, `node_modules`, and `.next` are excluded by `.gitignore`.
