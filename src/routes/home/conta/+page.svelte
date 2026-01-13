<script lang="ts">
  import type { PageProps } from './$types';
  import { getAccounts } from '$lib/controller/AccountController.remote';

  const accounts = getAccounts();
  let { data }: PageProps = $props();
</script>

<div class="breadcrumbs text-sm">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/home/conta">Demonstrativo</a></li>
  </ul>
</div>

{#if accounts.loading}
  <div class="flex justify-center items-center p-12">
    <span class="loading loading-spinner loading-lg"></span>
    <p class="ml-3">Carregando contas...</p>
  </div>
{:else if accounts.error}
  <div class="alert alert-error">
    <span>Erro ao carregar: {accounts.error.message}</span>
  </div>
{:else if accounts.current?.length}
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Saldo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {#each accounts.current as { id, name, balance }}
          <tr class="hover">
            <th>{id}</th>
            <td>{name}</td>
            <td class="font-bold {(balance ?? 0) >= 0 ? 'text-success' : 'text-error'}">
              R$ {balance?.toFixed(2) ?? '0.00'}
            </td>
            <td>
              <a href="/home/conta/editar/{id}" class="btn btn-ghost btn-xs">
                Editar
              </a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  <p>Nenhuma conta cadastrada.</p>
{/if}

<button class="btn btn-primary">Teste</button>