import type {
  LoaderFunctionArgs,
  MetaArgs,
} from 'react-router';

export interface Route {
  LoaderArgs: LoaderFunctionArgs;
  MetaArgs: MetaArgs;
}
