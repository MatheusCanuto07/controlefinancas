CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text NOT NULL,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updated_at` integer NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`image` text,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`password` text NOT NULL,
	`saldo` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cartao` (
	`id` integer PRIMARY KEY NOT NULL,
	`idUser` integer NOT NULL,
	`nome` text NOT NULL,
	`tipo` text NOT NULL,
	`diaVencimento` integer NOT NULL,
	`saldo` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `categoria` (
	`id` integer PRIMARY KEY NOT NULL,
	`idUser` integer NOT NULL,
	`nome` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`id` integer PRIMARY KEY NOT NULL,
	`descricao` text NOT NULL,
	`idUser` integer NOT NULL,
	`idCategoria` integer NOT NULL,
	`idCartao` integer NOT NULL,
	`valor` integer NOT NULL,
	`data` integer NOT NULL,
	`meio` text NOT NULL,
	`tipo` text NOT NULL,
	`recorrencia` text NOT NULL,
	`tempoRecorrencia` text,
	`tipoRecorrencia` text,
	`diaRecorrencia` text,
	`idOcorrencia` integer
);
--> statement-breakpoint
CREATE TABLE `lembreteItem` (
	`id` integer,
	`idUser` integer NOT NULL,
	`idCategoria` integer NOT NULL,
	`idLembrete` integer NOT NULL,
	`valor` integer NOT NULL,
	`descricao` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `lembretes` (
	`id` integer PRIMARY KEY NOT NULL,
	`idUser` integer NOT NULL,
	`nome` text NOT NULL,
	`pessoa` text NOT NULL,
	`valor` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);