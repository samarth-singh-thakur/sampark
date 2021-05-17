const express = require('express')
const session = require('./middlewares/session');
const allContacts = require('./routes/allContacts')
const user = require('./routes/user');
const addcontact = require('./routes/addContacts')
const ud = require('./routes/ud')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session);

const { database } = require('./models/export.js');

database.sequelize.sync();

app.use('/', user);
app.use('/addcontact', addcontact)
app.use('/allcontacts', allContacts)
app.use('/edit', ud);
app.listen(3000, () => console.log('server is running in port 3000'))
