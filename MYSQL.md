# MySQL 설치
## [Bitnami](https://bitnami.com) 에서 wamp(맥 사용자는 mamp)를 다운로드 하여 설치한다.
### PHP 관련 설정은 전부 끈다. 
### Cloud 설치는 체크 해제한다.
### 비밀번호를 넣는다.
### 마지막에 Apache와 MySQL의 방화벽을 열어준다.
### 맨 처음 mysql을 접근하려면 환경변수 설정이 필요하다. 아래와 같이 설정한다.
1. 내컴퓨터에서 오른쪽버튼 클릭 -> 속성
2. 왼쪽 날개에 있는 고급시스템 설정 클릭
3. 하단의 환경변수를 클릭 후 창에서 path를 클릭하여 새로운 패스 등록 (C:\Bitnami\wampstack-7.31.2-0\mysql\bin)

# MySQL 접속하여 배우기
1. 접속하기
```bash
mysql -u root -p
```
2. 데이터베이스 만들기
```sql
create database test1;
use test1;
```
3. 테이블 만들기
```sql
create table sample1 (
	id int(11),
	name varchar(50),
	createdAt datetime
);
show tables;
desc sample1;
```

4. MySQL 8.0 에서는 Heidi와 같은 외부 Client를 사용하기 위해 아래와 같이 권한을 설정한다.
```sql
use mysql;
/* Database changed */

create user `root`@`%` identified by 'password';
-- Query OK, 0 rows affected (0.01 sec)

grant all privileges on *.* to `root`@`%`;
-- Query OK, 0 rows affected (0.01 sec)

flush privileges;
-- Query OK, 0 rows affected (0.00 sec)
```

## DATABASE CRUD 명령
1. Create
```sql
INSERT INTO users 
('userid', 'userpw', 'username', 'email') 
VALUES 
('booldook', '000000', '불뚝', 'booldook@gmail.com');

INSERT INTO users SET 
'userid' = 'booldook', 
'userpw' = '000000', 
'username' = '불둑', 
'email' = 'booldook@naver.com';
```

2. Read
```sql
-- WHERE -> ORDER -> LIMIT
SELECT * FROM users;
SELECT userid, username FROM users;
SELECT * FROM users WHERE userid = 'booldook';
SELECT * FROM users WHERE userid = 'booldook' AND userpw = '111111';
SELECT * FROM users WHERE createdAt > '2020-07-09 00:00:00';
SELECT * FROM users WHERE email LIKE '%@gmail.com'; -- %는 와일드카드
SELECT * FROM users WHERE userid = 'booldook' OR userid = 'booldook2';
SELECT * FROM users ORDER BY id ASC;
SELECT * FROM users ORDER BY id DESC;
SELECT * FROM users WHERE userid like 'b%' ORDER BY id DESC;
SELECT * FROM gbook ORDER BY id DESC LIMIT 0, 10; -- LIMIT 시작레코드, 갯수
SELECT * FROM gbook ORDER BY id DESC LIMIT 10, 10;
```

3. Update
```sql
UPDATE users SET username='홍길만', userpw='111111' WHERE id=5;
```

4. Delete
```sql
DELETE FROM users WHERE id=4;
```