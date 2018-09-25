# IntraLite
A small intranet designed to show useful information to someone. IE links and noticeboard(s). 

### Roadmap
* Noticeboard
* Move API to .netCore

### Tooling
NodeJS, VueJS, PostgreSQL


## Setup Config
You need to add a config to make sure the application runs
```
const DB_CONNECTION = {
  host: "",
  user: "",
  password: "",
  database: ""
};

exports.DB_CONNECTION = DB_CONNECTION;
```

You will also need to create the PSQL database, which can be found `\documentation\sql\createtable.sql`

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

