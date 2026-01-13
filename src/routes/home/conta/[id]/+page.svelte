<script>
  import AccountForm from '$lib/components/form/AccountForm.svelte';

  let { data } = $props();
</script>

<h1>Editar Conta</h1>

<AccountForm account={data.account}/>