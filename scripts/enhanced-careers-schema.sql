-- Enhanced Careers Database Schema for Executive Software Guild
-- Incorporating AI, Blockchain, and RPA technologies

-- Drop existing tables if they exist
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS lca_postings CASCADE;
DROP TABLE IF EXISTS job_postings CASCADE;
DROP TABLE IF EXISTS candidates CASCADE;
DROP TABLE IF EXISTS career_analytics CASCADE;
DROP TABLE IF EXISTS ai_job_matches CASCADE;
DROP TABLE IF EXISTS blockchain_verifications CASCADE;
DROP TABLE IF EXISTS rpa_workflows CASCADE;

-- Create enhanced job_postings table with AI features
CREATE TABLE job_postings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    remote_type VARCHAR(50) DEFAULT 'hybrid', -- remote, hybrid, onsite
    employment_type VARCHAR(50) DEFAULT 'full-time', -- full-time, part-time, contract, internship
    experience_level VARCHAR(50) DEFAULT 'mid', -- entry, mid, senior, executive
    
    -- Salary and Benefits
    salary_min DECIMAL(12,2),
    salary_max DECIMAL(12,2),
    salary_currency VARCHAR(3) DEFAULT 'USD',
    salary_period VARCHAR(20) DEFAULT 'annual', -- annual, hourly
    equity_offered BOOLEAN DEFAULT false,
    benefits JSONB DEFAULT '[]',
    
    -- Job Details
    description TEXT NOT NULL,
    responsibilities JSONB DEFAULT '[]',
    requirements JSONB DEFAULT '[]',
    preferred_skills JSONB DEFAULT '[]',
    technologies JSONB DEFAULT '[]', -- AI, Blockchain, RPA, SAP, etc.
    
    -- AI Enhancement Fields
    ai_generated_summary TEXT,
    ai_skill_tags JSONB DEFAULT '[]',
    ai_difficulty_score INTEGER DEFAULT 5, -- 1-10 scale
    ai_market_demand_score INTEGER DEFAULT 5, -- 1-10 scale
    
    -- Application Process
    application_deadline DATE,
    application_process JSONB DEFAULT '{}', -- steps, requirements, etc.
    hiring_manager_id UUID REFERENCES auth.users(id),
    
    -- Status and Metadata
    status VARCHAR(50) DEFAULT 'active', -- active, paused, closed, draft
    priority_level VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
    featured BOOLEAN DEFAULT false,
    views_count INTEGER DEFAULT 0,
    applications_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE,
    closed_at TIMESTAMP WITH TIME ZONE,
    
    -- Audit
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- Enhanced candidates table with AI profiling
CREATE TABLE candidates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Personal Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    location VARCHAR(255),
    
    -- Professional Information
    current_title VARCHAR(255),
    experience_years INTEGER,
    education_level VARCHAR(50), -- bachelor, master, phd, bootcamp, self-taught
    skills JSONB DEFAULT '[]',
    certifications JSONB DEFAULT '[]',
    languages JSONB DEFAULT '[]',
    
    -- Documents and Links
    resume_url TEXT,
    portfolio_url TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    website_url TEXT,
    
    -- Preferences
    desired_salary_min DECIMAL(12,2),
    desired_salary_max DECIMAL(12,2),
    preferred_locations JSONB DEFAULT '[]',
    remote_preference VARCHAR(50) DEFAULT 'hybrid',
    availability_date DATE,
    visa_status VARCHAR(100),
    
    -- AI Enhancement Fields
    ai_profile_summary TEXT,
    ai_skill_assessment JSONB DEFAULT '{}', -- AI-generated skill scores
    ai_personality_traits JSONB DEFAULT '{}',
    ai_career_trajectory JSONB DEFAULT '{}',
    ai_match_preferences JSONB DEFAULT '{}',
    
    -- Blockchain Verification
    blockchain_verified BOOLEAN DEFAULT false,
    blockchain_hash VARCHAR(255),
    verification_documents JSONB DEFAULT '[]',
    
    -- Status and Ratings
    status VARCHAR(50) DEFAULT 'active', -- active, inactive, hired, blacklisted
    rating DECIMAL(3,2) DEFAULT 0.0,
    projects_completed INTEGER DEFAULT 0,
    success_rate DECIMAL(5,2) DEFAULT 0.0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Privacy and Consent
    data_consent BOOLEAN DEFAULT false,
    marketing_consent BOOLEAN DEFAULT false,
    profile_visibility VARCHAR(50) DEFAULT 'private' -- public, private, recruiters_only
);

