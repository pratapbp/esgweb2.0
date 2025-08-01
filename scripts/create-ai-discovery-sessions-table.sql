-- Create AI Discovery Sessions table
CREATE TABLE IF NOT EXISTS ai_discovery_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    industry VARCHAR(100),
    pain_points TEXT,
    ai_maturity VARCHAR(50),
    requested_demos TEXT[] DEFAULT '{}',
    ai_recommendations JSONB DEFAULT '[]',
    status VARCHAR(50) DEFAULT 'pending',
    notes TEXT,
    assigned_to UUID REFERENCES profiles(id),
    follow_up_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_discovery_sessions_status ON ai_discovery_sessions(status);
CREATE INDEX IF NOT EXISTS idx_ai_discovery_sessions_industry ON ai_discovery_sessions(industry);
CREATE INDEX IF NOT EXISTS idx_ai_discovery_sessions_created_at ON ai_discovery_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_ai_discovery_sessions_assigned_to ON ai_discovery_sessions(assigned_to);

-- Enable RLS (Row Level Security)
ALTER TABLE ai_discovery_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "AI discovery sessions are viewable by authenticated users" ON ai_discovery_sessions
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "AI discovery sessions are insertable by anyone" ON ai_discovery_sessions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "AI discovery sessions are updatable by admin users" ON ai_discovery_sessions
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'hr_manager')
        )
    );

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_ai_discovery_sessions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ai_discovery_sessions_updated_at
    BEFORE UPDATE ON ai_discovery_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_ai_discovery_sessions_updated_at();

-- Add comments for documentation
COMMENT ON TABLE ai_discovery_sessions IS 'Stores AI discovery session requests and recommendations';
COMMENT ON COLUMN ai_discovery_sessions.ai_recommendations IS 'JSON array of AI solution recommendations generated based on user input';
COMMENT ON COLUMN ai_discovery_sessions.requested_demos IS 'Array of demo types requested by the user';
COMMENT ON COLUMN ai_discovery_sessions.status IS 'Current status of the discovery session (pending, scheduled, completed, cancelled)';
COMMENT ON COLUMN ai_discovery_sessions.ai_maturity IS 'Self-assessed AI maturity level of the organization';
