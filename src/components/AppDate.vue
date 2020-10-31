<template>
  <span v-if="formatDate">
    {{ timestamp | exactDate }}
  </span>
  <span v-else :title="timestamp | humanFriendlyDate">{{
    timestamp | diffForHumans
  }}</span>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    timestamp: {
      required: true,
      type: Number
    },

    formatDate: {
      type: String
    }
  },

  filters: {
    humanFriendlyDate(date) {
      return moment.unix(date).format('MMMM Do YYYY, h:mm:ss a')
    },

    diffForHumans(date) {
      return moment.unix(date).fromNow()
    },

    exactDate(date) {
      return moment.unix(date).format('MMM Do YY')
    }
  }
}
</script>

<style scoped></style>
