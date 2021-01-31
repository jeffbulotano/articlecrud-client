<template>
    <div id="article-form-container">
        <h2>{{ formTitle }}</h2>

        <message-box :type="response.status" :message="response.message" :errors="response.errors" v-show="showMessageBox" @close="closeMessageBox"></message-box>

        <form id="article-form" @submit="submitForm">
            <div class="row" v-if="article.id" >
                <label for="id">* Article ID:</label>
                <input class="article-form-input readonly" type="text" name="id" v-model="article.id" readonly />
            </div>
            <div class="row" v-if="article.created_at" >
                <label for="created_at">* Date submitted:</label>
                <input class="article-form-input readonly" type="text" name="created_at" v-model="article.created_at" readonly />
            </div>
            <div class="row">
                <label for="client_name">* Client Name:</label>
                <input class="article-form-input" :class="editMode ? 'readonly' : ''" type="text" name="client_name" v-model="article.client_name" :readonly="editMode" />
            </div>
            <div class="row">
                <label for="client_email">* Client Email:</label>
                <input class="article-form-input" :class="editMode ? 'readonly' : ''" type="text" name="client_email" v-model="article.client_email" :readonly="editMode" />
            </div>
            <div class="row">
                <label for="required_wordcount">* Required Word Count:</label>
                <input class="article-form-input" type="text" name="required_wordcount" v-model.number="article.required_wordcount" />
            </div>
            <div class="row">
                <label for="article">* Article:</label>
                <vue-editor class="article-form-input" type="text" name="article" v-model="article.article"></vue-editor>
            </div>
            <div class="row">
                <button type="submit">Save</button>

                <router-link :to="{ name: 'home' }" custom>
                    <button>Close</button>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { mapState, mapActions } from 'vuex'
import MessageBox from '@/components/partials/MessageBox'

export default {
    name: 'ArticleForm',
    components: {
        VueEditor,
        MessageBox
    },
    data: () => ({
        showMessageBox: false
    }),
    computed: {
        ...mapState('article', ['article', 'response']),
        editMode() {
            return this.article.created_at !== null
        },
        formTitle() {
            return  this.editMode ? 'Edit article' : 'Create article'
        } 
    },
    methods: {
        ...mapActions('article', ['storeArticle', 'updateArticle']),
        submitForm(e) {
            e.preventDefault()

            if (this.editMode) {
                this.updateArticle()
            } else {
                this.storeArticle()
            }

            this.showMessageBox = true
        },
        closeMessageBox() {
            this.showMessageBox = false
            this.response.status = null
            this.response.message = null
            this.response.errors = null
        }
    }
}
</script>

<style scoped>
    .row {
        margin-bottom: 20px;
    }
    .article-form-input {
        width: 500px;
        padding: 8px 12px;
        display: inline-block;
    }
    .article-form-input.quillWrapper {
        padding: 0;
        width: 528px;
    }
    #article-form label {
        min-width: 200px;
        display: inline-block;
        text-align: right;
        padding-right: 30px;
        vertical-align: top;
        margin-top: 6px;
    }
    .article-form-input.readonly {
        background-color: lightgrey;
        border: 1px solid grey;
        border-radius: 2px;
        outline: none;
    }
    #article-form button {
        margin: 0 4px;
    }
</style>