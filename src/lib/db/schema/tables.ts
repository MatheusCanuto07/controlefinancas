import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";

export const accountTable = sqliteTable('account', {
  id: integer('id').primaryKey().notNull(),
  idUser: integer('idUser').notNull().references(() => user.id, { onDelete: "cascade" }),
  name: text('name').notNull(),
  balance: integer('balance').notNull()
});

export type accountTableSelect = typeof accountTable.$inferSelect;
export type AccountInsert = typeof accountTable.$inferInsert;

export const cardTable = sqliteTable('card', {
  id: integer('id').primaryKey().notNull(),
  idUser: integer('idUser').notNull().references(() => user.id, { onDelete: "cascade" }),
  idAccount: integer('idAccount').notNull().references(() => accountTable.id, { onDelete: "cascade" }),
  name: text('name').notNull(),
  type: text('type').notNull(),
  closing: integer('closing'),
  // Data de vencimento
  dueDate: integer('dueDate'),
  balance: integer('balance').notNull()
});

export type cardTableSelect = typeof cardTable.$inferSelect;
export type CardInsert = typeof cardTable.$inferInsert;

export const categoryTable = sqliteTable('category', {
  id: integer('id').primaryKey().notNull(),
  idUser: integer('idUser').notNull().references(() => user.id, { onDelete: "cascade" }),
  name: text('name').notNull()
});

export type categoryTableSelect = typeof categoryTable.$inferSelect;
export type CategoryInsert = typeof categoryTable.$inferInsert;

export const subcategoryTable = sqliteTable('subcategory', {
  id: integer('id').primaryKey().notNull(),
  idUser: integer('idUser').notNull().references(() => user.id, { onDelete: "cascade" }),
  idCategory: integer('idCategory').notNull().references(() => categoryTable.id, { onDelete: "cascade" }),
  name: text('name').notNull()
});

export type subcategoryTableSelect = typeof subcategoryTable.$inferSelect;
export type SubcategoryInsert = typeof subcategoryTable.$inferInsert;

export const transactionTable = sqliteTable('transaction', {
  id: integer('id').primaryKey().notNull(),
  idUser: integer('idUser').notNull().references(() => user.id, { onDelete: "cascade" }),
  idCategory: integer('idCategory').notNull().references(() => categoryTable.id, { onDelete: "cascade" }),
  idSubcategory: integer('idSubcategory').references(() => subcategoryTable.id, { onDelete: "cascade" }),
  idCard: integer('idCard').references(() => cardTable.id, { onDelete: "cascade" }),
  categoryName: text('categoryName'),
  subCategoryName: text('subCategoryName'),
  date: integer('date').notNull(),
  description : text('description').notNull(),
  amount: integer('amount').notNull()
});

export type transactionTableSelect = typeof transactionTable.$inferSelect;
export type TransactionInsert = typeof transactionTable.$inferInsert;

export const goalTable = sqliteTable('goal', {
  id: integer('id').primaryKey().notNull(),
  idUser: integer('idUser').notNull().references(() => user.id, { onDelete: "cascade" }),
  idSubCategory : integer('subCategory').references(() => subcategoryTable.id, { onDelete: "cascade" }),
  idCategory : integer('category').references(() => categoryTable.id, { onDelete: "cascade" }),
  // Mensal ou por cateboria
  type : text('type').notNull(),
  amount : integer('amount').notNull(),
});

export type goalTableSelect = typeof goalTable.$inferSelect;
export type GoalInsert = typeof goalTable.$inferInsert;

// Lembrete
export const reminderTable = sqliteTable('reminder', {
  id: integer('id').primaryKey().notNull(),
  idUser : integer('idUser').notNull().references(() => user.id, { onDelete: "cascade" }),
  idCard : integer('card').notNull().references(() => cardTable.id, { onDelete: "cascade" }),
  nome : text('name').notNull(),
  amount : integer('amount').notNull(),
  day : integer('day').notNull(),
});

export type reminderTableSelect = typeof reminderTable.$inferSelect;
export type ReminderInsert = typeof reminderTable.$inferInsert;

export const subscriptionTable = sqliteTable('subscription', {
  id: integer('id').primaryKey().notNull(),
  idUser: integer('idUser').notNull().references(() => user.id, { onDelete: "cascade" }),
  idCard : integer('idCard').notNull().references(() => cardTable.id, { onDelete: "cascade" }),
  name: text('name').notNull(),
  amount: integer('amount').notNull(),
  // Mensal / trimestral / anual
  frequency: text('frequency').notNull(),
});

export type subscriptionTableSelect = typeof subscriptionTable.$inferSelect;
export type SubscriptionInsert = typeof subscriptionTable.$inferInsert;









// export const transactionTable = sqliteTable('transaction', {
//   id: integer('id').primaryKey().notNull(),
//   desc : text('descricao').notNull(),
//   idUser: integer('idUser').notNull(),
//   idCategoria: integer('idCategoria').notNull(),
//   idCartao: integer('idCartao').notNull(),
//   valor: integer('valor').notNull(),
//   data: integer('data').notNull(),
//   meio: text('meio').notNull(),
//   tipo: text('tipo').notNull(),
//   // Recorrencia
//   // Sim ou não
//   recorrencia: text('recorrencia').notNull(),
//   // 7 vezes
//   tempoRecorrencia: text('tempoRecorrencia'),
//   // Tipo de ocorrencia
//   tipoRecorrencia: text('tipoRecorrencia'),
//   // Dia ocorrencia
//   diaOcorrencia: text('diaRecorrencia'),
//   // idOcorrencia
//   idOcorrencia: integer('idOcorrencia'),
// });

// export const cartaoTable = sqliteTable('cartao', {
//   id: integer('id').primaryKey().notNull(),
//   idUser: integer('idUser').notNull(),
//   nome: text('nome').notNull(),
//   tipo: text('tipo').notNull(),
//   diaVencimento: integer('diaVencimento').notNull(),
//   saldo: integer('saldo').notNull()
// });

// export const categoriaTable = sqliteTable('categoria', {
//   id: integer('id').primaryKey().notNull(),
//   idUser: integer('idUser').notNull(),
//   nome: text('nome').notNull()
// });

// export const lembretesTable = sqliteTable('lembretes', {
//   id: integer('id').primaryKey().notNull(),
//   idUser : integer('idUser').notNull(),
//   nome : text('nome').notNull(),
//   pessoa : text('pessoa').notNull(),
//   valor : integer('valor').notNull(),
// })

// export const lembreteItem = sqliteTable('lembreteItem', {
//   id: integer('id'),
//   idUser: integer('idUser').notNull(),
//   idCategoria: integer('idCategoria').notNull(),
//   idLembrete : integer('idLembrete').notNull(),
//   valor: integer('valor').notNull(),
//   descricao : text('descricao').notNull(),
// })

// export type TransactionSelect = typeof transactionTable.$inferSelect;
// export type TransactionInsert = typeof transactionTable.$inferInsert;

// export type CartaoSelect = 
//   typeof cartaoTable.$inferSelect & {
//     saldo: number;
// };
// export type CartaoInsert = typeof cartaoTable.$inferInsert;

// export type CategoriaSelect = typeof categoriaTable.$inferSelect;
// export type CategoriaInsert = typeof categoriaTable.$inferInsert;

// export type LembreteSelect = typeof lembretesTable.$inferSelect;
// export type LembreteInsert = typeof lembretesTable.$inferInsert;