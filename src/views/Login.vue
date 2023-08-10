<script setup>
import { onMounted, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../api/base.js'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const router = useRouter()

const formState = reactive({
  account: '',
  mima: ''
})

//method
const submit = async () => {
  const res = await login(formState);
  if (res.isSucess) {
    const { access_token, refresh_token } = res.data;
    authStore.setToken(access_token, refresh_token);
    router.push('/');
  }
}
const onFinish = () => {
  submit();
}

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.account && formState.mima)
})

onMounted(() => {
  //清除 token
  authStore.resetSession()
})
</script>

<template>
  <main>
    <a-card class="card">
      <h3>易居物業</h3>
      <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish" @finishFailed="onFinishFailed">
        <a-form-item label="帳號 " name="account">
          <a-input v-model:value="formState.account">
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="密碼" name="mima">
          <a-input-password v-model:value="formState.mima">
            <template #prefix>
              <LockOutlined class="site-form-item-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
            Log in
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </main>
</template>

<style lang="less" scoped>
main {
  height: 100vh;
  display: grid;
  place-items: center;
  background: url('/city.png');
  background-repeat: no-repeat;
  background-size: cover;

  .card {
    border-radius: 10px;

    h3 {
      color: gray;
      font-size: 24px;
      font-weight: 700;
      text-align: center;
    }

    .ant-form-item {
      padding-bottom: 0.5rem;

      .login-form-button {
        width: 100%;
      }
    }
  }
}</style>
