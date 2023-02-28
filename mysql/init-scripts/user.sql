create table user
(
    email    varchar(100)              not null,
    name     varchar(100)              not null,
    surname  varchar(100)              not null,
    token    varchar(250)              null,
    bio      varchar(250) default ''   null,
    gender   varchar(3)   default 'nb' not null comment '''m'' | ''f'' | ''nb'' | ''mtf'' | ''ftm''',
    verified tinyint(1)   default 0    null,
    rating   float        default 100  null comment 'profile rating /100',
    login    varchar(50)               not null
        primary key,
    password varchar(100)              not null,
    constraint login
        unique (email)
);

