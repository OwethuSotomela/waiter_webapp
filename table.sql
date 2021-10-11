drop table if exists waiters;
create table waiters(
	id serial not null primary key,
	username varchar(255) not null unique,
	names varchar(255) not null
);

drop table if exists daysWaiters;
create table daysWaiters (
	id serial not null primary key,
    daysAvailable varchar(255) not null unique,
    color varchar(255) not null,
    counter int not NULL
);

drop table if exists daysSelected;
create table daysSelected (
	id serial not null primary key,
	username varchar(255) not null unique,
    Monday varchar(255)  null,
    Tuesday varchar(255)  null,
    Wednesday varchar(255)  null,
    Thursday varchar(255)  null,
    Friday varchar(255)  null,
    Saturday varchar(255)  null,
    Sunday varchar(255)  null
);

INSERT INTO daysWaiters (daysAvailable, color, counter) VALUES ('Monday', 'btn-warning', 0);
INSERT INTO daysWaiters (daysAvailable, color, counter) VALUES ('Tuesday', 'btn-warning', 0);
INSERT INTO daysWaiters (daysAvailable, color, counter) VALUES ('Wednesday', 'btn-warning', 0);
INSERT INTO daysWaiters (daysAvailable, color, counter) VALUES ('Thursday', 'btn-warning', 0);
INSERT INTO daysWaiters (daysAvailable, color, counter) VALUES ('Friday', 'btn-warning', 0);
INSERT INTO daysWaiters (daysAvailable, color, counter) VALUES ('Saturday', 'btn-warning', 0);
INSERT INTO daysWaiters (daysAvailable, color, counter) VALUES ('Sunday', 'btn-warning', 0);

INSERT INTO waiters (username, names) VALUES ('OwSoto', 'Owethu Sotomela');
INSERT INTO waiters (username, names) VALUES ('Wethu', 'Ohworthy SotoKnife');
INSERT INTO waiters (username, names) VALUES ('Zena123', 'Zena Tyiso');
INSERT INTO waiters (username, names) VALUES ('Makho123', 'Makhosandile Makho');
INSERT INTO waiters (username, names) VALUES ('Pholisa123', 'Pholisa Fatyela');