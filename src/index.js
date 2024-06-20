import './styles.css';

import en from './languages/en.json';
import es from './languages/es.json';
import fr from './languages/fr.json';
import de from './languages/de.json';
import ja from './languages/ja.json';
import pt from './languages/pt.json';

const languages = {
  en,
  es,
  fr,
  de,
  ja,
  pt
};

function adjustFontSizeForLanguage(lang) {
  const htmlElement = document.documentElement;

  htmlElement.classList.remove('small-font', 'medium-font', 'large-font');

  switch (lang) {
    case 'ja': // Японский
    case 'zh': // Китайский
    case 'de': // Немецкий
    case 'es': // Испанский
    case 'fr': // Французский
    case 'pt': // Португальский
      htmlElement.classList.add('small-font');
      break;
    case 'en': 
      htmlElement.classList.add('medium-font');
      break;
    default:
      htmlElement.classList.add('medium-font'); 
  }
}

function updateLanguageTexts(texts) {
  const titleElement = document.querySelector('.modal__title');
  const modalFirstDescr = document.querySelector('.modal__descr_first');
  const modalSecondDescr = document.querySelector('.modal__descr_second');
  const modalThirdDescr = document.querySelector('.modal__descr_third');
  const continueButton = document.querySelector('.offers__continue');
  const termsLink = document.querySelector('.footer__link_terms');
  const privacyLink = document.querySelector('.footer__link_privacy');
  const restoreLink = document.querySelector('.footer__link_restore');

  if (titleElement) {
    titleElement.innerHTML = texts['Get Unlimited <br>Access'];
  }
  if (modalFirstDescr) {
    modalFirstDescr.innerHTML = texts['Unlimited Art <br>Creation'];
  }
  if (modalSecondDescr) {
    modalSecondDescr.innerHTML = texts['Exclusive <br>Styles'];
  }
  if (modalThirdDescr) {
    modalThirdDescr.innerHTML = texts['Magic Avatars <br>With 20% Off'];
  }
  if (continueButton) {
    continueButton.textContent = texts['Continue'];
  }
  if (termsLink) {
    termsLink.textContent = texts['Terms of Use'];
  }
  if (privacyLink) {
    privacyLink.textContent = texts['Privacy Policy'];
  }
  if (restoreLink) {
    restoreLink.textContent = texts['Restore'];
  }

  const offers = document.querySelectorAll('.offers__offer');
  offers.forEach((offer, index) => {
    const offerTitle = offer.querySelector('.offers__title');
    const offerPrice = offer.querySelector('.offers__price');
    const offerPriceWeek = offer.querySelector('.offers__price_week');

    const label = offer.querySelector('.offers__label');

    if (index === 0 && offerTitle && offerPrice && label) {
      offerTitle.textContent = texts['YEARLY ACCESS'];
      offerPrice.textContent = texts['Just {{price}} per year'].replace('{{price}}', '$39.99');
      label.textContent = texts['BEST OFFER'];
      offerPriceWeek.innerHTML = texts['{{price}} <br>per week'].replace('{{price}}', '$6.99');
    }
    if (index === 1 && offerTitle && offerPrice) {
      offerTitle.textContent = texts['WEEKLY ACCESS'];
      offerPrice.innerHTML = texts['{{price}} <br>per week'].replace('{{price}}', '$6.99');
    }
  });
}

function simulateFetch(lang) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const texts = languages[lang];
      if (!texts) {
        reject(`Language "${lang}" not found.`);
      } else {
        resolve(texts);
      }
    }, 1000); 
  });
}

document.addEventListener('DOMContentLoaded', async function() {
  const currentLang = navigator.language.substring(0, 2);
  adjustFontSizeForLanguage(currentLang); 

  try {
    const texts = await simulateFetch(currentLang);
    updateLanguageTexts(texts); 
  } catch (error) {
    console.error('Error fetching language data:', error);
    updateLanguageTexts(languages['en']);
  }

  const offers = document.querySelectorAll('.offers__offer');
  let selectedOffer = document.querySelector('.offers__offer_selected');

  offers.forEach(offer => {
    offer.addEventListener('click', () => {
      if (selectedOffer) {
        selectedOffer.classList.remove('offers__offer_selected');
      }
      offer.classList.add('offers__offer_selected');
      selectedOffer = offer;
    });
  });

  document.querySelector('.offers__continue').addEventListener('click', () => {
    if (selectedOffer) {
      const offerIndex = Array.from(offers).indexOf(selectedOffer);
      offerIndex === 0 ? (window.location.href = 'https://apple.com/') : (window.location.href = 'https://google.com/');
    }
  });
  const observer = new MutationObserver(mutationsList => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
        const newLang = document.documentElement.lang.substring(0, 2);
        adjustFontSizeForLanguage(newLang);

        simulateFetch(newLang)
          .then(texts => updateLanguageTexts(texts))
          .catch(error => {
            console.error('Error fetching language data:', error);
            updateLanguageTexts(languages['en']);
          });
      }
    }
  });

  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
});

