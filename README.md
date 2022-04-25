# BlizzbotTS
a ts version for the blizzbot
```sql
CREATE TABLE `UserWatchtimes` (`user` TEXT NOT NULL UNIQUE, `watchtime` BIGINT, `year` SMALLINT NOT NULL UNIQUE, `month` TINYINT NOT NULL UNIQUE, `channel` TEXT NOT NULL UNIQUE, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`user`, `year`, `month`, `channel`))
```