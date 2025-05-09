'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      if (!text || !locale) { return res.json({ error: 'Required field(s) missing' })}
      if (text.trim() === '') { return res.json({ error: 'No text to translate' })};
      if (locale !== 'americanToBritish' || locale !== 'britishToAmerican') { return res.json({ error: 'Invalid value for locale field' })};
      
      if (locale === 'americanToBritish') {
        const translatedResult = translator.americanToBritish(text);
        if (translatedResult.replaced === false) {
          return res.json({text: "Everything looks good to me!"});
        }
        return res.json({text: translatedResult.text});
      }

      if (locale === 'britishToAmerican') {
        const translatedResult = translator.britishToAmerican(text);
        if (translatedResult.replaced === false) {
          return res.json({text: "Everything looks good to me!"});
        }
        return res.json({text: translatedResult.text});
      }
    });
};
