<template>
  <Page name="Login" route="/authenticate">
    <Card name="Login" width="400px" :expand="false">
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
              <Button color="success" @click.prevent="login" async>
                Login
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
  name: 'Login',
  data () {
    return {
      isLoggingIn: false,
      email: 'chris.9540@gmail.com',
      password: '9540muffin',
    }
  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    async login() {
      const credentials = { email: this.email, password: this.password };
      this.isLoggingIn = true;
      await this.authenticate({ ...credentials, strategy: 'local' });
      this.isLoggingIn = false;
      this.$router.push('/');
    },
  }
}
</script>



