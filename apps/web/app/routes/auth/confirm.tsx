import { redirect } from 'react-router';

import { createAuthCallbackService } from '@kit/supabase/auth';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

import pathsConfig from '~/config/paths.config';
import type { Route } from '~/types/app/routes/auth/+types/confirm';

export async function loader({ request }: Route.LoaderArgs) {
  const service = createAuthCallbackService(getSupabaseServerClient(request));

  const url = await service.verifyTokenHash(request, {
    joinTeamPath: pathsConfig.app.joinTeam,
    redirectPath: pathsConfig.app.home,
  });

  return redirect(url.href, {
    headers: request.headers,
  });
}
