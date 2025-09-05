// scripts/analyze-magic-patterns.ts
import { Project, InterfaceDeclaration, TypeAliasDeclaration } from 'ts-morph';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const MAGIC_PATTERNS_DIR = './magic/src';
const OUTPUT_DIR = './generated';

interface ComponentAnalysis {
  name: string;
  filePath: string;
  props?: {
    name: string;
    properties: Array<{
      name: string;
      type: string;
      optional: boolean;
      description?: string;
    }>;
  };
  dataTypes: Array<{
    name: string;
    properties: Array<{
      name: string;
      type: string;
      optional: boolean;
    }>;
  }>;
}

async function analyzeComponents(): Promise<ComponentAnalysis[]> {
  const project = new Project({
    tsConfigFilePath: './magic/tsconfig.json',
  });
  
  // Add Magic Patterns source files
  const sourceFiles = project.addSourceFilesAtPaths([
    `${MAGIC_PATTERNS_DIR}/**/*.{ts,tsx}`,
    `!${MAGIC_PATTERNS_DIR}/**/*.d.ts`
  ]);
  
  const analyses: ComponentAnalysis[] = [];
  
  for (const file of sourceFiles) {
    const filePath = file.getFilePath();
    const fileName = file.getBaseName();
    
    console.log(`Analyzing: ${fileName}`);
    
    const analysis: ComponentAnalysis = {
      name: fileName.replace(/\.(tsx?|jsx?)$/, ''),
      filePath: filePath.replace(process.cwd(), '.'),
      dataTypes: []
    };
    
    // Extract interfaces
    const interfaces = file.getInterfaces();
    for (const int of interfaces) {
      const interfaceName = int.getName();
      
      if (interfaceName.endsWith('Props')) {
        // This is a component props interface
        analysis.props = {
          name: interfaceName,
          properties: extractProperties(int)
        };
      } else {
        // This is a data type interface
        analysis.dataTypes.push({
          name: interfaceName,
          properties: extractProperties(int)
        });
      }
    }
    
    // Extract type aliases
    const typeAliases = file.getTypeAliases();
    for (const typeAlias of typeAliases) {
      const typeName = typeAlias.getName();
      const typeNode = typeAlias.getTypeNode();
      
      if (typeNode && typeNode.getKind()) {
        analysis.dataTypes.push({
          name: typeName,
          properties: extractTypeAliasProperties(typeAlias)
        });
      }
    }
    
    if (analysis.props || analysis.dataTypes.length > 0) {
      analyses.push(analysis);
    }
  }
  
  return analyses;
}

function extractProperties(int: InterfaceDeclaration) {
  return int.getProperties().map(prop => ({
    name: prop.getName(),
    type: prop.getTypeNode()?.getText() || 'unknown',
    optional: prop.hasQuestionToken(),
    description: prop.getJsDocs().map(doc => doc.getDescription()).join(' ') || undefined
  }));
}

function extractTypeAliasProperties(typeAlias: TypeAliasDeclaration) {
  // Basic extraction for type aliases - can be enhanced
  const typeText = typeAlias.getTypeNode()?.getText() || '';
  return [{
    name: 'value',
    type: typeText,
    optional: false
  }];
}

function generateZodSchema(analysis: ComponentAnalysis): string {
  let schema = `// Generated Zod schema for ${analysis.name}\nimport { z } from 'zod';\n\n`;
  
  // Generate schemas for data types
  for (const dataType of analysis.dataTypes) {
    schema += `export const ${dataType.name}Schema = z.object({\n`;
    for (const prop of dataType.properties) {
      const zodType = mapTypeToZod(prop.type);
      const optional = prop.optional ? '.optional()' : '';
      schema += `  ${prop.name}: ${zodType}${optional},\n`;
    }
    schema += `});\n\n`;
    schema += `export type ${dataType.name} = z.infer<typeof ${dataType.name}Schema>;\n\n`;
  }
  
  // Generate schema for props if exists
  if (analysis.props) {
    schema += `export const ${analysis.props.name}Schema = z.object({\n`;
    for (const prop of analysis.props.properties) {
      const zodType = mapTypeToZod(prop.type);
      const optional = prop.optional ? '.optional()' : '';
      const comment = prop.description ? ` // ${prop.description}` : '';
      schema += `  ${prop.name}: ${zodType}${optional},${comment}\n`;
    }
    schema += `});\n\n`;
    schema += `export type ${analysis.props.name} = z.infer<typeof ${analysis.props.name}Schema>;\n\n`;
  }
  
  return schema;
}

