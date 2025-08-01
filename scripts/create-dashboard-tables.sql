-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(20) DEFAULT 'info' CHECK (type IN ('info', 'warning', 'error', 'success')),
  read BOOLEAN DEFAULT false,
  user_id UUID REFERENCES auth.users(id),
  action_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue')),
  priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  assigned_to UUID REFERENCES auth.users(id),
  created_by UUID REFERENCES auth.users(id),
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tenants table
CREATE TABLE IF NOT EXISTS tenants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('active', 'inactive', 'pending')),
  subscription_plan VARCHAR(50) DEFAULT 'basic' CHECK (subscription_plan IN ('basic', 'professional', 'enterprise')),
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create dashboard_metrics table for storing calculated metrics
CREATE TABLE IF NOT EXISTS dashboard_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name VARCHAR(100) NOT NULL,
  metric_value DECIMAL(15,2),
  metric_date DATE DEFAULT CURRENT_DATE,
  tenant_id UUID REFERENCES tenants(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ai_insights table
CREATE TABLE IF NOT EXISTS ai_insights (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(20) DEFAULT 'recommendation' CHECK (type IN ('recommendation', 'alert', 'prediction')),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  action VARCHAR(255),
  confidence INTEGER CHECK (confidence >= 0 AND confidence <= 100),
  user_id UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create system_metrics table for performance monitoring
CREATE TABLE IF NOT EXISTS system_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cpu_usage DECIMAL(5,2),
  memory_usage DECIMAL(5,2),
  disk_usage DECIMAL(5,2),
  response_time INTEGER,
  active_connections INTEGER,
  error_rate DECIMAL(5,2),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_activity table for tracking engagement
CREATE TABLE IF NOT EXISTS user_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  action VARCHAR(100) NOT NULL,
  resource VARCHAR(100),
  ip_address INET,
  user_agent TEXT,
  session_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create revenue_tracking table
CREATE TABLE IF NOT EXISTS revenue_tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES tenants(id),
  amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  transaction_type VARCHAR(50) NOT NULL,
  description TEXT,
  recorded_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_tracking ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can view tasks assigned to them" ON tasks;
DROP POLICY IF EXISTS "Users can update tasks assigned to them" ON tasks;
DROP POLICY IF EXISTS "Users can create tasks" ON tasks;
DROP POLICY IF EXISTS "Admins can manage tenants" ON tenants;

-- Create RLS policies for notifications
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role IN ('admin', 'hr_manager')
    )
  );

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can insert notifications" ON notifications
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role IN ('admin', 'hr_manager')
    )
  );

-- Create RLS policies for tasks
CREATE POLICY "Users can view tasks assigned to them" ON tasks
  FOR SELECT USING (
    auth.uid() = assigned_to OR 
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role IN ('admin', 'hr_manager')
    )
  );

CREATE POLICY "Users can update tasks assigned to them" ON tasks
  FOR UPDATE USING (
    auth.uid() = assigned_to OR 
    auth.uid() = created_by OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role IN ('admin', 'hr_manager')
    )
  );

CREATE POLICY "Users can create tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Create RLS policies for tenants (only admins can manage tenants)
CREATE POLICY "Admins can manage tenants" ON tenants
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role IN ('admin', 'hr_manager')
    )
  );

-- Create RLS policies for dashboard_metrics
CREATE POLICY "Admins can view all metrics" ON dashboard_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role IN ('admin', 'hr_manager')
    )
  );

-- Create RLS policies for ai_insights
CREATE POLICY "Users can view their own insights" ON ai_insights
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role IN ('admin', 'hr_manager')
    )
  );

-- Create RLS policies for system_metrics (admin only)
CREATE POLICY "Admins can view system metrics" ON system_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role IN ('admin', 'hr_manager')
    )
  );

-- Create RLS policies for user_activity
CREATE POLICY "Users can view their own activity" ON user_activity
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role IN ('admin', 'hr_manager')
    )
  );

