create table userSettings (
    userLogin varchar(50) not null,
    distMin int default 0 not null,
    distMax int default 100 not null,
    ageMin int default 18 not null,
    ageMax int default 55 not null,
    fameMin int default 0 not null,
    fameMax int default 100 not null
);