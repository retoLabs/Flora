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

drop table urls;
create table urls (
id integer primary key autoincrement,
url text);

insert into urls (url) values ('https://floracatalana.cat/flora/sites/default/files/imgvasculars/2019-06/mgc2/');

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
insert into plantas (gen,epit,subsp,taxon) values ('Cytisophyllum','sessilifolium',null,'xxx1');
insert into plantas (gen,epit,subsp,taxon) values ('Fragaria','viridis',null,'xxx2');
insert into plantas (gen,epit,subsp,taxon) values ('Galanthus','nivalis',null,'xxx3');

drop table fotos;
create table fotos (
id integer primary key autoincrement,
taxon text,
ejemp varchar(6),
num varchar(6),
formato varchar(5),
url_id integer,
FOREIGN KEY(taxon) REFERENCES plantas(taxon),
FOREIGN KEY(url_id) REFERENCES urls(id)
);


insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img1','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img2','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img3','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img4','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img5','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img6','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img7','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img8','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img9','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img10','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img11','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img12','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img13','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img14','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img15','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img16','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img17','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img18','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img19','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img20','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img21','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img22','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img23','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img24','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img25','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img26','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img27','jpg',1);
insert into fotos (taxon,ejemp,num,formato,url_id) values ('VTax4222','ExN','Img28','jpg',1);

drop table tags_fotos;
create table tags_fotos (
id integer primary key autoincrement,
tagger_id number,
foto_id number,
categ text,
cntxt text,
zoom text,
tags text,
FOREIGN KEY(tagger_id) REFERENCES taggers(id),
FOREIGN KEY(foto_id) REFERENCES fotos(id)
);