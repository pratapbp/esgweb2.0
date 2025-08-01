-- Create manufacturing_blueprints table
CREATE TABLE IF NOT EXISTS manufacturing_blueprints (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    sub_industry VARCHAR(100) NOT NULL,
    business_size VARCHAR(100) NOT NULL,
    pain_points TEXT[] DEFAULT '{}',
    ai_maturity VARCHAR(100) NOT NULL,
    current_systems TEXT[] DEFAULT '{}',
    timeline VARCHAR(50),
    budget VARCHAR(50),
    additional_info TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_manufacturing_blueprints_email ON manufacturing_blueprints(email);
CREATE INDEX IF NOT EXISTS idx_manufacturing_blueprints_status ON manufacturing_blueprints(status);
CREATE INDEX IF NOT EXISTS idx_manufacturing_blueprints_created_at ON manufacturing_blueprints(created_at);

-- Enable RLS (Row Level Security)
ALTER TABLE manufacturing_blueprints ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access
CREATE POLICY "Service role can manage manufacturing blueprints" ON manufacturing_blueprints
    FOR ALL USING (auth.role() = 'service_role');
