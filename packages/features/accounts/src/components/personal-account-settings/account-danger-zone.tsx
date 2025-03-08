'use client';

import { useFetcher } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useForm, useWatch } from 'react-hook-form';

import { ErrorBoundary } from '@kit/monitoring/components';
import { VerifyOtpForm } from '@kit/otp/components';
import { useUser } from '@kit/supabase/hooks/use-user';
import { Alert, AlertDescription, AlertTitle } from '@kit/ui/alert';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@kit/ui/alert-dialog';
import { Button } from '@kit/ui/button';
import { Form } from '@kit/ui/form';
import { Trans } from '@kit/ui/trans';

import { DeleteAccountFormSchema } from '../../schema/delete-personal-account.schema';

export function AccountDangerZone() {
  return (
    <div className={'flex flex-col space-y-4'}>
      <div className={'flex flex-col space-y-1'}>
        <span className={'text-sm font-medium'}>
          <Trans i18nKey={'account:deleteAccount'} />
        </span>

        <p className={'text-muted-foreground text-sm'}>
          <Trans i18nKey={'account:deleteAccountDescription'} />
        </p>
      </div>

      <div>
        <DeleteAccountModal />
      </div>
    </div>
  );
}

function DeleteAccountModal() {
  const { data: user } = useUser();

  if (!user?.email) {
    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button data-test={'delete-account-button'} variant={'destructive'}>
          <Trans i18nKey={'account:deleteAccount'} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent onEscapeKeyDown={(e) => e.preventDefault()}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Trans i18nKey={'account:deleteAccount'} />
          </AlertDialogTitle>
        </AlertDialogHeader>

        <ErrorBoundary fallback={<DeleteAccountErrorAlert />}>
          <DeleteAccountForm email={user.email} />
        </ErrorBoundary>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DeleteAccountForm(props: { email: string }) {
  const form = useForm({
    resolver: zodResolver(DeleteAccountFormSchema),
    defaultValues: {
      otp: '',
    },
  });

  const { otp } = useWatch({ control: form.control });
  const fetcher = useFetcher();

  if (!otp) {
    return (
      <VerifyOtpForm
        purpose={'delete-personal-account'}
        email={props.email}
        onSuccess={(otp) => form.setValue('otp', otp, { shouldValidate: true })}
        CancelButton={
          <AlertDialogCancel>
            <Trans i18nKey={'common:cancel'} />
          </AlertDialogCancel>
        }
      />
    );
  }

  const pending = fetcher.state === 'submitting';

  return (
    <Form {...form}>
      <form
        data-test={'delete-account-form'}
        className={'flex flex-col space-y-4'}
        onSubmit={form.handleSubmit((data) => {
          return fetcher.submit(
            {
              intent: 'delete-account',
              payload: data,
            },
            {
              encType: 'application/json',
              method: 'POST',
            },
          );
        })}
      >
        <div className={'flex flex-col space-y-6'}>
          <div
            className={'border-destructive text-destructive border p-4 text-sm'}
          >
            <div className={'flex flex-col space-y-2'}>
              <div>
                <Trans i18nKey={'account:deleteAccountDescription'} />
              </div>

              <div>
                <Trans i18nKey={'common:modalConfirmationQuestion'} />
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>
            <Trans i18nKey={'common:cancel'} />
          </AlertDialogCancel>

          <Button
            data-test={'confirm-delete-account-button'}
            type={'submit'}
            disabled={pending}
            name={'action'}
            variant={'destructive'}
          >
            {pending ? (
              <Trans i18nKey={'account:deletingAccount'} />
            ) : (
              <Trans i18nKey={'account:deleteAccount'} />
            )}
          </Button>
        </AlertDialogFooter>
      </form>
    </Form>
  );
}

function DeleteAccountErrorAlert() {
  return (
    <Alert variant={'destructive'}>
      <ExclamationTriangleIcon className={'h-4'} />

      <AlertTitle>
        <Trans i18nKey={'account:deleteAccountErrorHeading'} />
      </AlertTitle>

      <AlertDescription>
        <Trans i18nKey={'common:genericError'} />
      </AlertDescription>
    </Alert>
  );
}
