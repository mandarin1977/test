<template>
  <div 
    v-if="show" 
    class="absolute top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-50 transition-all duration-300"
    :class="show ? 'opacity-100' : 'opacity-0'"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'ToastNotification',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  }
}
</script>
