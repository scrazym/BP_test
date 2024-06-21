import en from "../languages/en.json";
import es from "../languages/es.json";
import fr from "../languages/fr.json";
import de from "../languages/de.json";
import ja from "../languages/ja.json";
import pt from "../languages/pt.json";

export const elements = {
  ".modal__title": "Get Unlimited <br>Access",
  ".modal__descr_first": "Unlimited Art <br>Creation",
  ".modal__descr_second": "Exclusive <br>Styles",
  ".modal__descr_third": "Magic Avatars <br>With 20% Off",
  ".offers__btn": "Continue",
  ".footer__link_terms": "Terms of Use",
  ".footer__link_privacy": "Privacy Policy",
  ".footer__link_restore": "Restore",
};

// Массив предложений
export const offerElements = [
  {
    titleIndex: 0,
    titleText: "YEARLY ACCESS",
    priceText: "Just {{price}} per year",
    priceWeekText: "{{price}} <br>per week",
    priceValue: "$39.99",
    priceWeekValue: "$0.48",
  },
  {
    titleIndex: 1,
    titleText: "WEEKLY ACCESS",
    priceWeekText: "{{price}} <br>per week",
    priceWeekValue: "$6.99",
  },
];

export const languages = {
  en,
  es,
  fr,
  de,
  ja,
  pt,
};
