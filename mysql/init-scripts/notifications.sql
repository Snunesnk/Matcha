create table notifications (
    `id` int auto_increment primary key,
    `login` varchar(50) not null,
    `trigger_login` varchar(50),
    `type` varchar(50) not null,
    `message` text,
    `created_at` timestamp default CURRENT_TIMESTAMP,
    `read` boolean default false,

    foreign key (login) references user(login) on delete cascade,
    foreign key (trigger_login) references user(login) on delete set null
);

create index notifications_login_idx on notifications(`login`);
create index notifications_trigger_login_idx on notifications(`trigger_login`);
create index notifications_read_idx on notifications(`read`);
