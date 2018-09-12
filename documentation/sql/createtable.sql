-- using PostgreSQL
create database quicklinksintranet;

use quicklinksintranet;

-- create table config (

-- );

create table link (
  id serial PRIMARY KEY,
  link text not null,
  link_name text not null,
  is_external_link boolean not null
);