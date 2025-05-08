const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator();

suite('Unit Tests', () => {
    test('Translate Mangoes are my favorite fruit. to British English', () => {
        const text = "Mangoes are my favorite fruit.";
        const expected = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
        assert.equal(translator.americanToBritish(text), expected);
    })
    test('Translate I ate yogurt for breakfast. to British English', () => {
        const text = "I ate yogurt for breakfast.";
        const expected = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
        assert.equal(translator.americanToBritish(text), expected);
    })
    test("Translate We had a party at my friend's condo. to British English", () => {
        const text = "We had a party at my friend's condo.";
        const expected = 'We had a party at my friend\'s <span class="highlight">flat</span>.';
        assert.equal(translator.americanToBritish(text), expected);
    })
    test('Translate Can you toss this in the trashcan for me? to British English', () => {
        const text = "Can you toss this in the trashcan for me?";
        const expected = 'Can you toss this in the <span class="highlight">bin</span> for me?';
        assert.equal(translator.americanToBritish(text), expected);
    })
    test('Translate The parking lot was full. to British English', () => {
        const text = "The parking lot was full.";
        const expected = 'The <span class="highlight">car park</span> was full.';
        assert.equal(translator.americanToBritish(text), expected);
    })
    test('Translate Like a high tech Rube Goldberg machine. to British English', () => {
        const text = "Like a high tech Rube Goldberg machine.";
        const expected = 'Like a high tech <span class="highlight">Heath Robinson device</span>.';
        assert.equal(translator.americanToBritish(text), expected);
    })
    test('Translate To play hooky means to skip class or work. to British English', () => {
        const text = "To play hooky means to skip class or work.";
        const expected = 'To <span class="highlight">bunk off</span> means to skip class or work.';
        assert.equal(translator.americanToBritish(text), expected);
    })
    test('Translate No Mr. Bond, I expect you to die. to British English', () => {
        const text = "No Mr. Bond, I expect you to die.";
        const expected = 'No <span class="highlight">Mr</span> Bond, I expect you to die.';
        assert.equal(translator.americanToBritish(text), expected);
    })
    test('Translate Dr. Grosh will see you now. to British English', () => {
        const text = "Dr. Grosh will see you now.";
        const expected = '<span class="highlight">Dr</span> Grosh will see you now.';
        assert.equal(translator.americanToBritish(text), expected);
    })
    test('Translate Lunch is at 12:15 today. to British English', () => {
        const text = "Lunch is at 12:15 today.";
        const expected = 'Lunch is at <span class="highlight">12.15</span> today.';
        assert.equal(translator.americanToBritish(text), expected);
    })
    test('Translate We watched the footie match for a while. to American English', () => {
        const text = "We watched the footie match for a while.";
        const expected = 'We watched the <span class="highlight">soccer</span> match for a while.';
        assert.equal(translator.britishToAmerican(text), expected);
    })
    
});
