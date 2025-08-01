-- Create pharma blueprints table
CREATE TABLE IF NOT EXISTS pharma_blueprints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    company_type VARCHAR(100) NOT NULL,
    trial_phase VARCHAR(100),
    region VARCHAR(100) NOT NULL,
    manufacturing_model VARCHAR(100),
    sku_count VARCHAR(50),
    compliance_bodies TEXT[], -- Array of compliance body IDs
    specific_requirements TEXT,
    blueprint_data JSONB NOT NULL, -- Store the generated blueprint
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_pharma_blueprints_company_type ON pharma_blueprints(company_type);
CREATE INDEX IF NOT EXISTS idx_pharma_blueprints_region ON pharma_blueprints(region);
CREATE INDEX IF NOT EXISTS idx_pharma_blueprints_created_at ON pharma_blueprints(created_at);

-- Enable RLS
ALTER TABLE pharma_blueprints ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow public read access to pharma blueprints" ON pharma_blueprints
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access to pharma blueprints" ON pharma_blueprints
    FOR INSERT WITH CHECK (true);
