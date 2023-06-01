GRANT ALL PRIVILEGES ON DATABASE mldb TO mladmin;

-- ==================== NETWORK SCHEME ====================
CREATE SCHEMA IF NOT EXISTS network;
ALTER SCHEMA network OWNER TO mladmin;

-- users
CREATE TABLE IF NOT EXISTS network.users (
	user_uid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
	role_type TEXT CHECK (role_type IN ('superadmin', 'admin', 'user')) DEFAULT'user',
	username TEXT NOT NULL,
	password TEXT NOT NULL,
	created TIMESTAMP DEFAULT NOW(),
	deleted TIMESTAMP DEFAULT NULL,
	preferences JSONB DEFAULT NULL
);
ALTER TABLE network.users OWNER TO mladmin;
ALTER TABLE rosemary.customers ADD CONSTRAINT unique_email UNIQUE (email);

-- ==================== ROSEMARY SCHEME ====================
CREATE SCHEMA IF NOT EXISTS rosemary;
ALTER SCHEMA rosemary OWNER TO mladmin;

-- paintings
CREATE TABLE IF NOT EXISTS rosemary.paintings (
	painting_uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
	painting_title JSONB DEFAULT '{"en":"", "cs":""}',
	painting_description JSONB DEFAULT '{"en":"", "cs":""}',
	data JSONB DEFAULT NULL,
	created TIMESTAMP DEFAULT NOW(),
	deleted TIMESTAMP DEFAULT NULL,
	price INTEGER DEFAULT 0
);
ALTER TABLE rosemary.paintings OWNER TO mladmin;

-- posts
CREATE TABLE IF NOT EXISTS rosemary.posts (
	post_uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
	post_title JSONB DEFAULT '{"en":"", "cs":""}',
	post_description JSONB DEFAULT '{"en":"", "cs":""}',
	data JSONB DEFAULT NULL,
	created TIMESTAMP DEFAULT NOW(),
	deleted TIMESTAMP DEFAULT NULL
);
ALTER TABLE TABLE rosemary.posts OWNER TO mladmin;

-- tattoo
CREATE TABLE IF NOT EXISTS rosemary.tattoo (
	tattoo_uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
	tattoo_title JSONB DEFAULT '{"en":"", "cs":""}',
	tattoo_description JSONB DEFAULT '{"en":"", "cs":""}',
	data JSONB DEFAULT NULL,
	created TIMESTAMP DEFAULT NOW(),
	deleted TIMESTAMP DEFAULT NULL,
	price INTEGER DEFAULT 0
);
ALTER TABLE rosemary.tattoo OWNER TO mladmin;

-- photos
CREATE TABLE IF NOT EXISTS rosemary.photos (
	photos_uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
	photos_title JSONB DEFAULT '{"en":"", "cs":""}',
	photos_description JSONB DEFAULT '{"en":"", "cs":""}',
	data JSONB DEFAULT NULL,
	created TIMESTAMP DEFAULT NOW(),
	deleted TIMESTAMP DEFAULT NULL,
	price INTEGER DEFAULT 0
);
ALTER TABLE rosemary.photos OWNER TO mladmin;

-- orders
CREATE TABLE IF NOT EXISTS rosemary.orders (
	order_uuid UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
	created TIMESTAMP DEFAULT NOW(),
	updated TIMESTAMP DEFAULT NOW(),
	order_status TEXT CHECK (order_status IN ('new', 'confirmed', 'sent', 'closed', 'cancel')) DEFAULT 'new',
	customer_uid UUID DEFAULT NULL,
	customer_name TEXT DEFAULT NULL,
	customer_email TEXT DEFAULT NULL,
	customer_phone TEXT DEFAULT NULL,
	customer_address TEXT DEFAULT NULL,
	order_price INTEGER DEFAULT 0
);
ALTER TABLE rosemary.orders OWNER TO mladmin;
CREATE INDEX idx_rosemary_orders_customer ON rosemary.orders(order_uuid, customer_name);

-- users
CREATE TABLE IF NOT EXISTS rosemary.customers (
	customer_uid UUID NOT NULL ,
	name VARCHAR(255) DEFAULT NULL,
	address VARCHAR(255) DEFAULT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
	phone VARCHAR(255) DEFAULT NULL,
	password VARCHAR(255) NOT NULL,
	created TIMESTAMP WITH TIME ZONE NOT NULL,
	deleted TIMESTAMP WITH TIME ZONE DEFAULT NULL,
	status VARCHAR(255) NOT NULL DEFAULT 'regular',
	spendings INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY (customer_uid)
);
ALTER TABLE rosemary.customers OWNER TO mladmin;
