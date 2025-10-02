const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log('Starting database seeding...');

    // Create sample users
    const hashedPassword = await bcrypt.hash('Pass@123', 10);

    const superAdminUser = await prisma.user.upsert({
        where: { email: 'superadmin@example.com' },
        update: {},
        create: {
            firstName: 'Super',
            lastName: 'Admin',
            email: 'superadmin@example.com',
            phone: '1234567787',
            password: hashedPassword,
            role: 'ADMIN',
            status: 'ACTIVE'
        }
    });

    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@example.com',
            phone: '1234567890',
            password: hashedPassword,
            role: 'ADMIN',
            status: 'ACTIVE'
        }
    });

    const studentUser = await prisma.user.upsert({
        where: { email: 'student@example.com' },
        update: {},
        create: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'student@example.com',
            phone: '1234567891',
            password: hashedPassword,
            role: 'STUDENT',
            status: 'ACTIVE'
        }
    });

    const students = Array.from({ length: 20 }).map((_, i) => ({
        firstName: `Student${i + 1}`,
        lastName: `User${i + 1}`,
        email: `student${i + 1}@example.com`,
        phone: `12345678${(i + 10).toString().padStart(2, '0')}`, // unique phone
        password: hashedPassword,
        role: 'STUDENT',
        status: 'ACTIVE'
    }));

    for (const student of students) {
        await prisma.user.upsert({
            where: { email: student.email },
            update: {},
            create: student
        });
    }


    // Create sample organisation
    const organisation = await prisma.organisation.upsert({
        where: { email: 'org@example.com' },
        update: {},
        create: {
            name: 'Sample Organisation',
            organisationName: 'Sample Org Ltd',
            email: 'org@example.com',
            mobile: '1234567892',
            password: hashedPassword,
            isActive: true
        }
    });

    // Create sample course
    const course = await prisma.course.upsert({
        where: { id: 1 },
        update: {},
        create: {
            title: 'Introduction to Programming',
            subtitle: 'Learn the basics of programming',
            description: 'A comprehensive course covering programming fundamentals',
            language: 'English',
            level: 'BEGINNER',
            category: 'Programming',
            status: 'ACTIVE'
        }
    });

    // Create sample section
    const section = await prisma.section.create({
        data: {
            title: 'Getting Started',
            courseId: course.id
        }
    });

    // Create sample lecture
    await prisma.lecture.create({
        data: {
            title: 'Introduction to Variables',
            contentUrl: 'https://example.com/video1',
            sectionId: section.id
        }
    });

    // Create sample package
    await prisma.package.upsert({
        where: { id: 1 },
        update: {},
        create: {
            packageName: 'Basic Package',
            packagePrice: 99.99,
            description: 'Basic package with limited features',
            features: ['5 courses', 'Basic support'],
            maxCourses: 5,
            maxUsers: 10,
            status: true
        }
    });

    // Create sample FAQ
    await prisma.fAQ.upsert({
        where: { id: 1 },
        update: {},
        create: {
            question: 'How do I get started?',
            answer: 'You can start by creating an account and browsing our courses.',
            isActive: true
        }
    });

    console.log('Database seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
