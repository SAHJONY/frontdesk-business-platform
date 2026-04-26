import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { COMPANY_CONFIG } from '@/config/company'
import { useQuery } from '@tanstack/react-query'

interface Property {
  id: string
  address: string
  status: 'active' | 'under-contract' | 'sold' | 'expired'
  acquisitionPrice: number
  estimatedValue: number
  daysOnMarket: number
}

interface Lead {
  id: string
  name: string
  phone: string
  status: 'new' | 'contacted' | 'qualified' | 'converted'
  source: 'cold-call' | 'referral' | 'website' | 'driving-for-dollars'
}

interface Deal {
  id: string
  propertyAddress: string
  buyerName: string
  status: 'pending' | 'under-contract' | 'closed' | 'cancelled'
  assignmentFee: number
  estimatedCloseDate: string
}

interface PortfolioMetrics {
  totalProperties: number
  activeDeals: number
  closedDeals: number
  totalRevenue: number
  averageArv: number
  averageProfitMargin: number
}

export function RealEstateDashboard() {
  const [selectedTab, setSelectedTab] = useState<'properties' | 'leads' | 'deals' | 'metrics'>('metrics')

  // Mock data for demonstration
  const properties: Property[] = [
    {
      id: '1',
      address: '123 Main St, Anytown, CA 90210',
      status: 'active',
      acquisitionPrice: 250000,
      estimatedValue: 350000,
      daysOnMarket: 15
    },
    {
      id: '2',
      address: '456 Oak Ave, Somewhere, TX 75001',
      status: 'under-contract',
      acquisitionPrice: 180000,
      estimatedValue: 240000,
      daysOnMarket: 7
    },
    {
      id: '3',
      address: '789 Pine Rd, Elsewhere, FL 33101',
      status: 'sold',
      acquisitionPrice: 320000,
      estimatedValue: 410000,
      daysOnMarket: 30
    }
  ]

  const leads: Lead[] = [
    {
      id: '1',
      name: 'John Smith',
      phone: '+1-555-0123',
      status: 'new',
      source: 'cold-call'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      phone: '+1-555-0456',
      status: 'contacted',
      source: 'referral'
    },
    {
      id: '3',
      name: 'Mike Davis',
      phone: '+1-555-0789',
      status: 'qualified',
      source: 'website'
    }
  ]

  const deals: Deal[] = [
    {
      id: '1',
      propertyAddress: '123 Main St, Anytown, CA 90210',
      buyerName: 'ABC Investments',
      status: 'under-contract',
      assignmentFee: 15000,
      estimatedCloseDate: '2024-02-15'
    },
    {
      id: '2',
      propertyAddress: '456 Oak Ave, Somewhere, TX 75001',
      buyerName: 'XYZ Holdings',
      status: 'pending',
      assignmentFee: 12000,
      estimatedCloseDate: '2024-02-28'
    }
  ]

  const portfolioMetrics: PortfolioMetrics = {
    totalProperties: 25,
    activeDeals: 8,
    closedDeals: 17,
    totalRevenue: 285000,
    averageArv: 375000,
    averageProfitMargin: 0.35
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'under-contract': return 'secondary'
      case 'sold': return 'success'
      case 'expired': return 'destructive'
      case 'new': return 'default'
      case 'contacted': return 'secondary'
      case 'qualified': return 'warning'
      case 'converted': return 'success'
      case 'pending': return 'secondary'
      case 'closed': return 'success'
      case 'cancelled': return 'destructive'
      default: return 'default'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Real Estate Dashboard</h1>
          <p className="text-muted-foreground">
            {COMPANY_CONFIG.name} - {COMPANY_CONFIG.description}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">New Property</Button>
          <Button>Generate Leads</Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b pb-2">
        {(['metrics', 'properties', 'leads', 'deals'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
              selectedTab === tab
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {selectedTab === 'metrics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{portfolioMetrics.totalProperties}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{portfolioMetrics.activeDeals}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  75% conversion rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${portfolioMetrics.totalRevenue.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  ${(portfolioMetrics.totalRevenue / portfolioMetrics.closedDeals).toLocaleString()} average per deal
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average ARV</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${portfolioMetrics.averageArv.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  After Repair Value
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(portfolioMetrics.averageProfitMargin * 100).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  Average across all deals
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Closed Deals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{portfolioMetrics.closedDeals}</div>
                <p className="text-xs text-muted-foreground">
                  Success rate: 68%
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === 'properties' && (
          <div className="space-y-4">
            {properties.map((property) => (
              <Card key={property.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{property.address}</CardTitle>
                      <CardDescription>
                        Acquisition: ${property.acquisitionPrice.toLocaleString()} | 
                        Estimated Value: ${property.estimatedValue.toLocaleString()}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusBadgeVariant(property.status)}>
                      {property.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Days on Market: {property.daysOnMarket}</span>
                    <span>Potential Profit: ${(property.estimatedValue - property.acquisitionPrice).toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === 'leads' && (
          <div className="space-y-4">
            {leads.map((lead) => (
              <Card key={lead.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{lead.name}</CardTitle>
                      <CardDescription>{lead.phone} | Source: {lead.source}</CardDescription>
                    </div>
                    <Badge variant={getStatusBadgeVariant(lead.status)}>
                      {lead.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Call</Button>
                    <Button size="sm" variant="outline">Email</Button>
                    <Button size="sm" variant="outline">Text</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === 'deals' && (
          <div className="space-y-4">
            {deals.map((deal) => (
              <Card key={deal.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{deal.propertyAddress}</CardTitle>
                      <CardDescription>
                        Buyer: {deal.buyerName} | Assignment Fee: ${deal.assignmentFee.toLocaleString()}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusBadgeVariant(deal.status)}>
                      {deal.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Estimated Close: {deal.estimatedCloseDate}</span>
                    <span>Status: {deal.status}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}