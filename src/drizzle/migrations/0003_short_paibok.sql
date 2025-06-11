ALTER TABLE "Reservation" ADD COLUMN "showtime_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_showtime_id_Showtime_id_fk" FOREIGN KEY ("showtime_id") REFERENCES "public"."Showtime"("id") ON DELETE no action ON UPDATE no action;
