<script lang="ts">
  import type { PageData } from './$types';
  import { authClient } from "$lib/auth-client";
	import { goto } from '$app/navigation';
  import { enhance } from '$app/forms';
  let email = $state("");
  let password = $state("");
  let name = $state("");
  let errorMessage = $state("");
  let isLoading = $state(false);

  const cadastro = async () => {
    
  }

  let { data }: { data: PageData } = $props();

</script>

<div class="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
  <div class="card w-full max-w-md bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="text-3xl text-center font-bold mb-2">Cadastro</h2>
      <p class="text-center text-gray-500 mb-6">Cria a sua conta para continuar</p>
      
      {#if errorMessage}
        <div class="alert alert-error mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      {/if}
      
      <form method="POST" class="space-y-4" onsubmit={async (e) => { await cadastro()} } use:enhance={() => {
        // Validação no front vem aqui

        return async ({ result }) => {
          const { error } = await authClient.signUp.email({
            email,
            password,
            name, 
            callbackURL: "/dashboard"
            }, 
            {
              onRequest: (ctx) => {
                //show loading
              },
              onSuccess: (ctx) => {
                //redirect to the dashboard or sign in page
                goto('/dashboard');
              },
              onError: (ctx) => {
                // display the error message
                alert(ctx.error.message);
              },
          });
        }
      }}>
        <div class="form-control">
          <label for="nome" class="label">
            <span class="label-text">Nome</span>
          </label>
          <input
            name="nome"
            type="text" 
            placeholder="Seu nome" 
            class="input input-bordered focus:input-primary" 
            bind:value={name}
            required
          />
        </div>

        <div class="form-control">
          <label for="email" class="label">
            <span class="label-text">Email</span>
          </label>
          <input
            name="email"
            type="email" 
            placeholder="seu@email.com" 
            class="input input-bordered focus:input-primary" 
            bind:value={email}
            required
          />
        </div>

        <div class="form-control">
          <label for="password" class="label">
            <span class="label-text">Senha</span>
          </label>
          <input 
            name="password"
            type="password" 
            placeholder="Sua senha" 
            class="input input-bordered focus:input-primary" 
            bind:value={password}
            required
          />
          <a href="/esqueceusenha" class="label-text-alt link link-hover">Esqueceu a senha?</a>  
        </div>

        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-2">
            <input type="checkbox" class="checkbox checkbox-primary" />
            <span class="label-text">Lembrar-me</span>
          </label>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary" class:loading={isLoading} type="submit" disabled={isLoading}>
            {#if isLoading}
              <span class="loading loading-spinner"></span>
              Processando...
            {:else}
              Entrar
            {/if}
          </button>
        </div>
      </form>
      <p class="text-center mt-6">
        Não tem uma conta? 
        <a href="/cadastro" class="link link-primary ml-1">Cadastre-se</a>
      </p>
    </div>
  </div>
</div>