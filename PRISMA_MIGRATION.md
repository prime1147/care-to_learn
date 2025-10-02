# Prisma Migration Guide

This project has been migrated from Sequelize to Prisma ORM. Follow these steps to complete the migration:

## Prerequisites

1. Make sure you have Node.js installed
2. Ensure you have a PostgreSQL database running
3. Update your `.env` file with the correct `DATABASE_URL`

## Migration Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Update Environment Variables

Update your `.env` file with the correct database URL:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
```

### 3. Generate Prisma Client

```bash
npm run db:generate
```

### 4. Push Schema to Database

```bash
npm run db:push
```

### 5. Seed Sample Data (Optional)

```bash
npm run db:seed
```

### 6. Start the Application

```bash
npm run dev
```

## Key Changes Made

### 1. Database Schema
- Converted all Sequelize models to Prisma schema
- Updated field types and relationships
- Added proper enums for status fields

### 2. Models
- Replaced `models/index.js` with Prisma client
- Removed individual model files (now handled by Prisma)

### 3. Repositories
- Updated `Common.repository.js` to use Prisma client
- All repository methods now use Prisma syntax

### 4. Services
- Services remain mostly unchanged as they use the repository pattern
- All database operations now go through Prisma

### 5. Controllers
- Fixed field name inconsistencies (e.g., `FirstName` → `firstName`)
- Updated authentication controller to work with new schema

## Available Scripts

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and apply migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

## Database Schema

The new Prisma schema includes the following models:

- **User** - User accounts with roles (ADMIN, STUDENT, ORGANISATION)
- **Organisation** - Organization accounts
- **Course** - Course information
- **Section** - Course sections
- **Lecture** - Individual lectures within sections
- **Review** - Course reviews and ratings
- **CourseUser** - User-course relationships
- **Team** - Team management
- **TeamUser** - Team-user relationships
- **Package** - Subscription packages
- **DemoSession** - Demo session bookings
- **ContactUs** - Contact form submissions
- **FAQ** - Frequently asked questions
- **CourseTopic** - Course topics
- **Project** - Project management

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify your `DATABASE_URL` in `.env`
   - Ensure PostgreSQL is running
   - Check database credentials

2. **Schema Sync Issues**
   - Run `npm run db:push` to sync schema
   - Check for any validation errors in the schema

3. **Migration Errors**
   - Ensure all required fields are provided
   - Check for data type mismatches
   - Verify foreign key relationships

### Getting Help

If you encounter issues:

1. Check the Prisma documentation: https://www.prisma.io/docs/
2. Run `npx prisma studio` to inspect your database
3. Check the console for detailed error messages

## Next Steps

After successful migration:

1. Test all API endpoints
2. Update any custom queries to use Prisma syntax
3. Consider adding Prisma middleware for logging/validation
4. Set up proper error handling for Prisma errors
5. Add database indexes for better performance

## Rollback (if needed)

If you need to rollback to Sequelize:

1. Restore the original `models/` directory
2. Restore `repositories/Common.repository.js`
3. Reinstall Sequelize: `npm install sequelize sequelize-cli`
4. Restore original `package.json` scripts
5. Run your original migrations

---

**Note**: This migration maintains the same API structure, so your frontend applications should continue to work without changes.
