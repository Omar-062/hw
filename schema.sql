create table orders 
(
    Id          int primary key identity (1, 1),
    Name        nvarchar (50)  not null,
    PhoneNumber nvarchar (10) not null,
    Address     nvarchar (25)  not null,
    Details     nvarchar (200) not null,
    Count       int            not null,
    IsDelivered bit            default 0,
);