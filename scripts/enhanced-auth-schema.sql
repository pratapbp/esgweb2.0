-- Enhanced Authentication Schema for ESGit Platform
-- This script creates a comprehensive authentication system with security features

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS email_verification_tokens CASCADE;
DROP TABLE IF EXISTS password_reset_tokens CASCADE;
DROP TABLE IF EXISTS user_sessions CASCADE;
DROP TABLE IF EXISTS user_login_history CASCADE;
DROP TABLE IF EXISTS user_preferences CASCADE;
DROP TABLE IF EXISTS user_security_settings CASCADE;

-- Enhanced profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'hr_manager', 'user', 'viewer')),
    department TEXT,
    job_title TEXT,
    phone_number TEXT,
    
    -- Account status
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    email_verified_at TIMESTAMPTZ,
    
    -- Security tracking
    failed_login_attempts INTEGER DEFAULT 0,
    account_locked_until TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    login_count INTEGER DEFAULT 0,
    password_changed_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id)
);

-- User security settings
CREATE TABLE user_security_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Multi-factor authentication
    mfa_enabled BOOLEAN DEFAULT false,
    mfa_secret TEXT, -- TOTP secret
    backup_codes TEXT[], -- Array of backup codes
    
    -- Session management
    max_concurrent_sessions INTEGER DEFAULT 3,
    session_timeout_minutes INTEGER DEFAULT 480, -- 8 hours
    require_password_change BOOLEAN DEFAULT false,
    password_expires_at TIMESTAMPTZ,
    
    -- Security preferences
    login_notifications BOOLEAN DEFAULT true,
    suspicious_activity_alerts BOOLEAN DEFAULT true,
    allowed_ip_addresses TEXT[], -- Array of allowed IPs (optional)
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User preferences
CREATE TABLE user_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- UI preferences
    theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
    language TEXT DEFAULT 'en',
    timezone TEXT DEFAULT 'UTC',
    date_format TEXT DEFAULT 'MM/DD/YYYY',
    
    -- Notification preferences
    email_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT true,
    marketing_emails BOOLEAN DEFAULT false,
    
    -- Dashboard preferences
    dashboard_layout JSONB DEFAULT '{}',
    favorite_modules TEXT[] DEFAULT '{}',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User login history
CREATE TABLE user_login_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    
    -- Login details
    login_at TIMESTAMPTZ DEFAULT NOW(),
    logout_at TIMESTAMPTZ,
    success BOOLEAN NOT NULL,
    failure_reason TEXT,
    
    -- Device and location info
    ip_address INET,
    user_agent TEXT,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    country TEXT,
    city TEXT,
    
    -- Session info
    session_id TEXT,
    duration_minutes INTEGER,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Active user sessions
CREATE TABLE user_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    session_token TEXT UNIQUE NOT NULL,
    
    -- Session details
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL,
    last_activity_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Device info
    ip_address INET,
    user_agent TEXT,
    device_type TEXT,
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    revoked_at TIMESTAMPTZ,
    revoked_by UUID REFERENCES profiles(id)
);

-- Password reset tokens
CREATE TABLE password_reset_tokens (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    token TEXT UNIQUE NOT NULL,
    
    -- Token details
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '1 hour'),
    used_at TIMESTAMPTZ,
    
    -- Security
    ip_address INET,
    user_agent TEXT
);

-- Email verification tokens
CREATE TABLE email_verification_tokens (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    email TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    
    -- Token details
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours'),
    verified_at TIMESTAMPTZ,
    
    -- Security
    ip_address INET
);

-- Comprehensive audit log
CREATE TABLE audit_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Event details
    event_type TEXT NOT NULL, -- 'login', 'logout', 'password_change', 'profile_update', etc.
    event_description TEXT NOT NULL,
    severity TEXT DEFAULT 'info' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    
    -- User context
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    affected_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    
    -- Request context
    ip_address INET,
    user_agent TEXT,
    request_path TEXT,
    request_method TEXT,
    
    -- Additional data
    metadata JSONB DEFAULT '{}',
    
    -- Timestamp
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_is_active ON profiles(is_active);
CREATE INDEX idx_profiles_last_login ON profiles(last_login_at);

