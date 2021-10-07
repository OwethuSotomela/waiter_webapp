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
    counter int NULL
);

drop table if exists daysSelected;
create table daysSelected (
	id serial not null primary key,
    selectedDays varchar(255) not null,
    username varchar(255) not null
);

INSERT INTO daysWaiters (daysAvailable) VALUES ('Monday');
INSERT INTO daysWaiters (daysAvailable) VALUES ('Tuesday');
INSERT INTO daysWaiters (daysAvailable) VALUES ('Wednesday');
INSERT INTO daysWaiters (daysAvailable) VALUES ('Thursday');
INSERT INTO daysWaiters (daysAvailable) VALUES ('Friday');
INSERT INTO daysWaiters (daysAvailable) VALUES ('Saturday');
INSERT INTO daysWaiters (daysAvailable) VALUES ('Sunday');

INSERT INTO waiters (username, names) VALUES ('OwSoto', 'Owethu Sotomela');
INSERT INTO waiters (username, names) VALUES ('Wethu', 'Ohworthy SotoKnife');
INSERT INTO waiters (username, names) VALUES ('Zena123', 'Zena Tyiso');
INSERT INTO waiters (username, names) VALUES ('Makho123', 'Makhosandile Makho');
INSERT INTO waiters (username, names) VALUES ('Pholisa123', 'Pholisa Fatyela');