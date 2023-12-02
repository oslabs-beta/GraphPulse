SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';
SET default_table_access_method = heap;

-- DROP TABLE public.users;
CREATE TABLE public.users (
	"_id" SERIAL PRIMARY KEY,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL
);

-- DROP TABLE public.queryLogs;
CREATE TABLE public.queryLogs (
	"_id" SERIAL PRIMARY KEY,
	"query_name" varchar NOT NULL,
	"timestamp" TIMESTAMP,
	"depth" integer NOT NULL,
	"latency" integer NOT NULL,
	"user_id" int,
	FOREIGN KEY (user_id) REFERENCES public.users(_id)
);