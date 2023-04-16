class Calculator {
	
	constructor() {
		this.current = 0;
		this.entered = 0;
		this.answer = 0;

		this.decimal = false;

		this.operator = '';

		this.states = {
			'inv': false,
			'comma': false
		}

		this.options = [
			['equals', this.processEquals.bind(this)],
			['clear', this.processClear.bind(this)],
			['sqrt', this.processSqrt.bind(this)],
			['inv', this.processInv.bind(this)],
			['comma', this.processComma.bind(this)],
			['erase', this.processErase.bind(this)]
		];

		this.firstEnteredOutput = document.querySelector('.f_entered');
		this.lastEnteredOutput = document.querySelector('.l_entered');
		this.operatorOutput = document.querySelector('.operator');

		this.currentOutput = document.querySelector('.current > h1');
		this.buttons = document.querySelectorAll('.buttons > div');

		for(var i = 0, n = this.buttons.length; i < n; i++) {
			var calc = this;
			var button = this.buttons[i];

			button.addEventListener('mousedown', function() {
				var _this = this;
				calc.processAction(_this.getAttribute('data-key'));
				_this.classList.add('pressed');
				setTimeout(function() {
					_this.classList.remove('pressed');
				}, 400);
			});

			button.addEventListener('mouseup', function() {
				var _this = this;
				_this.classList.remove('pressed');
			});
		}
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
            this.answer = eval(`${this.entered}${this.operator}${this.current}`);
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

	processInv() {
		this.current = this.current * -1;
		this.displayNumber(this.current, this.currentOutput);
	}

	processComma() {
		if(!this.decimal) {
			this.current += ',';
			this.currentOutput.innerHTML = this.current;
		}

		this.decimal = true;
	}

	processErase() {
		this.current = this.current.slice(0, -1);
		if (this.current === "") {
		this.current = 0;
		}
		this.displayNumber(this.current, this.currentOutput);
	}

	processASDM(a) {
        if (!!this.entered && !!!this.answer) {
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
		this.displayNumber(this.current, this.currentOutput);
	}

	displayNumber(n, location) {
		location.innerHTML = String(n).substring(0, 10);
	}
}

var Calc = new Calculator();