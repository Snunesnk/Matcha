create table user_pictures
(
    img_a      varchar(200) default '' null,
    img_b      varchar(200) default '' null,
    user_login varchar(50)             not null,
    img_c      varchar(200) default '' null,
    img_d      varchar(200) default '' null,
    img_e      varchar(200) default '' null,
    constraint user_pictures_pk
        unique (user_login)
);

