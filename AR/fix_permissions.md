# Database Permissions Issue - Quick Fix

## The Problem
Getting error code `42501` which means Row Level Security (RLS) is blocking read access to the database.

## Solution
You need to enable public read access in Supabase for these tables:
- `roadmaps`
- `courses`
- `categories`
- `tags`

## How to Fix (Run in Supabase SQL Editor)

```sql
-- Enable RLS (if not already enabled)
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read roadmaps" ON roadmaps FOR SELECT USING (true);
CREATE POLICY "Public read courses" ON courses FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read tags" ON tags FOR SELECT USING (true);
```

## Alternative: Use Service Role Key
If you want to test quickly, update `src/lib/supabase/server.ts` to use the service role key temporarily:

```typescript
// Change this line:
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// To this:
process.env.SUPABASE_SERVICE_ROLE_KEY!
```

⚠️ **CAUTION**: Use service role key only for testing, then switch back to policies.
