CREATE TABLE `card` (
	`id` integer PRIMARY KEY NOT NULL,
	`idUser` integer NOT NULL,
	`idAccount` integer NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`closing` integer,
	`dueDate` integer,
	`balance` integer NOT NULL,
	FOREIGN KEY (`idUser`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`idAccount`) REFERENCES `account`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` integer PRIMARY KEY NOT NULL,
	`idUser` integer NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`idUser`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `goal` (
	`id` integer PRIMARY KEY NOT NULL,
	`idUser` integer NOT NULL,
	`subCategory` integer,
	`category` integer,
	`type` text NOT NULL,
	`amount` integer NOT NULL,
	FOREIGN KEY (`idUser`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`subCategory`) REFERENCES `subcategory`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `reminder` (
	`id` integer PRIMARY KEY NOT NULL,
	`idUser` integer NOT NULL,
	`card` integer NOT NULL,
	`name` text NOT NULL,
	`amount` integer NOT NULL,
	`day` integer NOT NULL,
	FOREIGN KEY (`idUser`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`card`) REFERENCES `card`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `subcategory` (
	`id` integer PRIMARY KEY NOT NULL,
	`idUser` integer NOT NULL,
	`idCategory` integer NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`idUser`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`idCategory`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `subscription` (
	`id` integer PRIMARY KEY NOT NULL,
	`idUser` integer NOT NULL,
	`idCard` integer NOT NULL,
	`name` text NOT NULL,
	`amount` integer NOT NULL,
	`frequency` text NOT NULL,
	FOREIGN KEY (`idUser`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`idCard`) REFERENCES `card`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
DROP TABLE `cartao`;--> statement-breakpoint
DROP TABLE `categoria`;--> statement-breakpoint
DROP TABLE `lembreteItem`;--> statement-breakpoint
DROP TABLE `lembretes`;--> statement-breakpoint
/*
 SQLite does not support "Dropping foreign key" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
/*
 SQLite does not support "Changing existing column type" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
/*
 SQLite does not support "Drop not null from column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE `account` ADD `idUser` integer NOT NULL REFERENCES user(id);--> statement-breakpoint
ALTER TABLE `account` ADD `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `account` ADD `balance` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `transaction` ADD `idCategory` integer NOT NULL REFERENCES category(id);--> statement-breakpoint
ALTER TABLE `transaction` ADD `idSubcategory` integer REFERENCES subcategory(id);--> statement-breakpoint
ALTER TABLE `transaction` ADD `idCard` integer REFERENCES card(id);--> statement-breakpoint
ALTER TABLE `transaction` ADD `categoryName` text;--> statement-breakpoint
ALTER TABLE `transaction` ADD `subCategoryName` text;--> statement-breakpoint
ALTER TABLE `transaction` ADD `date` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `transaction` ADD `description` text NOT NULL;--> statement-breakpoint
ALTER TABLE `transaction` ADD `amount` integer NOT NULL;--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE `account` DROP COLUMN `account_id`;--> statement-breakpoint
ALTER TABLE `account` DROP COLUMN `provider_id`;--> statement-breakpoint
ALTER TABLE `account` DROP COLUMN `user_id`;--> statement-breakpoint
ALTER TABLE `account` DROP COLUMN `access_token`;--> statement-breakpoint
ALTER TABLE `account` DROP COLUMN `refresh_token`;--> statement-breakpoint
ALTER TABLE `account` DROP COLUMN `id_token`;--> statement-breakpoint
ALTER TABLE `account` DROP COLUMN `access_token_expires_at`;--> statement-breakpoint
ALTER TABLE `account` DROP COLUMN `refresh_token_expires_at`;--> statement-breakpoint
ALTER TABLE `account` DROP COLUMN `scope`;--> statement-breakpoint
ALTER TABLE `account` DROP COLUMN `password`;--> statement-breakpoint
ALTER TABLE `account` DROP COLUMN `created_at`;--> statement-breakpoint
ALTER TABLE `account` DROP COLUMN `updated_at`;--> statement-breakpoint
ALTER TABLE `transaction` DROP COLUMN `descricao`;--> statement-breakpoint
ALTER TABLE `transaction` DROP COLUMN `idCategoria`;--> statement-breakpoint
ALTER TABLE `transaction` DROP COLUMN `idCartao`;--> statement-breakpoint
ALTER TABLE `transaction` DROP COLUMN `valor`;--> statement-breakpoint
ALTER TABLE `transaction` DROP COLUMN `data`;--> statement-breakpoint
ALTER TABLE `transaction` DROP COLUMN `meio`;--> statement-breakpoint
ALTER TABLE `transaction` DROP COLUMN `tipo`;--> statement-breakpoint
ALTER TABLE `transaction` DROP COLUMN `recorrencia`;--> statement-breakpoint
ALTER TABLE `transaction` DROP COLUMN `tempoRecorrencia`;--> statement-breakpoint
ALTER TABLE `transaction` DROP COLUMN `tipoRecorrencia`;--> statement-breakpoint
ALTER TABLE `transaction` DROP COLUMN `diaRecorrencia`;--> statement-breakpoint
ALTER TABLE `transaction` DROP COLUMN `idOcorrencia`;