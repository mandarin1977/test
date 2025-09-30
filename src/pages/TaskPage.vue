<template>
  <div class="w-full h-full flex flex-col overflow-y-auto">
    <!-- 헤더 -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-2">{{ t('featured') }}</h1>
    </div>

    <!-- Featured 섹션 -->
    <div class="mb-6">
      <div class="grid grid-cols-2 gap-3">
        <!-- Capybara Nation -->
        <div class="relative bg-gradient-to-b from-purple-800 to-teal-600 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
          <div class="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">{{ t('new') }}</div>
          <div class="text-center mt-6">
            <div class="text-white font-bold text-lg mb-2">CAPYBARA</div>
            <div class="text-yellow-400 font-bold text-lg mb-2">NATION</div>
            <h3 class="text-white font-semibold text-sm mb-1">{{ t('capybaraNation') }}</h3>
            <p class="text-gray-300 text-xs">6 {{ t('tasksLeft') }}</p>
          </div>
        </div>

        <!-- Delphi trade -->
        <div class="relative bg-gradient-to-b from-purple-800 to-purple-600 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
          <div class="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">{{ t('new') }}</div>
          <div class="text-center mt-6">
            <div class="text-blue-400 font-bold text-lg mb-2">delphi</div>
            <div class="text-blue-300 text-2xl mb-2">💬</div>
            <h3 class="text-white font-semibold text-sm mb-1">{{ t('delphiTrade') }}</h3>
            <p class="text-gray-300 text-xs">5 {{ t('tasksLeft') }}</p>
          </div>
        </div>

        <!-- Capynation Challenges -->
        <div class="relative bg-gradient-to-b from-green-800 to-green-600 rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform">
          <div class="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">{{ t('new') }}</div>
          <div class="text-center mt-6">
            <div class="text-yellow-400 text-3xl mb-2">📜</div>
            <div class="text-yellow-400 font-bold text-lg mb-2">QUEST</div>
            <h3 class="text-white font-semibold text-sm mb-1">{{ t('capynationChallenges') }}</h3>
            <p class="text-gray-300 text-xs">2 {{ t('tasksLeft') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Social Media 섹션 -->
    <div class="mb-6">
      <h2 class="text-lg font-bold text-white mb-4">{{ t('socialMedia') }}</h2>
      <div class="space-y-3">
        <div 
          v-for="task in socialMediaTasks" 
          :key="task.id"
          class="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors"
          @click="handleTaskClick(task)"
        >
          <div class="flex items-center space-x-4">
            <!-- 아이콘 -->
            <div class="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <div class="text-2xl">{{ task.icon }}</div>
            </div>
            
            <!-- 태스크 정보 -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center space-x-2 mb-1">
                <h3 class="font-semibold text-white text-sm">{{ t(task.titleKey) }}</h3>
                <div v-if="task.isNew" class="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
            </div>
            
            <!-- 보상 -->
            <div class="flex items-center space-x-2 text-yellow-400 text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>+{{ formatNumber(task.reward) }}</span>
            </div>
            
            <!-- 화살표 -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Task List 섹션 -->
    <div class="mb-6">
      <h2 class="text-lg font-bold text-white mb-4">{{ t('taskList') }}</h2>
      <div class="space-y-3">
        <div 
          v-for="task in taskListTasks" 
          :key="task.id"
          class="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors"
          @click="handleTaskClick(task)"
        >
          <div class="flex items-center space-x-4">
            <!-- 아이콘 -->
            <div class="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <div class="text-2xl">{{ task.icon }}</div>
            </div>
            
            <!-- 태스크 정보 -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center space-x-2 mb-1">
                <h3 class="font-semibold text-white text-sm">{{ t(task.titleKey) }}</h3>
                <div v-if="task.isNew" class="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
            </div>
            
            <!-- 보상 -->
            <div class="flex items-center space-x-2 text-yellow-400 text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>+{{ formatNumber(task.reward) }}</span>
            </div>
            
            <!-- 화살표 -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskPage',
  props: {
    t: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      socialMediaTasks: [
        {
          id: 1,
          titleKey: 'telegram',
          reward: 1000000,
          icon: '📱',
          isNew: false
        },
        {
          id: 2,
          titleKey: 'xTwitter',
          reward: 1000000,
          icon: '🐦',
          isNew: true
        },
        {
          id: 3,
          titleKey: 'sendBoinkersToMoon',
          reward: 1000000,
          icon: '🚀',
          isNew: true
        },
        {
          id: 4,
          titleKey: 'joinPokergram',
          reward: 1000000,
          icon: '🃏',
          isNew: true
        },
        {
          id: 5,
          titleKey: 'joinPools',
          reward: 1000000,
          icon: '🎰',
          isNew: true
        }
      ],
      taskListTasks: [
        {
          id: 6,
          titleKey: 'inviteFriends',
          reward: 1500000,
          icon: '👥',
          isNew: false
        },
        {
          id: 7,
          titleKey: 'completeDailyQuest',
          reward: 500000,
          icon: '📅',
          isNew: true
        },
        {
          id: 8,
          titleKey: 'shareOnSocial',
          reward: 300000,
          icon: '📢',
          isNew: false
        },
        {
          id: 9,
          titleKey: 'watchAd',
          reward: 200000,
          icon: '📺',
          isNew: true
        },
        {
          id: 10,
          titleKey: 'rateApp',
          reward: 400000,
          icon: '⭐',
          isNew: false
        }
      ]
    }
  },
  methods: {
    handleTaskClick(task) {
      this.$emit('task-click', task)
    },
    formatNumber(num) {
      if (num < 1e6) return num.toLocaleString()
      if (num >= 1e6 && num < 1e9) return (num / 1e6).toFixed(1) + 'M'
      if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
      return num.toLocaleString()
    }
  },
  emits: ['task-click']
}
</script>
