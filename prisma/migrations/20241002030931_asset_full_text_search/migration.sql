-- CreateIndex
CREATE FULLTEXT INDEX `Asset_name_comment_idx` ON `Asset`(`name`, `comment`);

-- CreateIndex
CREATE FULLTEXT INDEX `Asset_name_meta_idx` ON `Asset`(`name`, `meta`);

-- CreateIndex
CREATE FULLTEXT INDEX `Asset_meta_comment_idx` ON `Asset`(`meta`, `comment`);

-- CreateIndex
CREATE FULLTEXT INDEX `Asset_name_meta_comment_idx` ON `Asset`(`name`, `meta`, `comment`);
