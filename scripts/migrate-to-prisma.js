const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function migrateToPrisma() {
    console.log('Starting migration to Prisma...');

    try {
        // Generate Prisma client
        console.log('Generating Prisma client...');
        const { execSync } = require('child_process');
        execSync('npx prisma generate', { stdio: 'inherit' });

        // Push schema to database
        console.log('Pushing schema to database...');
        execSync('npx prisma db push', { stdio: 'inherit' });

        console.log('Migration completed successfully!');
        console.log('Next steps:');
        console.log('1. Update your DATABASE_URL in .env file');
        console.log('2. Run: npm run db:seed (to seed sample data)');
        console.log('3. Run: npm run dev (to start the server)');

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

migrateToPrisma();
