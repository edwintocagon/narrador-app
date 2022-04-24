import "./style.css";

const d = document,
  w = window;
const speechReader = () => {
  const $speechSelect = d.querySelector(".speech-select"),
    $speechTextarea = d.querySelector(".speech-text"),
    $speechBtn = d.querySelector(".speech-btn"),
    speechMessage = new SpeechSynthesisUtterance();

  let voices = [];

  d.addEventListener("DOMContentLoaded", (e) => {
    const allVoicesObtained = new Promise((resolve, reject) => {
      voices = speechSynthesis.getVoices();

      if (voices.length !== 0) {
        resolve(voices);
      } else {
        speechSynthesis.addEventListener("voiceschanged", (e) => {
          voices = speechSynthesis.getVoices();
          resolve(voices);
        });
      }
    });

    allVoicesObtained.then((voices) => {
      voices.forEach((voice) => {
        const $option = d.createElement("option");
        $option.value = voice.name;
        $option.textContent = `${voice.name} - ${voice.lang}`;

        $speechSelect.appendChild($option);
      });
    });
  });

  d.addEventListener("change", (e) => {
    if (e.target === $speechSelect) {
      speechMessage.voice = voices.find(
        (voice) => voice.name === e.target.value
      );
    }
  });

  d.addEventListener("click", (e) => {
    if (e.target === $speechBtn) {
      speechMessage.text = $speechTextarea.value;
      w.speechSynthesis.speak(speechMessage);
    }
  });
};

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  document.querySelector(".speech-select").style.display = "none";
} else {
  document.querySelector(".speech-select").style.display = "block";
}
speechReader();