-- Create RLS policies for revenue_tracking (admin only)
CREATE POLICY "Admins can manage revenue tracking" ON revenue_tracking
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role IN ('admin', 'hr_manager')
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_created_by ON tasks(created_by);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at);

CREATE INDEX IF NOT EXISTS idx_tenants_status ON tenants(status);
CREATE INDEX IF NOT EXISTS idx_tenants_email ON tenants(email);
CREATE INDEX IF NOT EXISTS idx_tenants_created_at ON tenants(created_at);
CREATE INDEX IF NOT EXISTS idx_tenants_last_activity ON tenants(last_activity);

CREATE INDEX IF NOT EXISTS idx_dashboard_metrics_date ON dashboard_metrics(metric_date);
CREATE INDEX IF NOT EXISTS idx_dashboard_metrics_name ON dashboard_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_dashboard_metrics_tenant ON dashboard_metrics(tenant_id);

CREATE INDEX IF NOT EXISTS idx_ai_insights_user_id ON ai_insights(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_insights_active ON ai_insights(is_active);
CREATE INDEX IF NOT EXISTS idx_ai_insights_priority ON ai_insights(priority);
CREATE INDEX IF NOT EXISTS idx_ai_insights_type ON ai_insights(type);

CREATE INDEX IF NOT EXISTS idx_system_metrics_recorded_at ON system_metrics(recorded_at);
CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_created_at ON user_activity(created_at);
CREATE INDEX IF NOT EXISTS idx_revenue_tracking_tenant_id ON revenue_tracking(tenant_id);
CREATE INDEX IF NOT EXISTS idx_revenue_tracking_date ON revenue_tracking(recorded_date);

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create function to automatically mark overdue tasks
CREATE OR REPLACE FUNCTION mark_overdue_tasks()
RETURNS void AS $$
BEGIN
  UPDATE tasks 
  SET status = 'overdue', updated_at = NOW()
  WHERE due_date < NOW() 
    AND status IN ('pending', 'in_progress');
END;
$$ language 'plpgsql';

-- Create function to calculate dashboard metrics
CREATE OR REPLACE FUNCTION calculate_dashboard_metrics()
RETURNS void AS $$
DECLARE
  active_tenant_count INTEGER;
  total_revenue DECIMAL(15,2);
  avg_task_completion DECIMAL(5,2);
BEGIN
  -- Calculate active tenants
  SELECT COUNT(*) INTO active_tenant_count
  FROM tenants WHERE status = 'active';
  
  -- Calculate total revenue for current month
  SELECT COALESCE(SUM(amount), 0) INTO total_revenue
  FROM revenue_tracking 
  WHERE recorded_date >= DATE_TRUNC('month', CURRENT_DATE);
  
  -- Calculate task completion rate
  SELECT 
    CASE 
      WHEN COUNT(*) > 0 THEN 
        (COUNT(*) FILTER (WHERE status = 'completed') * 100.0 / COUNT(*))
      ELSE 0 
    END INTO avg_task_completion
  FROM tasks 
  WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE);
  
  -- Insert or update metrics
  INSERT INTO dashboard_metrics (metric_name, metric_value, metric_date)
  VALUES 
    ('active_tenants', active_tenant_count, CURRENT_DATE),
    ('monthly_revenue', total_revenue, CURRENT_DATE),
    ('task_completion_rate', avg_task_completion, CURRENT_DATE)
  ON CONFLICT (metric_name, metric_date) 
  DO UPDATE SET 
    metric_value = EXCLUDED.metric_value,
    created_at = NOW();
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_notifications_updated_at BEFORE UPDATE ON notifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_insights_updated_at BEFORE UPDATE ON ai_insights
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create views for common queries
CREATE OR REPLACE VIEW dashboard_summary AS
SELECT 
  (SELECT COUNT(*) FROM tenants WHERE status = 'active') as active_tenants,
  (SELECT COUNT(*) FROM auth.users) as total_users,
  (SELECT COALESCE(SUM(amount), 0) FROM revenue_tracking WHERE recorded_date >= DATE_TRUNC('month', CURRENT_DATE)) as monthly_revenue,
  (SELECT COUNT(*) FROM tasks WHERE status = 'pending') as pending_tasks,
  (SELECT COUNT(*) FROM tasks WHERE status = 'overdue') as overdue_tasks,
  (SELECT COUNT(*) FROM notifications WHERE read = false) as unread_notifications;

