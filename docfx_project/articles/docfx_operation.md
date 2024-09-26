# DocFX Operations

This guide provides a quick reference for common DocFX operations using PowerShell commands. These commands are essential for maintaining and updating your documentation.

## Building and Serving Documentation

### Build and Serve with Force Option

- **Purpose**: This command rebuilds all documentation and starts a local server to view the results.
- **When to use**: Use this when you've made changes and want to ensure all updates are reflected, regardless of caching.
- **Note**: The `--force` flag ignores cached results and rebuilds everything.

docfx docfx.json --force --serve

### Serve Existing Documentation

- **Purpose**: This command starts a local server to view existing documentation.
- **When to use**: Use this when you want to review the documentation without making changes.
- **Note**: This does not trigger a rebuild; it serves the cached documentation.

docfx serve _site

## Generating API Documentation

### Generate API Documentation

- **Purpose**: This command generates API documentation from source code.
- **When to use**: Use this when you need to update API documentation.
- **Note**: This command should be run in the root directory of your project.

docfx metadata

### Serve API Documentation

- **Purpose**: This command starts a local server to view generated API documentation.
- **When to use**: Use this when you want to review the API documentation without making changes.
- **Note**: This does not trigger a rebuild; it serves the cached API documentation.

docfx serve _site

## Cleaning Up

### Remove Output Directory

- **Purpose**: Deletes the `_site` directory and all its contents.
- **When to use**: Before a clean rebuild or when troubleshooting build issues.
- **Caution**: This permanently deletes the output. Ensure you're in the correct directory before running.

> **IMPORTANT:** The correct directory for this project is:
> 
> **`C:\Users\DaveB\source\repos\InnovatorHome\docfx_project>`**

Remove-Item -Path _site -Recurse -Force


### Validate DocFX Configuration

- **Purpose**: Validates the `docfx.json` configuration file and serves the documentation if valid.
- **When to use**: To check if your `docfx.json` file is correctly formatted and configured.

docfx validate


### Update TOC 

- **Purpose**: This command updates the Table of Contents (TOC) file.
- **When to use**: Use this when you need to update the TOC file.
- **Note**: This command should be run in the root directory of your project.   

- This command rebuilds the entire documentation, including the TOC.
- The `--force` flag ensures all files are processed, regardless of cache.
- Run this command from the directory containing your `docfx.json` file.

docfx docfx.json --force


## Tips and Best Practices

1. **Regular Rebuilds**: Use the `--force` option periodically to ensure all changes are captured, especially after significant updates.

2. **Version Control**: Keep your DocFX configuration and markdown files under version control, but exclude the `_site` directory.

3. **Customization**: Explore the `docfx.json` file to customize your documentation structure and appearance.

4. **Troubleshooting**: If you encounter unexpected behavior, try cleaning the `_site` directory and rebuilding with the `--force` option.

5. **Continuous Integration**: Consider setting up a CI/CD pipeline to automatically build and deploy your documentation on code changes.

Remember to run these commands from the directory containing your `docfx.json` file, typically the `docfx_project` folder in your repository.





## Troubleshooting

### Changes Not Appearing After Rebuild

If you've rebuilt your documentation but aren't seeing the changes in your browser:

1. Perform a hard refresh (Ctrl+F5 on Windows, Cmd+Shift+R on Mac).
2. Clear your browser cache.
3. Try viewing the documentation in an incognito/private browsing window.
4. If using Chrome, open Developer Tools (F12), go to the Network tab, and check "Disable cache".

Remember, browser caching is designed to improve performance, but it can sometimes prevent you from seeing the most recent changes to your documentation.


