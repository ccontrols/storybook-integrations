import React, { FC, useState, useMemo, useEffect } from 'react';
import { store } from '@component-controls/store/static_store';
import { BlockContextProvider } from '@component-controls/blocks';
import { API } from '@storybook/api';
import { SET_CURRENT_STORY } from '@storybook/core-events';

export interface AddonPanelProps {
  active?: boolean;
  api: API;
}
export const AddonPanel: FC<AddonPanelProps> = ({ active, api, children }) => {
  const [storyId, setStoryId] = useState<string | undefined>();

  const channel = useMemo(() => api.getChannel(), [api]);
  useEffect(() => {
    const onChangeStory = (props: any) => {
      setStoryId(props.storyId);
    };
    const { id } = api.getCurrentStoryData() || {};
    setStoryId(id);
    channel.on(SET_CURRENT_STORY, onChangeStory);
    return () => channel.off(SET_CURRENT_STORY, onChangeStory);
  }, [api, channel]);
  const docId =
    storyId && store
      ? store.stories[storyId]
        ? store.stories[storyId].doc
        : storyId
      : undefined;
  return active && docId ? (
    <BlockContextProvider
      store={store}
      storyId={storyId !== docId ? storyId : undefined}
      docId={docId}
    >
      {children}
    </BlockContextProvider>
  ) : null;
};
