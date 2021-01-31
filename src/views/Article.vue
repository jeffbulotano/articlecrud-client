<template>
  <div class="article">
    <article-view v-if="article.id"></article-view>
    <error-404 v-else></error-404>
  </div>
</template>

<script>
import ArticleView from '@/components/articles/ArticleView'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Article',
  components: {
    ArticleView
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