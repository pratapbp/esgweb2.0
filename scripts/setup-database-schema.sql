-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user', 'hr_manager')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create career_postings table
CREATE TABLE IF NOT EXISTS career_postings (
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
CREATE TABLE IF NOT EXISTS lca_postings (
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
CREATE TABLE IF NOT EXISTS job_applications (
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

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Row Level Security Policies

-- Profiles policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can create their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Career postings policies
ALTER TABLE career_postings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active career postings" ON career_postings
  FOR SELECT USING (is_active = true);

CREATE POLICY "HR managers and admins can manage career postings" ON career_postings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'hr_manager')
    )
  );

-- LCA postings policies
ALTER TABLE lca_postings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active LCA postings" ON lca_postings
  FOR SELECT USING (is_active = true);

CREATE POLICY "HR managers and admins can manage LCA postings" ON lca_postings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'hr_manager')
    )
  );

-- Job applications policies
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create job applications" ON job_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "HR managers and admins can view all applications" ON job_applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'hr_manager')
    )
  );

CREATE POLICY "HR managers and admins can update applications" ON job_applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'hr_manager')
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_career_postings_active ON career_postings(is_active);
CREATE INDEX IF NOT EXISTS idx_career_postings_created_at ON career_postings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lca_postings_active ON lca_postings(is_active);
CREATE INDEX IF NOT EXISTS idx_lca_postings_created_at ON lca_postings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);
CREATE INDEX IF NOT EXISTS idx_job_applications_career_posting ON job_applications(career_posting_id);

-- Insert sample data for testing
INSERT INTO career_postings (title, department, location, type, description, requirements, benefits, salary_range, is_active) VALUES
('Senior SAP Consultant', 'SAP Solutions', 'New York, NY', 'full-time', 'Lead SAP implementation projects and provide technical expertise to clients. Work with cross-functional teams to deliver enterprise solutions.', 
 ARRAY['Bachelor''s degree in Computer Science or related field', '5+ years SAP implementation experience', 'SAP S/4HANA certification preferred', 'Strong communication skills'],
 ARRAY['Health insurance', 'Dental and vision coverage', '401(k) matching', 'Flexible work arrangements', 'Professional development budget'],
 '$95,000 - $125,000', true),

('AI/ML Engineer', 'AI & Analytics', 'San Francisco, CA', 'full-time', 'Develop and deploy machine learning models to solve complex business problems. Work with large datasets and cutting-edge AI technologies.',
 ARRAY['Master''s degree in Computer Science, AI, or related field', '3+ years machine learning experience', 'Python, TensorFlow, PyTorch proficiency', 'Experience with cloud platforms'],
 ARRAY['Competitive salary', 'Stock options', 'Health benefits', 'Remote work options', 'Learning stipend'],
 '$110,000 - $140,000', true),

('Data Analytics Specialist', 'Data & Analytics', 'Chicago, IL', 'full-time', 'Analyze complex datasets to provide actionable insights for business decision-making. Create dashboards and reports for stakeholders.',
 ARRAY['Bachelor''s degree in Statistics, Mathematics, or related field', '2+ years data analysis experience', 'SQL, R, Python proficiency', 'Tableau or Power BI experience'],
 ARRAY['Health insurance', 'Retirement plan', 'Paid time off', 'Professional training', 'Hybrid work model'],
 '$85,000 - $105,000', true),

('Cloud Solutions Architect', 'Cloud Services', 'Remote', 'full-time', 'Design and implement scalable cloud architectures for enterprise clients. Lead cloud migration projects and optimize infrastructure.',
 ARRAY['Bachelor''s degree in Engineering or Computer Science', '4+ years cloud architecture experience', 'AWS/Azure/GCP certifications', 'DevOps and automation skills'],
 ARRAY['Fully remote work', 'Health and wellness benefits', 'Equipment allowance', 'Conference attendance', 'Career advancement opportunities'],
 '$120,000 - $150,000', true);

INSERT INTO lca_postings (job_title, employer_name, worksite_address, wage_rate, wage_unit, employment_start_date, employment_end_date, case_number, is_active) VALUES
('Senior Software Engineer', 'ESGit Inc', '123 Tech Street, New York, NY 10001', 125000, 'year', '2024-03-01', '2025-02-28', 'I-200-24001-123456', true),
('Data Scientist', 'ESGit Inc', '456 Innovation Ave, San Francisco, CA 94105', 135000, 'year', '2024-04-01', '2025-03-31', 'I-200-24002-789012', true),
('SAP Technical Consultant', 'ESGit Inc', '789 Business Blvd, Chicago, IL 60601', 110000, 'year', '2024-02-15', '2025-02-14', 'I-200-24003-345678', true);
