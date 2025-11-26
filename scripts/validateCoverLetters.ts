import { readFile } from "node:fs/promises";
import { parse } from "yaml";
import Ajv from "ajv";

interface CoverLetterConfig {
  contentBlocks?: Record<string, string>;
  letters?: Array<{
    id: string;
    template: string;
    variables: Record<string, string | number>;
    blocks: string[];
  }>;
  templates?: Record<string, {
    greeting: string;
    signOff: string;
    tone: string;
  }>;
}

type CoverLetter = NonNullable<CoverLetterConfig['letters']>[number];

const ajv = new Ajv({ allErrors: true });

// Schema for cover letters configuration
const coverLetterSchema = {
  type: "object",
  required: ["contentBlocks", "letters"],
  properties: {
    contentBlocks: {
      type: "object",
      description: "Reusable content blocks for cover letters",
      patternProperties: {
        "^[a-zA-Z_]+$": {
          type: "string"
        }
      }
    },
    letters: {
      type: "array",
      description: "Individual cover letter configurations",
      items: {
        type: "object",
        required: ["id", "template", "variables", "blocks"],
        properties: {
          id: {
            type: "string",
            description: "Unique identifier for the cover letter",
            pattern: "^[a-z0-9-]+$"
          },
          template: {
            type: "string",
            description: "Template style to use",
            enum: ["professional", "enthusiastic", "academic", "technical"]
          },
          variables: {
            type: "object",
            description: "Variables for substitution",
            properties: {
              position: { type: "string" },
              company: { type: "string" }
            },
            additionalProperties: {
              oneOf: [
                { type: "string" },
                { type: "number" }
              ]
            }
          },
          blocks: {
            type: "array",
            description: "Ordered list of content blocks to use",
            items: {
              type: "string"
            },
            minItems: 1
          }
        }
      }
    },
    templates: {
      type: "object",
      description: "Template style definitions",
      patternProperties: {
        "^[a-zA-Z_]+$": {
          type: "object",
          properties: {
            greeting: { type: "string" },
            signOff: { type: "string" },
            tone: { type: "string" }
          }
        }
      }
    }
  }
};

async function validateCoverLetters() {
  try {
    console.log("📋 Validating cover-letters.yml...\n");

    const yaml = await readFile("./cover-letters.yml", "utf8");
    const config = parse(yaml) as CoverLetterConfig;

    const validate = ajv.compile(coverLetterSchema);
    const valid = validate(config);

    if (!valid) {
      console.error("❌ Validation failed!\n");
      console.error("Errors:");
      validate.errors?.forEach((error) => {
        console.error(`  • ${error.instancePath} ${error.message}`);
        if (error.params) {
          console.error(`    ${JSON.stringify(error.params)}`);
        }
      });
      process.exit(1);
    }

    // Additional validations
    const errors: string[] = [];

    // Check that all referenced blocks exist
    if (Array.isArray(config.letters) && config.contentBlocks) {
      config.letters.forEach((letter: CoverLetter) => {
        if (letter.blocks) {
          letter.blocks.forEach((blockName: string) => {
            if (config.contentBlocks && !(blockName in config.contentBlocks)) {
              errors.push(
                `Letter "${letter.id}" references undefined content block: "${blockName}"`
              );
            }
          });
        }
      });
    }

    // Check that all referenced templates exist
    if (Array.isArray(config.letters) && config.templates) {
      config.letters.forEach((letter: CoverLetter) => {
        if (letter.template && config.templates && !(letter.template in config.templates)) {
          errors.push(
            `Letter "${letter.id}" references undefined template: "${letter.template}"`
          );
        }
      });
    }

    // Check for duplicate letter IDs
    if (Array.isArray(config.letters)) {
      const ids = config.letters.map((l: CoverLetter) => l.id);
      const duplicates = ids.filter(
        (id: string, index: number) => ids.indexOf(id) !== index
      );
      if (duplicates.length > 0) {
        errors.push(`Duplicate letter IDs found: ${duplicates.join(", ")}`);
      }
    }

    // Check for unreferenced variables in blocks
    if (Array.isArray(config.letters) && config.contentBlocks) {
      config.letters.forEach((letter: CoverLetter) => {
        if (letter.blocks && letter.variables) {
          const usedVariables = new Set<string>();
          letter.blocks.forEach((blockName: string) => {
            const contentBlocks = config.contentBlocks as Record<string, string>;
            const blockContent = contentBlocks[blockName];
            if (blockContent) {
              const matches = blockContent.match(/\{\{(\w+)\}\}/g);
              if (matches) {
                matches.forEach((match: string) => {
                  const varName = match.replace(/[{}]/g, "");
                  usedVariables.add(varName);
                });
              }
            }
          });

          // Warn about missing variables
          usedVariables.forEach((varName) => {
            if (!(varName in letter.variables)) {
              console.warn(
                `⚠️  Warning: Letter "${letter.id}" uses variable "{{${varName}}}" but it's not defined`
              );
            }
          });
        }
      });
    }

    if (errors.length > 0) {
      console.error("❌ Validation failed!\n");
      errors.forEach((error) => console.error(`  • ${error}`));
      process.exit(1);
    }

    console.log("✅ cover-letters.yml is valid!");
    const letterCount = Array.isArray(config.letters) ? config.letters.length : 0;
    console.log(`   Found ${letterCount} cover letter(s)`);
    console.log(
      `   Found ${Object.keys(config.contentBlocks || {}).length} content block(s)`
    );
    console.log(
      `   Found ${Object.keys(config.templates || {}).length} template(s)\n`
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.error(
        "❌ cover-letters.yml not found. Create one to use cover letter features.\n"
      );
      process.exit(1);
    }
    throw error;
  }
}

validateCoverLetters();