-- Enhanced job_applications table with AI matching
CREATE TABLE job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_posting_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    
    -- Application Details
    cover_letter TEXT,
    custom_resume_url TEXT,
    application_source VARCHAR(100), -- website, linkedin, referral, etc.
    referral_source VARCHAR(255),
    
    -- AI Matching and Scoring
    ai_match_score DECIMAL(5,2), -- 0-100 compatibility score
    ai_skill_match JSONB DEFAULT '{}', -- detailed skill matching
    ai_culture_fit_score DECIMAL(5,2),
    ai_growth_potential_score DECIMAL(5,2),
    ai_recommendation TEXT,
    ai_red_flags JSONB DEFAULT '[]',
    
    -- Application Status Tracking
    status VARCHAR(50) DEFAULT 'submitted', -- submitted, screening, interview, offer, hired, rejected
    current_stage VARCHAR(100),
    stage_history JSONB DEFAULT '[]',
    
    -- Interview Process
    interviews_scheduled INTEGER DEFAULT 0,
    interviews_completed INTEGER DEFAULT 0,
    interview_feedback JSONB DEFAULT '[]',
    technical_assessment_score DECIMAL(5,2),
    
    -- Decision and Feedback
    decision VARCHAR(50), -- hired, rejected, withdrawn
    decision_reason TEXT,
    feedback_to_candidate TEXT,
    internal_notes TEXT,
    
    -- Offer Details (if applicable)
    offer_extended BOOLEAN DEFAULT false,
    offer_details JSONB DEFAULT '{}',
    offer_accepted BOOLEAN DEFAULT false,
    start_date DATE,
    
    -- Timestamps
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    decision_at TIMESTAMP WITH TIME ZONE,
    
    -- Reviewers
    reviewed_by UUID REFERENCES auth.users(id),
    decision_by UUID REFERENCES auth.users(id),
    
    UNIQUE(job_posting_id, candidate_id)
);

-- Enhanced LCA postings table with compliance tracking
CREATE TABLE lca_postings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Basic LCA Information
    case_number VARCHAR(50) UNIQUE NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    employer_name VARCHAR(255) NOT NULL DEFAULT 'Executive Software Guild Inc.',
    
    -- Position Details
    soc_code VARCHAR(10) NOT NULL,
    soc_title VARCHAR(255) NOT NULL,
    job_description TEXT,
    requirements TEXT,
    
    -- Employment Details
    full_time_position BOOLEAN DEFAULT true,
    total_workers INTEGER DEFAULT 1,
    employment_start_date DATE NOT NULL,
    employment_end_date DATE NOT NULL,
    
    -- Location Information
    worksite_address TEXT NOT NULL,
    worksite_city VARCHAR(100) NOT NULL,
    worksite_state VARCHAR(2) NOT NULL,
    worksite_postal_code VARCHAR(10) NOT NULL,
    
    -- Wage Information
    wage_rate_from DECIMAL(12,2) NOT NULL,
    wage_rate_to DECIMAL(12,2) NOT NULL,
    wage_unit VARCHAR(20) DEFAULT 'Year',
    prevailing_wage DECIMAL(12,2) NOT NULL,
    pw_unit_of_pay VARCHAR(20) DEFAULT 'Year',
    pw_source VARCHAR(10) DEFAULT 'OES',
    
    -- Visa and Legal Information
    visa_class VARCHAR(10) DEFAULT 'H-1B',
    case_status VARCHAR(50) DEFAULT 'Certified',
    filing_date DATE,
    decision_date DATE,
    
    -- Document Management
    document_url TEXT,
    document_filename VARCHAR(255),
    document_hash VARCHAR(255), -- for blockchain verification
    
    -- Compliance and Posting Requirements
    posting_start_date DATE,
    posting_end_date DATE,
    posted_locations JSONB DEFAULT '[]', -- where the posting was displayed
    public_access_provided BOOLEAN DEFAULT true,
    
    -- AI Enhancement
    ai_compliance_check JSONB DEFAULT '{}',
    ai_risk_assessment JSONB DEFAULT '{}',
    
    -- Status and Metadata
    is_active BOOLEAN DEFAULT true,
    internal_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Audit
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- AI Job Matching Analytics
CREATE TABLE ai_job_matches (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    job_posting_id UUID REFERENCES job_postings(id) ON DELETE CASCADE,
    
    -- AI Matching Scores
    overall_match_score DECIMAL(5,2) NOT NULL,
    skill_match_score DECIMAL(5,2),
    experience_match_score DECIMAL(5,2),
    location_match_score DECIMAL(5,2),
    salary_match_score DECIMAL(5,2),
    culture_fit_score DECIMAL(5,2),
    
    -- Detailed Analysis
    matching_skills JSONB DEFAULT '[]',
    missing_skills JSONB DEFAULT '[]',
    growth_opportunities JSONB DEFAULT '[]',
    ai_explanation TEXT,
    confidence_level DECIMAL(5,2),
    
    -- Recommendation Status
    recommended BOOLEAN DEFAULT false,
    recommendation_reason TEXT,
    
    -- Timestamps
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days')
);

