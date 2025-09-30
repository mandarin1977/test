<template>
  <div>
    <p class="text-xs text-gray-300">Day {{ reward.day }}</p>
    <div class="my-1 flex-grow flex items-center justify-center">
      <div v-if="reward.type === 'coin'" class="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center font-bold text-gray-800 text-lg">C</div>
      <div v-else-if="reward.type === 'boost'" class="w-8 h-8 rounded-full bg-sky-400 flex items-center justify-center font-bold text-gray-800 text-lg">B</div>
      <div v-else-if="reward.type === 'token'" class="w-8 h-8 rounded-full bg-pink-400 flex items-center justify-center font-bold text-gray-800 text-lg">T</div>
      <div v-else class="w-8 h-8 rounded-full bg-purple-400 flex items-center justify-center font-bold text-gray-800 text-lg">S</div>
    </div>
    <div class="text-xs font-semibold leading-tight">
      <p v-if="reward.amount">{{ reward.amount }}</p>
      <p v-if="reward.description">{{ reward.description }}</p>
    </div>
    <div class="mt-2 h-5 text-sm flex justify-center items-center">
      <p v-if="reward.status === 'claimable'" class="font-bold text-white">{{ t('claim') }}</p>
      <svg v-else-if="reward.status === 'upcoming'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
      </svg>
      <p v-else-if="reward.status === 'claimed'" class="font-bold text-green-400">✓</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RewardCardContent',
  props: {
    reward: {
      type: Object,
      required: true
    },
    t: {
      type: Function,
      required: true
    }
  }
}
</script>
