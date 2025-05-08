// Reexport the native module. On web, it will be resolved to ExpoScreenLockUnlockDetectModule.web.ts
// and on native platforms to ExpoScreenLockUnlockDetectModule.ts
export { default } from './ExpoScreenLockUnlockDetectModule';
export { default as ExpoScreenLockUnlockDetectView } from './ExpoScreenLockUnlockDetectView';
export * from  './ExpoScreenLockUnlockDetect.types';