-- Blockchain Verification Records
CREATE TABLE blockchain_verifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Reference Information
    entity_type VARCHAR(50) NOT NULL, -- candidate, job_posting, lca_posting, application
    entity_id UUID NOT NULL,
    
    -- Blockchain Data
    blockchain_network VARCHAR(50) DEFAULT 'ethereum',
    transaction_hash VARCHAR(255) UNIQUE NOT NULL,
    block_number BIGINT,
    contract_address VARCHAR(255),
    
    -- Verification Details
    verification_type VARCHAR(100) NOT NULL, -- education, experience, certification, document
    verified_data JSONB NOT NULL,
    verification_status VARCHAR(50) DEFAULT 'pending', -- pending, verified, failed
    
    -- Metadata
    gas_fee DECIMAL(18,8),
    verification_cost DECIMAL(10,2),
    verifier_address VARCHAR(255),
    
    -- Timestamps
    initiated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    verified_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE
);

-- RPA Workflow Automation
CREATE TABLE rpa_workflows (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Workflow Information
    workflow_name VARCHAR(255) NOT NULL,
    workflow_type VARCHAR(100) NOT NULL, -- resume_screening, interview_scheduling, offer_generation
    description TEXT,
    
    -- Trigger Configuration
    trigger_event VARCHAR(100) NOT NULL, -- application_submitted, interview_completed, etc.
    trigger_conditions JSONB DEFAULT '{}',
    
    -- Workflow Steps
    workflow_steps JSONB NOT NULL, -- array of automation steps
    
    -- Execution Details
    status VARCHAR(50) DEFAULT 'active', -- active, paused, disabled
    execution_count INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    failure_count INTEGER DEFAULT 0,
    last_execution_at TIMESTAMP WITH TIME ZONE,
    
    -- Performance Metrics
    average_execution_time INTEGER, -- in seconds
    success_rate DECIMAL(5,2),
    
    -- Configuration
    retry_attempts INTEGER DEFAULT 3,
    timeout_seconds INTEGER DEFAULT 300,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Audit
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- Career Analytics and Insights
CREATE TABLE career_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Analytics Type
    metric_type VARCHAR(100) NOT NULL, -- job_views, applications, hires, time_to_hire
    entity_type VARCHAR(50) NOT NULL, -- job_posting, department, location, skill
    entity_id VARCHAR(255),
    
    -- Metric Data
    metric_value DECIMAL(15,4) NOT NULL,
    metric_unit VARCHAR(50),
    
    -- Dimensions
    time_period VARCHAR(50), -- daily, weekly, monthly, quarterly
    date_recorded DATE NOT NULL,
    
    -- Additional Context
    metadata JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance optimization
CREATE INDEX idx_job_postings_status ON job_postings(status);
CREATE INDEX idx_job_postings_department ON job_postings(department);
CREATE INDEX idx_job_postings_location ON job_postings(location);
CREATE INDEX idx_job_postings_technologies ON job_postings USING GIN(technologies);
CREATE INDEX idx_job_postings_created_at ON job_postings(created_at DESC);
CREATE INDEX idx_job_postings_featured ON job_postings(featured, status);

CREATE INDEX idx_candidates_skills ON candidates USING GIN(skills);
CREATE INDEX idx_candidates_location ON candidates(location);
CREATE INDEX idx_candidates_status ON candidates(status);
CREATE INDEX idx_candidates_ai_skill_assessment ON candidates USING GIN(ai_skill_assessment);

CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_job_applications_job_posting ON job_applications(job_posting_id);
CREATE INDEX idx_job_applications_candidate ON job_applications(candidate_id);
CREATE INDEX idx_job_applications_ai_match_score ON job_applications(ai_match_score DESC);

CREATE INDEX idx_lca_postings_case_number ON lca_postings(case_number);
CREATE INDEX idx_lca_postings_status ON lca_postings(case_status);
CREATE INDEX idx_lca_postings_active ON lca_postings(is_active);
CREATE INDEX idx_lca_postings_dates ON lca_postings(employment_start_date, employment_end_date);

CREATE INDEX idx_ai_job_matches_candidate ON ai_job_matches(candidate_id);
CREATE INDEX idx_ai_job_matches_job ON ai_job_matches(job_posting_id);
CREATE INDEX idx_ai_job_matches_score ON ai_job_matches(overall_match_score DESC);

CREATE INDEX idx_blockchain_verifications_entity ON blockchain_verifications(entity_type, entity_id);
CREATE INDEX idx_blockchain_verifications_status ON blockchain_verifications(verification_status);

CREATE INDEX idx_rpa_workflows_type ON rpa_workflows(workflow_type);
CREATE INDEX idx_rpa_workflows_status ON rpa_workflows(status);

CREATE INDEX idx_career_analytics_metric ON career_analytics(metric_type, date_recorded);
CREATE INDEX idx_career_analytics_entity ON career_analytics(entity_type, entity_id);

-- Enable Row Level Security
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE lca_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_job_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE blockchain_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE rpa_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for job_postings
CREATE POLICY "Public can view active job postings" ON job_postings
    FOR SELECT USING (status = 'active');

CREATE POLICY "Authenticated users can view all job postings" ON job_postings
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin users can manage job postings" ON job_postings
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'hr_manager')
        )
    );

