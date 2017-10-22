SHELL=/bin/bash

whitepaper:
	pandoc whitepaper.md --latex-engine=/Library/TeX/texbin/xelatex -o steak-network_whitepaper.pdf

copy:
	cp steak-network_whitepaper.pdf \
		./website/source/assets/steak-network_whitepaper.pdf

all: whitepaper copy
