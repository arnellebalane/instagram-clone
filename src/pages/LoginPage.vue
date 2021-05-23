<template>
  <div class="LoginPage">
    <div class="LoginCard">
      <img class="Logo" src="~_assets/images/logo.png" alt="Instagram logo" />

      <LoginForm />
      <p class="Separator">or</p>

      <button class="LoginButton">
        <img src="~_assets/images/google-logo.png" alt="Google logo" />
        Login with Google
      </button>
    </div>

    <LoginFooter />
  </div>
</template>

<script>
import LoginForm from '_components/LoginForm.vue';
import LoginFooter from '_components/LoginFooter.vue';

export default {
  components: {
    LoginForm,
    LoginFooter,
  },
};
</script>

<style scoped>
.LoginPage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20rem;
}

.LoginCard {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  width: 100%;
  max-width: 36rem;
  padding: 3.6rem;
  border: 1px solid var(--gray-200);
  background-color: var(--white);
}

.Logo {
  display: block;
  width: 65%;
  margin: 0 auto;
  margin-bottom: 1.6rem;
}

.Separator {
  position: relative;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  color: var(--gray-400);
}

.Separator::before,
.Separator::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  border-top: 1px solid var(--gray-300);
}

.Separator::before {
  left: 0;
}

.Separator::after {
  right: 0;
}

.LoginButton {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border: none;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--gray-700);
  background: none;
  cursor: pointer;
}

.LoginButton img {
  width: 1.4rem;
}

.LoginFooter {
  margin-top: 1rem;
}
</style>
