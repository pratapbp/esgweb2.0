-- Create retail_blueprints table for storing form submissions
CREATE TABLE IF NOT EXISTS retail_blueprints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    retail_category VARCHAR(100) NOT NULL,
    transaction_volume VARCHAR(100) NOT NULL,
    existing_sap_systems TEXT[], -- Array of SAP systems
    personalization_goals TEXT[], -- Array of goals
    current_challenges TEXT,
    timeframe VARCHAR(50),
    budget VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_retail_blueprints_email ON retail_blueprints(email);
CREATE INDEX IF NOT EXISTS idx_retail_blueprints_created_at ON retail_blueprints(created_at);
CREATE INDEX IF NOT EXISTS idx_retail_blueprints_status ON retail_blueprints(status);
CREATE INDEX IF NOT EXISTS idx_retail_blueprints_retail_category ON retail_blueprints(retail_category);

-- Enable Row Level Security
ALTER TABLE retail_blueprints ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to insert their own records
CREATE POLICY "Users can insert retail blueprints" ON retail_blueprints
    FOR INSERT WITH CHECK (true);

-- Create policy for service role to access all records
CREATE POLICY "Service role can access all retail blueprints" ON retail_blueprints
    FOR ALL USING (auth.role() = 'service_role');

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_retail_blueprints_updated_at 
    BEFORE UPDATE ON retail_blueprints 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Add comments for documentation
COMMENT ON TABLE retail_blueprints IS 'Stores retail AI blueprint requests from the website form';
COMMENT ON COLUMN retail_blueprints.existing_sap_systems IS 'Array of existing SAP systems the company uses';
COMMENT ON COLUMN retail_blueprints.personalization_goals IS 'Array of personalization goals selected by the user';
COMMENT ON COLUMN retail_blueprints.status IS 'Status of the blueprint request: pending, in_progress, completed, cancelled';
