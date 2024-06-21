import "./styles.css";
import { elements, offerElements, languages } from "./consts/consts";

function adjustFontSizeForLanguage(lang) {
  const htmlElement = document.documentElement;
  htmlElement.classList.remove("small-font", "medium-font", "large-font");

  switch (lang) {
    case "ja":
    case "zh":
    case "de":
    case "es":
    case "fr":
    case "pt":
      htmlElement.classList.add("small-font");
      break;
    case "en":
      htmlElement.classList.add("medium-font");
      break;
    default:
      htmlElement.classList.add("medium-font");
  }
}

function updateTextContent(selector, text) {
  const element = document.querySelector(selector);
  if (element) {
    element.innerHTML = text;
  }
}

function updateLanguageTexts(texts) {
  Object.keys(elements).forEach((selector) => {
    updateTextContent(selector, texts[elements[selector]]);
  });

  offerElements.forEach((offer) => {
    const offerSelector = `.offers__offer:nth-child(${offer.titleIndex + 1})`;
    updateTextContent(
      `${offerSelector} .offers__title`,
      texts[offer.titleText],
    );
    if (offer.priceText) {
      updateTextContent(
        `${offerSelector} .offers__price`,
        texts[offer.priceText].replace("{{price}}", offer.priceValue),
      );
    }
    if (offer.priceWeekText) {
      updateTextContent(
        `${offerSelector} .offers__price_week`,
        texts[offer.priceWeekText].replace("{{price}}", offer.priceWeekValue),
      );
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

function showLoading() {
  document.getElementById("loading").style.display = "flex";
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
}

document.addEventListener("DOMContentLoaded", async function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlLocaleTag = urlParams.get("lang")?.toLowerCase();

  const currentLang = urlLocaleTag || navigator.language.substring(0, 2);
  adjustFontSizeForLanguage(currentLang);

  showLoading();

  try {
    const texts = await simulateFetch(currentLang);
    updateLanguageTexts(texts);
  } catch (error) {
    console.warn("Error fetching language data:", error);
    updateLanguageTexts(languages["en"]);
  } finally {
    hideLoading();
  }

  const offers = document.querySelectorAll(".offers__offer");
  let selectedOffer = document.querySelector(".offers__offer_selected");

  offers.forEach((offer) => {
    offer.addEventListener("click", () => {
      if (selectedOffer) {
        selectedOffer.classList.remove("offers__offer_selected");
      }
      offer.classList.add("offers__offer_selected");
      selectedOffer = offer;
    });
  });

  document.querySelector(".offers__btn").addEventListener("click", () => {
    if (selectedOffer) {
      const offerIndex = Array.from(offers).indexOf(selectedOffer);
      offerIndex === 0
        ? (window.location.href = "https://apple.com/")
        : (window.location.href = "https://google.com/");
    }
  });

  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "attributes" && mutation.attributeName === "lang") {
        const newLang = document.documentElement.lang.substring(0, 2);
        adjustFontSizeForLanguage(newLang);

        showLoading();

        simulateFetch(newLang)
          .then((texts) => updateLanguageTexts(texts))
          .catch((error) => {
            console.error("Error fetching language data:", error);
            updateLanguageTexts(languages["en"]);
          })
          .finally(() => {
            hideLoading();
          });
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
});
