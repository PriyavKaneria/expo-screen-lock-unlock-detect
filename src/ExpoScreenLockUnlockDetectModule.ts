import { NativeModule, requireNativeModule } from 'expo';

import { ExpoScreenLockUnlockDetectModuleEvents } from './ExpoScreenLockUnlockDetect.types';

declare class ExpoScreenLockUnlockDetectModule extends NativeModule<ExpoScreenLockUnlockDetectModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoScreenLockUnlockDetectModule>('ExpoScreenLockUnlockDetect');
