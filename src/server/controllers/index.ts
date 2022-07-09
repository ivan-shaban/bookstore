import { BookSeriesController } from './BookSeriesController'
import { BooksController } from './BooksController'
import { ContactsController } from './ContactsController'
import { FeedbacksController } from './FeedbacksController'
import { NewsController } from './NewsController'
import { UsersController } from './UsersController'

export const feedbacksController = new FeedbacksController()
export const usersController = new UsersController()
export const newsController = new NewsController()
export const bookSeriesController = new BookSeriesController()
export const booksController = new BooksController()
export const contactsController = new ContactsController()
