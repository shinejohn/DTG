import React from 'react';
import { useLoaderData, useRouteError, isRouteErrorResponse } from 'react-router';
import { getSupabaseServerClient } from '@kit/supabase/server-client';
import AdminLayout from '../../../components/dtg/layouts/AdminLayout';
import BrandConfiguration from '../../../components/dtg/admin/BrandConfiguration';
import { useBrand } from '../../../components/dtg/contexts/BrandContext';
export default function BrandConfigPage() {
  return <AdminLayout title="Brand Configuration" subtitle="Manage your brand settings and appearance">
      <div className="space-y-6">
        <BrandConfiguration />
      </div>
    </AdminLayout>;
}
