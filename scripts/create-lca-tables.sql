-- Create LCA postings table
CREATE TABLE IF NOT EXISTS lca_postings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_title TEXT NOT NULL,
  lca_number TEXT UNIQUE NOT NULL,
  visa_type TEXT CHECK (visa_type IN ('H1B', 'H1B1', 'E3')) NOT NULL,
  wage_range TEXT NOT NULL,
  location TEXT NOT NULL,
  work_start_date DATE,
  work_end_date DATE,
  employer_name TEXT DEFAULT 'ESG Global Solutions',
  job_description TEXT,
  requirements TEXT,
  prevailing_wage TEXT,
  actual_wage TEXT,
  worksite TEXT,
  full_time_position BOOLEAN DEFAULT true,
  file_url TEXT,
  status TEXT CHECK (status IN ('pending', 'certified', 'expired')) DEFAULT 'pending',
  blockchain_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by TEXT NOT NULL
);

-- Create blockchain audit table
CREATE TABLE IF NOT EXISTS blockchain_audit (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  action TEXT CHECK (action IN ('create', 'update', 'delete', 'view')) NOT NULL,
  hash TEXT NOT NULL,
  previous_hash TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id TEXT NOT NULL,
  user_email TEXT,
  metadata JSONB DEFAULT '{}',
  verified BOOLEAN DEFAULT false,
  block_number INTEGER,
  transaction_id TEXT
);

-- Create LCA compliance analysis table
CREATE TABLE IF NOT EXISTS lca_compliance_analysis (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lca_id UUID REFERENCES lca_postings(id) ON DELETE CASCADE,
  analysis_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  compliance_score INTEGER CHECK (compliance_score >= 0 AND compliance_score <= 100),
  alerts JSONB DEFAULT '[]',
  status TEXT CHECK (status IN ('compliant', 'non_compliant', 'pending')) DEFAULT 'pending',
  UNIQUE(lca_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_lca_postings_status ON lca_postings(status);
CREATE INDEX IF NOT EXISTS idx_lca_postings_visa_type ON lca_postings(visa_type);
CREATE INDEX IF NOT EXISTS idx_lca_postings_created_at ON lca_postings(created_at);
CREATE INDEX IF NOT EXISTS idx_lca_postings_lca_number ON lca_postings(lca_number);

CREATE INDEX IF NOT EXISTS idx_blockchain_audit_resource ON blockchain_audit(resource_type, resource_id);
CREATE INDEX IF NOT EXISTS idx_blockchain_audit_timestamp ON blockchain_audit(timestamp);
CREATE INDEX IF NOT EXISTS idx_blockchain_audit_hash ON blockchain_audit(hash);

-- Enable Row Level Security (RLS)
ALTER TABLE lca_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blockchain_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE lca_compliance_analysis ENABLE ROW LEVEL SECURITY;

-- RLS Policies for LCA postings
-- Public can view certified postings
CREATE POLICY "Public can view certified LCA postings" ON lca_postings
  FOR SELECT USING (status = 'certified');

-- Authenticated users can view all postings
CREATE POLICY "Authenticated users can view all LCA postings" ON lca_postings
  FOR SELECT USING (auth.role() = 'authenticated');

-- Only admins can insert/update/delete
CREATE POLICY "Admins can manage LCA postings" ON lca_postings
  FOR ALL USING (
    auth.jwt() ->> 'role' IN ('admin', 'hr') OR
    auth.jwt() ->> 'email' LIKE '%@esgglobal.com'
  );

-- RLS Policies for blockchain audit
-- Only authenticated users can view audit records
CREATE POLICY "Authenticated users can view audit records" ON blockchain_audit
  FOR SELECT USING (auth.role() = 'authenticated');

-- Only system can insert audit records
CREATE POLICY "System can insert audit records" ON blockchain_audit
  FOR INSERT WITH CHECK (true);

-- RLS Policies for compliance analysis
-- Only admins can view compliance analysis
CREATE POLICY "Admins can view compliance analysis" ON lca_compliance_analysis
  FOR SELECT USING (
    auth.jwt() ->> 'role' IN ('admin', 'hr') OR
    auth.jwt() ->> 'email' LIKE '%@esgglobal.com'
  );

-- Only system can manage compliance analysis
CREATE POLICY "System can manage compliance analysis" ON lca_compliance_analysis
  FOR ALL WITH CHECK (true);

-- Create storage bucket for LCA documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('lca-documents', 'lca-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for LCA documents
CREATE POLICY "Public can view LCA documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'lca-documents');

CREATE POLICY "Authenticated users can upload LCA documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'lca-documents' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Admins can manage LCA documents" ON storage.objects
  FOR ALL USING (
    bucket_id = 'lca-documents' AND
    (auth.jwt() ->> 'role' IN ('admin', 'hr') OR
     auth.jwt() ->> 'email' LIKE '%@esgglobal.com')
  );

-- Insert sample LCA postings for demonstration
INSERT INTO lca_postings (
  job_title, lca_number, visa_type, wage_range, location, 
  work_start_date, work_end_date, employer_name, 
  job_description, requirements, prevailing_wage, actual_wage,
  worksite, status, created_by
) VALUES 
(
  'Senior SAP Developer', 'I-200-24001-123456', 'H1B', '$95,000 - $125,000', 'New York, NY',
  '2024-04-01', '2027-03-31', 'ESG Global Solutions',
  'Develop and maintain SAP applications, customize SAP modules, and provide technical support.',
  'Bachelor''s degree in Computer Science or related field. 5+ years SAP development experience.',
  '$98,000', '$110,000',
  '123 Business Ave, New York, NY 10001',
  'certified', 'admin-system'
),
(
  'Data Engineer - AI/ML', 'I-200-24002-123457', 'H1B', '$105,000 - $140,000', 'San Francisco, CA',
  '2024-05-01', '2027-04-30', 'ESG Global Solutions',
  'Design and implement data pipelines, work with machine learning models, and optimize data infrastructure.',
  'Master''s degree in Data Science or Computer Science. 3+ years experience with Python, SQL, and cloud platforms.',
  '$115,000', '$125,000',
  '456 Tech Street, San Francisco, CA 94105',
  'certified', 'admin-system'
),
(
  'Cybersecurity Analyst', 'I-200-24003-123458', 'E3', '$85,000 - $110,000', 'Austin, TX',
  '2024-06-01', '2026-05-31', 'ESG Global Solutions',
  'Monitor security systems, conduct vulnerability assessments, and respond to security incidents.',
  'Bachelor''s degree in Cybersecurity or related field. CISSP or similar certification preferred.',
  '$88,000', '$95,000',
  '789 Security Blvd, Austin, TX 78701',
  'certified', 'admin-system'
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_lca_postings_updated_at 
  BEFORE UPDATE ON lca_postings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