CREATE OR REPLACE VIEW recent_activity AS
SELECT 
  'task' as type,
  t.title as title,
  t.status as status,
  t.created_at,
  p.full_name as user_name
FROM tasks t
LEFT JOIN profiles p ON t.assigned_to = p.user_id
WHERE t.created_at >= NOW() - INTERVAL '7 days'
UNION ALL
SELECT 
  'tenant' as type,
  tn.name as title,
  tn.status as status,
  tn.created_at,
  'System' as user_name
FROM tenants tn
WHERE tn.created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC
LIMIT 20;

-- Insert sample data for testing
DO $$
DECLARE
  sample_user_id UUID;
BEGIN
  -- Get a sample user ID (or create one if needed)
  SELECT id INTO sample_user_id FROM auth.users LIMIT 1;
  
  IF sample_user_id IS NOT NULL THEN
    -- Insert sample notifications
    INSERT INTO notifications (title, message, type, read, user_id) VALUES
    ('Welcome to Dashboard', 'Your dashboard is now ready to use! Explore all the features available.', 'success', false, sample_user_id),
    ('System Maintenance', 'Scheduled maintenance tonight from 2:00 AM to 4:00 AM EST.', 'warning', false, sample_user_id),
    ('New Feature Available', 'Check out our new AI insights feature for better decision making.', 'info', true, sample_user_id),
    ('Security Alert', 'Unusual login activity detected. Please verify your account.', 'error', false, sample_user_id),
    ('Monthly Report Ready', 'Your monthly analytics report is ready for download.', 'success', true, sample_user_id);

    -- Insert sample tasks
    INSERT INTO tasks (title, description, status, priority, assigned_to, created_by, due_date) VALUES
    ('Setup Dashboard Configuration', 'Configure the main dashboard settings and user preferences for the organization', 'completed', 'high', sample_user_id, sample_user_id, NOW() - INTERVAL '1 day'),
    ('Review Monthly Analytics', 'Analyze the monthly performance metrics and prepare summary report', 'in_progress', 'medium', sample_user_id, sample_user_id, NOW() + INTERVAL '3 days'),
    ('Update User Documentation', 'Update user guides and API documentation with latest features', 'pending', 'low', sample_user_id, sample_user_id, NOW() + INTERVAL '1 week'),
    ('Security Audit', 'Conduct comprehensive security audit of all systems and processes', 'pending', 'high', sample_user_id, sample_user_id, NOW() + INTERVAL '5 days'),
    ('Database Optimization', 'Optimize database queries and improve overall system performance', 'overdue', 'medium', sample_user_id, sample_user_id, NOW() - INTERVAL '2 days');

    -- Insert sample tenants
    INSERT INTO tenants (name, email, status, subscription_plan) VALUES
    ('TechCorp Solutions', 'admin@techcorp-solutions.com', 'pending', 'enterprise'),
    ('StartupXYZ Inc', 'contact@startupxyz.com', 'active', 'professional'),
    ('Global Dynamics Ltd', 'info@globaldynamics.com', 'active', 'enterprise'),
    ('Innovation Hub', 'team@innovationhub.com', 'inactive', 'basic'),
    ('Digital Ventures', 'hello@digitalventures.com', 'active', 'professional'),
    ('Future Systems', 'support@futuresystems.com', 'pending', 'basic');

    -- Insert sample AI insights
    INSERT INTO ai_insights (type, title, description, priority, action, confidence, user_id) VALUES
    ('recommendation', 'Optimize Task Workflow', 'Based on current patterns, consider automating repetitive tasks to improve team efficiency by 25%. Focus on documentation and reporting tasks.', 'high', 'View Automation Options', 85, sample_user_id),
    ('prediction', 'Revenue Growth Forecast', 'Machine learning models predict 15% revenue growth next quarter based on current trends and seasonal patterns.', 'medium', 'View Detailed Forecast', 92, sample_user_id),
    ('alert', 'Performance Bottleneck Detected', 'Database queries are running 30% slower than baseline. Consider optimizing indexes or scaling resources.', 'high', 'Investigate Performance', 78, sample_user_id),
    ('recommendation', 'User Engagement Strategy', 'Implement gamification features to boost user engagement. Estimated 31% improvement in daily active users.', 'low', 'View Strategy Details', 65, sample_user_id),
    ('prediction', 'Tenant Churn Risk', 'AI model identifies 3 tenants at risk of churning within 30 days. Proactive engagement recommended.', 'medium', 'View Risk Analysis', 88, sample_user_id);

    -- Insert sample system metrics
    INSERT INTO system_metrics (cpu_usage, memory_usage, disk_usage, response_time, active_connections, error_rate) VALUES
    (45.2, 67.8, 23.1, 120, 45, 0.02),
    (52.1, 71.3, 23.5, 135, 52, 0.01),
    (38.9, 64.2, 24.1, 98, 38, 0.03),
    (41.7, 69.5, 24.8, 110, 41, 0.01),
    (48.3, 72.1, 25.2, 125, 48, 0.02);

    -- Insert sample revenue data
    INSERT INTO revenue_tracking (amount, transaction_type, description, recorded_date) VALUES
    (15000.00, 'subscription', 'Monthly subscription payments', CURRENT_DATE - INTERVAL '1 day'),
    (8500.00, 'one_time', 'Professional services consulting', CURRENT_DATE - INTERVAL '2 days'),
    (12000.00, 'subscription', 'Enterprise plan renewals', CURRENT_DATE - INTERVAL '3 days'),
    (5500.00, 'upgrade', 'Plan upgrades and add-ons', CURRENT_DATE - INTERVAL '4 days'),
    (22000.00, 'contract', 'Annual contract payment', CURRENT_DATE - INTERVAL '5 days');

    -- Calculate initial dashboard metrics
    PERFORM calculate_dashboard_metrics();
  END IF;
