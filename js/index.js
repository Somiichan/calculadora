class Calculator {
	
	constructor() {
		this.current = 0;
		this.entered = 0;
		this.answer = 0;
		this.decimal = false;
		this.operator = '';

		this.states = {
			'comma': false,
		}

		this.options = [
			['equals', this.processEquals.bind(this)],
			['clear', this.processClear.bind(this)],
			['sqrt', this.processSqrt.bind(this)],
			['mod', this.processMod.bind(this)],
			['comma', this.processComma.bind(this)],
			['erase', this.processErase.bind(this)],
		];

		this.firstEnteredOutput = document.querySelector('.f_entered');
		this.lastEnteredOutput = document.querySelector('.l_entered');
		this.operatorOutput = document.querySelector('.operator');

		this.currentOutput = document.querySelector('.current > h1');
		this.buttons = document.querySelectorAll('.buttons > div');

		this.buttons.forEach( button => {

			button.addEventListener('mousedown', () =>  {
				this.processAction(button.dataset.key);
				button.classList.add('pressed');
				setTimeout(function() {
					button.classList.remove('pressed');
				}, 400);
			});

			button.addEventListener('mouseup', function() {
				button.classList.remove('pressed');
			});
		});
	}

	processAction(a) {

		for(var i = 0, n = this.options.length; i < n; i++) {
			var option = this.options[i];
			if(a === option[0]) {
				option[1]();
				return;
			}
		}

		if(a === '+' || a === '-' || a === '/' || a === '*') {
			this.processASDM(a);
			return;
		} else {
			this.processNumber(a);
			return;
		}
	}

	processEquals() {
		if (this.operator) {
		  this.displayNumber(this.current, this.lastEnteredOutput);
		  this.answer = this.operator === '%' ? this.entered % this.current : eval(`${this.entered}${this.operator}${this.current}`);
		  this.displayNumber(this.answer, this.currentOutput);
		  this.current = this.answer;
		}
	}

	processClear() {
		this.current = 0;
		this.displayNumber(this.current, this.currentOutput);
		this.entered = 0;
		this.operator = '';
		this.firstEnteredOutput.innerHTML = '';
		this.lastEnteredOutput.innerHTML = '';
		this.operatorOutput.innerHTML = '';
	}

	processSqrt() {
		this.current = Math.sqrt(this.current);
		this.displayNumber(this.current, this.currentOutput);
	}

	processMod() {
		if (this.entered && !this.answer) {
		  return;
		}
	  
		if (this.answer) {
		  this.lastEnteredOutput.innerHTML = '';
		}
	  
		this.decimal = false;
		this.operator = '%';
		this.entered = this.current;
		this.displayNumber(this.entered, this.firstEnteredOutput);
	  
		this.operatorOutput.innerHTML = this.operator;
	  
		this.current = 0;
		this.displayNumber(this.current, this.currentOutput);
	}

	processComma() {
		if(this.currentOutput.innerHTML.indexOf(".") == -1) {
			this.current += '.';
			this.currentOutput.innerHTML = this.current;
		}
	}

	
	processErase() {
		this.current = this.current.slice(0, -1);
		if (this.current === "") {
			this.current = 0;
		}
		this.displayNumber(this.current, this.currentOutput);
	}

	processASDM(a) {
        if (this.entered && !this.answer) {
            return;
        }
    
        if (this.answer) {
            this.lastEnteredOutput.innerHTML = '';
        }
    
        this.decimal = false;
        this.operator = a;
        this.entered = this.current;
        this.displayNumber(this.entered, this.firstEnteredOutput);
    
        switch (a) {
            case '*':
                this.operatorOutput.innerHTML = 'x';
                break;
            default:
                this.operatorOutput.innerHTML = this.operator;
                break;
        }
    
        this.current = 0;
        this.displayNumber(this.current, this.currentOutput);
    }

	processNumber(n) {
		if (this.current === 0) {
			this.current = n;
		} else if (this.current === "0" && n !== 0) {
			this.current = n;
		} else {
			this.current += n;
		}
		this.decimal = false;
		this.displayNumber(this.current, this.currentOutput);
	}

	displayNumber(n, location) {
		location.innerHTML = String(n).substring(0, 10);
		if (n < 0) {
			location.innerHTML = "-" + String(-n).substring(0, 9);
		} else {
			location.innerHTML = String(n).substring(0, 10);
		}
	}
}

var Calc = new Calculator();