import prisma from '../../lib/prisma'

export class ContactsController {
    public getEntity() {
        return prisma.authorContacts.findFirst()
    }
}
