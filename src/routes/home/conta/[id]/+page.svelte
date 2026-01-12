<script>
  import AccountForm from '$lib/components/form/AccountForm.svelte';
  import { getAccount } from '$lib/controller/AccountController.remote.js';
  import { page } from '$app/state';

  let id = parseInt(page.params.id ?? '0');

  let { data } = $props();
</script>

<h1>Editar Conta</h1>

<AccountForm account={await getAccount(id)}/>