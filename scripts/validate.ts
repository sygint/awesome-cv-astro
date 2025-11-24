#!/usr/bin/env node

import Ajv from "ajv";
import addFormats from "ajv-formats";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import yaml from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load schema
const schemaPath = path.join(__dirname, "../resume-schema.json");
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));

// Load resume YAML
const resumePath = path.join(__dirname, "../resume-details.yml");
const resumeYaml = fs.readFileSync(resumePath, "utf-8");
const resumeData = yaml.parse(resumeYaml);

// Validate
const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);
const validate = ajv.compile(schema);
const valid = validate(resumeData);

if (!valid) {
  console.error("❌ Resume validation failed:\n");
  
  for (const error of validate.errors || []) {
    const path = error.instancePath || "root";
    const message = error.message || "validation error";
    
    console.error(`  • ${path}: ${message}`);
    
    if (error.params) {
      const params = Object.entries(error.params)
        .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
        .join(", ");
      console.error(`    (${params})`);
    }
  }
  
  console.error("\n💡 Tip: Check resume-schema.json for valid structure");
  process.exit(1);
}

console.log("✅ Resume validation passed!");
process.exit(0);
