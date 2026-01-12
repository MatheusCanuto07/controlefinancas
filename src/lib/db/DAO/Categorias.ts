import { db } from "../db";
import { relations, eq, and, like, desc, count, gte, lte, asc, sql, sum } from 'drizzle-orm';
import { dataParaTimestamp } from '$lib/utils/functions';
import {
  categoriaTable,
  cartaoTable,
} from '../schema/tables'; 

import type {
  CategoriaSelect,
  CategoriaInsert
} from '../schema/tables';

import * as constant from '../../utils/index';
import * as functions from '../../utils/functions'; 

export async function createCategory(categoria : CategoriaInsert) {
  try {
    const [result] = await db.insert(categoriaTable).values(categoria).returning({ id: categoriaTable.id });
    return {id: result.id};
  } catch (error) {
    console.error('Erro ao inserir insumo:', error);
  }
  return { id: 0 };
}
 
export async function deleteCategory(id : number){
  try{
    const [result] = await db
      .delete(categoriaTable)
      .where(eq(categoriaTable.id, id))
      .returning({ deletedId: categoriaTable.id });

    if (result.deletedId === 0) {
      console.warn(`Nenhuma categoria encontrada com id: ${id}`);
      return false;
    }

    return true;
  } catch(error){
    console.error('Erro ao deletar categoria:', error);
    throw error;
  }
}

export async function getCategorias(idUser : number){
  try{
    const result = await db
      .select()
      .from(categoriaTable)
      .where(eq(categoriaTable.idUser, idUser))
      .execute();
    return result;
  } catch(error){
    console.error('Erro ao buscar categorias:', error);
    throw error;
  }
}