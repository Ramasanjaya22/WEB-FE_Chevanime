<template>
    <div>
        <div class="px-10">
          <div class="flex justify-center items-center h-screen">
            <div class="card card-bordered border-2 shadow-xl w-96 h-fit">
              <div class="card-body">
                <h1 class="card-title text-center text-2xl">login</h1>
                <form @submit.prevent="doLogin">
                  <div class="flex flex-col space-y-2">
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Email</span>
                      </label>
                      <input type="email" 
                      placeholder="Your email" 
                      class="input input-bordered" 
                      v-model="formLogin.email"
                      required/>
                    </div>
                    <div class="form-control">
                      <label class="label">
                        <span class="label-text">Password</span>
                      </label>
                      <input type="password" 
                      placeholder="Your Password" 
                      class="input input-bordered" 
                      v-model="formLogin.password"
                      required/>
                    </div>
                    <button type="submit" class="btn bg-orange-400 border-none hover:bg-orange-500">Login</button>
                  </div>
                </form>
                <div class="justify-center card-actions buttom-0">
                  <p>
                    Don't have an account?
                    <router-link to="/register" class="text-orange-400">Register</router-link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
  export default{
    name: 'Login',
    data() {
      return {
        formLogin:{
          email: '',
          password: '',
        }
      }
    },
    methods:{
      doLogin(){
        signInWithEmailAndPassword(
          getAuth(),
          this.formLogin.email,
          this.formLogin.password
        )
        .then(()=>{
            this.$router.push({ path: '/'});
          })
          .catch((err) => alert(err.message));
      }
    }
  }
</script>