// Smooth, animated calculator logic
(() => {
  const displayEl = document.getElementById('display');
  const keys = document.querySelectorAll('.keys .btn');
  let expression = '';

  function updateDisplay(text) {
    displayEl.textContent = text || '0';
  }

  function sanitize(expr) {
    const allowed = /^[0-9+\-*/().\s]+$/;
    return allowed.test(expr) ? expr : null;
  }

  function evaluateExpr(expr) {
    const safe = sanitize(expr);
    if (!safe) return 'Error';
    try {
      const result = Function(`"use strict"; return (${safe})`)();
      return (result === Infinity || Number.isNaN(result)) ? 'Error' : 
             Number(result.toFixed(12)).toString();
    } catch {
      return 'Error';
    }
  }

  function appendValue(v) {
    if (v === '.') {
      const lastNum = expression.split(/[\+\-\*\/\(\)]/).pop();
      if (lastNum.includes('.')) return;
    }
    if (/[+\-*/]/.test(v) && /[+\-*/]$/.test(expression))
      expression = expression.slice(0, -1);
    expression += v;
    updateDisplay(expression);
  }

  function clearAll() {
    expression = '';
    updateDisplay('0');
    pulseDisplay();
  }

  function backspace() {
    expression = expression.slice(0, -1);
    updateDisplay(expression);
  }

  function calculate() {
    const result = evaluateExpr(expression);
    updateDisplay(result);
    expression = result === 'Error' ? '' : result;
    pulseDisplay();
  }

  function pulseDisplay() {
    displayEl.classList.add('pulse');
    setTimeout(() => displayEl.classList.remove('pulse'), 200);
  }

  keys.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.value;
      const act = btn.dataset.action;
      if (act === 'clear') clearAll();
      else if (act === 'back') backspace();
      else if (act === 'equals') calculate();
      else appendValue(val);
    });
  });

  // Keyboard input support
  window.addEventListener('keydown', (e) => {
    const k = e.key;
    if ((k >= '0' && k <= '9') || ['+','-','*','/','(',')','.'].includes(k))
      appendValue(k);
    else if (k === 'Enter' || k === '=') calculate();
    else if (k === 'Backspace') backspace();
    else if (k === 'Escape') clearAll();
  });

  updateDisplay('0');
})();
