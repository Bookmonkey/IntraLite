-- using PostgreSQL
create database quicklinksintranet;

use quicklinksintranet;

create table settings (
  title text,
  logo_image text,
);

create table link (
  id serial PRIMARY KEY,
  link text not null,
  link_name text not null,
  is_external_link boolean not null
);



insert into settings (title) VALUES ('Quick links');