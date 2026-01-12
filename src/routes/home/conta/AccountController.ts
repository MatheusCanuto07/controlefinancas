import * as v from 'valibot';
import { query, form } from '$app/server';
import { redirect } from '@sveltejs/kit';
import { db } from '$lib/db/db';
import { 
  type accountTableSelect,
  type AccountInsert,
  accountTable
} from '$lib/db/schema/tables';
import { eq, lt, gte, ne } from 'drizzle-orm';

const validateAccount = v.object({
  id: v.optional(v.number()),
	name: v.pipe(
		v.string(),
		v.nonEmpty('O nome é obrigatório'),
		v.minLength(2, 'O nome deve ter pelo menos 2 caracteres'),
		v.maxLength(30, 'O nome deve ter no máximo 30 caracteres')
	),
  balance: v.pipe(
    v.number()
  )
});

export const saveAccount = form(validateAccount, async (data) => {
	try{
    if (data.id){
      await db.update(accountTable).set({
        name: data.name,
        balance: data.balance
      }).where(
        eq(accountTable.id, data.id)
      );
      return;
    }
    else{
      await db.insert(accountTable).values({
        name: data.name,
        balance: data.balance,
        idUser: 1
      });
    }
  }
  catch(e){
    console.error('Erro ao salvar a conta:', e);
    throw e;
  }

  throw redirect(303, '/accounts');
});

export const getAccount = query(v.number(), async (idAccount: number) => {
	try{
    const [account] = await 
      db.select().from(accountTable).where(
      eq(accountTable.id, idAccount)
    );
    return account;
  }
  catch(e){
    console.error('Erro ao obter a conta:', e);
    throw e;
  }
});

export const getAccounts = query(async () => {
  try{
    console.log('Obtendo todas as contas');
    const accounts = await db.select().from(accountTable);
    return accounts;
  }
  catch(e){
    console.error('Erro ao obter as contas:', e);
    throw e;
  }
});
