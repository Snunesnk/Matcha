create table view
(
    user_viewed  int                                 not null comment 'type user_id',
    user_viewer  int                                 not null comment 'type user_id',
    last_updated timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP
);

