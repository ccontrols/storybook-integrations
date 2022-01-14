import React, { FC } from 'react';
import { BlockContextProvider as BlocksContextProvider } from '@component-controls/blocks';
import { store } from '@component-controls/store/live_store';
import { useCurrentData } from '@component-controls/storybook-custom-docs';

export interface BlockContextProviderProps {
  id?: string;
}
export const BlockContextProvider: FC<BlockContextProviderProps> = ({
  children,
  id,
}) => {
  const { storyId: defaultStoyId, docId } = useCurrentData();
  const storyId = id ? id : defaultStoyId;
  return (
    <BlocksContextProvider store={store} storyId={storyId} docId={docId}>
      {children}
    </BlocksContextProvider>
  );
};
