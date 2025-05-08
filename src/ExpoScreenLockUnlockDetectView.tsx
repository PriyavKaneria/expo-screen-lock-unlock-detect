import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoScreenLockUnlockDetectViewProps } from './ExpoScreenLockUnlockDetect.types';

const NativeView: React.ComponentType<ExpoScreenLockUnlockDetectViewProps> =
  requireNativeView('ExpoScreenLockUnlockDetect');

export default function ExpoScreenLockUnlockDetectView(props: ExpoScreenLockUnlockDetectViewProps) {
  return <NativeView {...props} />;
}
