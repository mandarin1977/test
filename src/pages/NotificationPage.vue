<template>
  <div class="w-full h-full flex flex-col">
    <!-- 뒤로가기 버튼 -->
    <div class="flex items-center justify-start mb-4 px-4">
      <button 
        @click="$emit('navigate', 'home')"
        class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- 헤더 -->
    <div class="text-center mb-6">
      <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-white mb-2">{{ t('notification') }}</h1>
      <p class="text-gray-400 text-sm">{{ t('notificationSubtitle') }}</p>
      <p class="text-gray-500 text-xs">{{ t('notificationDescription') }}</p>
    </div>

    <!-- 탭 메뉴 -->
    <div class="flex space-x-2 mb-6 px-4">
      <button 
        v-for="tab in tabs" 
        :key="tab.key"
        @click="activeTab = tab.key"
        class="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all relative"
        :class="activeTab === tab.key 
          ? 'bg-purple-600 text-white shadow-lg' 
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'"
      >
        {{ t(tab.nameKey) }}
        <span 
          v-if="tab.hasNotification" 
          class="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"
        ></span>
      </button>
    </div>

    <!-- 알림 리스트 -->
    <div class="flex-1 overflow-y-auto px-4 space-y-3">
      <div 
        v-for="notification in filteredNotifications" 
        :key="notification.id"
        class="bg-gray-700 rounded-lg p-4 flex items-start space-x-3 cursor-pointer hover:bg-gray-600 transition-colors"
        @click="handleNotificationClick(notification)"
      >
        <!-- 아이콘 -->
        <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
             :class="getIconClass(notification.type)">
          <component :is="getIconComponent(notification.type)" class="w-5 h-5 text-white" />
        </div>
        
        <!-- 내용 -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-1">
            <h3 class="font-semibold text-white text-sm truncate">{{ t(notification.titleKey) }}</h3>
            <span v-if="!notification.read" class="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></span>
          </div>
          <p class="text-gray-400 text-xs leading-relaxed">{{ t(notification.descriptionKey) }}</p>
          <p class="text-gray-500 text-xs mt-1">{{ formatTime(notification.timestamp) }}</p>
        </div>
        
        <!-- 화살표 -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
      
      <!-- 빈 상태 -->
      <div v-if="filteredNotifications.length === 0" class="text-center py-8">
        <div class="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p class="text-gray-400 text-sm">{{ t('noNotifications') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotificationPage',
  props: {
    t: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      activeTab: 'all',
      tabs: [
        { key: 'all', nameKey: 'all', hasNotification: true },
        { key: 'tasks', nameKey: 'tasks', hasNotification: false },
        { key: 'updates', nameKey: 'updates', hasNotification: true },
        { key: 'reminders', nameKey: 'reminders', hasNotification: true }
      ],
      notifications: [
        {
          id: 1,
          type: 'vote',
          titleKey: 'tariffWarReminder',
          descriptionKey: 'tariffWarDescription',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30분 전
          read: false,
          category: 'reminders'
        },
        {
          id: 2,
          type: 'reward',
          titleKey: 'claimDailyRewards',
          descriptionKey: 'claimDailyDescription',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2시간 전
          read: false,
          category: 'tasks'
        },
        {
          id: 3,
          type: 'alliance',
          titleKey: 'allianceVoteReminder',
          descriptionKey: 'allianceVoteDescription',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4시간 전
          read: true,
          category: 'reminders'
        },
        {
          id: 4,
          type: 'challenge',
          titleKey: 'newChallenges',
          descriptionKey: 'newChallengesDescription',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6시간 전
          read: false,
          category: 'updates'
        }
      ]
    }
  },
  computed: {
    filteredNotifications() {
      if (this.activeTab === 'all') {
        return this.notifications
      }
      return this.notifications.filter(n => n.category === this.activeTab)
    }
  },
  methods: {
    getIconClass(type) {
      const classes = {
        vote: 'bg-purple-500',
        reward: 'bg-red-500',
        alliance: 'bg-blue-500',
        challenge: 'bg-green-500'
      }
      return classes[type] || 'bg-gray-500'
    },
    getIconComponent(type) {
      const components = {
        vote: 'VoteIcon',
        reward: 'RewardIcon',
        alliance: 'AllianceIcon',
        challenge: 'ChallengeIcon'
      }
      return components[type] || 'DefaultIcon'
    },
    formatTime(timestamp) {
      const now = new Date()
      const diff = now - timestamp
      const minutes = Math.floor(diff / (1000 * 60))
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      
      if (minutes < 60) {
        return `${minutes}${this.t('minutesAgo')}`
      } else if (hours < 24) {
        return `${hours}${this.t('hoursAgo')}`
      } else {
        return `${days}${this.t('daysAgo')}`
      }
    },
    handleNotificationClick(notification) {
      notification.read = true
      this.$emit('notification-click', notification)
    }
  },
  components: {
    VoteIcon: {
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    },
    RewardIcon: {
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>`
    },
    AllianceIcon: {
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`
    },
    ChallengeIcon: {
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>`
    },
    DefaultIcon: {
      template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    }
  },
  emits: ['notification-click', 'navigate']
}
</script>
