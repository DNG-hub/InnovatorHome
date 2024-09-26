# InnovatorHome Project Structure

This document outlines the structure of the InnovatorHome project, explaining the purpose of each major directory and key files.

## Directory Structure

```
InnovatorHome/
├── Controllers/
├── Models/
├── Views/
├── Services/
├── Data/
├── wwwroot/
├── Pages/
├── Migrations/
└── Properties/
```

## Key Directories and Their Purposes

### Controllers/
Contains the application's controllers, which handle incoming HTTP requests and return responses.

- `HomeController.cs`: Manages the main page and navigation.
- `BlogViewController.cs`: Handles blog-related actions.
- [List other important controllers]

### Models/
Defines the data structures used throughout the application.

- `BlogPost.cs`: Represents a blog post entity.
- `Category.cs`: Defines the structure for blog categories.
- [Other model files]

### Views/
Stores the Razor view files that define the UI of the application.

- `Shared/`: Contains layout files and partial views used across multiple pages.
- `Home/`: Views for the home page and main navigation.
- `Blog/`: Templates for displaying blog posts and lists.

### Services/
Houses the business logic and data access layer of the application.

- `BlogService.cs`: Implements blog-related operations.
- `IBlogService.cs`: Defines the interface for blog services.
- [Other service files]

### Data/
Contains database context and configuration files.

- `BlogDbContext.cs`: Defines the Entity Framework context for blog-related data.
- [Other database-related files]

### wwwroot/
Stores static files served directly to clients.

- `css/`: Stylesheets
- `js/`: JavaScript files
- `images/`: Image assets

### Pages/
Contains Razor Pages for the parts of the application using the Razor Pages framework.

### Migrations/
Stores Entity Framework Core migration files for database schema changes.

### Properties/
Contains project configuration files.

- `launchSettings.json`: Defines how the application is launched in different environments.

## Key Configuration Files

- `Program.cs`: The entry point of the application, configures services and the app's request pipeline.
- `appsettings.json`: Contains configuration settings for the application.
- `InnovatorHome.csproj`: The project file that defines build configurations and dependencies.

## Architectural Patterns

InnovatorHome follows a combination of MVC (Model-View-Controller) and Razor Pages patterns:

- MVC is used for complex interactions, especially in the blog system.
- Razor Pages are employed for simpler, page-focused features.

The Services layer implements a repository pattern, abstracting data access from controllers and pages.

## Dependency Injection

The application uses ASP.NET Core's built-in dependency injection container. Service registrations can be found in `Program.cs`.

## Next Steps

- [Explore the Blog System](blog-system.md)
- [Understand the Web Interface](web_interface.md)
- [Review API Documentation](../api/index.md)
