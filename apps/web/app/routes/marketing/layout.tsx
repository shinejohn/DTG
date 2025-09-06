import { LoaderFunctionArgs, Outlet, useLoaderData } from 'react-router';

import { requireUser } from '@kit/supabase/require-user';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

// DTG/Magic Patterns components
import { Header } from '~/components/dtg/Header';
import { Footer } from '~/components/dtg/Footer';
import { BrandProvider } from '~/components/dtg/contexts/BrandContext';

export async function loader(args: LoaderFunctionArgs) {
  const supabase = getSupabaseServerClient(args.request);
  const { data } = await requireUser(supabase);

  return {
    user: data,
  };
}

export default function MarketingLayout() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <BrandProvider>
      <div className={'flex min-h-[100vh] flex-col bg-white'}>
        <Header 
          siteName="Downtown Guide" 
          showHero={false}
        />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </BrandProvider>
  );
}
