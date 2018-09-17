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
        throw e;
      });
  });
};

let db = () => {
  let getLinks = () => {
    let { sql, params } = createQuery`SELECT * FROM link;`;
    return query(sql, params);
  };

  let addLink = link => {
    // console.l
    let { sql, params } = createQuery`
      INSERT INTO link (link_name, link, is_external_link)
      VALUES(
        ${link.link_name},
        ${link.link},
        false
      );
    `;

    return query(sql, params);
  };

  let updateLink = link => {
    let { sql, params } = createQuery`
      update link
      set link_name = ${link.link_name},
      link = ${link.link}
      where id = ${link.id};
    `;

    return query(sql, params);
  };

  let deleteLinkById = linkId => {
    let { sql, params } = createQuery`
      delete from link where id = ${linkId};
    `;

    return query(sql, params);
  };

  return {
    getLinks,
    addLink,
    updateLink,
    deleteLinkById
  };
};

module.exports = db();
