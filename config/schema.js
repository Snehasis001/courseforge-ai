import { boolean, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'

export const CourseList = pgTable('courseList', {
  id: serial('id').primaryKey(),
  courseId: varchar('courseId').notNull().unique(),
  name: varchar('name').notNull(),
  category: varchar('category'),
  level: varchar('level'),
  includeVideo: varchar('includeVideo').default('Yes'),
  createdBy: varchar('createdBy').notNull(),
  courseOutput: text('courseOutput'),
  publish: boolean('publish').default(false),
  duration: varchar('duration'),
})
