<template>
  <div class="text-center text-gray-500">
    <h2 class="text-2xl font-bold mb-2">{{ pageTitle }}</h2>
    <p>{{ t('preparing') }}</p>
  </div>
</template>

<script>
export default {
  name: 'PlaceholderPage',
  props: {
    pageTitle: {
      type: String,
      required: true
    },
    t: {
      type: Function,
      required: true
    }
  }
}
</script>
