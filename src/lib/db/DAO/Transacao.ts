import { db } from "../db";
import { relations, eq, and, like, desc, count, gte, lte, asc, sql, sum } from 'drizzle-orm';
import { dataParaTimestamp } from '$lib/utils/functions';
import {
  transactionTable,
} from '../schema/tables'; 

import type {
  TransactionSelect,
  TransactionInsert,
} from '../schema/tables';

import * as constant from '../../utils/index';
import * as functions from '../../utils/functions'; 

export async function insertTransaction (transaction : TransactionInsert) : Promise<{ id: number }> {
  try {
    if(transaction.recorrencia == constant.active)
    {
      let result;
      let tData = functions.timestampParaData(transaction.data);
      if(transaction.tipoRecorrencia == constant.tiposRecorrencia.diaria){
        for (let index = 0; index < parseInt(transaction.tempoRecorrencia ?? ""); index++) {
          transaction.data = functions.dataParaTimestamp(tData);
          [result] = await db.insert(transactionTable)
            .values({
              ...transaction,
              idOcorrencia: sql`(SELECT last_insert_rowid())`
            })
            .returning({ id: transactionTable.id });
          tData.setDate(tData.getDate() + 1);
        }
        return {id : result?.id ?? 1}
      }
      
      else if(transaction.tipoRecorrencia == constant.tiposRecorrencia.mensal){
        for (let index = 0; index < parseInt(transaction.tempoRecorrencia ?? ""); index++) {
          transaction.data = functions.dataParaTimestamp(tData);
          [result] = await db.insert(transactionTable)
            .values({
              ...transaction,
              idOcorrencia: sql`(SELECT last_insert_rowid())`
            })
            .returning({ id: transactionTable.id });
          tData.setDate(tData.getDate() + 31);
        }
        return {id : result?.id ?? 1}
      } 
      
      else if(transaction.tipoRecorrencia == constant.tiposRecorrencia.anual){
        for (let index = 0; index < parseInt(transaction.tempoRecorrencia ?? ""); index++) {
          transaction.data = functions.dataParaTimestamp(tData);
          [result] = await db.insert(transactionTable)
            .values({
              ...transaction,
              idOcorrencia: sql`(SELECT last_insert_rowid())`
            })
            .returning({ id: transactionTable.id });
          tData.setDate(tData.getDate() + 365);
        }
        return {id : result?.id ?? 1}
      }
    }
    
    const [result] = await db.insert(transactionTable).values(transaction).returning({ id: transactionTable.id });

    return {id: result.id};
  } catch (error) {
    console.error('Erro ao inserir insumo:', error);
  }
  return { id: 0 };
}

export async function selectTransactions(startDate: Date, endDate: Date, idUser : number) {
  try {
    const startTimestamp = dataParaTimestamp(startDate);
    const endTimestamp = dataParaTimestamp(endDate);
    let teste = new Date(1754006400000);


    if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
      throw new Error('Datas INVÁLIDAS fornecidas');
    }

    const result = await db
      .select()
      .from(transactionTable)
      .where(
        and(
          eq(transactionTable.idUser, idUser),
          gte(transactionTable.data, startTimestamp),
          lte(transactionTable.data, endTimestamp),
        )
      )
      .orderBy(desc(transactionTable.id))
      .execute();
    return result;
  } catch (error) {
    console.error('Erro na consulta:', error);
    throw new Error('Falha ao buscar transações');
  }
}

export async function selectTransactionsWithType(startDate: Date, endDate: Date, idUser : number, tipo : string, idCard : number = 0) {
  try {
    const startTimestamp = dataParaTimestamp(startDate);
    const endTimestamp = dataParaTimestamp(endDate);

    if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
      throw new Error('Datas INVÁLIDAS fornecidas');
    }

    let result;
    if(idCard = 0){
      result = await db
        .select()
        .from(transactionTable)
        .where(
          and(
            eq(transactionTable.idUser, idUser),
            eq(transactionTable.tipo, tipo),
            gte(transactionTable.data, startTimestamp),
            lte(transactionTable.data, endTimestamp),
          )
        )
        .orderBy(desc(transactionTable.id))
        .execute();
    }
    else{
      result = await db
        .select()
        .from(transactionTable)
        .where(
          and(
            eq(transactionTable.idUser, idUser),
            eq(transactionTable.tipo, tipo),
            gte(transactionTable.data, startTimestamp),
            lte(transactionTable.data, endTimestamp),
            eq(transactionTable.idCartao, idCard)
          )
        )
        .orderBy(desc(transactionTable.id))
        .execute();
    }
    return result;
  } catch (error) {
    console.error('Erro na consulta:', error);
    throw new Error('Falha ao buscar transações');
  }
}

export async function deleteTransaction(id: number) {
  try {
    const deleted = await db
      .delete(transactionTable)
      .where(
        and(
          eq(transactionTable.id, id),
          eq(transactionTable.idUser, 1),
          eq(transactionTable.idOcorrencia, id)
        )
      )
      .returning({ deletedId: transactionTable.id });

    if (deleted.length === 0) {
      console.warn(`Nenhuma transação encontrada com id: ${id}`);
      return false;
    }

    return true; 
  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    throw error;
  }
}

