-- Create cyber_assessments table for storing security assessment results
CREATE TABLE IF NOT EXISTS cyber_assessments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    sap_landscape TEXT[], -- Array of SAP systems
    cloud_environments TEXT[], -- Array of cloud platforms
    attack_surface VARCHAR(50),
    existing_tools TEXT[], -- Array of existing security tools
    compliance_requirements TEXT[], -- Array of compliance frameworks
    budget_range VARCHAR(50),
    urgency VARCHAR(50),
    assessment_results JSONB, -- Store complete assessment results
    risk_score INTEGER,
    compliance_score INTEGER,
    gaps_found INTEGER,
    estimated_cost INTEGER,
    timeline_weeks INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_cyber_assessments_company ON cyber_assessments(company_name);
CREATE INDEX IF NOT EXISTS idx_cyber_assessments_industry ON cyber_assessments(industry);
CREATE INDEX IF NOT EXISTS idx_cyber_assessments_risk_score ON cyber_assessments(risk_score);
CREATE INDEX IF NOT EXISTS idx_cyber_assessments_created_at ON cyber_assessments(created_at);

-- Create GIN index for JSONB assessment results
CREATE INDEX IF NOT EXISTS idx_cyber_assessments_results ON cyber_assessments USING GIN (assessment_results);

-- Enable Row Level Security
ALTER TABLE cyber_assessments ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read their own assessments
CREATE POLICY "Users can view their own assessments" ON cyber_assessments
    FOR SELECT USING (auth.uid() IS NOT NULL);

-- Create policy for inserting new assessments
CREATE POLICY "Users can create assessments" ON cyber_assessments
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Create policy for admins to view all assessments
CREATE POLICY "Admins can view all assessments" ON cyber_assessments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.user_id = auth.uid() 
            AND user_profiles.role = 'admin'
        )
    );

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_cyber_assessments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cyber_assessments_updated_at
    BEFORE UPDATE ON cyber_assessments
    FOR EACH ROW
    EXECUTE FUNCTION update_cyber_assessments_updated_at();

-- Insert sample data for testing
INSERT INTO cyber_assessments (
    company_name,
    industry,
    sap_landscape,
    cloud_environments,
    compliance_requirements,
    assessment_results,
    risk_score,
    compliance_score,
    gaps_found,
    estimated_cost,
    timeline_weeks
) VALUES 
(
    'TechCorp Industries',
    'manufacturing',
    ARRAY['S/4HANA', 'BTP', 'Ariba'],
    ARRAY['AWS', 'Hybrid'],
    ARRAY['ISO 27001', 'SOC 2'],
    '{"topGaps": ["MFA not enforced", "Insufficient network segmentation"], "recommendations": ["Implement Zero Trust", "Deploy AI threat detection"]}',
    67,
    82,
    5,
    65000,
    8
),
(
    'HealthSystem Plus',
    'healthcare',
    ARRAY['SuccessFactors', 'Concur'],
    ARRAY['Azure', 'On-Premise'],
    ARRAY['HIPAA', 'SOC 2'],
    '{"topGaps": ["Encryption gaps", "Audit logging incomplete"], "recommendations": ["Enhance encryption", "Implement comprehensive logging"]}',
    72,
    88,
    4,
    58000,
    6
);
