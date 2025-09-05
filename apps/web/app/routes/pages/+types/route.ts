import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaArgs,
} from 'react-router';

export interface Route {
  LoaderArgs: LoaderFunctionArgs;
  ActionArgs: ActionFunctionArgs;
  MetaArgs: MetaArgs;
}
