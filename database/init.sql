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

CREATE TABLE IF NOT EXISTS rosemary.customers (
	customer_uid UUID NOT NULL,
	name TEXT DEFAULT NULL,
	address TEXT DEFAULT NULL,
	email TEXT NOT NULL UNIQUE,
	phone TEXT DEFAULT NULL,
	password TEXT NOT NULL,
	created TIMESTAMP WITH TIME ZONE NOT NULL,
	deleted TIMESTAMP WITH TIME ZONE DEFAULT NULL,
	status TEXT NOT NULL DEFAULT 'regular',
	spendings INTEGER NOT NULL DEFAULT 0,
	PRIMARY KEY (customer_uid)
);
ALTER TABLE rosemary.customers OWNER TO mladmin;

CREATE TABLE IF NOT EXISTS rosemary.attachments (
	attachment_uuid UUID NOT NULL,
	created TIMESTAMP WITH TIME ZONE NOT NULL,
	deleted TIMESTAMP WITH TIME ZONE DEFAULT NULL,
	name TEXT NOT NULL,
	temp_name TEXT NOT NULL,
	path TEXT NOT NULL,
	size INTEGER NOT NULL,
	mime_type TEXT NOT NULL,
	PRIMARY KEY (attachment_uuid)
);
ALTER TABLE rosemary.attachments OWNER TO mladmin;

CREATE TABLE IF NOT EXISTS rosemary.orders (
	order_uuid UUID NOT NULL,
	created TIMESTAMP WITH TIME ZONE NOT NULL,
	updated TIMESTAMP WITH TIME ZONE,
	order_status TEXT CHECK (order_status IN ('new', 'confirmed', 'sent', 'closed', 'cancel')) DEFAULT 'new',
	customer_uid UUID DEFAULT NULL,
	customer_name TEXT DEFAULT NULL,
	customer_email TEXT DEFAULT NULL,
	customer_phone TEXT DEFAULT NULL,
	customer_address TEXT DEFAULT NULL,
	order_price INTEGER DEFAULT 0,
	access_code TEXT DEFAULT NULL,
	PRIMARY KEY (order_uuid)
);
ALTER TABLE rosemary.orders OWNER TO mladmin;
CREATE INDEX "idx_rosemary_orders_customer" ON "rosemary"."orders" ("order_uuid", "customer_name");

CREATE TABLE IF NOT EXISTS rosemary.paintings (
	painting_uuid UUID NOT NULL,
	created TIMESTAMP WITH TIME ZONE NOT NULL,
	deleted TIMESTAMP WITH TIME ZONE DEFAULT NULL,
	price INTEGER DEFAULT 0,
	painting_title JSONB DEFAULT '"{\"en\":\"\", \"cs\":\"\"}"',
	painting_description JSONB DEFAULT '"{\"en\":\"\", \"cs\":\"\"}"',
	data JSONB DEFAULT NULL,
	PRIMARY KEY (painting_uuid)
);
ALTER TABLE rosemary.paintings OWNER TO mladmin;

CREATE TABLE IF NOT EXISTS rosemary.photos (
	photos_uuid UUID NOT NULL,
	created TIMESTAMP WITH TIME ZONE NOT NULL,
	deleted TIMESTAMP WITH TIME ZONE DEFAULT NULL,
	photo_title JSONB DEFAULT '"{\"en\":\"\", \"cs\":\"\"}"',
	photo_description JSONB DEFAULT '"{\"en\":\"\", \"cs\":\"\"}"',
	data JSONB DEFAULT NULL,
	PRIMARY KEY (photos_uuid)
);
ALTER TABLE rosemary.photos OWNER TO mladmin;

CREATE TABLE IF NOT EXISTS rosemary.posts (
	post_uuid UUID NOT NULL,
	created TIMESTAMP WITH TIME ZONE NOT NULL,
	deleted TIMESTAMP WITH TIME ZONE DEFAULT NULL,
	post_title JSONB NOT NULL DEFAULT '"{\"en\":\"\", \"cs\":\"\"}"',
	photos_description JSONB NOT NULL DEFAULT '"{\"en\":\"\", \"cs\":\"\"}"',
	data JSONB DEFAULT NULL,
	PRIMARY KEY (post_uuid)
);
ALTER TABLE rosemary.posts OWNER TO mladmin;

CREATE TABLE IF NOT EXISTS rosemary.tattoo (
	tattoo_uuid UUID NOT NULL,
	created TIMESTAMP WITH TIME ZONE NOT NULL,
	deleted TIMESTAMP WITH TIME ZONE DEFAULT NULL,
	tattoo_title JSONB DEFAULT '"{\"en\":\"\", \"cs\":\"\"}"',
	tattoo_description JSONB DEFAULT '"{\"en\":\"\", \"cs\":\"\"}"',
	data JSONB DEFAULT NULL,
	PRIMARY KEY (tattoo_uuid)
);
ALTER TABLE rosemary.tattoo OWNER TO mladmin;
