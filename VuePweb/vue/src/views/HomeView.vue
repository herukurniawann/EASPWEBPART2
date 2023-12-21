<script setup>
import { ref } from 'vue'
const email = ref('')
const password = ref('')
const id1 = ref('')
const email1 = ref('')
const id2 = ref('')
const email2 = ref('')
const users = ref([])
const chats = ref([])
const chat = ref('')

async function login() {
  const res = await fetch('http://localhost:3000/api/users/login', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    }),
  });
  const json = await res.json()
  console.log(json)

  if (json && json.user) {
    id1.value = json.user.id
    email1.value = json.user.email

    getUser()
  }
}

async function getUser() {
  const res = await fetch('http://localhost:3000/api/users/', {
    method: "GET",
    credentials: 'include',
  });
  const json = await res.json()
  console.log(json)
  users.value = json.docs
}

async function getChats() {
  const res = await fetch('http://localhost:3000/api/chats/', {
    method: "GET",
    credentials: 'include',
  });
  const json = await res.json()
  console.log(json)
  chats.value = json.docs

  sendChat()
}

async function sendChat() {
  const res = await fetch('http://localhost:3000/api/chats', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: id1.value,
      to: id2.value,
      message: chat.value,
    }),
  });

}
</script>

<template>
  <div class="login-form">
    Email : {{ email }} <br>
    Password : {{ password }}
    <br>
    Email1 : {{ email1 }} <br>
    id1 : {{ id1 }}
    <br>
    Email2 : {{ email2 }} <br>
    id2 : {{ id2 }}
    <div v-if="id1 == ''">
      <form @submit.prevent="submitForm" class="form">
        <div class="mb-3 row">
          <label for="staticEmail" class="col-sm-4 col-form-label">Email</label>
          <div class="col-sm-12">
            <input type="email" class="form-control" id="exampleInputEmail1" v-model="email"
              placeholder="email@gmail.com" />

          </div>
        </div>
        <div class="mb-3 row">
          <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
          <div class="col-sm-12">
            <input type="password" class="form-control" id="inputPassword" v-model="password">
          </div>
        </div>
        <button type="submit" @click="login" class="btn btn-primary">Login</button>
      </form>
    </div>
    <div v-else>
      <h2>chat</h2>
      <l1 v-for="user in users">
        <a @click="id2 = user.id; email2 = user.email; getChats()">{{ user.email }}</a>
        <br>
      </l1>
      chat with : {{ email2 }} <br><br>
      <div v-for="chat in chats">
        <div v-id="chat.from.id == id2 && chat.to.id == id1">
          <div>
            {{ chat.from.email }} -> {{ chat.to.email }} : {{ chat.message }}
          </div>
        </div>

        <div v-id="chat.from.id == id1 && chat.to.id == id2">
          <div>
            {{ chat.from.email }} -> {{ chat.to.email }} : {{ chat.message }}
          </div>

        </div>

      </div>
      <input v-model="chat">
      <button @click="sendChat()">Kirim Pesan</button>
    </div>

  </div>
</template>

<style>
.login-form {
  margin-left: 100px;
}
</style>
