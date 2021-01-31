<template>
  <div id="article-table-container">
    <router-link :to="{ name: 'create' }" custom>
      <button>+ Add article</button>
    </router-link>

    <table id="article-table">
      <tr>
        <th class="sortable" @click="setOrder('id')" :class="order.by == 'id' && order.direction ? `ordered-${order.direction}` : ''">Article ID</th>
        <th class="sortable" @click="setOrder('created_at')" :class="order.by == 'created_at' && order.direction ? `ordered-${order.direction}` : ''">Date Submitted</th>
        <th class="sortable" @click="setOrder('client_name')" :class="order.by == 'client_name' && order.direction ? `ordered-${order.direction}` : ''">Client Name</th>
        <th class="sortable" @click="setOrder('client_email')" :class="order.by == 'client_email' && order.direction ? `ordered-${order.direction}` : ''">Client Email</th>
        <th class="sortable" @click="setOrder('required_wordcount')" :class="order.by == 'required_wordcount' && order.direction ? `ordered-${order.direction}` : ''">Required Word Count</th>
        <th></th>
      </tr>

      <tr v-for="article in articles" :key="article.id">
        <td width="100">{{ article.id }}</td>
        <td width="200">{{ article.created_at }}</td>
        <td width="300">{{ article.client_name }}</td>
        <td width="300">{{ article.client_email }}</td>
        <td width="100">{{ article.required_wordcount }}</td>
        <td width="200" class="table-controls"> 
          <router-link :to="{ name: 'article', params: { id: article.id } }" custom>
            <button>View</button>
          </router-link>
          <router-link :to="{ name: 'edit', params: { id: article.id } }" custom>
            <button>Edit</button>
          </router-link>
          <button @click="confirmDelete(article.id)">Delete</button>
        </td>
      </tr>
    </table>

    <div class="pagination-buttons">
      <button v-if="paginationButtons[0] > 1" @click="goToPage(1)">First</button>

      <button v-if="pagination.current_page > 1" @click="goToPage(pagination.current_page - 1)">Prev</button>

      <div class="button-placeholder" v-if="paginationButtons[0] > 1">...</div>

      <button 
        v-for="page in paginationButtons" 
        :key="page" 
        :class="page == pagination.current_page ? 'active' : ''" 
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <div class="button-placeholder" v-if="paginationButtons[paginationButtons.length - 1] < pagination.last_page">...</div>

      <button v-if="pagination.current_page < pagination.last_page" @click="goToPage(pagination.current_page + 1)">Next</button>

      <button  v-if="paginationButtons[paginationButtons.length - 1] < pagination.last_page" @click="goToPage(pagination.last_page)">Last</button>
    </div>

    <div class="pagination-show-pages">
      <label for="show-pages">Show: </label>
      <select id="show-pages" name="show-pages" @change="setItemsToShow">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'ArticleTable',
  computed: {
    ...mapState('article', ['articles', 'pagination', 'order']),
    ...mapGetters('article', ['paginationButtons'])
  },
  methods: {
    ...mapActions('article', ['getArticles', 'deleteArticle']),
    goToPage(page) {
      this.pagination.current_page = page
      this.getArticles()
    },
    setOrder(by) {
      if (this.order.by == by) {
        if (this.order.direction == null) {
          this.order.direction = 'asc'
        } else if (this.order.direction == 'asc') {
          this.order.direction = 'desc'
        } else {
          this.order.by = null
        this.order.direction = null
        }
      } else {
        this.order.by = by
        this.order.direction = 'asc'
      }

      this.getArticles()
    }, 
    setItemsToShow(e) {
      this.pagination.current_page = 1
      this.pagination.items = e.target.value
      this.getArticles()
    },
    confirmDelete(id) {
      let confirmed = confirm('Are you sure you want to delete this article?')

      if (confirmed) {
        this.deleteArticle(id)
      }
    }
  },
  mounted() {
    this.getArticles()
  }
}
</script>

<style scoped>
  .button-placeholder {
    display: inline-block;
    margin: 0 4px;
  }
  #article-table {
    margin: 30px auto;
  }
  #article-table td {
    padding: 6px 10px;
  }
  .pagination-buttons > button, .table-controls button {
    margin: 0 4px;
    border-radius: 4px;
    border: 1px solid grey;
    padding: 4px 8px;
  }
  th.ordered-asc:after {
    content: "^";
      margin-left: 10px;
  }
  th.ordered-desc:after {
    content: "v";
    margin-left: 10px;
  }
  #article-table th.sortable {
    cursor: pointer;
  }
  #article-table tr:nth-child(even) {
    background-color: rgb(226, 226, 226);
  }
  .pagination-show-pages {
    margin-top: 15px;
  }
  #show-pages {
    padding: 4px 12px;
  }
  .pagination-buttons > button.active {
    background-color: #42b983;
  }
</style>