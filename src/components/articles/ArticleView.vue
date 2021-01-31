<template>
    <div id="article-container">
        <div v-html="article.article"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ArticleView',
    computed: {
        ...mapState('article', ['article'])
    }
}
</script>

<style scoped>
    #article-container {
        max-width: 600px;
        margin: 0 auto;
    }
</style>