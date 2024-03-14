import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import { boolean, integer, pgEnum, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const rolesEnum = pgEnum('roles', ['ADMIN', 'USER']);
export const genderEnum = pgEnum('employeee', ['LAKI', 'PEREMPUAN', 'BANCI'])
export const disputeStatusEnum = pgEnum('dispute_status', ['APPROVE', 'PENDING', 'DISAPPROVE']);
export const requestTypeEnum = pgEnum('request_type', ['SICK_LEAVE', 'ABSENCE']);
export const requestStatusEnum = pgEnum('request_status', ['APPROVE', 'PENDING', 'DISAPPROVE']);


export const role = pgTable('role', {
  id: text('id').primaryKey(),
  name: text('name'),
});

export const employee = pgTable('employee', {
  id: text('id').primaryKey(),
  name: text('name'),
  jobTitle: text('job_title'),
  email: text('email'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  gender: genderEnum('gender'),
  phone: text('phone'),
  roleId: text('role_id').references(() => role.id)
});

export const dispute = pgTable('dispute', {
  id: text('id').primaryKey(),
  title: text('title'),
  desc: text('desc'),
  employeeId: text('employee_id').references(() => employee.id),
  disputeStatus: disputeStatusEnum('dispute_status').default('PENDING'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

// export const request = pgTable('request', {
//   id: text('id').primaryKey(),
//   employeeId: text('employee_id').references('employee'),
//   requestStatus: requestStatusEnum('request_status').default('PENDING'),
//   requestType: requestTypeEnum('request_type'),
//   desc: text('desc').nullable(),
//   requestDate: timestamp('request_date').nullable(),
//   attachment: text('attachment').nullable(),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   deletedAt: timestamp('deleted_at').nullable(),
// });

// export const attendance = pgTable('attendance', {
//   id: text('id').primaryKey(),
//   employeeId: text('employee_id').references('employee'),
//   checkin: timestamp('checkin').nullable().defaultNow(),
//   checkout: timestamp('checkout').nullable(),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   deletedAt: timestamp('deleted_at').nullable(),
//   isLate: boolean('is_late').default(false),
// });
