-- Create logistics_blueprints table
CREATE TABLE IF NOT EXISTS logistics_blueprints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    assessment JSONB NOT NULL,
    recommendations JSONB NOT NULL,
    roi_forecast JSONB NOT NULL,
    timeline JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_logistics_blueprints_email ON logistics_blueprints(contact_email);
CREATE INDEX IF NOT EXISTS idx_logistics_blueprints_created_at ON logistics_blueprints(created_at);

-- Enable RLS
ALTER TABLE logistics_blueprints ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Allow authenticated users to manage logistics blueprints" ON logistics_blueprints
    FOR ALL USING (auth.role() = 'authenticated');

-- Create policy for service role
CREATE POLICY "Allow service role full access to logistics blueprints" ON logistics_blueprints
    FOR ALL USING (auth.role() = 'service_role');
