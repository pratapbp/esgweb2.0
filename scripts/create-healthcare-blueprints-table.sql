-- Create healthcare_blueprints table
CREATE TABLE IF NOT EXISTS healthcare_blueprints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    hospital_size VARCHAR(50) NOT NULL,
    claim_volume VARCHAR(100),
    existing_systems TEXT[], -- Array of existing healthcare systems
    languages_served TEXT[], -- Array of languages served
    pain_points TEXT[], -- Array of selected pain points
    additional_requirements TEXT,
    budget_range VARCHAR(50),
    implementation_timeline VARCHAR(50),
    status VARCHAR(50) DEFAULT 'pending',
    recommendations JSONB, -- Store generated recommendations
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_healthcare_blueprints_email ON healthcare_blueprints(email);
CREATE INDEX IF NOT EXISTS idx_healthcare_blueprints_status ON healthcare_blueprints(status);
CREATE INDEX IF NOT EXISTS idx_healthcare_blueprints_hospital_size ON healthcare_blueprints(hospital_size);
CREATE INDEX IF NOT EXISTS idx_healthcare_blueprints_created_at ON healthcare_blueprints(created_at);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_healthcare_blueprints_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER healthcare_blueprints_updated_at
    BEFORE UPDATE ON healthcare_blueprints
    FOR EACH ROW
    EXECUTE FUNCTION update_healthcare_blueprints_updated_at();

-- Enable Row Level Security
ALTER TABLE healthcare_blueprints ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Healthcare blueprints are viewable by authenticated users" ON healthcare_blueprints
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Healthcare blueprints can be inserted by anyone" ON healthcare_blueprints
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Healthcare blueprints can be updated by admins" ON healthcare_blueprints
    FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');

-- Add comments for documentation
COMMENT ON TABLE healthcare_blueprints IS 'Stores healthcare AI blueprint requests from potential clients';
COMMENT ON COLUMN healthcare_blueprints.existing_systems IS 'Array of current healthcare systems (Epic, Cerner, SAP Health, etc.)';
COMMENT ON COLUMN healthcare_blueprints.languages_served IS 'Array of languages served by the healthcare organization';
COMMENT ON COLUMN healthcare_blueprints.pain_points IS 'Array of selected pain points and challenges';
COMMENT ON COLUMN healthcare_blueprints.recommendations IS 'JSON object containing generated AI recommendations and roadmap';
