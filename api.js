const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const sql = require("mssql");

const app = express();
app.use(bodyParser.json());
app.listen(3000, async () => {
  console.log("Server is listening");
});

const sqlConfig = {
  user: "sa",
  password: "VISHNUVARDHAN",
  database: "model",
  server: "LAPTOP-KDV8TRE9",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: false,
  },
};

const sequelize = new Sequelize(
  sqlConfig.database,
  sqlConfig.user,
  sqlConfig.password,
  {
    host: sqlConfig.server,
    dialect: "mssql",
  }
  );
  
  
  const A = sequelize.define("a", {
    FirstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
  
  const B = sequelize.define("b", {
    FirstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  const execute = async () => {
  try {
    // console.log(sqlConfig.server);
    await sql
      .connect(sqlConfig)
      .then(() => console.log("connected"))
      .catch((err) => console.log(err));
    const result = await sql.query(
      `select * from Persons INSERT INTO Persons (PersonID, LastName, Address, FirstName, City) VALUES (21, 'Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger')`
    );
    // console.dir(result);
    await sequelize.authenticate();
    // console.log('Connection has been established successfully.');
  } catch (err) {
    console.log(err);
    // console.error('Unable to connect to the database:', err);
  }
};

app.get("/persons", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query("SELECT * FROM Persons");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/persons", async (req, res) => {
  const { LastName, Address, FirstName, City } = req.body;
  // console.log(LastName, Address, City);
  try {
    await sql.connect(sqlConfig);
    const result =
      await sql.query`INSERT INTO Persons (LastName, Address, FirstName, City) VALUES (${LastName}, ${Address}, ${FirstName}, ${City})`;
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/persons/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await sql.connect(sqlConfig);
    const result = await sql.query`DELETE FROM Persons WHERE PersonID = ${id}`;
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// execute();
const Persons = sequelize.define("Persons", {
  FirstName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  City: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // updatedAt: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
  // createdAt: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
});


A.hasOne(B);
B.belongsTo(A);


const sequelizer = new Sequelize(
  sqlConfig.database,
  sqlConfig.user,
  sqlConfig.password,
  {
    host: sqlConfig.server,
    dialect: "mssql",
  }
  );

  const Team= sequelize.define("Teams", {
    Teamid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TeamName: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
  
  const Player = sequelize.define("Players", {
    playerName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    playerid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TeamName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TeamTeamid:{
      type: DataTypes.INTEGER,
      allowNull: true,
      foreignKey:true
    }
    // ,
    // Address: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // }    
  });
  // Team.hasMany(Player);
  // Player.belongsTo(Team);
  Team.hasMany(Player, {
    foreignKey: 'TeamTeamid'
  });
  Player.belongsTo(Team);
  async function sample() {
    // const janeee = await Persons.findAll({
    //   where: {
    //     id: null // Same as using `id: { [Op.in]: [1,2,3] }`
    //   }
    // })
    // const janeA = await A.create({
    //   FirstName: "Jane",
    //   LastName: "Doe",
    //   Address: "123 Main St",
    //   City: "CityA",
    // });
    
    // const janeB = await B.create({
    //   FirstName: "vis",
    //   LastName: "Doe",
    //   Address: "456 Oak St",
    //   City: "CityB",
    // });

    // const jane = await Persons.create({
    //   FirstName: "JanesDSDAASAwedcf",
    //   LastName: "rewgafwgefdcva",
    //   Address: "Address",
    //   City: "City",
    // });
    const Teams = await Team.create({
      TeamName: "cskK",
      unique: true
    });
    const Players = await Player.create({
      playerName: "rohit",
      TeamName: "cskK",
    });
   
 
console.log("eams,Players",Teams,Players)
   await Players.setTeam(Teams);
  }
  // sample();
app.post('/createTeam', async (req, res) => {
  try {
    const newTeam = await Team.create(req.body);
    res.json(newTeam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/getAllTeams', async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


app.put('/updateTeam/:TeamId', async (req, res) => {
  try {
    await Team.update(req.body, {
      where: { TeamId: req.params.TeamId }
    });
    res.json({ message: 'Team updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/deleteTeam/:TeamId', async (req, res) => {
  try {
    await Team.destroy({
      where: { TeamId: req.params.TeamId }
    });
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/createPlayer', async (req, res) => {
  try {
    const newPlayer = await Player.create(req.body);
    res.json(newPlayer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  
});

app.get('/getAllPlayers', async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/getPlayer/:playerid', async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.playerid);
    res.json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/updatePlayer/:playerid', async (req, res) => {
  try {
    await Player.update(req.body, {
      where: { playerid: req.params.playerid }
    });
    res.json({ message: 'Player updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/deletePlayer/:playerid', async (req, res) => {
  try {
    await Player.destroy({
      where: { playerid: req.params.playerid }
    });
    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
const Phone = sequelize.define("Phone", {
  PhoneCode: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phoneName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Username: {
    type: DataTypes.STRING,
    allowNull: true,
  } 
});

const IMECODE = sequelize.define("IMECODE", {
  ImCode: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  phoneName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  PhoneCode: {
    type: DataTypes.INTEGER,
    references: {
      model: Phone,
      key: 'PhoneCode'
    }
  }
});

Phone.hasOne(IMECODE, { foreignKey: 'PhoneCode' });
IMECODE.belongsTo(Phone, { foreignKey: 'PhoneCode' });

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});
app.post('/phones', async (req, res) => {
  try {
    const phone = await Phone.create(req.body);
    res.status(201).json(phone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST route for creating a new IMECODE
app.post('/imecodes', async (req, res) => {
  try {
    const imecode = await IMECODE.create(req.body);
    res.status(201).json(imecode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
