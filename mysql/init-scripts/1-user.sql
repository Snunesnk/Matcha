create table user (
    email varchar(100) not null,
    name varchar(100) not null,
    surname varchar(100) not null,
    token varchar(250) null,
    dateOfBirth date not null,
    bio varchar(250) default '' null,
    gender varchar(3) default 'nb' not null comment '''m'' | ''f'' | ''nb'' | ''mtf'' | ''ftm''',
    prefMale tinyint(1) default 1 not null,
    prefFemale tinyint(1) default 1 not null,
    prefEnby tinyint(1) default 0 not null comment 'or NB = non-binary',
    imgA varchar(200) default '' null,
    imgB varchar(200) default '' null,
    imgC varchar(200) default '' null,
    imgD varchar(200) default '' null,
    imgE varchar(200) default '' null,
    lastOnline timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP,
    verified tinyint(1) default 0 null,
    onboarded tinyint(1) default 0 null,
    rating float default 100 null comment 'profile rating /100',
    coordinate POINT null,
    latitude decimal null,
    longitude decimal null,
    login varchar(50) not null primary key,
    password varchar(100) not null,
    constraint login unique (login)
    constraint email unique (email)
);

create index user_gender_idx on user(gender);
create index user_preferences_idx on user(prefMale, prefFemale, prefEnby);