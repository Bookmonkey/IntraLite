-- using PostgreSQL
create database quicklinksintranet;

use quicklinksintranet;

create table config (
  title text,
  logo_image text,
);

create table link (
  id serial PRIMARY KEY,
  link text not null,
  link_name text not null,
  is_external_link boolean not null
);



insert into config (title) VALUES ('Quick links');