ALTER TABLE "Temporary_Lock" ADD COLUMN "showtime_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "Temporary_Lock" ADD CONSTRAINT "Temporary_Lock_showtime_id_Showtime_id_fk" FOREIGN KEY ("showtime_id") REFERENCES "public"."Showtime"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
