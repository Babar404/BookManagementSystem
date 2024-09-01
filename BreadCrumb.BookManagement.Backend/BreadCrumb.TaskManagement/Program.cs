using Microsoft.EntityFrameworkCore;
using BreadCrumb.BookManagement;
using BreadCrumb.BookManagement.Repositories;
using System.Xml;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BookManagementDbContext>(options => options.UseInMemoryDatabase("BreadCrumbDb"));
builder.Services.AddScoped<IBookRepository, BookRepository>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<BookManagementDbContext>();
    await SeedTestDatabase(context);
}

static async Task SeedTestDatabase(BookManagementDbContext context)
{
    if (!context.Books.Any())
    {
        context.Books.AddRange(
        new Book { Title = "Whispers of the Forgotten Land", PublishedDate = new DateTime(2024, 07, 25), Author = "Emily Thorne", Isbn = "978-1-234567-01-2" },
    new Book { Title = "The Quantum Paradox", PublishedDate = new DateTime(2024, 07, 29), Author = "Dr. Lucas Hayward", Isbn = "978-1-234567-02-9" },
    new Book { Title = "Beneath the Silver Moon", PublishedDate = new DateTime(2024, 08, 03), Author = "Isabella Martin", Isbn = "978-1-234567-03-6" },
    new Book { Title = "The Alchemist's Secret", PublishedDate = new DateTime(2024, 08, 10), Author = "Nathaniel Sinclair", Isbn = "978-1-234567-04-3" },
    new Book { Title = "Echoes of Eternity", PublishedDate = new DateTime(2024, 08, 12), Author = "Sophia Rivers", Isbn = "978-1-234567-05-0" },
    new Book { Title = "The Lost Chronicles of Avalon", PublishedDate = new DateTime(2024, 08, 20), Author = "Jonathan Edwards", Isbn = "978-1-234567-06-7" },
    new Book { Title = "Shadows of the Past", PublishedDate = new DateTime(2024, 08, 26), Author = "Claire Westwood", Isbn = "978-1-234567-07-4" },
    new Book { Title = "The Forgotten City", PublishedDate = new DateTime(2024, 08, 29), Author = "Marcus Holt", Isbn = "978-1-234567-08-1" },
    new Book { Title = "Journey to the End of Time", PublishedDate = new DateTime(2024, 08, 03), Author = "Oliver Kensington", Isbn = "978-1-234567-09-8" },
    new Book { Title = "The Phoenix Rises", PublishedDate = new DateTime(2024, 09, 04), Author = "Victoria Hawthorne", Isbn = "978-1-234567-10-4" },
    new Book { Title = "The Quantum Paradox", PublishedDate = new DateTime(2024, 09, 08), Author = "Dr. Lucas Hayward", Isbn = "978-1-234567-02-9" },
    new Book { Title = "The Alchemist's Secret", PublishedDate = new DateTime(2024, 09, 12), Author = "Nathaniel Sinclair", Isbn = "978-1-234567-04-3" },
    new Book { Title = "Whispers of the Forgotten Land", PublishedDate = new DateTime(2024, 09, 15), Author = "Emily Thorne", Isbn = "978-1-234567-01-2" }
        );
        await context.SaveChangesAsync();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(x => x
     .AllowAnyMethod()
     .AllowAnyHeader()
     .SetIsOriginAllowed(origin => true) // allow any origin 
     .AllowCredentials());

app.Run();
