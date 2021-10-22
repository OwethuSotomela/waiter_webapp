drop table if exists employerAndEmployees;
create table employerAndEmployees(
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
	username varchar(255) not null,
    dayChecked varchar(255)  not null,
    dayCheckedUsername varchar(255) not null unique
);

INSERT INTO daysWaiters (daysAvailable, color, counter) VALUES ('Monday', 'btn-warning', 0);
INSERT INTO daysWaiters (daysAvailable, color, counter) VALUES ('Tuesday', 'btn-warning', 0);
INSERT INTO daysWaiters (daysAvailable, color, counter) VALUES ('Wednesday', 'btn-warning', 0);
INSERT INTO daysWaiters (daysAvailable, color, counter) VALUES ('Thursday', 'btn-warning', 0);
INSERT INTO daysWaiters (daysAvailable, color, counter) VALUES ('Friday', 'btn-warning', 0);
INSERT INTO daysWaiters (daysAvailable, color, counter) VALUES ('Saturday', 'btn-warning', 0);
INSERT INTO daysWaiters (daysAvailable, color, counter) VALUES ('Sunday', 'btn-warning', 0);

INSERT INTO employerAndEmployees (username, names) VALUES ('OwSoto', 'Owethu Sotomela');
INSERT INTO employerAndEmployees (username, names) VALUES ('Wethu', 'Ohworthy SotoKnife');
INSERT INTO employerAndEmployees (username, names) VALUES ('Zena123', 'Zena Tyiso');
INSERT INTO employerAndEmployees (username, names) VALUES ('Makho123', 'Makhosandile Makho');
INSERT INTO employerAndEmployees (username, names) VALUES ('Pholisa123', 'Pholisa Fatyela');
INSERT INTO employerAndEmployees (username, names) VALUES ('Sokie@admin', 'Sokie Sotomela');