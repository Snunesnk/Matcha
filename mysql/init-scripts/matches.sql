create table matches (
    id int auto_increment primary key,
    user1 varchar(50) not null,
    user2 varchar(50) not null,
    created_at timestamp default CURRENT_TIMESTAMP,
    foreign key (user1) references user(login) on delete cascade,
    foreign key (user2) references user(login) on delete cascade,
    unique key match_unique (user1, user2)
);