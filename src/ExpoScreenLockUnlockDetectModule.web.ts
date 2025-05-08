import { registerWebModule, NativeModule } from 'expo';

import { ExpoScreenLockUnlockDetectModuleEvents } from './ExpoScreenLockUnlockDetect.types';

class ExpoScreenLockUnlockDetectModule extends NativeModule<ExpoScreenLockUnlockDetectModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoScreenLockUnlockDetectModule, 'ExpoScreenLockUnlockDetectModule');
