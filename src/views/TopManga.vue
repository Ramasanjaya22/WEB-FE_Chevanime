<template>
    <div>
      <app-pagination
     v-on:changePage="changePage"
     :currentPage="currentPage"
     :hasNextPage="pagination.has_next_page"></app-pagination>
        <app-list>
            <top-manga-card v-for="manga in topManga" :key="manga.mal_id" :manga="manga"></top-manga-card>
        </app-list>
    </div>
</template>

<script>
  import http from "../helpers/http"
  import dateHelper  from "../helpers/date"
  import TopMangaCard from "../components/TopMangaCard.vue"
  import List from "../components/List.vue"
  import Pagination from "../components/Pagination.vue"
  export default{
    name: 'Top Manga',
    components: {
      TopMangaCard,
      'app-list' : List,
      'app-pagination' : Pagination
    },
    data() {
      return {
        currentPage: 1,
        listTopManga: [],
        pagination:{
          "last_visible_page": 0,
          "has_next_page": false
        }
      }
    },
    computed:{
      topManga() {
        return this.listTopManga.map((topManga) => {
          topManga.published.from = dateHelper(topManga.published.from);
          return topManga;
        });
      }
    },
    created(){
      this.getTopManga();
    },
    methods: {
      getTopManga(page = 1){
        http(`/top/manga?page=${page}`)
        .then((response)  => {
          this.listTopManga = response.data
          this.pagination = response.pagination
        })
        .catch((error) =>alert(error.message));
      },
      changePage(page){
        this.currentPage = page;
        this.getTopManga(page);
      }
    },
  }
</script>