-- RLS Policies for candidates
CREATE POLICY "Users can view own candidate profile" ON candidates
    FOR SELECT TO authenticated USING (
        auth.uid()::text = id::text OR
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'hr_manager')
        )
    );

CREATE POLICY "Users can update own candidate profile" ON candidates
    FOR UPDATE TO authenticated USING (auth.uid()::text = id::text);

CREATE POLICY "Admin users can manage all candidates" ON candidates
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'hr_manager')
        )
    );

-- RLS Policies for job_applications
CREATE POLICY "Users can view own applications" ON job_applications
    FOR SELECT TO authenticated USING (
        candidate_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'hr_manager')
        )
    );

CREATE POLICY "Users can create applications" ON job_applications
    FOR INSERT TO authenticated WITH CHECK (candidate_id = auth.uid());

CREATE POLICY "Admin users can manage all applications" ON job_applications
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'hr_manager')
        )
    );

-- RLS Policies for lca_postings
CREATE POLICY "Public can view active LCA postings" ON lca_postings
    FOR SELECT USING (is_active = true);

CREATE POLICY "Admin users can manage LCA postings" ON lca_postings
    FOR ALL TO authenticated USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'hr_manager')
        )
    );

-- Functions for automated workflows
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_job_postings_updated_at BEFORE UPDATE ON job_postings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_candidates_updated_at BEFORE UPDATE ON candidates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lca_postings_updated_at BEFORE UPDATE ON lca_postings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate AI match scores
CREATE OR REPLACE FUNCTION calculate_ai_match_score(
    candidate_skills JSONB,
    job_requirements JSONB,
    candidate_experience INTEGER,
    job_experience_min INTEGER
) RETURNS DECIMAL(5,2) AS $$
DECLARE
    skill_match_score DECIMAL(5,2) := 0;
    experience_score DECIMAL(5,2) := 0;
    total_score DECIMAL(5,2) := 0;
BEGIN
    -- Calculate skill match (simplified algorithm)
    SELECT COUNT(*) * 10.0 / GREATEST(jsonb_array_length(job_requirements), 1)
    INTO skill_match_score
    FROM jsonb_array_elements_text(candidate_skills) cs
    WHERE cs = ANY(SELECT jsonb_array_elements_text(job_requirements));
    
    -- Calculate experience match
    IF candidate_experience >= job_experience_min THEN
        experience_score := 30.0;
    ELSE
        experience_score := (candidate_experience::DECIMAL / job_experience_min) * 30.0;
    END IF;
    
    total_score := LEAST(skill_match_score + experience_score, 100.0);
    
    RETURN total_score;
END;
$$ LANGUAGE plpgsql;

