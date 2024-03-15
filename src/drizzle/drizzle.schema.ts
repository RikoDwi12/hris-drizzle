import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import { boolean, integer, pgEnum, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const rolesEnum = pgEnum('roles', ['ADMIN', 'USER']);
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
  phone: text('phone'),
  roleId: text('role_id').references(() => role.id)
});

export const dispute = pgTable('dispute', {
  id: text('id').primaryKey(),
  title: text('title'),
  desc: text('desc'),
  disputeStatus: disputeStatusEnum('dispute_status').default('PENDING'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
  employeeId: text('employee_id').references(() => employee.id),
});

// export const request = pgTable('request', {
//   id: text('id').primaryKey(),
//   employeeId: text('employee_id').references(() => employee.id),
//   requestStatus: requestStatusEnum('request_status').default('PENDING'),
//   requestType: requestTypeEnum('request_type'),
//   desc: text('desc'),
//   requestDate: timestamp('request_date'),
//   attachment: text('attachment'),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   deletedAt: timestamp('deleted_at'),
// });

// export const attendance = pgTable('attendance', {
//   id: text('id').primaryKey(),
//   employeeId: text('employee_id').references(() => employee.id),
//   checkin: timestamp('checkin').defaultNow(),
//   checkout: timestamp('checkout'),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   deletedAt: timestamp('deleted_at'),
//   isLate: boolean('is_late').default(false),
// });

export const roleEmployee = relations(employee, ({ one }) => ({
  role: one(role, {
    fields: [employee.roleId],
    references: [role.id], 
  }),
}));

// export const disputeEmployeeRelation = relations(dispute, ({ manyToOne }) => ({
//   employee: manyToOne(employee, {
//     myColumn: 'employeeId', // Kolom di tabel dispute yang merujuk ke employee
//     foreignColumn: 'id', // Kolom di tabel employee yang dijadikan referensi
//   }),
// }));

// export const disputeEmployeeRelation = relations(employee, ({ one }) => ({
//   dispute: one(dispute, {
//     fields: [employee.roleId],
//     references: [dispute.id], 
//   }),
// }));

export const disputeEmployeeRelation = relations(employee, ({ one }) => ({
  dispute: one(employee, {
    fields: [employee.id], 
    references: [employee.id],
  }),
}));