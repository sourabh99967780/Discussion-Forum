<template>
  <div class="col-3 push-top">
    <div class="profile-card">
      <p class="text-center">
        <img :src="user.avatar" alt="" class="avatar-xlarge" />
      </p>

      <h1 class="title">{{ user.username }}</h1>

      <p class="text-lead">{{ user.name }}</p>

      <p class="text-justify">
        <span v-if="user.bio">{{ user.bio }}</span>
        <span v-else>No bio specified.</span>
      </p>

      <span class="online">{{ user.username }} is online</span>

      <div class="stats">
        <span>{{ userPostsCount }} posts</span>
        <span>{{ userThreadsCount }} threads</span>
      </div>

      <hr />

      <p v-if="user.website" class="text-large text-center">
        <i class="fa fa-globe"></i>
        <a :href="user.website">{{ user.website }}</a>
      </p>
    </div>

    <p class="text-xsmall text-faded text-center">
      Member since
      <AppDate :timestamp="user.registeredAt" :formatDate="'MMM Do YY'" />, last
      visited
      {{ getLastSignInTime }}
    </p>

    <div class="text-center">
      <hr />
      <router-link :to="{ name: 'ProfileEdit' }" class="btn-green btn-small">
        Edit Profile
      </router-link>
    </div>
  </div>
</template>

<script>
import AppDate from '@/components/AppDate'
export default {
  components: {
    AppDate
  },
  props: {
    user: {
      required: true,
      type: Object
    }
  },

  computed: {
    userThreadsCount() {
      return this.$store.getters['users/userThreadsCount'](this.user['.key'])
    },

    userPostsCount() {
      return this.$store.getters['users/userPostsCount'](this.user['.key'])
    },

    getLastSignInTime() {
      return this.$store.getters['auth/lastSignIn']
    }
  }
}
</script>

<style></style>
