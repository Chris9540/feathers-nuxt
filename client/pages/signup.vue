<template>
  <Page name="Signup" route="/signup">
    <Card name="Signup" width="400px">
      <template #body>
        <form>
          <ul>
            <li class="p-1">
              <InputControl label="Email">
                <input type="email" name="email" v-model="email" placeholder="user@email.com">
              </InputControl>
            </li>
            <li class="p-1">
              <InputControl label="Password">
                <input type="password" name="password" v-model="password" placeholder="password">
              </InputControl>
            </li>
            <li class="f-cr p-1">
              <Button color="success" @click.prevent="signup">
                Signup
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
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('users', ['create']),
    ...mapActions('auth', ['authenticate']),
    async signup() {
      const credentials = { email: this.email, password: this.password };
      this.isSigningUp = true;
      await this.create(credentials);
      await this.authenticate({ ...credentials, strategy: 'local' });
      this.isSigningUp = false;
      this.$router.push('/secret');
    }
  }
}
</script>

<style>

</style>




