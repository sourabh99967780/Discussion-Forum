<template>
  <div>
    <div v-if="user" class="flex-grid">
      <UserProfileCard v-if="!edit" :user="user" />
      <UserProfileCardEditor v-else :user="user" />

      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead"> {{ user.username }}'s recent activity </span>
          <a href="#">See only started threads?</a>
        </div>

        <hr />
        <PostList :posts="userPosts" />
      </div>
    </div>
    <div v-else class="flex-grid">
      You need to sign in or register to view this Page. :)
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import UserProfileCard from '@/components/UserProfileCard'
import UserProfileCardEditor from '@/components/UserProfileCardEditor'
import { mapGetters } from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'
export default {
  components: {
    PostList,
    UserProfileCard,
    UserProfileCardEditor
  },
  mixins: [asyncDataStatus],
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/authUser'
    }),
    userPosts() {
      return this.$store.getters['users/userPosts'](this.user['.key'])
    }
  },
  created() {
    if (this.user.posts) {
      this.$store
        .dispatch('posts/fetchPosts', { ids: this.user.posts })
        .then(() => this.asyncDataStatus_fetched())
    }
    this.$emit('ready')
  }
}
</script>

<style scoped></style>
