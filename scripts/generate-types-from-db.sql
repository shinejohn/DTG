-- Generate TypeScript types from database schema
-- Run this against your Supabase database to get the complete type definitions

-- Get all table definitions
SELECT 
  'export interface ' || table_name || ' {' || E'\n' ||
  string_agg(
    '  ' || column_name || ': ' || 
    CASE 
      WHEN data_type = 'uuid' THEN 'string'
      WHEN data_type = 'character varying' OR data_type = 'text' THEN 'string'
      WHEN data_type = 'integer' OR data_type = 'bigint' OR data_type = 'smallint' THEN 'number'
      WHEN data_type = 'numeric' OR data_type = 'decimal' OR data_type = 'real' OR data_type = 'double precision' THEN 'number'
      WHEN data_type = 'boolean' THEN 'boolean'
      WHEN data_type = 'timestamp with time zone' OR data_type = 'timestamp without time zone' OR data_type = 'date' THEN 'string'
      WHEN data_type = 'jsonb' OR data_type = 'json' THEN 'Json'
      WHEN data_type = 'ARRAY' THEN 'string[]'
      WHEN data_type = 'USER-DEFINED' THEN udt_name
      ELSE 'any'
    END || 
    CASE 
      WHEN is_nullable = 'YES' THEN ' | null'
      ELSE ''
    END,
    E'\n'
    ORDER BY ordinal_position
  ) || E'\n}'
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name NOT LIKE 'pg_%'
  AND table_name NOT LIKE '_prisma_%'
GROUP BY table_name
ORDER BY table_name;

-- Get all enum types
SELECT 
  'export type ' || t.typname || ' = ' ||
  string_agg('''' || e.enumlabel || '''', ' | ' ORDER BY e.enumsortorder) || ';'
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid  
WHERE t.typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
GROUP BY t.typname
ORDER BY t.typname;