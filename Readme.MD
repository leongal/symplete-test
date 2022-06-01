# This is Drag and Drop test for Symplete
## Environment
1. Install Node > v16.15.0.
<br/>
2. Install XAMPP

## Run Backend
### Enivronment value configuration
> Please make sure you set the correct value for MySQL server connection in .env(in `back-end` folder) file
```bash
PORT = 3001            -> Set the port number you want to listen this server | default is 3001
MYSQL_HOST = localhost -> Set the MySQL HOST | default is "localhost"
MYSQL_PORT = 3306      -> This is PORT number of MySQL server
MYSQL_USER = root      -> This is USER of MySQL server | default is "root"
MYSQL_PWD =            -> This is PWD of MySQL server | default is ""
DB_NAME = symplete     -> This is Database Name | You can change this as you want
TABLE_NAME =categories -> This is Table Name | You can change this as well
```
### Install dependencies and run
```bash
cd back-end
npm install
npm start
```

## Run Frontend
### Environment value configuration
> Make sure you set the back-end api(`.env` in front-end folder) exactly
```bash
REACT_APP_SYMPLETE_API = http://localhost:3001
```
### Install dependencies and run
```bash
1. cd front-end
2. yarn install
3. yarn start
```