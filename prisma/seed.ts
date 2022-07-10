import prisma from '../src/lib/prisma'
import faker from '@faker-js/faker'

async function createContacts() {
    await prisma.authorContacts.create({
        data: {
            catchphrase:
                'Если Хаос стучится в твой дом - открой, может он расставит всё по местам.',
            facebook: 'facebook',
            instagram: 'instagram',
            telegram: 'telegram',
            twitter: 'twitter',
            vkontakte: 'vkontakte',
        },
    })
}

async function createBookSeries() {
    await Promise.all(
        faker.datatype.array(faker.datatype.number({ min: 3, max: 7 })).map(() =>
            prisma.bookSeries.create({
                data: {
                    title: faker.hacker.phrase(),
                    rating: faker.datatype.number({ min: 4, max: 5, precision: 1 }),
                    books: {
                        createMany: {
                            data: faker.datatype
                                .array(faker.datatype.number({ min: 1, max: 7 }))
                                .map(() => ({
                                    title: faker.hacker.phrase(),
                                    rating: faker.datatype.number({ min: 4, max: 5, precision: 1 }),
                                    previewImage: faker.image.image(300, 400, true),
                                    shortDescription: faker.lorem.lines(2),
                                    longDescription: faker.lorem.lines(10),
                                })),
                        },
                    },
                },
            }),
        ),
    )
}

async function createNews() {
    await prisma.newsEntity.createMany({
        data: faker.datatype.array(faker.datatype.number({ min: 3, max: 7 })).map(() => ({
            title: faker.random.words(faker.datatype.number({ min: 7, max: 12 })),
            shortTitle: faker.random.words(faker.datatype.number({ min: 5, max: 10 })),
            previewImage: faker.image.cats(300, 400),
            content: faker.random.words(faker.datatype.number({ min: 70, max: 120 })),
        })),
    })
}

async function main() {
    // cleanup db
    await prisma.user.deleteMany()
    await prisma.authorContacts.deleteMany()
    await prisma.bookSeries.deleteMany()
    await prisma.book.deleteMany()
    await prisma.feedbackEntity.deleteMany()
    await prisma.newsEntity.deleteMany()

    await createContacts()
    await createBookSeries()
    await createNews()
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
