'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;
      console.log("Request body:", req.body);

      if (typeof text === 'undefined' || typeof locale === 'undefined') { return res.json({ error: 'Required field(s) missing' })}
      if (text.trim() === '') { return res.json({ error: 'No text to translate' })};
      if (locale !== 'american-to-british' && locale !== 'british-to-american') { return res.json({ error: 'Invalid value for locale field' })};
      
      if (locale === 'american-to-british') {
        const translatedResult = translator.americanToBritish(text);
        console.log(translatedResult);
        if (translatedResult.replaced === false) {
          return res.json({text, translation: "Everything looks good to me!"});
        }
        return res.json({text, translation: translatedResult.text});
      }

      if (locale === 'british-to-american') {
        const translatedResult = translator.britishToAmerican(text);
        console.log(translatedResult);
        if (translatedResult.replaced === false) {
          return res.json({text, translation: "Everything looks good to me!"});
        }
        return res.json({text, translation: translatedResult.text});
      }
    });
};
