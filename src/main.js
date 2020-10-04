import "reset-css/reset.css"
import "./scss/main.scss"
import '@babel/polyfill';
import moment from 'moment';
import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import messages from './messages';
import App from './App.vue';

const locale = 'pl';
const i18n = createI18n({
  legacy: true,
  locale,
  messages: {
    [locale]: messages,
  }
});
moment.locale(locale);

const appContainer = '#app';
const app = createApp(App);

app.use(i18n)
app.mount(appContainer)