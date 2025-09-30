<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">{{ t('settings') }}</h2>
      <button @click="$emit('close-settings')" class="text-gray-400 hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    
    <div class="space-y-6 overflow-y-auto p-1">
      <div class="bg-gray-700/50 p-4 rounded-lg">
        <h3 class="font-semibold mb-3">{{ t('general') }}</h3>
        <div class="flex justify-between items-center py-2">
          <span class="text-gray-300">{{ t('language') }}</span>
          <select 
            :value="currentLanguage" 
            @change="$emit('change-language', $event.target.value)"
            class="bg-gray-600 text-white px-2 py-1 rounded text-sm"
          >
            <option value="ko">한국어 🇰🇷</option>
            <option value="en">English 🇺🇸</option>
          </select>
        </div>
        <div class="flex justify-between items-center py-2">
          <span class="text-gray-300">{{ t('country') }}</span>
          <span class="font-medium">{{ t('southKorea') }}</span>
        </div>
        <div class="flex justify-between items-center py-2">
          <span class="text-gray-300">{{ t('sound') }}</span>
          <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input 
              type="checkbox" 
              :checked="soundEnabled" 
              @change="$emit('update:soundEnabled', $event.target.checked)" 
              name="toggle" 
              id="toggle" 
              class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label for="toggle" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer"></label>
          </div>
        </div>
      </div>
      
      <div class="bg-gray-700/50 p-4 rounded-lg">
        <h3 class="font-semibold mb-3">{{ t('account') }}</h3>
        <div class="flex justify-between items-center py-2">
          <span class="text-gray-300">{{ t('userId') }}</span>
          <div class="flex items-center space-x-2">
            <span class="font-mono text-sm">{{ userId }}</span>
            <button @click="$emit('copy-user-id')" class="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div class="bg-gray-700/50 p-4 rounded-lg">
        <h3 class="font-semibold mb-3">{{ t('shareWithFriends') }}</h3>
        <div class="flex justify-around items-center pt-2">
          <button class="text-gray-300 hover:text-white transition-colors">
            <svg class="w-8 h-8" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <title>TikTok</title>
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.88-1.59-1.93-2.3-4.51-2.02-7.14.28-2.64 1.74-4.87 3.91-6.19.85-.51 1.8-1.03 2.89-1.19.12-1.78.01-3.55.02-5.32.01-1.35.02-2.7.02-4.05Z"/>
            </svg>
          </button>
          <button class="text-gray-300 hover:text-white transition-colors">
            <svg class="w-8 h-8" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <title>Telegram</title>
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.17.91-.494 1.208-.822 1.23-.696.047-1.225-.46-1.9-1.002-1.056-.82-1.66-1.33-2.67-2.122-.33-.26-.058-.513.188-.692.214-.158 3.033-2.78 3.125-3.02.002-.004.01-.01.018-.01.03-.05.013-.105-.034-.09-.09-.03-.23-.004-1.586.952l-1.55 1.002c-.53.33-.94.137-1.107-.22-.22-.464-.81-1.502-1.203-2.835-.11-.365-.28-.756.33-1.03.11-.05.28-.13.31-.13.55-.07 1.02.14 1.54.43 5.8 3.2 6.4 3.5 6.6 3.5.24.04.44.02.5.02z"/>
            </svg>
          </button>
          <button class="text-gray-300 hover:text-white transition-colors">
            <svg class="w-8 h-8" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <title>X</title>
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsPage',
  props: {
    soundEnabled: {
      type: Boolean,
      default: true
    },
    userId: {
      type: String,
      required: true
    },
    currentLanguage: {
      type: String,
      default: 'ko'
    },
    t: {
      type: Function,
      required: true
    }
  },
  emits: ['close-settings', 'copy-user-id', 'update:soundEnabled', 'change-language']
}
</script>
