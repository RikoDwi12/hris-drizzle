DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('LAKI', 'PEREMPUAN', 'BANCI');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "employee" ADD COLUMN "gender" "gender" DEFAULT 'BANCI';