import type { PageServerLoad, Actions } from './$types';
import {auth} from '$lib/auth';
import { authClient } from '$lib/auth-client';
import { redirect } from '@sveltejs/kit';

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions = {
	login: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString() || "";
		const password = data.get('password')?.toString() || "";
    console.log(email, password);
    try{
      const response = await auth.api.signInEmail({
        body: {
          email,
          password,
          callbackURL: '/home/dashboard',
          // Default
          rememberMe: true
        },
        asResponse: true // returns a response object instead of data
      });
    }
    catch(error : any){
      console.error('Erro ao fazer login:', error);
      return { error: 'Erro ao fazer login' };
    }

    redirect(303, '/home/dashboard');

	},
} satisfies Actions;