import { db } from "../db";
import { relations, eq, and, like, desc, count, gte, lte, asc, sql, sum } from 'drizzle-orm';
import { dataParaTimestamp } from '$lib/utils/functions';
import {
  transactionTable,
  cartaoTable,
} from '../schema/tables'; 

import type {
  CartaoSelect,
  CartaoInsert,
} from '../schema/tables';

import * as constant from '../../utils/index';
import * as functions from '../../utils/functions'; 

export async function createCartao(cartao : CartaoInsert) {
  try {
    const [result] = await db.insert(cartaoTable).values(cartao).returning({ id: cartaoTable.id });
    return {id: result.id};
  } catch (error) {
    console.error('Erro ao inserir insumo:', error);
  }
  return { id: 0 };
}

export async function getCartaoById(id : number , idUser : number){
  try{
    const [result] = await db
      .select()
      .from(cartaoTable)
      .where(and(eq(cartaoTable.id, id), eq(cartaoTable.idUser, idUser)))
      .execute();
    return result;
  } catch(error){
    console.error('Erro ao buscar cartão:', error);
    throw error;
  }
}

export async function getCartoes(idUser : number){
  try{
    const result = await db
      .select()
      .from(cartaoTable)
      .where(eq(cartaoTable.idUser, idUser))
      .execute()
    return result;
  } catch(error){
    console.error('Erro ao buscar cartões:', error);
    throw error;
  }
}

export async function getSaldoByCard(idUser : number, idCard : number, startDate : number, endDate : number){
  try{
    const [result] = await db
      .select({
        value : sum(transactionTable.valor)
      })
      .from(transactionTable)
      .where(
        and(
          eq(transactionTable.idUser, idUser),
          eq(transactionTable.idCartao, idCard),
          gte(transactionTable.data, startDate),
          lte(transactionTable.data, endDate)
        )
      )
      .execute();
    return {result : parseInt(result.value || "0")};
  } catch(error){
    console.error('Erro ao buscar saldo:', error);
    throw error;
  }
}
