<template>
<div>
 <div v-if="authorized">
  {{user.nickname}}
  {{user.email}}
 </div>

 <div v-else>
  Usuário não autorizado
 </div>
<div v-if="authorized">
 {{user.nickname}}
 {{user.email}}
 
 <a href="#" @click.prevent="logout()">Logout</a>
 </div>
 <div v-else>
  Usuário não autorizado
 </div>
</div>

</template>

<script>


export default {
 name: "UserProfile",
 data: function() {
  return {
   nickname : {
    login: "",
    email: "" 
},
authorized: false
};
},

created: function() {
const token = localStorage.getItem("token")
console.log(token)
if (token !== null) {
this.authorized = true
axios
.get("http://localhost:3000/profile", {headers: {"x-access-token": token}})
.then(response => {
this.user.nickname = response.data.nickname
this.user.email = response.data.email
})
.catch(e => {
console.log("error");
});
}
},

methods: {
logout: function() {
localStorage.removeItem("token")
this.$router.push({name: "UserLogin"})
}
}
}

</script>


