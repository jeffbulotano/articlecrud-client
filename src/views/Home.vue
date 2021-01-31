<template>
  <div class="home">
    <article-table></article-table>
  </div>
</template>

<script>
import ArticleTable from  '@/components/articles/ArticleTable'

export default {
  name: 'Home',
  components: {
    ArticleTable
  }
}
</script>