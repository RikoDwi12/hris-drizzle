DO $$ BEGIN
 CREATE TYPE "dispute_status" AS ENUM('APPROVE', 'PENDING', 'DISAPPROVE');
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
CREATE TABLE IF NOT EXISTS "role" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
DROP TABLE "item";--> statement-breakpoint
DROP TABLE "user";--> statement-breakpoint
ALTER TABLE "inventory" RENAME TO "employee";--> statement-breakpoint
ALTER TABLE "employee" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "employee" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ADD COLUMN "job_title" text;--> statement-breakpoint
ALTER TABLE "employee" ADD COLUMN "email" text;--> statement-breakpoint
ALTER TABLE "employee" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "employee" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "employee" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "employee" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "employee" ADD COLUMN "role_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "employee" ADD CONSTRAINT "employee_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "employee" DROP COLUMN IF EXISTS "dayNum";--> statement-breakpoint
ALTER TABLE "employee" DROP COLUMN IF EXISTS "time";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dispute" ADD CONSTRAINT "dispute_employee_id_employee_id_fk" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
