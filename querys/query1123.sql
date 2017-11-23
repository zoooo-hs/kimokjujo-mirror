load data local infile 'C:\\Users\\uaer\\Desktop\\db\\actorTable.tsv' into table kimokjujo_service.actor fields terminated by '\t' lines terminated by '\r\n'(id,name);
load data local infile 'C:\\Users\\uaer\\Desktop\\db\\directorTable.tsv' into table kimokjujo_service.director fields terminated by '\t' lines terminated by '\r\n'(name,id);
load data local infile 'C:\\Users\\uaer\\Desktop\\db\\maker.tsv' into table kimokjujo_service.maker fields terminated by '\t' lines terminated by '\r\n'(name,id);
load data local infile 'C:\\Users\\uaer\\Desktop\\db\\engineMovieData.tsv' into table kimokjujo_service.enginemoviedata fields terminated by '\t' lines terminated by '\r\n' (id,title,origin,budget,3words,breakEvenPoint,date,genre,contentRate,audience,directorId,makerId);

load data local infile 'C:\\Users\\uaer\\Desktop\\db\\engineMovieActorData.tsv' into table kimokjujo_service.enginemovieactor fields terminated by '\t' lines terminated by '\r\n'   (engineMovieId,actorId);

select engineMovieId from kimokjujo_service.enginemovieactor where actorId= 'actor489\r'  ;

select * from kimokjujo_service.enginemovieactor where engineMovieId ='movie511';
select * from kimokjujo_service.enginemovieactor;


SELECT sum(audience) FROM kimokjujo_service.enginemoviedata e,( select engineMovieId from kimokjujo_service.enginemovieactor where actorId='actor1' ) a WHERE e.id=a.engineMovieId order by date desc limit 2;