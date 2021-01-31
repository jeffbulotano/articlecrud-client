<template>
  <div class="edit">
    <article-form v-if="article.id"></article-form>
    <error-404 v-else></error-404>
  </div>
</template>

<script>
import ArticleForm from '@/components/articles/ArticleForm'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Edit',
  components: {
    ArticleForm
  },
  computed: {
    ...mapState('article', ['article'])
  },
  methods: {
    ...mapActions('article', ['getArticle']),
    ...mapMutations('article', ['CLEAR_ARTICLE'])
  },
  mounted() {
    this.getArticle(this.$route.params.id)
  },
  destroyed() {
    this.CLEAR_ARTICLE()
  }
}
</script>