-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS lca_postings CASCADE;
DROP TABLE IF EXISTS career_postings CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user', 'hr_manager')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create career_postings table
CREATE TABLE career_postings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('full-time', 'part-time', 'contract', 'internship')),
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  salary_range TEXT,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lca_postings table
CREATE TABLE lca_postings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  job_title TEXT NOT NULL,
  employer_name TEXT NOT NULL,
  worksite_address TEXT NOT NULL,
  wage_rate DECIMAL(10,2) NOT NULL,
  wage_unit TEXT NOT NULL CHECK (wage_unit IN ('hour', 'week', 'month', 'year')),
  employment_start_date DATE NOT NULL,
  employment_end_date DATE NOT NULL,
  case_number TEXT,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_applications table
CREATE TABLE job_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  career_posting_id UUID REFERENCES career_postings(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  phone TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'interviewed', 'accepted', 'rejected')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to handle updated_at timestamps
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER career_postings_updated_at
  BEFORE UPDATE ON career_postings
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER lca_postings_updated_at
  BEFORE UPDATE ON lca_postings
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER job_applications_updated_at
  BEFORE UPDATE ON job_applications
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Row Level Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE lca_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

-- Career postings policies
CREATE POLICY "Anyone can view active career postings" ON career_postings
  FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can manage career postings" ON career_postings
  FOR ALL USING (auth.uid() IS NOT NULL);

-- LCA postings policies
CREATE POLICY "Anyone can view active LCA postings" ON lca_postings
  FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can manage LCA postings" ON lca_postings
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Job applications policies
CREATE POLICY "Anyone can create job applications" ON job_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view applications" ON job_applications
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Create indexes for better performance
CREATE INDEX idx_career_postings_active ON career_postings(is_active);
CREATE INDEX idx_career_postings_created_at ON career_postings(created_at DESC);
CREATE INDEX idx_lca_postings_active ON lca_postings(is_active);
CREATE INDEX idx_lca_postings_created_at ON lca_postings(created_at DESC);
CREATE INDEX idx_job_applications_status ON job_applications(status);
CREATE INDEX idx_job_applications_career_posting ON job_applications(career_posting_id);

-- Insert sample LCA postings data
INSERT INTO lca_postings (job_title, employer_name, worksite_address, wage_rate, wage_unit, employment_start_date, employment_end_date, case_number, is_active) VALUES
('Senior Software Engineer', 'ESGit Inc', '123 Tech Street, New York, NY 10001', 125000, 'year', '2024-03-01', '2025-02-28', 'I-200-24001-123456', true),
('Data Scientist', 'ESGit Inc', '456 Innovation Ave, San Francisco, CA 94105', 135000, 'year', '2024-04-01', '2025-03-31', 'I-200-24002-789012', true),
('SAP Technical Consultant', 'ESGit Inc', '789 Business Blvd, Chicago, IL 60601', 110000, 'year', '2024-02-15', '2025-02-14', 'I-200-24003-345678', true),
('Machine Learning Engineer', 'TechCorp Solutions', '321 AI Boulevard, Seattle, WA 98101', 140000, 'year', '2024-05-01', '2025-04-30', 'I-200-24004-456789', true),
('Cloud Architect', 'CloudFirst Technologies', '654 Cloud Drive, Austin, TX 78701', 130000, 'year', '2024-06-01', '2025-05-31', 'I-200-24005-567890', true),
('DevOps Engineer', 'InfraTech Systems', '987 DevOps Lane, Denver, CO 80201', 115000, 'year', '2024-04-15', '2025-04-14', 'I-200-24006-678901', true),
('Full Stack Developer', 'WebDev Innovations', '147 Code Street, Portland, OR 97201', 105000, 'year', '2024-07-01', '2025-06-30', 'I-200-24007-789012', true),
('Cybersecurity Analyst', 'SecureNet Corp', '258 Security Ave, Miami, FL 33101', 120000, 'year', '2024-03-15', '2025-03-14', 'I-200-24008-890123', true);

-- Insert sample career postings data
INSERT INTO career_postings (title, department, location, type, description, requirements, benefits, salary_range, is_active) VALUES
('Senior SAP Consultant', 'SAP Solutions', 'New York, NY', 'full-time', 'Lead SAP implementation projects and provide technical expertise to clients. Work with cross-functional teams to deliver enterprise solutions that transform business processes and drive operational efficiency.', 
 ARRAY['Bachelor''s degree in Computer Science, Information Systems, or related field', '5+ years of SAP implementation experience', 'SAP S/4HANA certification preferred', 'Strong communication and client-facing skills', 'Experience with ABAP programming', 'Knowledge of business process optimization'],
 ARRAY['Comprehensive health insurance', 'Dental and vision coverage', '401(k) with company matching', 'Flexible work arrangements', 'Professional development budget', 'Annual performance bonuses'],
 '$95,000 - $125,000', true),

('AI/ML Engineer', 'AI & Analytics', 'San Francisco, CA', 'full-time', 'Develop and deploy machine learning models to solve complex business problems. Work with large datasets and cutting-edge AI technologies to create intelligent solutions that drive business value.',
 ARRAY['Master''s degree in Computer Science, AI, Machine Learning, or related field', '3+ years of machine learning experience', 'Proficiency in Python, TensorFlow, PyTorch', 'Experience with cloud platforms (AWS, Azure, GCP)', 'Strong statistical and mathematical background', 'Experience with MLOps and model deployment'],
 ARRAY['Competitive salary with equity options', 'Stock options and profit sharing', 'Premium health benefits', 'Remote work flexibility', 'Learning and conference stipend', 'Cutting-edge technology access'],
 '$110,000 - $140,000', true),

('Data Analytics Specialist', 'Data & Analytics', 'Chicago, IL', 'full-time', 'Analyze complex datasets to provide actionable insights for business decision-making. Create comprehensive dashboards and reports for stakeholders across various departments.',
 ARRAY['Bachelor''s degree in Statistics, Mathematics, Data Science, or related field', '2+ years of data analysis experience', 'Proficiency in SQL, R, Python', 'Experience with Tableau, Power BI, or similar tools', 'Strong analytical and problem-solving skills', 'Excellent communication skills'],
 ARRAY['Health insurance with HSA option', 'Retirement plan with matching', 'Generous paid time off', 'Professional training opportunities', 'Hybrid work model', 'Wellness programs'],
 '$85,000 - $105,000', true),

('Cloud Solutions Architect', 'Cloud Services', 'Remote', 'full-time', 'Design and implement scalable cloud architectures for enterprise clients. Lead cloud migration projects and optimize infrastructure for performance, security, and cost-effectiveness.',
 ARRAY['Bachelor''s degree in Engineering, Computer Science, or related field', '4+ years of cloud architecture experience', 'AWS, Azure, or GCP certifications required', 'DevOps and automation expertise', 'Infrastructure as Code experience', 'Strong project management skills'],
 ARRAY['100% remote work opportunity', 'Comprehensive health and wellness benefits', 'Home office equipment allowance', 'Conference and training attendance', 'Career advancement opportunities', 'Flexible schedule'],
 '$120,000 - $150,000', true);
