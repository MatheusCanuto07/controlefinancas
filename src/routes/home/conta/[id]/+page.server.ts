import type { PageServerLoad } from './$types';
import { getAccount } from '$lib/controller/AccountController.remote.js';

export const load = (async ({params}) => {
  const id = parseInt(params.id ?? '0');
	const account = await getAccount(id);

	return {
		account
	};
}) satisfies PageServerLoad;