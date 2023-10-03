import { connection } from "../bd.js";

export const getUsuarios = async (req, res) => {
  connection.query("SELECT * FROM usuarios", (error, rows) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        estado: false,
        msg: "Comuníquese con el administrador",
      });
    } else {
      res.send(rows);
    }
  });
};

export const getUsuario = async (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM usuarios WHERE id =?",
    [id],
    (error, rows) => {
      if (rows.length <= 0) {
        return res.status(400).json({
          msg: "Usuario no encontrado",
        });
      } else if (error) {
        console.error(error);
        res.status(500).json({
          estado: false,
          msg: "Comuníquese con el administrador",
        });
      } else {
        res.send(rows[0]);
      }
    }
  );
};

export const createUsuaros = async (req, res) => {
  console.log(req.body);
  const { nombre, apellido, direcion } = req.body;
  connection.query(
    "INSERT INTO usuarios(nombre, apellido, direcion) VALUES (?, ?, ?)",
    [nombre, apellido, direcion],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({
          estado: false,
          msg: "Comuníquese con el administrador",
        });
      } else {
        const idInsertado = results.insertId;
        console.log(`ID insertado: ${idInsertado}`);
        console.log(results);
        res.send({ id: idInsertado, nombre, apellido, direcion });
      }
    }
  );
};

export const actualizarUsuarios = (req, res) => {
  const id = req.params.id;
  const { nombre, apellido, direcion } = req.body;
  connection.query(
    "UPDATE usuarios SET nombre= IFNULL(?,nombre), apellido=IFNULL(?,apellido), direcion=IFNULL(?,direcion) WHERE id=?",
    [nombre, apellido, direcion, id],
    (error, results) => {
      if (results.affectedRows <= 0) {
        return res.status(400).json({
          msg: "Usuario no encontrado",
        });
      } else if (error) {
        console.error(error);
        res.status(500).json({
          estado: false,
          msg: "Comuníquese con el administrador",
        });
      } else {
        connection.query(
          "SELECT * FROM usuarios WHERE id=?",
          [id],
          (error, rows) => {
            if (error) {
              console.error(error);
              res.status(500).json({
                estado: false,
                msg: "Comuníquese con el administrador",
              });
            } else {
              res.json(rows[0]);
            }
          }
        );
      }
    }
  );
};

export const eliminarUsuarios = async (req, res) => {
  const id = req.params.id;
  connection.query(
    "DELETE FROM usuarios WHERE id =?",
    [id],
    (error, results) => {
      if (results.affectedRows <= 0) {
        return res.status(400).json({
          msg: "Usuario no encontrado",
        });
      } else if (error) {
        console.error(error);
        res.status(500).json({
          estado: false,
          msg: "Comuníquese con el administrador",
        });
      } else {
        console.log(results);
        res.send(204);
      }
    }
  );
};
