CREATE TYPE "public"."reservation_status_type" AS ENUM('CONFIRMED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."seat_status_type" AS ENUM('NORMAL', 'VIP');--> statement-breakpoint
CREATE TYPE "public"."user_role_type" AS ENUM('USER', 'ADMIN');--> statement-breakpoint
CREATE TABLE "Genre" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "Genre_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "Movie" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"duration" integer NOT NULL,
	"poster" varchar(255) NOT NULL,
	"description" text,
	"genre_id" uuid NOT NULL,
	"release_date" date NOT NULL,
	"trailer_url" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Reservation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"status" "reservation_status_type" DEFAULT 'CONFIRMED',
	"total_price" numeric(10, 2) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Reservation_Seat" (
	"reservation_id" uuid NOT NULL,
	"seat_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "Reservation_Seat_reservation_id_seat_id_pk" PRIMARY KEY("reservation_id","seat_id")
);
--> statement-breakpoint
CREATE TABLE "Seat" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"showtime_id" uuid NOT NULL,
	"seat_name" varchar(255) NOT NULL,
	"seat_type" "seat_status_type" DEFAULT 'NORMAL',
	"price" numeric(10, 2) NOT NULL,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Showtime" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"movie_id" uuid,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL,
	"capacity" integer NOT NULL,
	"location" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Temporary_Lock" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"seat_id" uuid NOT NULL,
	"locked_at" timestamp DEFAULT now(),
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "user_role_type" DEFAULT 'USER',
	"refresh_token_hash" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_genre_id_Genre_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."Genre"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Reservation_Seat" ADD CONSTRAINT "Reservation_Seat_reservation_id_Reservation_id_fk" FOREIGN KEY ("reservation_id") REFERENCES "public"."Reservation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Reservation_Seat" ADD CONSTRAINT "Reservation_Seat_seat_id_Seat_id_fk" FOREIGN KEY ("seat_id") REFERENCES "public"."Seat"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_showtime_id_Showtime_id_fk" FOREIGN KEY ("showtime_id") REFERENCES "public"."Showtime"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Showtime" ADD CONSTRAINT "Showtime_movie_id_Movie_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."Movie"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Temporary_Lock" ADD CONSTRAINT "Temporary_Lock_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Temporary_Lock" ADD CONSTRAINT "Temporary_Lock_seat_id_Seat_id_fk" FOREIGN KEY ("seat_id") REFERENCES "public"."Seat"("id") ON DELETE no action ON UPDATE no action;