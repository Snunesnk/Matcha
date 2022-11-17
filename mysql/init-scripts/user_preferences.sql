create table user_preferences
(
    male       tinyint(1) default 1 not null,
    female     tinyint(1) default 1 not null,
    enby       tinyint(1) default 1 not null comment 'or NB = non-binary',
    user_login varchar(50)          null,
    constraint user_preferences_pk
        unique (user_login)
);

