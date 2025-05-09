'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      if (!text || !locale) { return res.json({ error: 'Required field(s) missing' })}
      if (text.trim() === '') { return res.json({ error: 'No text to translate' })};
      if (!locale === 'americanToBritish' || !locale === 'britishToAmerican') { return res.json({ error: 'Invalid value for locale field' })};
      
      
    });
};
