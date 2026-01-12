<script lang="ts">
  import type { PageData } from './$types';
  import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

  let { data }: { data: PageData } = $props();
</script>


<div>
  Tem certeza que deseja sair?
  
  <button type="submit" onclick={
    async () => 
    {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            goto("/login");
          },
        },
      });
    }
  }>
    Sair
  </button>
  
</div>