END $$;

-- Create a function to generate sample user activity
CREATE OR REPLACE FUNCTION generate_sample_activity()
RETURNS void AS $$
DECLARE
  sample_user_id UUID;
  activity_actions TEXT[] := ARRAY['login', 'logout', 'view_dashboard', 'create_task', 'update_task', 'view_analytics', 'export_data', 'manage_tenant'];
  i INTEGER;
BEGIN
  SELECT id INTO sample_user_id FROM auth.users LIMIT 1;
  
  IF sample_user_id IS NOT NULL THEN
    FOR i IN 1..20 LOOP
      INSERT INTO user_activity (user_id, action, resource, created_at) VALUES
      (
        sample_user_id,
        activity_actions[1 + (random() * (array_length(activity_actions, 1) - 1))::int],
        'dashboard',
        NOW() - (random() * INTERVAL '7 days')
      );
    END LOOP;
  END IF;
END;
$$ language 'plpgsql';

-- Generate sample activity data
SELECT generate_sample_activity();

-- Create a scheduled job to mark overdue tasks (if pg_cron is available)
-- SELECT cron.schedule('mark-overdue-tasks', '0 1 * * *', 'SELECT mark_overdue_tasks();');

-- Create a scheduled job to calculate metrics (if pg_cron is available)
-- SELECT cron.schedule('calculate-metrics', '0 2 * * *', 'SELECT calculate_dashboard_metrics();');

COMMIT;
