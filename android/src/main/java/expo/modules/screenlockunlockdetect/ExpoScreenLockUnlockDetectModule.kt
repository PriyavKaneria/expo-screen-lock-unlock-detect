package expo.modules.screenlockunlockdetect

import android.content.BroadcastReceiver
import android.content.Context
import android.content.SharedPreferences
import android.content.Intent
import android.content.IntentFilter
import android.os.PowerManager
import android.app.KeyguardManager
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.types.Enumerable

class ExpoScreenLockUnlockDetectModule : Module() {
  private var status: Status = Status.UNKNOWN
  private val context
    get() = requireNotNull(appContext.reactContext) {
      "React Application Context is null"
    }

  private fun getPreferences(): SharedPreferences {
    return context.getSharedPreferences(context.packageName + ".lockstatus", Context.MODE_PRIVATE)
  }

  private val receiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context?, intent: Intent?) {
      status = when (intent?.action) {
        Intent.ACTION_SCREEN_OFF     -> Status.LOCKED
        Intent.ACTION_SCREEN_ON      -> Status.SCREENON
        Intent.ACTION_USER_PRESENT   -> Status.UNLOCKED
        else                         -> Status.UNKNOWN
      }
      getPreferences().edit().putString("status", status.value).commit()

      when (status) {
        Status.LOCKED -> sendEvent("onScreenLock", null)
        Status.UNLOCKED -> sendEvent("onScreenUnlock", null)
        else -> {} // No event for SCREENON or UNKNOWN
      }
    }
  }

  override fun definition() = ModuleDefinition {
    Name("ExpoScreenLockUnlockDetect")

    Events("onScreenLock")
    Events("onScreenUnlock")

    OnCreate {
      val filter = IntentFilter().apply {
        addAction(Intent.ACTION_SCREEN_OFF)
        addAction(Intent.ACTION_SCREEN_ON)
        addAction(Intent.ACTION_USER_PRESENT)
      }

      // Initialize initial status
      val powerManager = context.getSystemService(Context.POWER_SERVICE) as PowerManager
      val keyguardManager = context.getSystemService(Context.KEYGUARD_SERVICE) as KeyguardManager
      status = when {
        !powerManager.isInteractive() -> Status.LOCKED
        keyguardManager.isKeyguardLocked -> Status.SCREENON
        else -> Status.UNLOCKED
      }
      getPreferences().edit().putString("status", status.value).commit()

      context.registerReceiver(receiver, filter) // attach listener for updating status
    }

    OnDestroy {
      context.unregisterReceiver(receiver)
    }

    Function("checkDeviceLockStatus") {
      return@Function getPreferences().getString("status", Status.UNKNOWN.value)
    }
  }
}

enum class Status(val value: String) {
  LOCKED("locked"),
  UNLOCKED("unlocked"),
  SCREENON("screen_on"),
  UNKNOWN("unknown")
}
