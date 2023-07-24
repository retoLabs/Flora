drop table taggers;
create table taggers (
id integer primary key autoincrement,
cod	varchar(4),
nom text,
tag text,
tel text,
url text,
autor text);

insert into taggers (cod,nom,tag,tel,url,autor) values ('JMR','José Maria Romero','Pepe','646195447','https://floracatalana.cat/drupal843/node/17330','José Maria Romero');
insert into taggers (cod,nom,tag,tel,url,autor) values ('FCR','Francesc Caralt','Francesc','555555555',null,null);

drop table ramas;
create table ramas (
id integer primary key autoincrement,
cod varchar(6) unique,
rama text);


insert into ramas (cod,rama) values ('R2','https://floracatalana.cat/flora/sites/default/files/imgvasculars/2019-06/mgc2/');
insert into ramas (cod,rama) values ('R4','https://floracatalana.cat/flora/sites/default/files/imgvasculars/2019-06/mgc4/');
insert into ramas (cod,rama) values ('R5','https://floracatalana.cat/flora/sites/default/files/imgvasculars/2019-06/mgc5/');	
insert into ramas (cod,rama) values ('R6','https://floracatalana.cat/flora/sites/default/files/imgvasculars/2019-06/mgc6/');
insert into ramas (cod,rama) values ('R9','https://floracatalana.cat/flora/sites/default/files/imgvasculars/2021-02/mgc9/');

drop table plantas;
create table plantas (
id integer primary key autoincrement,
gen text,
epit text,
subsp text,
taxon text unique
);

insert into plantas (gen,epit,subsp,taxon) values ('Arabis','hirsuta','gerardi','VTax1097');
insert into plantas (gen,epit,subsp,taxon) values ('Cephalanthera','rubra',null,'VTax4222');
insert into plantas (gen,epit,subsp,taxon) values ('Cytisophyllum','sessilifolium',null,'VTax589');
insert into plantas (gen,epit,subsp,taxon) values ('Fragaria','viridis',null,'VTax467');
insert into plantas (gen,epit,subsp,taxon) values ('Galanthus','nivalis',null,'VTax3605');

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