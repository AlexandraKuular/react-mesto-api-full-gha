require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('express').Router();
const InternalError = require('./middlewares/internalError');
const { validationLogin, validationRegister } = require('./middlewares/validations');
const auth = require('./middlewares/auth');
const {
  addUser, login,
} = require('./controllers/users');
const ErrorNotFoundCode = require('./errors/errorNotFoundCode');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
});

app.use(express.json());

app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);

app.post('/signup', validationRegister, addUser);
app.post('/signin', validationLogin, login);

app.use(auth);
app.use(router.use('/users', require('./routes/users')));
app.use(router.use('/cards', require('./routes/cards')));

router.use((req, res, next) => {
  next(new ErrorNotFoundCode('Ресурс по адресу не найден.'));
});

app.use(errorLogger);
app.use(errors());
app.use(InternalError);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
