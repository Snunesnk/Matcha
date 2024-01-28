create table blocked (
    blocker varchar(50) not null,
    blocked varchar(50) not null,
    foreign key (blocker) references user(login) on delete cascade,
    foreign key (blocked) references user(login) on delete cascade
);

create index blocker_user on blocked(blocker);
create index blocked_user on blocked(blocked);