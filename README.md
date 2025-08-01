# ESG Website

# Troubleshooting

## Deprecated `@types/jspdf`
The `@types/jspdf` package is deprecated because `jspdf` includes its own type definitions. To resolve this:
1. Remove the package:
   \`\`\`bash
   pnpm remove @types/jspdf
   \`\`\`

## Missing `your-navbar-library`
If you encounter an error like:
\`\`\`
ERR_PNPM_FETCH_404  GET https://registry.npmjs.org/your-navbar-library: Not Found - 404
\`\`\`
Follow these steps:
1. Verify the package name in `package.json`.
2. If it's a private package, ensure your `.npmrc` file is configured with the correct authentication token.
3. If the package is not required, remove it:
   \`\`\`bash
   pnpm remove your-navbar-library
   \`\`\`

## Reinstall Dependencies
After making the changes, reinstall dependencies:
\`\`\`bash
pnpm install
\`\`\`
