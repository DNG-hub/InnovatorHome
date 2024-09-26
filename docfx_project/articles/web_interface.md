# Web Interface and Localization

The InnovatorHome web interface is designed with a focus on user experience and internationalization. This document explains how we manage language preferences and implement localization throughout the application.

## Cookie-Based Language Control

Our application uses cookies to store and manage user language preferences. This allows for a persistent language setting across sessions and pages.

### Setting the Language Cookie

When a user selects a language or the application detects a preferred language:

1. A cookie named `language_preference` is set with the chosen language code (e.g., 'en' for English, 'es' for Spanish).
2. This cookie is typically set with an expiration date far in the future to persist the user's choice.

### Reading the Language Cookie

On each page load:

1. The application checks for the existence of the `language_preference` cookie.
2. If found, the value is read to determine which language to display.
3. If not found, the application may fall back to a default language or attempt to detect the user's preferred language based on browser settings.

## Localization with data-location Attributes

Our localization strategy uses `data-location` attributes to precisely target content for translation. This approach allows for granular control over which elements are localized and simplifies the process of updating translations.

### How data-location Attributes Work

1. HTML elements that require localization are marked with a `data-location` attribute.
2. The value of this attribute is a unique identifier for that piece of content.

Example from `AIDevelopment.cshtml`:

<p data-location="aidevelopment-introduction-paragraph1">The AI revolution isn't coming—it's here, reshaping industries at breakneck speed. At Avanti AI Innovators, we're not just riding this wave; we're crafting the digital surfboards that propel businesses into the future. Our AI solutions aren't off-the-shelf products; they're bespoke digital architects, designed to transform your raw data into actionable intelligence.</p>

This attribute is used by our localization tool to identify the specific content to be translated.

### Updating Translations

To update translations:

1. Modify the content marked with `data-location` attributes.
2. Run the localization tool to update the translations.    

## Database Query for Localization

Our localization system uses a database-driven approach to store and retrieve localized content. This allows for efficient management of translations across multiple languages and easy updates without modifying the core application code.

### LocalizedContent Model

We use a `LocalizedContent` model to represent localized text in our database. Each entry in the database contains:

- `ContentID`: A unique identifier for the content
- `Page`: The page where the content appears
- `Section`: The section within the page (optional)
- `Location`: The specific location identifier (matching the `data-location` attribute)
- `LanguageCode`: The language code for the localized text
- `LocalizedText`: The actual translated text

### Localization Controller

The `LocalizationController` handles requests for localized content. It exposes an API endpoint that accepts three parameters:

- `Page`: The current page
- `Location`: The `data-location` attribute value
- `Language`: The selected language code

When a request is made, the controller queries the database using Entity Framework Core:

1. It filters the `LocalizedContent` entries based on the provided page, location, and language.
2. It selects only the `LocalizedText` field to minimize data transfer.
3. If a matching entry is found, it returns the localized text.
4. If no match is found, it returns a 404 Not Found response.

This approach allows for:

1. **Flexibility**: Easy addition of new languages or content without changing the application structure.
2. **Performance**: Efficient querying by using specific indexes on the database table.
3. **Scalability**: As the application grows, this system can handle an increasing number of localized elements across multiple pages.

By using this database-driven localization system, we ensure that our application can dynamically load the appropriate content based on the user's language preference and the specific `data-location` attributes in our HTML.

### Generating Location Data

In this example:

> ```html
> <p data-location="aidevelopment-introduction-paragraph1">
> ```

- <span style="color: #ff0000;">**_Page Identifier_**</span>: `aidevelopment`
- <span style="color: #00ff00;">**_Section Identifier_**</span>: `introduction`
- <span style="color: #0000ff;">**_Element Identifier_**</span>: `paragraph1`

This hierarchical structure allows for easy organization and retrieval of localized content.

### Localization Process

When a page loads:

1. The application reads the user's language preference from the cookie.
2. It scans the DOM for elements with `data-location` attributes.
3. For each `data-location` found, it queries the localization database or file.
4. The corresponding localized text for the current language is retrieved.
5. The content of the element is replaced with the localized version.

## Benefits of This Approach

1. **Flexibility**: Easy to add new languages without changing the HTML structure.
2. **Maintainability**: Localization can be updated without touching the core HTML.
3. **Performance**: Allows for efficient caching and lazy loading of language resources.
4. **Clarity**: Developers can easily identify which parts of the page are localized.

## Further Reading

- Explore how we manage multiple languages in our database
- Learn about our translation workflow
- See how we handle dynamic content localization

For more information on these topics, please refer to our API documentation or contact the development team.
