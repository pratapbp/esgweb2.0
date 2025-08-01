-- Create workshop_signups table
CREATE TABLE IF NOT EXISTS workshop_signups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    workshop_type VARCHAR(50) NOT NULL DEFAULT 'general',
    billing_model VARCHAR(50),
    monthly_transactions VARCHAR(50),
    current_system VARCHAR(255),
    goals TEXT[],
    challenges TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_workshop_signups_email ON workshop_signups(email);
CREATE INDEX IF NOT EXISTS idx_workshop_signups_type ON workshop_signups(workshop_type);
CREATE INDEX IF NOT EXISTS idx_workshop_signups_status ON workshop_signups(status);
CREATE INDEX IF NOT EXISTS idx_workshop_signups_created_at ON workshop_signups(created_at);

-- Enable RLS
ALTER TABLE workshop_signups ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to insert their own signups
CREATE POLICY "Users can insert workshop signups" ON workshop_signups
    FOR INSERT WITH CHECK (true);

-- Create policy for admins to view all signups
CREATE POLICY "Admins can view all workshop signups" ON workshop_signups
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Create policy for admins to update signups
CREATE POLICY "Admins can update workshop signups" ON workshop_signups
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );
