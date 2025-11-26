/**
 * Simple template engine for variable substitution in cover letters
 * Replaces {{variable}} patterns with values from the variables object
 */

export function substituteVariables(
  text: string,
  variables: Record<string, string | number>
): string {
  return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (key in variables) {
      return String(variables[key]);
    }
    // Return the original placeholder if variable not found
    return match;
  });
}

/**
 * Process content blocks by substituting variables in each block
 */
export function processContentBlocks(
  blockNames: string[],
  contentBlocks: Record<string, string>,
  variables: Record<string, string | number>
): string[] {
  return blockNames
    .filter(blockName => blockName in contentBlocks)
    .map(blockName => {
      const blockText = contentBlocks[blockName];
      return substituteVariables(blockText, variables);
    });
}

/**
 * Get template settings with defaults
 */
export interface TemplateSettings {
  greeting: string;
  signOff: string;
  tone: string;
}

export function getTemplateSettings(
  templates: Record<string, TemplateSettings> | undefined,
  templateName: string
): TemplateSettings {
  const defaultSettings: TemplateSettings = {
    greeting: "Dear Hiring Manager,",
    signOff: "Sincerely,",
    tone: "professional"
  };

  if (!templates || !templates[templateName]) {
    return defaultSettings;
  }

  return { ...defaultSettings, ...templates[templateName] };
}