function mapTypeToZod(tsType: string): string {
  // Basic type mapping - can be enhanced
  const cleanType = tsType.trim();
  
  if (cleanType === 'string') return 'z.string()';
  if (cleanType === 'number') return 'z.number()';
  if (cleanType === 'boolean') return 'z.boolean()';
  if (cleanType === 'Date') return 'z.date()';
  if (cleanType.includes('[]')) {
    const arrayType = cleanType.replace('[]', '');
    return `z.array(${mapTypeToZod(arrayType)})`;
  }
  if (cleanType.includes('|')) {
    const unionTypes = cleanType.split('|').map(t => mapTypeToZod(t.trim()));
    return `z.union([${unionTypes.join(', ')}])`;
  }
  
  // Default to string for unknown types
  return 'z.string()';
}

function generateSupabaseMigration(analysis: ComponentAnalysis): string {
  let migration = `-- Generated migration for ${analysis.name}\n`;
  
  for (const dataType of analysis.dataTypes) {
    if (dataType.name.toLowerCase().includes('props')) continue; // Skip props interfaces
    
    const tableName = camelToSnake(dataType.name.replace(/Props$/, ''));
    
    migration += `\n-- Table: ${tableName}\n`;
    migration += `CREATE TABLE IF NOT EXISTS public.${tableName} (\n`;
    migration += `  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n`;
    
    for (const prop of dataType.properties) {
      const sqlType = mapTypeToSQL(prop.type);
      const nullable = prop.optional ? '' : ' NOT NULL';
      migration += `  ${camelToSnake(prop.name)} ${sqlType}${nullable},\n`;
    }
    
    migration += `  created_at TIMESTAMPTZ DEFAULT NOW(),\n`;
    migration += `  updated_at TIMESTAMPTZ DEFAULT NOW()\n`;
    migration += `);\n\n`;
    
    // Add RLS
    migration += `-- Enable RLS\n`;
    migration += `ALTER TABLE public.${tableName} ENABLE ROW LEVEL SECURITY;\n\n`;
    
    // Basic RLS policy
    migration += `-- RLS Policies\n`;
    migration += `CREATE POLICY "${tableName}_access" ON public.${tableName}\n`;
    migration += `  FOR ALL TO authenticated\n`;
    migration += `  USING (auth.uid() IS NOT NULL);\n\n`;
  }
  
  return migration;
}

function mapTypeToSQL(tsType: string): string {
  const cleanType = tsType.trim();
  
  if (cleanType === 'string') return 'TEXT';
  if (cleanType === 'number') return 'INTEGER';
  if (cleanType === 'boolean') return 'BOOLEAN';
  if (cleanType === 'Date') return 'TIMESTAMPTZ';
  if (cleanType.includes('[]')) return 'JSONB';
  if (cleanType.includes('|')) return 'TEXT'; // Store union types as text
  
  return 'JSONB'; // Default to JSONB for complex types
}

function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, '');
}

async function main() {
  try {
    console.log('🔍 Analyzing Magic Patterns components...');
    
    // Ensure output directory exists
    mkdirSync(OUTPUT_DIR, { recursive: true });
    mkdirSync(join(OUTPUT_DIR, 'schemas'), { recursive: true });
    mkdirSync(join(OUTPUT_DIR, 'migrations'), { recursive: true });
    
    const analyses = await analyzeComponents();
    
    console.log(`📊 Found ${analyses.length} components to analyze`);
    
    // Generate outputs
    for (const analysis of analyses) {
      // Generate Zod schema
      const zodSchema = generateZodSchema(analysis);
      writeFileSync(
        join(OUTPUT_DIR, 'schemas', `${analysis.name}.schema.ts`),
        zodSchema
      );
      
      // Generate Supabase migration
      const migration = generateSupabaseMigration(analysis);
      writeFileSync(
        join(OUTPUT_DIR, 'migrations', `${analysis.name}.migration.sql`),
        migration
      );
      
      console.log(`✅ Generated schema and migration for ${analysis.name}`);
    }
    
    // Generate summary
    const summary = {
      timestamp: new Date().toISOString(),
      totalComponents: analyses.length,
      components: analyses.map(a => ({
        name: a.name,
        filePath: a.filePath,
        hasProps: !!a.props,
        dataTypesCount: a.dataTypes.length
      }))
    };
    
    writeFileSync(
      join(OUTPUT_DIR, 'analysis-summary.json'),
      JSON.stringify(summary, null, 2)
    );
    
    console.log(`🎉 Analysis complete! Results saved to ${OUTPUT_DIR}/`);
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export { analyzeComponents, generateZodSchema, generateSupabaseMigration };