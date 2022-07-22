/*markdown
https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-json/
*/

/*markdown
Создание таблицы
*/

create TABLE quizes (
	id serial NOT NULL PRIMARY KEY,
	info json NOT NULL,
	hashsum VARCHAR(255) NOT NULL UNIQUE
);

/*markdown
Удалить таблицу quizes
*/

drop table if exists quizes;

/*markdown
Получение содержимого таблицы quizes
*/

select * from quizes;

/*markdown
Очистить таблицу
*/

delete from quizes;

/*markdown
Добавление значения в quizes
*/

insert into quizes (info,hashsum) values ('{"name": "Иван", "surename": "Иванов"}', 'a7a0186ed85020f8e1b566d54cb5fdc7');