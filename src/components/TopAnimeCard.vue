<template>
    <div>
        <div class="card md:card-side bg-base-100 shadow-xl mt-2">
  <figure><img :src="anime.images.webp.image_url" :alt="anime.title"></figure>
  <div class="card-body">
    <h2 class="card-title">{{ anime.title }}</h2>
    <h5 class="card-title text-gray-400">{{ anime.title_japanese }}</h5>

    <table>
        <tr>
            <td>Ranking</td>
            <td></td>
            <td>{{ anime.rank }}</td>
        </tr>
        <tr>
            <td>Episode</td>
            <td></td>
            <td>{{ anime.episodes || '-' }}</td>
        </tr>
        <tr>
            <td>Tipe</td>
            <td></td>
            <td>{{ anime.type }}</td>
        </tr>
        <tr>
            <td>Durasi</td>
            <td></td>
            <td>{{ anime.duration }}</td>
        </tr>
        <tr>
            <td>Score</td>
            <td></td>
            <td>{{ anime.score }}</td>
        </tr>
        <tr>
            <td>Tanggal Rilis Pertama</td>
            <td></td>
            <td>{{ anime.aired.from }}</td>
        </tr>
    </table>
    <div class="w-full flex flex-row">
        <span>
            <div class="badge badge-primary ml-1" v-for="genre in anime.genres" :key="genre.mal_id">{{ genre.name }}</div>
        </span>
    </div>
    </div>
  </div>
</div>

</template>

<script>
export default{
    name: 'TopAnimeCard',
    props:{
        anime:{
            type: Object,
            default: ()=>{
                return {}
            }
        }
    }
}</script>