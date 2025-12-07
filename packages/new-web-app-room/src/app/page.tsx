'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`rounded-2xl shadow-2xl p-6 w-full max-w-sm transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Calculator</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
        
        {/* Display */}
        <div className={`rounded-lg p-4 mb-4 ${isDarkMode ? 'bg-gray-950' : 'bg-gray-900'}`}>
          <div className="text-right text-white text-3xl font-mono overflow-hidden">
            {display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <button
            onClick={clearAll}
            className="col-span-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 rounded-lg transition-colors"
          >
            Clear
          </button>
          <button
            onClick={clearEntry}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-colors"
          >
            CE
          </button>
          <button
            onClick={() => inputOperation('÷')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-colors"
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            onClick={() => inputNumber('7')}
            className={`font-semibold py-4 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            7
          </button>
          <button
            onClick={() => inputNumber('8')}
            className={`font-semibold py-4 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            8
          </button>
          <button
            onClick={() => inputNumber('9')}
            className={`font-semibold py-4 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            9
          </button>
          <button
            onClick={() => inputOperation('×')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-colors"
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            onClick={() => inputNumber('4')}
            className={`font-semibold py-4 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            4
          </button>
          <button
            onClick={() => inputNumber('5')}
            className={`font-semibold py-4 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            5
          </button>
          <button
            onClick={() => inputNumber('6')}
            className={`font-semibold py-4 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            6
          </button>
          <button
            onClick={() => inputOperation('-')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-lg transition-colors"
          >
            -
          </button>

          {/* Row 4 */}
          <button
            onClick={() => inputNumber('1')}
            className={`font-semibold py-4 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            1
          </button>
          <button
            onClick={() => inputNumber('2')}
            className={`font-semibold py-4 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            2
          </button>
          <button
            onClick={() => inputNumber('3')}
            className={`font-semibold py-4 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            3
          </button>
          <button
            onClick={() => inputOperation('+')}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-4 rounded-lg transition-colors"
          >
            +
          </button>

          {/* Row 5 */}
          <button
            onClick={() => inputNumber('0')}
            className={`col-span-2 font-semibold py-4 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            0
          </button>
          <button
            onClick={() => inputNumber('.')}
            className={`font-semibold py-4 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
          >
            .
          </button>
          <button
            onClick={performCalculation}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg transition-colors"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}












