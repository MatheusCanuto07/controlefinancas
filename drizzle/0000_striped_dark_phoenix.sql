CREATE TABLE `account` (
	`id` integer PRIMARY KEY NOT NULL,
	`idUser` integer NOT NULL,
	`name` text NOT NULL,
	`balance` integer NOT NULL,
	FOREIGN KEY (`idUser`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
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
CREATE TABLE `transaction` (
	`id` integer PRIMARY KEY NOT NULL,
	`idUser` integer NOT NULL,
	`idCategory` integer NOT NULL,
	`idSubcategory` integer,
	`idCard` integer,
	`categoryName` text,
	`subCategoryName` text,
	`date` integer NOT NULL,
	`description` text NOT NULL,
	`amount` integer NOT NULL,
	FOREIGN KEY (`idUser`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`idCategory`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`idSubcategory`) REFERENCES `subcategory`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`idCard`) REFERENCES `card`(`id`) ON UPDATE no action ON DELETE cascade
);