-- Insert sample data for demonstration
INSERT INTO job_postings (
    title, department, location, remote_type, employment_type, experience_level,
    salary_min, salary_max, description, responsibilities, requirements, preferred_skills,
    technologies, ai_generated_summary, ai_skill_tags, status, featured, created_by
) VALUES 
(
    'Senior AI/ML Engineer',
    'Artificial Intelligence',
    'McKinney, TX',
    'hybrid',
    'full-time',
    'senior',
    140000,
    180000,
    'Lead the development of cutting-edge AI and machine learning solutions for enterprise clients. Work with generative AI, deep learning, and advanced analytics to solve complex business problems.',
    '["Design and implement ML models", "Lead AI research initiatives", "Mentor junior engineers", "Collaborate with product teams"]',
    '["Master''s degree in AI/ML or related field", "5+ years ML experience", "Python, TensorFlow, PyTorch", "Cloud platforms (AWS, Azure, GCP)"]',
    '["Generative AI experience", "LLM fine-tuning", "MLOps expertise", "Research publications"]',
    '["Generative AI", "Machine Learning", "Deep Learning", "Python", "TensorFlow", "PyTorch", "AWS", "Azure"]',
    'Exciting opportunity to work on cutting-edge AI solutions with a focus on generative AI and enterprise applications.',
    '["AI", "ML", "Generative AI", "Deep Learning", "Python", "Cloud"]',
    'active',
    true,
    (SELECT id FROM auth.users LIMIT 1)
),
(
    'Blockchain Developer',
    'Blockchain Technology',
    'Austin, TX',
    'remote',
    'full-time',
    'mid',
    120000,
    150000,
    'Develop and maintain blockchain solutions for enterprise applications. Focus on smart contracts, DeFi protocols, and Web3 integrations.',
    '["Develop smart contracts", "Build DeFi protocols", "Integrate Web3 solutions", "Ensure security best practices"]',
    '["Bachelor''s degree in Computer Science", "3+ years blockchain experience", "Solidity, Web3.js", "Ethereum, Polygon"]',
    '["DeFi experience", "NFT development", "Cross-chain protocols", "Security auditing"]',
    '["Blockchain", "Ethereum", "Solidity", "Web3", "DeFi", "Smart Contracts"]',
    'Join our blockchain team to build the future of decentralized applications and financial systems.',
    '["Blockchain", "Ethereum", "Solidity", "Web3", "DeFi"]',
    'active',
    true,
    (SELECT id FROM auth.users LIMIT 1)
),
(
    'RPA Solutions Architect',
    'Process Automation',
    'Dallas, TX',
    'hybrid',
    'full-time',
    'senior',
    130000,
    160000,
    'Design and implement robotic process automation solutions to streamline business operations. Lead automation initiatives across multiple client engagements.',
    '["Design RPA solutions", "Lead automation projects", "Train client teams", "Optimize business processes"]',
    '["Bachelor''s degree in Engineering", "4+ years RPA experience", "UiPath, Blue Prism, Automation Anywhere", "Process analysis"]',
    '["Intelligent automation", "AI-powered RPA", "Process mining", "Change management"]',
    '["RPA", "UiPath", "Blue Prism", "Process Automation", "AI", "Process Mining"]',
    'Lead transformative automation projects that revolutionize how businesses operate.',
    '["RPA", "Automation", "UiPath", "Process Optimization", "AI"]',
    'active',
    false,
    (SELECT id FROM auth.users LIMIT 1)
);

INSERT INTO lca_postings (
    case_number, job_title, soc_code, soc_title, employment_start_date, employment_end_date,
    worksite_address, worksite_city, worksite_state, worksite_postal_code,
    wage_rate_from, wage_rate_to, prevailing_wage, job_description, requirements,
    case_status, is_active, created_by
) VALUES 
(
    'I-200-24001-AI001',
    'Senior AI/ML Engineer',
    '15-1132',
    'Software Developers, Applications',
    '2024-04-01',
    '2027-03-31',
    '8751 Collin McKinney PKWY, Suite #601',
    'McKinney',
    'TX',
    '75070',
    140000,
    180000,
    145000,
    'Lead the development of cutting-edge AI and machine learning solutions for enterprise clients.',
    'Master''s degree in AI/ML or related field, 5+ years ML experience, Python, TensorFlow, PyTorch',
    'Certified',
    true,
    (SELECT id FROM auth.users LIMIT 1)
),
(
    'I-200-24002-BC001',
    'Blockchain Developer',
    '15-1132',
    'Software Developers, Applications',
    '2024-05-01',
    '2027-04-30',
    '8751 Collin McKinney PKWY, Suite #601',
    'McKinney',
    'TX',
    '75070',
    120000,
    150000,
    125000,
    'Develop and maintain blockchain solutions for enterprise applications.',
    'Bachelor''s degree in Computer Science, 3+ years blockchain experience, Solidity, Web3.js',
    'Certified',
    true,
    (SELECT id FROM auth.users LIMIT 1)
);

-- Grant permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
