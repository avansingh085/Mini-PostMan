A lightweight Postman-like application with:
- **Frontend caching** for faster performance  
- **Server-side pagination** to handle large datasets  
- **Lazy loading** for optimized request history display  
- **Backend storage** using **MikroORM + SQLite**  

This project has two parts:
1. **Backend** – Node.js + Express + MikroORM  
2. **Frontend** – React + Vite  

---

```bash
git clone [https://github.com/avansingh085/Mini-PostMan.git](https://github.com/avansingh085/Mini-PostMan.git)

##Setup Backend
.env file

FRONTEND_URL=http://localhost:5173
PORT=5000

cd backend
npm install

## Run MikroORM migration:

npx mikro-orm migration:create
npx mikro-orm migration:up

run server
node server.js

## setup frontend

.env

VITE_BACKEND_URL=http://localhost:5000/api

cd client
npm install
npm run dev

