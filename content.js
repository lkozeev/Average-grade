// Функция для подсчета цифр в тексте
function countDigits(text) {
  const digitCounts = {'0': 0, '1': 0, '2-': 0, '2': 0, '2+': 0, '3-': 0, '3': 0, '3+': 0, '4-': 0, '4': 0, '4+': 0, '5-': 0, '5': 0}; // Дописанный словарь для хранения количества цифр от 0 до 5

  let sum_ = 0;
  let count_ = 0;
  // Проходим по каждому символу в тексте
  for (let i = 0; i < text.length; i++) {
    const char = text[i]; // берем символ
    
    // Если символ - цифра, увеличиваем соответствующий счетчик
    if (/[0-5]/.test(char)) {
      let digit = parseInt(char);
      let segn = ''; // берем знак
      if (i < text.length - 1)
        segn = text[i + 1];
      let flag = false;
      if (segn == '+') {
        digit += 0.25;
        flag = true;
      }
      if (segn == '-' ) {
        digit -= 0.25;
        flag = true;
      }
      
      sum_ += digit;
      count_ += 1;

      if (flag)
        digitCounts[char + segn]++;
      else
        digitCounts[char]++;
    }
  }

  return [digitCounts, sum_ / count_];
}

// Функция для создания элемента с результатами подсчета и его добавления на страницу
function showResults() {
  // Удаляем предыдущие результаты, если они есть
  const existingResultsDiv = document.getElementById('digitCountResults');
  if (existingResultsDiv) {
    existingResultsDiv.remove();
  }

  // Создаем элемент для вывода результатов
  const resultsDiv = document.createElement('div');
  resultsDiv.id = 'digitCountResults';

  // Получаем выбранные элементы с классом "badge" и подсчитываем цифры в их тексте
  const selectedElements = window.getSelection().getRangeAt(0).cloneContents().querySelectorAll('.badge');
  const digitText = Array.from(selectedElements).map(element => element.textContent.trim()).join('');
  const [digitCounts, average] = countDigits(digitText);

  // Формируем текст с результатами
  let resultText = '<h3>Mark Counts:</h3>';
  Object.entries(digitCounts).forEach(([digit, count]) => {
    if (count > 0) {
      resultText += `<p>Mark ${digit}: ${count}</p>`;
    }
  });
  resultText += `<h4>Average: ${average}</h4>`;
  resultsDiv.innerHTML = resultText;

  // Добавляем элемент на страницу
  document.body.appendChild(resultsDiv);
}

// Функция для обработки изменений выделения
function processSelection() {
  const selection = window.getSelection();
  const selectedText = selection.toString().trim(); // Получаем выделенный текст и убираем лишние пробелы

  if (selectedText.length > 0) {
    showResults(); // Выводим результаты на страницу
  } else {
    // Если выделение отсутствует, удаляем результаты
    const existingResultsDiv = document.getElementById('digitCountResults');
    if (existingResultsDiv) {
      existingResultsDiv.remove();
    }
  }
}

// Добавляем стили
const styles = `
/* Стили для блока с результатами */
#digitCountResults {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.9); /* Прозрачный белый фон */
  padding: 10px;
  border: 1px solid #ccc; /* Светлая рамка */
  border-radius: 5px; /* Закругленные углы */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Тень */
  font-family: Arial, sans-serif; /* Шрифт */
  color: #333; /* Цвет текста */
  z-index: 9999;
}

/* Стили для заголовка результатов */
#digitCountResults h3 {
  margin-top: 0;
}

/* Стили для параграфов результатов */
#digitCountResults p {
  margin: 0;
}

/* Стили для среднего значения */
#digitCountResults h4 {
  text-align: center; /* По центру */
  margin: 5px 0;
  border: 2px solid #28a745; /* Обводка */
  padding: 5px; /* Поля */
  border-radius: 10px; /* Скругление углов */
}

/* Анимация */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Анимация для результатов */
#digitCountResults {
  animation: fadeIn 0.3s ease-out;
}
`;

// Создаем элемент стилей
const styleElement = document.createElement('style');
styleElement.textContent = styles;

// Добавляем стили в head документа
document.head.appendChild(styleElement);

// Обработчик события для изменений выделения
document.addEventListener('selectionchange', processSelection);
