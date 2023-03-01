create table view
(
    userViewed  int                                 not null comment 'type userId',
    userViewer  int                                 not null comment 'type userId',
    lastUpdated timestamp default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP
);

