import { redirectDocument } from 'react-router';

import { SupabaseClient } from '@supabase/supabase-js';

import process from 'node:process';
import { z } from 'zod';

import { createOtpApi } from '@kit/otp';
import { Database } from '@kit/supabase/database';
import { requireUser } from '@kit/supabase/require-user';
import { getSupabaseServerAdminClient } from '@kit/supabase/server-admin-client';

import { createDeletePersonalAccountService } from './services/delete-personal-account.service';

const emailSettings = getEmailSettingsFromEnvironment();

export const deletePersonalAccountAction = async ({
  client,
  otp,
}: {
  client: SupabaseClient<Database>;
  otp: string;
}) => {
  const auth = await requireUser(client);

  if (!auth.data) {
    return redirectDocument(auth.redirectTo);
  }

  const user = auth.data;

  // create a new instance of the personal accounts service
  const service = createDeletePersonalAccountService();

  // verify OTP
  const otpApi = createOtpApi(client);

  const result = await otpApi.verifyToken({
    purpose: 'delete-personal-account',
    userId: user.id,
    token: otp,
  });

  if (!result.valid) {
    throw new Error('Invalid OTP');
  }

  // validate the user ID matches the nonce's user ID
  if (result.user_id !== user.id) {
    throw new Error('Nonce mismatch');
  }

  // delete the user's account and cancel all subscriptions
  await service.deletePersonalAccount({
    adminClient: getSupabaseServerAdminClient(),
    userId: user.id,
    userEmail: user.email ?? null,
    emailSettings,
  });

  // sign out the user before deleting their account
  await client.auth.signOut();

  // redirect to the home page
  return redirectDocument('/');
};

function getEmailSettingsFromEnvironment() {
  return z
    .object({
      fromEmail: z
        .string({
          required_error: 'Provide the variable EMAIL_SENDER',
        })
        .min(1),
      productName: z
        .string({
          required_error: 'Provide the variable VITE_PRODUCT_NAME',
        })
        .min(1),
    })
    .parse({
      fromEmail: process.env.EMAIL_SENDER || 'noreply@dtg.com',
      productName: import.meta.env.VITE_PRODUCT_NAME || 'DTG',
    });
}
