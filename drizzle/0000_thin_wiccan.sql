DO $$ BEGIN
 CREATE TYPE "dispute_status" AS ENUM('APPROVE', 'PENDING', 'DISAPPROVE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "employeee" AS ENUM('LAKI', 'PEREMPUAN', 'BANCI');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "request_status" AS ENUM('APPROVE', 'PENDING', 'DISAPPROVE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "request_type" AS ENUM('SICK_LEAVE', 'ABSENCE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "roles" AS ENUM('ADMIN', 'USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dispute" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"desc" text,
	"employee_id" text,
	"dispute_status" "dispute_status" DEFAULT 'PENDING',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "employee" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"job_title" text,
	"email" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"gender" "employeee",
	"phone" text,
	"role_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dispute" ADD CONSTRAINT "dispute_employee_id_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee" ADD CONSTRAINT "employee_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