CREATE INDEX idx_user_login_history_user_id ON user_login_history(user_id);
CREATE INDEX idx_user_login_history_login_at ON user_login_history(login_at);
CREATE INDEX idx_user_login_history_success ON user_login_history(success);
CREATE INDEX idx_user_login_history_ip ON user_login_history(ip_address);

CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_expires_at ON user_sessions(expires_at);
CREATE INDEX idx_user_sessions_is_active ON user_sessions(is_active);

CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);

CREATE INDEX idx_email_verification_tokens_token ON email_verification_tokens(token);
CREATE INDEX idx_email_verification_tokens_expires_at ON email_verification_tokens(expires_at);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_event_type ON audit_logs(event_type);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_severity ON audit_logs(severity);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_security_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_login_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can update all profiles" ON profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for user_security_settings
CREATE POLICY "Users can view own security settings" ON user_security_settings
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own security settings" ON user_security_settings
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all security settings" ON user_security_settings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for user_preferences
CREATE POLICY "Users can manage own preferences" ON user_preferences
    FOR ALL USING (user_id = auth.uid());

-- RLS Policies for user_login_history
CREATE POLICY "Users can view own login history" ON user_login_history
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all login history" ON user_login_history
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for user_sessions
CREATE POLICY "Users can view own sessions" ON user_sessions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own sessions" ON user_sessions
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can view all sessions" ON user_sessions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for audit_logs
CREATE POLICY "Admins can view audit logs" ON audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Functions for authentication workflow

