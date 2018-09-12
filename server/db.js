const pg = require("pg");

const DATABASE = require("../config").DB_CONNECTION;
let pool = new pg.Pool(DATABASE);

pool.on("error", (err, client) => {
  console.error("idle client error", err.message, err.stack);
});

let createQuery = (parts, ...values) => {
  return {
    sql: parts.reduce((prev, curr, i) => prev + "$" + i + curr),
    params: values
  };
};

let query = (text, values) => {
  return pool.connect().then(client => {
    return client.query(text, values)
      .then(res => {
        client.release();
        return res.rows;
      })
      .catch(e => {
        client.release();
        console.error(e.stack);
      });
  });
};

let db = () => {
  let getLinks = async () => {
    let { sql, params } = createQuery `SELECT * FROM link;`;
    return await query(sql, params);
  };

  let addLink = async (link) => {
    let { sql, params } = createQuery`
      INSERT INTO link (link_name, link, is_external_link)
      VALUES(
        ${link.name},
        ${link.link},
        false
      );
    `;

    return await query(sql, params);
  };

  return {
    getLinks,
    addLink
  };
};

module.exports = db();
