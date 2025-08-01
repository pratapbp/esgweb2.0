-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    message TEXT NOT NULL,
    interests TEXT[], -- Array of interests/services
    source VARCHAR(100) DEFAULT 'website', -- Source of the submission
    status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, closed
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create demo_requests table
CREATE TABLE IF NOT EXISTS demo_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    job_title VARCHAR(255),
    company_size VARCHAR(100),
    industry VARCHAR(100),
    use_case TEXT,
    preferred_date DATE,
    preferred_time TIME,
    timezone VARCHAR(50),
    demo_type VARCHAR(100) DEFAULT 'general', -- general, sap, ai, industry-specific
    status VARCHAR(50) DEFAULT 'requested', -- requested, scheduled, completed, cancelled
    notes TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quick_start_assessments table
CREATE TABLE IF NOT EXISTS quick_start_assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    current_systems TEXT[], -- Array of current systems
    pain_points TEXT[], -- Array of pain points
    goals TEXT[], -- Array of goals
    timeline VARCHAR(100),
    budget_range VARCHAR(100),
    priority_areas TEXT[], -- Array of priority areas
    assessment_type VARCHAR(100) DEFAULT 'general', -- general, sap, digital-transformation
    score INTEGER, -- Calculated assessment score
    recommendations TEXT,
    status VARCHAR(50) DEFAULT 'submitted', -- submitted, reviewed, follow-up-scheduled
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    interests TEXT[], -- Array of interests
    frequency VARCHAR(50) DEFAULT 'weekly', -- daily, weekly, monthly
    status VARCHAR(50) DEFAULT 'active', -- active, unsubscribed, bounced
    source VARCHAR(100) DEFAULT 'website',
    ip_address INET,
    user_agent TEXT,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create brochure_downloads table
CREATE TABLE IF NOT EXISTS brochure_downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    job_title VARCHAR(255),
    brochure_type VARCHAR(100) NOT NULL, -- sap-solutions, ai-analytics, industry-specific, etc.
    download_url TEXT,
    downloaded_at TIMESTAMP WITH TIME ZONE,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);

CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON demo_requests(email);
CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON demo_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON demo_requests(status);
CREATE INDEX IF NOT EXISTS idx_demo_requests_preferred_date ON demo_requests(preferred_date);

CREATE INDEX IF NOT EXISTS idx_quick_start_assessments_email ON quick_start_assessments(email);
CREATE INDEX IF NOT EXISTS idx_quick_start_assessments_created_at ON quick_start_assessments(created_at);
CREATE INDEX IF NOT EXISTS idx_quick_start_assessments_status ON quick_start_assessments(status);

CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_status ON newsletter_subscriptions(status);

CREATE INDEX IF NOT EXISTS idx_brochure_downloads_email ON brochure_downloads(email);
CREATE INDEX IF NOT EXISTS idx_brochure_downloads_created_at ON brochure_downloads(created_at);
CREATE INDEX IF NOT EXISTS idx_brochure_downloads_type ON brochure_downloads(brochure_type);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_contact_submissions_updated_at 
    BEFORE UPDATE ON contact_submissions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_demo_requests_updated_at 
    BEFORE UPDATE ON demo_requests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quick_start_assessments_updated_at 
    BEFORE UPDATE ON quick_start_assessments 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_subscriptions_updated_at 
    BEFORE UPDATE ON newsletter_subscriptions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brochure_downloads_updated_at 
    BEFORE UPDATE ON brochure_downloads 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quick_start_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE brochure_downloads ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Contact submissions policies
CREATE POLICY "Allow public to insert contact submissions" ON contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to view their own submissions" ON contact_submissions
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow admins to view all submissions" ON contact_submissions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'hr_manager')
        )
    );

-- Demo requests policies
CREATE POLICY "Allow public to insert demo requests" ON demo_requests
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to view their own demo requests" ON demo_requests
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow admins to manage demo requests" ON demo_requests
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'hr_manager')
        )
    );

-- Quick start assessments policies
CREATE POLICY "Allow public to insert assessments" ON quick_start_assessments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to view their own assessments" ON quick_start_assessments
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow admins to manage assessments" ON quick_start_assessments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'hr_manager')
        )
    );

-- Newsletter subscriptions policies
CREATE POLICY "Allow public to manage newsletter subscriptions" ON newsletter_subscriptions
    FOR ALL WITH CHECK (true);

CREATE POLICY "Allow admins to view all subscriptions" ON newsletter_subscriptions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'hr_manager')
        )
    );

-- Brochure downloads policies
CREATE POLICY "Allow public to insert brochure downloads" ON brochure_downloads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow users to view their own downloads" ON brochure_downloads
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow admins to view all downloads" ON brochure_downloads
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role IN ('admin', 'hr_manager')
        )
    );

-- Create a view for admin dashboard statistics
CREATE OR REPLACE VIEW admin_dashboard_stats AS
SELECT 
    'contact_submissions' as table_name,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as last_24h,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7d,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as last_30d
FROM contact_submissions
UNION ALL
SELECT 
    'demo_requests' as table_name,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as last_24h,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7d,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as last_30d
FROM demo_requests
UNION ALL
SELECT 
    'quick_start_assessments' as table_name,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as last_24h,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7d,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as last_30d
FROM quick_start_assessments
UNION ALL
SELECT 
    'newsletter_subscriptions' as table_name,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE subscribed_at >= NOW() - INTERVAL '24 hours') as last_24h,
    COUNT(*) FILTER (WHERE subscribed_at >= NOW() - INTERVAL '7 days') as last_7d,
    COUNT(*) FILTER (WHERE subscribed_at >= NOW() - INTERVAL '30 days') as last_30d
FROM newsletter_subscriptions
UNION ALL
SELECT 
    'brochure_downloads' as table_name,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as last_24h,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as last_7d,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as last_30d
FROM brochure_downloads;

-- Grant necessary permissions
GRANT SELECT ON admin_dashboard_stats TO authenticated;
GRANT SELECT ON admin_dashboard_stats TO service_role;

-- Add comments for documentation
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from the website';
COMMENT ON TABLE demo_requests IS 'Stores demo scheduling requests';
COMMENT ON TABLE quick_start_assessments IS 'Stores quick assessment form submissions';
COMMENT ON TABLE newsletter_subscriptions IS 'Stores newsletter subscription data';
COMMENT ON TABLE brochure_downloads IS 'Stores brochure download requests and tracking';

COMMENT ON COLUMN contact_submissions.interests IS 'Array of selected interests/services';
COMMENT ON COLUMN contact_submissions.source IS 'Source of the submission (website, landing page, etc.)';
COMMENT ON COLUMN contact_submissions.status IS 'Processing status: new, contacted, qualified, closed';

COMMENT ON COLUMN demo_requests.demo_type IS 'Type of demo requested: general, sap, ai, industry-specific';
COMMENT ON COLUMN demo_requests.status IS 'Demo status: requested, scheduled, completed, cancelled';

COMMENT ON COLUMN quick_start_assessments.score IS 'Calculated assessment score based on responses';
COMMENT ON COLUMN quick_start_assessments.recommendations IS 'Generated recommendations based on assessment';

COMMENT ON COLUMN newsletter_subscriptions.frequency IS 'Email frequency preference: daily, weekly, monthly';
COMMENT ON COLUMN newsletter_subscriptions.status IS 'Subscription status: active, unsubscribed, bounced';

COMMENT ON COLUMN brochure_downloads.brochure_type IS 'Type of brochure: sap-solutions, ai-analytics, industry-specific, etc.';
