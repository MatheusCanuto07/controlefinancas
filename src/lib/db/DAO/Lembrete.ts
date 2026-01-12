import { db } from "../db";
import { relations, eq, and, like, desc, count, gte, lte, asc, sql, sum } from 'drizzle-orm';
import { dataParaTimestamp } from '$lib/utils/functions';
import {
  lembretesTable
} from '../schema/tables'; 

import type {
  LembreteInsert,
} from '../schema/tables';

import * as constant from '../../utils/index';
import * as functions from '../../utils/functions'; 

export async function createLembrete(lembrete : LembreteInsert){
  try{
    const [result] = await db
      .insert(lembretesTable)
      .values(lembrete).
      returning({ id: lembretesTable.id });
    return {id: result.id};
  } catch(error){
    console.error('Erro ao inserir insumo:', error);
  }
}

export async function getLembretes(idUser : number){
  try{
    const result = await db
      .select()
      .from(lembretesTable)
      .where(eq(lembretesTable.idUser, idUser))
      .execute();
    return result;
  } catch(error){
    console.error('Erro ao buscar lembretes:', error);
    throw error;
  }
}

export async function getLastThreeLembretes(idUser : number){
  try{
    const result = await db
      .select()
      .from(lembretesTable)
      .where(eq(lembretesTable.idUser, idUser))
      .limit(3)
      .execute();
    return result;
  } catch(error){
    console.error('Erro ao buscar lembretes:', error);
    throw error;
  }
}
