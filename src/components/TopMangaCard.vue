<template>
    <div>
        <div class="card card-side bg-base-100 shadow-xl mt-2">
  <figure><img :src="manga.images.webp.image_url" :alt="manga.title"></figure>
  <div class="card-body">
    <h2 class="card-title">{{ manga.title }}</h2>
    <h5 class="card-title text-gray-400">{{ manga.title_japanese }}</h5>

    <table>
        <tr>
            <td>Ranking</td>
            <td></td>
            <td>{{ manga.rank }}</td>
        </tr>
        <tr>
            <td>Volume</td>
            <td></td>
            <td>{{ manga.volumes || '-' }}</td>
        </tr>
        <tr>
            <td>Tipe</td>
            <td></td>
            <td>{{ manga.type }}</td>
        </tr>
        <tr>
            <td>Score</td>
            <td></td>
            <td>{{ manga.score }}</td>
        </tr>
        <tr>
            <td>Tahun Rilis</td>
            <td></td>
            <td>{{ manga.published.from }}</td>
        </tr>
    </table>
    <div class="w-full flex flex-row">
        <span>
            <div class="badge badge-primary ml-1" v-for="genre in manga.genres" :key="genre.mal_id">{{ genre.name }}</div>
        </span>
    </div>
    </div>
  </div>
</div>

</template>

<script>
export default{
    name: 'TopMangaCard',
    props:{
        manga:{
            type: Object,
            default: ()=>{
                return {}
            }
        }
    }
}</script>