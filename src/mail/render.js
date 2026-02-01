import fs from "fs";
import path from "path";
import mjml2html from "mjml";

const templatesDir = path.join(process.cwd(), "src/mail/templates");

// Simple template variable replacement
function replaceVariables(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });
}

export function renderMjml(templateName, data) {
  const templatePath = path.join(
    templatesDir,
    `${templateName}.mjml`
  );

  const templateContent = fs.readFileSync(templatePath, "utf8");
  const layoutSource = fs.readFileSync(
    path.join(templatesDir, "layouts/base.mjml"),
    "utf8"
  );

  // 1. Inject template content into layout placeholder
  const mjmlWithContent = layoutSource.replace(
    /\{\{TEMPLATE_CONTENT\}\}/g,
    templateContent
  );

  // 2. Replace all variables with data
  const mjmlWithData = replaceVariables(mjmlWithContent, data);

  // 3. Convert MJML → HTML
  const { html, errors } = mjml2html(mjmlWithData);

  if (errors?.length) {
    console.error(errors);
    throw new Error("MJML render error");
  }

  return html;
}
