# ArLocal settings
docker_pull:
	docker pull textury/arlocal

docker_run:
	docker run --name arlocal -p 1984:1984 textury/arlocal

docker_stop:
	docker stop arlocal

# ArLocal actions
create_address:
	npx tsc
	node dist/walletCreate.js

upload_img:
	npx tsc
	node dist/uploadEncryptedImage.js

download_img:
	npx tsc
	node dist/downloadAndDecryptImage.js
