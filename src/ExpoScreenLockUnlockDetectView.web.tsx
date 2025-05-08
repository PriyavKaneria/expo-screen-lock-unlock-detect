import * as React from 'react';

import { ExpoScreenLockUnlockDetectViewProps } from './ExpoScreenLockUnlockDetect.types';

export default function ExpoScreenLockUnlockDetectView(props: ExpoScreenLockUnlockDetectViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
