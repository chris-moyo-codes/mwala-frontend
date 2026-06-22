'use client'

import { useState, useMemo } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { Input } from '@/components/shared/Input'
import { useAuth } from '@/lib/auth-context'
import {
  UserCircle2,
  Briefcase,
  Shield,
  Activity,
  Mail,
  Phone,
  Lock,
  Clock,
  CheckCircle2,
  Monitor,
  LogOut,
  ArrowRight,
  Key,
  Fingerprint
} from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'

export default function ProfilePage() {
  const { user, logout } = useAuth()

  // Mock user data for demonstration
  const mockUser = useMemo(() => ({
    name: user?.name || 'Admin User',
    email: user?.email || 'admin@mwala.com',
    role: 'Administrator',
    business: 'Mwala Business Solutions',
    lastLogin: new Date('2024-07-20T10:30:00Z'),
    activitySummary: [
      { id: 'act1', description: 'Generated Monthly Report', date: new Date('2024-07-20T09:45:00Z') },
      { id: 'act2', description: 'Updated Customer Profile (Banda Logistics)', date: new Date('2024-07-19T16:00:00Z') },
      { id: 'act3', description: 'Processed Invoice INV-2024-0012', date: new Date('2024-07-19T11:20:00Z') },
    ],
    activeSessions: [
      { id: 'sess1', device: 'Chrome on Windows (Current)', location: 'Lilongwe, Malawi', ip: '192.168.1.1', lastActive: new Date('2024-07-20T10:30:00Z') },
      { id: 'sess2', device: 'Safari on iPhone', location: 'Blantyre, Malawi', ip: '10.0.0.5', lastActive: new Date('2024-07-18T14:00:00Z') },
    ]
  }), [user]);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    // Implement password change logic here
    console.log('Changing password...');
  };

  return (
    <DashboardLayout title="My Profile">
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">My Profile</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your personal information and security settings.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 items-start">
          {/* User Information */}
          <Card className="lg:col-span-1 border-none shadow-sm ring-1 ring-slate-100">
            <CardHeader className="border-b border-slate-50">
              <CardTitle className="text-sm uppercase tracking-widest text-slate-400">Personal Details</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-[#0F172A] text-2xl font-bold">
                  {mockUser.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xl font-bold text-[#0F172A]">{mockUser.name}</p>
                  <p className="text-sm text-slate-500">{mockUser.role}</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="h-4 w-4 text-slate-300" />
                  {mockUser.email}
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Briefcase className="h-4 w-4 text-slate-300" />
                  {mockUser.business}
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Clock className="h-4 w-4 text-slate-300" />
                  Last Login: {formatDate(mockUser.lastLogin)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="lg:col-span-2 border-none shadow-sm ring-1 ring-slate-100">
            <CardHeader className="border-b border-slate-50">
              <CardTitle className="text-sm uppercase tracking-widest text-slate-400">Security & Access</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#0F172A]">Change Password</h3>
                <Input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                <Input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <Input type="password" placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <Button variant="default" onClick={handleChangePassword} className="px-8 h-12">Update Password</Button>
              </div>

              <div className="pt-6 border-t border-slate-50 space-y-4">
                <h3 className="text-lg font-bold text-[#0F172A]">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl ring-1 ring-slate-100">
                  <div className="flex items-center gap-3">
                    <Fingerprint className="h-5 w-5 text-[#0F172A]" />
                    <div>
                      <p className="text-sm font-bold text-[#0F172A]">2FA Status: Disabled</p>
                      <p className="text-xs text-slate-500">Add an extra layer of security.</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm">Enable 2FA</Button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50 space-y-4">
                <h3 className="text-lg font-bold text-[#0F172A]">Active Sessions</h3>
                <div className="space-y-3">
                  {mockUser.activeSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl ring-1 ring-slate-100">
                      <div className="flex items-center gap-4">
                        <Monitor className="h-5 w-5 text-slate-400" />
                        <div>
                          <p className="text-sm font-bold text-[#0F172A]">{session.device}</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest">{session.location} • {session.ip}</p>
                        </div>
                      </div>
                      <Button variant="ghost" className="text-xs font-bold text-red-600">Terminate</Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card className="lg:col-span-3 border-none shadow-sm ring-1 ring-slate-100">
            <CardHeader className="border-b border-slate-50">
              <CardTitle className="text-sm uppercase tracking-widest text-slate-400">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="relative pl-4 space-y-8 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {mockUser.activitySummary.map((activity) => (
                  <div key={activity.id} className="relative group">
                    <div className="absolute -left-[21px] top-1.5 h-3 w-3 rounded-full border-2 border-white ring-4 ring-white bg-[#D4A017] transition-transform group-hover:scale-125" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-[#0F172A]">{activity.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Action</span>
                        <span className="text-[10px] text-slate-300">•</span>
                        <span className="text-[10px] text-slate-400">{formatDate(activity.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}