import React from 'react';
import { ServerIcon, DatabaseIcon, HardDriveIcon, CpuIcon, AlertTriangleIcon, CheckCircleIcon, ClockIcon, RefreshCwIcon, TrendingUpIcon, TrendingDownIcon, DownloadIcon, FileTextIcon, XCircleIcon } from 'lucide-react';
export function SystemHealth() {
  return <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold">System Health</h2>
          <p className="text-sm text-gray-600">
            Monitor system performance and resource usage
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium flex items-center">
            <RefreshCwIcon className="w-4 h-4 mr-1" />
            Refresh
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium flex items-center">
            <DownloadIcon className="w-4 h-4 mr-1" />
            Export Report
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium flex items-center">
            <FileTextIcon className="w-4 h-4 mr-1" />
            System Logs
          </button>
        </div>
      </div>
      {/* System Status Overview */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h3 className="font-semibold mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <ServerIcon className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-medium">API Services</h3>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircleIcon className="w-5 h-5 mr-1" />
                <span>Operational</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <div className="flex justify-between mb-1">
                <span>Uptime</span>
                <span>99.98%</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Response Time</span>
                <span>124ms</span>
              </div>
              <div className="flex justify-between">
                <span>Last Incident</span>
                <span>23d ago</span>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <DatabaseIcon className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-medium">Database</h3>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircleIcon className="w-5 h-5 mr-1" />
                <span>Operational</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <div className="flex justify-between mb-1">
                <span>Uptime</span>
                <span>99.99%</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Query Time</span>
                <span>45ms</span>
              </div>
              <div className="flex justify-between">
                <span>Last Backup</span>
                <span>2h ago</span>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                  <HardDriveIcon className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="font-medium">Storage</h3>
              </div>
              <div className="flex items-center text-yellow-600">
                <AlertTriangleIcon className="w-5 h-5 mr-1" />
                <span>Warning</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <div className="flex justify-between mb-1">
                <span>Usage</span>
                <span>82%</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Available</span>
                <span>36.4 GB</span>
              </div>
              <div className="flex justify-between">
                <span>Growth Rate</span>
                <span>+2.1%/week</span>
              </div>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg mr-3">
                  <CpuIcon className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="font-medium">CDN</h3>
              </div>
              <div className="flex items-center text-red-600">
                <XCircleIcon className="w-5 h-5 mr-1" />
                <span>Degraded</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <div className="flex justify-between mb-1">
                <span>Uptime</span>
                <span>97.32%</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Response Time</span>
                <span>312ms</span>
              </div>
              <div className="flex justify-between">
                <span>Incident</span>
                <span>Ongoing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Resource Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">CPU Usage</h3>
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="w-4 h-4 mr-1" />
              <span>Updated 2 minutes ago</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between mb-1 text-sm">
              <span>Current Usage</span>
              <span>42%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{
              width: '42%'
            }}></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">Average</div>
              <div className="flex items-center">
                <span className="text-lg font-semibold">38%</span>
                <div className="flex items-center text-green-600 ml-2 text-xs">
                  <TrendingDownIcon className="w-3 h-3 mr-1" />
                  <span>-4%</span>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">Peak</div>
              <div className="flex items-center">
                <span className="text-lg font-semibold">78%</span>
                <div className="flex items-center text-red-600 ml-2 text-xs">
                  <TrendingUpIcon className="w-3 h-3 mr-1" />
                  <span>+12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Memory Usage</h3>
            <div className="flex items-center text-sm text-gray-500">
              <ClockIcon className="w-4 h-4 mr-1" />
              <span>Updated 2 minutes ago</span>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between mb-1 text-sm">
              <span>Current Usage</span>
              <span>5.2 GB / 8 GB (65%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{
              width: '65%'
            }}></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">Average</div>
              <div className="flex items-center">
                <span className="text-lg font-semibold">4.8 GB</span>
                <div className="flex items-center text-green-600 ml-2 text-xs">
                  <TrendingDownIcon className="w-3 h-3 mr-1" />
                  <span>-2%</span>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-1">Peak</div>
              <div className="flex items-center">
                <span className="text-lg font-semibold">6.7 GB</span>
                <div className="flex items-center text-red-600 ml-2 text-xs">
                  <TrendingUpIcon className="w-3 h-3 mr-1" />
                  <span>+8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Errors & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Errors</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View all
            </button>
          </div>
          <div className="space-y-3">
            <div className="border-l-4 border-red-500 pl-3 py-1">
              <div className="flex justify-between">
                <div className="font-medium">Database Connection Timeout</div>
                <div className="text-xs text-gray-500">3h ago</div>
              </div>
              <div className="text-sm text-gray-600">
                Error connecting to database: Connection timed out after 30s
              </div>
            </div>
            <div className="border-l-4 border-yellow-500 pl-3 py-1">
              <div className="flex justify-between">
                <div className="font-medium">API Rate Limit Exceeded</div>
                <div className="text-xs text-gray-500">5h ago</div>
              </div>
              <div className="text-sm text-gray-600">
                Client 192.168.1.45 exceeded rate limit (100 req/min)
              </div>
            </div>
            <div className="border-l-4 border-red-500 pl-3 py-1">
              <div className="flex justify-between">
                <div className="font-medium">File Upload Failed</div>
                <div className="text-xs text-gray-500">Yesterday</div>
              </div>
              <div className="text-sm text-gray-600">
                S3 storage error: Permission denied for bucket 'user-uploads'
              </div>
            </div>
            <div className="border-l-4 border-yellow-500 pl-3 py-1">
              <div className="flex justify-between">
                <div className="font-medium">Cache Invalidation Error</div>
                <div className="text-xs text-gray-500">Yesterday</div>
              </div>
              <div className="text-sm text-gray-600">
                Failed to invalidate CDN cache for path /assets/*
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">API Performance</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View details
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Endpoint
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Response
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requests
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Error Rate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">/api/businesses</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">87ms</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">24.5k</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-green-600">0.02%</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">/api/reviews</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">124ms</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">18.7k</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-green-600">0.05%</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">/api/search</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">215ms</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">32.1k</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-yellow-600">0.18%</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">/api/users</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">95ms</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">12.3k</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-green-600">0.03%</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">/api/media</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">312ms</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm">8.4k</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-red-600">1.24%</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>;
}