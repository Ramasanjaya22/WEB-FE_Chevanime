<template>
  <div>
    <!-- create forum modal -->
    <div class="modal" id="forumModal">
      <div class="modal-box">
        <h3 class="font-bold text-lg text-center">Create forum</h3>
        <form @submit.prevent="addForum">
          <div class="flex flex-col">
            <label for="title">Judul forum</label>
            <input
              type="text"
              class="input input-bordered w-full"
              placeholder="Judul forum"
              v-model="formForum.title"
            />
          </div>
          <div class="flex flex-col">
            <label for="content">Konten forum</label>
            <textarea
              placeholder="Menurut saya anime ini..."
              class="textarea textarea-bordered"
              v-model="formForum.content"
            ></textarea>
          </div>
          <div class="modal-action">
            <a href="#" class="btn btn-outline" ref="btnCloseForumModal"
              >Tutup</a
            >
            <button
              type="submit"
              class="
                btn btn-primary
                bg-orange-400
                border-orange-400
                hover:bg-orange-500 hover:border-orange-500
              "
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- end of forum modal -->

    <h1 class="text-center text-2xl my-5 font-semibold">ChevaNime Forum</h1>

    <div v-if="isLoading">
      <p class="text-center">Loading...</p>
    </div>

    <div v-if="!isLoading && !isError" class="px-24">
      <div class="my-2 space-x-2">
        <a
          href="#forumModal"
          class="
            btn btn-primary
            bg-orange-400
            border-orange-400
            hover:border-orange-500 hover:bg-orange-500
          "
          >Create Forum</a
        >
        <select class="select w-xs select-bordered" 
        v-model="forumType"
        @change="getForums">
          <option selected disable value="">Filter Forum</option>
          <option value="all">Semua forum</option>
          <option value="my">Forum saya</option>
        </select>
      </div>

      <div v-if="forums.length > 0">
      <div class="flex flex-col space-y-3">
        <div
          class="card rounded-md p-5 shadow-xl bg-white hover:cursor-pointer"
          v-for="forum in forums"
          :key="forum.id"
          @click="$router.push({ path : `/forum/${forum.id}`})"
        >
          <h1 class="text-xl font-semibold">{{ forum.data.title }}</h1>
          <h2 class="text-lg font-thin">Author : {{ forum.data.author }}</h2>
          <p class="truncate">{{ forum.data.content }}</p>
        </div>
      </div>
      </div>
      <div v-else>
        <p class="text-center text-xl font-semibold">Belum ada forum</p>
      </div>

  


      <div v-if="isError">
        <p class="text-center">There is an error</p>
      </div>
    </div>
  </div>
</template>

<script>
import {getFirestore,collection,getDocs,query,where,addDoc,Timestamp} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
export default {
  name: "Forum",
  data() {
    return {
      formForum: {
        title: "",
        content: "",
      },
      forumType: "all",
      forums: [],
      isLoading: false,
      isError: false,
    };
  },
  created(){
    this.getForums();
  },
  methods: {
    getForums(){
      this.isLoading = true;
      let q;
      const db = getFirestore(this.$firebase);
      if(this.forumType === 'my'){
        q = query(
          collection(db, 'forums'),
          where('author_uid','==',getAuth().currentUser.uid)
        );
      }else{
        q = query(collection(db,'forums'));
      }
      getDocs(q)
        .then((documents) =>{
          this.forums.length = 0;
          documents.forEach((document) =>{
            this.forums.push({
              id: document.id,
              data:{
                ...document.data(),
                created_at: new Date(
                  document.data().created_at.seconds
                ).toLocaleDateString()
              }
            });
          });
        })
        .catch((error) =>{
          alert(error.message);
          this.isError = true;
        }).finally(()=>{
          this.isLoading = false;
        })
    },
    addForum(){
      const db = getFirestore(this.$firebase);
      const forumData = {
        author: getAuth().currentUser.displayName,
        author_uid: getAuth().currentUser.uid,
        title: this.formForum.title,
        content: this.formForum.content,
        created_at: Timestamp.now()
      };
      addDoc(collection(db,'forums'),forumData)
      .then(() =>{
        alert('Success add forum');
        this.getForums();
        this.formForum.title = '';
        this.formForum.content = '';
        this.$refs.btnCloseForumModal.click();
      })
      .catch((error) =>{alert(error.message)})
    }
  },
};
</script>