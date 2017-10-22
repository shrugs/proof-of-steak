SHELL=/bin/bash

whitepaper:
	pandoc whitepaper.md --latex-engine=/Library/TeX/texbin/xelatex -o steak-network_whitepaper.pdf

copy:
	cp steak-network_whitepaper.pdf \
		./website/source/assets/steak-network_whitepaper.pdf


build-website:
	make -C website build

upload-website:
	@aws s3 sync website/build s3://mat.tc/steak-network --delete --acl public-read --profile blogmattc --region us-west-2

all: whitepaper copy