-- Function to handle successful login
CREATE OR REPLACE FUNCTION handle_user_login(
    p_user_id UUID,
    p_ip_address INET DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
    -- Update profile with login info
    UPDATE profiles 
    SET 
        last_login_at = NOW(),
        login_count = login_count + 1,
        failed_login_attempts = 0,
        account_locked_until = NULL,
        updated_at = NOW()
    WHERE id = p_user_id;
    
    -- Log successful login
    INSERT INTO user_login_history (
        user_id, success, ip_address, user_agent
    ) VALUES (
        p_user_id, true, p_ip_address, p_user_agent
    );
    
    -- Log audit event
    INSERT INTO audit_logs (
        event_type, event_description, user_id, ip_address, user_agent, severity
    ) VALUES (
        'login_success', 'User successfully logged in', p_user_id, p_ip_address, p_user_agent, 'low'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle failed login
CREATE OR REPLACE FUNCTION handle_failed_login(
    p_email TEXT,
    p_ip_address INET DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL,
    p_failure_reason TEXT DEFAULT 'Invalid credentials'
) RETURNS VOID AS $$
DECLARE
    v_user_id UUID;
    v_failed_attempts INTEGER;
BEGIN
    -- Get user ID and current failed attempts
    SELECT id, failed_login_attempts INTO v_user_id, v_failed_attempts
    FROM profiles WHERE email = p_email;
    
    IF v_user_id IS NOT NULL THEN
        -- Increment failed attempts
        v_failed_attempts := v_failed_attempts + 1;
        
        -- Update profile
        UPDATE profiles 
        SET 
            failed_login_attempts = v_failed_attempts,
            account_locked_until = CASE 
                WHEN v_failed_attempts >= 5 THEN NOW() + INTERVAL '30 minutes'
                ELSE account_locked_until
            END,
            updated_at = NOW()
        WHERE id = v_user_id;
        
        -- Log failed login
        INSERT INTO user_login_history (
            user_id, success, failure_reason, ip_address, user_agent
        ) VALUES (
            v_user_id, false, p_failure_reason, p_ip_address, p_user_agent
        );
        
        -- Log audit event
        INSERT INTO audit_logs (
            event_type, event_description, user_id, ip_address, user_agent, 
            severity, metadata
        ) VALUES (
            'login_failed', 
            'Failed login attempt: ' || p_failure_reason, 
            v_user_id, 
            p_ip_address, 
            p_user_agent,
            CASE WHEN v_failed_attempts >= 5 THEN 'high' ELSE 'medium' END,
            jsonb_build_object('failed_attempts', v_failed_attempts, 'email', p_email)
        );
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to unlock user account (admin only)
CREATE OR REPLACE FUNCTION unlock_user_account(p_user_id UUID) 
RETURNS VOID AS $$
BEGIN
    UPDATE profiles 
    SET 
        failed_login_attempts = 0,
        account_locked_until = NULL,
        updated_at = NOW()
    WHERE id = p_user_id;
    
    -- Log audit event
    INSERT INTO audit_logs (
        event_type, event_description, user_id, affected_user_id, severity
    ) VALUES (
        'account_unlocked', 'User account manually unlocked by admin', auth.uid(), p_user_id, 'medium'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to cleanup expired tokens
CREATE OR REPLACE FUNCTION cleanup_expired_tokens() 
RETURNS INTEGER AS $$
DECLARE
    v_deleted_count INTEGER := 0;
BEGIN
    -- Clean up expired password reset tokens
    DELETE FROM password_reset_tokens WHERE expires_at < NOW();
    GET DIAGNOSTICS v_deleted_count = ROW_COUNT;
    
    -- Clean up expired email verification tokens
    DELETE FROM email_verification_tokens WHERE expires_at < NOW();
    
    -- Clean up expired sessions
    DELETE FROM user_sessions WHERE expires_at < NOW();
    
    -- Log cleanup
    INSERT INTO audit_logs (
        event_type, event_description, severity, metadata
    ) VALUES (
        'token_cleanup', 'Expired tokens cleaned up', 'low',
        jsonb_build_object('deleted_count', v_deleted_count)
    );
    
    RETURN v_deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
    -- Create profile
    INSERT INTO profiles (id, email, email_verified, created_at)
    VALUES (
        NEW.id, 
        NEW.email, 
        NEW.email_confirmed_at IS NOT NULL,
        NEW.created_at
    );
    
    -- Create default security settings
    INSERT INTO user_security_settings (user_id)
    VALUES (NEW.id);
    
    -- Create default preferences
    INSERT INTO user_preferences (user_id)
    VALUES (NEW.id);
    
    -- Log audit event
    INSERT INTO audit_logs (
        event_type, event_description, user_id, severity
    ) VALUES (
        'user_created', 'New user account created', NEW.id, 'low'
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_security_settings_updated_at BEFORE UPDATE ON user_security_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create a view for user security dashboard
CREATE OR REPLACE VIEW user_security_dashboard AS
SELECT 
    p.id,
    p.email,
    p.full_name,
    p.role,
    p.is_active,
    p.email_verified,
    p.failed_login_attempts,
    p.account_locked_until,
    p.last_login_at,
    p.login_count,
    uss.mfa_enabled,
    uss.max_concurrent_sessions,
    (SELECT COUNT(*) FROM user_sessions WHERE user_id = p.id AND is_active = true) as active_sessions,
    (SELECT COUNT(*) FROM user_login_history WHERE user_id = p.id AND login_at > NOW() - INTERVAL '24 hours') as logins_24h,
    (SELECT COUNT(*) FROM user_login_history WHERE user_id = p.id AND success = false AND login_at > NOW() - INTERVAL '24 hours') as failed_logins_24h
FROM profiles p
LEFT JOIN user_security_settings uss ON p.id = uss.user_id;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Insert default admin user (if needed)
-- This should be done after the first user signs up through the normal flow
-- The trigger will automatically create the profile and settings

COMMENT ON TABLE profiles IS 'Enhanced user profiles with security tracking';
COMMENT ON TABLE user_security_settings IS 'User-specific security settings and MFA configuration';
COMMENT ON TABLE user_preferences IS 'User interface and notification preferences';
COMMENT ON TABLE user_login_history IS 'Complete history of login attempts with device information';
COMMENT ON TABLE user_sessions IS 'Active user sessions with expiration and device tracking';
COMMENT ON TABLE password_reset_tokens IS 'Secure password reset tokens with expiration';
COMMENT ON TABLE email_verification_tokens IS 'Email verification tokens for account activation';
COMMENT ON TABLE audit_logs IS 'Comprehensive audit trail for security and compliance';

-- Schedule token cleanup (run every hour)
-- Note: This would typically be set up as a cron job or scheduled function
-- SELECT cron.schedule('cleanup-expired-tokens', '0 * * * *', 'SELECT cleanup_expired_tokens();');
