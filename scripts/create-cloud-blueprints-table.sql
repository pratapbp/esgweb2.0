-- Create Cloud Blueprints table
CREATE TABLE IF NOT EXISTS cloud_blueprints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    cloud_providers TEXT[] DEFAULT '{}',
    current_stack VARCHAR(100),
    ai_usage VARCHAR(50),
    budget_tier VARCHAR(50),
    requirements TEXT,
    blueprint JSONB DEFAULT '{}',
    recommendations TEXT[] DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'generated',
    notes TEXT,
    assigned_to UUID REFERENCES profiles(id),
    follow_up_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cloud_blueprints_status ON cloud_blueprints(status);
CREATE INDEX IF NOT EXISTS idx_cloud_blueprints_budget_tier ON cloud_blueprints(budget_tier);
CREATE INDEX IF NOT EXISTS idx_cloud_blueprints_created_at ON cloud_blueprints(created_at);
CREATE INDEX IF NOT EXISTS idx_cloud_blueprints_assigned_to ON cloud_blueprints(assigned_to);
CREATE INDEX IF NOT EXISTS idx_cloud_blueprints_cloud_providers ON cloud_blueprints USING GIN(cloud_providers);

-- Enable RLS (Row Level Security)
ALTER TABLE cloud_blueprints ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Cloud blueprints are viewable by authenticated users" ON cloud_blueprints
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Cloud blueprints are insertable by anyone" ON cloud_blueprints
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Cloud blueprints are updatable by admin users" ON cloud_blueprints
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'hr_manager')
        )
    );

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_cloud_blueprints_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cloud_blueprints_updated_at
    BEFORE UPDATE ON cloud_blueprints
    FOR EACH ROW
    EXECUTE FUNCTION update_cloud_blueprints_updated_at();

-- Add comments for documentation
COMMENT ON TABLE cloud_blueprints IS 'Stores cloud architecture blueprints and recommendations';
COMMENT ON COLUMN cloud_blueprints.blueprint IS 'JSON object containing detailed architecture, timeline, costs, and technologies';
COMMENT ON COLUMN cloud_blueprints.recommendations IS 'Array of AI-generated recommendations based on user input';
COMMENT ON COLUMN cloud_blueprints.status IS 'Current status of the blueprint (generated, reviewed, implemented, cancelled)';
COMMENT ON COLUMN cloud_blueprints.cloud_providers IS 'Array of selected cloud providers (AWS, Azure, GCP, SAP Cloud)';
COMMENT ON COLUMN cloud_blueprints.ai_usage IS 'AI maturity level of the organization';
