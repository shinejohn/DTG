import React from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { BrandConfiguration } from '../../components/admin/BrandConfiguration';
import { useBrand } from '../../contexts/BrandContext';
export function BrandConfigPage() {
  return <AdminLayout title="Brand Configuration" subtitle="Manage your brand settings and appearance">
      <div className="space-y-6">
        <BrandConfiguration />
      </div>
    </AdminLayout>;
}