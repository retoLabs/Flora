drop table taggers;
create table taggers (
id integer primary key autoincrement,
cod	varchar(4),
nom text,
tag text,
tel text,
url text,
autor text);

drop table ramas;
create table ramas (
id integer primary key autoincrement,
cod varchar(6) unique,
rama text);

drop table plantas;
create table plantas (
id integer primary key autoincrement,
gen text,
epit text,
subsp text,
taxon text,
taggerK varchar(4),
revK varchar(4),
ftags text,
frev text,
foreign key (taggerK) references taggers(cod),
foreign key (revK) references taggers(cod)
);

drop table fotos;
create table fotos (
id integer primary key autoincrement,
taxon text,
ejemp varchar(6),
num varchar(6),
formato varchar(5),
rama varchar(6),
FOREIGN KEY(taxon) REFERENCES plantas(taxon),
FOREIGN KEY(rama) REFERENCES ramas(cod)
);


drop table tags_fotos;
create table tags_fotos (
id integer primary key autoincrement,
tagger varchar(4),
foto_id number,
categ text,
cntxt text,
zoom text,
tags text,
FOREIGN KEY(tagger) REFERENCES taggers(cod),
FOREIGN KEY(foto_id) REFERENCES fotos(id)
);