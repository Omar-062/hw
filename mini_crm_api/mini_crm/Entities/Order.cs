using System;
using System.Collections.Generic;

namespace mini_crm.Entities;

public partial class Order
{
    public int OrderId { get; set; }

    public string? Name { get; set; }

    public string? Surname { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Address { get; set; }

    public string? OrderDetails { get; set; }

    public int? Count { get; set; }

    public string? Note { get; set; }

    public bool IsDelivered { get; set; }
}
