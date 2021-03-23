<template>
  <Page name="My Profile" route="/session/profile">
    <Card name="Update" width="700px">
      <template #body>
        <form v-if="user !== null">
          <ul>
            <li class="p-1">
              <InputControl label="Email">
                <input type="email" name="email" v-model="user.email" placeholder="user@email.com">
              </InputControl>
            </li>
            <li class="p-1">
              <InputControl label="Name">
                <input type="text" name="name" v-model="user.name" placeholder="User Name">
              </InputControl>
            </li>
            <li class="p-1">
              <InputControl label="Role">
                <select v-model="user.role">
                  <option value="player">Player</option>
                  <option value="dm">Dungeon Master</option>
                </select>
              </InputControl>
            </li>
            <li class="p-1">
              <InputControl label="Character Link">
                <input type="url" name="link" v-model="user.link" style="max-width: 100%" placeholder="https://dndbeoyond.com/">
              </InputControl>
            </li>
            <li class="f-cr p1">
              <Button color="success" @click.prevent="save">
                Save
              </Button>
            </li>
          </ul>
        </form>
      </template>
    </Card>
  </Page>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Profile',
  data() {
    return {
      user: null
    }
  },
  methods: {
    ...mapActions('users', ['patch']),
    async save () {
      const { id, name, email, role, link } = this.user;
      const data = await this.patch([id, { email, name, link, role }])
      console.log(data)
    }
  },
  mounted() {
    console.log(this.$store)
    const {id, email, name, role, link} = this.$store.state.auth.user;
    this.user = { id, email, name, role, link }
  }
}
</script>

<style>

</style>