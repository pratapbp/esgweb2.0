-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    job_type VARCHAR(50) NOT NULL CHECK (job_type IN ('Full-Time', 'Part-Time', 'Contract', 'Internship')),
    employment_level VARCHAR(50) DEFAULT 'Mid-Level' CHECK (employment_level IN ('Entry-Level', 'Mid-Level', 'Senior-Level', 'Executive')),
    description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    salary_min INTEGER,
    salary_max INTEGER,
    salary_range VARCHAR(100),
    tags TEXT[] DEFAULT '{}',
    benefits TEXT[] DEFAULT '{}',
    remote_type VARCHAR(20) DEFAULT 'hybrid' CHECK (remote_type IN ('remote', 'hybrid', 'onsite')),
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'draft', 'closed', 'paused')),
    posted_by UUID,
    expires_at TIMESTAMP WITH TIME ZONE,
    applications_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create LCA postings table
CREATE TABLE IF NOT EXISTS lca_postings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_title VARCHAR(255) NOT NULL,
    lca_case_number VARCHAR(50) UNIQUE NOT NULL,
    location VARCHAR(255) NOT NULL,
    employment_type VARCHAR(10) NOT NULL CHECK (employment_type IN ('H1B', 'H1B1', 'E3')),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    salary VARCHAR(100) NOT NULL,
    wage_unit VARCHAR(20) DEFAULT 'Year' CHECK (wage_unit IN ('Hour', 'Week', 'Month', 'Year')),
    status VARCHAR(20) DEFAULT 'Certified' CHECK (status IN ('Certified', 'Pending', 'Withdrawn', 'Denied')),
    document_url TEXT,
    blockchain_hash VARCHAR(64),
    employer_name VARCHAR(255) DEFAULT 'Executive Software Guild',
    worksite_address TEXT,
    posted_by UUID,
    compliance_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT valid_date_range CHECK (end_date > start_date)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_department ON jobs(department);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_tags ON jobs USING GIN(tags);

CREATE INDEX IF NOT EXISTS idx_lca_status ON lca_postings(status);
CREATE INDEX IF NOT EXISTS idx_lca_employment_type ON lca_postings(employment_type);
CREATE INDEX IF NOT EXISTS idx_lca_case_number ON lca_postings(lca_case_number);
CREATE INDEX IF NOT EXISTS idx_lca_created_at ON lca_postings(created_at DESC);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE lca_postings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for jobs
CREATE POLICY "Public jobs are viewable by everyone" ON jobs
    FOR SELECT USING (status = 'active');

CREATE POLICY "Authenticated users can insert jobs" ON jobs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own jobs" ON jobs
    FOR UPDATE USING (auth.uid() = posted_by);

-- RLS Policies for LCA postings (public by DOL requirement)
CREATE POLICY "LCA postings are publicly viewable" ON lca_postings
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert LCA postings" ON lca_postings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update their own LCA postings" ON lca_postings
    FOR UPDATE USING (auth.uid() = posted_by);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lca_postings_updated_at BEFORE UPDATE ON lca_postings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
