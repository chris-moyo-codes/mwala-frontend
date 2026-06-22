'use client'

import { useState, useEffect } from 'react' // Added useEffect for form data persistence
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/shared/Card'
import { Button } from '@/components/shared/Button'
import { Input } from '@/components/shared/Input'
import { 
  User, 
  Bell, 
  Lock, 
  Palette, 
  Users, 
  Globe, 
  Building2, 
  Shield, 
  CheckCircle2,
  Plus,
  Monitor
} from 'lucide-react'

type SettingsTab = 'business' | 'branding' | 'security' | 'notifications' | 'preferences' | 'team'

export default function SettingsPage() {
  // State for active tab
  const [activeTab, setActiveTab] = useState<SettingsTab>('business')
  const [formData, setFormData] = useState({
    businessName: 'Mwala Business Solutions',
    regNumber: 'MB-2024-9981',
    taxId: 'TPIN-8872661',
    email: 'admin@mwala.local',
    phone: '+265 1 234 567',
    address: 'Lilongwe, Malawi',
  })
  // State for notification toggles
  const [notificationToggles, setNotificationToggles] = useState({
    invoiceReminders: true,
    paymentAlerts: true,
    emailNotifications: true,
  });
  // State for preferences
  const [preferences, setPreferences] = useState({
    currency: 'Malawian Kwacha (MK)',
    dateFormat: 'DD/MM/YYYY',
    timezone: '(GMT+02:00) Central Africa Time',
  });

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }
  
  const handleNotificationToggle = (key: keyof typeof notificationToggles) => {
    setNotificationToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePreferenceChange = (field: keyof typeof preferences, value: string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'business' as SettingsTab, label: 'Business Profile', icon: Building2 },
    { id: 'branding' as SettingsTab, label: 'Branding', icon: Palette },
    { id: 'security' as SettingsTab, label: 'Security', icon: Lock },
    { id: 'notifications' as SettingsTab, label: 'Notifications', icon: Bell },
    { id: 'preferences' as SettingsTab, label: 'Preferences', icon: Globe },
    { id: 'team' as SettingsTab, label: 'Team Management', icon: Users },
  ]

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#0F172A] sm:text-5xl">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account and application settings
          </p>
        </div>

        {/* Settings layout */}
        <div className="grid gap-8 lg:grid-cols-4 items-start">
          {/* Sidebar tabs */}
          <div className="lg:col-span-1">
            <Card className="border-none shadow-sm ring-1 ring-slate-100 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-3 px-6 py-5 text-sm font-bold transition-all ${
                          activeTab === tab.id
                            ? 'bg-[#0F172A] text-white border-l-4 border-[#D4A017]'
                            : 'text-slate-500 hover:bg-slate-50 hover:text-[#0F172A] border-l-4 border-transparent'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Business Profile */}
            {activeTab === 'business' && (
              <Card className="border-none shadow-sm ring-1 ring-slate-100">
                <CardHeader className="border-b border-slate-50">
                  <CardTitle className="text-sm uppercase tracking-widest text-slate-400">Institutional Identity</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Business Legal Name</label>
                      <Input value={formData.businessName} onChange={(e) => handleFormChange('businessName', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Registration Number</label>
                      <Input value={formData.regNumber} onChange={(e) => handleFormChange('regNumber', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Tax ID / TPIN</label>
                      <Input value={formData.taxId} onChange={(e) => handleFormChange('taxId', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Email for Records</label>
                      <Input type="email" value={formData.email} onChange={(e) => handleFormChange('email', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Phone Number</label>
                      <Input value={formData.phone} onChange={(e) => handleFormChange('phone', e.target.value)} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Physical Address</label>
                      <Input value={formData.address} onChange={(e) => handleFormChange('address', e.target.value)} />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Button variant="default" className="px-10 h-12 shadow-lg shadow-slate-200">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Branding */}
            {activeTab === 'branding' && (
              <Card className="border-none shadow-sm ring-1 ring-slate-100">
                <CardHeader className="border-b border-slate-50">
                  <CardTitle className="text-sm uppercase tracking-widest text-slate-400">Brand Assets</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="space-y-4 flex-1">
                      <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center bg-white group hover:border-[#D4A017] transition-colors cursor-pointer">
                        <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-[#D4A017]/10">
                          <Palette className="h-6 w-6 text-slate-400 group-hover:text-[#D4A017]" />
                        </div>
                        <p className="text-sm font-bold text-[#0F172A]">Upload Primary Logo</p>
                        <p className="text-xs text-slate-400 mt-1">PNG or SVG. Recommended 512x512px.</p>
                      </div>
                    </div>
                    <div className="space-y-6 flex-1">
                      <div className="space-y-4">
                        <p className="text-xs font-bold text-[#0F172A] uppercase tracking-widest">Document Customization</p>
                        <div className="space-y-3">
                          {[
                            { label: 'Invoice Branding', desc: 'Apply logo and colors to all invoices' },
                            { label: 'Receipt Branding', desc: 'Apply logo and colors to digital receipts' },
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white rounded-xl ring-1 ring-slate-100">
                              <div>
                                <p className="text-sm font-bold text-[#0F172A]">{item.label}</p>
                                <p className="text-[10px] text-slate-400">{item.desc}</p>
                              </div>
                              <div className="h-5 w-10 bg-[#D4A017] rounded-full relative">
                                <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full shadow-sm" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security */}
            {activeTab === 'security' && (
              <Card className="border-none shadow-sm ring-1 ring-slate-100">
                <CardHeader className="border-b border-slate-50">
                  <CardTitle className="text-sm uppercase tracking-widest text-slate-400">Security & Access</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-10">
                  <div className="max-w-md space-y-4">
                    <h3 className="text-lg font-bold text-[#0F172A]">Change Password</h3>
                    <div className="space-y-4">
                      <Input type="password" placeholder="Current Password" />
                      <Input type="password" placeholder="New Password" />
                      <Button className="bg-[#0F172A] text-white font-bold h-12 px-8">Update Security</Button>
                    </div>
                  </div>
                  
                  <div className="pt-10 border-t border-slate-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-[#0F172A]">Two-Factor Authentication</h3>
                        <p className="text-sm text-slate-400">Add an extra layer of security to your enterprise account.</p>
                      </div>
                      <span className="text-[10px] font-black bg-[#D4A017]/10 text-[#D4A017] px-3 py-1 rounded-full uppercase tracking-widest">Coming Soon</span>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-slate-50">
                    <h3 className="text-lg font-bold text-[#0F172A] mb-4">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center gap-4">
                          <Monitor className="h-5 w-5 text-slate-400" />
                          <div>
                            <p className="text-sm font-bold text-[#0F172A]">Chrome on Windows (Current)</p>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Lilongwe, Malawi • 192.168.1.1</p>
                          </div>
                        </div>
                        <Button variant="ghost" className="text-xs font-bold text-red-600">Terminate</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notifications */}
            {activeTab === 'notifications' && (
              <Card className="border-none shadow-sm ring-1 ring-slate-100">
                <CardHeader className="border-b border-slate-50">
                  <CardTitle className="text-sm uppercase tracking-widest text-slate-400">Automated Communication</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-4">
                    {[
                      { label: 'Invoice Reminders', desc: 'Send automatic reminders to customers for overdue payments' },
                      { label: 'Payment Alerts', desc: 'Notify team when a payment is recorded in the ledger' },
                      { label: 'System Email Notifications', desc: 'Receive daily business digests and security alerts' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-6 bg-white rounded-2xl ring-1 ring-slate-100 hover:ring-[#D4A017]/30 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center">
                            <Bell className="h-5 w-5 text-[#0F172A]" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#0F172A]">{item.label}</p>
                            <p className="text-xs text-slate-400">{item.desc}</p>
                          </div>
                        </div>
                        <div className="h-6 w-11 bg-[#D4A017] rounded-full relative cursor-pointer shadow-inner">
                          <div className="absolute right-1 top-1 h-4 w-4 bg-white rounded-full shadow-sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Preferences */}
            {activeTab === 'preferences' && (
              <Card className="border-none shadow-sm ring-1 ring-slate-100">
                <CardHeader className="border-b border-slate-50">
                  <CardTitle className="text-sm uppercase tracking-widest text-slate-400">Regional & Display</CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Base Currency</label>
                      <select value={preferences.currency} onChange={(e) => handlePreferenceChange('currency', e.target.value)} className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-[#D4A017]/20 outline-none">
                        <option>Malawian Kwacha (MK)</option>
                        <option>US Dollar ($)</option>
                        <option>ZAR (R)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Date Format</label>
                      <select value={preferences.dateFormat} onChange={(e) => handlePreferenceChange('dateFormat', e.target.value)} className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm font-medium">
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">Timezone</label>
                      <select value={preferences.timezone} onChange={(e) => handlePreferenceChange('timezone', e.target.value)} className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm font-medium">
                        <option>(GMT+02:00) Central Africa Time</option>
                        <option>(GMT+00:00) Greenwich Mean Time</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="default" className="px-10 h-12 shadow-lg shadow-slate-200">Save Preferences</Button>
                </CardFooter>
              </Card>
            )}

            {/* Team Management */}
            {activeTab === 'team' && (
              <Card className="border-none shadow-sm ring-1 ring-slate-100 overflow-hidden">
                <CardHeader className="border-b border-slate-50 bg-slate-50/50 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm uppercase tracking-widest text-slate-400">Collaborators</CardTitle>
                  <Button variant="default" size="sm" className="gap-2">
                    <Plus size={14} />
                    Invite Member
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {[
                        { name: 'Chisomo Banda', email: 'c.banda@mwala.local', role: 'Owner', status: 'Active' },
                        { name: 'Sarah Phiri', email: 's.phiri@mwala.local', role: 'Accountant', status: 'Active' },
                      ].map((member, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-[#0F172A]">{member.name}</p>
                            <p className="text-xs text-slate-400">{member.email}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-medium text-slate-600">{member.role}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              <span className="text-xs font-bold text-emerald-600">{member.status}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-600">Remove</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
