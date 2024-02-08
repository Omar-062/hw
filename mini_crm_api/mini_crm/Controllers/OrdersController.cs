using Microsoft.AspNetCore.Mvc;
using mini_crm.Entities;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using mini_crm.Context;

namespace mini_crm.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
    private readonly MyDbContext _context;

    public OrdersController(MyDbContext context)
    {
        _context = context;
    }

    // Получение всех заказов
    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        var orders = await _context.Orders.ToListAsync();
        return Ok(orders);
    }

    // Добавление нового заказа
    [HttpPost]
    public async Task<IActionResult> AddOrder(Order order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, order);
    }

    // Получение заказа по ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrder(int id)
    {
        var order = await _context.Orders.FindAsync(id);

        if (order == null)
        {
            return NotFound();
        }

        return Ok(order);
    }

    [HttpPatch("status/{id}")]
    public async Task<IActionResult> PatchOrder(int id)
    {
        var existingOrder = await _context.Orders.FindAsync(id);

        if (existingOrder == null)
        {
            return NotFound("Order not found");
        }

        existingOrder.IsDelivered = !existingOrder.IsDelivered;

        await _context.SaveChangesAsync();

        return Ok($"Order {(existingOrder.IsDelivered ? "delivered" : "undelivered")} successfully");
    }



    // Удаление заказа
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null)
        {
            return NotFound();
        }

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}