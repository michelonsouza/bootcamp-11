interface IMailTemplateConfig {
  template: 'handlebars';
}

export default {
  template: process.env.MAIL_TEMPLATE || 'handlebars',
} as IMailTemplateConfig;
